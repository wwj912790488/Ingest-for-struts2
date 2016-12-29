package com.arcsoft.commander.domain.record;

import java.util.Date;

/**
 * Epg program item.
 * 
 * @author fjli
 */
public class EpgItem {

	private EpgList epgList;
	private Integer id;
	private Date startTime;
	private Date endTime;
	private String name;

	public EpgList getEpgList() {
		return epgList;
	}

	public void setEpgList(EpgList epgList) {
		this.epgList = epgList;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
