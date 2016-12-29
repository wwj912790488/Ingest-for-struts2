package com.arcsoft.commander.agent.service.builder;

import java.io.IOException;
import java.util.List;

import com.arcsoft.commander.agent.service.settings.NetworkConfigService;
import com.arcsoft.commander.agent.service.settings.NetworkConfiguration;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.service.settings.LocalEthService;
import com.arcsoft.commons.utils.app.ShellException;
import com.arcsoft.transcoder.SourceSignal;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.*;
import com.arcsoft.web4transcoder.domain.output.LiveOutput;
import com.arcsoft.web4transcoder.domain.outputgroup.CandidateOutput;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.UdpGroupSetting;
import com.arcsoft.web4transcoder.service.SourceSignalSettingsService;
import com.arcsoft.web4transcoder.service.builder.TranscoderRuntimeXmlBuilderDefault;

/**
 * Agent xml file builder.
 * 
 * @author fjli
 */
public class AgentXmlFileBuilder extends TranscoderRuntimeXmlBuilderDefault {

	private NetworkConfigService networkConfigService;
	private LocalEthService localEthService;
	private SourceSignalSettingsService sourceSignalSettingsService;
	private List<TaskXmlProcessFilter> taskXmlProcessFilters;

	public void setTaskXmlProcessFilters(List<TaskXmlProcessFilter> taskXmlProcessFilters) {
		this.taskXmlProcessFilters = taskXmlProcessFilters;
	}

	public void setNetworkConfigService(NetworkConfigService networkConfigService) {
		this.networkConfigService = networkConfigService;
	}

	public void setLocalEthService(LocalEthService localEthService) {
		this.localEthService = localEthService;
	}

	public void setSourceSignalSettingsService(SourceSignalSettingsService sourceSignalSettingsService) {
		this.sourceSignalSettingsService = sourceSignalSettingsService;
	}

	@Override
	protected void preProcessSourceSignal(Task task) {
		SourceSwitchCondition condition = sourceSignalSettingsService.getSettings();
		List<SignalItem> signalItems = condition.getSignalItems();
		if (signalItems == null || signalItems.isEmpty()) {
			return;
		}
		List<Input> inputs = task.getInputs();
		if (inputs != null && !inputs.isEmpty()) {
			InputBody body = inputs.get(0).getBody();
			if (body instanceof NetworkInput) {
				NetworkInput networkInput = (NetworkInput) body;
				SourceSwitchCondition switchModeCondition = networkInput.getSwitchCondition();
				if (switchModeCondition != null && switchModeCondition.getSwitchMode() != null) {
					condition.setSwitchMode(switchModeCondition.getSwitchMode());
				} else {
					condition.setSwitchMode(SourceSignal.SIGNAL_MASTER);
				}
				networkInput.setSwitchCondition(condition);
			} else if (body instanceof SdiDeviceInput) {
				SdiDeviceInput sdiDeviceInput = (SdiDeviceInput) body;
				SourceSwitchCondition switchModeCondition = sdiDeviceInput.getSwitchCondition();
				if (switchModeCondition != null && switchModeCondition.getSwitchMode() != null) {
					condition.setSwitchMode(switchModeCondition.getSwitchMode());
				} else {
					condition.setSwitchMode(SourceSignal.SIGNAL_MASTER);
				}
				sdiDeviceInput.setSwitchCondition(condition);
			} else if (body instanceof AsiDeviceInput) {
				AsiDeviceInput asiDeviceInput = (AsiDeviceInput) body;
				SourceSwitchCondition switchModeCondition = asiDeviceInput.getSwitchCondition();
				if (switchModeCondition != null && switchModeCondition.getSwitchMode() != null) {
					condition.setSwitchMode(switchModeCondition.getSwitchMode());
				} else {
					condition.setSwitchMode(SourceSignal.SIGNAL_MASTER);
				}
				asiDeviceInput.setSwitchCondition(condition);
			}
		}
	}

	@Override
	protected Task preProcessTask(Task task) {
		task = super.preProcessTask(task);
		fillTaskOutputId(task);
		fillNetworkInfo(task);
		if (taskXmlProcessFilters != null) {
			for (TaskXmlProcessFilter filter : taskXmlProcessFilters) {
				filter.preProcessTask(task);
			}
		}
		return task;
	}

	/**
	 * FIXME: transcoder1.7 use the group id and output id to report output connection state.
	 * But on commander, the group id and output id is missing after deserialize, so we use
	 * the group index and output index as it's id. This issue will be fixed in the future and
	 * this code should be removed.
	 */
	private void fillTaskOutputId(Task task) {
		List<LiveOutputGroup> groups = task.getOutputGroups();
		for (int groupIndex = 0; groupIndex < groups.size(); groupIndex++) {
			LiveOutputGroup group = groups.get(groupIndex);
			group.setId(groupIndex);
			List<LiveOutput> outputs = group.getLiveOutputs();
			for (int outputIndex = 0; outputIndex < outputs.size(); outputIndex++) {
				LiveOutput output = outputs.get(outputIndex);
				output.setId(outputIndex);
				output.setOutputGroupId(group.getId());
			}
		}
	}

	protected void fillNetworkInfo(Task task) {
		NetworkConfiguration networkConfig = null;
		try {
			networkConfig = networkConfigService.readConfig();
		} catch (Exception e) {
		}
		if (networkConfig != null) {
			updateNetworksNioToEth(task, networkConfig);
		}
	}

	private String getNetworkAddress(NetworkConfiguration config, String strNio) {
		int nio = -1;
		try {
			nio = Integer.parseInt(strNio);
		} catch (NumberFormatException e) {
			return null;
		}
		String inputEth = config.getEthByNio(nio);
		if (inputEth == null || inputEth.isEmpty())
			return null;
		try {
			List<Eth> localEths = localEthService.getValidEths();
			for (Eth eth : localEths) {
				if (eth.getId().equals(inputEth))
					return eth.getIp();
			}
		} catch (ShellException | IOException e1) {
		}
		return null;
	}

	private void updateNetworksNioToEth(Task task, NetworkConfiguration config) {
		// input
		if (!task.getInputs().isEmpty()) {
			Input input = task.getInputs().get(0);
			InputBody body = input.getBody();
			if (body instanceof NetworkInput) {
				NetworkInput networkInput = (NetworkInput) body;
				networkInput.setSrcIp(getNetworkAddress(config, networkInput.getSrcIp()));
	
				List<CandidateLocation> candidateLocations = networkInput.getCandidateLocations();
				if (candidateLocations.size() > 0) {
					CandidateLocation backup = candidateLocations.get(0);
					backup.setSrcIp(getNetworkAddress(config, backup.getSrcIp()));
				}
			}
		}
		
		// output
		List<LiveOutputGroup> groups = task.getOutputGroups();
		for (LiveOutputGroup group : groups) {
			if (group.getSettingsType().equals(OutputGroupSetting.SETTING_TYPE_UDPSTREAMING)) {
				group.setSrcIp(getNetworkAddress(config, group.getSrcIp()));
				UdpGroupSetting udpSetting = (UdpGroupSetting)group.getOutputGroupSetting();
				List<CandidateOutput> candidates = udpSetting.getCandidateOutputs();
				for (CandidateOutput candidate : candidates) {
					candidate.setSrcIp(getNetworkAddress(config, candidate.getSrcIp()));
				}
			}
		}
	}
}
