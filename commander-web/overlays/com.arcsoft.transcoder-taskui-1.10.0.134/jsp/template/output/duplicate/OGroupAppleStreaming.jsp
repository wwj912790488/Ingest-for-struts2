<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="AppleStreaming" class="OutputGroupSpecial">
	<input type="hidden" name="OutputGroupSetting" value="AppleStreaming"/>
	<table class="OutputGroupNotSupport output_group_not_support Hide">
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
		<!-- a1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.distribute_mode"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<select name="DistributeMode" class="TaskContentText output_group_select" >
						<option value="<s:property value="[0].outputGroupSetting.distributeMode" />" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- 1 -->
		<div class="LineSpacing OutputUriItem"></div>
		<table class="OutputUriItem">
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
				<td class="HlsOutputOpenFile OutputOpenFileButton">
					<div class="TaskLabelText operate_button OpenFileTrigger"><s:text name="common.select"/></div>
				</td>
				<%--<td style="width: 20px">
					<div class="SelectHlsOutputPointTrigger icon_folder MouseHover"></div>
				</td> --%>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<!-- 1.1 -->
		<%--
		<table class="AppleLiveUriInfo">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<span class="TaskCommentText"><s:text name="output.apple_live_uri_info"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		 --%>
		<div class="LineSpacing OutputUriItem"></div>
		<!-- a2 -->
		<div class="LineSpacing DistributePointItem"></div>
		<table class="DistributePointItem">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.distribution_point"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="DistributePoint" class="TaskContentText OutputURIInput"
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<!-- a2.1 -->
		<table class="HlsOutputPointItem">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<span class="HlsOutputPointDisp TaskLabelText""></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing DistributePointItem"></div>
		<!-- line 2 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.targetName"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="TargetName" class="TaskContentText OutputURIInput"
						value="index"/>
				</td>
				<td style="width: 40px">
					<span class="TaskContentText">.m3u8</span>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td style="width: 25px">
					<div class="TaskLabelText icon_macro InsertMacroTrigger MouseHover"></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line 3 -->
		<div class="LineSpacing LicensePlaylistNameMode"></div>
		<table class="LicensePlaylistNameMode">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.playlist_name_mode"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<select name="PlaylistNameMode" class="TaskContentText output_group_select" >
						<option value="" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing LicensePlaylistNameMode"></div>
		<!-- line 3.1 -->
		<div class="LineSpacing PlaylistNameItem"></div>
		<table class="PlaylistNameItem">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.playlist_name"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="PlaylistName" class="TaskContentText OutputURIInput"
						value="\${id}"/>
				</td>
				<td style="width: 40px">
					<span class="TaskContentText">.m3u8</span>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td style="width: 25px">
					<div class="TaskLabelText icon_macro InsertPlayListMacroTrigger MouseHover"></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<table class="PlaylistNameItem">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<span class="TaskCommentText"><s:text name="output.hls_playlist_name_info"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing PlaylistNameItem"></div>
		<!-- line 4 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.segment_name"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="SegmentName" class="TaskContentText OutputURIInput"
						value="\${starttime}-\${id}-\${seq}"/>
				</td>
				<td style="width: 40px">
					<span class="TaskContentText">.ts</span>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td style="width: 25px">
					<div class="TaskLabelText icon_macro InsertSegmentMacroTrigger MouseHover"></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line 5 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.segmentLength"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="SegmentLength" class="TaskContentText output_group_text"
						value="10"/><span class="TaskContentText">&nbsp;<s:text name="common.second"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line 6 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign LicenseDeleteUploaded">
					<span class="TaskLabelText"><s:text name="output.segment_storage"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDeleteUploaded"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2 LicenseDeleteUploaded">
					<select name="DeleteUploaded" class="TaskContentText output_group_select" >
						<option value="1" selected="selected"></option>
					</select>
				</td>
				<td class="OutputGroupColumn1 LabelAlign LicenseIframePlaylist">
					<span class="TaskLabelText"><s:text name="output.i_frame_play_list"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseIframePlaylist"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2 LicenseIframePlaylist">
					<input type="checkbox" name="IframePlaylist" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line 7 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign LicenseEncryption">
					<span class="TaskLabelText"><s:text name="output.encryption_type"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseEncryption"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2 LicenseEncryption">
					<select name="EncryptionType" class="TaskContentText output_group_select" >
						<option value="" selected="selected"></option>
					</select>
				</td>
				<td class="OutputGroupColumn1 LabelAlign Hide" style="width: 120px">
					<span class="TaskLabelText"><s:text name="output.key_rotation_count"/>:</span>
				</td>
				<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
				<td class="Hide" style="width: 130px">
					<input type="text" name="KeyRotationCount" class="TaskContentText DefaultText"
						value="3"/>
				</td>
				<td class="LabelAlign Hide" style="width: 120px">
					<span class="TaskLabelText"><s:text name="output.iv_follows_segment"/>:</span>
				</td>
				<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn1 Hide" style="width: 20px">
					<input type="checkbox" name="IVFollowsSegment" class="DefaultCheckbox" 
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line 8 -->
		<div class="LineSpacing VodListItem"></div>
		<table class="VodListItem">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.vod_target_name"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="VodTargetName" class="TaskContentText OutputURIInput"
						value="vod_index"/>
				</td>
				<td style="width: 40px">
					<span class="TaskContentText">.m3u8</span>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing VodListItem"></div>
		<!-- line 9 -->
		<div class="LineSpacing VodListItem"></div>
		<table class="VodListItem">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.vod_playlist_name"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="VodPlaylistName" class="TaskContentText OutputURIInput"
						value="vod_\${id}"/>
				</td>
				<td style="width: 40px">
					<span class="TaskContentText">.m3u8</span>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing VodListItem"></div>
		<s:include value="/jsp/template/output/CandidateOutputContainer.jsp"/>
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
	</div>
</div>