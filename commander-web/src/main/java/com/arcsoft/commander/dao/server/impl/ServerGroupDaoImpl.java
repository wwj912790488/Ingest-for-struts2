package com.arcsoft.commander.dao.server.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.server.ServerGroupDao;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;

/**
 * The implementation class for ServerGroupDao.
 * 
 * @author fjli
 */
public class ServerGroupDaoImpl extends BaseHibernateDao implements	ServerGroupDao {

	@Override
	@SuppressWarnings("unchecked")
	public List<ServerGroup> list() {
		return getHibernateTemplate().find("from ServerGroup");
	}

	@Override
	public void createGroup(ServerGroup group) throws NameExistsException {
		try {
			getHibernateTemplate().save(group);
			getHibernateTemplate().flush();
		} catch(DataIntegrityViolationException e) {
			throw new NameExistsException(group.getName());
		}
	}

	@Override
	public void deleteGroup(ServerGroup group) {
		getHibernateTemplate().delete(group);
	}

	@Override
	public void renameGroup(ServerGroup group) throws ObjectNotExistsException, NameExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update ServerGroup set name=? where id=?");
			query.setString(0, group.getName());
			query.setInteger(1, group.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(group);
		} catch(ConstraintViolationException e) {
			throw new NameExistsException(group.getName());
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public ServerGroup getGroup(Integer id) {
		return getHibernateTemplate().get(ServerGroup.class, id);
	}

	@Override
	public boolean isExistsGroupName(String name) {
		List<?> list = getHibernateTemplate().find("from ServerGroup where name=?", name);
		return list.size() > 0;
	}

}
