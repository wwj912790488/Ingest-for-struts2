package com.arcsoft.commander.action.settings;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.exception.ObjectNotExistsException;

/**
 * Base group setting update action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class GroupSettingUpdateAction extends GroupExecuteAction {

	private ActionResult result;
	private List<ServerData<ActionResult>> results;

	/**
	 * Returns the action result.
	 */
	public ActionResult getResult() {
		return result;
	}

	/**
	 * Set the action result.
	 * 
	 * @param result - the result to be set
	 */
	protected void setResult(ActionResult result) {
		this.result = result;
	}

	/**
	 * Set success result.
	 */
	protected void setSuccess() {
		setResult(true, null);
	}

	/**
	 * Set error result.
	 * 
	 * @param message - the error message
	 */
	protected void setErrorResult(String message) {
		setResult(false, message);
	}

	/**
	 * Set the result.
	 * 
	 * @param success - the action flag, true indicate success
	 * @param message - the result message
	 */
	protected void setResult(boolean success, String message) {
		this.result = new ActionResult(success, message);
	}

	/**
	 * Returns the list of executing result of each server in the group.
	 */
	public List<ServerData<ActionResult>> getResults() {
		return results;
	}

	@Override
	public String execute() {
		try {
			results = new ArrayList<>();
			groupExecute();
			setSuccess();
			sortActionResults(results);
		} catch(ObjectNotExistsException e) {
			setErrorResult(getText("server.group.err.not.exists"));
		} catch (InterruptedException e) {
			setErrorResult(getText("common.err.unknown"));
		}
		return SUCCESS;
	}

	/**
	 * Execute on specified server and store the action result to results.
	 */
	@Override
	protected void serverExecute(Server server) {
		ActionResult result = execute(server);
		results.add(new ServerData<ActionResult>(server, result));
	}

	/**
	 * Execute on the specified server and returns the action result.
	 * 
	 * @param server - the specified server
	 * @return the action result.
	 */
	protected abstract ActionResult execute(Server server);

}
