package com.arcsoft.commander.dao.system.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.domain.system.SystemSettingEntity;

/**
 * Implementation class for SystemDao.
 * 
 * @author fjli
 */
public class SystemDaoImpl extends BaseHibernateDao implements SystemDao {

	@Override
	public HashMap<String, String> getSettings() {
		HashMap<String, String> properites = new HashMap<String, String>();
		List<SystemSettingEntity> list = getHibernateTemplate().loadAll(SystemSettingEntity.class);
		for (SystemSettingEntity entity : list) {
			properites.put(entity.getKey(), entity.getValue());
		}
		return properites;
	}

	@Override
	public void saveSettings(HashMap<String, String> settings) {
		Set<String> keys = settings.keySet();
		for (String key : keys) {
			SystemSettingEntity entity = new SystemSettingEntity();
			entity.setKey(key);
			entity.setValue(settings.get(key));
			getHibernateTemplate().saveOrUpdate(entity);
		}
	}

	@Override
	public void remove(String key) {
		Session session = getSession();
		try {
			Query query = session.createQuery("delete from SystemSettingEntity where key=?");
			query.setString(0, key);
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public String getString(String key) {
		SystemSettingEntity entity = getHibernateTemplate().get(SystemSettingEntity.class, key);
		if (entity != null)
			return entity.getValue();
		return null;
	}

	@Override
	public void setString(String key, String value) {
		SystemSettingEntity entity = new SystemSettingEntity();
		entity.setKey(key);
		entity.setValue(value);
		getHibernateTemplate().saveOrUpdate(entity);
	}

	@Override
	public Integer getInteger(String key) {
		return StringHelper.toInteger(getString(key));
	}

	@Override
	public void setInteger(String key, Integer value) {
		setObject(key, value);
	}

	@Override
	public Long getLong(String key) {
		return StringHelper.toLong(getString(key));
	}

	@Override
	public void setLong(String key, Long value) {
		setObject(key, value);
	}

	@Override
	public Double getDouble(String key) {
		return StringHelper.toDouble(getString(key));
	}

	@Override
	public void setDouble(String key, Double value) {
		setObject(key, value);
	}

	@Override
	public Float getFloat(String key) {
		return StringHelper.toFloat(getString(key));
	}

	@Override
	public void setFloat(String key, Float value) {
		setObject(key, value);
	}

	@Override
	public Boolean getBoolean(String key) {
		return StringHelper.toBoolean(getString(key));
	}

	@Override
	public void setBoolean(String key, Boolean value) {
		setObject(key, value);
	}

	private void setObject(String key, Object value) {
		setString(key, StringHelper.toString(value));
	}

}
