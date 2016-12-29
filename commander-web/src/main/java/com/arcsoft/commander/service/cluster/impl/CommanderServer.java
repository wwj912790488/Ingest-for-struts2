package com.arcsoft.commander.service.cluster.impl;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.ByteHelper;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.ErrorCode;
import com.arcsoft.cluster.net.ConnectOptions;
import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.cluster.node.NodeListener;
import com.arcsoft.cluster.node.NodeSearcher;
import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.cluster.node.UdpNodeSearcher;
import com.arcsoft.commander.cluster.ClusterServer;
import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.cluster.ServerType;
import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.service.cluster.ClusterSearchType;

/**
 * Create commander server.
 * 
 * @author fjli
 */
public class CommanderServer extends ClusterServer {

	private Logger log = Logger.getLogger(CommanderServer.class);

	/**
	 * Construct a commander server with the specified configuration.
	 * 
	 * @param config - the specified configuration.
	 */
	public CommanderServer(CommanderConfiguration config) {
		super(config);
		setServerType(ServerType.TYPE_COMMANDER);
	}

	/**
	 * Create remote node from server instance.
	 * 
	 * @param agent - the server instance.
	 * @return the remote node.
	 */
	public RemoteNode createRemoteNode(Server agent) {
		NodeDescription desc = new NodeDescription(agent.getType(),
				agent.getId(), agent.getName(), agent.getIp(), agent.getPort());
		return createRemoteNode(desc);
	}

	/**
	 * Test the specified node type is valid or not.
	 * 
	 * @param nodeType - the specified node type
	 * @return true if it is valid.
	 */
	public boolean isValidNodeType(int nodeType) {
		switch(config.getClusterType()) {
		case ClusterType.CORE:
			return nodeType == NodeType.TYPE_CORE;
		case ClusterType.LIVE:
			return nodeType == NodeType.TYPE_LIVE;
		default:
			return false;
		}
	}

	/**
	 * Search the agents in the cluster this server belongs to.
	 * 
	 * @param listener - the node listener
	 * @return the instance of searcher.
	 * @throws IOException
	 */
	public NodeSearcher searchAgents(NodeListener listener) throws IOException {
		NodeSearcher searcher = null;
		int searchType = ((CommanderConfiguration) config).getClusterSearchType();
		switch (searchType) {
		case ClusterSearchType.SEARCH_BY_BROADCAST:
			log.info("search agents by broadcast.");
			searcher = cluster.createBroadcastSeacher(listener);
			break;
		case ClusterSearchType.SEARCH_BY_MULTICAST:
			log.info("search agents by multicast.");
			searcher = cluster.createSeacher(listener);
			break;
		case ClusterSearchType.SEARCH_BY_UNICAST:
			searcher = cluster.createUdpSeacher(listener);
			log.info("search agents by unicast.");
			break;
		default:
			log.error("unsupproted search type: " + searchType);
			return null;
		}
		switch(config.getClusterType()) {
		case ClusterType.CORE:
			searcher.start(NodeType.TYPE_CORE);
			break;
		case ClusterType.LIVE:
			searcher.start(NodeType.TYPE_LIVE);
			break;
		}
		if (searcher instanceof UdpNodeSearcher) {
			int[] ranges = getSubNetworkAddrs();
			if (ranges != null && ranges.length == 2) {
				long startTime = System.nanoTime();
				UdpNodeSearcher udpNodeSearcher = (UdpNodeSearcher) searcher;
				for (int ip = ranges[0] + 1; ip < ranges[1]; ip++)
					udpNodeSearcher.search(toIpString((int) ip));
				log.info("search unicast cost " + TimeUnit.NANOSECONDS.toSeconds(System.nanoTime() - startTime));
			} else {
				log.error("cannot get subnetwork addresses.");
			}
		}
		return searcher;
	}

	/**
	 * Convert int ip to string format.
	 */
	private String toIpString(int ip) {
		byte[] addr = ByteHelper.toBytes(ip);
		String str = Integer.toString(0xff & addr[0]);
		for (int i = 1; i < addr.length; i++)
			str += "." + Integer.toString(0xff & addr[i]);
		return str;
	}

	/**
	 * Get sub network.
	 */
	private int[] getSubNetworkAddrs() {
		InetAddress bindAddr = null;
		NetworkInterface netif = null;
		try {
			bindAddr = InetAddress.getByName(config.getBindAddr());
			netif = NetworkInterface.getByInetAddress(bindAddr);
		} catch (Exception e) {
			log.error("query sub network failed.", e);
			return null;
		}

		List<InterfaceAddress> addresses = netif.getInterfaceAddresses();
		for (InterfaceAddress address : addresses) {
			if (bindAddr.equals(address.getAddress())) {
				int prefix = address.getNetworkPrefixLength();
				int mask = -1 << (32 - prefix);
				int addr0 = ByteHelper.toInt(bindAddr.getAddress());
				int addr = addr0 & mask;
				return new int[] { addr, addr + ~mask };
			}
		}

		return null;
	}

	/**
	 * Execute request on the specified agent.
	 * 
	 * @param request - the request to be executed
	 * @param agent - the specified agent
	 * @param connectTimeout - the connection timeout
	 * @param readTimeout - the read timeout
	 * @return Returns the response.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed
	 */
	public BaseResponse execute(BaseRequest request, Server agent, int connectTimeout, int readTimeout) throws ServerNotAvailableException, RemoteException {
		RemoteNode target = createRemoteNode(agent);
		try {
			ConnectOptions options = new ConnectOptions();
			options.setString(ConnectOptions.OPTION_BIND_ADDR, getNode().getDescription().getIp());
			options.setInt(ConnectOptions.OPTION_CONNECT_TIMEOUT, connectTimeout);
			options.setInt(ConnectOptions.OPTION_READ_TIMEOUT, readTimeout);
			BaseResponse response = (BaseResponse) cluster.execute(request, target, options);
			if (!response.isSuccess())
				writeActionErrorLog(request, agent, response.getErrorCode());
			return response;
		} catch (ActionException e) {
			writeActionErrorLog(request, agent, e.getErrorCode());
			if (e.getErrorCode() == ErrorCode.SEND_REQUEST_FAILED)
				throw new ServerNotAvailableException(agent);
			else
				throw new RemoteException(agent);
		}
	}

	/**
	 * Execute request on the specified agent.
	 * 
	 * @param request - the request to be executed
	 * @param agent - the specified agent
	 * @return Returns the response.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed
	 */
	public BaseResponse execute(BaseRequest request, Server agent) throws ServerNotAvailableException, RemoteException {
		return execute(request, agent, 5000, 5000);
	}

	/**
	 * Write action error log.
	 * 
	 * @param request - the request
	 * @param agent - the specified agent
	 * @param errorCode - the error code
	 */
	private void writeActionErrorLog(BaseRequest request, Server agent, int errorCode) {
		String format = "execute action failed, return code: 0x%08x, request: %s, target: %s:%d";
		String name = request.getClass().getName();
		log.error(String.format(format, errorCode, name, agent.getIp(), agent.getPort()));
	}

}
