package com.arcsoft.commander.domain.record;

import java.util.List;

/**
 * Epg record info.
 * 
 * @author fjli
 */
public class EpgRecordInfo extends RecordInfo {

	private List<EpgItemRecordInfo> epgItemRecordInfos;

	public EpgRecordInfo() {
		setRecordType(RecordType.EPG);
	}

	public List<EpgItemRecordInfo> getEpgItemRecordInfos() {
		return epgItemRecordInfos;
	}

	public void setEpgItemRecordInfos(List<EpgItemRecordInfo> epgItemRecordInfos) {
		this.epgItemRecordInfos = epgItemRecordInfos;
	}
}
