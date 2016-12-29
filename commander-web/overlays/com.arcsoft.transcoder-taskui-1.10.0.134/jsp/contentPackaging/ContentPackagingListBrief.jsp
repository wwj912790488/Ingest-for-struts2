<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ContentPackagingList">
	<ul>
		<s:iterator value="[0].contentPackagings" status="status">
		<li class="ContentPackagingItem">
			<div class="id"><s:property value="[0].id" /></div>
			<div class="name"><s:property value="[0].name" /></div>
		</li>
		</s:iterator>
	</ul>
</div>
