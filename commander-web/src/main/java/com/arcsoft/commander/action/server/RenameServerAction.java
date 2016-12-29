package com.arcsoft.commander.action.server;

import org.apache.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;
/**
 * rename server action
 * @author xpeng
 *
 */
@SuppressWarnings("serial")
public class RenameServerAction extends BaseServerAction {

	private static Logger log = Logger.getLogger(RenameServerAction.class);
	private String id;
	private String newName;

	/**
	 * for json output, the result code
	 */
	private int code;
	/**
	 * for json output, the detail fail description.
	 */
	private String description;

	public void setId(String id) {
		this.id = id;
	}
	
	public String getId(){
		return id;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public String getNewName() {
		return newName;
	}

	public int getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		log.debug("renameDevice id =  " + id + " newname = " + newName);

		try {
			Server server = new Server();
			server.setId(id);
			server.setName(newName);
			serverService.renameServer(server);
			this.code = BaseAction.RC_SUCCESS;
		} catch (NameExistsException ne) {
			this.code = BaseAction.RC_SERVER_NAME_EXIST;
			this.description = getText("server.group.err.name.exists", new String[]{newName});
		} catch (ObjectNotExistsException oe) {
			this.code = BaseAction.RC_SERVER_NOT_EXIST;
			this.description = getText("server.err.not.exists");
		}

		return SUCCESS;
	}
}
