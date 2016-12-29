package com.arcsoft.commander.agent.service.fault;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.fault.GetFaultDescRequest;
import com.arcsoft.commander.cluster.action.fault.GetFaultDescResponse;

/**
 * Fault service
 * 
 * @author wtsun
 */
public class FaultService implements ActionHandler {
	private String DEFAULT_FAULT_FILE = "/usr/local/arcsoft/arcvideo/fault/conf/fault.properties";
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private int port = -1;
	
	/**
	 * Returns all DNS actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.FAULT_DESC_GET
			};
	}
	
	public void init() {
		Properties pps = new Properties();
		InputStream in = null;
		try {
			in = new BufferedInputStream(new FileInputStream(AppConfig.getString("fault.config.file", DEFAULT_FAULT_FILE)));
			pps.load(in);
		
			port = Integer.parseInt(pps.getProperty("fault.port"));
			logger.info("fault port = " + port);

		} catch (IOException e) {
			logger.info("cannot open fault config file");
			logger.info("fault service does not installed");
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
				}
			}
		}
		
		return;
	}
	
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GetFaultDescRequest) {
			GetFaultDescResponse resp = new GetFaultDescResponse();
			resp.setIp("0.0.0.0");
			resp.setPort(port);
			resp.setErrorCode(ActionErrorCode.SUCCESS);
			return resp;
		}
		return null;
	}
}
