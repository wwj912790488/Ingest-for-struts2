package com.arcsoft.commander.cluster.action.settings.storage;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.Storage;


/**
 * 
 * @author hxiang
 */
@XmlRootElement
public class FindStorageResponse extends BaseResponse {

	private List<Storage> storageList = new ArrayList<Storage>();

	public List<Storage> getStorageList() {
		return storageList;
	}

	public void setStorageList(List<Storage> storageList) {
		this.storageList = storageList;
	}
}
