package com.arcsoft.commander.cluster.action.fault;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * This request is used to get fault service description
 * 
 * @author wtsun
 */
@XmlRootElement
public class GetFaultDescRequest extends BaseRequest {

	/**
	 * Default construct, for data converter.
	 */
	public GetFaultDescRequest() {
	}
}
