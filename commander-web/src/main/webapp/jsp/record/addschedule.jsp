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
				<option><s:text name="record.task.type.schedule" /></option>
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
				<s:text name="channel.program_name"/>
			</td>
			<td class="form_input_field">
				<s:textfield name="task.name" cssStyle="width: 200px"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.start.time" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.startTime" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true">
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
				<s:textfield name="task.schedule.endTime" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.endTime" format="HH:mm:ss"/>
					</s:param>
				</s:textfield>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.schedule.mode" />
			</td>
			<td class="form_input_field">
				<s:radio name="task.schedule.scheduleType" list="%{#{'ONCE':getText('record.task.times.once'),'WEEKLY':getText('record.task.times.loop')}}" theme="simple"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.start.date" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.startDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.startDate" format="yyyy-MM-dd"/>
					</s:param>
				</s:textfield>
			</td>
		</tr>
		<tr id="endDateTr">
			<td class="form_input_label">
				<s:text name="record.task.end.date" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.repeatEndDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.repeatEndDate" format="yyyy-MM-dd"/>
					</s:param>
				</s:textfield>
			</td>
		</tr>
		<tr id="weekdayTr">
			<td class="form_input_label">
			</td>
			<td class="form_input_field">
				<input type="checkbox" name="weekday" id="weekday0" value="1"/><label for="weekday0"><s:text name="common.week.day0"/></label>
				<input type="checkbox" name="weekday" id="weekday1" value="2"/><label for="weekday1"><s:text name="common.week.day1"/></label>
				<input type="checkbox" name="weekday" id="weekday2" value="4"/><label for="weekday2"><s:text name="common.week.day2"/></label>
				<input type="checkbox" name="weekday" id="weekday3" value="8"/><label for="weekday3"><s:text name="common.week.day3"/></label>
				<input type="checkbox" name="weekday" id="weekday4" value="16"/><label for="weekday4"><s:text name="common.week.day4"/></label>
				<input type="checkbox" name="weekday" id="weekday5" value="32"/><label for="weekday5"><s:text name="common.week.day5"/></label>
				<input type="checkbox" name="weekday" id="weekday6" value="64"/><label for="weekday6"><s:text name="common.week.day6"/></label>
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
				<s:text name="record.task.file.path" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.outputPath" cssStyle="width: 300px"/><input type="button" id="btnFileView" value='<s:text name="common.select.text"/>'>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.file.name" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.fileName" cssStyle="width: 400px"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.advanced.options" />
			</td>
			<td class="form_input_field">
				(1) <s:checkbox type="checkbox" name="task.generateThumb" id="generateThumb"/><label for="generateThumb"><s:text name="record.task.generate.thumb" /></label>
				(<s:textfield name="task.thumbWidth" cssStyle="width: 30px"/>x<s:textfield name="task.thumbHeight" cssStyle="width: 30px" value="-1"/>)
				<br>
				(2) <input type="checkbox" name="task.createFolder" value="true" id="task.createFolder"/><label for="task.createFolder">
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
	<input type="hidden" name="task.recordType" value="SCHEDULE"/>
	<input type="hidden" name="task.schedule.source" value="RECORD"/>
	<input type="hidden" name="task.schedule.startType" value="SCHEDULE"/>
	<input type="hidden" name="task.schedule.endType" value="BYTIME"/>
	<input type="hidden" name="task.schedule.endDate"/>
	<input type="hidden" name="task.schedule.interval" value="1"/>
		<s:hidden name="task.ftpPath" id="task.ftpPath"/>
		<s:hidden name="setting.ftpip" id="setting.ftpip"/>
	<s:hidden name="task.schedule.days"/>
	<input type="hidden" name="task.schedule.repeatEndType" value="BYDATE"/>
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
