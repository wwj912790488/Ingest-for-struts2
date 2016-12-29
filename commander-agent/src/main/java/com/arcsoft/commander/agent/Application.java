package com.arcsoft.commander.agent;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.URL;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.arcsoft.arcvideo.common.utils.ConfigVarProperties;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.spring.utils.SpringPropertyConfigurer;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.util.SystemExecutor;

/**
 * The class represent the main application of agent side.
 * 
 * @author fjli
 */
public class Application {

	private static Logger log = Logger.getLogger(Application.class);
	private static final String DEFAULT_LOG4J = "config/log4j.properties";
	private static final String ARCVIDEO_HOME = "arcvideo.home";
	private static final int DEFAULT_COMMAND_PORT = 5001;
	private static AbstractApplicationContext context;
	private static MessageServer messageServer;
	private static int port;
	private static Map<String, MessageHandler> messageHandlers;

	public static void main(String[] args) {
		// setup log4j configuration.
		configureLog4j();

		// load application configuration.
		try {
			AppConfig.load();

			// set arcvideo.home path
			ConfigVarProperties appConfig = AppConfig.getConfig();
			String home = appConfig.getString(ARCVIDEO_HOME);
			if (StringHelper.isBlank(home)) {
				home = new File(System.getProperty("agent.home")).getParentFile().getAbsolutePath();
				appConfig.setString(ARCVIDEO_HOME, home);
			}
			SpringPropertyConfigurer.setAppConfig(appConfig);
		} catch(IOException e) {
			log.error("load agent configuration failed.", e);
			return;
		}

		// get command port
		port = AppConfig.getInt("command.port", DEFAULT_COMMAND_PORT);

		String command = (args.length > 0) ? args[0] : null;
		if ("start".equalsIgnoreCase(command)) {
			startAgent();
		} else {
			sendCommand(StringHelper.join(args, " "));
		}
	}

	/**
	 * Start agent.
	 */
	private static void startAgent() {
		// load transcoder configuration file.
		try {
			configureTranscoder();
		} catch (IOException e) {
			log.error("load transcoder configuration failed.", e);
			return;
		}

		// start spring container.
		context = new ClassPathXmlApplicationContext(new String[] {
				"classpath*:/config/core/macroVariableResolverBeans.xml",
				"classpath*:/config/core/factoryBeans.xml",
				"classpath*:/config/core/xmlParserBeans.xml",
				"classpath*:/config/spring_*.xml",
			});

		messageHandlers = context.getBeansOfType(MessageHandler.class);

		// start message server.
		messageServer = new MessageServer(port) {
			@Override
			protected void messageReceived(String message, PrintStream out) {
				commandReceived(message, out);
			}
		};
		try {
			messageServer.start();
		} catch (IOException e) {
			log.error("start message server failed.", e);
		}
	}

	/**
	 * Stop agent.
	 */
	private static void stopAgent() {
		if (context != null) {
			context.close();
			context = null;
		}
		if (messageServer != null) {
			messageServer.stop();
			messageServer = null;
		}
		// destroy system executor.
		SystemExecutor.destroy();
	}

	/**
	 * Configuration transcoder.
	 */
	private static void configureTranscoder() throws IOException {
		ConfigVarProperties transcoderConfig = new ConfigVarProperties(AppConfig.getConfig());
		transcoderConfig.loadFromFile(new File(AppConfig.getString("transcoder.config.file")));
		for (String name : transcoderConfig.stringPropertyNames()) {
			com.arcsoft.web4transcoder.AppConfig.setProperty(name, transcoderConfig.getString(name));
		}
	}

	/**
	 * Configuration log4j.
	 */
	private static void configureLog4j() {
		// setup log4j use the specified file.
		String log4jConfigFile = System.getProperty("agent.log4j");
		if (log4jConfigFile != null) {
			File file = new File(log4jConfigFile);
			if (file.exists()) {
				PropertyConfigurator.configureAndWatch(log4jConfigFile);
				return;
			}
		}

		// setup log4j using default configuration.
		URL url = Application.class.getClassLoader().getResource(DEFAULT_LOG4J);
		if (url != null) {
			PropertyConfigurator.configure(url);
		}
	}

	/**
	 * Send command to the message server.
	 * 
	 * @param command - the command to be sent
	 */
	private static void sendCommand(String command) {
		log.info("send command: " + command);
		Socket socket = new Socket();
		DataOutputStream dos = null;
		BufferedReader reader = null;
		try {
			socket.connect(new InetSocketAddress("127.0.0.1", port), 5000);
			socket.setSoTimeout(5000);
			dos = new DataOutputStream(socket.getOutputStream());
			dos.writeUTF(command);
			reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			String line = null;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}
		} catch (IOException e) {
			System.out.println("send command failed, please ensure the agent is started.");
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
				}
			}
			if (dos != null) {
				try {
					dos.close();
				} catch (IOException e) {
				}
			}
			try {
				socket.close();
			} catch (IOException e) {
			}
		}
	}

	/**
	 * Process received command.
	 * 
	 * @param command - the received command
	 */
	private static void commandReceived(String command, PrintStream out) {
		String[] args = command.split(" ");
		if ("stop".equalsIgnoreCase(args[0])) {
			stopAgent();
			out.println("OKAY");
		} else if ("help".equalsIgnoreCase(args[0])) {
			printUsage(out);
		} else {
			if (messageHandlers != null) {
				for (MessageHandler handler : messageHandlers.values()) {
					Map<String, String> commands = handler.getCommands();
					for (Entry<String, String> entry : commands.entrySet()) {
						String[] cmds = entry.getKey().split(" ");
						if (cmds[0].equalsIgnoreCase(args[0])) {
							handler.processCommand(args, out);
							return;
						}
					}
				}
			}
			printUsage(out);
		}
	}

	/**
	 * Print command usage.
	 */
	private static void printUsage(PrintStream out) {
		out.println("Commands:");
		out.println("=========================================================================");
		out.println(StringUtils.rightPad("help", 25) + "\t\tPrint the usage.");
		if (messageHandlers != null) {
			for (MessageHandler handler : messageHandlers.values()) {
				Map<String, String> commands = handler.getCommands();
				for (Entry<String, String> entry : commands.entrySet()) {
					out.println(StringUtils.rightPad(entry.getKey(), 25) + "\t\t" + entry.getValue());
				}
			}
		}
		out.println("=========================================================================");
	}

}
