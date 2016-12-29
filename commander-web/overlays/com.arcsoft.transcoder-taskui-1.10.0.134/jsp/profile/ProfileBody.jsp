<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Task">
	<form action="saveProfile" method="post">
	<input type="hidden" name="PageName" value="ProfileBody"/>
	<input type="hidden" id="ActionType" name="profileAction" value="<s:property value="[0].profileAction" />"/>
	<input type="hidden" name="Id" value="<s:property value="[0].liveProfile.id" />"/>
	<div class="TitleHeadSpacing"></div>
	<div class="FieldError">
		<s:iterator value="fieldErrors" var="fieldError">
			<s:iterator value="value" var="errorMessage">
				<div class="FieldErrorText">
       				<s:property value="errorMessage"/> 
				</div>
			</s:iterator>
		</s:iterator>
	</div>
	<table class="BodyTitleBar">
		<tr>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskHeadText">
				<s:if test='[0].profileAction.equalsIgnoreCase("save")'>
					<s:text name="profileDetail.newProfile"/>
				</s:if>
				<s:elseif test='[0].profileAction.equalsIgnoreCase("update")'>
					<s:text name="profileDetail.editProfile"/>
				</s:elseif>
				<s:else>
					<s:text name="profileDetail.newProfile"/>
				</s:else>
				</span>
			</td>
		</tr>
	</table>
	<table class="BodyMain">
		<tr>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
			<td>
				<div class="BlockSpacing"></div>
				<div class="BlockSpacing"></div>
				<!-- line1 -->
				<table>
					<tr>
						<td class="TaskColumn1 LabelAlign">
							<span class="TaskLabelText"><s:text name="common.name"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td>
							<input type="text" name="Name" class="TaskContentText" style="width: 230px"
								value="<s:property value="[0].liveProfile.name" />"/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<!-- line1.1 -->
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="TaskColumn1 LabelAlign">
							<span class="TaskLabelText"><s:text name="common.description"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td>
							<input type="text" name="Description" class="TaskContentText" style="width: 230px"
								value="<s:property value="[0].liveProfile.description" />"/>
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
								 <option value="<s:property value='[0].liveProfile.encodingOption'/>" selected="selected"></option>
							</select>
						</td>
						<td class="TaskColumn1 LabelAlign TaskPriorityModule">
							<span class="TaskLabelText "><s:text name="taskDetail.priority"/>:</span>
						</td>
						<td class="LabelEndSpacing TaskPriorityModule"><div class="LinePlaceHolder"></div></td>
						<td class="TaskColumn2 TaskPriorityModule">
							<select name="TaskPriority" class="TaskContentText DefaultSelect">
								<option value="<s:property value="[0].liveProfile.priority" />" selected="selected"></option>
							</select>
						</td>
						<td class="TaskColumn1 LabelAlign LicenseGpuId">
							<span class="TaskLabelText">GPU:</span>
						</td>
						<td class="LabelEndSpacing LicenseGpuId"><div class="LinePlaceHolder"></div></td>
						<td class="TaskColumn2 LicenseGpuId">
							<select name="TaskGpuId" class="TaskContentText DefaultSelect">
								<option value="<s:property value="[0].liveProfile.gpuId" />" selected="selected"></option>
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
								<option value="<s:property value="[0].liveProfile.videoDecoding" />" selected="selected"></option>
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
								value="<s:property value="[0].liveProfile.postProcess.uri" />"/>
						</td>
						<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="InputOpenFileButton">
							<table class="OpenScriptTrigger MouseHover">
								<tr class="BTN_Container">
									<td class="BTN_Left"></td>
									<td class="BTN_Center">
										<span class="TaskLabelText"><s:text name="common.select"/></span>
									</td>
									<td class="BTN_Right"></td>
								</tr>
							</table>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="TaskBlockSpacing"></div>
				<div class="DashLine"></div>
				<div class="TaskBlockSpacing"></div>
				<s:include value="/jsp/template/input/InputSetting.jsp"/>
				<div class="TaskBlockSpacing"></div>
				<div >
					<%-- Stream ID Generator: --%>
					<span class="StreamIdGenerator Hide">-10</span>
					<%-- add stream here --%>
					<s:include value="/jsp/template/output/StreamSetting.jsp"/>
				</div>
				<div class="TaskBlockSpacing"></div>
				<s:include value="/jsp/template/output/OutputSetting.jsp"/>
				<div class="TaskBlockSpacing"></div>
				<div class="DashLine"></div>
				<div class="TaskBlockSpacing"></div>
			</td>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	</form>
</div>