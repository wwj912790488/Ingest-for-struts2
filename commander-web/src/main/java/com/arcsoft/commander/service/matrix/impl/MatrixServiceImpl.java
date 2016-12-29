package com.arcsoft.commander.service.matrix.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.matrix.IController;
import com.arcsoft.arcvideo.matrix.domain.Crosspoint;
import com.arcsoft.arcvideo.matrix.domain.LevelInfo;
import com.arcsoft.arcvideo.matrix.domain.VideoRoute;
import com.arcsoft.arcvideo.matrix.exception.MethodUnSupportException;
import com.arcsoft.arcvideo.matrix.exception.UnSupportException;
import com.arcsoft.arcvideo.matrix.nevion.serial.SerialController;
import com.arcsoft.arcvideo.matrix.nevion.tcp.TcpController;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.commander.dao.matrix.MatrixDao;
import com.arcsoft.commander.domain.matrix.Matrix;
import com.arcsoft.commander.domain.matrix.MatrixSetting;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.service.matrix.MatrixService;
import com.arcsoft.commander.service.matrix.MatrixSettingService;
import com.arcsoft.commander.service.server.event.ServerTakeOverEvent;


/**
 * 
 * @author ybzhang
 */
public class MatrixServiceImpl implements MatrixService {

	private MatrixDao matrixDao;
	private IController controller;
	private String com;
	private int bitRate;
	private int stopFlag;
	private int parity;
	private int databits;
	private int inCount;
	private int outCount;
	private MatrixSettingService matrixSettingService;
	private Logger LOG = Logger.getLogger(getClass());
	private boolean serialInited = false;
	private int level;
	/**
	 * @param matrixSettingService the matrixSettingService to set
	 */
	public void setMatrixSettingService(MatrixSettingService matrixSettingService) {
		this.matrixSettingService = matrixSettingService;
	}
	
	/**
	 * @param inCount the inCount to set
	 */
	public void setInCount(int inCount) {
		this.inCount = inCount;
	}
	
	/**
	 * @param outCount the outCount to set
	 */
	public void setOutCount(int outCount) {
		this.outCount = outCount;
	}
	
	/**
	 * @param matrixDao the matrixDao to set
	 */
	public void setMatrixDao(MatrixDao matrixDao) {
		this.matrixDao = matrixDao;
	}
	
	@Override
	public Matrix save(Matrix matrix) {
		return matrixDao.save(matrix);
	}

	@Override
	public Matrix update(Matrix matrix) {
		matrix = matrixDao.update(matrix);
		try {
			sendCmd(matrixDao.get(matrix.getId()));
		} catch (UnSupportException | MethodUnSupportException e) {
			LOG.error("update mutrix failed.", e);
		}
		return matrix;
	}

	@Override
	public Matrix get(Integer id) {
		return matrixDao.get(id);
	}

	
	/**
	 * @param controller the controller to set
	 */
	public void setController(IController controller) {
		this.controller = controller;
	}
	
	
	/**
	 * @param com the com to set
	 */
	public void setCom(String com) {
		this.com = com;
	}
	
	/**
	 * @param bitRate the bitRate to set
	 */
	public void setBitRate(int bitRate) {
		this.bitRate = bitRate;
	}
	
	/**
	 * @param databits the databits to set
	 */
	public void setDatabits(int databits) {
		this.databits = databits;
	}
	
	/**
	 * @param parity the parity to set
	 */
	public void setParity(int parity) {
		this.parity = parity;
	}
	
	/**
	 * @param stopFlag the stopFlag to set
	 */
	public void setStopFlag(int stopFlag) {
		this.stopFlag = stopFlag;
	}
	
	@Override
	public void delete(Matrix matrix) {
		matrixDao.delete(matrix);
	}

	@Override
	public List<Matrix> list(QueryInfo info) {
		return matrixDao.list(info);
	}

	@Override
	public List<Matrix> list(Integer groupId) {
		return matrixDao.list(groupId);
	}

