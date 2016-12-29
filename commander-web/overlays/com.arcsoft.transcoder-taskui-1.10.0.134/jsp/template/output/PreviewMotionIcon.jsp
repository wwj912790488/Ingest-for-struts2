<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewMotionIconItemTmpl" class="PreviewMotionIcon">
	<div class="Hide">
		<input type="hidden" name="MotionIconPosIndex" value="-1"/>
		<input type="text" name="MotionIconName" class="TaskContentText" style="width: 380px" value=""/>
		<input type="text" name="MotionIconFramerate" class="TaskContentText VideoText" value="25"/>
		<select name="MotionIconOperate" class="TaskContentText DefaultSelect">
			<option value="0" selected="selected"></option>
		</select>
		<input type="checkbox" name="MotionIconInitialActive" class="DefaultCheckbox" value="1"/>
		<input type="hidden" name="MotionIconWidth" class="TaskContentText ContentParamText2"
			value="0"/>
		<input type="hidden" name="MotionIconHeight" class="TaskContentText ContentParamText2"
			value="0"/>
		<input type="checkbox" name="MotionIconIsLoop" class="DefaultCheckbox" value="1" checked="checked"/>
	</div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1 LabelAlign">
				<span class="MotionIconItemIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.path"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 214px">
				<input type="text" name="MotionIconPath" class="TaskContentText" style="width: 210px"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="LicenseMaterial" style="width: 30px">
				<div class="MotionIconMaterialTrigger icon_material MouseHover"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 20px">
				<div class="SelectMotionIconTrigger icon_folder MouseHover"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="MotionIconX" class="TaskContentText PreviewLogoText"
					value="0"/>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="MotionIconY" class="TaskContentText PreviewLogoText"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectBoxTrigger"><s:text name="editor.select_position"/></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.motion_icon.image_format"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<select name="MotionIconImageFormat" class="TaskContentText DefaultSelect">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteMotionIconTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>