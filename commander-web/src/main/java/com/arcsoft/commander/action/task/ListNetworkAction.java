package com.arcsoft.commander.action.task;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.arcsoft.commander.dao.settings.EthType;
import com.arcsoft.commander.domain.server.NIO;
import com.arcsoft.commander.service.settings.NioService;
import com.arcsoft.web4transcoder.action.support.NetworkSelectorAction;
import com.opensymphony.xwork2.ActionSupport;

/**
 * List network action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ListNetworkAction extends ActionSupport implements NetworkSelectorAction {
	private NioService nioService;
	private String ethType;
	private Map<String, String> networks = new TreeMap<>();

	public void setNioService(NioService nioService) {
		this.nioService = nioService;
	}

	@Override
	public Map<String, String> getIfacesMap() {
		return networks;
	}

	@Override
	public void setEthType(String ethType) {
		this.ethType = ethType;
	}

	@Override
	public String execute() throws Exception {
		networks.clear();
		networks.put("", getText("common.default"));
		if (ETH_TYPE_INPUT.equalsIgnoreCase(ethType)) {
			try {
				List<NIO> nios = this.nioService.getNios();
				sortNioList(nios);
				for (NIO nio : nios) {
					if (nio.getType() == EthType.PRIMARY_INPUT || 
						nio.getType() == EthType.SECONDARY_INPUT)
					networks.put(String.valueOf(nio.getId()), nio.getName());
				}
			}
			catch (Exception e) {
				;
			}
		} else if (ETH_TYPE_OUTPUT.equalsIgnoreCase(ethType)) {
			try {
				List<NIO> nios = this.nioService.getNios();
				sortNioList(nios);
				for (NIO nio : nios) {
					if (nio.getType() == EthType.PRIMARY_OUTPUT || 
						nio.getType() == EthType.SECONDARY_OUTPUT)
					networks.put(String.valueOf(nio.getId()), nio.getName());
				}
			}
			catch (Exception e) {
				;
			}
		}
		return SUCCESS;
	}
	
	protected void sortNioList(List<NIO> nios){
		Collections.sort(nios, new Comparator<NIO>(){
			@Override
			public int compare(NIO o1, NIO o2) {
				return o1.getType().compareTo(o2.getType());
			}
			
		});
	}
}
