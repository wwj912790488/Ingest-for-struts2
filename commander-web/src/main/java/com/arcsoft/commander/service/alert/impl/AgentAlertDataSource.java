package com.arcsoft.commander.service.alert.impl;

import java.util.List;
import java.util.Map;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.alert.AlertMessageRequest;
import com.arcsoft.commander.cluster.action.alert.AlertMessageResponse;
import com.arcsoft.commander.domain.alert.AlertAttribute;
import com.arcsoft.commander.domain.alert.AlertData;
import com.arcsoft.commander.service.alert.AlertCommandClient;
import com.arcsoft.web4transcoder.App;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.AsiDeviceInput;
import com.arcsoft.web4transcoder.domain.input.CandidateLocation;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.input.InputBody;
import com.arcsoft.web4transcoder.domain.input.NetworkInput;
import com.arcsoft.web4transcoder.domain.input.SdiDeviceInput;
import com.arcsoft.web4transcoder.service.TaskService;

/**
 * Agent alert data source.
 * 
 * @author fjli
 */
public class AgentAlertDataSource implements ActionHandler {

	private String defaultTaskError;
	private String defaultTaskWarning;
	private Map<String, String> errorcodeMap;
	private AlertCommandClient alertCommandClient;
	private TaskService taskService;

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public void setAlertCommandClient(AlertCommandClient alertCommandClient) {
		this.alertCommandClient = alertCommandClient;
	}

	public void setDefaultTaskError(String defaultTaskError) {
		this.defaultTaskError = defaultTaskError;
	}

	public void setDefaultTaskWarning(String defaultTaskWarning) {
		this.defaultTaskWarning = defaultTaskWarning;
	}

	public void setErrorcodeMap(Map<String, String> errorcodeMap) {
		this.errorcodeMap = errorcodeMap;
	}

	@Override
	public int[] getActions() {
		return new int[] { Actions.ALERT_MESSAGE };
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof AlertMessageRequest) {
			return processAlertMessageRequest((AlertMessageRequest) request);
		}
		return null;
	}

	private AlertMessageResponse processAlertMessageRequest(AlertMessageRequest request) {
		String errorCode = String.format("0x%08X", request.getCode());
		String rule = errorcodeMap.get(errorCode);
		if (rule == null)
			rule = errorcodeMap.get(errorCode.toLowerCase());
		if (rule == null) {
			boolean isError = (request.getLevel() == 1);
			rule = isError ? defaultTaskError : defaultTaskWarning;
		}
		String taskId = String.valueOf(request.getTaskId());
		AlertData data = new AlertData();
		data.setIp(request.getIp());
		data.setCode(rule);
		data.setIndex(taskId);
		data.setAttribute(AlertAttribute.ATTR_ERROR_CODE, errorCode);
		data.setAttribute(AlertAttribute.ATTR_TASK_ID, taskId);

		Task task = taskService.getTask(request.getTaskId(), true);
		String taskName = (task != null ? task.getName() : "");
		data.setAttribute(AlertAttribute.ATTR_TASK_NAME, taskName);

		if (rule.startsWith("signal")) {
			int signalId = getSignalId(request.getCode());
			// must set index to distinct the signal for each task
			data.setIndex(taskId + "_" + signalId);
			data.setAttribute(AlertAttribute.ATTR_SIGNAL_ID, getSignalName(signalId));
			data.setAttribute(AlertAttribute.ATTR_TASK_INPUT, getTaskInput(task, signalId));
		} else if (rule.startsWith("source")) {
			data.setAttribute(AlertAttribute.ATTR_TASK_INPUT, getTaskInput(task, 0));
		}

		alertCommandClient.send(data);
		AlertMessageResponse response = new AlertMessageResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	private String getTaskInput(Task task, int signalId) {
		String inputString = "";
		if (task != null) {
			List<Input> inputs = task.getInputs();
			if (inputs != null && !inputs.isEmpty()) {
				Input input = inputs.get(0);
				InputBody inputBody = input.getBody();
				if (inputBody instanceof NetworkInput) {
					switch(signalId) {
					case 0:
						inputString = ((NetworkInput) inputBody).getUri();
						break;
					case 1:
						List<CandidateLocation>  candidateLocations = ((NetworkInput) inputBody).getCandidateLocations();
						if (candidateLocations != null && !candidateLocations.isEmpty())
							inputString = candidateLocations.get(0).getUri();
						break;
					case 2:
						inputString = input.getPaddingImage();
						break;
					default:
						inputString = ((NetworkInput) inputBody).getUri();
						break;
					}
				} else if (inputBody instanceof AsiDeviceInput) {
					inputString = "ASI:" + ((AsiDeviceInput) inputBody).getDeviceId();
				} else if (inputBody instanceof SdiDeviceInput) {
					inputString = "SDI:" + ((SdiDeviceInput) inputBody).getDeviceId();
				}
			}
		}
		return inputString;
	}

	private static int getSignalId(int code) {
		int signalId = -1;
		if ((code & 0x00021000) != 0) {
			switch ((code & 0x00000F00) >> 8) {
			case 0:
				signalId = 0;
				break;
			case 0xF:
				signalId = 1;
				break;
			case 0xE:
				signalId = 2;
				break;
			}
		} else {
			switch (code) {
			case 0x00090103:
				signalId = 0;
				break;
			case 0x00090104:
				signalId = 1;
				break;
			case 0x00090105:
				signalId = 2;
				break;
			}
		}
		return signalId;
	}

	private String getSignalName(int signalId) {
		String signalName = "";
		switch (signalId) {
		case 0:
			signalName = App.getInstance().getLocalizedString("input.source.master");
			break;
		case 1:
			signalName = App.getInstance().getLocalizedString("input.source.backup");
			break;
		case 2:
			signalName = App.getInstance().getLocalizedString("input.source.padding");
			break;
		}
		return signalName;
	}

}
