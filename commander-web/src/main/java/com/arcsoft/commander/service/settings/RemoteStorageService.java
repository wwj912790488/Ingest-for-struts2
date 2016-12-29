package com.arcsoft.commander.service.settings;

import java.util.List;
import java.util.Map;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Remote storage service.
 * 
 * @author hxiang
 */
public interface RemoteStorageService {

	/**
	 * Get mounted storages mapping from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @return the storages mapping.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public Map<String, String> getRemoteMounted(Server agent);

	/**
	 * Mount storage to the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param s - the storage to be mounted
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public void mountStorage(Server agent, Storage s);

	/**
	 * Unmount storage to the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param s - the storage to be unmounted
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public void umountStorage(Server agent, Storage s);

	/**
	 * Add remote storage to the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param st - the storage to be added
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public void addRemoteStorage(Server agent, Storage st);

	/**
	 * Delete the remote storage from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param id - the storage id to be deleted
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public void delRemoteStorage(Server agent, Integer id);

	/**
	 * Get all remote storages from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @return the storages list.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public List<Storage> findAllRemoteStorages(Server agent);

	/**
	 * Get the storage by the given id from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param id - the storage id
	 * @return the storage information.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public Storage getRemoteStorage(Server agent, Integer id);

	/**
	 * Get the storage by the given name from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param name - the storage name
	 * @return the storage information.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public Storage getRemoteStorageByName(Server agent, String name);

	/**
	 * Update the storage from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param storage - the storage
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	public void updateStorage(Server agent, Storage storage);

}
