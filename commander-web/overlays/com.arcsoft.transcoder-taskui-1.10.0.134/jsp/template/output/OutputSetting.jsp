<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table class="InputSettingTitleBar">
	<tr>
		<td class="InputSettingIndent"><div class="LineSpacingIndent"></div></td>
		<td style="text-align: left;">
			<span class="TaskHeadText" style="color: #ffffff"><s:text name="taskDetail.outputSetting"/></span>
		</td>
		<td style="width: 120px">
			<a href="javascript:void(0);" style="text-decoration: none;">
			<table class="MouseHover CopyOutputGroupTrigger">
				<tr class="BTN_Container">
					<td class="BTN_GreenLeft"></td>
					<td class="BTN_GreenCenter">
						<span class="TaskButtonGreenText" >+<s:text name="taskDetail.copy_output"/></span>
					</td>
					<td class="BTN_GreenRight"></td>
				</tr>
			</table>
			</a>
		</td>
		<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td style="width: 120px">
			<a href="javascript:void(0);" style="text-decoration: none;">
			<table class="MouseHover NewOutputGroupTrigger">
				<tr class="BTN_Container">
					<td class="BTN_GreenLeft"></td>
					<td class="BTN_GreenCenter">
						<span class="TaskButtonGreenText" >+<s:text name="taskDetail.newOutput"/></span>
					</td>
					<td class="BTN_GreenRight"></td>
				</tr>
			</table>
			</a>
		</td>
		<td class="InputSettingIndent"><div class="LineSpacingIndent"></div></td>
	</tr>
</table>
<div class="OutputGroupTab"></div>
<div class="OutputGroupFlock">
	<s:iterator value="[0].getOutputGroups()">
	<s:include value="/jsp/template/output/OutputGroup.jsp"/>
	</s:iterator>		
</div>