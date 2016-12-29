package com.arcsoft.commander.cluster.converter;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.cluster.action.alert.AlertMessageResponse;
import com.arcsoft.commander.cluster.action.fault.GetFaultDescResponse;
import com.arcsoft.commander.cluster.action.logging.GetLoggingSettingResponse;
import com.arcsoft.commander.cluster.action.logging.UpdateASLogResponse;
import com.arcsoft.commander.cluster.action.logging.UpdateLoggingSettingResponse;
import com.arcsoft.commander.cluster.action.record.ScheduleDeleteFileResponse;
import com.arcsoft.commander.cluster.action.server.AddAgentResponse;
import com.arcsoft.commander.cluster.action.server.BindResponse;
import com.arcsoft.commander.cluster.action.server.CapabilitiesChangedResponse;
import com.arcsoft.commander.cluster.action.server.ErrorReportResponse;
import com.arcsoft.commander.cluster.action.server.GetAgentDescResponse;
import com.arcsoft.commander.cluster.action.server.GroupBindResponse;
import com.arcsoft.commander.cluster.action.server.LiveRoleSwitchResponse;
import com.arcsoft.commander.cluster.action.server.RemoveAgentResponse;
import com.arcsoft.commander.cluster.action.server.StateReportResponse;
import com.arcsoft.commander.cluster.action.server.SwitchRoleResponse;
import com.arcsoft.commander.cluster.action.server.UnbindResponse;
import com.arcsoft.commander.cluster.action.settings.host.RebootResponse;
import com.arcsoft.commander.cluster.action.settings.host.ShutdownResponse;
import com.arcsoft.commander.cluster.action.settings.license.ListLicenseResponse;
import com.arcsoft.commander.cluster.action.settings.license.UpdateLicenseResponse;
import com.arcsoft.commander.cluster.action.settings.network.AddDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.AddFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.AddRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.BondAndUpdateEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.GetFirewallStatusResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListNioBindingResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.StartFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.StatEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.StopFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.UpdateNioBindingResponse;
import com.arcsoft.commander.cluster.action.settings.storage.AddStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.DeleteStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.FindRemoteMountedStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.FindStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.MountStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.UnmountStorageResponse;
import com.arcsoft.commander.cluster.action.settings.storage.UpdateStorageResponse;
import com.arcsoft.commander.cluster.action.settings.time.GetNTPResponse;
import com.arcsoft.commander.cluster.action.settings.time.GetTimeZoneResponse;
import com.arcsoft.commander.cluster.action.settings.time.SetDateTimeResponse;
import com.arcsoft.commander.cluster.action.settings.time.SetTimeZoneResponse;
import com.arcsoft.commander.cluster.action.snmp.GetSnmpResponse;
import com.arcsoft.commander.cluster.action.snmp.SaveSnmpResponse;
import com.arcsoft.commander.cluster.action.task.DeleteTaskResponse;
import com.arcsoft.commander.cluster.action.task.GetHttpGroupSettingAccessorResponse;
import com.arcsoft.commander.cluster.action.task.GetMediaInfoResponse;
import com.arcsoft.commander.cluster.action.task.GetMediaThumbResponse;
import com.arcsoft.commander.cluster.action.task.GetTaskProgressResponse;
import com.arcsoft.commander.cluster.action.task.GetTaskThumbnailResponse;
import com.arcsoft.commander.cluster.action.task.StartTaskResponse;
import com.arcsoft.commander.cluster.action.task.StateChangeResponse;
import com.arcsoft.commander.cluster.action.task.StopTaskResponse;
import com.arcsoft.commander.cluster.action.task.UpdateSignalSettingResponse;
import com.arcsoft.commander.cluster.action.task.UpdateTaskInfoResponse;

/**
 * Converter between response and data package.
 * 
 * @author fjli
 */
public class ResponseDataConverter extends XmlDataConverter<BaseResponse> {

