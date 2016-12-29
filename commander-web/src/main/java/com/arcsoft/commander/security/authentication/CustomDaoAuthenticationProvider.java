package com.arcsoft.commander.security.authentication;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomDaoAuthenticationProvider extends DaoAuthenticationProvider implements Serializable {

	private static final long serialVersionUID = -1194016524228377756L;

	protected Authentication createSuccessAuthentication(Object principal, Authentication authentication,
            UserDetails user) {

    	CustomUsernamePasswordAuthenticationToken result = new CustomUsernamePasswordAuthenticationToken(principal,
                authentication.getCredentials(), user.getAuthorities());
        result.setDetails(authentication.getDetails());
        return result;
    }
    
    @SuppressWarnings("serial")
    private class CustomUsernamePasswordAuthenticationToken extends
    		UsernamePasswordAuthenticationToken {
    	private Collection<GrantedAuthority> authorities = null;
    	
    	@SuppressWarnings("unchecked")
    	public CustomUsernamePasswordAuthenticationToken(Object principal,
    			Object credentials,
    			Collection<? extends GrantedAuthority> authorities) {
    		super(principal, credentials, null);
    		this.authorities = (Collection<GrantedAuthority>) authorities;
    	}

    	public Collection<GrantedAuthority> getAuthorities() {
            return authorities;
        }
       
    }
}
