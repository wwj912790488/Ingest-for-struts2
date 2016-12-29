package com.arcsoft.commander.service.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.access.ConfigAttribute;

import com.arcsoft.commander.domain.security.ModuleList;
import com.arcsoft.commander.domain.security.Resource;
import com.arcsoft.commander.domain.security.Role;

/**
 * Resource service.
 * 
 * @author ybzhang
 */
public interface ResourceService {

	public ModuleList getModuleList();

	public List<Resource> getResources(Role role);

	public void loadResourceDefine();

	public Collection<ConfigAttribute> getAuth(String url);

}
