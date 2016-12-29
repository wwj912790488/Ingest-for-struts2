package com.arcsoft.commander.domain.record;

/**
 * Fulltime record info.
 * 
 * @author fjli
 */
public class FullTimeRecordInfo extends RecordInfo {

	private Integer segmentLength;
	private Integer keepTimes;

	public FullTimeRecordInfo() {
		setRecordType(RecordType.FULLTIME);
	}

	public Integer getSegmentLength() {
		return segmentLength;
	}

	public void setSegmentLength(Integer segmentLength) {
		this.segmentLength = segmentLength;
	}

	public Integer getKeepTimes() {
		return keepTimes;
	}

	public void setKeepTimes(Integer keepTimes) {
		this.keepTimes = keepTimes;
	}

}
