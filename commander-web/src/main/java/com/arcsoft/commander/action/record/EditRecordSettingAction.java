package com.arcsoft.commander.action.record;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.record.RecordSetting;
import com.arcsoft.commander.service.record.RecordInfoService;

/**
 * Action for edit record setting.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class EditRecordSettingAction extends BaseAction {

	private RecordInfoService recordInfoService;
	private ActionResult result;
	private RecordSetting setting;

	public void setRecordInfoService(RecordInfoService recordInfoService) {
		this.recordInfoService = recordInfoService;
	}

	public ActionResult getResult() {
		return result;
	}

	public RecordSetting getSetting() {
		return setting;
	}

	public void setSetting(RecordSetting setting) {
		this.setting = setting;
	}

	public String edit() {
		setting = recordInfoService.getSetting();
		return SUCCESS;
	}

	public String update() {
		try {
			recordInfoService.saveSetting(setting);
			result = new ActionResult(true);
		} catch (Exception e) {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}



}
