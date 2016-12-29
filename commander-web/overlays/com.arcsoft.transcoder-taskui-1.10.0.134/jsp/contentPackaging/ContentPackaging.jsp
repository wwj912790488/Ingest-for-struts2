<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ContentPackaging" style="margin-left: 18px; margin-right:18px">
	<div style="height:32px"></div>
	<table>
		<tr>
			<td><div class="TaskLabelText BackTrigger MouseHover">返回任务管理</div></td>
			<td></td>
			<td style="width: 80px">
				<div class="ContentButton1 TaskLabelText SaveTrigger"><s:text name="button.label.save"/></div>
			</td>
		</tr>
	</table>
	<div style="height:14px"></div>
	<div id="header">
		<table>
			<tr>
				<td><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol1">
					<div class="DefaultButton PreviewTrigger"><s:text name="common.preview"/></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol1">
					<div class="DefaultButton PositionTrigger"><s:text name="editor.select_position"/></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol1">
					<div class="DefaultButton ApplyTrigger"><s:text name="button.label.apply"/></div>
				</td>
			</tr>
		</table>
	</div>
	<div id="content">
    	<div id="content_inner">
    		<div class="TMPlayerContainer" >
			</div>
			<div class="LineSpacing"></div>
			<div class="content_left_padding">
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentParamCol1">
							<span><s:text name="task.task"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentParamCol2">
							<input type="text" name="TaskId" class="TaskId TaskContentText ContentParamText2"
								value="<s:property value="[0].taskId" />"/>
							<%--<button type="button" class="SwitchTaskTrigger TaskContentText"><s:text name="common.load"/></button> --%>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentParamCol1">
							<span><s:text name="output.select"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentParamCol2">
							<select name="OutputGroupSelect" id="OutputGroupSelect" class="TaskContentText ContentParamSelect2">
								<option value="" selected="selected"></option>
							</select>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentParamCol1">
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
    	</div>
	</div>
	<div id="side">
		<div id="ContentParamsLeft">
			<div class="ContentParamItem DefaultLeftMargin">
			</div>
		</div>
		<div id="ContentParamsRight">
			<div id="ContentTabList">
			</div>
		</div>
	</div>
	<div class="clear"></div>
</div>