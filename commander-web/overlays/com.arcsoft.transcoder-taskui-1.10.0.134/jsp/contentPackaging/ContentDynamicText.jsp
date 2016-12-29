<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ContentDynamicText" class="ContentDynamicText">
	<!-- Line1 -->
	<div style="height:30px"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.name"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextName" class="TaskContentText ContentParamText2"
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
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.label"/>:</span>
			</td>
			<%--<td class="ContentParamCol3">
				<button type="button" class="DynamicTextMacroTrigger TaskContentText"><s:text name="common.insert_macro"/></button>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol3">
				<button type="button" class="DynamicTextMaterialTrigger TaskContentText"><s:text name="common.insert_material"/></button>
			</td> --%>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextLabel" class="TaskContentText ContentParamText2"
					value=""/>
			</td>
			<td class="ContentParamCol3">
				<div class="PopupMenu"><div class="PopupMenuToggle">+</div>
					<div class="PopupMenuItems">
						<div class="DynamicTextMacroTrigger PopupMenuItem"><s:text name="common.insert_macro"/></div>
						<div class="DynamicTextMaterialTrigger PopupMenuItem"><s:text name="common.insert_material"/></div>
					</div>
				</div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextPosX" class="TaskContentText ContentParamText2"
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
				<input type="text" name="DynamicTextPosY" class="TaskContentText ContentParamText2"
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
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextWidth" class="TaskContentText ContentParamText2"
					value="200"/>
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
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextHeight" class="TaskContentText ContentParamText2"
					value="40"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line7 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.font"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<select name="DynamicTextFont" class="TaskContentText ContentParamSelect2">
					<option value="" selected="selected"></option>
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
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextSize" class="TaskContentText ContentParamText2"
					value="42"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line9 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.color"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextColor" class="PaletteTrigger TaskContentText ContentParamText2"
					value="ffffff"/>
			</td>
			<td class="ContentParamCol3">
				<span class="TaskContentText">(RRGGBB)</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line10 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextOpacity" class="TaskContentText ContentParamText2"
					value="100"/>
			</td>
			<td class="ContentParamCol3">
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line11 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.bgcolor"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextBgColor" class="PaletteTrigger TaskContentText ContentParamText2"
					value="000000"/>
			</td>
			<td class="ContentParamCol3">
				<span class="TaskContentText">(RRGGBB)</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line12 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.bgopacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextBgOpacity" class="TaskContentText ContentParamText2"
					value="0"/>
			</td>
			<td class="ContentParamCol3">
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line13 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.animation_type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<select name="DynamicTextAnimationType" class="TaskContentText ContentParamSelect2">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line14 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.scroll_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<select name="DynamicTextScrollMode" class="TaskContentText ContentParamSelect2">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line15 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.scroll_speed"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<select name="DynamicTextScrollSpeed" class="TaskContentText ContentParamSelect2">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line16 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ContentParamCol1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.scroll_interval"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ContentParamCol2">
				<input type="text" name="DynamicTextScrollInterval" class="TaskContentText ContentParamText2"
					value="0"/>
			</td>
			<td class="ContentParamCol3">
				<span class="TaskContentText">ms</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="">
		<!-- Line17 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="ContentParamCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.dynamic_text.operate"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol2">
					<select name="DynamicTextOperate" class="TaskContentText ContentParamSelect2">
						<option value="" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- Line18 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="ContentParamCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.dynamic_text.initial_active"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ContentParamCol2">
					<input type="checkbox" name="DynamicTextInitialActive" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>
