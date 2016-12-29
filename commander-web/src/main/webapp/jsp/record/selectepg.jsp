<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div class="template_title">
	<s:text name="taskDetail.newTask"/> - <s:text name="record.task.type.epg" />
</div>
<div class="template_content">
	<table style="width: 300px" align="center">
		<tr>
			<td>
				<div id="fileTitle"><s:text name="record.task.epg.file"/>:</div>
				<input type="file" id="epgFile" name="epgFile" style="width: 300px"/>
			</td>
		</tr>
		<tr id="warning_or"><td><br><s:text name="epg.msg.file.warning.or"/><br><s:text name="epg.msg.file.warning"/></td></tr>
		<tr id="warning_filepath">
			<td>
				<div>
					<s:text name="channel.name"/>
					<s:select name="task.channelId" cssStyle="max-width: 200px;display: inline-block"
							  list="channels" listKey="id" listValue="name"
							  headerKey="" headerValue="%{getText('common.select.text')}">
					</s:select>
					<s:select name="task.channelEpgPath" cssStyle="max-width: 200px;display: none"
							  list="epgInfos" listKey="channelId" listValue="filePath"
							  headerKey="" headerValue="">
					</s:select>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div id="filePathTitle"><s:text name="epg.filePath"/>
					<span id="epgFilePath" name="epgFilePath" style="width: 200px"/>
				</div>
			</td>
		</tr>
	</table>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons">
		<table align="center">
		<tr>
			<td><input type="button" id="btnNext" value="<s:text name='common.action.next'/>" /></td>
			<td class="td_space"></td>
			<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
		<tr>
		</table>
	</div>
</div>
