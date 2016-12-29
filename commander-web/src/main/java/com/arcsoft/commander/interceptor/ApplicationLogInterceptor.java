package com.arcsoft.commander.interceptor;


import java.util.List;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.action.channel.AddChannelAction;
import com.arcsoft.commander.action.channel.DeleteChannelAction;
import com.arcsoft.commander.action.operationlog.OperationLogAction;
import com.arcsoft.commander.action.profile.DeleteLiveProfileAction;
import com.arcsoft.commander.action.record.*;
import com.arcsoft.commander.action.security.ChangePasswordAction;
import com.arcsoft.commander.action.security.RoleAction;
import com.arcsoft.commander.action.security.UserAction;
import com.arcsoft.commander.action.server.AddGroupAction;
import com.arcsoft.commander.action.server.AddServerAction;
import com.arcsoft.commander.action.server.DeleteGroupAction;
import com.arcsoft.commander.action.server.DeleteServerAction;
import com.arcsoft.commander.action.server.RenameGroupAction;
import com.arcsoft.commander.action.server.RenameServerAction;
import com.arcsoft.commander.action.settings.DnsAction;
import com.arcsoft.commander.action.settings.EthAction;
import com.arcsoft.commander.action.settings.FirewallAction;
import com.arcsoft.commander.action.settings.ManageHostAction;
import com.arcsoft.commander.action.settings.RouteAction;
import com.arcsoft.commander.action.settings.StorageAction;
import com.arcsoft.commander.action.settings.TimeSettingAction;
import com.arcsoft.commander.action.task.CtrlTaskAction;
import com.arcsoft.commander.action.task.DeleteTaskAction;
import com.arcsoft.commander.action.task.SaveTaskAction;
import com.arcsoft.commander.domain.operationlog.OperationLog;
import com.arcsoft.commander.domain.security.Account;
import com.arcsoft.commander.domain.security.Role;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.domain.settings.Route;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.service.channel.ChannelService;
import com.arcsoft.commander.service.license.CommanderLicenseService;
import com.arcsoft.commander.service.operationlog.OperationLogService;
import com.arcsoft.commander.service.security.SecurityService;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.web4transcoder.action.liveprofile.SaveLiveProfileAction;
import com.arcsoft.web4transcoder.action.output.DeletePresetAction;
import com.arcsoft.web4transcoder.action.output.SavePresetAction;
import com.arcsoft.web4transcoder.action.support.PersistenceObjectActionSupport;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.automation.Schedule;
import com.arcsoft.web4transcoder.domain.output.Preset;
import com.arcsoft.web4transcoder.service.LiveProfileService;
import com.arcsoft.web4transcoder.service.PresetService;
import com.arcsoft.web4transcoder.service.TaskService;
import com.arcsoft.web4transcoder.service.automation.ScheduleService;
import com.arcsoft.web4transcoder.service.automation.WatchFolderService;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

@SuppressWarnings("serial")
public class ApplicationLogInterceptor extends AbstractInterceptor {
		
	private final static String keyOfTask = "task";
	private final static String keyOfLiveProfile = "liveprofile";
	private final static String keyOfPreset = "preset";
	private final static String keyOfSchedule = "schedule";
	private final static String keyOfWatchfolder = "watchfolder";
//	private final static String keyOfGroup = "group";
	private final static String keyOfDevice = "device";
//	private final static String keyOfEth = "eth";
//	private final static String keyOfFirewall = "firewall";
//	private final static String keyOfDns = "dns";
//	private final static String keyOfRoute = "route";
//	private final static String keyOfTime = "time";
//	private final static String keyOfStorage = "storage";
//	private final static String keyOfHost = "host";
	private final static String keyOfSetting = "setting";
	private final static String keyOfUser = "user";
	private final static String keyOfLog = "log";
	private final static String keyOfRole = "role";
	private final static String keyOfRecord = "record";
	private final static String keyOfChannel = "channel";
	
	private final static String keyOfTaskType = "log.type.task";
	private final static String keyOfLiveProfileType = "log.type.liveprofile";
	private final static String keyOfPresetType = "log.type.preset";
	private final static String keyOfScheduleType = "log.type.schedule";
	private final static String keyOfWatchfolderType = "log.type.watchfolder";
	private final static String keyOfGroupType = "log.type.group";
	private final static String keyOfDeviceType = "log.type.device";
	private final static String keyOfEthType = "log.type.eth";
	private final static String keyOfFirewallType = "log.type.firewall";
	private final static String keyOfDnsType = "log.type.dns";
	private final static String keyOfRouteType = "log.type.route";
	private final static String keyOfTimeType = "log.type.time";
	private final static String keyOfStorageType = "log.type.storage";
	private final static String keyOfHostType = "log.type.host";
	private final static String keyOfUserType = "log.type.user";
	private final static String keyOfLogType = "log.type.log";
	private final static String keyOfRoleType = "log.type.role";
	private final static String keyOfRecordType = "log.type.record";
	private final static String keyOfFulltimeRecordType = "log.type.record.fulltime";
	private final static String keyOfScheduleRecordType = "log.type.record.schedule";
	private final static String keyOfEpgRecordType = "log.type.record.epg";
	private final static String keyOfWeeklyRecordType = "log.type.record.weekly";
	private final static String keyOfChannelType = "log.type.channel";
	
