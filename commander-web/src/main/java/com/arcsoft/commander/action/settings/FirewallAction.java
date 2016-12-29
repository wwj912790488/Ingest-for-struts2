package com.arcsoft.commander.action.settings;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalFirewallService;
import com.arcsoft.commander.service.settings.RemoteFirewallService;

/**
 * Action for firewall
 * 
 * @author hxiang
 */
@SuppressWarnings("serial")
public class FirewallAction extends BaseServerSettingAction {

	private LocalFirewallService localFirewallService;
	private RemoteFirewallService remoteFirewallService;
	private FirewallRule rule;//parameter for adding and deleting firewall rule.
	private List<FirewallRule> rules; //result for getting all firewall rule.
	private boolean isFirewallOn = false;
	private int index;

	public void setLocalFirewallService(LocalFirewallService localFirewallService) {
		this.localFirewallService = localFirewallService;
	}

	public void setRemoteFirewallService(RemoteFirewallService remoteFirewallService) {
		this.remoteFirewallService = remoteFirewallService;
	}

	public boolean getIsFirewallOn() {
		return isFirewallOn;
	}

	public FirewallRule getRule() {
		return rule;
	}

	public void setRule(FirewallRule rule) {
		this.rule = rule;
	}

	public void setIsFirewallOn(boolean isFirewallOn) {
		this.isFirewallOn = isFirewallOn;
	}

	public List<FirewallRule> getRules() {
		return rules;
	}

	public void setRules(List<FirewallRule> rules) {
		this.rules = rules;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		try {
			if (isLocal) {
				if (localFirewallService.isFirewallOn()) {
					isFirewallOn = true;
					rules = localFirewallService.getFirewalls();
				}
			} else {
				Server agent = serverService.getServer(id);
				if (remoteFirewallService.isFirewallOn(agent)) {
					isFirewallOn = true;
					rules = remoteFirewallService.getFirewalls(agent);
				}
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
				localFirewallService.addFirewall(rule);
			} else {
				Server agent = serverService.getServer(id);
				remoteFirewallService.addFirewall(agent, rule);
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
				localFirewallService.deleteFirewall(rule);
			} else {
				Server agent = serverService.getServer(id);
				remoteFirewallService.deleteFirewall(agent, rule);
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
	public String start() {
		try {
			if (isLocal) {
				localFirewallService.startFirewall();
			} else {
				Server agent = serverService.getServer(id);
				remoteFirewallService.startFirewall(agent);
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
	public String stop() {
		try {
			if (isLocal) {
				localFirewallService.stopFirewall();
			} else {
				Server agent = serverService.getServer(id);
				remoteFirewallService.stopFirewall(agent);
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
