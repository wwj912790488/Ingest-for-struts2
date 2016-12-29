<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ProgramEditor">
	<div class="ProgramEditorBar" style="border: 1px solid #dddddd; background-color: #f5f5f5">
		<table style="height: 33px">
			<tr>
				<td><div class="LinePlaceHolder"></div></td>
				<td style="width: 100px">
					<div class="operate_button TaskLabelText NewProgramItemTrigger" style="width: 100px"><s:text name="input.new_combination"/></div>
				</td>
				<td class="InputSettingIndent"><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
	<div class="ProgramItemList">
	<s:include value="/jsp/template/input/duplicate/ProgramItem.jsp"/>
	</div>

</div>
