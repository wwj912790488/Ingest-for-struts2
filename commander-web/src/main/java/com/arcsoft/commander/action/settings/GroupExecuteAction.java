package com.arcsoft.commander.action.settings;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.opensymphony.xwork2.ActionContext;

/**
 * Group execute action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class GroupExecuteAction extends GroupSettingAction {

	protected ActionContext context;

	/**
	 * Get the translated text. Invoked by the thread other than the action main thread.
	 */
	protected String getActionText(String key) {
		return getActionText(key, null);
	}

	/**
	 * Get the translated text. Invoked by the thread other than the action main thread.
	 */
	protected String getActionText(String key, String[] args) {
		return getText(key, null, args, context.getValueStack());
	}

	/**
	 * Execute at the specified server.
	 * 
	 * @param server - the specified server
	 */
	protected abstract void serverExecute(Server server);

	/**
	 * Execute on the current server group.
	 * 
	 * @throws ObjectNotExistsException - if the group is not exist
	 * @throws InterruptedException if thread is interrupted by other thread
	 */
	protected void groupExecute() throws ObjectNotExistsException, InterruptedException {
		// Get action context for the thread other than the action main thread.
		if (context == null)
			context = ActionContext.getContext();

		// check the group is exist or not.
		group = serverService.getGroup(group.getId(), true);
		if (group == null) {
			throw new ObjectNotExistsException(group);
		}

		// execute command on each server.
		ExecutorService executor = Executors.newCachedThreadPool();
		for (final Server server : group.getServers()) {
			executor.execute(new Runnable() {
				@Override
				public void run() {
					serverExecute(server);
				}
			});
		}

		// wait for all threads done.
		executor.shutdown();
		executor.awaitTermination(Integer.MAX_VALUE, TimeUnit.MILLISECONDS);
	}

	/**
	 * Get the server data comparator.
	 */
	protected <E> Comparator<ServerData<E>> createServerDataComparator() {
		return new Comparator<ServerData<E>>() {
			private Comparator<String> compator = StringHelper.createComparatorForStringEndsWithNumber(true);
			@Override
			public int compare(ServerData<E> o1, ServerData<E> o2) {
				return compator.compare(o1.getServer().getName(), o2.getServer().getName());
			}
		};
	}

	/**
	 * Sort action results.
	 * 
	 * @param results- the action results
	 */
	protected void sortActionResults(List<ServerData<ActionResult>> results) {
		Comparator<ServerData<ActionResult>> resultComparator = createServerDataComparator();
		Collections.sort(results, resultComparator);
	}

}
