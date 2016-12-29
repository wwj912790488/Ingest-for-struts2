<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TaskTabContent TaskTabInput Hide">
	<div class="task_tab_content">
	<s:include value="/jsp/pattern2/task/TaskBeforeInput.jsp"/>
	<div class="InputFlock">
		<s:iterator value="[0].getInputs()" status="status" var="theInput">
		<s:include value="/jsp/pattern2/template/input/runtime/Input.jsp"/>
		</s:iterator>
	</div>
	</div>
</div>
