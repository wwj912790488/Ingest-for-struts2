package com.arcsoft.commander.domain.security;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


/**
 * 
 * @author ybzhang
 */
@XmlRootElement(name="modules")
public class ModuleList {

	private List<Module> modules;

	
	/**
	 * @return the modules
	 */
	@XmlElement(name="module")
	public List<Module> getModules() {
		return modules;
	}
	
	/**
	 * @param modules the modules to set
	 */
	public void setModules(List<Module> modules) {
		this.modules = modules;
	}
	
	public void addModule(Module module){
		if(modules == null)
			modules = new ArrayList<Module>();
		modules.add(module);
	}
}
