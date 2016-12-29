<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ArcDRM" class="DRMSetting">
	<input type="hidden" name="DRMSettingType" value="ARC"/>
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskLabelText">Content ID:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="TSAdvancedOptionsCol2">
				<input type="text" name="DRMContentId" class="TaskContentText TSAdvancedOptionsInput2"
					value="<s:property value="[0].drmDescription.drmSetting.contentId" />"/>
			</td>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskLabelText">Customer ID:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="TSAdvancedOptionsCol2">
				<input type="text" name="DRMCustomerId" class="TaskContentText TSAdvancedOptionsInput2" 
					value="<s:property value="[0].drmDescription.drmSetting.customerId" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>