<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:set var="outputGroupType" value="'FileArchive'"/>
<div id="FileArchive" class="OutputGroupSpecial">
	<input type="hidden" name="OutputGroupSetting" value="FileArchive"/>
	<table class="output_group_not_support OutputGroupNotSupport Hide">
		<tr>
			<td>
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="OutputURIInput">
				<div class="TaskLabelText"><s:text name="label.runtime_setting_is_not_support"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="OutputGroupContent">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.destination"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="OutputGroupURI" class="TaskContentText OutputURIInput"
						value=""/>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputOpenFileButton">
					<div class="TaskLabelText operate_button OpenFileTrigger"><s:text name="common.select"/></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<table class="ArchiveUriInfo">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<span class="TaskCommentText"><s:text name="output.archive_uri_info"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.targetName"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="TargetName" class="TaskContentText OutputURIInput"
						value=""/>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputOpenFileButton">
					<div class="TaskLabelText operate_button InsertMacroTrigger"><s:text name="common.insert_macro"/></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- extension -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.extension"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ArchiveOutputColumn2">
					<input type="text" name="Extension" class="TaskContentText output_group_text"
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- HLS group -->
		<div class="HlsSetting">
			<div class="LineSpacing PlaylistNameModeItem LicensePlaylistNameMode"></div>
			<table class="PlaylistNameModeItem LicensePlaylistNameMode">
				<tr>
					<td class="OutputGroupColumn1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.playlist_name_mode"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputGroupColumn2">
						<select name="PlaylistNameMode" class="TaskContentText output_group_select" >
							<option value="0" selected="selected"></option>
						</select>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<div class="LineSpacing PlaylistNameItem"></div>
			<table class="PlaylistNameItem">
				<tr>
					<td class="OutputGroupColumn1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.playlist_name"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="ArchiveOutputColumn2">
						<input type="text" name="PlaylistName" class="TaskContentText output_group_text"
							value="\${id}"/>
						<span class="TaskContentText">.m3u8</span>
					</td>						
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing PlaylistNameItem"></div>
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="OutputGroupColumn1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.segment_name"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="ArchiveOutputColumn2">
						<input type="text" name="SegmentName" class="TaskContentText output_group_text"
							value="\${starttime}-\${id}-\${seq}"/>
						<span class="TaskContentText">.ts</span>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="OutputGroupColumn1 LabelAlign PlaylistTypeItem">
						<span class="TaskLabelText">Playlist type:</span>
					</td>
					<td class="LabelEndSpacing PlaylistTypeItem"><div class="LinePlaceHolder"></div></td>
					<td class="OutputGroupColumn2 PlaylistTypeItem">
						<select name="PlaylistType" class="TaskContentText output_group_select">
							<option value="0" selected="selected"></option>
						</select>
					</td>
					<td class="OutputGroupColumn1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.i_frame_play_list"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputGroupColumn1">
						<input type="checkbox" name="IframePlaylist" class="DefaultCheckbox" value="1"
							/>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
		<div class="SegmentGroup">
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="OutputGroupColumn1 LabelAlign SegmentTypeItem">
						<span class="TaskLabelText"><s:text name="output.segment_type"/>:</span>
					</td>
					<td class="LabelEndSpacing SegmentTypeItem"><div class="LinePlaceHolder"></div></td>
					<td class="ArchiveOutputColumn2 SegmentTypeItem">
						<select name="SegmentType" class="TaskContentText output_group_select">
							<option value="0" selected="selected"></option>
						</select>
					</td>
					<td class="OutputGroupColumn1 LabelAlign SegmentLengthGroup">
						<span class="TaskLabelText"><s:text name="output.segmentLength"/>:</span>
					</td>
					<td class="LabelEndSpacing SegmentLengthGroup"><div class="LinePlaceHolder"></div></td>
					<td class="ArchiveOutputColumn2 SegmentLengthGroup">
						<input type="text" name="SegmentLength" class="TaskContentText output_group_text"
							value="<s:property value="[0].getOutputGroup(#outputGroupType).outputGroupSetting.segmentLength"/>"/>
						<span class="TaskContentText"><s:text name="common.second"/></span>
					</td>
					<td class="OutputGroupColumn1 LabelAlign SegmentRecordLengthItem">
						<span class="TaskLabelText"><s:text name="output.segmentLength"/>:</span>
					</td>
					<td class="LabelEndSpacing SegmentRecordLengthItem"><div class="LinePlaceHolder"></div></td>
					<td class="ArchiveOutputColumn2 SegmentRecordLengthItem">
						<select name="SegmentRecordLength" class="TaskContentText output_group_select">
							<option value="60" selected="selected"></option>
						</select>
						<span class="TaskContentText"><s:text name="common.minute"/></span>
					</td>
					<td class="OutputGroupColumn1 LabelAlign ByteRangeModeItem">
						<span class="TaskLabelText"><s:text name="output.byte_range_mode"/>:</span>
					</td>
					<td class="LabelEndSpacing "><div class="LinePlaceHolder"></div></td>
					<td class="OutputGroupColumn1 ByteRangeModeItem">
						<input type="checkbox" name="byterangemode" class="DefaultCheckbox" value="1"
							<s:if test='[0].outputGroupSetting.byteRangeMode.equals(1)'>checked="checked"</s:if>/>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
		<!-- EPG group -->
		<div class="EpgFileItem">
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="OutputGroupColumn1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.epg_file"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputURIInput">
						<input type="text" name="EpgFile" class="TaskContentText OutputURIInput"
							value=""/>
					</td>
					<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputOpenFileButton">
						<div class="TaskLabelText operate_button OpenEpgFileTrigger"><s:text name="common.select"/></div>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
		<!-- advance option -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td style="width: 30px">
					<div class="ExpandTrigger ExpandIcon MouseHover ICON_ArrowRight"></div>
				</td>
				<td class="TSAdvancedOptionsCol1">
					<span class="TaskHead3Text ExpandTrigger MouseHover" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="ExpandTarget Hide">
		</div>
	</div>
</div>