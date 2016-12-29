<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul id="CategoryListData" style="display:none">
	<s:iterator value="[0].allPresetCategories" status="status">
		<li>
			<div><s:property value="[0].name" /></div><!-- value -->
			<div><s:property value="[0].name" /></div><!-- key -->
		</li>
	</s:iterator>	
</ul>