package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.FirewallRule;

/**
 * Response for getting firewall rules
 * 
 * @author hxiang
 */
@XmlRootElement
public class ListFirewallResponse extends BaseResponse {

	private List<FirewallRule> rules;

	public List<FirewallRule> getRules() {
		return rules;
	}

	public void setRules(List<FirewallRule> rules) {
		this.rules = rules;
	}
}
