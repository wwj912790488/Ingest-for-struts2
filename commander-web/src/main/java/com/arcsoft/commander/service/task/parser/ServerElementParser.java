package com.arcsoft.commander.service.task.parser;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.dom4j.Element;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.service.parser.AbstractElementParser;
import com.arcsoft.web4transcoder.service.parser.ElementParser;

/**
 * Server element parser.
 * 
 * @author fjli
 */
public class ServerElementParser extends AbstractElementParser {

	private ElementParser tasksElementParser;

	public void setTasksElementParser(ElementParser tasksElementParser) {
		this.tasksElementParser = tasksElementParser;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Object parse(Element element, Object result) {
		List<Task> tasks = new LinkedList<Task>();
		Map<String, String> map = new TreeMap<String, String>();
		parseAttributes(element, map);
		Map<String, ElementParser> selfParsers = new TreeMap<String, ElementParser>();
		selfParsers.put("tasks", this);
		parseChildElements(element, map, selfParsers, null, tasks);
		Server server = new Server();
		server.setId(map.get("id"));
		server.setName(map.get("name"));
		server.setIp(map.get("ip"));
		ServerData<List<Task>> serverData = new ServerData<List<Task>>(server, tasks);
		if (result instanceof List)
			((List<ServerData<List<Task>>>) result).add(serverData);
		return serverData;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Object parse(Element element, Map<String, String> map, Object result) {
		if ("tasks".equals(element.getName())) {
			List<Task> tasks = (List<Task>) tasksElementParser.parse(element, result);
			if (result instanceof List)
				((List<Task>) result).addAll(tasks);
			return tasks;
		} else {
			return null;
		}
	}

}
