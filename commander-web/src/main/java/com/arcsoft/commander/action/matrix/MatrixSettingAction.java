package com.arcsoft.commander.action.matrix;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;

import org.apache.log4j.Logger;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.arcvideo.matrix.domain.Crosspoint;
import com.arcsoft.arcvideo.matrix.domain.LevelInfo;
import com.arcsoft.arcvideo.matrix.domain.Route;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.matrix.Matrix;
import com.arcsoft.commander.domain.matrix.MatrixSetting;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.matrix.MatrixService;
import com.arcsoft.commander.service.matrix.MatrixSettingService;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.MediaInfoService;


/**
 * Matrix setting action.
 * 
 * @author ybzhang
 */
public class MatrixSettingAction extends BaseAction {

	private static final long serialVersionUID = 7891697584235671072L;

	private Logger log = Logger.getLogger(getClass());
	private MatrixSettingService matrixSettingService;
	private MediaInfoService cmdMediaInfoService;
	private ServerGroup group;
	private ServerService serverService;
	private MatrixService matrixService;
	private String description;
	private int code;
	private Matrix matrix;
	private int matrixOutPortCount;
	private int matrixInPortCount;

	public void setMatrixService(MatrixService matrixService) {
		this.matrixService = matrixService;
	}

	public void setMatrixSettingService(MatrixSettingService matrixSettingService) {
		this.matrixSettingService = matrixSettingService;
	}

	public void setCmdMediaInfoService(MediaInfoService cmdMediaInfoService) {
		this.cmdMediaInfoService = cmdMediaInfoService;
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setMatrix(Matrix matrix) {
		this.matrix = matrix;
	}

	public Matrix getMatrix() {
		return matrix;
	}

	public int getCode() {
		return code;
	}

	public int getMatrixInPortCount() {
		return matrixInPortCount;
	}

	public int getMatrixOutPortCount() {
		return matrixOutPortCount;
	}

	public String getDescription() {
		return description;
	}

	public void setGroup(ServerGroup group) {
		this.group = group;
	}

	public ServerGroup getGroup() {
		return group;
	}

	@Override
	public String execute()throws Exception{
		if(group != null){
			Map<Integer, Integer> portMap = new HashMap<Integer, Integer>();
			Map<Integer, MatrixSetting> settingMap = new HashMap<Integer, MatrixSetting>();
			group = serverService.getGroup(group.getId(), true);
			Set<Matrix> list = group.getMatrixes();
			MatrixSetting temp = null;
			if(list != null && !list.isEmpty()){
				matrix = (Matrix) list.toArray()[0];
			}
			try {
				if(matrix != null){
					List<LevelInfo> levelList = matrixService.queryLevel(matrix);
					LevelInfo levelInfo = null;
					if(levelList != null && !levelList.isEmpty()){
						levelInfo = levelList.get(0);
						if(levelInfo != null){
							String sizes[] = levelInfo.getSize().split("x");
							matrixInPortCount = Integer.valueOf(sizes[0]);
							matrixOutPortCount = Integer.valueOf(sizes[1]);
						}
					}
					Crosspoint cp = new Crosspoint();
					matrixService.coQuery(matrix, cp);
					
					for(Route route : cp.getRoutes()){
						if(route != null)
							portMap.put(route.getOutNO() + 1, route.getInNO() + 1);
					}
					for(Server server : group.getServers()){
						fillSDIPort(server);
						settingMap.clear();
						for(MatrixSetting setting:server.getMatrixSettings()){
							if(setting != null && setting.getSdiPort() != null){
								setting.setMatrixMasterIn(portMap.get(setting.getMatrixOut()));
								settingMap.put(setting.getSdiPort(), setting);
							}
						}
						server.getMatrixSettings().clear();
						for(Integer sdiPort:server.getSdiPorts()){
							temp = settingMap.get(sdiPort);
							if(temp == null){
								temp = new MatrixSetting();
								temp.setSdiPort(sdiPort);
							}
							if(portMap.get(temp.getMatrixOut()) != null)
								temp.setMatrixMasterIn(portMap.get(temp.getMatrixOut()));	
							server.getMatrixSettings().add(temp);
						}
						Collections.sort(server.getMatrixSettings(),new Comparator<MatrixSetting>(){
							@Override
							public int compare(MatrixSetting arg0, MatrixSetting arg1) {
								return arg0.getSdiPort() - arg1.getSdiPort();
							}
						});
					}
				}
			} catch (Exception e) {
				log.error("get matrix settings error.", e);
			}
			
		}
		return SUCCESS;
	}

	private void fillSDIPort(Server server){
		byte[] info = cmdMediaInfoService.getMediaInfo(server, "sdiport:", null);
		List<Integer> sdiPortList = new ArrayList<Integer>();
		if(info != null){
			XmlHelper xmlHelper;
			try {
				xmlHelper = new XmlHelper(new StringReader(new String(info,"utf-8")));
				LOG.info("fillSDIPort,server = " + server.getIp());
				LOG.info(new String(info,"utf-8"));
				
				NodeList nodeList = xmlHelper.selectNodes("//Ports//Port[@idx]");
				for(int i = 0; i < nodeList.getLength();i++){
					sdiPortList.add(Integer.parseInt(nodeList.item(i).getAttributes().getNamedItem("idx").getNodeValue()));
				}
				
			} catch (SAXException | IOException | ParserConfigurationException | XPathExpressionException e) {
				LOG.error("fillSDIPort failed.", e);
			}
		}
		server.setSdiPorts(sdiPortList);
	}

	public String save(){
		try{
			List<MatrixSetting> settings = new ArrayList<MatrixSetting>();
			for(Server server : group.getServers()){
				for(MatrixSetting setting:server.getMatrixSettings()){
					setting.setServer(server);
					setting.setMatrix(matrix);
				}
				settings.addAll(server.getMatrixSettings());
			}
			matrixSettingService.saveSettings(settings);
			matrix = matrixService.get(matrix.getId());
			matrixService.sendCmd(matrix);
			this.description = getText("msg.success.save");
			code = 0;
		}catch(Exception e){
			log.error("save matrix settings error.", e);
			code = 1;
		}
		
		return SUCCESS;
	}

}
