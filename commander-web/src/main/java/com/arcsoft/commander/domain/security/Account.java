package com.arcsoft.commander.domain.security;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author hxiang
 * 
 */
public class Account implements Serializable{

	private static final long serialVersionUID = -2853120875401636832L;
	private Integer id;
	private String name;
	private String password;
	private String realName;
	private Timestamp registerTime;
	private Timestamp unRegisterTime;
	private String remarks;
	private boolean isEnabled;
	private Role role;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Timestamp getRegisterTime() {
		return registerTime;
	}

	public void setRegisterTime(Timestamp registerTime) {
		this.registerTime = registerTime;
	}

	public Timestamp getUnRegisterTime() {
		return unRegisterTime;
	}

	public void setUnRegisterTime(Timestamp unRegisterTime) {
		this.unRegisterTime = unRegisterTime;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}
