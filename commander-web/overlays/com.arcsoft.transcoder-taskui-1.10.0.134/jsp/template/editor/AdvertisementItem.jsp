<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AdvertisementItem">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="AdvertisementColumn1">
				<span class="AdItemIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.enter_point"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<input type="text" name="AdInsertTime" class="TaskContentText" style="width: 106px"
					value="<s:property value='[0].entry' />">
			</td>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ads_location"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="" style="width: 200px">
				<input type="text" name="AdvertisementUri" class="TaskContentText" style="width: 200px"
					value="<s:property value='[0].uri' />">
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectAdvertisementTrigger"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="PreviewAdvertisementTrigger MouseHover" style="width: 30px">
				<div class="ICON_Play"></div>
			</td>
			<td class="DeleteAdvertisementTrigger MouseHover" style="width: 30px">
				<div class="ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.program"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<select name="AdProgramId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="ProgramIdDown" value="<s:property value="[0].programId"/>"/>
			</td>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.audio_track"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<select name="AdAudioTrackId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="AudioTrackIdDown" value="<s:property value="[0].audioTrackId"/>"/>
			</td>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.subtitle"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<select name="AdSubtitleId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="SubtitleIdDown" value="<s:property value="[0].subtitleId"/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="AdvertisementColumn1"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.media_info"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText InputMediaInfo"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="AdvertisementColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="AdvertisementColumn1">
				<input type="checkbox" name="AdClipCropping" class="DefaultCheckbox"
					<s:if test='[0].cropping'>checked="checked"</s:if>/>
			</td>
			<td class="AdvertisementColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ads_clipping"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<input type="text" name="AdClipStart" class="TaskContentText" style="width: 106px"
					value="<s:property value='[0].start' />">
			</td>
			<td class="LabelEndSpacing">
				<span>~</span>
			</td>
			<td class="AdvertisementColumn4">
				<input type="text" name="AdClipEnd" class="TaskContentText" style="width: 106px"
					value="<s:property value='[0].end' />">
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>