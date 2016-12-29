package com.arcsoft.commander.action.server;

import org.apache.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;

/**
 * rename group action
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class RenameGroupAction extends BaseServerAction {

	private static Logger log = Logger.getLogger(RenameGroupAction.class);
	private int id;
	private String newName;

	/**
	 * for json output, the result code
	 */
	private int code;
	/**
	 * for json output, the detail fail description.
	 */
	private String description;

	public void setId(int id) {
		this.id = id;
	}
	
	public int getId(){
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
		log.debug("renameGroup id =  " + id + " newname = " + newName);
		try {
			ServerGroup group = new ServerGroup();
			group.setId(id);
			group.setName(newName);
			serverService.renameGroup(group);
			this.code = BaseAction.RC_SUCCESS;
		} catch (NameExistsException ne) {
			this.code = BaseAction.RC_GROUP_NAME_EXIST;
			this.description = getText("server.group.err.name.exists", new String[]{newName});
		} catch (ObjectNotExistsException oe) {			
			this.code = BaseAction.RC_GROUP_NOT_EXIST;
			this.description = getText("server.group.err.not.exists");
		}

		return SUCCESS;
	}

}
