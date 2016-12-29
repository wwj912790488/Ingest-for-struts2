<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewLogoItemTmpl" class="PreviewLogo">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PreviewLogoColumn1 LabelAlign">
				<span class="LogoItemIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.logo.image"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 214px">
				<input type="text" name="LogoURI" class="TaskContentText" style="width: 210px"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="LicenseMaterial" style="width: 30px">
				<div class="LogoMaterialTrigger icon_material MouseHover"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 20px">
				<div class="SelectLogoTrigger icon_folder MouseHover"></div>
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
				<input type="text" name="LogoX" class="TaskContentText PreviewLogoText"
					value="0"/>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="LogoY" class="TaskContentText PreviewLogoText"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectPointTrigger"><s:text name="editor.select_position"/></div>
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
				<span class="TaskLabelText"><s:text name="editor.logo.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="LogoOpacity" class="TaskContentText PreviewLogoText"
					value="100"/>
				<span class="TaskLabelText">%</span>
			</td>
			<td class="PreviewLogoColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.logo.resize"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PreviewLogoColumn3">
				<input type="text" name="LogoResize" class="TaskContentText PreviewLogoText"
					value="100"/>
				<span class="TaskLabelText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteLogoTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="DashLine"></div>
</div>