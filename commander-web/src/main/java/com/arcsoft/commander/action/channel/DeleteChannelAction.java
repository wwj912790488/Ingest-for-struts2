package com.arcsoft.commander.action.channel;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;

/**
 * Delete channel action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class DeleteChannelAction extends BaseChannelAction {

	private ActionResult result;
	private Integer[] ids;

	/**
	 * Set the channel ids to delete.
	 * 
	 * @param ids - the channel ids to delete
	 */
	public void setIds(Integer[] ids) {
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
			channelService.delete(ids);
			result = new ActionResult(true);
		} catch (Exception e) {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}

}
