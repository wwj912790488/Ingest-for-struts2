package com.arcsoft.commander.action.sample;

import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.sample.FireWall;


/**
 * 
 * This action is for ajax sample.
 * 
 * @author zw
 *
 */
@SuppressWarnings("serial")
public class SampleAction extends BaseAction {
	
	private String name;
	private String ip;
	private String destination;
	private Map<String, String> fireList;



	
	/**
	 * Get network config and forward to network.jsp page.
	 * @return
	 * @throws Exception
	 */
	public String getNetwork() throws Exception {
		return "network";
	}
	
	/**
	 * Just redirect url.This will forward to index.jsp
	 * @return
	 * @throws Exception
	 */
	public String index() throws Exception {
		return "index";
	}

	/**
	 * Get firewall list and forward to firewall.jsp page.<br>
	 * if destination is not null, delete destination from {@link FireWall.fireWallList} first.
	 * @return
	 * @throws Exception
	 */
	public String getFireWall() throws Exception{
		if(!StringUtils.isBlank(getDestination())){
			FireWall.fireWallList.remove(getDestination());
		}
		this.fireList = FireWall.fireWallList;
		return "firewall";
	}
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public Map<String, String> getFireList() {
		return fireList;
	}

	public void setFireList(Map<String, String> fireList) {
		this.fireList = fireList;
	}

	
	
	
}
