package com.arcsoft.commander.service.cluster.fault;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

/**
 * FaultSession
 * @author wtsun
 */
public class FaultSession {

	private static Logger log = Logger.getLogger(FaultSession.class);
	private int timeout = 3000; // 3s
	private int interval = 3000; // 3s
	private String id;
	private String ip;
	private int port = 0;
	private int retry = 3; 
	private Thread thread;
	private boolean running = false;

	private List<FaultListener> listeners = new ArrayList<FaultListener>();

	public FaultSession(String id, String ip, int port, int retry) {
		this.id = id;
		this.ip = ip;
		this.port = port;
		this.retry = retry;
	}
	
	/**
	 * @return the ip
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @param ip the ip to set
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * Set the port.
	 * 
	 * @param port - the listen port.
	 */
	public void setPort(int port) {
		this.port = port;
	}

	/**
	 * Return the port.
	 */
	public int getPort() {
		return this.port;
	}

	/**
	 * @return the retry
	 */
	public int getRetry() {
		return retry;
	}

	/**
	 * @param retry the retry to set
	 */
	public void setRetry(int retry) {
		this.retry = retry;
	}

	/**
	 * Add heart beat session listener.
	 * 
	 * @param listener - the listener to be added
	 */
	public void addListener(FaultListener listener) {
		synchronized (listeners) {
			if (!listeners.contains(listener))
				listeners.add(listener);
		}
	}

	/**
	 * Remove heart beat session listener.
	 * 
	 * @param listener - the listener to be added
	 */
	public void removeListener(FaultListener listener) {
		synchronized (listeners) {
			listeners.remove(listener);
		}
	}

	/**
	 * Start the session.
	 * 
	 */
	public synchronized void start() throws IOException {
		// create thread to receive heart beat events.
		thread = new Thread() {
			public void run() {
				doEventLoop();
			};
		};
		running = true;
		thread.start();
		log.info("Fault session started.");
	}

	/**
	 * Stop the session.
	 */
	public synchronized void stop() {
		if (running == true) {
			running = false;
			
			// wait for thread to exit.
			if (thread.isAlive()) {
				try {
					thread.join();
				} catch (InterruptedException e) {
				}
			}
		}
		log.info("Fault session stopped.");
	}

	/**
	 * Notify session event.
	 * 
	 * @param event - the event to be notified.
	 */
	private void notifySessionEvent(FaultEvent event) {
		synchronized (listeners) {
			for (FaultListener listener : listeners) {
				listener.faultEventReceived(event);
			}
		}
	}

	private boolean checkAvaliable() {
		boolean status = false;
		Socket s = null;
		DataOutputStream writer = null;
		DataInputStream reader = null;
		try {
			SocketAddress sa = new InetSocketAddress(ip, port);
			s = new Socket();
			s.setSoTimeout(5000);
			s.setReuseAddress(true);
			s.setTcpNoDelay(true);
			s.connect(sa, timeout);
			
			// send data
			writer = new DataOutputStream(s.getOutputStream());  
			writer.writeByte(0x1A);
			writer.flush();
			
			// receive echo
			reader = new DataInputStream(s.getInputStream());
			if (reader.readByte() == (byte)0x1B)
				status = true;
			
			// send close event
			writer.writeByte(0x1C);
			writer.flush();			
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (writer != null)
					writer.close();
				if (reader != null)
					reader.close();
				if (s != null)
					s.close();
			}
			catch (IOException e) {
			}
		}
		return status;
	}
	
	private void doEventLoop() {
		int faultTimes = 0;
		boolean notify = false;
		while (running) {
			//log.info("Fault session: check avaliable start");
			if (checkAvaliable() == false) {
				log.info("Fault session: check avaliable failed times=" + faultTimes);
				if (++faultTimes > retry) {
					notify = true;
					break;
				}
			}
			
			// sleep
			try {
				Thread.sleep(interval);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		running = false;
		
		// notify fault event.
		if (notify == true) {
			notifySessionEvent(new FaultEvent(id));
		}
	}

}
