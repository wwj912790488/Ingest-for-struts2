<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %>
<base href="<%=urlbase%>/" />

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Task View</title>
<link href="style/UIStyle.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/uictrl.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/incTaskView.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/TaskView2.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/LiveSetting.css?<%=rnd%>" rel="stylesheet" type="text/css" />

<script src="js/common/jquery.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/common/util.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/inc/incTaskView.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/task/LiveSetting.js?<%=rnd%>" type="text/javascript" ></script>
<style type="text/css">

</style>
<script type="text/javascript">
	function MI_SelectAll(isSelectAll){
		var arr = new Array();
		uFindNodeArray(arr,document.frm, function(n){
				return n.getAttribute('name')=='motionIconId' && n.getAttribute('disabled')==null;
			},true);
		
		for(var i=0;i<arr.length;i++){
			arr[i].checked = isSelectAll;
		}
	}
	
	function onReady() {
		LS_Init();
	};
</script>
<s:set value="%{getText('button.label.apply')}" name="Apply" scope="page"/>
<s:set value="%{getText('button.label.reset')}" name="Reset" scope="page"/>
</head>

<body onload="onReady()">
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="../include/top.jsp" %>
	
	<div style="position:relative;left:0px;top:0px;height:45px;text-align:center;line-height:45px;font-size:12pt;" ><span>直播控制</span></div>
		
	<div id="SubContainer" class="ContentArea SubCT">
		<div class="TaskGroupsPanel">
			<div id="TaskGroupList" class="TaskGroupList">
				<%@ include file="TaskGroupList.jsp" %>
			</div>
			<div class="AddNewGroupPanel">
				<form name="frm1" method="post" action="addTaskGroup">
					<div>
						<input type="text" name="groupName" value="" size="10" maxlength="32" required="required"/>					
					</div>
					<input type="submit" name="submit" value="新建组" />
				</form>
			</div>
		</div>
		<div class="BodyPanel">
			<div class="GroupInfoPanel">				
				<form name="frm2" method="post" action="renameTaskGroup?groupId=${groupId}">					
					<s:if test="groupId!=null && groupId!=0">
						<span><a href="javascript:LS_GroupRemoveTask('${groupId}')"> 任务从组移出 </a></span>				
						<span>
							<input type="text" name="groupName" value="${groupName}" size="30" maxlength="32" required="required"/>					
						</span>
						<input type="submit" name="submit" value="修改组名称" />
						<input type="button" name="delt" value="删除组" onclick="LS_DelGroup('${groupId}','${groupName}')"/>						
					</s:if>
					<s:else>
						<div class="TaskToGroupMenu" style="postion:relative;">
							<span class="Title">添加任务到组</span>
							<span class="MenuItems"> &gt;&gt;
								<s:iterator value="taskGroups" var="taskGroup" >
									<a class="MenuItem" href="javascript:LS_GroupAddTask('${taskGroup.id}')"><s:property value="name"/></a>
								</s:iterator>
							</span>
						</div>
					</s:else>
				</form>				
			</div>
			<div class="SettingPanel">
				<%@ include file="LiveSettingBody.jsp" %>
			</div>
		</div>
	</div>
	
	<div id="BottomArea" class="BottomArea"><%@ include file="../include/bottom.jsp" %></div>
</body>
</html>