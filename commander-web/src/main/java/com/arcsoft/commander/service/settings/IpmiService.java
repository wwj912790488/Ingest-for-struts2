package com.arcsoft.commander.service.settings;

import java.io.IOException;
import java.net.UnknownHostException;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.IPMI;

public interface IpmiService {
	int getPort();

	IPMI getIpmi(String id);
	void deleteIpmi(String id);
	void saveIpmi(IPMI ipmi);
	
	void reboot(Server server);
	void reboot(IPMI ipmi) throws IOException, InterruptedException, UnknownHostException;

	boolean checkIpmiAvaliable(String ip, int timeout);
}
