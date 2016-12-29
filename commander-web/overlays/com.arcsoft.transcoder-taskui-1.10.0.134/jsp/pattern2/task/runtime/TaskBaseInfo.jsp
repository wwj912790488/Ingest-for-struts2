<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TaskTabContent TaskTabBaseInfo ">
	<div class="task_tab_content"  style="padding-left:40px">
	<div style="height: 32px"></div>
	<s:include value="/jsp/pattern2/task/TaskBegin.jsp"/>
	<!-- line1 -->
	<table>
		<tr>
			<td class="TaskColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="common.name"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="Name" class="TaskContentText InputURIInput"
					value="<s:property value="[0].task.name" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="Hide">
	<!-- line1.1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TaskColumn1 LabelAlign LicenseDescription">
				<span class="TaskLabelText"><s:text name="common.description"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseDescription"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput LicenseDescription">
				<input type="text" name="Description" class="TaskContentText InputURIInput"
					value="<s:property value="[0].task.description" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TaskColumn1 LabelAlign LicenseEncodingPolicy">
				<span class="TaskLabelText"><s:text name="taskDetail.encodingOption"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseEncodingPolicy"><div class="LinePlaceHolder"></div></td>
			<td class="TaskColumn2 LicenseEncodingPolicy">
				<select name="TaskEncodingOption" class="TaskContentText DefaultSelect">
					 <option value="<s:property value='[0].task.encodingOption'/>" selected="selected"></option>
				</select>
			</td>
			<td class="TaskColumn1 LabelAlign TaskPriorityModule">
				<span class="TaskLabelText "><s:text name="taskDetail.priority"/>:</span>
			</td>
			<td class="LabelEndSpacing TaskPriorityModule"><div class="LinePlaceHolder"></div></td>
			<td class="TaskColumn2 TaskPriorityModule">
				<select name="TaskPriority" class="TaskContentText DefaultSelect">
					<option value="<s:property value="[0].task.priority" />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2.1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TaskColumn1 LabelAlign LicenseGpuId">
				<span class="TaskLabelText">GPU:</span>
			</td>
			<td class="LabelEndSpacing LicenseGpuId"><div class="LinePlaceHolder"></div></td>
			<td class="TaskColumn2 LicenseGpuId">
				<select name="TaskGpuId" class="TaskContentText DefaultSelect">
					<option value="<s:property value="[0].task.gpuId" />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TaskColumn1 LabelAlign LicenseVideoDecoding">
				<span class="TaskLabelText"><s:text name="taskDetail.video_decoding"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoDecoding"><div class="LinePlaceHolder"></div></td>
			<td class="TaskColumn2 LicenseVideoDecoding">
				<select name="TaskVideoDecoding" class="TaskContentText DefaultSelect">
					<option value="<s:property value="[0].task.videoDecoding" />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line4 -->
	<div class="LineSpacing"></div>
	<table class="LicensePostProcess">
		<tr>
			<td class="TaskColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="task.post_process"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="ScriptUri" class="TaskContentText InputURIInput"
					value="<s:property value="[0].task.postProcess.uri" />"/>
			</td>
			<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputOpenFileButton">
				<div class="TaskLabelText operate_button OpenScriptTrigger"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	</div>
	<div style="height: 58px"></div>
	</div>
</div>