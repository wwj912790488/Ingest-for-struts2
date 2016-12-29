package com.arcsoft.commander.action.settings;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.settings.RemoteSignalSettingService;
import com.arcsoft.web4transcoder.domain.input.SignalItem;
import com.arcsoft.web4transcoder.domain.input.SourceSwitchCondition;
import com.arcsoft.web4transcoder.service.SourceSignalSettingsService;

/**
 * Action for source signal setting operation
 * 
 * @author wtsun
 * 
 */
@SuppressWarnings("serial")
public class SourceSignalSettingsAction extends BaseServerSettingAction {

	private SourceSignalSettingsService sourceSignalSettingsService;
	private RemoteSignalSettingService remoteSignalSettingService;
	private Integer multple = 1;

	private Integer notifyInterval;

	private Integer signalBrokenTimeout;
	private Boolean signalBrokenEnabled;

	private Integer patLossTimeout;
	private Boolean patLossEnabled;

	private Integer progidLossTimeout;
	private Boolean progidLossEnabled;

	private Integer pmtLossTimeout;
	private Boolean pmtLossEnabled;

	private Integer avLossTimeout;
	private Boolean avLossEnabled;

	private Integer ccErrorTimeout;
	private Boolean ccErrorEnabled;
	private Integer ccErrorCount;
	
	/* warning check and warning timeout */
	private Integer warningSignalBrokenTimeout;
	private Boolean warningSignalBrokenEnabled;

	private Integer warningPatLossTimeout;
	private Boolean warningPatLossEnabled;

	private Integer warningProgidLossTimeout;
	private Boolean warningProgidLossEnabled;

	private Integer warningPmtLossTimeout;
	private Boolean warningPmtLossEnabled;

	private Integer warningAvLossTimeout;
	private Boolean warningAvLossEnabled;

	private Integer warningCcErrorTimeout;
	private Boolean warningCcErrorEnabled;
	private Integer warningCcErrorCount;

	public void setSourceSignalSettingsService(SourceSignalSettingsService sourceSignalSettingsService) {
		this.sourceSignalSettingsService = sourceSignalSettingsService;
	}

	public void setRemoteSignalSettingService(RemoteSignalSettingService remoteSignalSettingService) {
		this.remoteSignalSettingService = remoteSignalSettingService;
	}

	public Integer getNotifyInterval() {
		return notifyInterval;
	}

	public void setNotifyInterval(Integer notifyInterval) {
		this.notifyInterval = notifyInterval;
	}

	public Integer getSignalBrokenTimeout() {
		return signalBrokenTimeout;
	}

	public void setSignalBrokenTimeout(Integer signalBrokenTimeout) {
		this.signalBrokenTimeout = signalBrokenTimeout;
	}

	public Boolean getSignalBrokenEnabled() {
		return signalBrokenEnabled;
	}

	public void setSignalBrokenEnabled(Boolean signalBrokenEnabled) {
		this.signalBrokenEnabled = signalBrokenEnabled;
	}

	public Integer getPatLossTimeout() {
		return patLossTimeout;
	}

	public void setPatLossTimeout(Integer patLossTimeout) {
		this.patLossTimeout = patLossTimeout;
	}

	public Boolean getPatLossEnabled() {
		return patLossEnabled;
	}

	public void setPatLossEnabled(Boolean patLossEnabled) {
		this.patLossEnabled = patLossEnabled;
	}

	public Integer getProgidLossTimeout() {
		return progidLossTimeout;
	}

	public void setProgidLossTimeout(Integer progidLossTimeout) {
		this.progidLossTimeout = progidLossTimeout;
	}

	public Boolean getProgidLossEnabled() {
		return progidLossEnabled;
	}

	public void setProgidLossEnabled(Boolean progidLossEnabled) {
		this.progidLossEnabled = progidLossEnabled;
	}

	public Integer getPmtLossTimeout() {
		return pmtLossTimeout;
	}

	public void setPmtLossTimeout(Integer pmtLossTimeout) {
		this.pmtLossTimeout = pmtLossTimeout;
	}

	public Boolean getPmtLossEnabled() {
		return pmtLossEnabled;
	}

	public void setPmtLossEnabled(Boolean pmtLossEnabled) {
		this.pmtLossEnabled = pmtLossEnabled;
	}

	public Integer getAvLossTimeout() {
		return avLossTimeout;
	}

	public void setAvLossTimeout(Integer avLossTimeout) {
		this.avLossTimeout = avLossTimeout;
	}

	public Boolean getAvLossEnabled() {
		return avLossEnabled;
	}

	public void setAvLossEnabled(Boolean avLossEnabled) {
		this.avLossEnabled = avLossEnabled;
	}

	public Integer getCcErrorTimeout() {
		return ccErrorTimeout;
	}

