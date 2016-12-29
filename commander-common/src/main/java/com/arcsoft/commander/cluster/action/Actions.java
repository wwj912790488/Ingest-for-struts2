package com.arcsoft.commander.cluster.action;

import com.arcsoft.cluster.message.Message;

/**
 * Define all actions between servers in cluster.
 * 
 * @author fjli
 */
public interface Actions {

	/**
	 * Message type for request.
	 */
	public static final int TYPE_REQUEST = Message.TYPE_MIN_USER + 1;

	/**
	 * Message type for response.
	 */
	public static final int TYPE_RESPONSE = Message.TYPE_MIN_USER + 2;

	/**
	 * This action used to get the server details.
	 */
	public static final int GET_AGENT_DESC = 0x00001001;

	/**
	 * This action used to tell the agent to add to the specified commander.
	 */
	public static final int ADD_AGENT = 0x00001002;

	/**
	 * This action used to tell the agent to remove from commander.
	 */
	public static final int REMOVE_AGENT = 0x00001003;

	/**
	 * This action used to report the agent error to the commander.
	 */
	public static final int ERROR_REPORT = 0x00001004;

	/**
	 * This action used to report the agent state to the commander.
	 */
	public static final int STATE_REPORT = 0x00001005;

	/**
	 * This action used to report the agent capabilities to the commander.
	 */
	public static final int CAPS_CHANGED = 0x00001006;

	/**
	 * This action used to bind the master and slave.
	 * (Commander => Master)
	 */
	public static final int GROUP_LIVE_BIND = 0x00002001;

	/**
	 * This action used to bind the specified slave to this master server.
	 * (Commander => Slave)
	 */
	public static final int LIVE_BIND = 0x00002003;

	/**
	 * This action used to unbind master and slave.
	 */
	public static final int LIVE_UNBIND = 0x00002004;

	/**
	 * This action used to notify role switch event to commander.
	 * (Master / Slave => Commander)
	 */
	public static final int LIVE_ROLE_SWITCH_EVENT = 0x00002005;

	/**
	 * This action used to switch role in 1+1 server.
	 */
	public static final int LIVE_SWITCH_ROLE = 0x00002006;

	/**
	 * This action used to list network.
	 */
	public static final int NETWORK_LIST = 0x00003001;

	/**
	 * This action used to get the network statistics
	 */
	public static final int NETWORK_STAT = 0x00003002;

	/**
	 * This action used to save network info.
	 */
	public static final int NETWORK_SAVE = 0x00003003;

	/**
	 * This action used to list dns.
	 */
	public static final int DNS_LIST = 0x00003004;

	/**
	 * This action used to add dns.
	 */
	public static final int DNS_ADD = 0x00003005;

	/**
	 * This action used to delete dns.
	 */
	public static final int DNS_DELETE = 0x00003006;

	/**
	 * This action used to list route.
	 */
	public static final int ROUTE_LIST = 0x00003007;

	/**
	 * This action used to add route.
	 */
	public static final int ROUTE_ADD = 0x00003008;

	/**
	 * This action used to delete route.
	 */
	public static final int ROUTE_DELETE = 0x00003009;

	/**
	 * This action used to list firewall rule.
	 */
	public static final int FIREWALL_LIST = 0x00003010;

	/**
	 * This action used to add firewall rule.
	 */
	public static final int FIREWALL_ADD = 0x00003011;

	/**
	 * This action used to delete firewall rule.
	 */
	public static final int FIREWALL_DELETE = 0x00003012;

	/**
	 * this action used to start firewall service.
	 */
	public static final int FIREWALL_START = 0x00003013;

	/**
	 * this action used to stop firewall service.
	 */
	public static final int FIREWALL_STOP = 0x00003014;

	/**
	 * This action used to get firewall status.
	 */
	public static final int FIREWALL_GET_STATUS = 0x00003015;

	/**
	 * This action used to reboot system.
	 */
	public static final int SYSTEM_REBOOT = 0x00003016;

	/**
	 * This action used to shutdown system.
	 */
	public static final int SYSTEM_SHUTDOWN = 0x00003017;

	/**
	 * This action used to set system's timezone
	 */
	public static final int SYSTEM_SET_TIMEZONE = 0x00003018;

	/**
	 * This action used to get system's timezone
	 */
	public static final int SYSTEM_GET_TIMEZONE = 0x00003019;

	/**
	 * This action used to set system's date and time
	 */
	public static final int SYSTEM_SET_TIME = 0x00003020;

