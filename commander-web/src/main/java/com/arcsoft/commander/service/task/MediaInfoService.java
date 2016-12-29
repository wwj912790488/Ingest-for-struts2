package com.arcsoft.commander.service.task;

import com.arcsoft.commander.domain.media.MediaInfo;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Get the media information.
 * 
 * @author fjli
 */
public interface MediaInfoService {

	/**
	 * Get the media info the specified server.
	 * 
	 * @param server - the specified server
	 * @param uri - the media url
	 * @param eth - the network interface
	 * @return data of media info.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed.
	 */
	MediaInfo getMediaInfoObject(Server server, String uri, String eth);

	/**
	 * Get the media info the specified server.
	 * 
	 * @param server - the specified server
	 * @param uri - the media url
	 * @param eth - the network interface
	 * @return data of media info.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed.
	 */
	byte[] getMediaInfo(Server server, String uri, String eth);

	/**
	 * Get the media thumbnail the specified server.
	 * 
	 * @param server - the specified server
	 * @param uri - the media url
	 * @param eth - the network interface
	 * @param width - the thumbail width
	 * @return data of media info.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed.
	 */
	byte[] getMediaThumb(Server server, String uri, String eth, Integer width);

}
