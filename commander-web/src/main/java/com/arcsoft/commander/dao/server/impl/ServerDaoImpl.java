package com.arcsoft.commander.dao.server.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerCapabilities;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;

/**
 * The hibernate implementation for ServerDao.
 * 
 * @author fjli
 */
public class ServerDaoImpl extends BaseHibernateDao implements ServerDao {

	@Override
	@SuppressWarnings("unchecked")
	public List<Server> listAll() {
		return getHibernateTemplate().find("from Server");
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Server> getServersInGroup(Integer groupId) {
		return getHibernateTemplate().find("from Server where group.id=?", groupId);
	}

	@Override
	public Server getServer(String id) {
		return getHibernateTemplate().get(Server.class, id);
	}

	@Override
	public boolean isExistsServerName(String name) {
		List<?> list = getHibernateTemplate().find("from Server where name=?", name);
		return list.size() > 0;
	}

	@Override
	public void addServer(Server server) throws ObjectNotExistsException, ObjectAlreadyExistsException, NameExistsException {
		try {
			getHibernateTemplate().save(server);
			getHibernateTemplate().flush();
		} catch(DataIntegrityViolationException e) {
			Throwable t = e.getMostSpecificCause();
			String message = t.getMessage();
			if (message != null) {
				if (message.contains("server_name")) {
					throw new NameExistsException(server.getName());
				} else if (message.contains("group_id")) {
					throw new ObjectNotExistsException(server.getGroup());
				}
			}
			throw new ObjectAlreadyExistsException(server);
		}
	}

	@Override
	public void renameServer(Server server) throws ObjectNotExistsException, NameExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set name=? where id=?");
			query.setString(0, server.getName());
			query.setString(1, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		} catch(ConstraintViolationException e) {
			throw new NameExistsException(server.getName());
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public void updateState(Server server) throws ObjectNotExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set state=? where id=?");
			query.setInteger(0, server.getState());
			query.setString(1, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		}  finally {
			releaseSession(session);
		}
	}

	@Override
	public void updateAddress(Server server) throws ObjectNotExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set ip=?, port=? where id=?");
			query.setString(0, server.getIp());
			query.setInteger(1, server.getPort());
			query.setString(2, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		}  finally {
			releaseSession(session);
		}
	}

	@Override
	public void updateOnlineState(Server server) throws ObjectNotExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set alive=? where id=?");
			query.setBoolean(0, server.isAlive());
			query.setString(1, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		}  finally {
			releaseSession(session);
		}
	}

	@Override
	public void updateBackupFlag(Server server, boolean backupFlag) throws ObjectNotExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set backup=? where id=?");
			query.setBoolean(0, backupFlag);
			query.setString(1, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		}  finally {
			releaseSession(session);
		}
	}

	@Override
	public void updateServerCapabilities(Server server) throws ObjectNotExistsException {
		Session session = getSession();
		try {
			ServerCapabilities caps = server.getCapabilities();
			Query query = session.createQuery("update Server set capabilities.maxTasks=?,capabilities.maxOutputGroups=?,capabilities.maxSDCount=?,capabilities.maxHDCount=? where id=?");
			query.setInteger(0, caps.getMaxTasks());
			query.setInteger(1, caps.getMaxOutputGroups());
			query.setInteger(2, caps.getMaxSDCount());
			query.setInteger(3, caps.getMaxHDCount());
			query.setString(4, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public void updateFaultDisabled(Server server) throws ObjectNotExistsException {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set faultDisabled=? where id=?");
			query.setBoolean(0, server.isFaultDisabled());
			query.setString(1, server.getId());
			if (query.executeUpdate() < 1)
				throw new ObjectNotExistsException(server);
		}  finally {
			releaseSession(session);
		}		
	}

	@Override
	public void removeServer(Server server) {
		Session session = getSession();
		try {
			Query query = session.createQuery("delete from Server where id=?");
			query.setString(0, server.getId());
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public void resetServersStatus() {
		Session session = getSession();
		try {
			Query query = session.createQuery("update Server set alive=?");
			query.setBoolean(0, false);
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}

}
