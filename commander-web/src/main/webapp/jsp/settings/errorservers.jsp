<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:if test="errorList.size() > 0">
<div class="group_title">
	<div class="left">
		<div class="group_icon icon_detail_close"></div>
		(${errorList.size()})
		<s:text name="server.setting.error.servers"/>:
	</div>
</div>
<div class="group_detail">
	<s:iterator value="errorList" var="serverData">
	<div>
		<div class="left">${serverData.server.name} (${serverData.server.ip})</div>
		<div class="left field_space"></div>
		<div class="left">${serverData.data.message}</div>
	</div>
	<div class="clear"></div>
	</s:iterator>
</div>
<div class="clear"></div>
</s:if>
