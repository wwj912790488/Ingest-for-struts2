package com.arcsoft.commander.dao.security.impl;

import java.util.LinkedHashMap;
import java.util.Map;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.dao.security.UserDao;
import com.arcsoft.commander.domain.security.Account;

/**
 * The user dao implementation class.
 * 
 * @author hxiang
 */
public class UserDaoImpl extends DatabaseDaoHibernateSupport<Account, Integer> implements UserDao {

	@Override
	public Account findByName(String name) {
		return find(Condition.eq("name", name));
	}

	@Override
	public void deleteUser(Account user) {
		Map<String, Object> dataMap = new LinkedHashMap<>();
		dataMap.put("unRegisterTime", user.getUnRegisterTime());
		dataMap.put("isEnabled", Boolean.FALSE);
		update(dataMap, Condition.eq("id", user.getId()));
	}

	@Override
	public void updatePassword(int userId, String password) {
		Map<String, Object> dataMap = new LinkedHashMap<>();
		dataMap.put("password", password);
		update(dataMap, Condition.eq("id", userId));
	}

	@Override
	public void updateUser(int userId, int roleId, String realName, String remarks) {
		Map<String, Object> dataMap = new LinkedHashMap<>();
		dataMap.put("realName", realName);
		dataMap.put("remarks", remarks);
		dataMap.put("role.id", roleId);
		update(dataMap, Condition.eq("id", userId));
	}

}
