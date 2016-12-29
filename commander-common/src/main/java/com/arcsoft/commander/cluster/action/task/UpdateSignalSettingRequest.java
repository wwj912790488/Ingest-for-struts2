package com.arcsoft.commander.cluster.action.task;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.web4transcoder.domain.input.SignalItem;

/**
 * Update signal settings request.
 * 
 * @author fjli
 */
@XmlRootElement
public class UpdateSignalSettingRequest extends BaseRequest {

	private List<SignalItem> signalItems;

	/**
	 * Get signal items.
	 */
	public List<SignalItem> getSignalItems() {
		return signalItems;
	}

	/**
	 * Set signal items.
	 * 
	 * @param signalItems - the signal items
	 */
	public void setSignalItems(List<SignalItem> signalItems) {
		this.signalItems = signalItems;
	}

}
