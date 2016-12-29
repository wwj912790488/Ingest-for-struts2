package com.arcsoft.commander.action.settings;

import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalDateTimeService;
import com.arcsoft.commander.service.settings.RemoteDateTimeService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Action for time setting.
 * 
 * @author xpeng
 */
@SuppressWarnings("serial")
public class TimeSettingAction extends BaseServerSettingAction {

	private LocalDateTimeService localDateTimeService;	
	private RemoteDateTimeService remoteDateTimeService;

	private NTPStatus ntpStatus;
	private String timezone;
	private String date;
	@SuppressWarnings("unused")
	private Time time;
	private HashMap<String, List<String>> zones;

	/**
	 * for json output, the result code
	 */
	private int code;
	/**
	 * for json output, the detail fail description.
	 */
	private String description;		

	public void setLocalDateTimeService(LocalDateTimeService localDateTimeService) {
		this.localDateTimeService = localDateTimeService;
	}

	public void setRemoteDateTimeService(RemoteDateTimeService remoteDateTimeService) {
		this.remoteDateTimeService = remoteDateTimeService;
	}

	public NTPStatus getNtpStatus() {
		return ntpStatus;
	}

	public void setNtpStatus(NTPStatus ntpStatus) {
		this.ntpStatus = ntpStatus;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}
	
	public String getTimezone(){
		return timezone;
	}	

	public void setDate(String date) {
		this.date = date;
	}
	
	public String getDate(){
		return date;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	public HashMap<String, List<String>> getZones() {
		return zones;
	}

	public int getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}

	@SuppressWarnings("unused")
	private void listZones() throws ShellException, IOException {
		zones = new HashMap<String, List<String>>();
		String[] mainZones = { 
				"Africa", 
				"America", 
				"Antarctica", 
				"Arctic",
				"Asia", 
				"Atlantic",
				"Australia", 
				"Europe", 
				"Indian",
				"Pacific" };
		for (String main : mainZones) {
			zones.put(main, localDateTimeService.listTimeZone(main));
			//test code
//			List<String>list = new ArrayList<String>();
//			list.add("Shanghai");
//			list.add("Tokyo");
//			zones.put(main, list);
		}
	}

	private void getTimeInfo() throws ShellException, IOException, ServerNotAvailableException, RemoteException {
		//test code
//		timezone = "Tokyo"; //getSubZone("Asia/Tokyo");
//		List<String> ntpServers = new ArrayList<String>();
//		ntpServers.add("172.17.186.90");
//		ntpServers.add("172.17.186.91");
//		ntpStatus = new NTPStatus(false, ntpServers);
		if (isLocal) {
			// get timezone
			//timezone = getSubZone(localDateTimeService.getTimezone());
			// get ntp servers
			ntpStatus = localDateTimeService.getNTPStatus();
		} else {
			Server agent = serverService.getServer(id);
			// get timezone
			//timezone = getSubZone(remoteDateTimeService.getTimezone(agent));
			// get ntp servers
			ntpStatus = remoteDateTimeService.getNTPStatus(agent);
		}
	}

	@SuppressWarnings("unused")
	private String getSubZone(String fullZone){
		if(fullZone != null){
			String[] array = fullZone.split("/");
			if(array.length > 1)
				return array[1];
		}
		return null;
	}

	@SuppressWarnings("unused")
	private String getFullZone(String subZone){
		Set<String> key = zones.keySet();
        for (Iterator<String> it = key.iterator(); it.hasNext();) {
            String main = (String) it.next();
            List<String> subs = zones.get(main);
            for(String sub : subs){
            	if(sub.equals(subZone)){
            		return main + "/" + sub;
            	}
            }
        }
        return null;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		try {
			//listZones();
			getTimeInfo();
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
			return ERROR;
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
			return ERROR;
		} catch (ServerNotAvailableException se) {
			addActionError(getText("msg.error.server.not.available"));
			return ERROR;
		} catch (RemoteException | ShellException | IOException e) {
			addActionError(getText("msg.error.server.setting.timezone"));
			return ERROR;
		}
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		try {			
			//listZones();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date real = null;
			if(date != null && date.length() > 0){
				 real = df.parse(date);
			}
			
			if (isLocal) {
				// save timezone
				//localDateTimeService.setTimezone(getFullZone(timezone));

				// set time
				if (ntpStatus.getIsServiceOn()) {
					localDateTimeService.syncWithNTP(ntpStatus);
				} else {
					localDateTimeService.syncWithNTP(ntpStatus);
					localDateTimeService.setSystemTime(real);
				}
			} else {
				Server agent = serverService.getServer(id);

				// save timezone
				//remoteDateTimeService.setTimeZone(agent, getFullZone(timezone));

				// set time
				remoteDateTimeService.setDateTime(agent, real, ntpStatus);				
			}
			this.code = 0;
			this.description = getText("msg.success.save");
		} catch (SystemNotInitializedException e) {
			this.code = -1;
			this.description = getText("system.not.initialized");
		} catch (AccessDeniedForSlaveException e) {
			this.code = -1;
			this.description = getText("system.slave.access.denied");
		} catch (ServerNotAvailableException se) {
			this.code = -1;
			this.description = getText("msg.error.server.not.available");
		} catch (RemoteException | ShellException | IOException | ParseException e) {
			this.code = -1;
			this.description = getText("msg.error.server.save.time");
		}
		return SUCCESS;
	}

}
