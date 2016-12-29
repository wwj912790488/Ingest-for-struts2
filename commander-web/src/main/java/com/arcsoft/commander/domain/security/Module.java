package com.arcsoft.commander.domain.security;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;


/**
 * 
 * @author ybzhang
 */
public class Module {

	
	private String name;
	private List<Operator> operators = null; 
    
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
	 * @return the operators
	 */
    @XmlElement(name = "opertor")
	public List<Operator> getOperators() {
		return operators;
	}

	
	/**
	 * @param operators the operators to set
	 */
	public void setOperators(List<Operator> operators) {
		this.operators = operators;
	}
	
	public void addOpertaor(Operator operator){
		if(operators == null)
			operators = new ArrayList<Operator>();
		operators.add(operator);
	}
}
