package com.arcsoft.commander.domain.security;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * @author hxiang
 * 
 */
@SuppressWarnings("serial")
public class Role implements Serializable{

	private Integer id;
	private String name;
	private Timestamp createTime;
	private Timestamp cancelTime;
	private String remarks;
	private boolean isEnabled;
	private Set<RoleOperator> roleOperators = new HashSet<RoleOperator>(0);
	private Set<Account> useres = new HashSet<Account>(0);
	private String resIds;
	/**
	 * @return the roleIds
	 */
	public String getResIds() {
		resIds = "";
		RoleOperator[] areses = roleOperators.toArray(new RoleOperator[]{});
		for (int i =0 ; i < areses.length;i++) {
			resIds += areses[i].getOperatorId();
			if(i != areses.length - 1)
				resIds += ",";
		}
		return resIds;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the createTime
	 */
	public Timestamp getCreateTime() {
		return createTime;
	}

	
	/**
	 * @param createTime the createTime to set
	 */
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	
	/**
	 * @return the cancelTime
	 */
	public Timestamp getCancelTime() {
		return cancelTime;
	}

	
	/**
	 * @param cancelTime the cancelTime to set
	 */
	public void setCancelTime(Timestamp cancelTime) {
		this.cancelTime = cancelTime;
	}

	
	/**
	 * @return the remarks
	 */
	public String getRemarks() {
		return remarks;
	}

	
	/**
	 * @param remarks the remarks to set
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	
	public boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Role other = (Role) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	
	/**
	 * @return the useres
	 */
	public Set<Account> getUseres() {
		return useres;
	}

	
	/**
	 * @param useres the useres to set
	 */
	public void setUseres(Set<Account> useres) {
		this.useres = useres;
	}

	
	/**
	 * @return the roleOperators
	 */
	public Set<RoleOperator> getRoleOperators() {
		return roleOperators;
	}

	
	/**
	 * @param roleOperators the roleOperators to set
	 */
	public void setRoleOperators(Set<RoleOperator> roleOperators) {
		this.roleOperators = roleOperators;
	}
	
	
}
