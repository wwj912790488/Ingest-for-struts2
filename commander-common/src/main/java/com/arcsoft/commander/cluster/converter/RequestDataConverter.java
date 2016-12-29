package com.arcsoft.commander.cluster.converter;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.cluster.action.alert.AlertMessageRequest;
import com.arcsoft.commander.cluster.action.fault.GetFaultDescRequest;
import com.arcsoft.commander.cluster.action.logging.GetLoggingSettingRequest;
import com.arcsoft.commander.cluster.action.logging.UpdateASLogRequest;
import com.arcsoft.commander.cluster.action.logging.UpdateLoggingSettingRequest;
import com.arcsoft.commander.cluster.action.record.ScheduleDeleteFileRequest;
import com.arcsoft.commander.cluster.action.server.AddAgentRequest;
import com.arcsoft.commander.cluster.action.server.BindRequest;
import com.arcsoft.commander.cluster.action.server.CapabilitiesChangedRequest;
import com.arcsoft.commander.cluster.action.server.ErrorReportRequest;
import com.arcsoft.commander.cluster.action.server.GetAgentDescRequest;
import com.arcsoft.commander.cluster.action.server.GroupBindRequest;
import com.arcsoft.commander.cluster.action.server.LiveRoleSwitchRequest;
import com.arcsoft.commander.cluster.action.server.RemoveAgentRequest;
import com.arcsoft.commander.cluster.action.server.StateReportRequest;
import com.arcsoft.commander.cluster.action.server.SwitchRoleRequest;
import com.arcsoft.commander.cluster.action.server.UnbindRequest;
import com.arcsoft.commander.cluster.action.settings.host.RebootRequest;
import com.arcsoft.commander.cluster.action.settings.host.ShutdownRequest;
import com.arcsoft.commander.cluster.action.settings.license.ListLicenseRequest;
import com.arcsoft.commander.cluster.action.settings.license.UpdateLicenseRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.BondAndUpdateEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.GetFirewallStatusRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListNioBindingRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.StartFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.StatEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.StopFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.UpdateNioBindingRequest;
import com.arcsoft.commander.cluster.action.settings.storage.AddStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.DeleteStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.FindRemoteMountedStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.FindStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.MountStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.UnmountStorageRequest;
import com.arcsoft.commander.cluster.action.settings.storage.UpdateStorageRequest;
import com.arcsoft.commander.cluster.action.settings.time.GetNTPRequest;
import com.arcsoft.commander.cluster.action.settings.time.GetTimeZoneRequest;
import com.arcsoft.commander.cluster.action.settings.time.SetDateTimeRequest;
import com.arcsoft.commander.cluster.action.settings.time.SetTimeZoneRequest;
import com.arcsoft.commander.cluster.action.snmp.GetSnmpRequest;
import com.arcsoft.commander.cluster.action.snmp.SaveSnmpRequest;
import com.arcsoft.commander.cluster.action.task.DeleteTaskRequest;
import com.arcsoft.commander.cluster.action.task.GetHttpGroupSettingAccessorRequest;
import com.arcsoft.commander.cluster.action.task.GetMediaInfoRequest;
import com.arcsoft.commander.cluster.action.task.GetMediaThumbRequest;
import com.arcsoft.commander.cluster.action.task.GetTaskProgressRequest;
import com.arcsoft.commander.cluster.action.task.GetTaskThumbnailRequest;
import com.arcsoft.commander.cluster.action.task.StartTaskRequest;
import com.arcsoft.commander.cluster.action.task.StateChangeRequest;
import com.arcsoft.commander.cluster.action.task.StopTaskRequest;
import com.arcsoft.commander.cluster.action.task.UpdateSignalSettingRequest;
import com.arcsoft.commander.cluster.action.task.UpdateTaskInfoRequest;

/**
 * Converter between request and data package.
 * 
 * @author fjli
 */
public class RequestDataConverter extends XmlDataConverter<BaseRequest> {

