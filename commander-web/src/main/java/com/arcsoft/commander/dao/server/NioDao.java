package com.arcsoft.commander.dao.server;

import java.util.List;

import com.arcsoft.commander.domain.server.NIO;

/**
 * @author wtsun
 * 
 */
public interface NioDao {

	public abstract List<NIO> getNios();

	public abstract void updateNios(List<NIO> nios);

	public abstract void deleteNios();
}
