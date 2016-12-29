package com.arcsoft.commander.action.settings;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalDNSService;
import com.arcsoft.commander.service.settings.RemoteDNSService;

/**
 * Action for dns.
 * 
 * @author hxiang
 */
@SuppressWarnings("serial")
public class DnsAction extends BaseServerSettingAction {

	private LocalDNSService localDNSService;
	private RemoteDNSService remoteDNSService;
	private int index;
	private DNS	dns; // parameter for adding and deleting route;
	private List<DNS> dnsList;  // result for getting all routeList.

	public void setLocalDNSService(LocalDNSService localDNSService) {
		this.localDNSService = localDNSService;
	}

	public void setRemoteDNSService(RemoteDNSService remoteDNSService) {
		this.remoteDNSService = remoteDNSService;
	}

	public int getIndex() {
		return index;
	}
	
	public void setIndex(int index) {
		this.index = index;
	}

	public DNS getDns() {
		return dns;
	}

	public void setDns(DNS dns) {
		this.dns = dns;
	}

	public List<DNS> getDnsList() {
		return dnsList;
	}

	public void setDnsList(List<DNS> dnsList) {
		this.dnsList = dnsList;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		try {
			if (isLocal) {
				dnsList = localDNSService.getDnSList();
			} else {
				Server agent = serverService.getServer(id);
				dnsList = remoteDNSService.getDnsList(agent);
			}
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
	public String add() {
		try {
			if (isLocal) {
				localDNSService.addDns(dns);
			} else {
				Server agent = serverService.getServer(id);
				remoteDNSService.addDns(agent, dns);
			}
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
	public String delete() {
		try {
			if (isLocal) {
				localDNSService.deleteDns(dns);
			} else {
				Server agent = serverService.getServer(id);
				remoteDNSService.deleteDns(agent, dns);
			}
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

}
