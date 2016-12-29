package com.arcsoft.commander.action.profile;

import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.web4transcoder.action.liveprofile.LiveProfileActionSupport;
import com.arcsoft.web4transcoder.domain.LiveProfile;

@SuppressWarnings("serial")
public class ListLiveProfileAction extends LiveProfileActionSupport implements PageControl {

	private Logger log = Logger.getLogger(getClass());
	private List<LiveProfile> allLiveProfiles = null;
	private String filter = null;
	private Pager pager;

	@Override
	public Pager getPager() {
		if(pager == null){
			pager = new Pager();
		}
		return pager;
	}

	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public List<LiveProfile> getAllLiveProfiles() {
		return this.allLiveProfiles;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String execute() {
		try {
			if("1".equals(filter))
				pager = getLiveProfileService().getLiveProfiles(true, true, getPager().getPageIndex(), getPager().getPageSize());
			else if("2".equals(filter))
				pager = getLiveProfileService().getLiveProfiles(true, false, getPager().getPageIndex(), getPager().getPageSize());
			else
				pager = getLiveProfileService().getLiveProfiles(true, getPager().getPageIndex(), getPager().getPageSize());
			this.allLiveProfiles = (List<LiveProfile>) pager.getResult();
			this.totalRows = (int) pager.getTotalRows();
		} catch (Exception e) {
			log.error("List live profile action failed.", e);
		}
		return SUCCESS;
	}

}
