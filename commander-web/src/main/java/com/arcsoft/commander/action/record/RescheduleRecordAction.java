package com.arcsoft.commander.action.record;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.record.RecordInfo;

/**
 * Reschedule record action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class RescheduleRecordAction extends BaseRecordAction<RecordInfo> {

	private int[] ids;

	public void setIds(int[] ids) {
		this.ids = ids;
	}


	@Override
	public String execute() throws Exception {
		try {
		
			//recordInfoService.updateSchedule(task.getId());
		
			for (Integer id : ids) {
				recordInfoService.updateSchedule(id);
			}

			result = new ActionResult(true);
		} catch (Exception e) {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}

}
