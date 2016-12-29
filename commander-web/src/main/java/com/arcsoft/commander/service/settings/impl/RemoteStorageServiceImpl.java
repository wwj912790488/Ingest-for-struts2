package com.arcsoft.commander.service.settings.impl;

import java.util.List;
import java.util.Map;
import com.arcsoft.commander.cluster.action.settings.storage.AddStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.AddStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.DeleteStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.DeleteStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.FindStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.FindStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.FindRemoteMountedStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.FindRemoteMountedStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.MountStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.MountStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.UnmountStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.UnmountStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.UpdateStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.UpdateStorageResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteStorageService;

/**
 * The implementation of storage settings for the specific agent.
 * 
 * @author hxiang
 */
public class RemoteStorageServiceImpl extends RemoteExecutorServiceSupport implements RemoteStorageService {

	@Override
	public Map<String, String> getRemoteMounted(Server agent) {
		FindRemoteMountedStorageRequest request = new FindRemoteMountedStorageRequest();
		FindRemoteMountedStorageResponse response = (FindRemoteMountedStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		return response.getStorageMap();
	}

	@Override
	public void mountStorage(Server agent, Storage s) {
		MountStorageRequest request = new MountStorageRequest();
		request.setStorage(s);
		MountStorageResponse response = (MountStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if(!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void umountStorage(Server agent, Storage s) {
		UnmountStorageRequest request = new UnmountStorageRequest();
		request.setStorage(s);
		UnmountStorageResponse response = (UnmountStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if(!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void addRemoteStorage(Server agent, Storage st) {
		AddStorageRequest request = new AddStorageRequest();
		request.setStorage(st);
		AddStorageResponse response = (AddStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if(!response.isSuccess())
			throw new RemoteException(agent);
		st.setId(response.getStorage().getId());
	}

	@Override
	public void delRemoteStorage(Server agent, Integer id) {
		DeleteStorageRequest request = new DeleteStorageRequest();
		request.setId(id);
		DeleteStorageResponse response = (DeleteStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if(!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public List<Storage> findAllRemoteStorages(Server agent) {
		FindStorageRequest request = new FindStorageRequest();
		request.setType(FindStorageRequest.SearchType.REMOTE);
		FindStorageResponse response = (FindStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		return response.getStorageList();
	}

	@Override
	public Storage getRemoteStorage(Server agent, Integer id) {
		Storage ret = null;
		FindStorageRequest request = new FindStorageRequest();
		request.setId(id);
		request.setType(FindStorageRequest.SearchType.REMOTE);
		FindStorageResponse response = (FindStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if (response.getStorageList().size() > 0)
			ret = response.getStorageList().get(0);
		return ret;
	}

	@Override
	public Storage getRemoteStorageByName(Server agent, String name) {
		Storage ret = null;
		FindStorageRequest request = new FindStorageRequest();
		request.setName(name);
		request.setType(FindStorageRequest.SearchType.REMOTE);
		FindStorageResponse response = (FindStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if (response.getStorageList().size() > 0)
			ret = response.getStorageList().get(0);
		return ret;
	}

	@Override
	public void updateStorage(Server agent, Storage storage) {
		UpdateStorageRequest request = new UpdateStorageRequest();
		request.setStorage(storage);
		UpdateStorageResponse response = (UpdateStorageResponse) remoteExecutorService
				.remoteExecute(request, agent);
		if(!response.isSuccess())
			throw new RemoteException(agent);		
	}

}
