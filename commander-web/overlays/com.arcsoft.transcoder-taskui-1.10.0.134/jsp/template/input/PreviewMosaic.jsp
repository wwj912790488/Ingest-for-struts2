<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewMosaicTmpl" class="PreviewMosaic">
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td style="width: 20px;">
				<span class="MosaicItemIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicX" class="TaskContentText InputText2 VerifyMosaic"
					value="0"/>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicY" class="TaskContentText InputText2 VerifyMosaic"
					value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectBoxTrigger"><s:text name="editor.select_region"/></div>
			</td>
			<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteMosaicTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<!-- line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td style="width: 20px;">
				<span class="TaskLabelText">&nbsp;</span>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicWidth" class="TaskContentText InputText2 VerifyMosaic"
					value="100"/>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3">
				<input type="text" name="MosaicHeight" class="TaskContentText InputText2 VerifyMosaic"
					value="100"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<!-- line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td style="width: 20px;">
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
			<td class="MosaicColumn1 LabelAlign ">
				<span class="TaskLabelText"><s:text name="editor.mosaic.type"/>:</span>
			</td>
			<td class="LabelEndSpacing "><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3 ">
				<select name="MosaicType" class="TaskContentText MosaicSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<!-- line4 -->
	<div class="LicenseMosaicTime">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td style="width: 20px;"><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn1 LabelAlign ">
				<span class="TaskLabelText"><s:text name="editor.mosaic.time"/>:</span>
			</td>
			<td class="LabelEndSpacing "><div class="LinePlaceHolder"></div></td>
			<td class="MosaicColumn3 ">
				<input type="checkbox" name="MosaicActiveTime" class="TaskContentText DefaultCheckbox"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<!-- line5 -->
	<div class="LineSpacing"></div>
	<table class=" ">
		<tr>
			<td style="width: 20px;">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.enter_point"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 120px">
				<input type="text" name="MosaicStart" class="TaskContentText" style="width: 120px"
					value="0:0:0:0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td  style="width: 40px">
				<div class="TaskLabelText operate_button StartPointTrigger"><s:text name="editor.point"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td  style="width: 40px">
				<div class="TaskLabelText operate_button StartSeekTrigger"><s:text name="editor.seek"/></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<table class=" ">
		<tr>
			<td style="width: 20px;">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="MosaicColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.exit_point"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 120px">
				<input type="text" name="MosaicEnd" class="TaskContentText" style="width: 120px"
					value="0:0:0:0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td  style="width: 40px">
				<div class="TaskLabelText operate_button EndPointTrigger"><s:text name="editor.point"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td  style="width: 40px">
				<div class="TaskLabelText operate_button EndSeekTrigger"><s:text name="editor.seek"/></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	</div>
</div>