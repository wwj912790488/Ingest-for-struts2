package com.arcsoft.commander.action.record;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.record.EpgInfo;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordSetting;
import com.arcsoft.commander.service.channel.ChannelService;
import com.arcsoft.commander.service.record.EpgInfoService;
import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.service.LiveProfileService;

/**
 * Base record info action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class BaseRecordAction<T extends RecordInfo> extends BaseAction {

	protected ActionResult result;
	protected T task;
	protected List<LiveProfile> profiles;
	protected List<Channel> channels;
	protected List<EpgInfo> epgInfos;
	protected ChannelService channelService;
	protected LiveProfileService liveProfileService;
	protected RecordInfoService recordInfoService;
	protected RecordSetting setting;
	protected EpgInfoService epgInfoService;

	public void setChannelService(ChannelService channelService) {
		this.channelService = channelService;
	}

	public void setLiveProfileService(LiveProfileService liveProfileService) {
		this.liveProfileService = liveProfileService;
	}

	public void setRecordInfoService(RecordInfoService recordInfoService) {
		this.recordInfoService = recordInfoService;
	}

	public ActionResult getResult() {
		return result;
	}

	public T getTask() {
		return task;
	}

	public void setTask(T task) {
		this.task = task;
	}

	public RecordSetting getSetting() {
		return setting;
	}

	public void setSetting(RecordSetting setting) {
		this.setting = setting;
	}

	public List<LiveProfile> getProfiles() {
		return profiles;
	}

	public List<Channel> getChannels() {
		return channels;
	}

	public EpgInfoService getEpgInfoService() {
		return epgInfoService;
	}

	public void setEpgInfoService(EpgInfoService epgInfoService) {
		this.epgInfoService = epgInfoService;
	}

	public List<EpgInfo> getEpgInfos() {
		return epgInfos;
	}

	public void setEpgInfos(List<EpgInfo> epgInfos) {
		this.epgInfos = epgInfos;
	}

	protected void preparePageData() {
		setting = recordInfoService.getSetting();
		profiles = liveProfileService.getAllLiveProfiles(false);
		QueryInfo query = new QueryInfo();
		query.addSortOrder(SortOrder.asc("name"));
		channels = channelService.list(query);
		epgInfos = epgInfoService.list();
	}

}
