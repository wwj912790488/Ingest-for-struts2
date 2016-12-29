package com.arcsoft.commander.action.record;

import com.arcsoft.commander.domain.record.FullTimeRecordInfo;
import com.arcsoft.commander.domain.record.RecordInfo;

/**
 * Task for add record task.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class AddRecordAction<T extends RecordInfo> extends BaseRecordAction<T> {

	/**
	 * Create new record task.
	 */
	protected abstract T createTask();

	@SuppressWarnings("unchecked")
	public String add() {
		preparePageData();
		if (task == null) {
			task = createTask();
			applyDefaultValues();
		} else if (task.getId() == null) {
			applyDefaultValues();
		} else {
			task = (T) recordInfoService.get(task.getId());
		}
		if (task.getThumbWidth() == null) {
			task.setThumbWidth(setting.getThumbWidth());
		}
		if (task.getThumbHeight() == null) {
			task.setThumbHeight(-1);
		}
		return SUCCESS;
	}

	private void applyDefaultValues() {
		task.setGenerateThumb(setting.getEnableThumb());
		task.setThumbWidth(setting.getThumbWidth());
		switch (task.getRecordType()) {
		case FULLTIME:
			task.setOutputPath(setting.getFulltimeFilePath());
			task.setFileName(setting.getFulltimeFileName());
			break;
		case SCHEDULE:
			task.setOutputPath(setting.getScheduleFilePath());
			task.setFileName(setting.getScheduleFileName());
			break;
		case EPG:
			task.setOutputPath(setting.getEpgFilePath());
			task.setFileName(setting.getEpgFileName());
			break;
		default:
			break;
		}
		if (task instanceof FullTimeRecordInfo) {
			((FullTimeRecordInfo) task).setKeepTimes(setting.getFulltimeKeepTimes());
		}
	}

	public abstract String save();

	public String list(){
		preparePageData();
		return  SUCCESS;
	}

}
