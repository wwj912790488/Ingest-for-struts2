package com.arcsoft.commander.action.system;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.domain.system.SystemSettings;
import com.arcsoft.commander.service.cluster.ClusterSearchType;
import com.arcsoft.commander.service.system.SystemService;
import com.arcsoft.commander.test.BaseStrutsTestCase;
import com.opensymphony.xwork2.ActionProxy;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Test case for system init actions.
 * 
 * @author fjli
 */
public class SysInitActionTest extends BaseStrutsTestCase<SysInitAction> {

	@Autowired
	private SystemService systemService;

	@Override
	protected String[] getModuleConfig() {
		return new String[] {
				"com/arcsoft/commander/action/system/struts_actions.xml",
				"com/arcsoft/commander/action/general/struts_actions.xml"
				};
	}

	private void clearSettings() {
		systemService.saveSettings(new SystemSettings());
	}

	@Test
	public void testInit() throws Exception {
		clearSettings();

		ActionProxy proxy = getActionProxy("/sysinit.action");
		assertNotNull(proxy);

		SysInitAction action = (SysInitAction) proxy.getAction();
		String result = proxy.execute();

		assertEquals(ActionSupport.SUCCESS, result);

		Map<Integer, String> clusterTypes = action.getClusterTypes();
		assertTrue(clusterTypes.containsKey(ClusterType.LIVE));

		Map<String, String> networks = action.getNetworks();
		assertFalse(networks.isEmpty());
		for (String ipAddr: networks.keySet()) {
			assertTrue(NetworkHelper.isIpAddress(ipAddr));
		}
	}

	@Test
	public void testSaveSuccess() throws Exception {
		clearSettings();

		request.setParameter("from", "sysinit");
		request.setParameter("settings.clusterIp", "239.8.8.1");
		request.setParameter("settings.clusterPort", "8901");
		request.setParameter("settings.clusterType", String.valueOf(ClusterType.CORE));
		request.setParameter("settings.bindAddr", NetworkHelper.getLocalIp());
		request.setParameter("settings.heartbeatInterval", String.valueOf(100));
		request.setParameter("settings.heartbeatTimeout", String.valueOf(2000));
		request.setParameter("settings.timeToLive", String.valueOf(1));
		request.setParameter("settings.clusterSearchType", String.valueOf(ClusterSearchType.SEARCH_BY_MULTICAST));

		ActionProxy proxy = getActionProxy("/syssave.action");
		assertNotNull(proxy);

		String result = proxy.execute();
		assertEquals(ActionSupport.SUCCESS, result);

		SysInitAction action = (SysInitAction) proxy.getAction();
		assertFalse(action.hasFieldErrors());
	}

	@Test
	public void testSaveNull() throws Exception {
		clearSettings();

		request.setParameter("from", "sysinit");

		ActionProxy proxy = getActionProxy("/syssave.action");
		assertNotNull(proxy);

		String result = proxy.execute();
		assertEquals(ActionSupport.INPUT, result);

		SysInitAction action = (SysInitAction) proxy.getAction();
		assertTrue(action.hasFieldErrors());

		Map<String, List<String>> fieldErrors = action.getFieldErrors();
		assertTrue(fieldErrors.containsKey("settings.clusterIp"));
		assertTrue(fieldErrors.containsKey("settings.clusterPort"));
		assertTrue(fieldErrors.containsKey("settings.clusterType"));
		assertTrue(fieldErrors.containsKey("settings.bindAddr"));
		assertTrue(fieldErrors.containsKey("settings.heartbeatInterval"));
		assertTrue(fieldErrors.containsKey("settings.heartbeatTimeout"));
		assertTrue(fieldErrors.containsKey("settings.timeToLive"));
		assertTrue(fieldErrors.containsKey("settings.clusterSearchType"));
	}

	@Test
	public void testSaveEmpty() throws Exception {
		clearSettings();

		request.setParameter("from", "sysinit");
		request.setParameter("settings.clusterIp", "");
		request.setParameter("settings.clusterPort", "");
		request.setParameter("settings.clusterType", "");
		request.setParameter("settings.bindAddr", "");

		ActionProxy proxy = getActionProxy("/syssave.action");
		assertNotNull(proxy);

		String result = proxy.execute();
		assertEquals(ActionSupport.INPUT, result);

		SysInitAction action = (SysInitAction) proxy.getAction();
		assertTrue(action.hasFieldErrors());

		Map<String, List<String>> fieldErrors = action.getFieldErrors();
		assertTrue(fieldErrors.containsKey("settings.clusterIp"));
		assertTrue(fieldErrors.containsKey("settings.clusterPort"));
		assertTrue(fieldErrors.containsKey("settings.clusterType"));
		assertTrue(fieldErrors.containsKey("settings.bindAddr"));
	}

	@Test
	public void testSaveInvalidData() throws Exception {
		clearSettings();

		request.setParameter("from", "sysinit");
		request.setParameter("settings.clusterIp", "invalid ip");
		request.setParameter("settings.clusterPort", "1024");
		request.setParameter("settings.clusterType", String.valueOf(ClusterType.CORE));
		request.setParameter("settings.bindAddr", NetworkHelper.getMacAddrByHostAddress(NetworkHelper.getLocalIp()));

		ActionProxy proxy = getActionProxy("/syssave.action");
		assertNotNull(proxy);

		String result = proxy.execute();
		assertEquals(ActionSupport.INPUT, result);

		SysInitAction action = (SysInitAction) proxy.getAction();
		assertTrue(action.hasFieldErrors());

		Map<String, List<String>> fieldErrors = action.getFieldErrors();
		assertTrue(fieldErrors.containsKey("settings.clusterIp"));
		assertTrue(fieldErrors.containsKey("settings.clusterPort"));
	}

}
