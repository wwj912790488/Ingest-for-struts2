package com.arcsoft.commander.security.authentication;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.arcsoft.commander.domain.security.Account;

/**
 * @author hxiang
 * 
 */

@SuppressWarnings("serial")
public class CustomUserDetails implements UserDetails {
	private Account user;
	private List<SimpleGrantedAuthority> authoritys = new ArrayList<SimpleGrantedAuthority>();

	public CustomUserDetails(Account user) {
		this.user = user;
		//createAuthority(user);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {	
		return authoritys;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		
		return user.getName();
	}

	public String getRealName(){
		return user.getRealName();
	}
	
	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
		return user.getIsEnabled();
	}

	public Account getUser() {
		return user;
	}

	public void setUser(Account user) {
		this.user = user;
	}
	
	public void update(Account newUser){
		this.user.setIsEnabled(newUser.getIsEnabled());
		this.user.setName(newUser.getName());
		this.user.setPassword(newUser.getPassword());
		this.user.setRealName(newUser.getRealName());
		this.user.setRemarks(newUser.getRemarks());
		this.user.setRole(newUser.getRole());
		this.authoritys.clear();
		//createAuthority(user);
	}
}
