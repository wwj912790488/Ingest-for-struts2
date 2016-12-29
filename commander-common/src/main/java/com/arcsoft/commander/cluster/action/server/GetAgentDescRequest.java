package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * The commander can send this request to agent to get the details, such as
 * version, license, transcoding ability.
 * 
 * @author fjli
 */
@XmlRootElement
public class GetAgentDescRequest extends BaseRequest {

}
