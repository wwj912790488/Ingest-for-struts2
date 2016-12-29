package com.arcsoft.commander.action.record;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.service.record.RecordInfoService;

/**
 * Delete channel action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class DeleteRecordAction extends BaseAction {

	private RecordInfoService recordInfoService;
	private ActionResult result;

	private int[] ids;

	public void setRecordInfoService(RecordInfoService recordInfoService) {
		this.recordInfoService = recordInfoService;
	}

	/**
	 * Set the channel ids to delete.
	 * 
	 * @param ids - the channel ids to delete
	 */
	public void setIds(int[] ids) {
		this.ids = ids;
	}

	public String getIds() {
		String sIds = "";
		for(int index = 0;index < ids.length;index++){
			if(index != 0){
				sIds+= ",";
			}
			sIds+= ids[index];
		}
		return sIds;
	}

	/**
	 * The result for delete action.
	 */
	public ActionResult getResult() {
		return result;
	}

	@Override
	public String execute() {
		try {
			for (Integer id : ids) {
				recordInfoService.delete(id);
			}
			result = new ActionResult(true);
		} catch (Exception e) {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}

}
