package com.arcsoft.commander.domain.security;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


/**
 * 
 * @author ybzhang
 */
@XmlRootElement(name="resources")
public class ResourceList {

	@XmlElement(name="resource")
	private List<Resource> resources;

	public ResourceList(){
		resources = new ArrayList<Resource>();
	}
	
	public void add(Resource resource){
		resources.add(resource);
    }
 
    public Iterator<Resource> iterator(){
        return resources.iterator();
    }
    
    public int size(){
    	return resources.size();
    }
}
