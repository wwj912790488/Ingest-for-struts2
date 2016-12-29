package com.arcsoft.commander.action.settings;

import java.util.Comparator;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.domain.settings.LicenseInfo;
import com.arcsoft.commander.service.settings.RemoteLicenseService;

/**
 * Group licenses view actions.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupLicenseViewAction extends GroupSettingViewAction<LicenseInfo> {

	private RemoteLicenseService remoteLicenseService;

	public void setRemoteLicenseService(RemoteLicenseService remoteLicenseService) {
		this.remoteLicenseService = remoteLicenseService;
	}

	@Override
	public Group<ServerData<LicenseInfo>> generate(ServerData<LicenseInfo> entity) {
		return new Group<>(entity.getData().getLicenseId(), entity.getData().getLicenseId());
	}

	@Override
	protected Comparator<Group<ServerData<LicenseInfo>>> getGroupComparator() {
		return new Comparator<Group<ServerData<LicenseInfo>>>() {
			@Override
			public int compare(Group<ServerData<LicenseInfo>> o1, Group<ServerData<LicenseInfo>> o2) {
				return ((String) o1.getValue()).compareTo((String) o2.getValue());
			}
		};
	}

	@Override
	protected void getDataFromServer(List<ServerData<LicenseInfo>> dataList, Server server) {
		LicenseInfo data = remoteLicenseService.getLicenseInfo(server);
		dataList.add(new ServerData<LicenseInfo>(server, data));
	}

}
