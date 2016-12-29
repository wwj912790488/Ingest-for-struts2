package com.arcsoft.commander.service.alert.impl;

import java.io.File;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.arcsoft.arcvideo.common.utils.XmlHelper;

/**
 * Alert integration support.
 * 
 * @author fjli
 */
public abstract class AlertIntegrationSupport {

	private String configFile;

	public void setConfigFile(String configFile) {
		this.configFile = configFile;
	}

	public String getConfigFile() {
		return configFile;
	}

	protected XmlHelper createXmlHelper() throws Exception {
		return new XmlHelper(new File(configFile));
	}

	protected Node getDataServerNode(XmlHelper xml, String serverClass) throws Exception {
		NodeList nodeList = xml.selectNodes("/alert/servers/server");
		for (int i = 0; i < nodeList.getLength(); i++) {
			Node server = nodeList.item(i);
			String clazz = xml.getNodeText("class", server);
			if (serverClass.equals(clazz))
				return server;
		}
		return null;
	}

	protected Node getSenderNode(XmlHelper xml, String senderClass) throws Exception {
		NodeList nodeList = xml.selectNodes("/alert/senders/sender");
		for (int i = 0; i < nodeList.getLength(); i++) {
			Node sender = nodeList.item(i);
			String clazz = xml.getNodeText("class", sender);
			if (senderClass.equals(clazz))
				return sender;
		}
		return null;
	}

	protected String getOption(XmlHelper xml, Node paramsNode, String name) throws Exception {
		return xml.getNodeText("param[@name='" + name + "']", paramsNode);
	}

	protected void setOption(XmlHelper xml, Node paramsNode, String name, String value) throws Exception {
		Node hostNode = xml.selectNode("param[@name='" + name + "']", paramsNode);
		if (hostNode != null) {
			hostNode.setTextContent(value);
		} else {
			Element newNode = xml.appendNode(paramsNode, "param");
			xml.addAttribute(newNode, name, value);
		}
	}

}
