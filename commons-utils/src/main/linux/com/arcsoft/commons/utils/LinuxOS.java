package com.arcsoft.commons.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commons.utils.OS;
import com.arcsoft.commons.utils.app.App;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Gathering OS information on linux system.
 * 
 * @author fjli
 */
class LinuxOS extends OS {

	/**
	 * Returns host name.
	 */
	public String getHostName() {
		return exec("hostname");
	}

	/**
	 * Returns processor id.
	 */
	public String getProcessorId() {
		String str = exec("dmidecode -t processor", "ID");
		if (str == null)
			return null;
		int i = str.indexOf("ID:");
		str = str.substring(i + 3);
		String[] arr = str.split(" ");
		str = "";
		for (i = arr.length - 1; i >= 0; i--) {
			str += arr[i];
		}
		return str;
	}

	/**
	 * Returns base board serial number.
	 */
	public String getBaseBoardId() {
		return exec("dmidecode -s baseboard-serial-number");
	}

	/**
	 * Returns system UUID.
	 */
	public String getSystemUUID() {
		return exec("dmidecode -s system-uuid");
	}

	/**
	 * Returns device name.
	 */
	public String getDeviceName() {
		return exec("dmidecode -s system-product-name");
	}

	/**
	 * Execute the given command.
	 * 
	 * @param cmd - the command to be executed.
	 * @param grep - the grep argument
	 * @return Returns the first not empty line, if the grep exists, it should match the value.
	 */
	private static String exec(String cmd, String... grep) {
		String filter = null;
		if (grep != null && grep.length > 0)
			filter = grep[0];
		Process p = null;

		if (filter == null){
			try {
				StringWriter out = new StringWriter(512);
				App.syncExec(null, cmd, out);
				if (out.toString().length() > 0) {
					String[] lines = out.getBuffer().toString().split("[\\r\\n]+");
					for (int i = 0; i < lines.length; i++) {
						String line = lines[i].trim();
						if (line.indexOf("#") != -1) {
							continue;
						}
						return line;
					}
				}
			}catch(ShellException e){

			}
		}

		try {
			p = Runtime.getRuntime().exec(cmd);
		} catch(IOException e) {
			return null;
		}
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line = null;
			while ((line = reader.readLine()) != null) {
				if (line.length() > 0) {
					if (filter != null && !line.contains(filter))
						continue;
					return line.trim();
				}
			}
		} catch (IOException e) {
			// ignore exception
		} finally {
			try {
				if (reader != null)
					reader.close();
			} catch (IOException e) {
			}
		}
		return null;
	}

}
