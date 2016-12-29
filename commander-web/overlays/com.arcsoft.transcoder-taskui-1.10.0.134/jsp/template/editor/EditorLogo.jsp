<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="EditorLogoInserter">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskHead2Text"><s:text name="editor.logo"/></span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 Hide">
				<input type="checkbox" name="LogoEnable" class="DefaultCheckbox"
					<s:if test='[0].videoDescription.imageInserter.enabled'>checked="checked"</s:if> />
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button NewLogoTrigger"><s:text name="common.new"/></div>
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td style="width: 40px"></td>
			<td>
				<div class="LogoItemContainer">
				<s:iterator value="[0].videoDescription.imageInserters"  status="status">
				<s:include value="/jsp/template/editor/EditorLogoItem.jsp" />
				</s:iterator>
				</div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>
