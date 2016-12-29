<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TabPaddingImage" class="InputEditorPanel EditorPaddingImage">
	<div class="Unsupport">
		<span class="TaskLabelText"><s:text name="editor.media_is_not_supported"/></span>
	</div>
	<div class="Support">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="LabelAlign" style="width: 80px">
					<span class="TaskLabelText"><s:text name="editor.padding_image"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td style="width: 280px">
					<input type="text" name="PaddingImage" class="TaskContentText" style="width: 280px"
							value="<s:property value='[0].paddingImage' />">
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td style="width: 80px">
					<div class="TaskLabelText operate_button SelectPaddingImageTrigger"><s:text name="common.select"/></div>
				</td>
				<td class="LabelEndSpacing LicenseMaterial"><div class="LinePlaceHolder"></div></td>
				<td style="width: 80px" class="LicenseMaterial">
					<div class="TaskLabelText operate_button PaddingMaterialTrigger"><s:text name="common.insert_material"/></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="LabelAlign" style="width: 80px">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td>
					<span class="TaskLabelText"><s:text name="editor.padding_info"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>