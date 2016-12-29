package com.arcsoft.commander.action.preset;

import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.commander.action.PageControl;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.web4transcoder.action.output.PresetActionSupport;
import com.arcsoft.web4transcoder.domain.output.Preset;

@SuppressWarnings("serial")
public class ListPresetAction extends PresetActionSupport implements PageControl {

	private Logger logger = Logger.getLogger(ListPresetAction.class);
	private List<Preset> presets = null;
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

	public List<Preset> getPresets() {
		return this.presets;
	}

	@SuppressWarnings("unchecked")
	public String execute() {
		logger.info("ListPresetAction.execute.[ENTER]");
		try {
			pager = getPresetService().getPresets(getPager().getPageIndex(), getPager().getPageSize());
			this.presets = (List<Preset>) pager.getResult();
			this.totalRows = (int) pager.getTotalRows();
			logger.info("ListPresetAction.execute: " + pager.getTotalRows());
		} catch (Exception e) {
		}
		logger.info("ListPresetAction.execute.[EXIT]");
		return SUCCESS;
	}

}
