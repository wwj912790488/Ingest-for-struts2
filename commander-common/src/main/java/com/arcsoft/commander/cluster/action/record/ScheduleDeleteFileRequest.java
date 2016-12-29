package com.arcsoft.commander.cluster.action.record;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Notify commander to delete the specified file at the specified date.
 * 
 * @author fjli
 */
@XmlRootElement
public class ScheduleDeleteFileRequest extends BaseRequest {

	private String fileName;
	private Date deleteAt;

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
