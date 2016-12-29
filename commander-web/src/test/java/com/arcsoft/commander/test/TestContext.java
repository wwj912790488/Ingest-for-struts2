package com.arcsoft.commander.test;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.commons.utils.SystemHelper;

/**
 * Test context. This class will do some initial things before starting test
 * case, and get host configuration.
 * 
 * @author fjli
 */
public class TestContext {

	private static TestContext context = new TestContext();
	private Configuration config;
	private Host current;
	private Logger log;
	private Map<String, TestLiveAgent> agents = new HashMap<String, TestLiveAgent>();
	private String clusterIp;
	private int clusterPort;
	private String bindIp;

	/**
	 * Get test context.
	 */
	public static TestContext getContext() {
		return context;
	}

	/**
	 * Prevent other class to create it.
	 */
	private TestContext() {
		initLog4j();
		loadConfig();
	}

	/**
	 * Initialize log4j.
	 */
	private void initLog4j() {
		URL url = BaseSpringContextTests.class.getClassLoader().getResource("config/log4j.properties");
		PropertyConfigurator.configure(url);
		log = Logger.getLogger(TestContext.class);
	}

	/**
	 * Load configuration.
	 */
	private void loadConfig() {
		InputStream is = ClassLoader.getSystemResourceAsStream("config/testconfig.xml");
		try {
			if (is != null) {
				JAXBContext context = JAXBContext.newInstance(Configuration.class);
				Unmarshaller unmarshaller = context.createUnmarshaller();
				config = (Configuration) unmarshaller.unmarshal(is);
				log.info("test configurations loaded.");
			} else {
				config = new Configuration();
				log.warn("testconfig.xml not found, use default configuration.");
			}
		} catch (Exception e) {
			throw new RuntimeException("load test configuration failed.", e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
				}
			}
		}

		Host host = getCurrentHost();
		if (host == null) {
			clusterIp = "239.239.239.0";
			clusterPort = 8900;
			bindIp = NetworkHelper.getLocalIp();
			log.warn("This host has not configured in textconfig.xml.");
		} else {
			clusterIp = host.getIp();
			clusterPort = host.getPort();
			List<String> networks = host.getNetworks();
			if (networks.size() > 0 && networks.get(0) != null)
				bindIp = NetworkHelper.getHostAddressByMacAddr(networks.get(0));
			if (bindIp == null)
				bindIp = NetworkHelper.getLocalIp();
		}
		log.debug("clusterIp: " + clusterIp);
		log.debug("clusterPort: " + clusterPort);
		log.debug("bindIp: " + bindIp);
	}

	/**
	 * Get configuration.
	 */
	public Configuration getConfig() {
		return config;
	}

	/**
	 * Get current host settings.
	 */
	public Host getCurrentHost() {
		if (current == null) {
			String id = SystemHelper.os.getSystemUUID();
			for (Host host : config.getHosts()) {
				if (id.equals(host.getId())) {
					current = host;
					break;
				}
			}
		}
		return current;
	}

	/**
	 * Create test agent with the given id and port.
	 * 
	 * @param start - if true, start the agent
	 * @return the created agent.
	 */
	private TestLiveAgent createTestAgent(String id, int port, boolean start) {
		TestLiveAgent agent1 = createAgent(id, id, port);
		if (start) {
			try {
				agent1.start();
			} catch (IOException e) {
				throw new RuntimeException("start failed.", e);
			}
		}
		return agent1;
	}

	/**
	 * Create test agent 1.
	 * 
	 * @param start - if true, start the agent
	 * @return the created agent.
	 */
	public TestLiveAgent createAgent1(boolean start) {
		return createTestAgent("live1", 5001, start);
	}

	/**
	 * Create test agent 2.
	 * 
	 * @param start - if true, start the agent
	 * @return the created agent.
	 */
	public TestLiveAgent createAgent2(boolean start) {
		return createTestAgent("live2", 5002, start);
	}

	/**
	 * Create test agent 3.
	 * 
	 * @param start - if true, start the agent
	 * @return the created agent.
	 */
	public TestLiveAgent createAgent3(boolean start) {
		return createTestAgent("live3", 5003, start);
	}

	/**
	 * Create test agent 4.
	 * 
	 * @param start - if true, start the agent
	 * @return the created agent.
	 */
	public TestLiveAgent createAgent4(boolean start) {
		return createTestAgent("live4", 5004, start);
	}

	/**
	 * Create agent.
	 * 
	 * @param id - the id
	 * @param name - the agent name
	 * @param port - the service port
	 * @return the created agent.
	 */
	public TestLiveAgent createAgent(String id, String name, int port) {
		if (agents.containsKey(id))
			throw new RuntimeException("Agent already exist.");
		TestLiveAgentConfiguration conf = new TestLiveAgentConfiguration();
		conf.setBindAddr(bindIp);
		conf.setClusterIp(clusterIp);
		conf.setClusterPort(clusterPort);
		conf.setServerId(id);
		conf.setServerName(name);
		conf.setServerPort(port);
		TestLiveAgent agent = new TestLiveAgent(conf);
		agents.put(id, agent);
		return agent;
	}

	/**
	 * Stop and remove all created agents.
	 */
	public void removeAgents() {
		for (TestLiveAgent agent : agents.values()) {
			agent.stop();
		}
		agents.clear();
	}

}
