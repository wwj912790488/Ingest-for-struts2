package com.arcsoft.commander.service.task.builder;

import java.util.List;

import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.service.builder.XmlBuilderSupport;

public class ExportTaskXmlBuilderImpl extends XmlBuilderSupport implements ExportTaskXmlBuilder {
	
	public ExportTaskXmlBuilderImpl() {
		super();
	}

	public String buildkXml(List<ServerData<List<Task>>> servers) {
		return buildkXml("exporttasks", "servers", servers);
	}

}
