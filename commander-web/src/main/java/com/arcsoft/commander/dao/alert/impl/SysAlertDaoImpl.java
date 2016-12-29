package com.arcsoft.commander.dao.alert.impl;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.alert.SysAlertDao;
import com.arcsoft.commander.domain.alert.SysAlert;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;

import java.util.Date;
import java.util.List;

/**
 * The implementation for AlertDao
 * 
 * @author xpeng
 * 
 */
public class SysAlertDaoImpl extends DatabaseDaoHibernateSupport<SysAlert, Integer> implements SysAlertDao {


    @Override
    public List<SysAlert> queryList(Date beginTime,Date endTime,int pageIndex,int pageSize) {
        String sql="from SysAlert s where s.createdAt >=:beginTime and s.createdAt <=:endTime";
        Query query=getSession().createQuery(sql);
        query.setParameter("beginTime",beginTime);
        query.setParameter("endTime",endTime);
        query.setFirstResult(pageIndex);
        query.setMaxResults(pageSize);
        List<SysAlert> list=query.list();
        return  list;
    }
}
