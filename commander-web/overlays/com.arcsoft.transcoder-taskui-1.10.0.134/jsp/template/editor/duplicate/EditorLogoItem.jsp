<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="LogoItemTmpl" class="LogoItem">
	<input type="hidden" name="LogoSourceType" value="0"/>
	<!-- Line1 -->	
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="LogoColumn1">
				<span class="TaskLabelText LogoItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="LogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.logo.image_file"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="LogoURI" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td style="width: 20px">
				<div class="SelectLogoTrigger icon_folder MouseHover"></div>
			</td>
			<td class="LabelEndSpacing LicenseMaterial"><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px" class="LicenseMaterial">
				<div class="LogoMaterialTrigger icon_material MouseHover"></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteLogoTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td class="LogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LogoColumn2 LabelAlign">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<span class="TaskCommentText"><s:text name="editor.logo.support_bmp_png"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="LogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="LogoX" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="LogoY" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.logo.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="LogoOpacity" class="TaskContentText VideoText"
					value="100"/>
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="LogoColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.logo.resize"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="LogoResize" class="TaskContentText VideoText"
					value="100"/>
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
