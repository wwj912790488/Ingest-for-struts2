package com.arcsoft.commander.dao.settings;

import java.util.Map;

import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * 
 * @author hxiang
 */
public interface StorageMountDao {
	
	public Map<String, String>getMounted() throws ShellException;

	public boolean mount(Storage s) throws ShellException;

	public boolean unmount(Storage s, boolean bRemoveFolder) throws ShellException;
}
