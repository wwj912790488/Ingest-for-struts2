<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="WatermarkingItemTmpl" class="WatermarkingItem">
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="WatermarkingColumn0">
				<span class="TaskLabelText WatermarkingItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="WatermarkingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.watermarking.label"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="WatermarkingLabel" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteWatermarkingTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="WatermarkingColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="WatermarkingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.watermarking.type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="WatermarkingType" class="TaskContentText VideoSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="TypeWatermark">
		<!-- Line3 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="WatermarkingColumn0">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.watermarking.font"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<select name="WatermarkingFont" class="TaskContentText VideoSelect">
						<option value="仿宋" selected="selected"></option>
					</select>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.watermarking.size"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingSize" class="TaskContentText VideoText"
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
				<td class="WatermarkingColumn0">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.watermarking.color"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingColor" class="TaskContentText VideoText PaletteTrigger"
						value="ffffff"/><span class="TaskContentText">(RRGGBB)</span>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.watermarking.opacity"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingOpacity" class="TaskContentText VideoText"
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
				<td class="WatermarkingColumn0">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingPosX" class="TaskContentText VideoText"
						value="0"/>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingPosY" class="TaskContentText VideoText"
						value="0"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- Line6 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="WatermarkingColumn0">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingWidth" class="TaskContentText VideoText"
						value="0"/>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingHeight" class="TaskContentText VideoText"
						value="0"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<!-- Line7 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="WatermarkingColumn0">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.watermarking.bgcolor"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingBgColor" class="TaskContentText VideoText PaletteTrigger"
						value="000000"/><span class="TaskContentText">(RRGGBB)</span>
				</td>
				<td class="WatermarkingColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="editor.watermarking.bgopacity"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="WatermarkingBgOpacity" class="TaskContentText VideoText"
						value="0"/>
					<span class="TaskContentText">%</span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>
