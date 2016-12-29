package com.arcsoft.commander.action.server;

import java.io.IOException;
import java.util.Enumeration;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.service.cluster.ClusterService;

@SuppressWarnings("serial")
public class ScanAction extends BaseServerAction {

	private ClusterService clusterService;
	private Enumeration<Server> servers;

	public void setClusterService(ClusterService clusterService) {
		this.clusterService = clusterService;
	}

	public Enumeration<Server> getServers() {
		return servers;
	}

	@Override
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() throws IOException {
		try {
			// create search result enumeration.
			final Enumeration<RemoteNode> result = clusterService.search(2000);
	
			// convert remote node to server.
			servers = new Enumeration<Server>() {
				@Override
				public Server nextElement() {
					RemoteNode node = result.nextElement();
					if (node == null)
						return null;
					Server server = serverService.getServer(node.getDescription().getId());
					if (server == null) {
						server = new Server(node.getDescription());
						server.setAdded(false);
						server.setAlive(true);
						server.setName("");
					} else {
						server.setAdded(true);
						server.setAlive(true);
					}
					return server;
				}
	
				@Override
				public boolean hasMoreElements() {
					return result.hasMoreElements();
				}
			};
		} catch(Exception e) {
			LOG.debug("scan servers failed.", e);
		}
		return SUCCESS;
	}

}
