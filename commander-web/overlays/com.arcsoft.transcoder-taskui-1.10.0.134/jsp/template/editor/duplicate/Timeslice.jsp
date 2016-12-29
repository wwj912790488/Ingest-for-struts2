<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Timeslice">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="InputClipColumn1">
				<span class="ClipIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="ClipStart" style="width: 200px">
				<%-- start time --%>
				<span class="TaskLabelText"><s:text name="editor.enter_point"/></span>
				<input type="text" name="TimesliceStart" class="TaskContentText" style="width: 100px"
					value="0:0:0:0">
			</td>
			<td class="ClipEnd"  style="width: 200px">
				<%-- end time --%>
				<span class="TaskLabelText"><s:text name="editor.exit_point"/></span>
				<input type="text" name="TimesliceEnd" class="TaskContentText" style="width: 100px"
					value="0:0:0:0">
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="DeleteClipTrigger MouseHover" style="width: 30px">
				<div class="ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>