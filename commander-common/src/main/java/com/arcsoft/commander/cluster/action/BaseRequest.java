package com.arcsoft.commander.cluster.action;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.arcsoft.cluster.app.Request;

/**
 * Base request.
 * 
 * @author fjli
 */
@XmlRootElement
public abstract class BaseRequest implements Request {

	@Override
	@XmlTransient
	public int getMessageType() {
		return Actions.TYPE_REQUEST;
	}

}
