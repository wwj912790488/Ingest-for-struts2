<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>
<%@ include file="/jsp/include/LicenseData.jsp"%>

<%
jspContext.addCssRef("style/jqueryFileTree.css");
jspContext.addJSRef("js/controls/jqueryFileTree.js");
jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/appui.popupmenu.js");
jspContext.addJSRef("js/ajaxfileupload.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/record/listrecord.js");
%>

<script type="text/javascript">
<!--
var CONFIRM_DELETE_MESSAGE = '<s:text name="record.task.delete.confirm"/>';
var CONFIRM_RESCHEDULE_MESSAGE = '<s:text name="record.task.reschedule.confirm"/>';
var NO_EPG_TIMES_SELECTED = '<s:text name="record.task.epg.select"/>';
var NO_WEEKLY_SCHEDULE_SELECTED = '<s:text name="record.task.weekly.select"/>';
$(function() {
	record_init();
});
//-->
</script>

<div id="record_content">
	<div class="list_view_header">
		<div class="cm_operatebar">
			<div class="left">
				<form id="queryForm" action="listRecord.action">
				<span><s:text name="taskcol.id"/>:</span>
				<s:textfield name="task.id" cssStyle="width: 50px"/>
				<span><s:text name="channel.name"/>:</span>
				<s:select name="task.channelId" cssStyle="max-width: 200px"
					list="channels" listKey="id" listValue="name"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
				<span><s:text name="channel.program_name"/>:</span>
				<s:textfield name="task.name" cssStyle="width: 100px"/>
				<span><s:text name="record.task.type"/>:</span>
				<s:select name="task.recordType"
					list="%{#{'FULLTIME':getText('record.task.type.fulltime'),
					'SCHEDULE':getText('record.task.type.schedule'),
					'EPG':getText('record.task.type.epg')}}"
					headerKey="" headerValue="%{getText('common.select.text')}"
					/>
				</form>
			</div>
			<div class="right">
				<div class="action_normal_btns">
					<a id="btnQuery">
						<span class="btn_left"></span>
						<span class="btn_middle"><p><s:text name="common.action.query"/></p></span>
						<span class="btn_right"></span>
					</a>
				</div>
				<div class="action_btns">
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_RECORD_ADD'})">
					<a class="app_popupmenu_trigger" menu="add_record_task_menu">
						<span class="btn_left"></span>
						<span class="btn_middle">
							<span class="left">
								<s:text name="common.action.add" />
							</span>
							<span class="right"></span>
						</span>
						<span class="btn_right"></span>
					</a>
					</sec:authorize>
				</div>
				<div id="add_record_task_menu" class="app_popupmenu app_panel_shadow" style="position: fixed; top: 32px; right: 2px;">
					<span id="menu_add_record_fulltime_task"><s:text name="record.task.type.fulltime"/></span>
					<span id="menu_add_record_schedule_task"><s:text name="record.task.type.schedule"/></span>
					<span id="menu_add_record_weekly_task"><s:text name="record.task.type.weekly"/></span>
					<span id="menu_add_record_epg_task"><s:text name="record.task.type.epg"/></span>
				</div>
			</div>
		</div>

		<div class="cm_actionbar">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_RECORD_EDIT'})">
			<!--
			<div id="btnEdit" class="item img_edit"><s:text name="common.action.edit"/></div>
			-->
			<div id="btnReschedule" class="item img_edit"><s:text name="record.task.action.reschedule"/></div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_RECORD_ADD'})">
			<div id="btnCopy" class="item img_copy"><s:text name="action.copy"/></div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_RECORD_DELETE'})">
			<div id="btnDelete" class="item img_del"><s:text name="common.action.delete"/></div>
			</sec:authorize>
			<span id="statusText" style="padding-left: 20px"><s:text name="common.select.text"/></span>
			<div id="btnExport" class="item img_export" style="float: right;margin-right: 20px;"><s:text name="action.export"/></div>
			<div id="btnSetting" class="item img_edit" style="float: right;margin-right: 20px;"><s:text name="record.task.setting"/></div>
		</div>
		<table class="tab_list">
			<thead>
				<tr class="tab_header">
					<th style="width:30px; text-align: right"><input type="checkbox"/></th>
					<th style="width:50px"><s:text name="taskcol.id"/></th>
					<th style="width:150px"><s:text name="channel.name"/>(<s:text name="channel.program_name"/>)</th>
					<th style="width:120px"><s:text name="record.task.type"/></th>
					<th style="width:250px"><s:text name="record.task.run.time"/></th>
					<th style="width:100px"><s:text name="record.task.profile"/></th>
					<th><s:text name="record.task.file.path"/></th>
				</tr>
			</thead>
		</table>
	</div>
	<div class="list_view_content">
		<table class="tab_list single_selection">
			<tbody>
				<s:iterator value="pager.result" var="rs">
					<tr class="tab_content" style="line-height: 23px">
						<td style="width:30px; text-align: right"><input type="checkbox" name="id" value="${rs.id}"/><span style="display: none" class="tag_recordtype">${rs.recordType}</span></td>
						<td style="width:50px">${rs.id}</td>
						<td style="width:150px">
							<div class="app_text_ellipsis" style="width: 150px"><s:property value="%{getChannelName(#rs.channelId)}"/></div>
							<s:if test="#rs.name != null"><div class="app_text_ellipsis" style="width: 150px">(${rs.name})</div></s:if>
						</td>
						<td style="width:120px">
							<s:if test="#rs.recordType.toString().equals('SCHEDULE')">
								<s:text name="record.task.type.schedule"/><br/>
								<s:if test="#rs.schedule.scheduleType.toString().equals('ONCE')">
									(<s:text name="record.task.times.once"/>)
								</s:if>
								<s:else>
									(<s:text name="record.task.times.loop"/>)
								</s:else>
							</s:if>
							<s:elseif test="#rs.recordType.toString().equals('FULLTIME')">
								<s:text name="record.task.type.fulltime"/><br/>
								(<s:text name="record.task.segment.length"/>:${rs.segmentLength}<s:text name="common.unit.second"/>)
							</s:elseif>
							<s:elseif test="#rs.recordType.toString().equals('EPG')">
								<s:text name="record.task.type.epg"/>
							</s:elseif>
							<s:elseif test="#rs.recordType.toString().equals('WEEKLY')">
								<s:text name="record.task.type.weekly"/>
							</s:elseif>
						</td>
						<td style="width: 250px">
							<s:if test="#rs.recordType.toString().equals('EPG')">
								<a href="#" class="button_epgtime tab_skip_selection">&lt;<s:text name="record.task.epg.bytime"/>&gt;</a>
							</s:if>
							<s:elseif test="#rs.schedule.scheduleType.toString().equals('WEEKLY')">
								${rs.schedule.startDate} - ${rs.schedule.repeatEndDate}<br>
								<s:if test="#rs.schedule.days == 127" >
									<s:text name="common.every.day"/>
								</s:if>
								<s:elseif test="#rs.schedule.days == 62" >
									<s:text name="common.every.workday"/>
								</s:elseif>
								<s:else>
									<s:text name="common.every.week"/>(
									<s:if test="(#rs.schedule.days & 1) != 0" >
										<s:text name="common.week.simple.day0"/>
									</s:if>
									<s:if test="(#rs.schedule.days & 2) != 0" >
										<s:text name="common.week.simple.day1"/>
									</s:if>
									<s:if test="(#rs.schedule.days & 4) != 0" >
										<s:text name="common.week.simple.day2"/>
									</s:if>
									<s:if test="(#rs.schedule.days & 8) != 0" >
										<s:text name="common.week.simple.day3"/>
									</s:if>
									<s:if test="(#rs.schedule.days & 16) != 0" >
										<s:text name="common.week.simple.day4"/>
									</s:if>
									<s:if test="(#rs.schedule.days & 32) != 0" >
										<s:text name="common.week.simple.day5"/>
									</s:if>
									<s:if test="(#rs.schedule.days & 64) != 0" >
										<s:text name="common.week.simple.day6"/>
									</s:if>
									)
								</s:else>
								${rs.schedule.startTime} - ${rs.schedule.endTime}
							</s:elseif>
							<s:elseif test="#rs.schedule.scheduleType.toString().equals('ONCE')">
								${rs.schedule.startDate} ${rs.schedule.startTime} - 
								<s:if test="#rs.schedule.endType.toString().equals('BYTIME')">
								${rs.schedule.endDate} ${rs.schedule.endTime}
								</s:if>
								<s:else>
								<s:text name="record.task.start.always.loop"/>
								</s:else>
								<s:if test="#rs.recordType.toString().equals('FULLTIME') && #rs.keepTimes != null">
									<br>(<s:text name="record.task.keep.times"/>:
									<s:if test="#rs.keepTimes >= 1440">${rs.keepTimes/1440}<s:text name="common.unit.day"/></s:if>
									<s:else>${rs.keepTimes/60}<s:text name="common.unit.hour"/></s:else>)
								</s:if>
							</s:elseif>
						</td>
						<td style="width: 100px">
							${rs.profileName}
						</td>
						<td align="left">
							${rs.outputPath}
						</td>
					</tr>
				</s:iterator>
			</tbody>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
</div>

<%@ include file="/jsp/record/selectfolderdialog.jsp"%>
<%@ include file="/jsp/include/footer.jsp"%>
