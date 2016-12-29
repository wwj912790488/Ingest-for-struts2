package com.arcsoft.commander.action.settings;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.action.server.ServerActionSupport;
import com.arcsoft.commander.action.settings.EthAction;
import com.arcsoft.commander.domain.settings.Eth;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;

public class EthActionTest extends ServerActionSupport<EthAction> {

	@Test
	public void testList() throws Exception {
		if (testContext.getConfig().getRunOnRHEL()) {
			request.setParameter("isLocal", Boolean.toString(true));
			request.setParameter("id", "1");

			ActionProxy proxy = getActionProxy("/listEth.action");
			String result = proxy.execute();
			EthAction action = (EthAction) proxy.getAction();
			assertEquals(Action.SUCCESS, result);

			List<Eth> eths = action.getEths();
			for (Eth eth : eths) {
				System.out.println("id = " + eth.getId());
				System.out.println("name = " + eth.getName());
				System.out.println("ip = " + eth.getIp());
			}
		}
	}
	
	@Test
	public void testGetUsedRate() throws Exception {
		if (testContext.getConfig().getRunOnRHEL()) {
			request.setParameter("isLocal", Boolean.toString(true));
			request.setParameter("ethIds", "eth0,eth1,eth2,eth3");

			ActionProxy proxy = getActionProxy("/refreshUsedRate.action");
			String result = proxy.execute();
			EthAction action = (EthAction) proxy.getAction();
			assertEquals(Action.SUCCESS, result);

			List<Integer> rates = action.getUsedRates();
			for (int rate : rates) {
				System.out.println("rate = " + rate);
				assertTrue(rate >= 0);
				assertTrue(rate < 100);
			}
		}
	}
	
	@Test
	public void testSave() throws Exception{
		if (testContext.getConfig().getRunOnRHEL()) {
			request.setParameter("isLocal", Boolean.toString(true));
			request.setParameter("index", "2");			
			request.setParameter("eth[2].isDHCP", Boolean.toString(false));
			request.setParameter("eth[2].ip", "192.168.0.222");
			request.setParameter("eth[2].mask", "255.255.255.0");
			request.setParameter("slaveId", "eth3");			
			
			ActionProxy proxy = getActionProxy("/saveEth.action");
			String result = proxy.execute();			
			assertEquals(Action.SUCCESS, result);
			
			request.setParameter("isLocal", Boolean.toString(true));
			request.setParameter("index", "2");			
			request.setParameter("eth[2].isDHCP", Boolean.toString(true));
			
			proxy = getActionProxy("/saveEth.action");
			result = proxy.execute();			
			assertEquals(Action.SUCCESS, result);
		}
	}

}