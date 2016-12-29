package com.arcsoft.commander.domain.record;

/**
 * Epg item record info.
 * 
 * @author fjli
 */
public class EpgItemRecordInfo extends RecordInfo {

	private EpgRecordInfo parent;

	public EpgItemRecordInfo() {
		setRecordType(RecordType.EPGITEM);
	}

	public EpgRecordInfo getParent() {
		return parent;
	}

	public void setParent(EpgRecordInfo parent) {
		this.parent = parent;
	}

}
