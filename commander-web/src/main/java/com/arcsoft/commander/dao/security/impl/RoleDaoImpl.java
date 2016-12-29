package com.arcsoft.commander.dao.security.impl;

import java.util.List;

import org.hibernate.Query;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.commander.dao.security.RoleDao;
import com.arcsoft.commander.domain.security.Role;


/**
 * The role dao implementation.
 * 
 * @author ybzhang
 */
public class RoleDaoImpl extends DatabaseDaoHibernateSupport<Role, Integer> implements RoleDao{

	@SuppressWarnings("unchecked")
	@Override
	public List<Role> listByOperatorID(int resID) {
		String hql = "select role from Role role left join role.roleOperators rr where rr.operatorId = " + resID;
		return getHibernateTemplate().find(hql);
	}

	@Override
	public void deleteOpertorsByRoleID(int roleID) {
		Query q = getSession().createQuery("delete RoleOperator where role.id=" + roleID); 
		q.executeUpdate();
	}

}
