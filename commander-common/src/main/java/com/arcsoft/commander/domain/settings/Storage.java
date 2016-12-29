package com.arcsoft.commander.domain.settings;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * 
 * @author Bing
 * 
 */
public class Storage{
	
	@XmlElement
	private Integer id;
	@XmlElement	
	private String name;
	@XmlElement
	private String path;
	@XmlElement
	private String type;
	@XmlElement
	private String user;
	@XmlElement
	private String pwd;
	private boolean mounted;

	public Storage() {
	}

	public Storage(int id, String name, String path, String user, String pwd) {
		this.id = id;
		this.name = name;
		this.path = path;
		this.user = user;
		this.pwd = pwd;
	}

	@XmlTransient
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@XmlTransient
	public String getName() {
		return name;
	}

	public void setName(String name) {
		if (name != null)
			this.name = name.trim();
	}

	@XmlTransient
	public String getPath() {
		return path;
	}

	@XmlTransient
	public String getUser() {
		return user;
	}

	public void setPath(String path) {
		if (path != null)
			path = path.trim().replace('\\', '/');
		this.path = path;
	}

	public void setUser(String user) {
		if (user != null)
			this.user = user.trim();
	}

	public void setPwd(String pwd) {
		if (pwd != null)
			this.pwd = pwd.trim();
	}

	@XmlTransient
	public String getPwd() {
		return pwd;
	}

	@XmlTransient
	public String getType() {
		return (type == null || type.length() == 0) ? "cifs" : type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isMounted() {
		return mounted;
	}

	public void setMounted(boolean mounted) {
		this.mounted = mounted;
	}

	public boolean equals(Storage storage) {
		return storage != null && id.equals(storage.getId()) && name.equals(storage.getName())
				&& path.equals(storage.getPath()) && user.equals(storage.getUser()) && pwd.equals(storage.getPwd())
				&& type.equals(storage.getType());
	}
}
