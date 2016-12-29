package com.arcsoft.commander.dao.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * @author hxiang
 * 
 */
public interface DnsDao {

	public abstract List<DNS> getDnsList() throws ShellException;

	public abstract void add(DNS dns) throws ShellException;

	public abstract void delete(DNS dns) throws ShellException;

}