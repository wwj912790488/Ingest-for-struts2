package com.arcsoft.commander.action.settings;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.arcvideo.web.struts.view.GroupGenerator;
import com.arcsoft.arcvideo.web.struts.view.GroupView;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Base group settings view action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class GroupSettingViewAction<T> extends GroupExecuteAction implements GroupGenerator<ServerData<T>> {

	private GroupView<ServerData<T>> groupView;
	private List<ServerData<T>> dataList;
	private List<ServerData<ActionResult>> errorList;

	/**
	 * Returns the group data views.
	 */
	public GroupView<ServerData<T>> getGroupView() {
		return groupView;
	}

	/**
	 * Returns the errors servers list with action results.
	 */
	public List<ServerData<ActionResult>> getErrorList() {
		return errorList;
	}

	/**
	 * Add server action result to error list.
	 * 
	 * @param server - the server on which error occur
	 * @param result - the action result
	 */
	protected void addServerError(Server server, ActionResult result) {
		errorList.add(new ServerData<ActionResult>(server, result));
	}

	@Override
	protected void serverExecute(Server server) {
		try {
			getDataFromServer(dataList, server);
		} catch (SystemNotInitializedException e) {
			addServerError(server, new ActionResult(false, getActionText("system.not.initialized")));
		} catch (AccessDeniedForSlaveException e) {
			addServerError(server, new ActionResult(false, getActionText("system.slave.access.denied")));
		} catch (ServerNotAvailableException e) {
			addServerError(server, new ActionResult(false, getActionText("msg.error.server.not.available")));
		} catch (Exception e) {
			addServerError(server, new ActionResult(false, getActionText("common.error.unknown")));
		}
	}

	@Override
	public String execute() {
		try {
			errorList = new ArrayList<>();
			dataList = new ArrayList<>();
			groupExecute();
			groupView = new GroupView<>();
			groupView.setDataList(dataList, this);
			sortGroupView(groupView);
			sortActionResults(errorList);
			return SUCCESS;
		} catch (ObjectNotExistsException e1) {
			addActionError(getText("server.group.err.not.exists"));
			return ERROR;
		} catch (InterruptedException e1) {
			addActionError(getText("common.error.unknown"));
			return ERROR;
		}
	}

	/**
	 * Get data from the specified server.
	 * 
	 * @param dataLit - the list to store the queried data from server
	 * @param server - the specified server
	 */
	protected abstract void getDataFromServer(List<ServerData<T>> dataList, Server server);

	/**
	 * Sort group view.
	 * 
	 * @param groupView - the group view
	 */
	protected void sortGroupView(GroupView<ServerData<T>> groupView) {
		List<Group<ServerData<T>>> groupList = groupView.getGroupList();
		Comparator<Group<ServerData<T>>> groupComparator = getGroupComparator();
		if (groupComparator != null)
			Collections.sort(groupList, groupComparator);
		Comparator<ServerData<T>> serverDataComparator = getServerDataComparator();
		if (serverDataComparator != null) {
			for (Group<ServerData<T>> group : groupList)
				Collections.sort(group.getList(), serverDataComparator);
		}
	}

	/**
	 * Get the group comparator.
	 */
	protected Comparator<Group<ServerData<T>>> getGroupComparator() {
		return null;
	}

	/**
	 * Get the server data comparator.
	 */
	protected Comparator<ServerData<T>> getServerDataComparator() {
		return createServerDataComparator();
	}

}
