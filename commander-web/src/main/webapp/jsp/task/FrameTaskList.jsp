<%@page import="com.opensymphony.xwork2.ActionContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.web4transcoder.type.TaskStatus" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix='sec' uri='http://www.springframework.org/security/tags' %>
<%@ include file="/jsp/include/jsonheader.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %>
<base href="<%=urlbase%>/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"  />
<title>Task List</title>

<%
jspContext.addCssRef("css/common.css");
jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/uictrl.css");
jspContext.addCssRef("style/MultiLineTabGray.css");
jspContext.addCssRef("style/PopupMenu.css");
jspContext.addCssRef("style/TaskDetail.css");
jspContext.addCssRef("style/TaskList.css");
%>
<s:include value="/jsp/include/LicenseData.jsp"/>
<%
jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/mediainfo.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/String_" + ActionContext.getContext().getLocale().getLanguage() + ".js");
jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/controls/MultiLineTab.js");
jspContext.addJSRef("js/controls/ImportContent.js");
jspContext.addJSRef("js/template/output/OutputGroupData.js");
jspContext.addJSRef("js/task/FrameTaskList.js");
jspContext.addJSRef("js/ajaxfileupload.js");
jspContext.addJSRef("js/common.js");
jspContext.addJSRef("js/task/taskexport.js");
jspContext.addJSRef("js/task/taskimport.js");
jspContext.addJSRef("js/task/taskruntimesetting.js");
%>

