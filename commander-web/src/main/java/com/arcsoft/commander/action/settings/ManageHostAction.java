package com.arcsoft.commander.action.settings;

import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.server.SwitchCause;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.AccessDeniedException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.cluster.ClusterService;
import com.arcsoft.commander.service.server.ServerBindingService;
import com.arcsoft.commander.service.server.ServerSwitchService;
import com.arcsoft.commander.service.settings.LocalHostService;
import com.arcsoft.commander.service.settings.RemoteHostService;

@SuppressWarnings("serial")
public class ManageHostAction extends BaseServerSettingAction {

	private LocalHostService localHostService;
	private RemoteHostService remoteHostService;
	private ServerBindingService serverBindingService;
	private ServerSwitchService serverSwitchService;
	private ClusterService clusterService;
	private String backupServerId;
	private int index;
	private Boolean isBackup;
	private ServerGroup group;

	public void setLocalHostService(LocalHostService localHostService) {
		this.localHostService = localHostService;
	}

	public void setRemoteHostService(RemoteHostService remoteHostService) {
		this.remoteHostService = remoteHostService;
	}

	public void setServerBindingService(ServerBindingService serverBindingService) {
		this.serverBindingService = serverBindingService;
	}

	public void setServerSwitchService(ServerSwitchService serverSwitchService) {
		this.serverSwitchService = serverSwitchService;
	}

	public void setClusterService(ClusterService clusterService) {
		this.clusterService = clusterService;
	}
	
	public String getBackupServerId() {
		return this.backupServerId;
	}

	public void setBackupServerId(String backupServerId) {
		this.backupServerId = backupServerId;
	}
	
	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public ServerGroup getGroup() {
		return group;
	}

	public void setGroup(ServerGroup group) {
		this.group = group;
	}

	public Boolean getIsBackup() {
		return this.isBackup;
	}

	public void setIsBackup(Boolean isBackup) {
		this.isBackup = isBackup;
	}

	public String execute() {
		if (!this.isLocal) {
			Server server = serverService.getServer(id);
			if (server != null) {
				this.isBackup = server.isBackup();
				this.group = serverService.getGroup(server.getGroup().getId(), true);
			}
		}
		return SUCCESS;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String reboot() {
		try {
			if (isLocal) {
				localHostService.reboot();
			} else {
				clusterService.stopFaultMonitor(id);
				Server agent = serverService.getServer(id);
				remoteHostService.reboot(agent);
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
	public String shutdown() {
		try {
			if (isLocal) {
				localHostService.shutdown();
			} else {
				clusterService.stopFaultMonitor(id);
				Server agent = serverService.getServer(id);
				remoteHostService.shutdown(agent);
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
	public String switchRole() {
		this.group = serverService.getGroup(this.group.getId(), true);
		List<Server> servers = group.getServers();
		if (servers.size() > 1) {
			try {
				boolean isSlave = servers.get(0).isBackup();
				Server master = isSlave ? servers.get(1) : servers.get(0);
				serverBindingService.switchRole(master);
			} catch (SystemNotInitializedException e) {
				addActionError(getText("system.not.initialized"));
			} catch (AccessDeniedForSlaveException e) {
				addActionError(getText("system.slave.access.denied"));
			} catch (ServerNotAvailableException se) {
				addActionError(getText("msg.error.server.not.available"));
			} catch(RemoteException e) {
				addActionError(getText("msg.error.switchrole.fail"));
			}
		} else {
			addActionError(getText("msg.error.switchrole.fail"));
		}
		return SUCCESS;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String switchServer() {
		try {
			Future<?> future = serverSwitchService.updateWorkerServer(id, backupServerId, SwitchCause.MANUAL);
			
			try {
				future.get(15000, TimeUnit.MILLISECONDS);
			} catch (CancellationException e) {
				future.cancel(true);   
				addActionError(getText("msg.error.switchserver.fail"));
			} catch (InterruptedException e) {   
				future.cancel(true);   
				addActionError(getText("msg.error.switchserver.fail"));
			} catch (ExecutionException e) {   
				future.cancel(true);
				if (e.getCause() != null) {
					 if (e.getCause() instanceof ObjectNotExistsException) {
						addActionError(getText("msg.error.switchserver.not.exists"));
					 }
					 else if (e.getCause() instanceof AccessDeniedException) {
						addActionError(getText("msg.error.switchserver.access.denied"));
					 }
					 else if (e.getCause() instanceof ServerNotAvailableException) {
						addActionError(getText("msg.error.switchserver.not.available"));
					 }
					 else {
						addActionError(getText("msg.error.switchserver.fail"));
					 }
				}
				else {
					addActionError(getText("msg.error.switchserver.fail"));
				}
			} catch (TimeoutException e) {   
				addActionError(getText("msg.error.switchserver.timeout"));
			}

		} catch(Exception e) {
			addActionError(getText("msg.error.switchserver.fail"));
		}
		
		return SUCCESS;
	}
}
