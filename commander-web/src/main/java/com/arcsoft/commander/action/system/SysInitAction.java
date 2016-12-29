package com.arcsoft.commander.action.system;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.domain.system.SystemSettings;
import com.arcsoft.commander.service.cluster.ClusterSearchType;
import com.arcsoft.commander.service.settings.LocalEthService;
import com.arcsoft.commander.service.system.SystemService;

/**
 * Actions for system initialize.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class SysInitAction extends BaseAction {

	private SystemService systemService;
	private LocalEthService localEthService;
	private SystemSettings settings;
	private Map<String, String> networks;
	private Map<Integer, String> clusterTypes;
	private Map<Integer, String> clusterSearchTypes;
	private boolean success;

	public void setSystemService(SystemService systemService) {
		this.systemService = systemService;
	}

	public void setLocalEthService(LocalEthService localEthService) {
		this.localEthService = localEthService;
	}

	public boolean isSuccess() {
		return success;
	}

	/**
	 * Get system settings.
	 */
	public SystemSettings getSettings() {
		return settings;
	}

	/**
	 * Set system settings.
	 */
	public void setSettings(SystemSettings settings) {
		this.settings = settings;
	}

	/**
	 * Return maps for select network in UI.
	 */
	public Map<String, String> getNetworks() {
		if (networks == null) {
			networks = new HashMap<String, String>();
			try {
				List<Eth> eths = localEthService.getValidEths();
				for (Eth eth : eths) {
					networks.put(eth.getIp(), eth.getId() + "(" + eth.getIp() + ")");
				}
			} catch (Exception e) {
				LOG.error("Get valid eths failed.", e);
			}
			if (networks.isEmpty()) {
				try {
					Enumeration<NetworkInterface> inetfs = NetworkInterface.getNetworkInterfaces();
					while (inetfs.hasMoreElements()) {
						NetworkInterface inetf = inetfs.nextElement();
						if (inetf.isLoopback() || !inetf.isUp() || inetf.isPointToPoint())
							continue;
						Enumeration<InetAddress> addrs = inetf.getInetAddresses();
						while (addrs.hasMoreElements()) {
							InetAddress addr = addrs.nextElement();
							if (!addr.isLinkLocalAddress() && !addr.isLoopbackAddress()) {
								String hostIp = addr.getHostAddress();
								networks.put(hostIp, inetf.getName() + "(" + hostIp + ")");
								break;
							}
						}
					}
				} catch (SocketException e) {
				}
			}
			networks.put("127.0.0.1", "localhost");
		}
		return networks;
	}

	/**
	 * Return maps for select cluster type in UI.
	 */
	public Map<Integer, String> getClusterTypes() {
		if (clusterTypes == null) {
			clusterTypes = new HashMap<Integer, String>();
			clusterTypes.put(ClusterType.LIVE, "Live");
		}
		return clusterTypes;
	}

	/**
	 * Return maps for select cluster search type in UI.
	 */
	public Map<Integer, String> getClusterSearchTypes() {
		if (clusterSearchTypes == null) {
			clusterSearchTypes = new HashMap<Integer, String>();
			clusterSearchTypes.put(ClusterSearchType.SEARCH_BY_MULTICAST, getText("settings.cluster.search.type.default"));
			clusterSearchTypes.put(ClusterSearchType.SEARCH_BY_BROADCAST, getText("settings.cluster.search.type.broadcast"));
			clusterSearchTypes.put(ClusterSearchType.SEARCH_BY_UNICAST, getText("settings.cluster.search.type.unicast"));
		}
		return clusterSearchTypes;
	}

	/**
	 * Action method for show system initialize page.
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String init() {
		settings = systemService.getSettings();
		if (settings.getClusterType() == null)
			settings.setClusterType(ClusterType.LIVE);
		if (settings.getClusterIp() == null)
			settings.setClusterIp("239.8.8.1");
		if (settings.getClusterPort() == null)
			settings.setClusterPort(8921);
		return SUCCESS;
	}

	/**
	 * Action method for save system settings.
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		systemService.saveSettings(settings);
		success = true;
		return SUCCESS;
	}

}
