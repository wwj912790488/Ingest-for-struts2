package com.arcsoft.commander.action.security;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.security.Account;
/**
 * Action for change password
 * 
 * @author hxiang
 * 
 */
@SuppressWarnings("serial")
public class ChangePasswordAction extends BaseSecurityAction {
	private String newPassword;
	private String newPasswordConfirm;
	
	public Account getUser() {
		return user;
	}

	public void setUser(Account user) {
		this.user = user;
	}

	//for changing password by admin
	Account user;
	
	//for changing password by current login user
	private String oldPassword;

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getNewPasswordConfirm() {
		return newPasswordConfirm;
	}

	public void setNewPasswordConfirm(String newPasswordConfirm) {
		this.newPasswordConfirm = newPasswordConfirm;
	}

	public void validateChangePassword() {
		if (!getFieldErrors().containsKey("oldPassword")) {
			Account user = securityService.getLoginAccount();
			if (!user.getPassword().equals(oldPassword)) {
				this.addFieldError("oldPassword",
						getText("security.error.oldPasswordError"));
			}
		}
	}
	
	public String changePassword() {
		Account user = securityService.getLoginAccount();
		securityService.updateAccount(user, newPassword);
		return SUCCESS;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String changePasswordByAdmin(){
		securityService.updateAccount(user, newPassword);
		return SUCCESS;
	}
}
