package com.arcsoft.commander.agent.service.task.impl.handlers;

import java.io.StringWriter;
import java.util.List;

import org.apache.log4j.Logger;
import org.w3c.dom.Element;

import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.commander.agent.service.task.impl.TaskInfo;
import com.arcsoft.transcoder.ITranscodingTracker;
import com.arcsoft.web4transcoder.domain.input.SignalItem;
import com.arcsoft.web4transcoder.domain.input.SourceSwitchCondition;
import com.arcsoft.web4transcoder.service.builder.TranscoderXmlBuilder;

/**
 * Task signal setting handler.
 * 
 * @author fjli
 */
public class SignalSettingHandler extends BaseTaskExecuteHalder {

	private final static Logger LOG = Logger.getLogger(SignalSettingHandler.class);
	private byte[] settings;

	public SignalSettingHandler(List<SignalItem> signalItems) {
		try {
			XmlHelper xml = new XmlHelper();
			Element root = xml.createRoot("TranscoderTask");
			Element inputs = xml.appendNode(root, "Inputs");
			xml.addAttribute(inputs, "Count", "1");
			Element input = xml.appendNode(inputs, "Input");
			xml.addAttribute(inputs, "idx", "0");
			SourceSwitchCondition condition = new SourceSwitchCondition();
			condition.setSignalItems(signalItems);
			TranscoderXmlBuilder.xmlSignalSetting(input, condition);
			StringWriter out = new StringWriter();
			TranscoderXmlBuilder.elemToXml(xml.getDocument(), out, 0);
			settings = out.toString().getBytes("utf-8");
		} catch (Exception e) {
			LOG.error("convert signal items to xml failed.", e);
		}
	}

	@Override
	public void doUpdateTask(TaskInfo info) {
		ITranscodingTracker tracker = transcodingService.getTranscodingTracker(info.getTaskId());
		if (tracker != null) {
			int ret = tracker.setSignalSetting(settings);
			LOG.info("apply signal setting to task(id=" + info.getTaskId() + "), ret=" + ret);
		}
	}

}
