<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul id="GroupListData" style="display:none">
	<s:iterator value="serverGroups" status="status">
		<li>
			<div><s:property value="name" /></div><!-- value -->
			<div><s:property value="id" /></div><!-- key -->
		</li>	
	</s:iterator>	
</ul>