package com.arcsoft.commander.dao.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.Route;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * @author hxiang
 * 
 */
public interface RouteDao {

	public abstract List<Route> getRoutes() throws ShellException;

	public abstract void add(Route route) throws ShellException;

	public abstract void delete(Route route) throws ShellException;

}