package com.arcsoft.commander.service.alert.impl;

import java.io.IOException;
import java.util.Map.Entry;

import org.apache.log4j.Logger;
import org.apache.log4j.helpers.FileWatchdog;
import org.w3c.dom.Node;

import com.arcsoft.arcvideo.common.net.TcpClient;
import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.commander.domain.alert.AlertData;
import com.arcsoft.commander.service.alert.AlertCommandClient;

/**
 * Alert command client implementation.
 * 
 * @author fjli
 */
public class AlertCommandClientImpl extends AlertIntegrationSupport implements AlertCommandClient {

	private static final String TCP_SERVER_CLASS = "com.arcsoft.arcvideo.alert.server.TcpCommandDataServer";
	private static final String OPTION_IP = "ip";
	private static final String OPTION_PORT = "port";
	private static final String OPTION_CHARSET = "charset";
	private static final String OPTION_COMMAND = "command";
	private static final String OPTION_TIMESTAMP = "timestamp";
	private static final String OPTION_HOST = "host";
	private static final String OPTION_CODE = "code";
	private static final String OPTION_INDEX = "index";
	private static final String OPTION_DATA = "data";
	private static final String OPTION_ATTRIBUTE = "attr";

	private Logger log = Logger.getLogger(AlertCommandClientImpl.class);
	private TcpClient tcpClient;
	private int timeout = 10000;
	private boolean keepAlive = true;
	private String optCommand;
	private String optTimestamp;
	private String optHost;
	private String optCode;
	private String optIndex;
	private String optData;
	private String optAttr;
	private FileWatchdog watchDog;
	private boolean alertEnabled = false;

	public void init() throws Exception {
		if (log.isInfoEnabled())
			log.info("init alert commander client.");
		watchDog = new FileWatchdog(getConfigFile()) {
			@Override
			protected void doOnChange() {
				if (log.isInfoEnabled())
					log.info("alert configuration file on change.");
				if (tcpClient != null)
					tcpClient.close();
				try {
					XmlHelper xml = createXmlHelper();
					Node server = getDataServerNode(xml, TCP_SERVER_CLASS);
					if (server != null) {
						Node paramsNode = xml.selectNode("params", server);
						String ip = getOption(xml, paramsNode, OPTION_IP);
						int port = Integer.decode(getOption(xml, paramsNode, OPTION_PORT));
						optCommand = getOption(xml, paramsNode, OPTION_COMMAND);
						optTimestamp = getOption(xml, paramsNode, OPTION_TIMESTAMP);
						optHost = getOption(xml, paramsNode, OPTION_HOST);
						optCode = getOption(xml, paramsNode, OPTION_CODE);
						optIndex = getOption(xml, paramsNode, OPTION_INDEX);
						optData = getOption(xml, paramsNode, OPTION_DATA);
						optAttr = getOption(xml, paramsNode, OPTION_ATTRIBUTE);
						if (ip.equals("127.0.0.1") || ip.equals("localhost") || ip.equals("0.0.0.0"))
							ip = "127.0.0.1";
						String charset = getOption(xml, paramsNode, OPTION_CHARSET);
						if (charset == null)
							charset = "utf-8";
						alertEnabled = true;
						tcpClient = new TcpClient(ip, port, timeout, charset, keepAlive);
						tcpClient.connect();
						if (log.isInfoEnabled())
							log.info("load alert configuration success.");
					}
				} catch(Exception e) {
					log.error("load alert configuration failed.", e);
				}
			}
		};
		watchDog.setDelay(10000);
		watchDog.start();
	}

	@Override
	public void send(AlertData data) {
		if (!alertEnabled)
			return;
		StringBuilder buf = new StringBuilder(optCommand);
		// append data
		Long timestamp = data.getTimestamp();
		if (timestamp == null)
			timestamp = System.currentTimeMillis();
		buf.append(" ").append(optTimestamp).append(" ").append(timestamp);
		buf.append(" ").append(optHost).append(" ").append(data.getIp());
		buf.append(" ").append(optCode).append(" ").append(data.getCode());
		if (data.getIndex() != null)
			buf.append(" ").append(optIndex).append(" ").append(data.getIndex());
		if (data.getData() != null)
			buf.append(" ").append(optData).append(" ").append(data.getData());
		// append attributes
		for (Entry<String, String> entry : data.getAttributes().entrySet())
			buf.append(" ").append(optAttr).append(entry.getKey()).append("=\"").append(entry.getValue()).append("\"");
		if (log.isInfoEnabled())
			log.info(buf);
		buf.append("\n");
		// send to server
		if (tcpClient != null)
			tcpClient.write(buf.toString());
	}

	public void destroy() throws IOException {
		if (tcpClient != null)
			tcpClient.close();
	}

}
