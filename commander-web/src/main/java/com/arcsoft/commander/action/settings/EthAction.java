package com.arcsoft.commander.action.settings;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalEthService;
import com.arcsoft.commander.service.settings.RemoteEthService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Action for network interface operation
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class EthAction extends BaseServerSettingAction {

	protected LocalEthService localEthService;
	protected RemoteEthService remoteEthService;
	private int index = 0;
	
	/**
	 * @return the index
	 */
	public int getIndex() {
		return index;
	}

	
	/**
	 * @param index the index to set
	 */
	public void setIndex(int index) {
		this.index = index;
	}

	private List<Eth> eths;

	/**
	 * for get one or more eth's statistics, divide by ","
	 */
	private String ethIds;

	/**
	 * for storage one or more eth's statistics
	 */
	private List<Integer> usedRates;

	/**
	 * for bond network interface
	 */
	private String slaveId;

	/**
	 * for json output, the result code
	 */
	private int code;
	/**
	 * for json output, the detail fail description.
	 */
	private String description;

	public void setLocalEthService(LocalEthService localEthService) {
		this.localEthService = localEthService;
	}

	public void setRemoteEthService(RemoteEthService remoteEthService) {
		this.remoteEthService = remoteEthService;
	}

	public void setEths(List<Eth> eths) {
		this.eths = eths;
	}

	public List<Eth> getEths() {
		return eths;
	}

	public int getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}

	public void setEthIds(String ethIds) {
		this.ethIds = ethIds;
	}

	public List<Integer> getUsedRates() {
		return usedRates;
	}

	public void setSlaveId(String slaveId) {
		this.slaveId = slaveId;
	}

	public String getSlaveId(String srcEthId) {//Get backup ethID
		Eth slaveEth = getSlave(eths,srcEthId);
		return slaveEth != null ? slaveEth.getId() : null;
	}
	
	private Eth getSlave(List<Eth> eths,String srcEthId) {//Get backup eth
		Eth srcEth = getEthById(eths, srcEthId);
		if( srcEth.getMaster() != null ){
			for(Eth e : eths){
				if(srcEth.getId().equals(e.getId()))
					continue;
				if(srcEth.getMaster().equals(e.getMaster())){
					return e;
				}
			}
		}		
		return null;
	}

	public Map<String, String> getPrimaryReselectOptions() {
		Map<String, String> options = new LinkedHashMap<>();
		options.put("0", getText("server.setting.network.eth.primary.reselect.always"));
		options.put("1", getText("server.setting.network.eth.primary.reselect.better"));
		options.put("2", getText("server.setting.network.eth.primary.reselect.failure"));
		return options;
	}

	private Eth getEthById(List<Eth> allEths, String ethId) {
		for (Eth eth : allEths) {
			if (eth.getId().equals(ethId))
				return eth;
		}
		return null;
	}

	private List<Eth> getShownEths(List<Eth> allEths) {
		if (allEths == null) return null;
		List<Eth> ret = new ArrayList<Eth>();
		for (Eth eth : allEths) {
			if (!eth.getIsbond()) {
				if (eth.getMaster() != null) {
					Eth master = getEthById(allEths, eth.getMaster());
					if(master != null){
						eth.setIsDHCP(master.getIsDHCP());
						eth.setIp(master.getIp());
						eth.setMask(master.getMask());
						eth.setGateway(master.getGateway());
						eth.setPrimary(master.getPrimary());
						eth.setPrimaryReselect(master.getPrimaryReselect());
						eth.setActivity(master.getActivity());
						eth.setMode(master.getMode());
					} else{
						eth.setMaster(null);
					}
				}
				ret.add(eth);
			}
		}
		return ret;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String list() {
		if (isLocal) {
			try {
				eths = getShownEths(localEthService.findAllEths());
			} catch (ShellException | IOException e) {
				return ERROR;
			}
		} else {
			try {
				Server agent = serverService.getServer(id);
				eths = getShownEths(remoteEthService.findAllEths(agent));
			} catch (SystemNotInitializedException e) {
				addActionError(getText("system.not.initialized"));
				return ERROR;
			} catch (AccessDeniedForSlaveException e) {
				addActionError(getText("system.slave.access.denied"));
				return ERROR;
			} catch (ServerNotAvailableException se) {
				addActionError(getText("msg.error.server.not.available"));
				return ERROR;
			} catch (RemoteException re) {
				return ERROR;
			}
		}

		return SUCCESS;
	}

	public void validateSave() {
		Eth eth = eths.get(index);
		if (!eth.getIsDHCP()) {
			String v;
			v = eth.getIp();
			if (!isValidIP(v)) {
				addFieldError("ip", getText("settings.err.invalid.ip"));
			}
			v = eth.getMask();
			if (!isValidIP(v)) {
				addFieldError("netmask", getText("settings.err.invalid.netmask"));
			}
			v = eth.getGateway();
			if (v != null && v.length() > 0 && !isValidIP(v)) {
				addFieldError("gateway", getText("settings.err.invalid.gateway"));
			}
		}
	}

	private boolean isValidIP(String ip) {
		String regex = "((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)";
		if (ip.matches(regex)) {
			return true;
		}
		return false;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		if (slaveId != null && slaveId.length() == 0)
			slaveId = null;
		if (isLocal) {
			try {
				Eth eth = eths.get(index);
				eth.setMode(1);
				localEthService.bondAndUpdateEth(eth, slaveId);
				this.code = 0;
				this.description = getText("msg.success.save");
			} catch (IOException | NumberFormatException | ShellException e) {
				this.code = -1;
				this.description = getText("msg.error.save.eth");
			}
		} else {
			try {
				Server agent = serverService.getServer(id);
				Eth eth = eths.get(index);
				eth.setMode(1);
				remoteEthService.bondAndUpdateEth(agent, eth, slaveId);
				this.code = 0;
				this.description = getText("msg.success.save");
			} catch (SystemNotInitializedException e) {
				this.code = -1;
				this.description = getText("system.not.initialized");
			} catch (AccessDeniedForSlaveException e) {
				this.code = -1;
				this.description = getText("system.slave.access.denied");
			} catch (ServerNotAvailableException se) {
				this.code = -1;
				this.description = getText("msg.error.server.not.available");
			} catch (RemoteException re) {
				this.code = -1;
				this.description = getText("msg.error.server.save.eth");
			}
		}

		return SUCCESS;

	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String listUsedRate() {
		String[] arrayEthId = ethIds.split(",");
		int iIndex = 0;
		usedRates = new ArrayList<Integer>();

		for (String ethId : arrayEthId) {
			int usedRate = 0;
			try {
				if (isLocal) {
					usedRate = localEthService.getEthUsedRate(ethId);
				} else {
					Server agent = serverService.getServer(id);
					usedRate = remoteEthService.getEthUsedRate(agent, ethId);
				}
				usedRates.add(iIndex, usedRate);
				list();
				this.code = 0;
			} catch (Exception e) {
				// if error, set used rate as zero
				usedRates.add(iIndex, 0);
				this.code = 0;
			}
			iIndex++;
		}

		return SUCCESS;

	}

}
