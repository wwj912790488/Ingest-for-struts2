package com.arcsoft.commander.service.settings.impl;

import java.util.List;

import com.arcsoft.commander.dao.settings.DnsDao;
import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commander.service.settings.LocalDNSService;

/**
 * The implementation of LocalDNSService.
 * 
 * @author hxiang
 */
public class LocalDNSServiceImpl implements LocalDNSService {

	private DnsDao dnsDao;

	public void setDnsDao(DnsDao dnsDao) {
		this.dnsDao = dnsDao;
	}

	@Override
	public List<DNS> getDnSList() throws Exception {
		return dnsDao.getDnsList();
	}

	@Override
	public void addDns(DNS dns) throws Exception {
		dnsDao.add(dns);
	}

	@Override
	public void deleteDns(DNS dns) throws Exception {
		dnsDao.delete(dns);
	}

}
