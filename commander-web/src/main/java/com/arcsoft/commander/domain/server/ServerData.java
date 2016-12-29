package com.arcsoft.commander.domain.server;

/**
 * The server data info.
 * 
 * @author fjli
 */
public class ServerData<T> {

	private Server server;
	private T data;

	public ServerData(Server server, T data) {
		this.server = server;
		this.data = data;
	}

	public Server getServer() {
		return server;
	}

	public void setServer(Server server) {
		this.server = server;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

}
