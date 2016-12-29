package com.arcsoft.commander.cluster.action.settings.storage;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.Storage;

/**
 * Request for mount storage
 * 
 * @author hxiang
 */
@XmlRootElement
public class MountStorageRequest extends BaseRequest {

	private Storage storage;

	public void setStorage(Storage storage) {
		this.storage = storage;
	}

	public Storage getStorage() {
		return storage;
	}

}