	private void initMatrixInterface(Matrix matrix){
		Map<String,String> params = new HashMap<String,String>();
		if(controller instanceof TcpController){
			params.put(IController.MATRIX_TCP_HOST, matrix.getIp());
			params.put(IController.MATRIX_TCP_PORT, String.valueOf(matrix.getPort()));
			controller.initialize(params);
			level = 1;
		}else if(controller instanceof SerialController){
			params.put(IController.MATRIX_SERIAL_BITRATE, String.valueOf(bitRate));
			params.put(IController.MATRIX_SERIAL_COM, com);
			params.put(IController.MATRIX_SERIAL_PARITY, String.valueOf(parity));
			params.put(IController.MATRIX_SERIAL_DATABITS, String.valueOf(databits));
			params.put(IController.MATRIX_SERIAL_STOPBITS, String.valueOf(stopFlag));
			if(!serialInited){
				controller.initialize(params);
				serialInited = true;
			}
			level = 0;
		}
	}
	@Override
	public void coQuery(Matrix matrix, Crosspoint cp) {
		try {
			cp.setLevel(level);
			
			initMatrixInterface(matrix);
			controller.coQuery(cp);
			LOG.info("coQuery,cp = " + cp.getRoutes());
		} catch (Exception e) {		}
	}

	@Override
	public List<LevelInfo> queryLevel(Matrix matrix) {
		initMatrixInterface(matrix);
		try {
			LOG.info("queryLevel,matrix = " + matrix.getIp());
			return controller.queryLevelInfo();
		} catch (MethodUnSupportException e) {
			LevelInfo levelInfo = new LevelInfo();
			levelInfo.setSize(inCount + "x" + outCount);
			List<LevelInfo> list = new ArrayList<LevelInfo>();
			list.add(levelInfo);
			return list;
		}
	}

	@Override
	public void sendCmd(Matrix matrix) throws UnSupportException, MethodUnSupportException {
		if(matrix != null){
			sendCmd(matrix.getMatrixSettings());
		}
	}
	
	private void sendCmd(Collection<MatrixSetting> settings) throws UnSupportException{
		if(settings != null && !settings.isEmpty()){
			for(MatrixSetting setting:settings){
				if(setting == null)
					continue;
				initMatrixInterface(setting.getMatrix());
				if(setting.getMatrixOut() != null){
					VideoRoute route = new VideoRoute();
					route.setOutNO(setting.getMatrixOut() - 1);
					route.setLevel(level);
					if(setting.getMatrixMasterIn() == null){
						LOG.info("disconnect,route = " + route);
						try{
							controller.disconnect(route);
						}catch(MethodUnSupportException e){
						}
						
					}else{
						route.setInNO(setting.getMatrixMasterIn() - 1);
						LOG.info("sendCmd,route = " + route);
						controller.sendCmd(route);
					}
				}
			}
		}
	}
	
	private void sendDisConnCmd(Collection<MatrixSetting> settings) throws MethodUnSupportException{
		if(settings != null && !settings.isEmpty()){
			for(MatrixSetting setting:settings){
				if(setting == null)
					continue;
				initMatrixInterface(setting.getMatrix());
				if(setting.getMatrixOut() != null){
					VideoRoute route = new VideoRoute();
					route.setOutNO(setting.getMatrixOut() - 1);
					route.setLevel(level);
					LOG.info("sendDisConnCmd,route = " + route);
					controller.disconnect(route);
				}
			}
		}
	}
	
	@EventReceiver(value = ServerTakeOverEvent.class, sync=true)
	public void onServerTakeOver(ServerTakeOverEvent event){
		LOG.info("onServerTakeOver");
		Server newServer = event.getNewServer();
		Server oldServer = event.getOldServer();
		if(newServer == null)
			return;
		LOG.info("onServerTakeOver,newServer = " + newServer.getIp() + ",oldServer = " + oldServer.getIp());
		List<MatrixSetting> newSettings = newServer.getMatrixSettings();
		List<MatrixSetting>	oldSettings = oldServer.getMatrixSettings();
		List<MatrixSetting> tempList = new ArrayList<MatrixSetting>();
		for(MatrixSetting newSetting:newSettings){
			if(newSetting == null)
				continue;
			tempList.add(newSetting);
			for(MatrixSetting oldSetting:oldSettings){
				if(oldSetting == null)
					continue;
				if(newSetting.getSdiPort() == oldSetting.getSdiPort()){
					newSetting.setMatrixMasterIn(oldSetting.getMatrixMasterIn());
					oldSetting.setMatrixMasterIn(null);
				}
			}
		}
		
		try {
			sendDisConnCmd(oldSettings);
		} catch (MethodUnSupportException e1) {
			LOG.error("sendDisConnCmd failed.", e1);
		}
		try {
			sendCmd(newSettings);
			for(MatrixSetting oldSetting:oldSettings){
				if(oldSetting == null)
					continue;
				tempList.add(oldSetting);
			}
			matrixSettingService.saveSettings(tempList);
		} catch (UnSupportException e) {
		} 
	}
}
