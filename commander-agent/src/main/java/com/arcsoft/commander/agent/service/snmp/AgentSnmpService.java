package com.arcsoft.commander.agent.service.snmp;

import org.apache.log4j.Logger;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.snmp.GetSnmpRequest;
import com.arcsoft.commander.cluster.action.snmp.GetSnmpResponse;
import com.arcsoft.commander.cluster.action.snmp.SaveSnmpRequest;
import com.arcsoft.commander.cluster.action.snmp.SaveSnmpResponse;
import com.arcsoft.transcoder.snmp.SnmpService;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * Agent SNMP service.
 * 
 * @author fjli
 */
public class AgentSnmpService implements ActionHandler {

	private Logger log = Logger.getLogger(AgentSnmpService.class);
	private SnmpService snmpService;

	public void setSnmpService(SnmpService snmpService) {
		this.snmpService = snmpService;
	}

	/**
	 * Returns all SNMP actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] { Actions.SNMP_GET, Actions.SNMP_SAVE, };
	}

	/**
	 * Receive SNMP relation requests, and dispatch request to process methods.
	 * 
	 * @param request - the SNMP request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GetSnmpRequest) {
			return getSetting();
		} else if (request instanceof SaveSnmpRequest) {
			return setSetting((SaveSnmpRequest) request);
		}
		return null;
	}

	/**
	 * Get current SNMP settings.
	 * 
	 * @return returns response including the SNMP settings.
	 */
	private GetSnmpResponse getSetting() {
		GetSnmpResponse response = new GetSnmpResponse();
		try {
			SnmpSetting snmp = snmpService.getSetting();
			response.setErrorCode(ActionErrorCode.SUCCESS);
			response.setSnmp(snmp);
		} catch (Exception e) {
			log.error("get SNMP settings failed.", e);
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return response;
	}

	/**
	 * Update SNMP settings.
	 * 
	 * @param request - the SNMP save request
	 * @return returns response indicate the action is success or not.
	 */
	private SaveSnmpResponse setSetting(SaveSnmpRequest request) {
		SaveSnmpResponse response = new SaveSnmpResponse();
		try {
			snmpService.setSetting(request.getSnmp());
			response.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (Exception e) {
			log.error("save SNMP settings failed.", e);
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return response;
	}

}
