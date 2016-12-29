package com.arcsoft.commander.service.cluster.fault;

/**
 * Fault event listener
 * @author wtsun
 */
public interface FaultListener {

	/**
	 * Notify this listener with the fault detected event.
	 * 
	 * @param event - the fault detected event
	 */
	void faultEventReceived(FaultEvent event);
}