	/**
	 * Construct new response converter.
	 */
	public ResponseDataConverter() {
		mapping(Actions.GET_AGENT_DESC, GetAgentDescResponse.class);
		mapping(Actions.ADD_AGENT, AddAgentResponse.class);
		mapping(Actions.REMOVE_AGENT, RemoveAgentResponse.class);
		mapping(Actions.ERROR_REPORT, ErrorReportResponse.class);
		mapping(Actions.STATE_REPORT, StateReportResponse.class);
		mapping(Actions.CAPS_CHANGED, CapabilitiesChangedResponse.class);
		mapping(Actions.GROUP_LIVE_BIND, GroupBindResponse.class);
		mapping(Actions.LIVE_BIND, BindResponse.class);
		mapping(Actions.LIVE_UNBIND, UnbindResponse.class);
		mapping(Actions.LIVE_ROLE_SWITCH_EVENT, LiveRoleSwitchResponse.class);
		mapping(Actions.LIVE_SWITCH_ROLE, SwitchRoleResponse.class);
		mapping(Actions.NETWORK_LIST, ListEthResponse.class);
		mapping(Actions.NETWORK_STAT, StatEthResponse.class);
		mapping(Actions.NETWORK_SAVE, SaveEthResponse.class);
		mapping(Actions.NETWORK_BOND, BondAndUpdateEthResponse.class);
		mapping(Actions.DNS_LIST, ListDNSResponse.class);
		mapping(Actions.DNS_ADD, AddDNSResponse.class);
		mapping(Actions.DNS_DELETE, DeleteDNSResponse.class);
		mapping(Actions.ROUTE_LIST, ListRouteResponse.class);
		mapping(Actions.ROUTE_ADD, AddRouteResponse.class);
		mapping(Actions.ROUTE_DELETE, DeleteRouteResponse.class);
		mapping(Actions.FIREWALL_LIST, ListFirewallResponse.class);
		mapping(Actions.FIREWALL_ADD, AddFirewallResponse.class);
		mapping(Actions.FIREWALL_DELETE, DeleteFirewallResponse.class);
		mapping(Actions.FIREWALL_START,	StartFirewallResponse.class);
		mapping(Actions.FIREWALL_STOP, StopFirewallResponse.class);
		mapping(Actions.FIREWALL_GET_STATUS, GetFirewallStatusResponse.class);
		mapping(Actions.SYSTEM_REBOOT, RebootResponse.class);
		mapping(Actions.SYSTEM_SHUTDOWN, ShutdownResponse.class);
		mapping(Actions.SYSTEM_SET_TIMEZONE, SetTimeZoneResponse.class);
		mapping(Actions.SYSTEM_GET_TIMEZONE, GetTimeZoneResponse.class);
		mapping(Actions.SYSTEM_SET_TIME, SetDateTimeResponse.class);
		mapping(Actions.SYSTEM_GET_NTP, GetNTPResponse.class);
		mapping(Actions.STORAGE_ADD, AddStorageResponse.class);
		mapping(Actions.STORAGE_DELETE, DeleteStorageResponse.class);
		mapping(Actions.STORAGE_MOUNT, MountStorageResponse.class);
		mapping(Actions.STORAGE_UNMOUNT, UnmountStorageResponse.class);
		mapping(Actions.STORAGE_UPDATE, UpdateStorageResponse.class);
		mapping(Actions.STORAGE_FIND_REMOTE_MOUNTED, FindRemoteMountedStorageResponse.class);
		mapping(Actions.STORAGE_FIND, FindStorageResponse.class);
		mapping(Actions.LICENSE_LIST, ListLicenseResponse.class);
		mapping(Actions.LICENSE_UPDATE, UpdateLicenseResponse.class);
		mapping(Actions.NIO_UPDATE, UpdateNioBindingResponse.class);
		mapping(Actions.NIO_LIST, ListNioBindingResponse.class);
		mapping(Actions.START_TASK, StartTaskResponse.class);
		mapping(Actions.STOP_TASK, StopTaskResponse.class);
		mapping(Actions.TASK_STATE_CHANGE, StateChangeResponse.class);
		mapping(Actions.GET_TASK_PROGRESS, GetTaskProgressResponse.class);
		mapping(Actions.GET_TASK_THUMBNAIL, GetTaskThumbnailResponse.class);
		mapping(Actions.GET_MEDIA_INFO, GetMediaInfoResponse.class);
		mapping(Actions.GET_MEDIA_THUMB, GetMediaThumbResponse.class);
		mapping(Actions.GET_TASK_HTTP_GROUP_SETTING_ACCESSOR, GetHttpGroupSettingAccessorResponse.class);
		mapping(Actions.UPDATE_SIGNAL_SETTINGS, UpdateSignalSettingResponse.class);
		mapping(Actions.UPDATE_TASK_INFO, UpdateTaskInfoResponse.class);
		mapping(Actions.NOTIFY_DELETE_TASK, DeleteTaskResponse.class);
		mapping(Actions.SNMP_GET, GetSnmpResponse.class);
		mapping(Actions.SNMP_SAVE, SaveSnmpResponse.class);
		mapping(Actions.ALERT_MESSAGE, AlertMessageResponse.class);
		mapping(Actions.GET_LOGGING_SETTING, GetLoggingSettingResponse.class);
		mapping(Actions.UPDATE_LOGGING_SETTING, UpdateLoggingSettingResponse.class);
		mapping(Actions.UPDATE_ASLOG, UpdateASLogResponse.class);
		mapping(Actions.FAULT_DESC_GET, GetFaultDescResponse.class);
		mapping(Actions.ADD_DELETE_FILE_SCHEDULE, ScheduleDeleteFileResponse.class);
	}

	@Override
	public int getDataType() {
		return Actions.TYPE_RESPONSE;
	}

	@Override
	public Class<BaseResponse> getDataClass() {
		return BaseResponse.class;
	}

}
