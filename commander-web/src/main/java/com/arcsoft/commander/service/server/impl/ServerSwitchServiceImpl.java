package com.arcsoft.commander.service.server.impl;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.AccessDeniedException;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.server.ServerSwitchService;


/**
 * 
 * @author wtsun
 */
public class ServerSwitchServiceImpl extends BaseService implements ServerSwitchService {
	private ServerService serverService;
	private ExecutorService queueExecutor;
	
	protected void init() {
		// start queue executor
		this.queueExecutor = Executors.newSingleThreadExecutor();
	}

	protected void destroy() {
		// shutdown queue executor
		if (queueExecutor != null) {
			queueExecutor.shutdown();
			try {
				queueExecutor.awaitTermination(10000, TimeUnit.SECONDS);
			} catch (InterruptedException e) {
			}
		}		
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	
	@Override
	public Future<?> updateWorkerServer(final String worker, final int cause) {
		Future<?> future = null;
		try {
			final ExecutorService executor = this.queueExecutor;
			future = executor.submit(new Runnable() {
				@Override
				public void run() {
					if (executor.isShutdown())
						return;
					try {
						serverService.updateWorkerServer(worker, cause);
					} catch (ObjectNotExistsException e) {
						LOG.warn("switch role failed: server not exist. worker=" + worker);
					} catch (AccessDeniedException e) {
						LOG.warn("switch role failed: it is a slave or 1+1 server. worker=" + worker);
					} catch (Exception e) {
						LOG.error("switch role failed: " + e.getMessage(), e);
					}
				}
			});
		} catch (Exception e) {
			LOG.error("add switch server operation failed:" + e.getMessage(), e);
		}
		return future;
	}

	@Override
	public Future<?> updateWorkerServer(final String worker, final String backup, final int cause) {
		Future<?> future = null;
		try {
			final ExecutorService executor = this.queueExecutor;
			future = executor.submit(new Runnable() {
				@Override
				public void run() {
					if (executor.isShutdown())
						return;
					serverService.updateWorkerServer(worker, backup, cause);
				}
			});
		} catch (Exception e) {
			LOG.error("add switch server operation failed:" + e.getMessage(), e);
		}
		return future;
	}

}