	public void setCcErrorTimeout(Integer ccErrorTimeout) {
		this.ccErrorTimeout = ccErrorTimeout;
	}

	public Boolean getCcErrorEnabled() {
		return ccErrorEnabled;
	}

	public void setCcErrorEnabled(Boolean ccErrorEnabled) {
		this.ccErrorEnabled = ccErrorEnabled;
	}

	public Integer getCcErrorCount() {
		return ccErrorCount;
	}

	public void setCcErrorCount(Integer ccErrorCount) {
		this.ccErrorCount = ccErrorCount;
	}

	public Integer getWarningSignalBrokenTimeout() {
		return warningSignalBrokenTimeout;
	}

	public void setWarningSignalBrokenTimeout(Integer warningSignalBrokenTimeout) {
		this.warningSignalBrokenTimeout = warningSignalBrokenTimeout;
	}

	public Boolean getWarningSignalBrokenEnabled() {
		return warningSignalBrokenEnabled;
	}

	public void setWarningSignalBrokenEnabled(Boolean warningSignalBrokenEnabled) {
		this.warningSignalBrokenEnabled = warningSignalBrokenEnabled;
	}

	public Integer getWarningPatLossTimeout() {
		return warningPatLossTimeout;
	}

	public void setWarningPatLossTimeout(Integer warningPatLossTimeout) {
		this.warningPatLossTimeout = warningPatLossTimeout;
	}

	public Boolean getWarningPatLossEnabled() {
		return warningPatLossEnabled;
	}

	public void setWarningPatLossEnabled(Boolean warningPatLossEnabled) {
		this.warningPatLossEnabled = warningPatLossEnabled;
	}

	public Integer getWarningProgidLossTimeout() {
		return warningProgidLossTimeout;
	}

	public void setWarningProgidLossTimeout(Integer warningProgidLossTimeout) {
		this.warningProgidLossTimeout = warningProgidLossTimeout;
	}

	public Boolean getWarningProgidLossEnabled() {
		return warningProgidLossEnabled;
	}

	public void setWarningProgidLossEnabled(Boolean warningProgidLossEnabled) {
		this.warningProgidLossEnabled = warningProgidLossEnabled;
	}

	public Integer getWarningPmtLossTimeout() {
		return warningPmtLossTimeout;
	}

	public void setWarningPmtLossTimeout(Integer warningPmtLossTimeout) {
		this.warningPmtLossTimeout = warningPmtLossTimeout;
	}

	public Boolean getWarningPmtLossEnabled() {
		return warningPmtLossEnabled;
	}

	public void setWarningPmtLossEnabled(Boolean warningPmtLossEnabled) {
		this.warningPmtLossEnabled = warningPmtLossEnabled;
	}

	public Integer getWarningAvLossTimeout() {
		return warningAvLossTimeout;
	}

	public void setWarningAvLossTimeout(Integer warningAvLossTimeout) {
		this.warningAvLossTimeout = warningAvLossTimeout;
	}

	public Boolean getWarningAvLossEnabled() {
		return warningAvLossEnabled;
	}

	public void setWarningAvLossEnabled(Boolean warningAvLossEnabled) {
		this.warningAvLossEnabled = warningAvLossEnabled;
	}

	public Integer getWarningCcErrorTimeout() {
		return warningCcErrorTimeout;
	}

	public void setWarningCcErrorTimeout(Integer warningCcErrorTimeout) {
		this.warningCcErrorTimeout = warningCcErrorTimeout;
	}

	public Boolean getWarningCcErrorEnabled() {
		return warningCcErrorEnabled;
	}

	public void setWarningCcErrorEnabled(Boolean warningCcErrorEnabled) {
		this.warningCcErrorEnabled = warningCcErrorEnabled;
	}

	public Integer getWarningCcErrorCount() {
		return warningCcErrorCount;
	}

	public void setWarningCcErrorCount(Integer warningCcErrorCount) {
		this.warningCcErrorCount = warningCcErrorCount;
	}