	/**
	 * Construct new request data converter.
	 */
	public RequestDataConverter() {
		mapping(Actions.GET_AGENT_DESC, GetAgentDescRequest.class);
		mapping(Actions.ADD_AGENT, AddAgentRequest.class);
		mapping(Actions.REMOVE_AGENT, RemoveAgentRequest.class);
		mapping(Actions.ERROR_REPORT, ErrorReportRequest.class);
		mapping(Actions.STATE_REPORT, StateReportRequest.class);
		mapping(Actions.CAPS_CHANGED, CapabilitiesChangedRequest.class);
		mapping(Actions.GROUP_LIVE_BIND, GroupBindRequest.class);
		mapping(Actions.LIVE_BIND, BindRequest.class);
		mapping(Actions.LIVE_UNBIND, UnbindRequest.class);
		mapping(Actions.LIVE_ROLE_SWITCH_EVENT, LiveRoleSwitchRequest.class);
		mapping(Actions.LIVE_SWITCH_ROLE, SwitchRoleRequest.class);
		mapping(Actions.NETWORK_LIST, ListEthRequest.class);
		mapping(Actions.NETWORK_LIST, ListEthRequest.class);
		mapping(Actions.NETWORK_STAT, StatEthRequest.class);
		mapping(Actions.NETWORK_SAVE, SaveEthRequest.class);
		mapping(Actions.NETWORK_BOND, BondAndUpdateEthRequest.class);
		mapping(Actions.DNS_LIST, ListDNSRequest.class);
		mapping(Actions.DNS_ADD, AddDNSRequest.class);
		mapping(Actions.DNS_DELETE, DeleteDNSRequest.class);
		mapping(Actions.ROUTE_LIST, ListRouteRequest.class);
		mapping(Actions.ROUTE_ADD, AddRouteRequest.class);
		mapping(Actions.ROUTE_DELETE, DeleteRouteRequest.class);
		mapping(Actions.FIREWALL_LIST, ListFirewallRequest.class);
		mapping(Actions.FIREWALL_ADD, AddFirewallRequest.class);
		mapping(Actions.FIREWALL_DELETE, DeleteFirewallRequest.class);
		mapping(Actions.FIREWALL_START,	StartFirewallRequest.class);
		mapping(Actions.FIREWALL_STOP, StopFirewallRequest.class);
		mapping(Actions.FIREWALL_GET_STATUS, GetFirewallStatusRequest.class);
		mapping(Actions.SYSTEM_REBOOT, RebootRequest.class);
		mapping(Actions.SYSTEM_SHUTDOWN, ShutdownRequest.class);
		mapping(Actions.SYSTEM_SET_TIMEZONE, SetTimeZoneRequest.class);
		mapping(Actions.SYSTEM_GET_TIMEZONE, GetTimeZoneRequest.class);
		mapping(Actions.SYSTEM_SET_TIME, SetDateTimeRequest.class);
		mapping(Actions.SYSTEM_GET_NTP, GetNTPRequest.class);
		mapping(Actions.STORAGE_ADD, AddStorageRequest.class);
		mapping(Actions.STORAGE_DELETE, DeleteStorageRequest.class);
		mapping(Actions.STORAGE_MOUNT, MountStorageRequest.class);
		mapping(Actions.STORAGE_UNMOUNT, UnmountStorageRequest.class);
		mapping(Actions.STORAGE_FIND, FindStorageRequest.class);
		mapping(Actions.STORAGE_UPDATE, UpdateStorageRequest.class);
		mapping(Actions.STORAGE_FIND_REMOTE_MOUNTED, FindRemoteMountedStorageRequest.class);
		mapping(Actions.LICENSE_LIST, ListLicenseRequest.class);
		mapping(Actions.LICENSE_UPDATE, UpdateLicenseRequest.class);
		mapping(Actions.NIO_UPDATE, UpdateNioBindingRequest.class);
		mapping(Actions.NIO_LIST, ListNioBindingRequest.class);
		mapping(Actions.START_TASK, StartTaskRequest.class);
		mapping(Actions.STOP_TASK, StopTaskRequest.class);
		mapping(Actions.TASK_STATE_CHANGE, StateChangeRequest.class);
		mapping(Actions.GET_TASK_PROGRESS, GetTaskProgressRequest.class);
		mapping(Actions.GET_TASK_THUMBNAIL, GetTaskThumbnailRequest.class);
		mapping(Actions.GET_MEDIA_INFO, GetMediaInfoRequest.class);
		mapping(Actions.GET_MEDIA_THUMB, GetMediaThumbRequest.class);
		mapping(Actions.GET_TASK_HTTP_GROUP_SETTING_ACCESSOR, GetHttpGroupSettingAccessorRequest.class);
		mapping(Actions.UPDATE_SIGNAL_SETTINGS, UpdateSignalSettingRequest.class);
		mapping(Actions.UPDATE_TASK_INFO, UpdateTaskInfoRequest.class);
		mapping(Actions.NOTIFY_DELETE_TASK, DeleteTaskRequest.class);
		mapping(Actions.SNMP_GET, GetSnmpRequest.class);
		mapping(Actions.SNMP_SAVE, SaveSnmpRequest.class);
		mapping(Actions.ALERT_MESSAGE, AlertMessageRequest.class);
		mapping(Actions.GET_LOGGING_SETTING, GetLoggingSettingRequest.class);
		mapping(Actions.UPDATE_LOGGING_SETTING, UpdateLoggingSettingRequest.class);
		mapping(Actions.UPDATE_ASLOG, UpdateASLogRequest.class);
		mapping(Actions.FAULT_DESC_GET, GetFaultDescRequest.class);
		mapping(Actions.ADD_DELETE_FILE_SCHEDULE, ScheduleDeleteFileRequest.class);
	}

	@Override
	public int getDataType() {
		return Actions.TYPE_REQUEST;
	}

	@Override
	public Class<BaseRequest> getDataClass() {
		return BaseRequest.class;
	}

}
