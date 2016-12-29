package com.arcsoft.commander.action.security;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.security.Account;

/**
 * @author hxiang
 *
 */
@SuppressWarnings("serial")
public class UserAction extends BaseSecurityAction {
	private Account user;

	public Account getUser() {
		return user;
	}

	public void setUser(Account user) {
		this.user = user;
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String updateUser(){
		//securityService.updateAccount(user.getId(), user.getRole().getId(), user.getRealName(), user.getRemarks());
		Account oldUser = securityService.findAccount(user.getId());
		user.setName(oldUser.getName());
		user.setPassword(oldUser.getPassword());
		user.setRegisterTime(oldUser.getRegisterTime());
		user.setIsEnabled(oldUser.getIsEnabled());
		user.setUnRegisterTime(oldUser.getUnRegisterTime());
		securityService.updateAccount(user);
		return SUCCESS;
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String unRegisterUser(){
		securityService.unRegisterAccount(user);
		return SUCCESS;
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String addUser(){
		try{
			securityService.appendAccount(user);
		}catch(Exception e){
			this.addActionError(getText("msg.error.add.fail"));
		}
		
		return SUCCESS;
	}
	
	public void validateAddUser() {
		if (getFieldErrors().size() == 0) {
			Account account = securityService.findAccountByName(user.getName());
			if (account != null )
			{
				if (account.getIsEnabled())
					this.addFieldError("user.name",
							getText("security.error.userExisted"));
				else
					this.addFieldError("user.name",
						getText("security.error.userHasUnregistered"));
			}
		}
	}
}
