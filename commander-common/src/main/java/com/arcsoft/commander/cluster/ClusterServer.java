package com.arcsoft.commander.cluster;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.arcsoft.cluster.Cluster;
import com.arcsoft.cluster.ClusterDescription;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.RequestHandler;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.cluster.converter.ConversionService;
import com.arcsoft.cluster.node.LocalNode;
import com.arcsoft.cluster.node.Node;
import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.converter.RequestDataConverter;
import com.arcsoft.commander.cluster.converter.ResponseDataConverter;

/**
 * Cluster server.
 * 
 * @author fjli
 */
public class ClusterServer {

	protected Logger log = Logger.getLogger(ClusterServer.class);
	protected Configuration config;
	protected Cluster cluster;
	protected LocalNode node;
	protected int role = ServerRole.ROLE_UNKNOWN;
	protected int serverType = ServerType.TYPE_UNKNOWN;

	/**
	 * Construct a ClusterServer with the specified configuration.
	 * 
	 * @param config - the specified configuration
	 */
	public ClusterServer(Configuration config) {
		this.config = config;
		createCluster();
		createNode();
		registerConverters();
		addHandlers();
	}

	/**
	 * Create cluster.
	 */
	private void createCluster() {
		String ip = config.getClusterIp();
		int port = config.getClusterPort();
		String bindAddr = config.getBindAddr();
		int ttl = config.getTimeToLive();
		ClusterDescription desc = new ClusterDescription(ip, port, bindAddr, ttl);
		cluster = Cluster.createInstance(desc);
	}

	/**
	 * Create node.
	 */
	private void createNode() {
		NodeDescription agentDesc = new NodeDescription(
				config.getServerType(),
				config.getServerId(),
				config.getServerName(),
				config.getServerPort());
		node = cluster.createNode(agentDesc);
	}

	/**
	 * Register converters.
	 */
	protected void registerConverters() {
		ConversionService.addConverter(new RequestDataConverter());
		ConversionService.addConverter(new ResponseDataConverter());
	}

	/**
	 * Add handlers.
	 */
	protected void addHandlers() {
		
	}

	/**
	 * Return the cluster this server belongs to.
	 */
	public Cluster getCluster() {
		return cluster;
	}

	/**
	 * Returns the local node.
	 */
	public LocalNode getNode() {
		return node;
	}

	/**
	 * Returns the server type.
	 */
	public int getServerType() {
		return serverType;
	}

	/**
	 * Set the server type.
	 * 
	 * @param serverType - the server type
	 */
	public void setServerType(int serverType) {
		this.serverType = serverType;
	}

	/**
	 * Returns the server role.
	 */
	public int getRole() {
		return role;
	}

	/**
	 * Set the server role.
	 * 
	 * @param role - the server role.
	 */
	public void setRole(int role) {
		this.role = role;
	}

	/**
	 * Create remote node with the specified node info.
	 * 
	 * @param info - the specified node info
	 * @return the created remote node.
	 */
	public RemoteNode createRemoteNode(RemoteNodeInfo info) {
		int type = Node.TYPE_DEFAULT;
		switch(config.getClusterType()) {
		case ClusterType.LIVE:
			type = NodeType.TYPE_LIVE;
			break;
		case ClusterType.CORE:
			type = NodeType.TYPE_CORE;
			break;
		default:
			return null;
		}
		NodeDescription desc = new NodeDescription(type, info.getId(), null,
				info.getIp(), info.getPort());
		return createRemoteNode(desc);
	}

	/**
	 * Create remote node with the specified node info.
	 * 
	 * @param desc - the specified node description
	 * @return the created remote node.
	 */
	public RemoteNode createRemoteNode(NodeDescription desc) {
		return new RemoteNode(cluster, desc);
	}

	/**
	 * Execute request on the specified node.
	 * 
	 * @param request - the request to be executed
	 * @param node - the specified node
	 * @return Returns the response.
	 * @throws ActionException - if dispatch or execute failed
	 */
	public Response execute(Request request, Node target) throws ActionException {
		return cluster.execute(request, target);
	}

	/**
	 * Add action handler.
	 * 
	 * @param action - the action id
	 * @param handler - the request handler
	 */
	public void addHandler(int action, RequestHandler handler) {
		node.addHandler(Actions.TYPE_REQUEST, action, handler);
	}

	/**
	 * Start server.
	 */
	public void start() throws IOException {
		log.info("start server with config: " + config);
		cluster.start();
		node.join();
	}

	/**
	 * Stop server.
	 */
	public void stop() {
		cluster.close();
	}

}
