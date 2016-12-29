<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewAdItemTmpl" class="PreviewAdItem">
	<table>
		<tr>
			<td class="InputClipColumn1">
				<span class="AdItemIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td style="width: 200px">
				<span class="TaskLabelText"><s:text name="editor.enter_point"/></span>
				<input type="text" name="AdInsertTime" class="TaskContentText" style="width: 100px"
					value="0:0:0:0">
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td  style="width: 40px">
				<div style="width: 40px" class="TaskLabelText operate_button PointTrigger"><s:text name="editor.point"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td  style="width: 40px">
				<div style="width: 40px" class="TaskLabelText operate_button JumpTrigger"><s:text name="editor.seek"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="DeleteAdvertisementTrigger MouseHover" style="width: 30px">
				<div class="ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>