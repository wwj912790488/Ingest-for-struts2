<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="JoinedItemTmpl" class="JoinedItem alternate_uri_item">
	<input type="hidden" name="JoinedId" 
		value="-1"/>
	<input type="hidden" name="JoinedInputType" 
		value="LocalFile"/>
	<!-- 1 -->
	<div class="LineSpacing"></div>
	<table class="">
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText JoinedIndex">1</span><span class="TaskLabelText">.<s:text name="audio.audio"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputColumn2">
				<input type="text" name="JoinedUri" class="TaskContentText InputURIInput" 
					value=""/>
			</td>
			<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputOpenFileButton">
				<div class="operate_button TaskLabelText OpenJoinedTrigger" style="width: 80px"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="PlayJoinedTrigger MouseHover ICON_Play"></div>
			</td>
			<td class="LabelEndSpacing">
				<div class="LinePlaceHolder"></div>
			</td>
			<td style="width: 30px">
				<div class="DeleteJoinedTrigger MouseHover ICON_Delete"></div>
			</td>
			<td style="width:25px"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- 2 -->
	<div class="LineSpacing"></div>
	<table class="">
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.program"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="JoinedProgramId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="JoinedProgramIdDown" value="-1"/>
			</td>
			<td class="ProgramColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.audio_track"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="JoinedAudioTrackId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="JoinedAudioTrackIdDown" value="-1"/>
			</td>
			<td class="ProgramColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.subtitle"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="JoinedSubtitleId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="JoinedSubtitleIdDown" value="-2"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- 3 -->
	<div class="LineSpacing JoinedAudioChannelItem"></div>
	<table class="JoinedAudioChannelItem">
			<tr>
				<td class="ProgramColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="audio.channel"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ProgramColumn2">
					<select name="JoinedAudioChannelId" class="TaskContentText DefaultSelect">
						<option value="-1"><s:text name="simhd.scene.default"/></option>
					</select>
					<input type="hidden" name="JoinedAudioChannelIdDown" value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	<div class="LineSpacing JoinedAudioChannelItem"></div>
	<!-- 4 -->
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.media_info"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText JoinedMediaInfo"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
