package com.arcsoft.commander.service.record;
import com.arcsoft.commander.domain.record.EpgInfo;

import java.util.List;

/**
 * Record info service.
 * 
 * @author jt
 */
public interface EpgInfoService {

	EpgInfo get(int id);

	EpgInfo save(EpgInfo info);

	EpgInfo update(EpgInfo info);

	void delete(Integer id);

	EpgInfo findByChannelId(Integer channelId);

	List<EpgInfo> list();
}
