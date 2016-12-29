package com.arcsoft.commander.action.record;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.arcvideo.web.struts.view.GroupGenerator;
import com.arcsoft.arcvideo.web.struts.view.GroupView;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.record.EpgItemRecordInfo;
import com.arcsoft.commander.service.record.RecordInfoService;

/**
 * Show EPG items.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ShowEpgItemRecordsAction extends BaseAction {

	private RecordInfoService recordInfoService;
	private Integer id;
	private GroupView<EpgItemRecordInfo> groupView;

	public void setRecordInfoService(RecordInfoService recordInfoService) {
		this.recordInfoService = recordInfoService;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public GroupView<EpgItemRecordInfo> getGroupView() {
		return groupView;
	}

	@SuppressWarnings("unchecked")
	public String execute() {
		QueryInfo info = new QueryInfo();
		info.setCondition(Condition.eq("parent.id", id));
		Pager pager = recordInfoService.list(info, 1, Integer.MAX_VALUE);
		groupView = new GroupView<>();
		groupView.setDataList(pager.getResult(), new GroupGenerator<EpgItemRecordInfo>() {

			@Override
			public Group<EpgItemRecordInfo> generate(EpgItemRecordInfo item) {
				String date = item.getSchedule().getStartDate().toString();
				return new Group<>(date, date);
			}
		});
		return SUCCESS;
	}

}
