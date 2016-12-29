<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Task" style="background-color: #fff">
	<form action="FramesaveProfile" method="post">
	<input type="hidden" name="PageName" value="ProfileBody"/>
	<input type="hidden" id="ActionType" name="profileAction" value="<s:property value="[0].profileAction" />"/>
	<input type="hidden" name="Id" value="<s:property value="[0].liveProfile.id" />"/>
	<input type="hidden" name="fromUri" class="FromUri" value="<s:property value="[0].fromUri" />"/>
	<div class="TitleHeadSpacing"></div>
	<div class="FieldError">
		<s:iterator value="fieldErrors" var="fieldError">
			<s:iterator value="value" var="errorMessage">
				<div class="FieldErrorText">
       				<s:property value="errorMessage"/> 
				</div>
			</s:iterator>
		</s:iterator>
	</div>
	<s:include value="/jsp/pattern2/task/taskhead.jsp"/>
	<div class="task_head_bottom"></div>
	<s:include value="/jsp/pattern2/task/TaskTab.jsp"/>
	<div style="height: 14px"></div>
	<table>
		<tr>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
			<td>
				<s:include value="/jsp/pattern2/task/TaskBaseInfo.jsp"/>
				<s:include value="/jsp/pattern2/template/input/InputSetting.jsp"/>
				<s:include value="/jsp/pattern2/template/output/StreamSetting.jsp"/>
				<s:include value="/jsp/pattern2/template/output/OutputSetting.jsp"/>
			</td>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<s:include value="/jsp/pattern2/task/taskbottom.jsp"/>
	</form>
</div>