	/**
	 * This action used to set system's timezone
	 */
	public static final int SYSTEM_GET_NTP = 0x00003021;

	/**
	 * This action used to bond or update eth
	 */
	public static final int NETWORK_BOND = 0x00003023;

	/**
	 * This action used to find local storage
	 */
	public static final int STORAGE_FIND = 0x00003024;

	/**
	 * This action used to add storage
	 */
	public static final int STORAGE_ADD = 0x00003025;

	/**
	 * This action used to delete storage
	 */
	public static final int STORAGE_DELETE = 0x00003026;

	/**
	 * This action used to mount storage
	 */
	public static final int STORAGE_MOUNT = 0x00003027;

	/**
	 * This action used to unmount storage
	 */
	public static final int STORAGE_UNMOUNT = 0x00003028;

	/**
	 * This action used to unmount storage
	 */
	public static final int STORAGE_FIND_REMOTE_MOUNTED = 0x00003029;

	/**
	 * This action used to change storage
	 */
	public static final int STORAGE_UPDATE = 0x00003030;

	/**
	 * This action used to list license information.
	 */
	public static final int LICENSE_LIST = 0x0003031;

	/**
	 * This action used to update license information.
	 */
	public static final int LICENSE_UPDATE = 0x0003032;

	/**
	 * This action used to update network input-output bindings.
	 */
	public static final int NIO_UPDATE = 0x00003033;

	/**
	 * This action used to list network input-output bindings.
	 */
	public static final int NIO_LIST = 0x00003034;

	/**
	 * This action used to start the specified task on the specified server.
	 */
	public static final int START_TASK = 0x00004001;

	/**
	 * This action used to stop the specified task on the specified server.
	 */
	public static final int STOP_TASK = 0x00004002;

	/**
	 * This action used to stop the specified task on the specified server.
	 */
	public static final int TASK_STATE_CHANGE = 0x00004003;

	/**
	 * This action used to get the progress of specified task on the specified server.
	 */
	public static final int GET_TASK_PROGRESS = 0x00004004;

	/**
	 * This action used to get the thumbnail of specified task on the specified server.
	 */
	public static final int GET_TASK_THUMBNAIL = 0x00004005;

	/**
	 * This action used to get the media info of specified media on the specified server.
	 */
	public static final int GET_MEDIA_INFO = 0x00004101;

	/**
	 * This action used to get the media thumb of specified media on the specified server.
	 */
	public static final int GET_MEDIA_THUMB = 0x00004102;

	/**
	 * This action used to switch the specified task source signal mode on the specified server.
	 * @deprecated unused, {@link UPDATE_TASK_INFO} instead.
	 */
	public static final int SWITCH_TASK_SOURCE_SIGNAL_MODE = 0x00004006;

	/**
	 * This action used to get the httpGroupSettingAccessor on the specified server.
	 */
	public static final int GET_TASK_HTTP_GROUP_SETTING_ACCESSOR = 0x00004007;

	/**
	 * This action used to update signal settings for all running tasks on the specified server.
	 */
	public static final int UPDATE_SIGNAL_SETTINGS = 0x00004008;

	/**
	 * This action used to update task info for the specified task.
	 */
	public static final int UPDATE_TASK_INFO = 0x00004009;

	/**
	 * This action used to notify commander to delete task.
	 */
	public static final int NOTIFY_DELETE_TASK = 0x0000400A;

	/**
	 * This action used to get SNMP settings.
	 */
	public static final int SNMP_GET = 0x00005001;

	/**
	 * This action used to save SNMP settings.
	 */
	public static final int SNMP_SAVE = 0x00005002;

	/**
	 * This action used to get alert message.
	 */
	public static final int ALERT_MESSAGE = 0x00006001;

	/**
	 * This action used to update aslog settings.
	 */
	public static final int GET_LOGGING_SETTING = 0x00007001;

	/**
	 * This action used to update aslog settings.
	 */
	public static final int UPDATE_LOGGING_SETTING = 0x00007002;

	/**
	 * This action used to update aslog settings.
	 */
	public static final int UPDATE_ASLOG = 0x00007003;

	/**
	 * This action used to get fault descrition
	 */
	public static final int FAULT_DESC_GET = 0x00008001;

	/**
	 * This action used to notify commander to add delete file schedule.
	 */
	public static final int ADD_DELETE_FILE_SCHEDULE = 0x00009001;

}
