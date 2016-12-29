package com.arcsoft.commander.service.task.parser;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.dom4j.Element;

import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.service.parser.AbstractElementParser;
import com.arcsoft.web4transcoder.service.parser.ElementParser;

/**
 * Servers element parser.
 * 
 * @author fjli
 */
public class ServersElementParser extends AbstractElementParser {

	private ElementParser serverElementParser;

	public void setServerElementParser(ElementParser serverElementParser) {
		this.serverElementParser = serverElementParser;
	}

	@Override
	public Object parse(Element element, Object result) {
		Map<String, String> map = new TreeMap<String, String>();
		Map<String, ElementParser> childParsers = new TreeMap<String, ElementParser>();
		childParsers.put("server", serverElementParser);
		List<ServerData<List<Task>>> servers = new LinkedList<>();
		parseChildElements(element, map, null, childParsers, servers);
		return servers;
	}

}
