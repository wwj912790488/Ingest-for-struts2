package com.arcsoft.commander.action.settings;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.dao.settings.EthType;
import com.arcsoft.commander.domain.server.NIO;
import com.arcsoft.commander.domain.server.NioBinding;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.NioService;
import com.arcsoft.commander.service.settings.RemoteEthService;

/**
 * Action for setting network input-output of server
 * 
 * @author wtsun
 */
@SuppressWarnings("serial")
public class NioAction extends BaseServerSettingAction {
	protected NioService nioService;
	protected RemoteEthService remoteEthService;
	protected List<NIO> nios; //result for getting network input-output settings; //parameter for saving network input-output settings.
	protected List<NioBinding> niobs; //parameter for binding the network input-output of the specified server.
	protected List<Eth> eths;
	
	/**
	 * @param nioService the nioService to set
	 */
	public void setNioService(NioService nioService) {
		this.nioService = nioService;
	}

	/**
	 * @param remoteEthService the remoteEthService to set
	 */
	public void setRemoteEthService(RemoteEthService remoteEthService) {
		this.remoteEthService = remoteEthService;
	}
	
	/**
	 * @return the nios
	 */
	public List<NIO> getNios() {
		return nios;
	}

	/**
	 * @param nois the nios to set
	 */
	public void setNios(List<NIO> nios) {
		this.nios = nios;
	}

	/**
	 * @return the eths
	 */
	public List<Eth> getEths() {
		return eths;
	}

	
	/**
	 * @param eths the eths to set
	 */
	public void setEths(List<Eth> eths) {
		this.eths = eths;
	}
	
	/**
	 * @return the niobs
	 */
	public List<NioBinding> getNiobs() {
		return niobs;
	}
	
	/**
	 * @param noibs the niobs to set
	 */
	public void setNiobs(List<NioBinding> niobs) {
		this.niobs = niobs;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		this.nios = this.nioService.getNios();
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		this.nioService.updateNios(this.nios);
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String bindingView() {
		try {
			Server agent = serverService.getServer(id);
			this.nios = this.nioService.getNios();
			this.niobs =  this.nioService.getServerNioBindings(agent);
			this.eths = remoteEthService.getValidEths(agent);
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException se) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (RemoteException re) {
			addActionError(re.getMessage());
		} catch (Exception e) {
			addActionError(e.getMessage());
		}
		return SUCCESS;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String bindingUpdate() {
		try {
			Server agent = serverService.getServer(id);
			this.nioService.updateServerNioBindings(agent, this.niobs);
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException se) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (RemoteException re) {
			addActionError(re.getMessage());
		} catch (Exception e) {
			addActionError(e.getMessage());
		}			
		return SUCCESS;
	}

	public Map<Integer, String> getNioOptions() {
		Map<Integer, String> options = new LinkedHashMap<>();
		options.put(EthType.PRIMARY_INPUT, getText("server.setting.network.nio.primary.input"));
		options.put(EthType.SECONDARY_INPUT, getText("server.setting.network.nio.secondary.input"));
		options.put(EthType.PRIMARY_OUTPUT, getText("server.setting.network.nio.primary.output"));
		options.put(EthType.SECONDARY_OUTPUT, getText("server.setting.network.nio.secondary.output"));
		return options;
	}
	
	public String getNioBindingEth(int id) {
		if (this.niobs != null) {
			for (NioBinding niob : this.niobs) {
				if (niob.getNio() == id)
					return niob.getEth();
			}
		}
		return "";
	}	
}
