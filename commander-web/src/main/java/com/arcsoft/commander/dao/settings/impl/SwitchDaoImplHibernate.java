package com.arcsoft.commander.dao.settings.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.settings.SwitchDao;
import com.arcsoft.commander.domain.settings.Switch;

public class SwitchDaoImplHibernate extends BaseHibernateDao implements SwitchDao {

	@Override
	@SuppressWarnings("unchecked")
	public List<Switch> getSwitchList(String serverId) {
		return getHibernateTemplate().find("from Switch where serverId=?", serverId);
	}

	@Override
	public boolean save(String serverId, List<Switch> switchList) {
		Session session = getSession();
		try {
			if (switchList != null && !switchList.isEmpty()) {
				// delete
				String hql = "delete from Switch where id not in (";
				int rd = 0;
				for (Switch switchSetting : switchList) {
					if (switchSetting.getId() != null) {
						if (rd != 0)
							hql += ",";
						hql += switchSetting.getId();
						rd++;
					}
				}
				hql += ")";
				if (rd > 0) {
					Query query = session.createQuery(hql);
					query.executeUpdate();
				}

				// update
				for (Switch switchSetting : switchList) {
					getHibernateTemplate().saveOrUpdate(switchSetting);
				}
			} else {
				// delete all
				Query query = session.createQuery("delete from Switch where serverId=?");
				query.setString(0, serverId);
				query.executeUpdate();
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			releaseSession(session);
		}
		return false;
	}

}
