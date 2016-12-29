package com.arcsoft.commander.action.profile;

import com.arcsoft.util.errorcode.ErrorCode;
import com.arcsoft.web4transcoder.action.liveprofile.LiveProfileActionSupport;
import com.arcsoft.web4transcoder.exception.AppException;

@SuppressWarnings("serial")
public class DeleteLiveProfileAction extends LiveProfileActionSupport {

	private Integer liveProfileId = null;

	public void setLiveProfileId(Integer liveProfileId) {
		this.liveProfileId = liveProfileId;
	}

	public Integer getLiveProfileId() {
		return liveProfileId;
	}

	@Override
	public String execute() {
		try {
			if (liveProfileId != null)
				this.getLiveProfileService().deleteLiveProfile(liveProfileId);
		} catch (AppException e) {
			if (e.getErrorCode() == ErrorCode.ERR_LIVEPORFILE_REFERENCED_BY_AUTOMATION) {
				this.addActionMessage(getText("msg.profile_used_by_automation"));
			}
		} catch (Exception e) {
			return ERROR;
		}
		return SUCCESS;
	}

}
