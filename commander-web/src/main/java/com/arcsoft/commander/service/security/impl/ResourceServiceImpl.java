package com.arcsoft.commander.service.security.impl;

import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;

import com.arcsoft.commander.domain.security.Module;
import com.arcsoft.commander.domain.security.ModuleList;
import com.arcsoft.commander.domain.security.Operator;
import com.arcsoft.commander.domain.security.Resource;
import com.arcsoft.commander.domain.security.Role;
import com.arcsoft.commander.security.ServletContextWrapped;
import com.arcsoft.commander.service.security.ResourceService;
import com.arcsoft.commander.service.security.RoleService;
import com.arcsoft.commons.utils.ConvertUtil;


/**
 * Security resources management service.
 * 
 * @author ybzhang
 */
public class ResourceServiceImpl  implements ResourceService{

	private static Map<String, List<ConfigAttribute>> resourceMap = null;  

	private RoleService roleService;

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	@Override
	public void loadResourceDefine() {
		if (resourceMap != null) {
			resourceMap.clear();
		} else {
			resourceMap = new HashMap<String, List<ConfigAttribute>>();
		}
		String url = null;
		ModuleList moduleListList = getModuleList();
		if (moduleListList != null) {
			Iterator<Module> moduleIterator = moduleListList.getModules().iterator();
			while (moduleIterator.hasNext()) {
				Module module = moduleIterator.next();
				List<Operator> opList = module.getOperators();
				for (Operator operator : opList) {
					List<Resource> resList = operator.getResources();
					for (Resource resource : resList) {
						url = resource.getUrl();
						if (resourceMap.containsKey(url)) {
							resourceMap.remove(url);
						}
						List<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();
						atts.add(new SecurityConfig("ROLE_ADMIN"));
						atts.add(new SecurityConfig(resource.getKey()));
						String[] urls = url.split(",");
						for (String aurl : urls) {
							resourceMap.put(aurl, atts);
						}
					}
				}
			}
		}
		rereshApplication();
	}

	private void rereshApplication() {
		ServletContextWrapped.setResourceMap(resourceMap);
	}

	@Override
	public Collection<ConfigAttribute> getAuth(String url) {
		int firstQuestionMarkIndex = url.indexOf("?");
		if (firstQuestionMarkIndex != -1) {
			url = url.substring(0, firstQuestionMarkIndex);
		}
		if (!url.endsWith(".action"))
			url = url + ".action";
		Iterator<String> ite = resourceMap.keySet().iterator();
		while (ite.hasNext()) {
			String resURL = ite.next();
			if (resURL.equalsIgnoreCase(url)) {
				return resourceMap.get(resURL);
			}
		}
		return null;
	}

	@Override
	public ModuleList getModuleList() {
		ModuleList moduleList = null;
		URL url = getClass().getClassLoader().getResource("/resource/resource.xml");
		if (url != null)
			moduleList = (ModuleList) ConvertUtil.convert2Object(url, ModuleList.class);
		if (moduleList != null) {
			Iterator<Module> moduleIterator = moduleList.getModules().iterator();
			while (moduleIterator.hasNext()) {
				Module module = moduleIterator.next();
				for (Operator operator : module.getOperators()) {
					List<Role> roleList = roleService.listByResourceID(operator.getId());
					operator.getRoles().clear();
					for (Role role : roleList) {
						operator.getRoles().add(role);
					}
				}

			}
		}
		return moduleList;
	}

	@Override
	public List<Resource> getResources(Role role) {
		ModuleList moduleList = getModuleList();
		List<Resource> resultList = new ArrayList<Resource>();
		if (moduleList != null) {
			List<Module> modules = moduleList.getModules();
			for (Module module : modules) {
				List<Operator> operators = module.getOperators();
				for (Operator operator : operators) {
					if (operator.getRoles().contains(role)) {
						resultList.addAll(operator.getResources());
					}
				}
			}
		}
		return resultList;
	}

}
