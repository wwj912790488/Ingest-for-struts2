<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="DynamicText">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskHead2Text"><s:text name="editor.dynamic_text"/></span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button NewDynamicTextTrigger"><s:text name="common.new"/></div>
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td style="width: 40px"></td>
			<td>
				<div class="DynamicTextItemContainer">
				<s:iterator value="[0].videoDescription.dynamicTexts"  status="status">
				<s:include value="/jsp/template/editor/DynamicTextItem.jsp" />
				</s:iterator>
				</div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>
