package com.arcsoft.commander.service.record;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordSetting;

/**
 * Record info service.
 * 
 * @author fjli
 */
public interface RecordInfoService {

	Pager list(QueryInfo info, int pageIndex, int pageSize);

	RecordInfo find(Long scheduleId);

	RecordInfo get(int id);

	RecordInfo save(RecordInfo info);

	RecordInfo update(RecordInfo info);

	void delete(Integer id);

	RecordSetting getSetting();

	void saveSetting(RecordSetting setting);

	void updateSchedule(Integer id);

}
