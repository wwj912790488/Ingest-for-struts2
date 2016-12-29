<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="SubtitleItem">
	<input type="hidden" name="SubtitlePositionType" value="1"/>
	<input type="hidden" name="SubtitleFontInfoType" value="1"/>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<span class="TaskLabelText SubtitleItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.enabled"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="">
				<input type="checkbox" name="SubtitleEnable" class="DefaultCheckbox"
					<s:if test='[0].enabled'>checked="checked"</s:if> />
				<span class="TaskContentText"><s:text name="editor.subtitle.info"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteSubtitleTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.file"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="SubtitleUri" class="TaskContentText" style="width: 380px"
					value="<s:property value="[0].location.uri"/>"/>
			</td>
			<td style="width: 20px">
				<div class="SelectSubtitleTrigger icon_folder MouseHover"></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<span class="TaskContentText"><s:text name="editor.subtitle.suppored_file"/>:</span><span class="TaskContentText SubtitleSupported"></span>
			</td>
			<td style="width: 80px">
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.chinese_font"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="SubtitleFontFamily" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].font"/>" selected="selected"></option>
				</select>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.chinese_size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleFontSize" class="TaskContentText VideoText"
					value="<s:property value="[0].size"/>"/>
			</td>
			<td class="SubtitleColumn1 LabelAlign Hide">
				<span class="TaskLabelText"><s:text name="editor.subtitle.vertical_position"/>:</span>
			</td>
			<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 Hide">
				<input type="text" name="SubtitleVerticalPosition" class="TaskContentText VideoText"
					value="<s:property value="[0].virticalPosition"/>"/>
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
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.english_font"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="SubtitleEnglishFont" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].englishFont"/>" selected="selected"></option>
				</select>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.english_size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleEnglishSize" class="TaskContentText VideoText"
					value="<s:property value="[0].englishSize"/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.color"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleColor" class="TaskContentText VideoText"
					value="<s:property value="[0].color"/>"/><span class="TaskContentText">(RRGGBB)</span>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.synchronization"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleSync" class="TaskContentText VideoText"
					value="<s:property value="[0].sync"/>"/>
				<span class="TaskContentText"><s:text name="common.millisecond"/></span>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleOpacity" class="TaskContentText VideoText"
					value="<s:property value="[0].opacity"/>"/>
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
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleLeft" class="TaskContentText VideoText"
					value="<s:property value="[0].left"/>"/>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleTop" class="TaskContentText VideoText"
					value="<s:property value="[0].getTop()"/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line6 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleWidth" class="TaskContentText VideoText"
					value="<s:property value="[0].width"/>"/>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="SubtitleHeight" class="TaskContentText VideoText"
					value="<s:property value="[0].height"/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="">
				<span class="TaskContentText"><s:text name="editor.subtitle_pos_use_default"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
