package com.arcsoft.commander.service;

import org.springframework.transaction.support.ResourceHolderSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.arcsoft.arcvideo.spring.event.EventResourceHolder;

public class TransactionUtils {

	private static Object key = new Object();

	public static void executeAfterCommit(Runnable runnable) {
		EventResourceHolder eventHolder = getEventHolder();
		if (eventHolder != null) {
			eventHolder.addEvent(runnable);
		} else {
			runnable.run();
		}
	}

	private static EventResourceHolder getEventHolder() {
		if (!TransactionSynchronizationManager.isActualTransactionActive()) {
			return null;
		}
		if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
			return null;
		}
		EventResourceHolder eventHolder = (EventResourceHolder) TransactionSynchronizationManager.getResource(key);
		if (eventHolder != null) {
			return eventHolder;
		}
		if (TransactionSynchronizationManager.isSynchronizationActive()) {
			eventHolder = new EventResourceHolder();
			eventHolder.setSynchronizedWithTransaction(true);
			TransactionSynchronizationManager.registerSynchronization(new ResourceHolderSynchronization<EventResourceHolder, Object>(eventHolder, key) {
				@Override
				protected void processResourceAfterCommit(EventResourceHolder resourceHolder) {
					for (Object event : resourceHolder.getEvents()) {
						if (event instanceof Runnable) {
							((Runnable) event).run();
						}
					}
				}
				@Override
				protected boolean shouldReleaseBeforeCompletion() {
					return false;
				}
			});
			TransactionSynchronizationManager.bindResource(key, eventHolder);
		}
		return eventHolder;
	}

}
