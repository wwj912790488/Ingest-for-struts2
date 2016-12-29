package com.arcsoft.commander.service.task.builder;

import java.util.List;

import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.web4transcoder.domain.Task;

public interface ExportTaskXmlBuilder {

	String buildkXml(List<ServerData<List<Task>>> servers);

}
