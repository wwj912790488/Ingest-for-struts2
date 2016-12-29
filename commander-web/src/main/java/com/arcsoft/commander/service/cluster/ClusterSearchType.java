package com.arcsoft.commander.service.cluster;

/**
 * Cluster search type.
 * 
 * @author fjli
 */
public interface ClusterSearchType {

	/**
	 * Search nodes by multicast.
	 */
	public static final int SEARCH_BY_MULTICAST = 0;

	/**
	 * Search nodes by broadcast.
	 */
	public static final int SEARCH_BY_BROADCAST = 1;

	/**
	 * Search nodes by unicast.
	 */
	public static final int SEARCH_BY_UNICAST = 2;

}
