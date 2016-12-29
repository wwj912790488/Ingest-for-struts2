package com.arcsoft.commander.service.security;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.security.Account;
import com.arcsoft.commander.security.authentication.CustomUserDetails;

/**
 * security service
 * 
 * @author hxiang
 *
 */
public interface SecurityService {

	public Pager list(QueryInfo info, int pageIndex, int pageSize);

	public List<Account> list(QueryInfo info);

	public List<Account> getAllLoginAccount();

	public Account getLoginAccount();

	public void updateAccount(Account user, String password);

	public void updateAccount(Account user);

	public void updateAccount(int userId, int roleId, String realName, String remarks);

	public void unRegisterAccount(Account user);

	public void appendAccount(Account user);

	public Account findAccountByName(String name);

	public Account findAccount(int userId);

	public void updateUserAuths(CustomUserDetails userDetail);

	public void synToMemory(int userId);

}
