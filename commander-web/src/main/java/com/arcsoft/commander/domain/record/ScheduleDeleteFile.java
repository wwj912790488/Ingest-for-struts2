package com.arcsoft.commander.domain.record;

import java.util.Date;

/**
 * Schedule delete file.
 * 
 * @author fjli
 */
public class ScheduleDeleteFile {

	private Long id;
	private String fileName;
	private Date deleteAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Date getDeleteAt() {
		return deleteAt;
	}

	public void setDeleteAt(Date deleteAt) {
		this.deleteAt = deleteAt;
	}

}
