package com.arcsoft.commander.dao.settings.impl;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commander.dao.settings.DnsDao;
import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commons.utils.app.App;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * 
 * Dns manager for centos
 * 
 * @author hxiang
 * 
 */
public class DnsDaoImplRHEL implements DnsDao {
	private static final String CONFIG_PATH = "/etc/resolv.conf";

	@Override
	public List<DNS> getDnsList() throws ShellException {
		ArrayList<DNS> ret = new ArrayList<DNS>();
		List<String> dnsList = App
				.runShell("awk '$1==\"nameserver\"{print $2}' " + CONFIG_PATH);
		for (String dns : dnsList)
			ret.add(new DNS(dns));
		return ret;
	}

	@Override
	public void add(DNS dns) throws ShellException {
		App.runShell("if [ -f "+CONFIG_PATH+" ]; then sed -i '/^nameserver \\{1,\\}" + dns.getIp() + "$/d' " + CONFIG_PATH + ";fi;");
		App.runShell("echo 'nameserver " + dns.toString() + "' >> "
				+ CONFIG_PATH);
	}

	@Override
	public void delete(DNS dns) throws ShellException {
		// remove the line have 'nameserver %1'
		App.runShell("if [ -f "+CONFIG_PATH+" ]; then sed -i '/^nameserver \\{1,\\}" + dns.getIp() + "$/d' " + CONFIG_PATH + ";fi;");
	}
}
