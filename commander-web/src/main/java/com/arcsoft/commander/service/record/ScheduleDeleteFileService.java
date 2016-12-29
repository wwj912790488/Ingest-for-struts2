package com.arcsoft.commander.service.record;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.record.ScheduleDeleteFile;

/**
 * Schedule delete file service.
 * 
 * @author fjli
 */
public interface ScheduleDeleteFileService {

	List<ScheduleDeleteFile> list(QueryInfo info);

	void save(ScheduleDeleteFile file);

	void deleteAll(List<Long> ids);

}
