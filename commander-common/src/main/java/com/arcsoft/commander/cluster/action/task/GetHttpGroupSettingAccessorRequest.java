package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * The request message for GetHttpGroupSettingAccessor request.
 * 
 * @author wtsun
 */
@XmlRootElement
public class GetHttpGroupSettingAccessorRequest extends BaseRequest {
	private String uri;
	private String container;
	
	/**
	 * Default construct, for data converter.
	 */
	public GetHttpGroupSettingAccessorRequest() {
	}

	/**
	 * Construct GetHttpGroupSettingAccessorRequest request with the http target.
	 * 
	 * @param target - the http target
	 */
	public GetHttpGroupSettingAccessorRequest(String container, String uri) {
		this.uri = uri;
		this.container = container;
	}

	/**
	 * @return the uri
	 */
	public String getUri() {
		return uri;
	}

	/**
	 * @param uri the uri to set
	 */
	public void setUri(String uri) {
		this.uri = uri;
	}

	/**
	 * @return the container
	 */
	public String getContainer() {
		return container;
	}

	/**
	 * @param container the container to set
	 */
	public void setContainer(String container) {
		this.container = container;
	}

}
