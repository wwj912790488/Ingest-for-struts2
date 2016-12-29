<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="DynamicTextItemTmpl" class="DynamicTextItem">
	<input type="hidden" name="DynamicTextPosIndex" value="-1"/>
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<span class="TaskLabelText DynamicTextItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.name"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="DynamicTextName" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteDynamicTextTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.label"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td  style="width: 400px">
				<input type="text" name="DynamicTextLabel" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td style="width: 25px">
				<div class="DynamicTextMacroTrigger icon_macro MouseHover"></div>
			</td>
			<td class="LabelEndSpacing LicenseMaterial"><div class="LinePlaceHolder"></div></td>
			<td style="width: 25px" class="LicenseMaterial">
				<div class="DynamicTextMaterialTrigger icon_material MouseHover"></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.font"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="DynamicTextFont" class="TaskContentText VideoSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextSize" class="TaskContentText VideoText"
					value="42"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.color"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextColor" class="TaskContentText VideoText PaletteTrigger"
					value="ffffff"/><span class="TaskContentText">(RRGGBB)</span>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextOpacity" class="TaskContentText VideoText"
					value="100"/>
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.bgcolor"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextBgColor" class="TaskContentText VideoText PaletteTrigger"
					value="000000"/><span class="TaskContentText">(RRGGBB)</span>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.bgopacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextBgOpacity" class="TaskContentText VideoText"
					value="0"/>
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line6 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextPosX" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextPosY" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line7 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextWidth" class="TaskContentText VideoText"
					value="200"/>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextHeight" class="TaskContentText VideoText"
					value="80"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line8 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.animation_type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="DynamicTextAnimationType" class="TaskContentText VideoSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line9 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.scroll_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="DynamicTextScrollMode" class="TaskContentText VideoSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.scroll_speed"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="DynamicTextScrollSpeed" class="TaskContentText VideoSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.scroll_interval"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="DynamicTextScrollInterval" class="TaskContentText VideoText"
					value="0"/>
				<span class="TaskContentText">ms</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line10 -->
	<div class="LineSpacing LicenseLiveSetting"></div>
	<table class="LicenseLiveSetting">
		<tr>
			<td class="DynamicTextColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.operate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="DynamicTextOperate" class="TaskContentText VideoSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="DynamicTextColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.initial_active"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="DynamicTextInitialActive" class="DefaultCheckbox" value="1"
					/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing LicenseLiveSetting"></div>
</div>
