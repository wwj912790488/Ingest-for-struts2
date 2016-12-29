package com.arcsoft.commander.service.settings.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.commander.dao.settings.EthDao;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.service.settings.LocalEthService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * The implementation of LocalEthService
 * 
 * @author xpeng
 */
public class LocalEthServiceImpl implements LocalEthService {	

	private Logger log = Logger.getLogger(LocalEthServiceImpl.class);
	private EthDao ethDao;

	public void setEthDao(EthDao ethDao) {
		this.ethDao = ethDao;
	}

	@Override
	public List<Eth> getValidEths() throws ShellException, IOException {
		List<Eth> newEths = new ArrayList<>();
		List<Eth> eths = ethDao.findAllEths();
		if (eths != null && !eths.isEmpty()) {
			List<String> bonds = new ArrayList<>();
			for (Eth eth : eths) {
				if (eth.getIsbond())
					bonds.add(eth.getId());
			}
			for (Eth eth : eths) {
				if (eth.getMaster() == null || !bonds.contains(eth.getMaster()))
					newEths.add(eth);
			}
		}
		return newEths;
	}

	@Override
	public List<Eth> findAllEths() throws ShellException, IOException {
		return ethDao.findAllEths();
	}

	@Override
	public void updateEth(Eth eth) throws ShellException, IOException {
		ethDao.updateEth(eth);
	}

	private Eth getBackupEth(List<Eth> allEths, Eth srcEth){
		Eth ret = null;		
		if( srcEth.getMaster() != null ){
			for(Eth e : allEths){
				if(srcEth.getId().equals(e.getId()))
					continue;
				if(srcEth.getMaster().equals(e.getMaster())){
					ret = e;
					break;
				}
			}
		}		
		return ret;
	}
	
	private String getBondId(List<Eth> eths){		
		String ret = null;
		for (int i = 0; i < 16; i++) {
			ret = "bond" + i;
			boolean exist = false;
			for (Eth eth : eths) {
				if (eth.getId().equals(ret)) {
					exist = true;
					break;
				}
			}
			if (!exist)
				break;
		}
		return ret;
	}
	
	@Override
	public void bondAndUpdateEth(Eth eth, String slaveId)
			throws ShellException, IOException {		
		List<Eth> eths = ethDao.findAllEths();
		Eth eth1 = null;
		Eth eth2 = null;
		for(Eth theEth: eths){
			if(theEth.getId().equals(eth.getId())){
				eth1 = theEth;
			}
			if(slaveId != null && theEth.getId().equals(slaveId)){
				eth2 = theEth;
			}
		}
		if(eth1 == null || (slaveId != null && eth2 == null)){
			log.error("can not find the eth");
			throw new IOException("input parameter is error");
		}
		
		//the eth is already bonded.
		if(eth1.getMaster()!=null){
			Eth backEth = getBackupEth(eths, eth1);
			if(slaveId == null){
				Eth master = new Eth(eth1.getMaster());
				ethDao.bond(master, null);
				ethDao.updateEth(eth);
			}else{
				if(slaveId.equals(backEth.getId())){
					eth.setId(eth1.getMaster());
					eth.setIsbond(true);
					ethDao.updateEth(eth);
				}else{
					Eth master = new Eth(eth1.getMaster());
					ethDao.bond(master, null);
					String slaveId1 = eth.getId();
					eth.setId(getBondId(eths));
					ethDao.bond(eth, new String[]{slaveId1, slaveId});
				}
			}
		}else{
			if(slaveId == null){
				ethDao.updateEth(eth);
			}else{
				String slaveId1 = eth.getId();
				eth.setId(getBondId(eths));
				ethDao.bond(eth, new String[]{slaveId1, slaveId});
			}
		}
	}	

	@Override
	public int getEthUsedRate(String ethId) throws ShellException, IOException {
		return ethDao.getEthUsedRate(ethId);
	}

}
