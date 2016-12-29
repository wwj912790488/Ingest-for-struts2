<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul id="ProfileListData" style="display:none">
	<s:iterator value="[0].allLiveProfiles" status="status">
		<li>
			<div><s:property value="[0].name" /></div><!-- value -->
			<div><s:property value="[0].id" /></div><!-- key -->
		</li>	
	</s:iterator>	
</ul>