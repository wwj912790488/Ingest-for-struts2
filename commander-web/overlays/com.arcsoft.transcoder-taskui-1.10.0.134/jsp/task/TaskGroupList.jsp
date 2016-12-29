<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TaskGroup-0" class="TaskGroup">
	<s:if test="groupId!=0"><a href="liveSetting?groupId=0"></s:if>
		<!--<s:text name="TaskGroup.0" />-->全部任务
	<s:if test="groupId!=0"></a></s:if>
</div>
<s:iterator value="taskGroups" var="taskGroup" >
<div id="TaskGroup-${taskGroup.id}" class="TaskGroup">
	<s:if test="id!=groupId"><a href="liveSetting?groupId=${taskGroup.id}"></s:if>
		<s:property value="name"/>
	<s:if test="id!=groupId"></a></s:if>
</div>
</s:iterator>


