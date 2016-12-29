<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ImageGrabbingItemTmpl" class="ImageGrabbingItem">
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ImageGrabbingColumn0">
				<span class="TaskLabelText ImageGrabbingItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.image_grabbing.target_path"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="ImageGrabbingTargetPath" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td style="width: 20px">
				<div class="SelectImageGrabbingTrigger icon_folder MouseHover"></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteImageGrabbingTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ImageGrabbingColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.image_grabbing.target_name"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="ImageGrabbingTargetName" class="TaskContentText VideoText"
					value=""/>
				<span class="TaskContentText">.jpg</span>
				<input type="hidden" name="ImageGrabbingTargetExt" class="TaskContentText VideoText"
					value="jpg"/>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.image_grabbing.operate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="ImageGrabbingOperate" class="TaskContentText VideoSelect">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ImageGrabbingColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.image_grabbing.grabbing_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="ImageGrabbingMode" class="TaskContentText VideoSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.image_grabbing.interval"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="ImageGrabbingInterval" class="TaskContentText VideoText"
					value="10000"/>
				<span class="TaskContentText">ms</span>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.image_grabbing.max_count"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="ImageGrabbingMaxCount" class="TaskContentText VideoText"
					value="5"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line6 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="ImageGrabbingColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="ImageGrabbingWidth" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="ImageGrabbingColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="ImageGrabbingHeight" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
