<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table class="InputSettingTitleBar">
	<tr>
		<td class="InputSettingIndent"><div class="LineSpacingIndent"></div></td>
		<td>
			<span class="TaskHeadText" style="color: #ffffff"><s:text name="taskDetail.inputSetting"/></span>
		</td>
		<td class="InputSettingIndent"><div class="LineSpacingIndent"></div></td>
	</tr>
</table>
<div class="InputFlock">
	<s:iterator value="[0].getInputs()" status="status" var="theInput">
	<s:include value="/jsp/template/input/Input.jsp"/>
	</s:iterator>
</div>