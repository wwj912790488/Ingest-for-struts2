package com.arcsoft.commander.action.security;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.security.Role;

/**
 * @author hxiang
 * 
 */
@SuppressWarnings("serial")
public class SecurityAction extends BaseSecurityAction implements PageControl {

	private String keyword;
	private Pager pager;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	@Override
	public Pager getPager() {
		return pager;
	}

	public String listUsers() {
		QueryInfo query = new QueryInfo();
		Condition condition = Condition.ne("name", "Admin");
		if (keyword != null && keyword.length() > 0) {
			keyword = keyword.trim();
			String likeKeyword = "%" + keyword + "%";
			QueryInfo roleQuery = new QueryInfo();
			roleQuery.setCondition(Condition.like("name", likeKeyword));
			List<Role> roles = roleService.list(roleQuery);
			List<Integer> roleIds = new ArrayList<>();
			if (roles != null && !roles.isEmpty()) {
				for (Role role : roles)
					roleIds.add(role.getId());
			}
			condition = Condition.and(
					condition,
					Condition.or(
							Condition.like("name", likeKeyword),
							Condition.like("realName", likeKeyword),
							Condition.like("remarks", likeKeyword),
							Condition.in("role.id", roleIds)
						)
				);
		}
		query.setCondition(condition);
		query.addSortOrder(SortOrder.asc("name"));
		pager = securityService.list(query, pager.getPageIndex(), pager.getPageSize());
		return SUCCESS;
	}

	public String forward() {
		return SUCCESS;
	}

}
