package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.DNS;

/**
 * Local DNS Service.
 * 
 * @author hxiang
 */
public interface LocalDNSService {

	List<DNS> getDnSList() throws Exception;

	void addDns(DNS dns) throws Exception;

	void deleteDns(DNS dns) throws Exception;

}
