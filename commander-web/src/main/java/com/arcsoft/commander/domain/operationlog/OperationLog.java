package com.arcsoft.commander.domain.operationlog;

import java.io.Serializable;
import java.util.Date;

import com.arcsoft.util.DateTimeHelper;

/**
 * The class represent the operation log.
 * 
 * @author xpeng
 * 
 */

public class OperationLog implements Serializable {

	private static final long serialVersionUID = 18L;
	private Integer id;
	private String user;
	private String type;
	private String description;
	private Date createdAt;
	private Boolean hasAttachment;
	private String attachment;

	public OperationLog() {
	}

	/**
	 * NOTE: this construct is used on DAO.
	 */
	public OperationLog(Integer id, String user, String type, String description, Date createdAt, Boolean hasAttachment) {
		this.id = id;
		this.createdAt = createdAt;
		this.user = user;
		this.type = type;
		this.description = description;
		this.hasAttachment = hasAttachment;
	}

	public OperationLog(Date createdAt, String user, String type, String description) {
		this.createdAt = createdAt;
		this.user = user;
		this.type = type;
		this.description = description;
	}

	public OperationLog(String user, String type, String description) {
		this(DateTimeHelper.getNow(), user, type, description);
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Boolean isHasAttachment() {
		return hasAttachment;
	}

	public void setHasAttachment(Boolean hasAttachment) {
		this.hasAttachment = hasAttachment;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
		this.hasAttachment = (attachment != null);
	}

}
