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
<link href="style/TaskDetail.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/TaskView2.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/MotionIcon.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<script src="js/common/jquery.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/common/util.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/inc/incTaskView.js?<%=rnd%>" type="text/javascript" ></script>
<style type="text/css">
	.list2columns .row .lbl{
		width:20%;
		padding:20px;
	}
	.list2columns .row .val{
		width:80%;
		padding:20px;
	}
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
</script>
<s:set value="%{getText('button.label.apply')}" name="Apply" scope="page"/>
<s:set value="%{getText('button.label.reset')}" name="Reset" scope="page"/>
</head>

<body>
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="../include/top.jsp" %>
	
	<div style="position:relative;left:0px;top:0px;height:45px;visibility:hidden" ></div>
		
	<div id="SubContainer" class="ContentArea ContentPos">
		<form name="frm" method="post" action="motionIconSetting?flag=save">		
			<div style="color:#000000;line-height:30px;" class="BodyTitleBar TaskHeadText">
				<s:text name="tl.motionicon" />					
				<span style="float:right">
					<input type="checkbox" name="selectAll" value="1" onchange="MI_SelectAll(this.checked)"/>
					<s:text name="label.selectAll"/>
				</span>	
			</div>
			<div class="BodyMain" style="padding:20px;">
				<s:iterator value="runningTasks" var="task" >	
					<div class="TaskEntry">
						<div class="TaskTitle">
							<span class="TaskId">${task.id} - </span>
							<span class="TaskName"><s:property value="name"/></span>
						</div>					
						<div class="TaskMotionIconPanel">
							<s:iterator value="videoSettingItems" var="vsi" >
								<div>
									<div><%@include file="../common/VideoSettingOneLine.jsp" %></div>
									<s:iterator value="motionIcons" var="mi" >
										<div class="MotionIcon">
											<s:set value="getMotionIconStatus(#task.id,#mi)==0" name="checked" scope="request"/>
											<input type="hidden" name="motionIconIdAll" value="${task.id}-${mi.id}_${mi.isCtrlAllowed()?'y':'n'}-${checked?'y':'n'}" />											
											<input type="checkbox" name="motionIconId" value="${task.id}-${mi.id}" ${checked?'checked="checked"':''} ${mi.isCtrlAllowed()?'':'disabled="disabled"'}/>
											[${mi.id}]<s:property value="name"/> - <s:property value="path"/>
											<span style="float:right;color:red;"><s:property value="errMsg"/></span>	
											<span style="float:right;display:inline-block;margin-left:15px;width:12px;height:12px;" class="${checked?'MotionIconOn':'MotionIconOff' }"></span>										
										</div>
									</s:iterator>
								</div>
							</s:iterator>
						</div>					
					</div>
				</s:iterator>
			</div>
			<div style="margin:10px;text-align:center;">
				<!--  <input type="reset" name="reset" value="${Reset}"/> -->
				<input type="submit" name="submit" value="${Apply}"/>				
			</div>
		</form>
	</div>
	
	<div id="BottomArea" class="BottomArea"><%@ include file="../include/bottom.jsp" %></div>
</body>
</html>