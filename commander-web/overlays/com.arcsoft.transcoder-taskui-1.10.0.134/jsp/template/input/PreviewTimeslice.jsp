<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewTimesliceTmpl" class="PreviewTimeslice">
	<table>
		<tr>
			<td class="InputClipColumn1">
				<span class="ClipIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="ClipStart InputClipColumn2">
				<%-- start time --%>
				<span class="TaskLabelText"><s:text name="editor.enter_point"/></span>
				<input type="text" name="TimesliceStart" class="TaskContentText" style="width: 100px"
					value="0:0:0:0">
			</td>
			<td class="ClipEnd InputClipColumn3">
				<%-- end time --%>
				<span class="TaskLabelText"><s:text name="editor.exit_point"/></span>
				<input type="text" name="TimesliceEnd" class="TaskContentText" style="width: 100px"
					value="0:0:0:0">
			</td>
			<td>
				<div class="LinePlaceHolder"></div>
			</td>
		</tr></table>
		<table><tr>
			<td class="InputClipColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="InputClipColumn2">
				<table>
					<tr>
						<td style="width: 40px">
							<div style="width: 40px" class="TaskLabelText operate_button ClipStartTrigger"><s:text name="editor.point"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td style="width: 40px">
							<div style="width: 40px" class="TaskLabelText operate_button JumpClipStartTrigger"><s:text name="editor.seek"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
			<td class="InputClipColumn3">
				<table>
					<tr>
						<td style="width: 40px">
							<div style="width: 40px" class="TaskLabelText operate_button ClipEndTrigger"><s:text name="editor.point"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td style="width: 40px">
							<div style="width: 40px" class="TaskLabelText operate_button JumpClipEndTrigger"><s:text name="editor.seek"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
			<td class="DeleteClipTrigger MouseHover">
				<div class="ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
</div>