package com.arcsoft.commander.dao.record.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Projections;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.dao.hibernate.HibernateQueryHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.record.RecordInfoDao;
import com.arcsoft.commander.domain.record.RecordInfo;

/**
 * Record info dao.
 * 
 * @author fjli
 */
public class RecordInfoDaoImpl extends DatabaseDaoHibernateSupport<RecordInfo, Integer> implements RecordInfoDao {

	@Override
	public Pager list(QueryInfo info, int pageIndex, int pageSize) {
		Session session = this.getSession();
		try {
			Criteria criteria = HibernateQueryHelper.createCriteria(session, getEntityClass(), info.getCondition(), info.getSortOrders());
			long totalRows = ((Long) criteria.setProjection(Projections.rowCount()).uniqueResult()).longValue();
			criteria.setProjection(null);
			criteria.setResultTransformer(CriteriaSpecification.ROOT_ENTITY);
			criteria.setFirstResult((pageIndex - 1) * pageSize);
			criteria.setMaxResults(pageSize);
			List<?> result = criteria.list();
			return new Pager(pageIndex, pageSize, totalRows, result);
		} finally {
			this.releaseSession(session);
		}
	}

	@Override
	public void deleteSchedule(Integer id) {
		Session session = getSession();
		try {
			String hql = "update RecordInfo set schedule=null";
			Query query = HibernateQueryHelper.createQuery(session, hql, null, Condition.eq("id", id));
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public void delete(Integer id) {
		deleteAll(Condition.eq("id", id));
	}

	@Override
	public void deleteEpgItems(Integer id) {
		Session session = getSession();
		try {
			String hql = "delete from EpgItemRecordInfo";
			Query query = HibernateQueryHelper.createQuery(session, hql, null, Condition.eq("parent.id", id));
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}

}
