package com.arcsoft.commander.dao.settings.impl;

import org.hibernate.Query;
import org.hibernate.Session;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.settings.IpmiDao;
import com.arcsoft.commander.domain.settings.IPMI;

public class IpmiDaoImplHibernate extends BaseHibernateDao implements IpmiDao {
	@Override
	public IPMI get(String id) {
		return getHibernateTemplate().get(IPMI.class, id);
	}

	@Override
	public boolean delete(String id) {
		Session session = getSession();
		try {
			Query query = session.createQuery("DELETE FROM IPMI WHERE id=?");
			query.setString(0, id);
			query.executeUpdate();
		}  finally {
			releaseSession(session);
		}
		return true;
	}

	@Override
	public boolean update(IPMI ipmi) {
		getHibernateTemplate().saveOrUpdate(ipmi);
		getHibernateTemplate().flush();
		return true;
	}
}