	private final static String keyOfNew = "log.new";
	private final static String keyOfUpdate = "log.update";
	private final static String keyOfDelete = "log.delete";
	private final static String keyOfUnRegister = "log.unRegister";
	private final static String keyOfStart = "log.start";
	private final static String keyOfStop = "log.stop";
	private final static String keyOfRename = "log.rename";
	private final static String keyOfMount = "log.mount";
	private final static String keyOfUnmount = "log.unmount";
	private final static String keyOfReboot = "log.reboot";
	private final static String keyOfShutdown = "log.shutdown";
	private final static String keyOfSwitchRole = "log.switch.role";
	private final static String keyOfChangePassword = "log.change.password";
	private final static String keyOfChangePasswordByAdmin = "log.change.password.by.admin";
	private final static String keyOfExport = "log.export";
	
	private final static String keyOfId = "log.id";
	private final static String keyOfIdAndName = "log.id_name";
	private final static String keyOfIdAndFolderName = "log.id_foldername";
	private final static String keyOfIdAndNameAndSubIds = "log.id_name_subids";
	private final static String keyOfServer = "log.server";
	private final static String keyOfServerAndDetail = "log.server_detail";
	
	private CommanderLicenseService licenseService;
	private OperationLogService operationLogService;
	private TaskService taskService;
	private LiveProfileService liveProfileService;
	private PresetService presetService;
	private WatchFolderService watchFolderService;
	private ScheduleService scheduleService;
	private ServerService serverService;
	private SecurityService securityService;
	private ChannelService channelService;

	public void setLicenseService(CommanderLicenseService licenseService) {
		this.licenseService = licenseService;
	}

