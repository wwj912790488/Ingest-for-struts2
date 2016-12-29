package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.server.NIO;
import com.arcsoft.commander.domain.server.NioBinding;
import com.arcsoft.commander.domain.server.Server;


/**
 * 
 * @author wtsun
 */
public interface NioService {
	/**
	 * List all network input-output entities
	 * 
	 * @return the network input-output list.
	 */
	public abstract List<NIO> getNios();
	
	/**
	 * update the network input-output settings
	 * 
	 * @param nios - the network input-output entity list to update
	 */
	public abstract void updateNios(List<NIO> nios);

	/**
	 * update the network input-output bindings.
	 * 
	 * @param agent - the server.
	 * @param niobs - the network input-output binding list to update
	 */
	public abstract void updateServerNioBindings(Server agent, List<NioBinding> niobs);
	
	/**
	 * get the network input-output bindings of specialized server.
	 * 
	 * @param agent - the server.
	 * @return - the network input-output binding list
	 */
	public abstract List<NioBinding> getServerNioBindings(Server agent);	
}
