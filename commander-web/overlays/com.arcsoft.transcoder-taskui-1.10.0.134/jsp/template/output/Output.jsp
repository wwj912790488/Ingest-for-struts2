<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Output" class="Output">
	<table style="height: 40px;">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.codec_param"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputURIInput">
				<select name="LinkedStream" class="TaskContentText" style="width: 418px">
					<option value="<s:property value="[0].streamAssembly.id" />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="" style="width: 30px">
				<div class="DeleteOutputTrigger MouseHover ICON_Delete "></div>
			</td>
		</tr>
	</table>
	<div class="StreamExpand">
		<table class="OutputPlaylistName">
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.playlist_name"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="OutputPlaylistName" class="TaskContentText OutputURIInput" 
						value="<s:property value="[0].playlistName" />">
				</td>
				<td style="width: 40px">
					<span class="TaskContentText">.m3u8</span>
				</td>
				<td ><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing OutputPlaylistName"></div>
	</div>
</div>
