<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul id="TaskListData">
	<s:iterator value="[0].tasks" status="status">
		<li class="task">
			<div class="id"><s:property value="[0].id" /></div><!-- key -->
			<div class="name"><s:property value="[0].name" /></div><!-- value -->
		</li>	
	</s:iterator>	
</ul>