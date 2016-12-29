package com.arcsoft.commander.action.settings;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.service.settings.RemoteStorageService;

/**
 * Group storage view actions.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupStorageViewAction extends GroupSettingViewAction<Storage> {

	private RemoteStorageService remoteStorageService;
	private String[] supportedTypes = { "cifs", "nfs" };

	public void setRemoteStorageService(RemoteStorageService remoteStorageService) {
		this.remoteStorageService = remoteStorageService;
	}

	public String[] getSupportedTypes() {
		return supportedTypes;
	}

	@Override
	public Group<ServerData<Storage>> generate(ServerData<Storage> entity) {
		String groupKey = entity.getData().getName() + "/" + entity.getData().getPath();
		return new Group<>(entity.getData().getName(), groupKey);
	}

	@Override
	protected Comparator<Group<ServerData<Storage>>> getGroupComparator() {
		return new Comparator<Group<ServerData<Storage>>>() {
			@Override
			public int compare(Group<ServerData<Storage>> o1, Group<ServerData<Storage>> o2) {
				return ((String) o1.getValue()).compareTo((String) o2.getValue());
			}
		};
	}

	@Override
	protected void getDataFromServer(List<ServerData<Storage>> dataList, Server server) {
		List<Storage> storages = remoteStorageService.findAllRemoteStorages(server);
		Map<String, String> mountedMap = remoteStorageService.getRemoteMounted(server);
		if (storages != null) {
			for (Storage storage : storages) {
				boolean mounted = mountedMap.containsKey(storage.getName())
						&& mountedMap.get(storage.getName()).equals(storage.getPath());
				storage.setMounted(mounted);
				dataList.add(new ServerData<>(server, storage));
			}
		}
	}

}
