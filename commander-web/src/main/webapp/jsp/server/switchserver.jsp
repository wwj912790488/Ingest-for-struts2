<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="dialog_switchserver" style="display: none">
	<div class="template_title">
		<s:text name="switch"/>
	</div>
	<div class="template_content">
		<div style="height: 90px; line-height: 30px">
			<form id="switchserver_form" method="post" action="switchServer.action" onsubmit="return false">
			<input type="hidden" name="id" value="<s:property value='id' />" />
			<div><s:text name="switch.select.backup" /></div>
			<select style="width: 98%" name="backupServerId">
				<s:iterator value="group.servers" var="server">	
					<s:if test="#server.backup">
						<option value=<s:property value="#server.id" />>
							<s:property value="#server.name" />
						</option>
					</s:if>	
				</s:iterator>
			</select>
			</form>
		</div>
	</div>
	<div class="template_button">
		<input type="button" id="btnOk" value="<s:text name='msg.ok'/>" />
		<input type="button" id="btnCancel" value="<s:text name='msg.cancel'/>" />
	</div>
</div>
