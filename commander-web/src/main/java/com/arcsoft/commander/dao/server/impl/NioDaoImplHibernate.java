package com.arcsoft.commander.dao.server.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.server.NioDao;
import com.arcsoft.commander.domain.server.NIO;

/**
 * 
 * @author wtsun
 */

public class NioDaoImplHibernate extends BaseHibernateDao implements NioDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<NIO> getNios() {
		return getHibernateTemplate().find("from NIO");
	}

	@Override
	public void updateNios(List<NIO> nios) {
		Session session = getSession();
		try {
			// delete
			if (nios != null && !nios.isEmpty()) {
				String hql = "delete from NIO where id not in (";
				int rd = 0;
				for (NIO nio : nios) {
					if (nio.getId() != null) {
						if (rd != 0)
							hql += ",";
						hql += nio.getId();
						rd ++;
					}
				}
				hql += ")";
				if (rd > 0) {
					Query query = session.createQuery(hql);
					query.executeUpdate();
				}
				
				// update
				for (NIO nio : nios) {
					getHibernateTemplate().saveOrUpdate(nio);
				}				
			}
			else {
				// delete all
				Query query = session.createQuery("delete from NIO");
				query.executeUpdate();
			}

		} finally {
			releaseSession(session);
		}
	}

	@Override
	public void deleteNios() {
		Session session = getSession();
		try {
			Query query = session.createQuery("delete from NIO");
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}
}
