package com.arcsoft.commander.controller;

import static com.arcsoft.commander.controller.ApiErrorCode.INVALID_ARGUMENT;
import static com.arcsoft.commander.controller.ApiErrorCode.NO_SERVER_GROUP;
import static com.arcsoft.commander.controller.ApiErrorCode.UNKNOWN_ERROR;
import static com.arcsoft.commander.controller.ControllerUtils.createModelMap;
import static com.arcsoft.commander.controller.ControllerUtils.createSuccessMap;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.domain.record.RecordSetting;
import com.arcsoft.commander.domain.record.RecordTask;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.domain.Location;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.input.InputType;
import com.arcsoft.web4transcoder.domain.input.NetworkInput;
import com.arcsoft.web4transcoder.domain.outputgroup.ArchiveGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import com.arcsoft.web4transcoder.service.LiveProfileService;

/**
 * Live event record controller.
 * 
 * @author fjli
 */
@Controller
public class LiveEventController {

	private static final Pattern URI_PATTERN = Pattern.compile("^(?<path>.*)/(?<filename>[^/]+)\\.(?<extension>[^/\\.]+)$");
	private Logger log = Logger.getLogger(LiveEventController.class);
	private LiveProfileService liveProfileService;
	private CustomTaskService customTaskService;
	private TaskExecuteService taskExecuteService;
	private RecordInfoService recordInfoService;
	private ServerService serverService;

