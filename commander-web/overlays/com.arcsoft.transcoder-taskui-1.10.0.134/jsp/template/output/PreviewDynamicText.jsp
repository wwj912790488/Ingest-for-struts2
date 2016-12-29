<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewDynamicTextItemTmpl" class="PreviewDynamicText">
	<div class="Hide">
		<input type="hidden" name="DynamicTextPosIndex" value="-1"/>
		<input type="text" name="DynamicTextName" class="TaskContentText" style="width: 380px" value=""/>
		<select name="DynamicTextAnimationType" class="TaskContentText DefaultSelect">
			<option value="" selected="selected"></option>
		</select>
		<select name="DynamicTextScrollMode" class="TaskContentText DefaultSelect">
			<option value="" selected="selected"></option>
		</select>
		<select name="DynamicTextScrollSpeed" class="TaskContentText DefaultSelect">
			<option value="" selected="selected"></option>
		</select>
		<input type="text" name="DynamicTextScrollInterval" class="TaskContentText VideoText" value="0"/>
		<select name="DynamicTextOperate" class="TaskContentText DefaultSelect">
			<option value="" selected="selected"></option>
		</select>
		<input type="checkbox" name="DynamicTextInitialActive" class="DefaultCheckbox" value="1" />
	</div>
	<!-- line1 -->
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<span class="TaskLabelText DynamicTextItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.label"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 214px">
				<input type="text" name="DynamicTextLabel" class="TaskContentText" style="width: 196px"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="LicenseMaterial" style="width: 25px">
				<div class="DynamicTextMaterialTrigger icon_material MouseHover"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 25px">
				<div class="DynamicTextMacroTrigger icon_macro MouseHover"></div>
			</td>
			
		</tr>
	</table>
	<!-- line2 -->
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
				<input type="text" name="DynamicTextPosX" class="TaskContentText PreviewLogoText"
					value="0"/>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextPosY" class="TaskContentText PreviewLogoText"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectBoxTrigger"><s:text name="editor.select_region"/></div>
			</td>
		</tr>
	</table>
	<!-- line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextWidth" class="TaskContentText PreviewLogoText"
					value="200"/>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextHeight" class="TaskContentText PreviewLogoText"
					value="80"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteDynamicTextTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<!-- line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.font"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<select name="DynamicTextFont" class="TaskContentText PreviewLogoSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.dynamic_text.size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextSize" class="TaskContentText PreviewLogoText"
					value="42"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<!-- line5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.color"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextColor" class="TaskContentText PreviewLogoText PaletteTrigger" 
					value="ffffff"/>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextOpacity" class="TaskContentText PreviewLogoText" 
					value="100"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<!-- line6 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.color"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextBgColor" class="TaskContentText PreviewLogoText PaletteTrigger"
					value="000000"/>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="DynamicTextBgOpacity" class="TaskContentText PreviewLogoText"
					value="0"/>					
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="DashLine"></div>
</div>