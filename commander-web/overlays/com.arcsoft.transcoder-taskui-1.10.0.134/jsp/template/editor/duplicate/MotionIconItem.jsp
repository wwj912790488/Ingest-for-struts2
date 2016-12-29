<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="MotionIconItemTmpl" class="MotionIconItem">
	<input type="hidden" name="MotionIconPosIndex" value="-1"/>
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="MotionIconColumn0">
				<span class="TaskLabelText MotionIconItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.name"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="MotionIconName" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteMotionIconTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td class="MotionIconColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<span class="TaskCommentText"><s:text name="editor.motion_icon.support"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="MotionIconColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.path"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td  style="width: 400px">
				<input type="text" name="MotionIconPath" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td style="width: 20px">
				<div class="SelectMotionIconTrigger icon_folder MouseHover"></div>
			</td>
			<td class="LabelEndSpacing LicenseMaterial"><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px" class="LicenseMaterial">
				<div class="MotionIconMaterialTrigger icon_material MouseHover"></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="MotionIconColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.framerate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="MotionIconFramerate" class="TaskContentText VideoText"
					value="25"/>
				<span class="TaskLabelText">FPS</span>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.image_format"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="MotionIconImageFormat" class="TaskContentText VideoSelect">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.play_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<%-- <input type="checkbox" name="MotionIconIsLoop" class="DefaultCheckbox" value="1"
					checked="checked"/>--%>
				<select name="MotionIconIsLoop" class="TaskContentText VideoSelect">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="MotionIconColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="MotionIconX" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="MotionIconY" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="MotionIconColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.operate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="MotionIconOperate" class="TaskContentText VideoSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td class="MotionIconColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.initial_active"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="MotionIconInitialActive" class="DefaultCheckbox" value="1"
					/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
