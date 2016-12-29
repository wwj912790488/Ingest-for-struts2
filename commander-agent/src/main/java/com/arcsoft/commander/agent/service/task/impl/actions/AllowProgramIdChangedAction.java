package com.arcsoft.commander.agent.service.task.impl.actions;

import java.io.ByteArrayOutputStream;

import org.apache.log4j.Logger;
import org.w3c.dom.Element;

import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.transcoder.ITranscodingTracker;

/**
 * Allow program id changed action.
 * 
 * @author fjli
 */
public class AllowProgramIdChangedAction extends BaseTaskUpdateAction {

	private final static Logger LOG = Logger.getLogger(AllowProgramIdChangedAction.class);

	@Override
	public void execute() {
		String value = taskChangedInfo.getAllowProgramIdChanged() ? "1" : "0";
		ITranscodingTracker tracker = getTranscodingTracker();
		String logprefix = "update task(id=" + getTaskId() + ") allow program id changed (" + value + "), %s";
		if (tracker == null) {
			LOG.error(String.format(logprefix, "cannot find tracker."));
			return;
		}
		try {
			XmlHelper xml = new XmlHelper();
			Element root = xml.createRoot("TranscoderTask");
			Element inputs = xml.appendNode(root, "Inputs");
			xml.addAttribute(inputs, "Count", "1");
			Element input = xml.appendNode(inputs, "Input");
			xml.addAttribute(input, "idx", "0");
			Element allowProgramIdChange = xml.appendNode(input, "AllowProgramIDChange");
			allowProgramIdChange.setTextContent(value);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			xml.saveAs(bos, "utf-8");
			int ret = tracker.setSignalSetting(bos.toByteArray());
			LOG.info(String.format(logprefix, "ret=" + ret));
		} catch (Exception e) {
			LOG.error(String.format(logprefix, "failed."), e);
		}
	}

}
