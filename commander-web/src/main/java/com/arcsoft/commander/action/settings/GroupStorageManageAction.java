package com.arcsoft.commander.action.settings;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.RemoteStorageService;

/**
 * Action for batch manage storage.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupStorageManageAction extends GroupSettingUpdateAction {

	private Logger log = Logger.getLogger(GroupStorageManageAction.class);
	private RemoteStorageService remoteStorageService;
	private Storage storage;
	private String action;

	/**
	 * Set the remote storage service.
	 * 
	 * @param remoteStorageService - the remote storage service to be set
	 */
	public void setRemoteStorageService(RemoteStorageService remoteStorageService) {
		this.remoteStorageService = remoteStorageService;
	}

	/**
	 * Returns the storage.
	 */
	public Storage getStorage() {
		return storage;
	}

	/**
	 * Set the storage.
	 * 
	 * @param storage - the storage
	 */
	public void setStorage(Storage storage) {
		this.storage = storage;
	}

	/**
	 * Storage action.
	 * 
	 * @param action - the storage action
	 */
	public void setAction(String action) {
		this.action = action;
	}

	/**
	 * Execute different logic on the specified server according to the given action.
	 */
	@Override
	protected ActionResult execute(Server server) {
		try {
			if ("add".equalsIgnoreCase(action)) {
				return addStorage(server, storage);
			} else if ("remove".equalsIgnoreCase(action)) {
				return removeStorage(server, storage);
			} else if ("mount".equalsIgnoreCase(action)) {
				return mountStorage(server, storage);
			} else if ("unmount".equalsIgnoreCase(action)) {
				return unmountStorage(server, storage);
			} else {
				return new ActionResult(false, getActionText("common.error.unknown"));
			}
		} catch (SystemNotInitializedException e) {
			return new ActionResult(false, getActionText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			return new ActionResult(false, getActionText("system.slave.access.denied"));
		} catch (ServerNotAvailableException e) {
			return new ActionResult(false, getActionText("msg.error.server.not.available"));
		} catch (Exception e) {
			log.error("execute " + action + " error on server " + server.getIp(), e);
			return new ActionResult(false, getActionText("common.error.unknown"));
		}
	}

	/**
	 * Add storage.
	 * <p>
	 * (1) If the storage does not exist, create it, then mount it.<br/>
	 * (2) If the storage exists, mount it.<br/>
	 * (3) If the storage name exists, but path is not same, show error.<br/>
	 */
	private ActionResult addStorage(Server server, Storage storage) {
		Storage exist = remoteStorageService.getRemoteStorageByName(server, storage.getName());
		if (exist == null) {
			remoteStorageService.addRemoteStorage(server, storage);
		} else if (!exist.getPath().equals(storage.getPath())) {
			return new ActionResult(false, getActionText("server.setting.storage.warning.existed"));
		}
		return remoteMount(server, storage);
	}

	/**
	 * Mount storage.
	 * <p>
	 * (1) If the storage does not exist, skip it.<br/>
	 * (2) If the storage exists, mount it.
	 */
	private ActionResult mountStorage(Server server, Storage storage) {
		Storage exist = remoteFind(server, storage);
		if (exist != null)
			return remoteMount(server, exist);
		return null;
	}

	/**
	 * Unmount storage.
	 * <p>
	 * (1) If the storage does not exist, skip it.<br/>
	 * (2) If the storage exists, unmount it.
	 */
	private ActionResult unmountStorage(Server server, Storage storage) {
		Storage exist = remoteFind(server, storage);
		if (exist != null)
			return remoteUnmout(server, exist);
		return null;
	}

	/**
	 * Remove storage.
	 * <p>
	 * (1) If the storage does not exist, skip it.<br/>
	 * (2) If the storage exists, unmount it fist, then remove it.
	 */
	private ActionResult removeStorage(Server server, Storage storage) {
		Storage exist = remoteFind(server, storage);
		if (exist != null) {
			ActionResult result = remoteUnmout(server, exist);
			if (!result.isSuccess())
				return result;
			remoteStorageService.delRemoteStorage(server, exist.getId());
			return new ActionResult(true);
		}
		return null;
	}

	/**
	 * Find the same storage on remote.
	 * <p>
	 * Only when the name and path are same, we consider the storage is same.
	 */
	private Storage remoteFind(Server server, Storage storage) {
		Storage exist = remoteStorageService.getRemoteStorageByName(server, storage.getName());
		if (exist != null && exist.getPath().equals(storage.getPath()))
			return exist;
		return null;
	}

	/**
	 * Mount remote storage without check exist.
	 */
	private ActionResult remoteMount(Server server, Storage storage) {
		try {
			remoteStorageService.mountStorage(server, storage);
			return new ActionResult(true);
		} catch (RemoteException e) {
			return new ActionResult(false, getActionText("msg.error.setting.storage.mount.fail"));
		}
	}

	/**
	 * Unmount remote storage without check exist.
	 */
	private ActionResult remoteUnmout(Server server, Storage storage) {
		try {
			remoteStorageService.umountStorage(server, storage);
			return new ActionResult(true);
		} catch (RemoteException e) {
			return new ActionResult(false, getActionText("msg.error.setting.storage.unmount.fail"));
		}
	}

}