	public void setOperationLogService(OperationLogService operationLogService) {
		this.operationLogService = operationLogService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public void setLiveProfileService(LiveProfileService liveProfileService) {
		this.liveProfileService = liveProfileService;
	}

	public void setPresetService(PresetService presetService) {
		this.presetService = presetService;
	}

	public void setWatchFolderService(WatchFolderService watchFolderService) {
		this.watchFolderService = watchFolderService;
	}

	public void setScheduleService(ScheduleService scheduleService) {
		this.scheduleService = scheduleService;
	}
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

	public void setChannelService(ChannelService channelService) {
		this.channelService = channelService;
	}

	private boolean isDomainRootObjectCreated(String command) {
		return PersistenceObjectActionSupport.SAVE.equalsIgnoreCase(command);		
	}
	
	private boolean isDomainRootObjectUpdated(String command) {
		return PersistenceObjectActionSupport.UPDATE.equalsIgnoreCase(command);		
	}
	
	private boolean isStartTaskCommand(String command) {
		return CtrlTaskAction.START.equalsIgnoreCase(command);	
	}
	
	private boolean isStopTaskCommand(String command) {
		return CtrlTaskAction.STOP.equalsIgnoreCase(command);	
	}

	private String getDescription(ActionSupport action, String keyOfOperation, String type) {
		String desc = action.getText(keyOfOperation, new String[] { type});
		return desc;
	}
	
	private String getDescription(ActionSupport action, String keyOfOperation, String type, String id) {
		String desc = action.getText(keyOfOperation, new String[] { type, action.getText(keyOfId,  new String[] { id } ) });
		return desc;
	}
	
	private String getDescription(ActionSupport action, String keyOfOperation, String type, String id, String name) {
		String desc = action.getText(keyOfOperation, new String[] { type, action.getText(keyOfIdAndName,  new String[] { id, name } ) });
		return desc;
	}
	
	private String getDescriptionForWatchFolder(ActionSupport action, String keyOfOperation, String type, String id, String name) {
		String desc = action.getText(keyOfOperation, new String[] { type, action.getText(keyOfIdAndFolderName,  new String[] { id, name } ) });
		return desc;
	}

	private String getDescriptionForGroup(ActionSupport action, String keyOfOperation, String type, String id, String name, String ids) {
		String desc = action.getText(keyOfOperation, new String[] { type, action.getText(keyOfIdAndNameAndSubIds,  new String[] { id, name, ids } ) });
		return desc;
	}
	
	private String getDescriptionForSetting(ActionSupport action, String keyOfOperation, String type, String serverIp){
		String desc = action.getText(keyOfOperation, new String[]{type, action.getText(keyOfServer, new String[] { serverIp})});
		return desc;
	}
	
	private String getDescriptionForSettingDetail(ActionSupport action, String keyOfOperation, String type, String serverIp, String detail){
		String desc = action.getText(keyOfOperation, new String[]{type, action.getText(keyOfServerAndDetail, new String[] { serverIp, detail } )});
		return desc;
	}	

	private String getDescriptionForChangePassword(ActionSupport action, String keyOfOperation, String id, String name) {
		String desc = action.getText(keyOfOperation, new String[]{ action.getText(keyOfIdAndName, new String[] { id, name } )});
		return desc;
	}
		
	private void saveLog(String type, String description) {
		saveLog(type, description, null);
	}

	private void saveLog(String type, String description, String attachment) {
		Account account = securityService.getLoginAccount();
		OperationLog log = new OperationLog(account != null ? account.getName() : null, type, description);
		log.setAttachment(attachment);
		this.operationLogService.addLog(log);
	}
	
    public String intercept(ActionInvocation invocation) throws Exception {
		if (!licenseService.isLicenseEnabled(CommanderLicenseService.OPERATION_LOG))
			return invocation.invoke();

    	String result = null;		
		result = interceptTaskAction(invocation);
		if (result == null) {
			result = interceptDeviceAction(invocation);
		}
		if (result == null) {
			result = interceptSettingAction(invocation);
		}
		if (result == null) {
			result = interceptUserAction(invocation);
		}
		
		if(result == null){
			result =  interceptRoleAction(invocation);
		}
//		if (result == null) {
//			result = interceptLogAction(invocation);
//		}
		if (result == null) {
			result = invocation.invoke();
		}
		return result;
    }

	private String interceptTaskAction(ActionInvocation invocation) throws Exception {
    	String result = null;
    	Object action = invocation.getAction();	
		// Task
    	if (action instanceof SaveTaskAction) {
    		result = invocation.invoke();
    		
    		SaveTaskAction saveTaskAction = (SaveTaskAction)action;        		
    		CommanderTask task = (CommanderTask) saveTaskAction.getTask();
    		String command = saveTaskAction.getTaskAction();
    		
    		String type = saveTaskAction.getText(keyOfTaskType);
    		String groupOrDevice = null;
    		if (!StringHelper.isBlank(task.getCurServerId())) {
    			Server server = serverService.getServer(task.getCurServerId());
    			if (server != null)
    				groupOrDevice = server.getIp();
    		} else if (task.getGroupId() != null) {
    			ServerGroup group = serverService.getGroup(task.getGroupId(), false);
    			if (group != null)
    				groupOrDevice =group.getName();
    		}
    		if (isDomainRootObjectCreated(command)) {
    			String desc = getDescription(saveTaskAction, keyOfNew, type, task.getId().toString(), task.getName());
    			if (groupOrDevice != null)
    				desc += ", " + groupOrDevice;
    			String attachment = taskService.serializeTaskAsXml(task);
    			saveLog(keyOfTask, desc, attachment);
    		}
    		else if (isDomainRootObjectUpdated(command)) {
    			String desc = getDescription(saveTaskAction, keyOfUpdate, type, task.getId().toString(), task.getName());
    			if (groupOrDevice != null)
    				desc += ", " + saveTaskAction.getText("log.task.assignto") + groupOrDevice;
    			String attachment = taskService.serializeTaskAsXml(task);
    			saveLog(keyOfTask, desc, attachment);
    		}
    	}
    	else if (action instanceof DeleteTaskAction) {
    		result = invocation.invoke();
    		DeleteTaskAction deleteTaskAction = (DeleteTaskAction)action;        		
    		String taskId = deleteTaskAction.getTaskId(); 
    		String[] ids = taskId.split(",");	
    		
    		String type = deleteTaskAction.getText(keyOfTaskType);    		
			String desc = getDescription(deleteTaskAction, keyOfDelete, type, taskId);
			saveLog(keyOfTask, desc);
    	}
    	else if (action instanceof CtrlTaskAction) {
    		result = invocation.invoke();
    		
    		CtrlTaskAction ctrlTaskAction = (CtrlTaskAction)action;        		
    		String taskId = ctrlTaskAction.getTaskId();        		
    		String command = ctrlTaskAction.getCmd();
    		
    		String[] ids = taskId.split(",");
    		String type = ctrlTaskAction.getText(keyOfTaskType);
    		if (isStartTaskCommand(command)) {
    			if (ids.length == 1) {
    				int id = Long.decode(ids[0]).intValue();        				
        			Task task = taskService.getTask(id, false);
        			
        			String desc = getDescription(ctrlTaskAction, keyOfStart, type, taskId, task.getName());            		
    				saveLog(keyOfTask, desc);
    			}	
    			else {
    				String desc = getDescription(ctrlTaskAction, keyOfStart, type, taskId);            		
    				saveLog(keyOfTask, desc);
    			}
    		}
    		else if (isStopTaskCommand(command)) {
    			if (ids.length == 1) {
    				int id = Long.decode(ids[0]).intValue();        				
        			Task task = taskService.getTask(id, false);
        			
        			String desc = getDescription(ctrlTaskAction, keyOfStop, type, taskId, task.getName());
        			saveLog(keyOfTask, desc);
    			}
    			else {
    				String desc = getDescription(ctrlTaskAction, keyOfStop, type, taskId);
    				saveLog(keyOfTask, desc);
    			}
    		}
    	}
    	
    	// Profile
    	else if (action instanceof SaveLiveProfileAction) {
    		result = invocation.invoke();
    		
    		SaveLiveProfileAction saveLiveProfileAction = (SaveLiveProfileAction)action;
    		LiveProfile profile = saveLiveProfileAction.getLiveProfile();        		
    		String command = saveLiveProfileAction.getProfileAction();
         		
    		String type = saveLiveProfileAction.getText(keyOfLiveProfileType);
    		if (isDomainRootObjectCreated(command)) {
    			String desc = getDescription(saveLiveProfileAction, keyOfNew, type, profile.getId().toString(), profile.getName());        			
    			saveLog(keyOfLiveProfile, desc);
    		}
    		else if (isDomainRootObjectUpdated(command)) {
    			String desc = getDescription(saveLiveProfileAction, keyOfUpdate, type, profile.getId().toString(), profile.getName());
    			saveLog(keyOfLiveProfile, desc);
    		}
    	}
    	else if (action instanceof DeleteLiveProfileAction) {
    		result = invocation.invoke();
    		DeleteLiveProfileAction deleteLiveProfileAction = (DeleteLiveProfileAction)action;        		
    		Integer liveProfileId = deleteLiveProfileAction.getLiveProfileId(); 
    		
			String type = deleteLiveProfileAction.getText(keyOfLiveProfileType);
			String desc = getDescription(deleteLiveProfileAction, keyOfDelete, type, liveProfileId.toString());
			saveLog(keyOfLiveProfile, desc);
    	}
    	
    	// Preset
    	else if (action instanceof SavePresetAction) {
    		result = invocation.invoke();
    		
    		SavePresetAction savePresetAction = (SavePresetAction)action;
    		Preset preset = savePresetAction.getPreset();        		
    		String command = savePresetAction.getPresetAction();
    		
    		String type = savePresetAction.getText(keyOfPresetType);
    		if (isDomainRootObjectCreated(command)) {
    			String desc = getDescription(savePresetAction, keyOfNew, type, preset.getId().toString(), preset.getName());        			
    			saveLog(keyOfPreset, desc);
    		}
    		else if (isDomainRootObjectUpdated(command)) {
    			String desc = getDescription(savePresetAction, keyOfUpdate, type, preset.getId().toString(), preset.getName());        			
    			saveLog(keyOfPreset, desc);
    		}
    	}
    	else if (action instanceof DeletePresetAction) {
    		result = invocation.invoke();
    		DeletePresetAction deletePresetAction = (DeletePresetAction)action;        		
    		Integer presetId = deletePresetAction.getPresetId();     		
    		
			String type = deletePresetAction.getText(keyOfPresetType);
    		String desc = getDescription(deletePresetAction, keyOfDelete, type, presetId.toString());
			saveLog(keyOfPreset, desc);
    	}

		// Record
		else if (action instanceof AddFullTimeRecordAction) {
			result = invocation.invoke();

			AddFullTimeRecordAction addFullTimeRecordAction = (AddFullTimeRecordAction)action;
			String channelName = channelService.get(addFullTimeRecordAction.getTask().getChannelId()).getName();
			String type = addFullTimeRecordAction.getText(keyOfFulltimeRecordType);
			String desc = getDescription(addFullTimeRecordAction, keyOfNew, type,
					addFullTimeRecordAction.getTask().getId().toString(),channelName);
			saveLog(keyOfRecord, desc);

		}
		else if (action instanceof AddScheduleRecordAction) {
			result = invocation.invoke();

			AddScheduleRecordAction addScheduleRecordAction = (AddScheduleRecordAction)action;
			String channelName = channelService.get(addScheduleRecordAction.getTask().getChannelId()).getName();
			String type = addScheduleRecordAction.getText(keyOfScheduleRecordType);
			String desc = getDescription(addScheduleRecordAction, keyOfNew, type,
					addScheduleRecordAction.getTask().getId().toString(),channelName);
			saveLog(keyOfRecord, desc);

		}
		else if (action instanceof AddEpgRecordAction) {
			result = invocation.invoke();

			AddEpgRecordAction addEpgRecordAction = (AddEpgRecordAction)action;
			String channelName = channelService.get(addEpgRecordAction.getTask().getChannelId()).getName();
			String type = addEpgRecordAction.getText(keyOfEpgRecordType);
			String desc = getDescription(addEpgRecordAction, keyOfNew, type,
					addEpgRecordAction.getTask().getId().toString(),channelName);
			saveLog(keyOfRecord, desc);

		}
		else if (action instanceof AddWeeklyRecordAction) {
			result = invocation.invoke();

			AddWeeklyRecordAction addWeeklyRecordAction = (AddWeeklyRecordAction)action;
			String channelName = channelService.get(addWeeklyRecordAction.getTask().getChannelId()).getName();
			String type = addWeeklyRecordAction.getText(keyOfWeeklyRecordType);
			String desc = getDescription(addWeeklyRecordAction, keyOfNew, type,channelName);
			saveLog(keyOfRecord, desc);

		}
		else if (action instanceof DeleteRecordAction) {
			result = invocation.invoke();

			DeleteRecordAction deleteRecordAction = (DeleteRecordAction)action;
			String type = deleteRecordAction.getText(keyOfRecordType);
			String desc = getDescription(deleteRecordAction, keyOfDelete, type,
					deleteRecordAction.getIds());
			saveLog(keyOfRecord, desc);

		}

		//Channel
		else if (action instanceof AddChannelAction) {
			result = invocation.invoke();

			AddChannelAction addChannelAction = (AddChannelAction)action;
			String type = addChannelAction.getText(keyOfChannelType);

			if(addChannelAction.getChannels().size()>0){
				String desc = getDescription(addChannelAction, keyOfNew, type,addChannelAction.getChannelsIdList());
				saveLog(keyOfChannel, desc);
			}
		}
		else if (action instanceof DeleteChannelAction) {
			result = invocation.invoke();

			DeleteChannelAction deleteChannelAction = (DeleteChannelAction)action;
			String type = deleteChannelAction.getText(keyOfChannelType);
			String desc = getDescription(deleteChannelAction, keyOfDelete, type,deleteChannelAction.getIds());
			saveLog(keyOfChannel, desc);

		}

    	// Schedule
//    	else if (action instanceof SaveScheduleAction) {
//    		result = invocation.invoke();
//    		
//    		SaveScheduleAction saveScheduleAction = (SaveScheduleAction)action;        		
//    		Schedule schedule = saveScheduleAction.getSchedule();
//    		String command = saveScheduleAction.getScheduleAction();
//    		
//    		String type = saveScheduleAction.getText(keyOfScheduleType);
//    		if (isDomainRootObjectCreated(command)) {
//    			String desc = getDescription(saveScheduleAction, keyOfNew, type, schedule.getId().toString(), schedule.getName());
//    			saveLog(keyOfSchedule, desc);
//    		}
//    		else if (isDomainRootObjectUpdated(command)) {
//    			String desc = getDescription(saveScheduleAction, keyOfUpdate, type, schedule.getId().toString(), schedule.getName());
//    			saveLog(keyOfSchedule, desc);
//    		}         		
//    	}
//    	else if (action instanceof DeleteScheduleAction) {
//    		DeleteScheduleAction deleteScheduleAction = (DeleteScheduleAction)action;        		
//    		Integer scheduleId = deleteScheduleAction.getScheduleId(); 
//    		
//    		Schedule schedule = scheduleService.getSchedule(scheduleId);
//    		if (schedule != null) {
//    			String type = deleteScheduleAction.getText(keyOfScheduleType);
//    			String desc = getDescription(deleteScheduleAction, keyOfDelete, type, scheduleId.toString(), schedule.getName());        		
//    			saveLog(keyOfSchedule, desc);
//    		}
//    		
//    		result = invocation.invoke();
//    	}
//    	
//    	// WatchFolder
//    	else if (action instanceof SaveWatchFolderAction) {
//    		result = invocation.invoke();
//    		
//    		SaveWatchFolderAction saveWatchFolderAction = (SaveWatchFolderAction)action;        		
//    		WatchFolder watchFolder = saveWatchFolderAction.getWatchFolder();
//    		String command = saveWatchFolderAction.getWatchFolderAction();
//    		
//    		String type = saveWatchFolderAction.getText(keyOfWatchfolderType);
//    		if (isDomainRootObjectCreated(command)) {
//    			String desc = getDescriptionForWatchFolder(saveWatchFolderAction, keyOfNew, type, watchFolder.getId().toString(), watchFolder.getFolder());        			
//    			saveLog(keyOfWatchfolder, desc);
//    		}
//    		else if (isDomainRootObjectUpdated(command)) {
//    			String desc = getDescriptionForWatchFolder(saveWatchFolderAction, keyOfUpdate, type, watchFolder.getId().toString(), watchFolder.getFolder());
//    			saveLog(keyOfWatchfolder, desc);
//    		}
//    	}
//    	else if (action instanceof DeleteWatchFolderAction) {
//    		DeleteWatchFolderAction deleteWatchFolderAction = (DeleteWatchFolderAction)action;        		
//    		Integer watchFolderId = deleteWatchFolderAction.getWatchFolderId(); 
//    		
//    		WatchFolder watchFolder = watchFolderService.getWatchFolder(watchFolderId);
//    		if (watchFolder != null) {
//    			String type = deleteWatchFolderAction.getText(keyOfWatchfolderType);
//    			String desc = getDescriptionForWatchFolder(deleteWatchFolderAction, keyOfDelete, type, watchFolderId.toString(), watchFolder.getFolder());
//    			saveLog(keyOfWatchfolder, desc);
//    		}
//    		
//    		result = invocation.invoke();
//    	}
    	return result;		
	}

	private String interceptDeviceAction(ActionInvocation invocation) throws Exception {
    	String result = null;
		Object action = invocation.getAction();
		if(action instanceof AddGroupAction){    		
    		result = invocation.invoke();
    		String method = invocation.getProxy().getMethod();
    		if(result == Action.SUCCESS && method.equals("save")){
	    		AddGroupAction addGroupAction = (AddGroupAction)action;
	    		ServerGroup group = addGroupAction.getGroup();
	    		if(group != null){
		    		String type = addGroupAction.getText(keyOfGroupType);
		    		List<Server> servers = group.getServers();
		    		StringBuilder sb = new StringBuilder();
		    		if (servers != null) {
			    		for(Server server : servers){
			    			sb.append(server.getIp());
			    			sb.append(",");
			    		}
		    		}
		    		String ips = sb.toString();
		    		if(ips.length() > 0){
		    			ips = ips.substring(0, ips.length() - 1);
		    		}
		    		String desc = getDescriptionForGroup(addGroupAction, keyOfNew, type, group.getId().toString(), group.getName(), ips);
		    		saveLog(keyOfDevice, desc);
	    		}
    		}
    	}
    	else if(action instanceof RenameGroupAction){
    		result = invocation.invoke();
    		if(result == Action.SUCCESS){
	    		RenameGroupAction renameGroupAction = (RenameGroupAction)action;
	    		int id = renameGroupAction.getId();
	    		String name = renameGroupAction.getNewName();
	    		String type = renameGroupAction.getText(keyOfGroupType);
	    		String desc = getDescription(renameGroupAction, keyOfRename, type, Integer.toString(id), name);
	    		saveLog(keyOfDevice, desc);
    		}
    	}
    	else if(action instanceof DeleteGroupAction){
    		result = invocation.invoke();
    		DeleteGroupAction deleteGroupAction = (DeleteGroupAction)action;
    		int id = deleteGroupAction.getId();    		
    		String type = deleteGroupAction.getText(keyOfGroupType);
    		String desc = getDescription(deleteGroupAction, keyOfDelete, type, Integer.toString(id));
    		saveLog(keyOfDevice, desc);
    	}
    	else if(action instanceof AddServerAction){    		
    		result = invocation.invoke();
    		String method = invocation.getProxy().getMethod();
			if (result == Action.SUCCESS && method.equals("save")) {
				AddServerAction addServerAction = (AddServerAction) action;
				ServerGroup group = addServerAction.getGroup();
				if (group != null) {
					String type = addServerAction.getText(keyOfGroupType);
					StringBuilder sb = new StringBuilder();
					List<Server> servers = group.getServers();
					if (servers != null) {
						for (Server server : servers) {
							sb.append(server.getIp());
							sb.append(",");
						}
						String ips = sb.toString();
						if (ips.length() > 0) {
							ips = ips.substring(0, ips.length() - 1);
						}
						String desc = getDescriptionForGroup(addServerAction, keyOfUpdate, type, group.getId().toString(),
								group.getName(), ips);
						saveLog(keyOfDevice, desc);
					}
				}
			}
		}
    	else if(action instanceof RenameServerAction){
    		result = invocation.invoke();
			if (result == Action.SUCCESS) {
				RenameServerAction renameServerAction = (RenameServerAction) action;
				String id = renameServerAction.getId();
				Server server = serverService.getServer(id);
				if(server != null){
					String name = renameServerAction.getNewName();
					String type = renameServerAction.getText(keyOfDeviceType);
					String desc = getDescription(renameServerAction, keyOfRename, type, server.getIp(), name);
					saveLog(keyOfDevice, desc);
					
				}
			}
    	}
    	else if(action instanceof DeleteServerAction){
    		result = invocation.invoke();
    		DeleteServerAction deleteServerAction = (DeleteServerAction)action;
    		String id = deleteServerAction.getId();    		
    		String type = deleteServerAction.getText(keyOfDeviceType);
    		String desc = getDescription(deleteServerAction, keyOfDelete, type, id);
    		saveLog(keyOfDevice, desc);
    	}
		return result;
	}

	private String interceptSettingAction(ActionInvocation invocation) throws Exception {
    	String result = null;
		Object action = invocation.getAction();
		if(action instanceof EthAction){    		
    		if(invocation.getProxy().getMethod().equals("save")){
    			result = invocation.invoke();
    			EthAction ethAction = (EthAction)action; 
    			String ip = "localhost";
    			if(!ethAction.getIsLocal()){
    				ip = serverService.getServer(ethAction.getId()).getIp();
    			}
    			List<Eth> eths = ethAction.getEths();
    			if(eths != null && eths.size() > 0){
					String type = ethAction.getText(keyOfEthType);
					String desc = getDescriptionForSettingDetail(ethAction, keyOfUpdate, type, ip, 
							eths.get(ethAction.getIndex()).getId());
					saveLog(keyOfSetting, desc);	
    			}
    		}    		
    	}
    	else if(action instanceof FirewallAction){    		
    		String method = invocation.getProxy().getMethod();
    		if(method.equals("add") || method.equals("delete") || method.equals("start") || method.equals("stop")){
    			result = invocation.invoke();
    			FirewallAction firewallAction = (FirewallAction)action;    	
    			String ip = "localhost";
    			if(!firewallAction.getIsLocal()){
    				ip = serverService.getServer(firewallAction.getId()).getIp();
    			}
    			if(method.equals("add") || method.equals("delete")){   
    				FirewallRule rull = firewallAction.getRule();
    				if(rull != null){
            			String detail = rull.toString();
            			String type = firewallAction.getText(keyOfFirewallType);
            			String operation = method.equals("add") ? keyOfNew : keyOfDelete;
            			String desc = getDescriptionForSettingDetail(firewallAction, operation, type, ip, detail);
            			saveLog(keyOfSetting, desc);    					
    				}
    			}else{
        			String type = firewallAction.getText(keyOfFirewallType);
        			String operation = method.equals("start") ? keyOfStart : keyOfStop;
        			String desc = getDescriptionForSetting(firewallAction, operation, type, ip);
        			saveLog(keyOfSetting, desc);
    			}
    		}
    	}
    	else if(action instanceof DnsAction){    		
       		String method = invocation.getProxy().getMethod();
    		if(method.equals("add") || method.equals("delete")){
    			result = invocation.invoke();
       			DnsAction dnsAction = (DnsAction)action;    	
    			String ip = "localhost";
    			if(!dnsAction.getIsLocal()){
    				ip = serverService.getServer(dnsAction.getId()).getIp();
    			}    	
    			DNS dns = dnsAction.getDns();
    			if(dns != null){
	    			String detail = dns.toString();    			
	    			String type = dnsAction.getText(keyOfDnsType);
	    			String operation = method.equals("add") ? keyOfNew : keyOfDelete;
	    			String desc = getDescriptionForSettingDetail(dnsAction, operation, type, ip, detail);
	    			saveLog(keyOfSetting, desc);
    			}
    		}    		
    	}
    	else if(action instanceof RouteAction){    		
       		String method = invocation.getProxy().getMethod();
    		if(method.equals("add") || method.equals("delete")){
    			result = invocation.invoke();
       			RouteAction routeAction = (RouteAction)action;    	
    			String ip = "localhost";
    			if(!routeAction.getIsLocal()){
    				ip = serverService.getServer(routeAction.getId()).getIp();
    			}    	
    			Route route = routeAction.getRoute();
    			if(route != null){
	    			String detail = route.toString();    			
	    			String type = routeAction.getText(keyOfRouteType);
	    			String operation = method.equals("add") ? keyOfNew : keyOfDelete;
	    			String desc = getDescriptionForSettingDetail(routeAction, operation, type, ip, detail);
	    			saveLog(keyOfSetting, desc);
    			}
    		}
    	}
    	else if(action instanceof TimeSettingAction){
    		if(invocation.getProxy().getMethod().equals("save")){
    			result = invocation.invoke();
    			TimeSettingAction timeAction = (TimeSettingAction)action; 
    			String ip = "localhost";
    			if(!timeAction.getIsLocal()){
    				ip = serverService.getServer(timeAction.getId()).getIp();
    			}
    			String detail = "sync with NTP server";
    			NTPStatus ntp = timeAction.getNtpStatus();
    			if(ntp != null){
	    			if(!ntp.getIsServiceOn()){
	    				detail = timeAction.getDate();
	    			}
	    			String type = timeAction.getText(keyOfTimeType);
	    			String desc = getDescriptionForSettingDetail(timeAction, keyOfUpdate, type, ip, detail);
	    			saveLog(keyOfSetting, desc);	
    			}
    		}   
    	}
    	else if(action instanceof StorageAction){     		
    		String method = invocation.getProxy().getMethod();
    		if(method.equals("add") || method.equals("update") || method.equals("delete") || method.equals("mount") || method.equals("unmount")){
    			result = invocation.invoke();
    			StorageAction storageAction = (StorageAction)action;    	
    			String ip = "localhost";
    			if(!storageAction.getIsLocal()){
    				ip = serverService.getServer(storageAction.getId()).getIp();
    			}
    			Storage storage = storageAction.getStorage();
    			if(storage != null){
	    			String detail = storage.getPath();
	    			String type = storageAction.getText(keyOfStorageType);
	    			String operation = null;
					if (method.equals("add")) {
						operation = keyOfNew;
					} else if (method.equals("update")) {
						operation = keyOfUpdate;
					} else if (method.equals("delete")) {
						operation = keyOfDelete;
					} else if (method.equals("mount")) {
						operation = keyOfMount;
					} else {
						operation = keyOfUnmount;
					}
	    			String desc = getDescriptionForSettingDetail(storageAction, operation, type, ip, detail);
	    			saveLog(keyOfSetting, desc);
    			}
    		}
    	}
    	else if(action instanceof ManageHostAction){    		
    		String method = invocation.getProxy().getMethod();
			if (method.equals("reboot") || method.equals("shutdown")) {
				result = invocation.invoke();
				ManageHostAction hostAction = (ManageHostAction) action;
				if (hostAction.getActionErrors().isEmpty()) {
					String ip = "localhost";
					if (hostAction.getIsLocal() != null && !hostAction.getIsLocal()) {
						ip = serverService.getServer(hostAction.getId()).getIp();
					}
					String type = hostAction.getText(keyOfHostType);
					String operation = null;
					String desc = null;
					if (method.equals("reboot")) {
						operation = keyOfReboot;
						desc = getDescriptionForSetting(hostAction, operation, type, ip);
					} else if (method.equals("shutdown")) {
						operation = keyOfShutdown;
						desc = getDescriptionForSetting(hostAction, operation, type, ip);
					}
					saveLog(keyOfSetting, desc);
				}
			} else if (method.equals("switchRole") || method.equals("switchServer")) {
				result = invocation.invoke();
				ManageHostAction hostAction = (ManageHostAction) action;
				if (hostAction.getActionErrors().isEmpty()) {
					Server oldMaster = null;
					Server oldSlave = null;
					if (method.equals("switchRole")) {
						ServerGroup group = hostAction.getGroup();
						List<Server> servers = group.getServers();
						boolean isMaster = !servers.get(0).isBackup();
						oldMaster = isMaster ? servers.get(0) : servers.get(1);
						oldSlave = isMaster ? servers.get(1) : servers.get(0);
					} else if (method.equals("switchServer")) {
						oldMaster = serverService.getServer(hostAction.getId());
						oldSlave = serverService.getServer(hostAction.getBackupServerId());
					}
					if (oldMaster != null && oldSlave != null) {
						String desc = hostAction.getText(keyOfSwitchRole, new String[] { oldMaster.getIp(), oldSlave.getIp() });
						saveLog(keyOfSetting, desc);
					}
				}
			}
    	}
		return result;		
	}

	private String interceptUserAction(ActionInvocation invocation) throws Exception {
    	String result = null;
		Object action = invocation.getAction();
		if (action instanceof UserAction) {
			String method = invocation.getProxy().getMethod();
			if (method.equals("addUser") || method.equals("updateUser")) {
				result = invocation.invoke();
				if (result == Action.SUCCESS) {
					UserAction userAction = (UserAction) action;
					String type = userAction.getText(keyOfUserType);
					String operation = null;
					Account user = userAction.getUser();
					if (user != null) {
						Integer id = user.getId();
						user = securityService.findAccount(id);
						if (user != null) {
							if (method.equals("addUser")) {
								operation = keyOfNew;
							} else {
								operation = keyOfUpdate;
							}
							String desc = getDescription(userAction, operation, type, Integer.toString(user.getId()),
									user.getName());
							saveLog(keyOfUser, desc);
						}
					}
				}
			} else if (method.equals("unRegisterUser")) {
				result = invocation.invoke();
				UserAction userAction = (UserAction) action;
				String type = userAction.getText(keyOfUserType);
				Account user = userAction.getUser();
				if (user != null) {								
					String operation = keyOfUnRegister;
					String desc = getDescription(userAction, operation, type, Integer.toString(user.getId()));
					saveLog(keyOfUser, desc);
				}				
			}
		} else if (action instanceof ChangePasswordAction) {
			String method = invocation.getProxy().getMethod();
			if (method.equals("changePassword") || method.equals("changePasswordByAdmin")) {
				result = invocation.invoke();
				if(result == Action.SUCCESS){
					ChangePasswordAction changePwdAction = (ChangePasswordAction) action;
					String operation = null;
					String desc = null;
					if (method.equals("changePassword")) {
						desc = changePwdAction.getText(keyOfChangePassword);
						saveLog(keyOfUser, desc);
					} else {
						operation = keyOfChangePasswordByAdmin;
						Account user = changePwdAction.getUser();
						if (user != null) {
							Integer id = user.getId();
							user = securityService.findAccount(id);
							if (user != null) {
								desc = getDescriptionForChangePassword(changePwdAction, operation,
										Integer.toString(user.getId()), user.getName());
								saveLog(keyOfUser, desc);
							}
						}
					}
				}    		
			}
    	}
		return result;		
	}

	private String interceptRoleAction(ActionInvocation invocation) throws Exception {
    	String result = null;
		Object action = invocation.getAction();
		if (action instanceof RoleAction) {
			String method = invocation.getProxy().getMethod();
			if (method.equals("save") || method.equals("update")) {
				result = invocation.invoke();
				if (result == Action.SUCCESS) {
					RoleAction roleAction = (RoleAction) action;
					String type = roleAction.getText(keyOfRoleType);
					String operation = null;
					Role role = roleAction.getRole();
					if (role != null && role.getId() != null) {
						if (method.equals("save")) {
							operation = keyOfNew;
						} else {
							operation = keyOfUpdate;
						}
						String desc = getDescription(roleAction, operation, type, Integer.toString(role.getId()),role.getName());
						saveLog(keyOfRole, desc);
					}
				}
			} else if (method.equals("delete")) {
				result = invocation.invoke();
				RoleAction roleAction = (RoleAction) action;
				String type = roleAction.getText(keyOfRoleType);
				Role role = roleAction.getRole();
				if (role != null) {								
					String operation = keyOfDelete;
					String desc = getDescription(roleAction, operation, type, Integer.toString(role.getId()));
					saveLog(keyOfRole, desc);
				}				
			}
		} 
		return result;		
	}
	
	private String interceptLogAction(ActionInvocation invocation) throws Exception {
    	String result = null;
		Object action = invocation.getAction();
		if(action instanceof OperationLogAction){    		
    		String method = invocation.getProxy().getMethod();
    		if(method.equals("export") || method.equals("delete")){
    			result = invocation.invoke();
    			OperationLogAction logAction = (OperationLogAction)action;
    			String type = logAction.getText(keyOfLogType);
    			String operation = null;       			
				if (method.equals("export")) {
					operation = keyOfExport;				
				} else {
					operation = keyOfDelete;
				}		
				String 	desc = getDescription(logAction, operation, type);
    			saveLog(keyOfLog, desc);
    		}  
    	}
		return result;
	}
}
