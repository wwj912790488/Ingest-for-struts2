<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TianYuDRM" class="DRMSetting">
	<input type="hidden" name="DRMSettingType" value="TIANYU"/>
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskLabelText">Server IP:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="TSAdvancedOptionsCol2">
				<input type="text" name="DRMServerIP" class="TaskContentText TSAdvancedOptionsInput2"
					value="<s:property value="[0].drmDescription.drmSetting.serverIP" />"/>
			</td>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskLabelText">Server Port:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="TSAdvancedOptionsCol2">
				<input type="text" name="DRMServerPort" class="TaskContentText TSAdvancedOptionsInput2" 
					value="<s:property value="[0].drmDescription.drmSetting.serverPort" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskLabelText">Service ID:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="TSAdvancedOptionsCol2">
				<input type="text" name="DRMContentId" class="TaskContentText TSAdvancedOptionsInput2" 
					value="<s:property value="[0].drmDescription.drmSetting.contentId" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>