package com.arcsoft.commander.dao.server.impl;

import org.hibernate.HibernateException;
import org.hibernate.Session;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.server.SwitchSyncDao;
import com.arcsoft.commander.domain.server.SwitchSync;

public class SwitchSyncDaoImplHibernate extends BaseHibernateDao implements SwitchSyncDao {

	@Override
	public void add(SwitchSync switchSync) {
		getHibernateTemplate().saveOrUpdate(switchSync);
		getHibernateTemplate().flush();
	}
	
	@Override
	public void del(SwitchSync switchSync) {
		getHibernateTemplate().delete(switchSync);
		getHibernateTemplate().flush();
	}

	@Override
	public boolean isExists(String serverId) {
		Session session = getSession();
		boolean exist = false;
		try {
			SwitchSync instance = (SwitchSync)session.get(SwitchSync.class, serverId);
			if (instance != null)
				exist = true;
		} catch(HibernateException e) {
		} finally {
			releaseSession(session);
		}
		return exist;
	}

}
