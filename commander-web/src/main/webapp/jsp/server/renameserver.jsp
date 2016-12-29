<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="dialog_rename" style="display: none">
	<div class="template_title">
		<s:text name="rename"/>
	</div>
	<div class="template_content">
		<div style="height: 90px; line-height: 30px">
			<form id="rename_form" method="post" action="renameServer.action" onsubmit="return false">
			<input type="hidden" name="id" value="<s:property value='id' />" />
			<div><s:text name="server.rename.input" /></div>
			<input style="width: 98%" type="text" name="newName"/>
			<div class="alert" style="color:red; display: none"></div>
			</form>
		</div>
	</div>
	<div class="template_button">
		<input type="button" id="btnOk" value="<s:text name='msg.ok'/>" />
		<input type="button" id="btnCancel" value="<s:text name='msg.cancel'/>" />
	</div>
</div>
