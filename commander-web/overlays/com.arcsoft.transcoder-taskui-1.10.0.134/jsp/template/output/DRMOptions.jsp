<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="DRMOptions">
	<div style="height: 21px"></div>
	<table>
		<tr>
			<td style="width: 30px">
				<div class="DrmExpandTrigger DrmExpandIcon MouseHover ICON_ArrowRight"></div>
			</td>
			<td class="TSAdvancedOptionsCol1">
				<span class="TaskHead3Text DrmExpandTrigger MouseHover" style="font-weight: bold;"><s:text name="output.drm_options"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DrmExpandTarget Hide">
		<!-- line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="drm.type"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<select name="DRMDescriptionType" class="TaskContentText TSAdvancedOptionsSelect" >
						<option value="<s:property value="[0].drmDescription.settingsType" />" selected="selected"></option>
					</select>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="drm.enable"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="checkbox" name="DRMEnable" class="DefaultCheckbox"
						<s:if test='[0].drmDescription.enabled'>checked="checked"</s:if>/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line2 -->
		<div class="DRMSettingContainer">
		<s:if test='[0].drmDescription.settingsType.equalsIgnoreCase("TIANYU")'>
		<s:include value="/jsp/template/output/TianYuDRM.jsp" />
		</s:if>
		<s:elseif test='[0].drmDescription.settingsType.equalsIgnoreCase("ARC")'>
		<s:include value="/jsp/template/output/ArcDRM.jsp" />
		</s:elseif>
		</div>
		<div class="LineSpacing"></div>
	</div>
</div>