<script type="text/javascript">	
	var TASKSTATUS = {
			 PENDING		:"<%=TaskStatus.PENDING.getKey()%>",
			 WAITING		:"<%=TaskStatus.WAITING.getKey()%>",
			 RUNNING		:"<%=TaskStatus.RUNNING.getKey()%>",
			 SUSPENDED		:"<%=TaskStatus.SUSPENDED.getKey()%>",
			 COMPLETED		:"<%=TaskStatus.COMPLETED.getKey()%>",
			 CANCELLED		:"<%=TaskStatus.CANCELLED.getKey()%>",
			 ERROR			:"<%=TaskStatus.ERROR.getKey()%>",
			 STOPPING		:"<%=TaskStatus.STOPPING.getKey()%>",
			 DOWNLOADING	:"<%=TaskStatus.DOWNLOADING.getKey()%>"
	};
	
	var TASKSTATUSDESC = {
			 TL_STATUS_LABEL_PENDING		:"<s:text name="taskstatus.pending" />",
			 TL_STATUS_LABEL_WAITING		:"<s:text name="taskstatus.waiting" />",
			 TL_STATUS_LABEL_RUNNING		:"<s:text name="taskstatus.running" />",
			 TL_STATUS_LABEL_SUSPENDED		:"<s:text name="taskstatus.suspended" />",
			 TL_STATUS_LABEL_COMPLETED		:"<s:text name="taskstatus.completed" />",
			 TL_STATUS_LABEL_CANCELLED		:"<s:text name="taskstatus.cancelled" />",
			 TL_STATUS_LABEL_ERROR			:"<s:text name="taskstatus.error" />",
			 TL_STATUS_LABEL_STOPPING		:"<s:text name="taskstatus.stopping" />",
			 TL_STATUS_LABEL_DOWNLOADING 	:"...",
			 TL_STATUS_LABEL_STARTED		:"<s:text name="taskstatus.started" />"
	};
	
	var SIGNALMODES = {
			SIGNAL_MODE_0	:	"<s:text name="source.signal.mode.0" />",
			SIGNAL_MODE_1	:	"<s:text name="source.signal.mode.1" />",
			SIGNAL_MODE_2	:	"<s:text name="source.signal.mode.2" />",
			SIGNAL_MODE_3	:	"<s:text name="source.signal.mode.3" />"
	};
	
	var MSG = {
			select_a_task	:	'<s:text name="msg.select_a_task" />',
			is_del_task		:	'<s:text name="msg.is_del_task" />',
			is_export_tasks	:	'<s:text name="msg.is_export_tasks" />',
			is_stop_task	:	'<s:text name="msg.is_stop_task" />',
			count_task_select : '<s:text name="msg.count_task_select"/>',
			import_tasks 	: '<s:text name="title.importTasks"/>',
			only_one_super_task_allowed : '<s:text name="msg.only_one_super_task_allowed"/>',
			start_super_task_warning    : '<s:text name="msg.start_super_task_warning" />',
			filter_all : '<s:text name="filter.all"/>'
	};
	
	//TL js context
	var cxtTL = {			
			waittingIconSrc : "images/icons/doing.gif" ,
			iconDownSrc 	: "images/icons/arrow_down.png" ,
			iconRightSrc	: "images/icons/arrow_right.png",
			iconDownWSrc 	: "images/icons/arrow_white_down.png" ,
			iconRightWSrc	: "images/icons/arrow_white_right.png",
			iconStreamingSrc: "images/icons/process.gif",
			TaskStatus		: TASKSTATUS,
			TaskStatusDesc	: TASKSTATUSDESC,
			SignalModes		: SIGNALMODES,
			msg				: MSG,
			taskOutTabs		: new Array(),
			showTranscodingTime : "<s:property value='getLimitation("SHOW_TRANSCODING_TIME")=="1"'/>"
	};

	function canncelActionPanel(){
		TL_SelectAll(false);
	}
	
	function doFilter(taskFilter){
		window.location.href='frameListTask?filter=' + taskFilter;
	}

	var isDropDownMenuShow = false;
	var pageControl = null;

	function refreshPage() {
		pageControl.refresh();
	}

	//init on document ready
	function onReady() {
		pageControl = $.pagination({
			"method" : "get",
			"data" : {
				"taskQuery.taskId" : $("#queryForm #taskId").val(),
				"taskQuery.name" : $("#queryForm #name").val(),
				"taskQuery.serverId" : '<s:property value="taskQuery.serverId"/>',
				"taskQuery.groupId" : $("#queryForm #group").val(),
				"taskQuery.status" : $("#queryForm #status").val()
			}
		});
		TL_Init(cxtTL);
		$("#btnQuery").click(function(){
			var taskId = $("#queryForm #taskId").val();
			if (taskId != "" && !/^[0-9]+$/.test(taskId.trim())) {
				$("#queryForm #taskId").addClass("field_input_error").focus();
				return;
			}
			$("#queryForm").submit();
		});
		
		$("#queryForm #group").change(function(){
			var groupId = $(this).val();
			$.post("getServers", {"group.id" : groupId}, function(data){
				if(data){
					if(data.actionErrors != null && data.actionErrors.length > 0){
						alert(data.actionErrors[0]);
					}else{
						appendToSelect(data.serverIdNamePair, $("#queryForm #server"));
					}
				}
			});
		});
		var groupId = '<s:property value="taskQuery.groupId" />';
		if(groupId && groupId !=''){
			$("#queryForm #group").val(groupId);
		}
		$("#queryForm #group").trigger("change");
		
	};

	var serverId = '<s:property value="taskQuery.serverId" />';
	function appendToSelect(jsonObj, selectObj){
		selectObj.empty();//clear child option first
		var firstOption = "<option value=''>"+ MSG.filter_all +"</option>";
		selectObj.append(firstOption);
		if(jsonObj != null){
			$.each(jsonObj, function(k, v){
				var selected = k == serverId ? "selected=selected" : "";
				selectObj.append("<option value='"+ k +"' "+ selected +">"+v+"</option>");
			});
		}
	}
		
