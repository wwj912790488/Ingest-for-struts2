<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<style type="text/css">
	#TaskTitleRow td{
		border-left: 1px solid #dddddd;
	}
</style>

<form id="TaskForm" class="TaskForm">
	<input type="hidden" id="TaskStatus" value="<s:property value="status" />" />
	<input type="hidden" id="TaskName" value="<s:property value="name" />" />
	<table id="TaskTitleRow" class="RowLine TableItemText">
		<tr style="height:46px" valign="middle">
			<td class="TaskListCol_0" valign="middle">
				<input type="checkbox" id="taskChk" name="taskChk" value="${task.id}" onclick="TL_CHK_OnSelect(this)" />
			</td>
			<td class="TaskListCol_Id MouseHover TaskMenuTrigger" valign="middle">
				<a target="_blank" href="frameDownloadTaskData?taskId=${id}"><span>${id}</span></a>
			</td>
			<td class="TaskListCol_Exp MouseHover" valign="middle" >
				<img id="ExpandIcon" src="images/icons/arrow_right.png" alt="" />
			</td>
			<td class="TaskListCol_Icon MouseHover" valign="middle">
			</td>
			<td class="TaskListCol_Name MouseHover TaskMenuTrigger" style="border-left: 0px" title="<s:property value="name" />" >
				<s:property value="name" />
				<s:if test="#task.recordId != null">
				<br/>(<s:text name="homepage.navigation.record"/>: ${task.recordId})
				</s:if>
			</td>
			<td id="TaskOutputStat" class="TaskListCol_Outputs MouseHover TaskMenuTrigger OutputConnectedNA">
				${task.totalOutputGroupCount} (${task.totalOutputCount})
			</td>
			<td class="TaskListCol_Progress MouseHover TaskMenuTrigger">	
				<div id="M" class="ProgressBarN">
					<div id="O" class="ProgressBarProgress"></div>				
					<div id="T" class="ProgressBarCaption">						
						<span id="TaskStatusDesc" class="ProgressBarText TaskStatusDesc">
							<s:text name="taskstatus.%{status.toString().toLowerCase()}"/>
						</span> 
						<!--  
						<div id="TaskErrorDetailDrop" class="ui-icon ui-icon-triangle-down TaskErrorDetailDrop" onclick="openTaskDeteailErrorDlg('${task.id}')">
							<div id="TaskErrorDetail" class="TaskErrorDetail"></div>
						</div>
						-->
					</div>
				</div>
			</td>
			<td class="TaskListCol_StartTime MouseHover TaskMenuTrigger">
				<span id="TaskStartAt" class="TaskStartAt">
					<s:date name="startedAt" format="yyyy-MM-dd HH:mm:ss"/>
				</span>
			</td>
			<td class="TaskListCol_EndTime MouseHover TaskMenuTrigger">
				<span id="TaskEndAt" class="TaskEndAt">
					<s:date name="completedAt" format="yyyy-MM-dd HH:mm:ss"/>
				</span>
			</td>
			<td class="TaskListCol_Signal MouseHover TaskMenuTrigger">
				<s:if test="switchModes[id] != null">
					<span id="SignalSwitchMode">${switchModes[task.id]}</span>
					<span id="SignalState">- - -</span>
				</s:if>
			</td>
			<td class="TaskListCol_Power MouseHover TaskMenuTrigger" >				
				<span class="TaskPower"><span id="TaskServer" class="TaskPowerVal"></span></span>
			</td>
		</tr>
	</table>
	
</form>