<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="MosaicItem">
	<div class="LineSpacing"></div>
	<!-- line1 -->
	<table class="ValueChanger">
		<tr>
			<td style="width: 20px">
				<span class="MosaicItemIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicX" class="TaskContentText MosaicText VerifyMosaic"
					value="0"/>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn1 LabelAlign">
			<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicY" class="TaskContentText MosaicText VerifyMosaic"
					value="0"/>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicWidth" class="TaskContentText MosaicText VerifyMosaic" 
					value="100"/>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td  class="MosaicColumn3">
				<input type="text" name="MosaicHeight" class="TaskContentText MosaicText VerifyMosaic"
					value="100"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteMosaicTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2 -->
	<table>
		<tr>
			<td style="width: 20px">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.granularity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<select name="MosaicBlur" class="TaskContentText MosaicSelect">
					<option value="1" selected="selected">1</option>
				</select>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.mosaic.type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<select name="MosaicType" class="TaskContentText MosaicSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line3 -->
	<div class="LicenseMosaicTime">
	<table>
		<tr>
			<td style="width: 20px">
				<input type="checkbox" name="MosaicActiveTime" class="DefaultCheckbox"
					/>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.mosaic.time"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 120px">
				<input type="text" name="MosaicStart" class="TaskContentText" style="width: 120px"
					value="0:0:0:0">
			</td>
			<td class="LabelEndSpacing">
				<span>~</span>
			</td>
			<td style="width: 120px">
				<input type="text" name="MosaicEnd" class="TaskContentText" style="width: 120px"
					value="0:0:0:0">
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	</div>
</div>