</script>
<!-- replace common.css's font style -->
<style type="text/css">
html, body{
	overflow: hidden;
}
.Task {
	width: 100%;
}
.Task *{
	font-size: 9pt;
}
.ProgressBarR{
	background: url("");
}
#filterPanel > span{
	margin-right: 5px;
	vertical-align: middle;
}
#filterPanel .div_input_search{
	display : inline-block;
	background: url('images/security/search_bg.png') no-repeat;
	padding: 1px 1px 1px 2px;
	height: 26px;
	width: 167px;
	position: relative;
	bottom: 1px;
}
#filterPanel .div_input_search input{
	width: 166px;
	background-color: transparent;
	border: 0;
	height: 24px;
	padding: 0 0;
	line-height: 24px;
}
.tab_header td{
	background-color: #f0f3f6;
	border-left: 1px solid #dddddd;
	border-bottom: 1px solid #dddddd;
}

</style>
<s:set name="showStartAsSuperTask" value='[0].getLimitation("PRODUCT_QUICK_TRANSCODING")=="1"' scope="request" />
<s:set name="showTranscodingPower" value='[0].getLimitation("PRODUCT_SHOWING_SPEED")=="1"' scope="request" />
</head>
<%
	//debug usage
	if("core".equalsIgnoreCase((String)request.getParameter("debug"))){
		request.setAttribute("showStartAsSuperTask", Boolean.TRUE);
		request.setAttribute("showTranscodingPower", Boolean.TRUE);
	}else if("live".equalsIgnoreCase((String)request.getParameter("debug"))){
		request.setAttribute("showStartAsSuperTask", Boolean.FALSE);
		request.setAttribute("showTranscodingPower", Boolean.FALSE);
	}
	
	String filter = (String)request.getAttribute("filter");	
