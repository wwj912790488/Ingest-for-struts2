package com.arcsoft.commander.service.settings;

import java.util.List;
import java.util.Map;

import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * This service is used to set storage of the agent.
 * 
 * @author hxiang
 */
public interface LocalStorageService {

	public Map<String, String> getRemoteMounted() throws ShellException;
	public void mountStorage(Storage s) throws Exception;
	public void umountStorage(Storage s) throws Exception;

	public void addRemoteStorage(Storage st) ;
	public void delRemoteStorage(Integer id) throws ShellException;
	public List<Storage> findAllRemoteStorages();

	public Storage getRemoteStorage(Integer id);
	public Storage getRemoteStorageByName(String name);

	public void updateStorage(Storage s) throws Exception;

}
