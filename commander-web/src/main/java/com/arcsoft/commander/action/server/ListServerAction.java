package com.arcsoft.commander.action.server;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
/**
 * delete server action
 * @author xpeng
 *
 */
@SuppressWarnings("serial")
public class ListServerAction extends BaseServerAction {

	private List<ServerGroup> groups;

	public List<ServerGroup> getGroups() {
		return this.groups;
	}

	public void setGroups(List<ServerGroup> groups) {
		this.groups = groups;
	}

	public String list() {
		groups = serverService.list(true);

		// Sort servers by backup and IP address.
		for (ServerGroup group : groups) {
			List<Server> servers = group.getServers();
			if (servers != null && servers.size() > 1) {
				TreeSet<Server> sorted = new TreeSet<>(comparator);
				sorted.addAll(servers);
				group.setServers(new ArrayList<>(sorted));
			}
		}
		return SUCCESS;
	}

	/**
	 * Compare servers by backup and IP address.
	 */
	private static Comparator<Server> comparator = new Comparator<Server>() {
		@Override
		public int compare(Server o1, Server o2) {
			if (o1.isBackup() != o2.isBackup()) {
				return o1.isBackup() ? 1 : -1;
			} else {
				int ret = formatIp(o1.getIp()).compareTo(formatIp(o2.getIp()));
				if (ret == 0)
					ret = o1.getName().compareTo(o2.getName());
				return ret;
			}
		}
	};

	/**
	 * Format IP to xxx.xxx.xxx.xxx for string compare.
	 */
	private static String formatIp(String ip) {
		if (ip == null)
			return "";
		StringBuilder result = new StringBuilder();
		String[] parts = ip.split("\\.");
		String part = null;
		for (int i = 0; i < parts.length; i++) {
			part = parts[i];
			if (i > 0)
				result.append('.');
			switch (part.length()) {
			case 1:
				result.append("00");
				break;
			case 2:
				result.append('0');
				break;
			}
			result.append(part);
		}
		return result.toString();
	}

}