%>
<body>
	<input type="hidden" id="filterQuery" value="<%=filter%>"/>
	<input type="hidden" id="curServerId" value="<s:property value="curServerId"/>"/>
	<div class="list_view_header ContentPos" style="background: transparent;background-color: #fafafa;">
		<div id="FilterPanel" class="ActionBarText cm_operatebar" style="background: transparent;">
			<form id="queryForm" method="post" action="frameListTask.action">
			<table class="ContentPos">
				<tr>
					<td>
						<div id="filterPanel">
							<span>
								<label for="group"><s:text name="task.filter.group.name"/>:</label>
								<select name="taskQuery.groupId" id="group" style="width: 100px">
									<option value=""><s:text name="filter.all"></s:text></option>
									<s:iterator value="serverGroups">
										<option value="<s:property value="id"/>"
										<s:if test="id == taskQuery.groupId">selected="selected"</s:if> >
											<s:property value="name"/>
										</option>
									</s:iterator>
								</select>
							</span>
							<span>
								<label for="server"><s:text name="task.filter.server"/>:</label>
								<select name="taskQuery.serverId" id="server" style="width: 100px">
								</select>
							</span>
							<span>
								<label for="status"><s:text name="task.filter.status"/>:</label>
								<select name="taskQuery.status" id="status">
									<option value=""><s:text name="filter.all" /></option>
									<option value="<s:property value="@com.arcsoft.web4transcoder.type.TaskStatus@RUNNING.getKey()"/>" 
									<s:if test="taskQuery.status == 'RUNNING'">selected="selected"</s:if> >
										<s:text name="filter.running" />
									</option>
									<option value="<s:property value="@com.arcsoft.web4transcoder.type.TaskStatus@WAITING.getKey()"/>"
									<s:if test="taskQuery.status == 'WAITING'">selected="selected"</s:if> >
										<s:text name="filter.waiting" />
									</option>
									<option value="<s:property value="@com.arcsoft.web4transcoder.type.TaskStatus@PENDING.getKey()"/>"
									<s:if test="taskQuery.status == 'PENDING'">selected="selected"</s:if> >
										<s:text name="filter.pending" />
									</option>
									<option value="<s:property value="@com.arcsoft.web4transcoder.type.TaskStatus@COMPLETED.getKey()"/>"
									<s:if test="taskQuery.status == 'COMPLETED'">selected="selected"</s:if> >
										<s:text name="filter.completed" />
									</option>
									<option value="<s:property value="@com.arcsoft.web4transcoder.type.TaskStatus@ERROR.getKey()"/>"
									<s:if test="taskQuery.status == 'ERROR'">selected="selected"</s:if> >
										<s:text name="filter.error" />
									</option>
									<option value="<s:property value="@com.arcsoft.web4transcoder.type.TaskStatus@CANCELLED.getKey()"/>"
									<s:if test="taskQuery.status == 'CANCELLED'">selected="selected"</s:if> >
										<s:text name="filter.cancelled" />
									</option>
								</select>
							</span>
							<span>
								<label for="name"><s:text name="taskcol.id"/>:</label>
								<input type="text" name="taskQuery.taskId" id="taskId" value="<s:property value="taskQuery.taskId"/>" style="width: 80px"/>
							</span>
							<span>
								<label for="name"><s:text name="task.filter.name"/>:</label>
								<input type="text" name="taskQuery.name" id="name" value="<s:property value="taskQuery.name"/>" style="width: 120px"/>
							</span>
						</div>
					</td>
					<td style="width: 100px">
						<span class="action_normal_btns">
							<a id="btnQuery">
								<span class="cntv_btn_left"></span>
									<span class="cntv_btn_middle"><p><s:text name="action.query" /></p></span>
								<span class="cntv_btn_right"></span>
							</a>
						</span>
					</td>
				</tr>
			</table>
			</form>
		</div> 
		<div id="TableHeadContainer" class="ContentPos" style="border:0px;height:80px;" >
			<form name="frmTableHead">								
				<div id="TaskActionPanel" class="cm_actionbar">
				<div id="ActionBarHint" class="ActionBarHint" style="display: none;"></div>
					<%--<sec:authorize access="anonymous">--%>
					<div id="start" class="TaskActionBarItem ActionItemStart" style="padding-left:0px;margin-left: 20px;" >
						<span style="padding-left:30px;" onclick="TL_StartTasks()"><s:text name="action.start" /></span>
						<s:if test='#request.showStartAsSuperTask'>
						<div class="ActionBarDropDown ui-icon ui-icon-triangle-down" style="">
							<div class="DropMenu">
								<div class="DropMenuItem" onclick="TL_StartTasks('0')"> <s:text name="action.normalstart" /></div>
								<div class="DropMenuItem" onclick="TL_StartTasks('2')"> <s:text name="action.higheststart" /></div>
							</div>
						</div>
						</s:if>
					</div>
				    <div id="stop" class="TaskActionBarItem ActionItemStop" onclick="TL_StopTasks()"><s:text name="action.stop" /></div>
				    <%--</sec:authorize>--%>
				    <%--<sec:authorize access="anonymous">--%>
				    	<div id="delete" class="TaskActionBarItem ActionItemDelete" onclick="TL_DeleteTasks()"><s:text name="action.del" /></div>
				    <%--</sec:authorize>--%>
				    <div style="width: 100px; display: none" id="UpdateTaskListTrigger">
						<a href="javascript:window.location.reload()" style="color:#000">任务列表有更新</a>
					</div>
				</div>
				<div id="TaskListTableHead" class="TaskListTableHead">					
					<table class="tab_list">
				      <tr class="tab_header">
				      	<td class="TaskListCol_0">
				      		<span class="TaskListCol_0" style="display:inline-block;vertical-align:middle;">
				      			<input type="checkbox" name="taskChkAll" value="1" onclick="TL_SelectAll(this.checked)" />
							</span>
				      	</td>		      	
				        <td class="TaskListCol_Id"><p class="TableColTitleText"><s:text name="taskcol.id" /></p></td>
				        <td class="TaskListCol_Exp">&nbsp;</td>
				        <td class="TaskListCol_Icon"></td>
					<td class="TaskListCol_Name" style="border-left:0px;"><p class="TableColTitleText"><s:text name="taskcol.name" /></p></td>
				        <td class="TaskListCol_Outputs"><p class="TableColTitleText" ><s:text name="taskcol.num" /></p></td>	
				        <td class="TaskListCol_Progress"><p class="TableColTitleText" ><s:text name="task.filter.status"/></p></td>			        
				        <td class="TaskListCol_StartTime"><p class="TableColTitleText"><s:text name="taskcol.starttime" /></p></td>
				        <td class="TaskListCol_EndTime"><p class="TableColTitleText"><s:text name="taskcol.endtime" /></p></td>
				        <td class="TaskListCol_Duration" style="display: none;"><p class="TableColTitleText">耗时</p></td>
				        <td class="TaskListCol_Signal"><p class="TableColTitleText"><s:text name="taskcol.signal"/></p></td>
				        <td class="TaskListCol_Power">
				        	<p class="TableColTitleText" style="display: inline-block;"><s:text name="task.filter.server"/></p>
				        </td>
				      </tr>
				    </table>				   
				</div>				
			</form>
		</div>
	</div>	

	<div class="ContentArea list_view_content" style="margin-top: 9px;">
			<table border="0">

					<tr>
						<td style="width:auto;" onclick="canncelActionPanel()"></td>
						<td style="width:1024px;" valign="top">
							<input type="hidden" id="TaskCount" value="<s:property value='[0].allTaskCount'/>"/>
							<div id="taskListContainer" class="ListBody">
								<s:iterator value="tasks" var="task" status="status">
									<%@ include file="FrameTaskSummary.jsp" %>
								</s:iterator>
							</div>
						</td>
						<td style="width:auto;" onclick="canncelActionPanel()"></td>
					</tr>

			</table>
		<table border="0">
						<tr class="tab_header">
							<td class="TaskListCol_0">
				      		<span class="TaskListCol_0" style="display:inline-block;vertical-align:middle;">
				      			<input type="checkbox" name="taskChkAll" value="1" onclick="TL_SelectAll(this.checked)" />
							</span>
							</td>
							<td class="TaskListCol_Id"><p class="TableColTitleText"><s:text name="taskcol.id" /></p></td>
							<td class="TaskListCol_Exp">&nbsp;</td>
							<td class="TaskListCol_Icon"></td>
							<td class="TaskListCol_Name" style="border-left:0px;"><p class="TableColTitleText"><s:text name="taskcol.name" /></p></td>
							<td class="TaskListCol_Outputs"><p class="TableColTitleText" ><s:text name="taskcol.num" /></p></td>
							<td class="TaskListCol_Progress"><p class="TableColTitleText" ><s:text name="task.filter.status"/></p></td>
							<td class="TaskListCol_StartTime"><p class="TableColTitleText"><s:text name="taskcol.starttime" /></p></td>
							<td class="TaskListCol_EndTime"><p class="TableColTitleText"><s:text name="taskcol.endtime" /></p></td>
							<td class="TaskListCol_Duration" style="display: none;"><p class="TableColTitleText">耗时</p></td>
							<td class="TaskListCol_Signal"><p class="TableColTitleText"><s:text name="taskcol.signal"/></p></td>
							<td class="TaskListCol_Power"><p class="TableColTitleText" style="display: inline-block;"><s:text name="task.filter.server"/></p>
							</td>
						</tr>

			</table>
			<s:include value="/jsp/include/pager.jsp" />
	</div>
	
	<!-- used in control -->
	<div id="Control" class="Hide">
		<%@ include file="/jsp/controls/MultiLineTab.jsp"%>
		<%@ include file="/jsp/controls/DialogFrame.jsp"%>
		<%@ include file="/jsp/controls/ImportContent.jsp"%>
	</div>
	<div id="TaskErrorDlg" style="display:none"></div>

	<!-- on document ready -->
	<script language="javascript">$(onReady);</script>
</body>
</html>