	public void setLiveProfileService(LiveProfileService liveProfileService) {
		this.liveProfileService = liveProfileService;
	}

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	public void setRecordInfoService(RecordInfoService recordInfoService) {
		this.recordInfoService = recordInfoService;
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	@RequestMapping(method=RequestMethod.POST, value="api/liveevent")
	@ResponseBody
	public Map<String, Object> add(@RequestBody LiveEventInfo info) {
		RecordTask task = new RecordTask();
		task.setName(info.getName());
		if (StringHelper.isBlank(info.getName())) {
			return createModelMap(INVALID_ARGUMENT, "The task name is not specified.");
		}

		// use profile.
		if (info.getProfile() != null) {
			if (liveProfileService.getLiveProfile(info.getProfile()) == null) {
				return createModelMap(INVALID_ARGUMENT, "Cannot find profile(id=%d).", info.getProfile());
			}
		} else if (info.getProfileName() != null) {
			List<LiveProfile> profiles = liveProfileService.getAllLiveProfiles(false);
			for (LiveProfile profile : profiles) {
				if (info.getProfileName().equals(profile.getName())) {
					info.setProfile(profile.getId());
					break;
				}
			}
			if (info.getProfile() == null) {
				return createModelMap(INVALID_ARGUMENT, "Cannot find profile(name=%s).", info.getProfileName());
			}
		} else {
			return createModelMap(INVALID_ARGUMENT, "The profile has not specified.");
		}
		customTaskService.fillTaskWithLiveProfile(info.getProfile(), task);

		// create input
		task.setInputs(createInput(info.getInput()));
		if (task.getInputs() == null || task.getInputs().isEmpty()) {
			return createModelMap(INVALID_ARGUMENT, "The input uri is not supported.");
		}

		// output path
		List<LiveOutputGroup> groups = task.getOutputGroups();
		List<LiveOutput> outputs = info.getOutputs();
		if (outputs == null || outputs.isEmpty()) {
			return createModelMap(INVALID_ARGUMENT, "The output is not specified.");
		}
		if (groups.size() != outputs.size()) {
			return createModelMap(INVALID_ARGUMENT, "The output count does not match the profile setting.");
		}
		RecordSetting recordSetting = recordInfoService.getSetting();
		Boolean enableTempExtension = recordSetting.getEnableTempExtension();
		String tmpExtension = Boolean.TRUE.equals(enableTempExtension) ? recordSetting.getTempExtension() : null;
		for (int i = 0; i < groups.size(); i++) {
			OutputGroupSetting setting = groups.get(i).getOutputGroupSetting();
			if (setting instanceof ArchiveGroupSetting) {
				ArchiveGroupSetting archive = (ArchiveGroupSetting) setting;
				LiveOutput recordOutput = info.getOutputs().get(i);
				if (StringHelper.isBlank(recordOutput.getUri())) {
					return createModelMap(INVALID_ARGUMENT, "The output uri is not specified.");
				}
				Matcher matcher = URI_PATTERN.matcher(recordOutput.getUri());
				if (!matcher.find()) {
					return createModelMap(INVALID_ARGUMENT, "The output uri is invalid.");
				}
				Location location = new Location();
				location.setUri(matcher.group("path"));
				archive.setLocation(location);
				archive.setTargetName(matcher.group("filename"));
				archive.setExtension(matcher.group("extension"));
				if (tmpExtension != null && !tmpExtension.isEmpty()) {
					archive.setTempExtension(tmpExtension);
				}
			}
		}

		// set extension data.
		String extension = "";
		Map<String, String> options = info.getOptions();
		if (options != null) {
			for (Entry<String, String> entry : options.entrySet()) {
				extension += entry.getKey() + "=" + entry.getValue() + ";";
			}
		}
		if (!extension.isEmpty()) {
			task.setUserData(extension);
		}

		// check server group.
		List<ServerGroup> serverGroups = serverService.list(false);
		if (serverGroups.isEmpty()) {
			return createModelMap(NO_SERVER_GROUP, "No server group is assigned.");
		} else {
			task.setType(0);
			task.setGroupId(serverGroups.get(0).getId());
		}

		try {
			// save task.
			customTaskService.saveTask(task);
			log.info("live event task created, id=" + task.getId() + ", name=" + info.getName());
		} catch(Exception e) {
			log.error("save live event failed: " + e.getMessage(), e);
			return createModelMap(UNKNOWN_ERROR, "Save live event (name=%s) failed.", info.getName());
		}

		try {
			// start task.
			taskExecuteService.startTask(task.getId());
		} catch(Exception e) {
			customTaskService.deleteTask(task.getId());
			log.error("start live event failed: " + e.getMessage(), e);
			return createModelMap(UNKNOWN_ERROR, "Start live event (name=%s) failed.", info.getName());
		}

		// success.
		Map<String, Object> model = createSuccessMap();
		model.put("id", task.getId());
		return model;
	}

	private List<Input> createInput(LiveInput recordInput) {
		List<Input> inputs = new LinkedList<Input>();
		String protocol = null;
		String uri = recordInput.getUri().toLowerCase();
		if (uri.startsWith("rtmp:")) {
			protocol = NetworkInput.PROTOCOL_RTMP;
		} else if (uri.startsWith("udp:")) {
			protocol = NetworkInput.PROTOCOL_TSOVERUDP;
		} else if (uri.startsWith("rtsp:")) {
			protocol = NetworkInput.PROTOCOL_RTSP;
		} else if (uri.startsWith("rtp:")) {
			protocol = NetworkInput.PROTOCOL_ESOVERRTP;
		} else if (uri.startsWith("http:")) {
			protocol = "HTTP";
		} else {
			return null;
		}
		Input input = new Input();
		NetworkInput networkInput = new NetworkInput();
		networkInput.setUri(recordInput.getUri());
		networkInput.setProtocol(protocol);
		input.setProgramId(StringHelper.toDefaultIfNull(recordInput.getProgramId(), -1));
		input.setVideoTrackId(StringHelper.toDefaultIfNull(recordInput.getVideoId(), -1));
		input.setAudioTrackId(StringHelper.toDefaultIfNull(recordInput.getAudioId(), -1));
		input.setVideoInputType(InputType.Network.name());
		input.setBody(networkInput);
		inputs.add(input);
		return inputs;
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "api/liveevent/{id}")
	@ResponseBody
	public Map<String, Object> delete(@PathVariable Integer id) {
		Task task = customTaskService.getTask(id, false);
		if (task == null) {
			return createSuccessMap();
		}
		try {
			taskExecuteService.stopTasks(Arrays.asList(task));
		} catch (Exception e) {
			log.error("Stop live event (id=" + id + ") failed: " + e.getMessage(), e);
			return createModelMap(UNKNOWN_ERROR, "Stop live event (id=%d) failed.", id);
		}
		try {
			customTaskService.deleteTask(id);
			return createSuccessMap();
		} catch (Exception e) {
			return createModelMap(UNKNOWN_ERROR, "Delete live event (id=%d) failed.", id);
		}
	}

}
