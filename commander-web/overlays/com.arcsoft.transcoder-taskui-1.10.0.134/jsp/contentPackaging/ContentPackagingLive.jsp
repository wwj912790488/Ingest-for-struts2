<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ContentPackaging" style="margin-left: 18px; margin-right:18px">
	<input type="hidden" name="FromUri" class="FromUri TaskContentText ContentParamText2"
		value="<s:property value="[0].fromUri" />"/>
	<div style="height:32px"></div>
	<table>
		<tr>
			<td style="width: 13px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 8px; ">
				<div class="task_title_left" style="position:relative;top: 2px;"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 90px">
				<span class="TaskHeadText TaskTitle">图文包装</span>
			</td>
			<td style="width:80px">
				<div class="BackTrigger top_button2" style="width: 80px"><s:text name="button.label.back"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="ContentButton1 TaskLabelText ApplyTrigger"><s:text name="button.label.apply"/></div>
			</td>
		</tr>
	</table>
	<div style="height:14px"></div>
		<table>
		<tr>
			<td style="vertical-align: top; width: 624px">
				<!-- left content -->
				<div class="TaskLabelText"><s:text name="common.preview"/></div>
				<div class="LineSpacing"></div>
				<div class="TMPlayerContainer player_container" >
				</div>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="task.task"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="TaskId" class="TaskId TaskContentText ContentInput"
								value="<s:property value="[0].taskId" />"/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="input.inputSource"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="InputSource" class="InputSource TaskContentText ContentInput"
								value=""/>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText CopySourceTrigger"><s:text name="common.copy"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText PlaySourceTrigger"><s:text name="button.label.play"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="output.select"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<select name="OutputGroupSelect" id="OutputGroupSelect" class="TaskContentText ContentSelect">
								<option value="" selected="selected"></option>
							</select>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText CopyOutputTrigger"><s:text name="common.copy"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText PlayOutputTrigger"><s:text name="button.label.play"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="Hide">
					<div class="LineSpacing"></div>
					<table>
						<tr>
							<td class="ContentParamCol1 LabelAlign">
								<span><s:text name="output.select_streaming"/>:</span>
							</td>
							<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
							<td class="ContentParamCol2">
								<select name="OutputSelect" id="OutputSelect" class="TaskContentText ContentParamSelect2">
									<option value="" selected="selected"></option>
								</select>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
						</tr>
					</table>
					<div class="LineSpacing"></div>
				</div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="common.description"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<textarea class="TaskDescription" style="width:196px;height:80px;resize: none;"></textarea>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText SaveDescriptionTrigger"><s:text name="common.save"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
			</td>
			<td style="width:20px"><div class="LineSpacing"></div></td>
			<td style="vertical-align: top;">
				<table>
					<tr>
						<td style="width: 3px;"><div class="LineSpacing" style="background-color:#00c2ff; height: 17px"></div></td>
						<td style="width: 10px;"><div class="LineSpacing"></div></td>
						<td style="width: 200px">
							<span class="TaskLabelText"><s:text name="task.content_packaging"/></span>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TabContentButton">
							<div class="ContentButton2 TaskLabelText PreviewTrigger"><s:text name="common.preview"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TabContentButton">
							<div class="ContentButton1 TaskLabelText ImportTrigger"><s:text name="task.import_profile"/></div>
						</td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<div class="ContentPackagingList">
					<table>
						<tr class="ContentPackagingListHead">
							<td class="cpl_col3">
							<input type="checkbox" class="cplHeadCheckBox DefaultCheckbox">
								<span class="TaskContentText"><s:text name="label.inputType"/></span>
							</td>
							<td class="cpl_col4">
								<span class="TaskContentText"><s:text name="common.name"/></span>
							</td>
							<td class="cpl_col5">
								<span class="TaskContentText"><s:text name="editor.dynamic_text.label"/></span>
							</td>
							<td class="cpl_col6"><div class="LinePlaceHolder"></div></td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>
	<%--<div class="BottomBar">
		<table>
			<tr>
				<td><div class="LinePlaceHolder"></div></td>
				<td class="TabContentButton">
					<div class="ContentButton2 BackTrigger"><s:text name="button.label.back"/></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TabContentButton">
					<div class="ContentButton1 ApplyTrigger"><s:text name="button.label.apply"/></div>
				</td>
			</tr>
		</table>
	</div> --%>
</div>