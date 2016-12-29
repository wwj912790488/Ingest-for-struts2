package com.arcsoft.commander.dao.settings;


import static org.junit.Assert.*;

import java.io.IOException;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.arcsoft.commander.dao.settings.EthDao;
import com.arcsoft.commander.dao.settings.impl.EthDaoImplRHEL;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commons.utils.app.ShellException;

public class EthDaoTest {
	final boolean RUN_ON_RHEL = false;
	private EthDao ethDao;

	@Before
	public void setUp() {
		ethDao = new EthDaoImplRHEL();
	}

	@Test
	public void testFindAllEths() throws ShellException, IOException {
		if (RUN_ON_RHEL) {
			List<Eth> eths = ethDao.findAllEths();
			for(Eth eth : eths){
				System.out.println("id: " + eth.getId());
				System.out.println("ip: " + eth.getIp());
				System.out.println("speed: " + eth.getSpeed()); 
			}
			assertNotNull(eths);
			assertTrue(eths.size() > 0);
		}
	}

	@Test
	public void testUpdateEth() throws IOException, ShellException {
		if (RUN_ON_RHEL) {
			Eth oldEth = ethDao.findAllEths().get(0);

			// case: change name
			Eth eth = Eth.copy(oldEth);			
			String expectName = "new eth name";
			eth.setName(expectName);
			ethDao.updateEth(eth);
			Eth actual = ethDao.findAllEths().get(0);
			assertEquals(expectName, actual.getName());
			ethDao.updateEth(oldEth);

			// case: static, change ip, gateway, mask
			eth = Eth.copy(oldEth);		
			String expectIp = "172.17.186.91";
			String expectMask = "255.255.255.255";
			String expectGateWay = "172.17.160.1";
			eth.setIsDHCP(false);
			eth.setIp(expectIp);
			eth.setMask(expectMask);
			eth.setGateway(expectGateWay);
			ethDao.updateEth(eth);
			actual = ethDao.findAllEths().get(0);
			assertEquals(expectIp, actual.getIp());
			assertEquals(expectMask, actual.getMask());
			assertEquals(expectGateWay, actual.getGateway());
			ethDao.updateEth(oldEth);

			// case: DHCP
			eth = Eth.copy(oldEth);		
			eth.setIsDHCP(true);
			ethDao.updateEth(eth);
			actual = ethDao.findAllEths().get(0);
			assertEquals(true, actual.getIsDHCP());
			ethDao.updateEth(oldEth);
		}
	}
	
	@Test
	public void testGetEthUsedRate() throws ShellException, IOException {
		if (RUN_ON_RHEL) {
			Eth eth = ethDao.findAllEths().get(0);
			int usedRate = ethDao.getEthUsedRate(eth.getId());			
			assertTrue(usedRate >= 0);
			assertTrue(usedRate < 100);
		}
		
	}
	
	@Test
	public void testBond() throws IOException, ShellException{
		if(RUN_ON_RHEL){
			Eth master = new Eth("bond0");
			master.setIp("192.168.1.201");
			master.setMask("255.255.255.0");
			String[] slaves = new String[]{"eth2", "eth3"};			
			ethDao.bond(master, slaves);
			
			List<Eth> eths = ethDao.findAllEths();
			int bonds = 0;
			for(Eth eth:eths){
				if(eth.getIsbond()){
					bonds++;
				}				
			}			
			assertEquals(1, bonds);
			
			ethDao.bond(master, null);
			eths = ethDao.findAllEths();
			bonds = 0;
			for(Eth eth:eths){
				if(eth.getIsbond()){
					bonds++;
				}				
			}			
			assertEquals(0, bonds);
		}
		
	}

}
