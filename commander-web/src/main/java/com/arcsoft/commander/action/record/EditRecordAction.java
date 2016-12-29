package com.arcsoft.commander.action.record;

import com.arcsoft.commander.domain.record.RecordInfo;

/**
 * Task for edit record task.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class EditRecordAction<T extends RecordInfo> extends BaseRecordAction<T> {

	@SuppressWarnings("unchecked")
	public String edit() {
		preparePageData();
		this.task = (T) recordInfoService.get(this.task.getId());
		return SUCCESS;
	}

	public abstract String update();

}
