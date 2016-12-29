package com.arcsoft.commander.domain.security;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;


/**
 * 
 * @author ybzhang
 */
public class Operator {

	private String name;
	private int id;
	private List<Resource> resources = null;
	private Set<Role> roles = new HashSet<Role>();
	
	/**
	 * @return the name
	 */
	@XmlAttribute
	public String getName() {
		return name;
	}
	
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	
	/**
	 * @return the resources
	 */
	
	@XmlElement(name="resource")
	public List<Resource> getResources() {
		return resources;
	}

	
	/**
	 * @param resources the resources to set
	 */
	public void setResources(List<Resource> resources) {
		this.resources = resources;
	}
	
	public void addResource(Resource resource){
		if(resources == null)
			resources = new ArrayList<Resource>();
		resources.add(resource);
	}

	
	/**
	 * @return the id
	 */
	@XmlAttribute
	public int getId() {
		return id;
	}

	
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	
	/**
	 * @return the roles
	 */
	public Set<Role> getRoles() {
		return roles;
	}

	
	/**
	 * @param roles the roles to set
	 */
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
