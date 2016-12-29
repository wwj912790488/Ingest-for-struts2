package com.arcsoft.commander.action.settings;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalStorageService;
import com.arcsoft.commander.service.settings.RemoteStorageService;

/**
 * 
 * @author hxiang
 */
@SuppressWarnings("serial")
public class StorageAction extends BaseServerSettingAction {

	private LocalStorageService localStorageService;
	private RemoteStorageService remoteStorageService;

	private List<Storage> remoteStorageList = new ArrayList<Storage>();
	private List<Boolean> storageStatusList = new ArrayList<Boolean>();

	// For adding storage
	private Storage storage;
	private String[] supportedTypes = {"cifs","nfs"};

	public String get() {
		try {
			if (isLocal) {
				remoteStorageList = localStorageService.findAllRemoteStorages();

				storageStatusList.clear();
				Map<String, String> mountedMap = localStorageService.getRemoteMounted();
				for (Storage each : remoteStorageList)
					storageStatusList.add(mountedMap.containsKey(each.getName())
							&& mountedMap.get(each.getName()).equals(each.getPath()));
			} else {
				storageStatusList.clear();
				Server agent = serverService.getServer(id);
				Map<String, String> mountedMap = remoteStorageService.getRemoteMounted(agent);

				remoteStorageList = remoteStorageService.findAllRemoteStorages(agent);
				for (Storage each : remoteStorageList)
					storageStatusList.add(mountedMap.containsKey(each.getName())
							&& mountedMap.get(each.getName()).equals(each.getPath()));
			}
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
			addActionError(re.getMessage());
			return ERROR;
		} catch (Exception e) {
			addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	public RemoteStorageService getRemoteStorageService() {
		return remoteStorageService;
	}

	public void setRemoteStorageService(RemoteStorageService remoteStorageService) {
		this.remoteStorageService = remoteStorageService;
	}

	public void validateAdd() {
		if (getFieldErrors().size() == 0) {
			Storage st = null;
			if (isLocal) {
				st = localStorageService.getRemoteStorageByName(storage.getName());
			} else {
				try{
					Server agent = serverService.getServer(id);
					st = remoteStorageService.getRemoteStorageByName(agent, storage.getName());
				}finally{
					//do nothing;
				}
			}
			
			if (st != null){
				addFieldError("storage.name", getText("server.setting.storage.warning.existed"));
			}
		}
	}
	
	public void validateUpdate() {
		if (getFieldErrors().size() == 0) {
			Storage st = null;
			if (isLocal) {
				Storage oldStorage = localStorageService.getRemoteStorage(Integer.valueOf(storage.getId()));
				if (!oldStorage.getName().equals(storage.getName())){
					st = localStorageService.getRemoteStorageByName(storage.getName());
				}
			} else {
				try{
					Server agent = serverService.getServer(id);
					Storage oldStorage = remoteStorageService.getRemoteStorage(agent, Integer.valueOf(storage.getId()));
					if (!oldStorage.getName().equals(storage.getName())){
						st = remoteStorageService.getRemoteStorageByName(agent, storage.getName());
					}
				}finally{
					//do nothing;
				}
			}
			
			if (st != null){
				addFieldError("storage.name", getText("server.setting.storage.warning.existed"));
			}
		}
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String add() {
		try {
			if (isLocal) {
				localStorageService.addRemoteStorage(storage);
			} else {
				Server agent = serverService.getServer(id);
				remoteStorageService.addRemoteStorage(agent, storage);
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
	public String update() {
		try {
			if (isLocal) {
				localStorageService.updateStorage(storage);
			} else {
				Server agent = serverService.getServer(id);
				remoteStorageService.updateStorage(agent, storage);
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
				localStorageService.delRemoteStorage(Integer.valueOf(storage.getId()));
			} else {
				Server agent = serverService.getServer(id);
				remoteStorageService.delRemoteStorage(agent, Integer.valueOf(storage.getId()));
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
	public String mount() {
		try {
			if (isLocal) {
				storage = localStorageService.getRemoteStorage(Integer.valueOf(storage.getId()));
				if (storage != null) {
					localStorageService.mountStorage(storage);
				}
			} else {
				Server agent = serverService.getServer(id);
				storage = remoteStorageService.getRemoteStorage(agent, Integer.valueOf(storage.getId()));
				if (storage != null) {
					remoteStorageService.mountStorage(agent, storage);
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
	public String unmount() {
		try {
			if (isLocal) {
				storage = localStorageService.getRemoteStorage(Integer.valueOf(storage.getId()));
				if (storage != null) {
					localStorageService.umountStorage(storage);
				}
			} else {
				Server agent = serverService.getServer(id);
				storage = remoteStorageService.getRemoteStorage(agent, Integer.valueOf(storage.getId()));
				if (storage != null) {
					remoteStorageService.umountStorage(agent, storage);
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

	public List<Storage> getRemoteStorageList() {
		return remoteStorageList;
	}

	public LocalStorageService getLocalStorageService() {
		return localStorageService;
	}

	public void setLocalStorageService(LocalStorageService localStorageService) {
		this.localStorageService = localStorageService;
	}

	public List<Boolean> getStorageStatusList() {
		return storageStatusList;
	}

	public void setStorage(Storage storage) {
		this.storage = storage;
	}

	public Storage getStorage() {
		return storage;
	}

	public String[] getSupportedTypes() {
		return supportedTypes;
	}

	public void setSupportedTypes(String[] supportedTypes) {
		this.supportedTypes = supportedTypes;
	}
}
