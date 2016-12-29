package com.arcsoft.commander.action.settings;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.struts2.ServletActionContext;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.AgentDesc;
import com.arcsoft.commander.domain.server.AgentVersion;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.server.ServerBindingService;

/**
 * Get server version.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GetVersionAction extends BaseServerSettingAction {

	private ServerBindingService serverBindingService;
	private AgentVersion version;

	public void setServerBindingService(ServerBindingService serverBindingService) {
		this.serverBindingService = serverBindingService;
	}

	public AgentVersion getVersion() {
		return version;
	}

	public String getCommanderVersion() {
		InputStream inStream = null;
		try {
			String webPath = ServletActionContext.getServletContext().getRealPath(File.separator);
			File file = new File(webPath, "META-INF/maven/com.arcsoft/commander-web/pom.properties");
			inStream = new FileInputStream(file);
			Properties p = new Properties();
			p.load(inStream);
			return p.getProperty("version");
		} catch (IOException e1) {
		} finally {
			if (inStream != null) {
				try {
					inStream.close();
				} catch (IOException e) {
				}
			}
		}
		return null;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		if (isLocal) {
			return SUCCESS;
		}

		// check the server is exist or not.
		Server agent = serverService.getServer(id);
		if (agent == null) {
			addActionError(getText("msg.error.server.not.available"));
			return ERROR;
		}

		// fetch versions information.
		try {
			AgentDesc agentDesc = serverBindingService.getAgentDesc(agent);
			version = agentDesc.getVersion();
			return SUCCESS;
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
			return ERROR;
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
			return ERROR;
		} catch (ServerNotAvailableException e) {
			addActionError(getText("msg.error.server.not.available"));
			return ERROR;
		} catch (Exception e) {
			addActionError(getText("common.error.unknown"));
			return ERROR;
		}
	}

}
