package com.arcsoft.commander.dao.settings.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.settings.StoragePersistenceDao;
import com.arcsoft.commander.domain.settings.Storage;

/**
 * 
 * @author hxiang
 */

public class StoragePersistenceDaoImplHibernate extends BaseHibernateDao implements StoragePersistenceDao {

	@Override
	public Storage get(Integer id) {
		return getHibernateTemplate().get(Storage.class, id);
	}

	@Override
	public Integer save(Storage storage) {
		getHibernateTemplate().save(storage);
		return storage.getId();
	}

	@Override
	public boolean update(Storage storage) {
		getHibernateTemplate().update(storage);
		return true;
	}

	@Override
	public void delete(Integer id) {
		Session session = getSession();
		try {
			Query query = session.createQuery("DELETE FROM Storage WHERE id=?");
			query.setInteger(0, id);
			query.executeUpdate();
		}  finally {
			releaseSession(session);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Storage> get() {
		return getHibernateTemplate().find("FROM Storage");
	}
}
