package com.arcsoft.commander.dao.task.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.domain.record.RecordTask;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.orm.dao.hibernate.HibernateQueryHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.dao.task.CustomTaskDao;
import com.arcsoft.commander.domain.task.TaskQueryParams;
import com.arcsoft.util.Pager;
import com.arcsoft.web4transcoder.dao.TaskDaoHibernate;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import com.arcsoft.web4transcoder.type.TaskStatus;


/**
 * 
 * @author zw
 */
public class CustomTaskDaoHibernateImpl extends TaskDaoHibernate implements CustomTaskDao {
	

	@SuppressWarnings("unchecked")
	@Override
	public List<Task> getTasksByCurServerIdAndStates(String curServerId, TaskStatus... status) {
		String[] statusArr = new String[status.length];
		for(int i = 0; i<status.length; i++){
			statusArr[i] = status[i].getKey().toLowerCase();
		}
		return getHibernateTemplate().findByNamedParam("from RecordTask t where t.curServerId = :serverId and t.state in (:status)",
				new String[]{"serverId", "status"}, new Object[]{curServerId, statusArr});
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Task> getTasksByCurServerId_RunningFLag(String curServerId, int runningFlag) {
		return getHibernateTemplate().find("from RecordTask t where t.curServerId = ? and t.runningFlag = ?",
				curServerId, runningFlag);
	}
	
	public void updateTasksCurServerId(String originalServerId, String newServerId) {
		String hql = "update RecordTask t set t.curServerId = ?  where t.curServerId = ? ";
		getHibernateTemplate().bulkUpdate(hql, new Object[]{newServerId, originalServerId});
	}

	@Override
	public void updateTasksStateByServerIdAndExceptStatus(final String serverId, final TaskStatus status, final TaskStatus... exceptStatus) {
		getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "update RecordTask t set t.state = :status where t.curServerId = :serverId";
				String[] statusArr = null;
				if(exceptStatus != null && exceptStatus.length > 0){
					hql += "  and t.state not in (:exceptStatus)";
					statusArr = new String[exceptStatus.length];
					//convert to lowercase
					for(int i = 0; i<exceptStatus.length; i++){
						statusArr[i] = exceptStatus[i].getKey().toLowerCase();
					}
				}
				Query query = session.createQuery(hql);
				query.setParameter("status", status.getKey().toLowerCase());
				query.setParameter("serverId", serverId);
				if(statusArr != null){
					query.setParameterList("exceptStatus", statusArr);
				}
				query.executeUpdate();
				return null;
			}
			
		});
	}

	@Override
	public void updateTaskProgress(final Task task) {
		getHibernateTemplate().execute(new HibernateCallback<Object>() {

			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				StringBuilder hql = new StringBuilder();
				List<Object> values = new ArrayList<>();
				if(task.getStartedAt() != null){
					hql.append(" t.startedAt = ?,");
					values.add(task.getStartedAt());
				}
				if(task.getCompletedAt() != null){
					hql.append(" t.completedAt = ?,");
					values.add(task.getCompletedAt());
				}
				if(task.getTranscodingDuration() != null){
					hql.append(" t.transcodingDuration = ?,");
					values.add(task.getTranscodingDuration());
				}
				if(task.getPostProcessingDuration() != null){
					hql.append(" t.postProcessingDuration = ?,");
					values.add(task.getPostProcessingDuration());
				}
				if(!StringHelper.isEmpty(task.getState())){
					hql.append(" t.state = ?,");
					values.add(task.getState().toLowerCase());
				}
				if(hql.length() > 0){
					
					hql.insert(0, "update Task t set");
					hql.delete(hql.length() - 1, hql.length()); //remove , symbol
					hql.append(" where t.id = ?");
					values.add(task.getId());
					
					Query query = session.createQuery(hql.toString());
					for(int i = 0; i<values.size(); i++){
						query.setParameter(i, values.get(i));
					}
					query.executeUpdate();
				}

				return null;
			}
		});
	}

	@Override
	public void updateTaskState(final int taskId, final TaskStatus status) {
		getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "update Task t set t.state = ? where t.id = ?";
				Query query = session.createQuery(hql);
				query.setParameter(0, status.getKey().toLowerCase());
				query.setParameter(1, taskId);
				query.executeUpdate();
				return null;
			}
			
		});
	}

	@Override
	public Pager findTasksByStateAndCurServerId(TaskStatus status, String curServerId, int pageIndex, int pageSize) {
		Session session = this.getSession();
		try{
			Criteria criteria = session.createCriteria(RecordTask.class);
			String state = status == null ? null : status.getKey().toLowerCase();
			if (state != null && state.trim().length() != 0) {
				criteria.add(Restrictions.eq("state", state));
			}
			if(!StringHelper.isEmpty(curServerId)){
				criteria.add(Restrictions.eq("curServerId", curServerId));
			}
			criteria.addOrder(Order.desc("id"));

			return find(criteria, pageIndex, pageSize);
		}catch(Exception e){
			throw e;
		}finally{
			this.releaseSession(session);
		}

	}

	@Override
	public Pager findTasks(TaskQueryParams params, int pageIndex, int pageSize) {
		Session session = getSession();
		try{
			Criteria criteria = session.createCriteria(RecordTask.class);
			if(params.getGroupId() != null){
				criteria.add(Restrictions.eq("groupId", params.getGroupId()));
			}
			if(!StringHelper.isEmpty(params.getServerId())){
				criteria.add(Restrictions.eq("curServerId", params.getServerId()));
			}
			if(!StringHelper.isEmpty(params.getStatus())){
				criteria.add(Restrictions.eq("state", params.getStatus().toLowerCase()));
			}
			if(!StringHelper.isEmpty(params.getName())){
				criteria.add(Restrictions.like("name", params.getName().trim(), MatchMode.ANYWHERE));
			}
			if(params.getTaskId() != null){
				criteria.add(Restrictions.eq("id", params.getTaskId()));
			}
			criteria.addOrder(Order.desc("id"));
			return find(criteria, pageIndex, pageSize);
		}catch(Exception e){
			throw e;
		}finally{
			releaseSession(session);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Task> getTasksByGroupId(Integer groupId, boolean allowNullOfServerId) {
		String hql = "from Task t where t.groupId = :groupId ";
		if(!allowNullOfServerId){
			hql += "and t.curServerId <> '' and t.curServerId is not null ";
		}
		return getHibernateTemplate().findByNamedParam(hql, "groupId", groupId);
	}

	@SuppressWarnings({"rawtypes" })
	@Override
	public long getTasksCountByGroupId(Integer groupId) {
		String hql = "select count(*) from Task t where t.groupId = :groupId";
		List results = getHibernateTemplate().findByNamedParam(hql, "groupId", groupId);
		return (long)results.get(0);
	}

	@Override
	public long getTasksCountByServerId(String serverId) {
		String hql = "select count(*) from Task t where t.curServerId = :serverId";
		@SuppressWarnings({"rawtypes"})
		List results = getHibernateTemplate().findByNamedParam(hql, "serverId", serverId);
		return (long)results.get(0);
	}

	@Override
	public long getTaskCountByStatus(TaskStatus... status) {
		String[] statusArr = new String[status.length];
		for (int i = 0; i < status.length; i++)
			statusArr[i] = status[i].getKey().toLowerCase();
		String hql = "select count(*) from Task t where t.state in (:status)";
		@SuppressWarnings("rawtypes")
		List results = getHibernateTemplate().findByNamedParam(hql, "status", statusArr);
		return (long) results.get(0);
	}

	@Override
	public Integer getTaskIdByHttpPublish(String container, String publish) {
		Session session = getSession();
		try {
			return HibernateQueryHelper.queryFirstRecord(session,
					"select a.outputGroupParentId from LiveOutputGroup a, HttpGroupSetting b where a.settingsId = b.id",
					Condition.and(
							Condition.eq("a.settingsType", OutputGroupSetting.SETTING_TYPE_HTTPSTREAMING),
							Condition.eq("a.outputGroupParentType", "Task"),
							Condition.eq("b.customUri", publish),
							Condition.eq("b.pathUri", container)
					),SortOrder.desc("a.settingsId"));
		} finally {
			releaseSession(session);
		}
	}	

	@Override
	public void updateTaskServer(final Integer taskId, final String serverId) {
		getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "update RecordTask t set t.curServerId = ? where t.id = ?";
				Query query = session.createQuery(hql);
				query.setParameter(0, serverId);
				query.setParameter(1, taskId);
				query.executeUpdate();
				return null;
			}
		});
	}

	@Override
	public Map<String, Long> getTasksCountGroupByServer(Integer groupId) {
		Map<String, Long> map = new LinkedHashMap<>();
		String hql = "select curServerId, count(*) from RecordTask where groupId=? and curServerId is not null group by curServerId";
		@SuppressWarnings("rawtypes")
		List results = getHibernateTemplate().find(hql, groupId);
		for (Object result : results) {
			Object[] rs = (Object[]) result;
			map.put((String) rs[0], (Long) rs[1]);
		}
		return map;
	}

	@Override
	public void deleteAll(Condition condition) {
		Session session = getSession();
		try {
			String hql = "delete from Task";
			// add Schedule Type
			Query query = HibernateQueryHelper.createQuery(session, hql, null, condition);
			query.executeUpdate();
		} finally {
			releaseSession(session);
		}
	}

}
