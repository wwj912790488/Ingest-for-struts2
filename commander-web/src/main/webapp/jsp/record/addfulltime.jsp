<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div class="template_title">
	<s:text name="taskDetail.newTask"/>
</div>
<div class="template_content">
	<form>
	<table style="width: 100%">
		<tr>
			<td class="form_input_label" width="100px">
				<s:text name="record.task.type"/>
			</td>
			<td class="form_input_field">
				<select id="recordType">
				<option><s:text name="record.task.type.fulltime" /></option>
				</select>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="channel.record.type"/>
			</td>
			<td class="form_input_field">
				<s:radio name="task.schedule.channelType"
						 list="%{#{'single':getText('record.task.channel.type.single'),
						 'complex':getText('record.task.channel.type.complex'),
						 'all':getText('record.task.channel.type.all')}}" theme="simple"/>
			</td>
		</tr>
		<tr  id="taskchanneltypesingle">
			<td class="form_input_label">
				<s:text name="channel.name"/>
			</td>
			<td class="form_input_field">
				<s:select name="task.channelId" cssStyle="max-width: 200px"
					list="channels" listKey="id" listValue="name"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
				<s:select name="task.channelReocrdPath" cssStyle="max-width: 200px;display: none"
						  list="channels" listKey="id" listValue="defRecordPath"
						  headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
			</td>
		</tr>
		<tr id="taskchanneltypecomplex">
			<td class="form_input_label">
				<%--<s:text name="channel.name"/>--%>
			</td>
			<td class="form_input_field" >
				<div id="complexChannelArea" style="height: 100px; width:404px;overflow-y: auto; border: 1px solid lightgray">
					<table class="tab_content" name="tab_content_complex_channels" style="display: hidden;width:380px;">
						<s:iterator value="channels" var="channel">
							<tr class="channel_line">
								<td width="25px" align="center">
									<input type="checkbox" value="true"/>
									<input type="hidden" name="channelId" value="${channel.id}" />
								</td>
								<td width="355px">
									<input type="text" name="channelName" value="${channel.name}" style="width: 355px" readonly/>
								</td>

							</tr>
						</s:iterator>
					</table>
				</div>
			</td>

		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.profile"/>
			</td>
			<td class="form_input_field">
				<s:select name="task.profile" cssStyle="max-width: 200px"
					list="profiles" listKey="id" listValue="name"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.segment.length" />
			</td>
			<td class="form_input_field">
				<s:select name="task.segmentLength"
					list="#{10:'10',20:'20',30:'30',600:'600',900:'900',1200:'1200',1800:'1800',3600:'3600',7200:'7200',9999:'自定义'}"
					listKey="key" listValue="value"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select> <input type="text" name="task.segmentLength" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" style="display: none;width: 50px;"/>(<s:text name="common.unit.second"/>)
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.file.path" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.outputPath" cssStyle="width: 300px"/><input type="button" id="btnFileView" value='<s:text name="common.select.text"/>'>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.segment.name" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.fileName" cssStyle="width: 400px"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.start.time" />
			</td>
			<td class="form_input_field">
				<input type="checkbox" name="startNow" value="true"/><s:text name="record.task.start.now"/>
				<s:textfield name="task.schedule.startDate" style="width: 80px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.startDate" format="yyyy-MM-dd"/>
					</s:param>
				</s:textfield>
				<s:textfield name="task.schedule.startTime" style="width: 80px" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.startTime" format="HH:mm:ss"/>
					</s:param>
				</s:textfield>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.end.time" />
			</td>
			<td class="form_input_field">
				<input type="checkbox" name="alwaysLoop" value="true"/><s:text name="record.task.start.always.loop"/>
				<s:textfield name="task.schedule.endDate" style="width: 80px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.endDate" format="yyyy-MM-dd"/>
					</s:param>
				</s:textfield>
				<s:textfield name="task.schedule.endTime" style="width: 80px" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.endTime" format="HH:mm:ss"/>
					</s:param>
				</s:textfield>
			</td>
		</tr>
		<tr>
			<td class="form_input_label" valign="top">
				<s:text name="record.task.advanced.options" />
			</td>
			<td class="form_input_field">
				(1) <s:checkbox name="task.generateThumb" id="generateThumb"/><label for="generateThumb"><s:text name="record.task.generate.thumb" /></label>
				(<s:textfield name="task.thumbWidth" cssStyle="width: 30px" />x<s:textfield name="task.thumbHeight" cssStyle="width: 30px" value="-1"/>)
				<br>
				(2) <input type="checkbox" name="deleteFiles" value="true" id="deleteFiles"/><label for="deleteFiles"><s:text name="record.task.keep.times"/></label> (<input type="text" name="keepTimesValue" value="0" style="width: 30px; text-align: center">
					<select name="keepTimesUnit"><option value="1"><s:text name="common.unit.day"/></option><option value="2"><s:text name="common.unit.hour"/></option></select>)
				<br>
				(3) <input type="checkbox" name="task.createFolder" value="true" id="task.createFolder"/><label for="task.createFolder">
				<s:text name="record.task.create.folder.by.date"/></label> (<input type="text" name="task.createFolderMap" value="\${YEAR}\${MONTH}\${DAY}/\${CHANNELNAME}" style="width: 200px; text-align: center">)
			</td>
		</tr>

		<tr>
			<td class="form_input_label">
				<%--<s:text name="channel.program_name"/>--%>
				FTP选项
			</td>
			<td class="form_input_field">
				<s:checkbox type="checkbox" name="task.ftpOption" id="ftp_Option"/><label>上传到ftp服务器</label>
			</td>
		</tr>

		<tr>
			<td class="form_input_label">
				<s:text name="record.task.file.path" />
			</td>
			<td class="form_input_field">
				<s:textfield   name="setting.ftpPath" cssStyle="width: 300px" /><input type="button" id="btnFtpFileView" value='<s:text name="common.select.text"/>'>
			</td>
		</tr>

	</table>
	<s:hidden name="task.schedule.scheduleType" value="ONCE"/>
	<s:hidden name="task.schedule.startType" value="SCHEDULE"/>
	<s:hidden name="task.schedule.endType"/>
	<s:hidden name="task.schedule.source" value="RECORD"/>
	<s:hidden name="task.keepTimes"/>
        <s:hidden name="task.ftpPath" id="task.ftpPath"/>
		<s:hidden name="setting.ftpip" id="setting.ftpip"/>
	</form>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons">
		<table align="center">
		<tr>
			<td><input type="button" id="btnSave" value="<s:text name='common.action.save'/>" /></td>
			<td class="td_space"></td>
			<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
		<tr>
		</table>
	</div>
</div>
