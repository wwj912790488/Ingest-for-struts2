package com.arcsoft.commander.security.authentication;

import java.util.Collection;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Service;

import com.arcsoft.commander.service.security.ResourceService;


/**
 * 
 * @author ybzhang
 */
@Service
public class MyInvocationSecurityMetadataSourceService implements FilterInvocationSecurityMetadataSource {
	  
	private ResourceService resourceService;
	
	
	/**
	 * @param resourceService the resourceService to set
	 */
	public void setResourceService(ResourceService resourceService) {
		this.resourceService = resourceService;
	}
	
	 @Override  
	 public Collection<ConfigAttribute> getAllConfigAttributes() {  
		 return null;  
	 }  
	  
	 // 根据URL，找到相关的权限配置。  
	 @Override  
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {

		// object 是一个URL，被用户请求的url。
		FilterInvocation fi = (FilterInvocation) object;
		String url = fi.getRequestUrl();
		boolean isLocal = false;
		String strIsLocal = fi.getRequest().getParameter("isLocal");
		if (strIsLocal != null)
			isLocal = Boolean.valueOf(strIsLocal);
		if (isLocal)
			url = "/local" + url;
		return resourceService.getAuth(url);
	}  
	  
	 @Override  
	 public boolean supports(Class<?> arg0) {  
	  return true;  
	 }
}
