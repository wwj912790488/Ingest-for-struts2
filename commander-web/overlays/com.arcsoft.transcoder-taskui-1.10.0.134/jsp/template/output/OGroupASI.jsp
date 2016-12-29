<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="AsiStreaming" class="OutputGroupSpecial">
	<input type="hidden" name="OutputGroupSetting" value="AsiStreaming"/>
	<table class="output_group_not_support OutputGroupNotSupport Hide">
		<tr>
			<td>
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="OutputURIInput">
				<div class="TaskLabelText"><s:text name="label.runtime_setting_is_not_support"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="OutputGroupContent">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.output_port"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<select name="OutputGroupPort" class="TaskContentText output_group_select">
						<option value="1" >1</option>
						<option value="2" >2</option>
						<option value="3" >3</option>
						<option value="4" >4</option>
					</select>
					<input type="hidden" name="OutputGroupPortDown"
						value="<s:property value="[0].outputGroupSetting.location.uri" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- advance option -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td style="width: 30px">
					<div class="ExpandTrigger ExpandIcon MouseHover ICON_ArrowRight"></div>
				</td>
				<td class="TSAdvancedOptionsCol1">
					<span class="TaskHead3Text ExpandTrigger MouseHover" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>
