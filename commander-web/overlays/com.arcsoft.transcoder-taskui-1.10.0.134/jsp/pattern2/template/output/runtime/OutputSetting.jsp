<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TaskTabContent TaskTabOutputGroup Hide">
	<div class="Hide">
	<table class="InputSettingTitleBar">
		<tr>
			<td><div class="LinePlaceHolder"></div></td>
			<%--<td style="width: 100px">
				<div class="DeleteOutputGroupTrigger TaskContentText white_button" style="width: 100px"><s:text name="button.label.delete"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td> --%>
			<td style="width: 100px">
				<div class="CopyOutputGroupTrigger TaskContentText white_button" style="width: 100px"><s:text name="taskDetail.copy_output"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 100px">
				<div class="NewOutputGroupTrigger TaskContentText white_button" style="width: 100px"><s:text name="taskDetail.newOutput"/></div>
			</td>
		</tr>
	</table>
	<div style="height: 10px"></div>
	</div>
	<table class="task_tab_content">
		<tr>
			<td style="width: 237px; vertical-align:top; background-color: #ebeef3;">
				<div class="OutputGroupTab">
				</div>
			</td>
			<td style="vertical-align:top;">
				<div class="OutputGroupFlock output_group_flock">
					<s:iterator value="[0].getOutputGroups()">
					<s:include value="/jsp/pattern2/template/output/runtime/OutputGroup.jsp"/>
					</s:iterator>		
				</div>
			</td>
		</tr>
	</table>
</div>
