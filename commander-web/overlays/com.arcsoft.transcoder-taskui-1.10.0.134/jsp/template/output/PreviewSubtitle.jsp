<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PreviewSubtitleItemTmpl" class="PreviewSubtitle">
	<div class="LineSpacing"></div>
	<!-- subtitle line 1 -->
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<span class="TaskLabelText SubtitleItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.enabled"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2">
				<input type="checkbox" name="SubtitleEnable" class="DefaultCheckbox"/>
				<%--<span class="TaskLabelText"><s:text name="editor.subtitle.info"/></span> --%>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteSubtitleTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 2 -->
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
			<td>
				<input type="text" name="SubtitleUri" class="TaskContentText" style="width: 180px" />
			</td>
			<td style="width: 20px">
				<div class="SelectSubtitleTrigger icon_folder MouseHover"></div>
			</td>
		</tr>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText"><s:text name="editor.subtitle.suppored_file"/>:</span><span class="TaskContentText SubtitleSupported"></span>
			</td>
			<td style="width: 80px">
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 3 -->
	<div class="LineSpacing"></div>
	<table class="">
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.chinese_font"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2">
				<select name="SubtitleFontFamily" class="TaskContentText">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.chinese_size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2">
				 <input type="text" name="SubtitleFontSize" class="TaskContentText InputText2" value="42"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 4 -->
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
			<td class="SubtitleColumn2">
				<select name="SubtitleEnglishFont" class="TaskContentText">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.english_size"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2">
				 <input type="text" name="SubtitleEnglishSize" class="TaskContentText InputText2" value="42"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 4 -->
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
			<td class="SubtitleColumn2">
				<input type="text" name="SubtitleColor" class="TaskContentText InputText2" value="ffffff"/>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.synchronization"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2">
				<input type="text" name="SubtitleSync" class="TaskContentText InputText2" value="0"/>
				<span class="TaskContentText"><s:text name="common.millisecond"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.subtitle.opacity"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2">
				<input type="text" name="SubtitleOpacity" class="TaskContentText InputText2" value="100"/>
				<span class="TaskContentText">%</span>
			</td>
			<td class="SubtitleColumn1 LabelAlign Hide">
				<span class="TaskLabelText"><s:text name="editor.subtitle.vertical_position"/>:</span>
			</td>
			<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn2 Hide">
				<input type="text" name="SubtitleVerticalPosition" class="TaskContentText InputText2" value="90"/>
				<span class="TaskLabelText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 5.1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="SubtitleColumn0">
				<div class="LinePlaceHolder"></div>
			</td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectBoxTrigger"><s:text name="editor.select_region"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 6 -->
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
			<td class="SubtitleColumn1">
				<input type="text" name="SubtitleLeft" class="TaskContentText InputText2" value="0"/>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn1">
				<input type="text" name="SubtitleTop" class="TaskContentText InputText2" value="0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- subtitle line 7 -->
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
			<td class="SubtitleColumn1">
				<input type="text" name="SubtitleWidth" class="TaskContentText InputText2" value="0"/>
			</td>
			<td class="SubtitleColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="SubtitleColumn1">
				<input type="text" name="SubtitleHeight" class="TaskContentText InputText2" value="0"/>
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
	<div class="DashLine"></div>
</div>