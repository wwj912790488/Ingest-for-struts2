package com.arcsoft.commander.domain.record;

import java.util.List;

/**
 * EPG list.
 * 
 * @author fjli
 */
public class WeeklyList {

	private Integer id;
	private String name;
	private List<WeeklyItem> items;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	 public String getName() {
	 	return name;
	 }

	 public void setName(String name) {
	 	this.name = name;
	 }

	 public List<WeeklyItem> getItems() {
	 	return items;
	 }

	 public void setItems(List<WeeklyItem> items) {
	 	this.items = items;
	 }

}
