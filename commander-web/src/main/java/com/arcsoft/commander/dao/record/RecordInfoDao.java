package com.arcsoft.commander.dao.record;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.record.RecordInfo;

/**
 * RecordInfo dao.
 * 
 * @author fjli
 */
public interface RecordInfoDao {

	Pager list(QueryInfo info, int pageIndex, int pageSize);

	List<RecordInfo> list(QueryInfo info);

	RecordInfo get(Integer id);

	RecordInfo save(RecordInfo info);

	RecordInfo update(RecordInfo info);

	void deleteSchedule(Integer id);

	void delete(Integer id);

	void deleteEpgItems(Integer id);

}
