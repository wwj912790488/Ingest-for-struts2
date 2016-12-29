<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="MaterialList">
	<ul>
		<s:iterator value="[0].materials" status="status">
		<li class="MaterialItem">
			<div class="id"><s:property value="[0].id"/></div>
			<div class="name"><s:property value="[0].name" /></div>
			<div class="materialType"><s:property value="[0].materialType" /></div>
			<div class="content"><s:property value="[0].content" /></div>
		</li>
		</s:iterator>
	</ul>
</div>
