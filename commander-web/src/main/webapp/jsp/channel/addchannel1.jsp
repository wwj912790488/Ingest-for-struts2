<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp" %>

<div class="template_title">
	<s:text name="channel.title.add" />
</div>
<div class="template_content">
	<form id="channelForm">
		<div style="height: 30px">
			<s:text name="source.input.type.text"/>
			<select id="sourceinputtype" name="sourceinputtype">
				<option value="Network">Network</option>
				<option value="SDI">SDI</option>
				<option value="ASI">ASI</option>
			</select>
			<div id="channeluriarea" style="display: inline-block;">
				<s:text name="server.group.name" />
				<s:select name="channel.group.id" id="channel.group.id"
						  list="groups" listKey="id" listValue="name"
						  headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
				<s:text name="channel.uri" />
				<input type="text" name="channelUri"/>
			</div>
			<div id="sdiinputtypearea" style="display: inline-block;">
			<label for="server"><s:text name="task.filter.server"/></label>
			<select name="server" id="server" style="width: 100px">
			</select>
			<s:text name="source.input.type.SDI.port"/>
			<select name="source.input.sdi.port">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select>
			</div>
			<div id="asiinputtypearea" style="display: inline-block;">
				<label for="server"><s:text name="task.filter.server"/></label>
				<select name="server" id="server" style="width: 100px">
				</select>
				<s:text name="source.input.type.ASI.port"/>
				<select name="source.input.asi.port">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
			</div>
			<input type="button" id="btnScan" value="<s:text name="channel.scan" />"/>
			<input type="checkbox" id="btnAudioSelAll" value="audioSelAll"/><s:text name="title.audio" /><s:text name="common.select.all" /></td>
		</div>
		<div style="height: 24px">
			<table class="tab_list">
				<tr class="tab_header" style="height: 24px">
					<td width="30px"><input type="checkbox"/></td>
					<td width="60px"><s:text name="channel.program_id" /></td>
					<td><s:text name="channel.program_name" /></td>
					<td width="160px"><s:text name="channel.video.info" /></td>
					<td width="175px"><s:text name="channel.audio.info" /></td>
				</tr>
			</table>
		</div>
		<div id="programList" class="tab_content_parent" style="height: 240px; overflow-y: auto">
		</div>
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
