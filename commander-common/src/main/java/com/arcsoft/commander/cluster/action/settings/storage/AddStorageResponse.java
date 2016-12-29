package com.arcsoft.commander.cluster.action.settings.storage;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.Storage;


/**
 * 
 * @author hxiang
 */
@XmlRootElement
public class AddStorageResponse extends BaseResponse {

	private Storage storage = null;

	public void setStorage(Storage storage) {
		this.storage = storage;
	}

	public Storage getStorage(){
		return this.storage;
	}
}
