package com.arcsoft.commander.dao.record;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.record.EpgInfo;

/**
 * RecordInfo dao.
 * 
 * @author jt
 */
public interface EpgInfoDao {

	List<EpgInfo> list(QueryInfo info);

	EpgInfo get(Integer id);

	EpgInfo save(EpgInfo info);

	EpgInfo update(EpgInfo info);

	void delete(Integer id);


}