	public String get() {
		SourceSwitchCondition condition = sourceSignalSettingsService.getSettings();
		List<SignalItem> items = condition.getSignalItems();
		if (items != null) {
			for (SignalItem item : items) {
				if (notifyInterval == null)
					notifyInterval = item.getWarningPeriod() / 1000;
				switch (item.getType()) {
				case SignalItem.SIGNAL_BROKEN:
					signalBrokenTimeout = item.getSwitchTimeout() / multple;
					signalBrokenEnabled = item.isCheck();
					warningSignalBrokenTimeout = item.getWarningTimeout() / multple;
					warningSignalBrokenEnabled = item.isWarningCheck();
					break;
				case SignalItem.PAT_LOSS:
					patLossTimeout = item.getSwitchTimeout() / multple;
					patLossEnabled = item.isCheck();
					warningPatLossTimeout = item.getWarningTimeout() / multple;
					warningPatLossEnabled = item.isWarningCheck();
					break;
				case SignalItem.PROGID_LOSS:
					progidLossTimeout = item.getSwitchTimeout() / multple;
					progidLossEnabled = item.isCheck();
					warningProgidLossTimeout = item.getWarningTimeout() / multple;
					warningProgidLossEnabled = item.isWarningCheck();
					break;
				case SignalItem.PMT_LOSS:
					pmtLossTimeout = item.getSwitchTimeout() / multple;
					pmtLossEnabled = item.isCheck();
					warningPmtLossTimeout = item.getWarningTimeout() / multple;
					warningPmtLossEnabled = item.isWarningCheck();
					break;
				case SignalItem.VIDEO_LOSS:
					avLossTimeout = item.getSwitchTimeout() / multple;
					avLossEnabled = item.isCheck();
					warningAvLossTimeout = item.getWarningTimeout() / multple;
					warningAvLossEnabled = item.isWarningCheck();
					break;
				case SignalItem.CC_ERROR:
					ccErrorTimeout = item.getSwitchTimeout() / multple;
					ccErrorEnabled = item.isCheck();
					ccErrorCount = item.getParam();
					warningCcErrorTimeout = item.getWarningTimeout() / multple;
					warningCcErrorEnabled = item.isWarningCheck();
					warningCcErrorCount = item.getWarningParam();
					break;
				}
			}
		}
		return SUCCESS;	
	}

	public String save() {
		ArrayList<SignalItem> items = new ArrayList<>();
		items.add(new SignalItem(SignalItem.SIGNAL_BROKEN, signalBrokenEnabled, signalBrokenTimeout * multple, notifyInterval * 1000, 0,
				warningSignalBrokenEnabled, warningSignalBrokenTimeout * multple, 0));
		items.add(new SignalItem(SignalItem.PAT_LOSS, patLossEnabled, patLossTimeout * multple, notifyInterval * 1000, 0,
				warningPatLossEnabled, warningPatLossTimeout * multple, 0));
		items.add(new SignalItem(SignalItem.PROGID_LOSS, progidLossEnabled, progidLossTimeout * multple, notifyInterval * 1000, 0,
				warningProgidLossEnabled, warningProgidLossTimeout * multple, 0));
		items.add(new SignalItem(SignalItem.PMT_LOSS, pmtLossEnabled, pmtLossTimeout * multple, notifyInterval * 1000, 0,
				warningPmtLossEnabled, warningPmtLossTimeout * multple, 0));
		items.add(new SignalItem(SignalItem.VIDEO_LOSS, avLossEnabled, avLossTimeout * multple, notifyInterval * 1000, 0,
				warningAvLossEnabled, warningAvLossTimeout * multple, 0));
		items.add(new SignalItem(SignalItem.AUDIO_LOSS, avLossEnabled, avLossTimeout * multple, notifyInterval * 1000, 0,
				warningAvLossEnabled, warningAvLossTimeout * multple, 0));
		items.add(new SignalItem(SignalItem.CC_ERROR, ccErrorEnabled, ccErrorTimeout * multple, notifyInterval * 1000, ccErrorCount,
				warningCcErrorEnabled, warningCcErrorTimeout * multple, warningCcErrorCount));
		SourceSwitchCondition condition = new SourceSwitchCondition();
		condition.setSignalItems(items);
		SourceSwitchCondition old = sourceSignalSettingsService.getSettings();
		sourceSignalSettingsService.saveSettings(condition);
		if (isConditionsChanged(old.getSignalItems(), condition.getSignalItems())) {
			syncToAllServers(condition.getSignalItems());
		}
		return SUCCESS;
	}

	private boolean isConditionsChanged(List<SignalItem> oldList, List<SignalItem> newList) {
		if (newList == null) {
			return false;
		} else if (oldList == null || oldList.size() != newList.size()) {
			return true;
		} else {
			for (int i = 0, count = oldList.size(); i < count; i++) {
				if (!oldList.get(i).equals(newList.get(i)))
					return true;
			}
			return false;
		}
	}

	private void syncToAllServers(final List<SignalItem> items) {
		List<Server> serverList = new ArrayList<>();
		List<ServerGroup> groups = serverService.list(true);
		for (ServerGroup group : groups) {
			serverList.addAll(group.getServers());
		}

		// if server list is empty, do nothing.
		if (serverList.isEmpty()) {
			return;
		}

		// apply to every servers
		ExecutorService executor = Executors.newFixedThreadPool(Math.min(serverList.size(), 10));
		try {
			for (final Server server : serverList) {
				executor.execute(new Runnable() {

					@Override
					public void run() {
						remoteSignalSettingService.updateSignalSettings(server, items);
					}
				});
			}
		} finally {
			executor.shutdown();
		}
	}

}
