package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.FirewallRule;

/**
 * Request for deletting the firewall rule.
 * 
 * @author hxiang
 */
@XmlRootElement
public class DeleteFirewallRequest extends BaseRequest {

	private List<FirewallRule> rules = null;

	public DeleteFirewallRequest() {

	}

	public DeleteFirewallRequest(List<FirewallRule> rules) {
		this.setRules(rules);
	}

	public List<FirewallRule> getRules() {
		return rules;
	}

	public void setRules(List<FirewallRule> rules) {
		this.rules = rules;
	}
}
