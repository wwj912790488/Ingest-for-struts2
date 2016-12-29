package com.arcsoft.commander.dao.security;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.security.Account;

/**
 * User account dao.
 * 
 * @author hxiang
 */
public interface UserDao {

	/**
	 * Query the account by list with the specified query information.
	 * 
	 * @param info - the query information
	 * @param pageIndex - the page index
	 * @param pageSize - the page size
	 * @return the accounts of the specified page.
	 */
	public Pager list(QueryInfo info, int pageIndex, int pageSize);

	/**
	 * Get all accounts matched the query information.
	 * 
	 * @param info - the query information
	 * @return all the matched accounts.
	 */
	public List<Account> list(QueryInfo info);

	/**
	 * Find the user account by login name.
	 * 
	 * @param name - the specified login name
	 * @return the user with the specified name, returns null if not found.
	 */
	public Account findByName(String name);

	/**
	 * Get the user by id.
	 * 
	 * @param userId - the user id
	 * @return the user with the specified id, returns null if not found.
	 */
	public Account get(Integer userId);

	/**
	 * Save the account.
	 * 
	 * @param user - the account to save
	 * @return the saved account.
	 */
	public Account save(Account user);

	/**
	 * Mark the account is deleted, and keep the record in database.
	 * 
	 * @param user - the user to delete
	 */
	public void deleteUser(Account user);

	/**
	 * Update the user information.
	 * 
	 * @param user - the user to update
	 * @return the updated user account.
	 */
	public Account update(Account user);

	/**
	 * Update the user information.
	 * 
	 * @param userId - the user id
	 * @param roleId - the role id
	 * @param realName - the real name
	 * @param remarks - the remarks
	 */
	public void updateUser(int userId, int roleId, String realName, String remarks);

	/**
	 * Change user password.
	 * 
	 * @param userId - the specified user
	 * @param password - the specified password
	 */
	public void updatePassword(int userId, String password);

}
