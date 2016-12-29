package com.arcsoft.commander.action.task;

import java.util.List;

import com.arcsoft.commander.domain.server.NIO;
import com.arcsoft.commander.service.settings.NioService;
import com.arcsoft.web4transcoder.action.task.ViewTaskAction;

/**
 * Override some methods of the ViewTaskAction for commander implementation.
 * 
 * @author fjli
 */
public class CommanderViewTaskAction extends ViewTaskAction {

	private static final long serialVersionUID = 1630233028974178526L;
	private NioService nioService;
	private List<NIO> nios;

	public void setNioService(NioService nioService) {
		this.nioService = nioService;
	}

	@Override
	public String getLocalIpOption(String ethId) {
		if (ethId == null || "".equals(ethId) || "auto".equals(ethId))
			return getText("common.default");

		int nioId;
		try {
			nioId = Integer.parseInt(ethId);
		} catch (NumberFormatException e) {
			return ethId;
		}

		if (nios == null)
			nios = nioService.getNios();

		for (NIO nio : nios) {
			if (nioId == nio.getId())
				return nio.getName();
		}

		return ethId;
	}

}
