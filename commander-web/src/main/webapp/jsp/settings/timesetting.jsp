<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/plugin/My97DatePicker/WdatePicker.js");
jspContext.addJSRef("js/settings/timesetting.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<style>
#tbl td ntpServer {
	width: 200px;
}

#tbl td ntpPrefer {
	width: 15px;
}
</style>
<script type="text/javascript">
<!--
	var msgTitle = "<s:text name="msg.dialog.title.warning" />";
	var txtNTPServer = "<s:text name="server.setting.ntp.server"/>";
	var msgEmptyServer = "<s:text name='msg.error.ntp.server.empty' />"	
	var msgInvalidServer = "<s:text name='msg.error.ntp.server.invalid' />"
	var msgExistingServer = "<s:text name='msg.error.ntp.server.existed' />"
	var msgEmptyDate = "<s:text name='msg.error.date.empty' />"
	var timeSetting = new TimeSetting();

	$(function(){		
		timeSetting.init();
	});

//-->
</script>

<div id="timePanel">
	<form>
	<input type="hidden" id="id" value="<s:property value='id' />" />
	<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />
	<table id="tbl">
	<!--
	<tr id="timezonePanel">	
		<td class="timeLabel"><s:text name="server.setting.timezone" />:</td>
	
		<%--
		<s:select name="" list="%{#{-1:'--select--'}}">  
		  <s:optgroup label="group1" list="%{#{1:'item1',2:'item2'}}"></s:optgroup>  
		  <s:optgroup label="groupp2" list="%{#{3:'item3',4:'item4'}}"></s:optgroup>  
		</s:select> 
		--%>
		<td colspan="2"> 
		<select id="zoneSelector" name="timezone">  
			<s:iterator value="zones">
				<optgroup label="<s:property value='key' />">				
					<s:iterator value="value" var="sub">
						<s:if test="#sub == timezone">
							<option selected><s:property /></option>
						</s:if>
						<s:else>
							<option><s:property /></option>
						</s:else>
					</s:iterator>				 
				</optgroup >  
			</s:iterator>
		</select> 	
		</td>
	</tr>
	-->
	
	<tr id="methodPanel">
		<td class="timeLabel"><s:text name="server.setting.time" />:</td>
		<td colspan=3>
			<s:if test="ntpStatus.isServiceOn">
				<s:radio id="rdSync" name="ntpStatus.isServiceOn" list="#{true:getText('server.setting.time.sync.ntp'), false:getText('server.setting.time.manual.set')}" />
			</s:if>
			<s:else>
				<s:radio id="rdSync" name="ntpStatus.isServiceOn" list="#{true:getText('server.setting.time.sync.ntp'), false:getText('server.setting.time.manual.set')}" value="false"/>
			</s:else>
		</td>	
	</tr>
	
	<tr class="ntpPanelTitle" style="display:none">
		<td class="timeLabel"></td>
		<td class="ntpServer"><s:text name="server.setting.ntp.server"/></td>
		<td class="ntpPrefer"><s:text name="server.setting.ntp.prefer"/></td>
		<td></td>
	</tr>
		
	<s:iterator value="ntpStatus.ntpServers" var="ntpServer" status="st">
	<tr class="ntpPanel" style="display:none">
		<td class="timeLabel"></td>
		<s:set name="strs" value="#ntpServer.split('\\\\s+')" />
		<s:if test="#strs.length==1">
			<td class="ntpServer"><s:property value="#ntpServer"/></td>
			<td class="ntpPrefer"><input type="radio" name="ntpPrefer" ></td>
		</s:if>
		<s:else>
			<s:iterator value="#strs" var="_str" status="st1">
				<s:if test="#st1.index==0">
				<td class="ntpServer"><s:property value="_str"/></td>
				</s:if>
				<s:if test="#st1.index==1">
					<s:if test="#_str=='prefer'">
					<td class="ntpPrefer"><input type="radio" name="ntpPrefer" checked="checked"></td>
					</s:if>
					<s:else>
					<td class="ntpPrefer"><input type="radio" name="ntpPrefer" ></td>
					</s:else>
				</s:if>
			</s:iterator>
		</s:else>
		<td class="deleteBtn" align="center"><a class="deleteBtn"></a></td>
	</tr>
	</s:iterator>
	<tr id="trAdd" class="ntpPanelAdd" style="display:none">
		<td class="timeLabel"><s:text name="server.setting.ntp.server"/>:</td>
		<td><input id="inputNTP" type="text" value="" /></td>
		<td colspan=2><button type="button" id="btnAdd"><s:text name="server.network.add" /></button></td>
	<tr>
	
	<tr class="manualPanel" style="display:none"> 
		<td class="timeLabel"><s:text name="server.setting.date" />:</td>
		<td><input id="calander" class="Wdate" type="text" onclick="WdatePicker()"></td>			
	</tr>
	<!--
	<tr class="manualPanel" style="display:none"> 
		<td class="timeLabel"><<s:text name="server.setting.time.name" />:</td>
		<td><select id="hour"></select>
		<select id="minute"></select>
		<select id="second"></select>
		</td>
	</tr>
	-->
	</table>	
	<div id="btnPanel">
		<button id="btnSave" type="button"><s:text name='common.save' /></button>
	</div>
	</form>
</div>
