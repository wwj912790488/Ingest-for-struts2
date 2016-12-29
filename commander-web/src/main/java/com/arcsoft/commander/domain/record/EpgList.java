package com.arcsoft.commander.domain.record;

import java.util.List;

/**
 * EPG list.
 * 
 * @author fjli
 */
public class EpgList {

	private Integer id;
	private String name;
	private List<EpgItem> items;

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

	public List<EpgItem> getItems() {
		return items;
	}

	public void setItems(List<EpgItem> items) {
		this.items = items;
	}

}
