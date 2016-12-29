<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ContentMotionIcon" class="ContentMotionIcon">
	<input type="hidden" name="MotionIconWidth" value="0"/>
	<input type="hidden" name="MotionIconHeight" value="0"/>
	<!-- Line1 -->
	<div style="height: 30px"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.name"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="MotionIconName" class="TaskContentText ContentParamText2"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.path"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="MotionIconPath" class="TaskContentText ContentParamText2"
					value=""/>
			</td>
			<%-- <td class="ContentParamCol3">
				<button type="button" class="SelectMotionIconTrigger TaskContentText"><s:text name="common.select"/></button>
			</td>--%>
			<td class="ContentParamCol3">
				<div class="PopupMenu"><div class="PopupMenuToggle">+</div>
					<div class="PopupMenuItems">
						<div class="SelectMotionIconTrigger PopupMenuItem"><s:text name="common.select"/></div>
						<div class="MotionIconMaterialTrigger PopupMenuItem"><s:text name="common.insert_material"/></div>
					</div>
				</div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<!-- Line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="MotionIconX" class="TaskContentText ContentParamText2"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="MotionIconY" class="TaskContentText ContentParamText2"
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
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.framerate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="MotionIconFramerate" class="TaskContentText ContentParamText2"
					value="25"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line6 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.image_format"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<select name="MotionIconImageFormat" class="TaskContentText ContentParamSelect2">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line6.1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.play_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<%-- <input type="checkbox" name="MotionIconIsLoop" class="DefaultCheckbox" value="1"
					checked="checked"/>--%>
				<select name="MotionIconIsLoop" class="TaskContentText ContentParamSelect2">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="">
		<!-- Line7 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="ContentParamCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.motion_icon.operate"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol2">
					<select name="MotionIconOperate" class="TaskContentText ContentParamSelect2">
						<option value="0" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- Line8 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="ContentParamCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.motion_icon.initial_active"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol2">
					<input type="checkbox" name="MotionIconInitialActive" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>
