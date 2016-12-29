package com.arcsoft.commander.agent.service.settings;

import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.settings.network.ListNioBindingRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListNioBindingResponse;
import com.arcsoft.commander.cluster.action.settings.network.UpdateNioBindingRequest;
import com.arcsoft.commander.cluster.action.settings.network.UpdateNioBindingResponse;
import com.arcsoft.commander.domain.server.NioBinding;

/**
 * This service processes network input-output bindings
 * 
 * @author wtsun
 */
public class NioBindingService implements ActionHandler, NetworkConfigService{
	protected Logger log = Logger.getLogger(getClass());
	private EthSettingsListener listener;

	public void setEthSettingsListener(EthSettingsListener listener) {
		this.listener = listener;
	}

	public void init() {
		if (listener != null) {
			try {
				listener.ethSettingsChanged(readConfig());
			} catch (IOException e) {
				;
			}
		}
	}

	/**
	 * Returns all network input-output binding requests.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.NIO_LIST,
				Actions.NIO_UPDATE
		};
	}

	/**
	 * Receive network input-output binding requests, and dispatch request to process methods.
	 * 
	 * @param request - the task request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof UpdateNioBindingRequest) {
			return updateNioBinding((UpdateNioBindingRequest)request);
		} else if (request instanceof ListNioBindingRequest) {
			return listNioBinding((ListNioBindingRequest)request);
		}
		return null;
	}

	private ListNioBindingResponse listNioBinding(ListNioBindingRequest request) {
		ListNioBindingResponse resp = new ListNioBindingResponse();
		try {
			NetworkConfiguration conf = new DefaultNetworkConfigFile();
			resp.setNioBindings(conf.getNioBindings());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;		
	}
	
	/**
	 * Update network input-output binding settings.
	 * 
	 * @param request - the network input-output bindings request
	 * @return returns response indicate the action is success or not.
	 */
	private UpdateNioBindingResponse updateNioBinding(UpdateNioBindingRequest request) {
		UpdateNioBindingResponse resp = new UpdateNioBindingResponse();
		try {
			writeNioBingings(request.getNioBindings());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

	private void writeNioBingings(List<NioBinding> niobs) throws IOException {
		NetworkConfiguration conf = new DefaultNetworkConfigFile();
		conf.setNioBindings(niobs);
		
		if (this.listener != null)
			listener.ethSettingsChanged(conf);
		
		conf.save();
	}
	
	@Override
	public NetworkConfiguration readConfig() throws IOException {
		return new DefaultNetworkConfigFile();
	}	
}
