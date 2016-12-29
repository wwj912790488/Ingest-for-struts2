<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp" %>

<div class="template_title">
	<s:text name="channel.title.edit" />
</div>
<div class="template_content">
	<form id="channelForm">
		<s:hidden name="channel.id"/>
		<center><s:text name="channel.name"/> <s:textfield name="channel.name" cssStyle="width: 200px"/></center>
	</form>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons">
		<table align="center">
		<tr>
			<td><input type="button" id="btnOk" value="<s:text name='msg.ok'/>" /></td>
			<td class="td_space"></td>
			<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
		<tr>
		</table>
	</div>
</div>
