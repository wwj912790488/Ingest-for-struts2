<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul class="ifaces">
	<s:iterator value="[0].getIfacesMap()" status="status">
	<li >
		<div id="eth"><s:property value="[0].key"/></div>
		<div id="ip"><s:property value="[0].value"/></div>
	</li>
	</s:iterator>
</ul>
