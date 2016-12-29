package com.arcsoft.commander.action.settings;

import java.util.List;

import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.service.settings.RemoteDateTimeService;

/**
 * Group date time view actions.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupTimeViewAction extends GroupSettingViewAction<NTPStatus> {

	private RemoteDateTimeService remoteDateTimeService;

	public void setRemoteDateTimeService(RemoteDateTimeService remoteDateTimeService) {
		this.remoteDateTimeService = remoteDateTimeService;
	}

	@Override
	public Group<ServerData<NTPStatus>> generate(ServerData<NTPStatus> entity) {
		String key = "";
		for (String server : entity.getData().getNtpServers()) {
			if (key.length() > 0)
				key += ",";
			if (server.indexOf("prefer") != -1) {
				String[] parts = server.split("\\s+"); 
				key += "<" + parts[0] + ">";
			}
			else {
				key += server;
			}	
		}
		return new Group<>(key, key);
	}

	@Override
	protected void getDataFromServer(List<ServerData<NTPStatus>> dataList, Server server) {
		NTPStatus data = remoteDateTimeService.getNTPStatus(server);
		dataList.add(new ServerData<NTPStatus>(server, data));
	}

}
