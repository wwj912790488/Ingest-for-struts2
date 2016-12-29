package com.arcsoft.commander.dao.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.Storage;

/**
 * This service used to persist storage.
 * 
 * @author hxiang
 */

public interface StoragePersistenceDao {
	
	Storage get(Integer id);		
	Integer save(Storage storage);
	boolean update(Storage storage);
	void delete(Integer id);	
	public List<Storage> get();
}