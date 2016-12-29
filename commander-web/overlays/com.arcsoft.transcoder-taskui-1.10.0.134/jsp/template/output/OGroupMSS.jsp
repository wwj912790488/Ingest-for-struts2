<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="MSStreaming" class="OutputGroupSpecial">
	<input type="hidden" name="OutputGroupSetting" value="MSStreaming"/>
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
				<span class="TaskLabelText"><s:text name="output.destination"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputURIInput">
				<input type="text" name="OutputGroupURI" class="TaskContentText OutputURIInput"
					value="<s:property value="[0].outputGroupSetting.location.uri" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	</div>
</div>