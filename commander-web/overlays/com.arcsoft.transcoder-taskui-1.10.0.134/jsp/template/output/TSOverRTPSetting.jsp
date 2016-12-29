<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TSOverRTPSetting">
	<input type="hidden" name="ContainerSetting" value="RTPOverTS"/>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskHead3Text" style="font-weight: bold;">TSOverRTP选项</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="TSAdvancedOptionsCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="common.port"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="TSAdvancedOptionsCol2">
				<input type="text" name="RTPPort" class="TaskContentText TSAdvancedOptionsInput2"
					value="<s:property value="[0].containerSetting.Port" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
