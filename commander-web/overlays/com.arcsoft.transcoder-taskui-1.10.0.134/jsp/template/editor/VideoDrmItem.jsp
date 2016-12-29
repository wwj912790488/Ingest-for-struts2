<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoDrmItem" id="VideoDrmItem">
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoDrmColumn0">
				<span class="TaskLabelText VideoDrmItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="VideoDrmColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="drm.type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoDrmColumn2">
				<select name="DRMDescriptionType" class="TaskContentText VideoSelect" >
					<option value="<s:property value="[0].drmDescription.settingsType" />" selected="selected"></option>
				</select>
				<input type="hidden" name="DRMSettingType" value="<s:property value="[0].drmDescription.settingsType" />"/>
			</td>
			<td class="VideoDrmColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="drm.enable"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoDrmColumn2">
				<input type="checkbox" name="DRMEnable" class="DefaultCheckbox"
					<s:if test='[0].drmDescription.enabled'>checked="checked"</s:if>/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteVideoDrmTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoDrmColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="VideoDrmColumn1 LabelAlign">
				<span class="TaskLabelText">Content ID:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoDrmColumn2">
				<input type="text" name="DRMContentId" class="TaskContentText VideoText"
					value="<s:property value="[0].drmDescription.drmSetting.contentId" />"/>
			</td>
			<td class="VideoDrmColumn1 LabelAlign">
				<span class="TaskLabelText">Customer ID:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoDrmColumn2">
				<input type="text" name="DRMCustomerId" class="TaskContentText VideoText" 
					value="<s:property value="[0].drmDescription.drmSetting.customerId" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
