<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Stream" class="Stream">
	<input type="hidden" name="StreamId" 
		value="<s:property value="[0].id" />"/>
	<a href="javascript:void(0);"  class="StreamExpandTrigger MouseHover A_ClickWrapper Hide">
		<span class="TaskContentText StreamIndex">1</span><span class="TaskContentText">.</span>
		<span class="TaskContentText Summary"></span>
	</a>
	<table>
		<tr>
			<td class="LineIndent"><div class="LinePlaceHolder"></div></td>
			<td>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="VideoColumn1 LabelAlign">
							<span class=""><s:text name="stream.scene"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td style="width: 200px">
							<select name="LinkedPreset" class="TaskContentText" style="width: 200px; height: 20px">
								<option value="<s:property value="[0].presetId" />" selected="selected"></option>
							</select>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
						<td class="" style="width: 100px">
							<div class="NewVideoTrigger TaskContentText white_button" style="width: 100px">新增视频</div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="" style="width: 100px">
							<div class="NewAudioTrigger TaskContentText white_button" style="width: 100px">新增音频</div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="" style="width: 100px">
							<div class="SaveAsPreset TaskContentText white_button" style="width: 100px"><s:text name="stream.save_as_scene"/></div>
						</td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table class="VideoAudioTab">
					<tr>
						<td style="width: 100px">
							<div id="VideoFlock" class="VideoAudioTabItem UnderLineTab_Trigger UnderLineTab_Active"><s:text name="video.video"/></div>
						</td>
						<td style="width: 100px">
							<div id="AudioFlock" class="VideoAudioTabItem UnderLineTab_Trigger"><s:text name="audio.audio"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div style="height: 1px; background-color: #4bb8df;"></div>
				<div class="LineSpacing"></div>
				<div class="VideoFlock VideoAudioTabContent">
					<s:if test='[0].videoDescription != null'>
					<s:include value="/jsp/template/video/VideoDescription.jsp"/>
					</s:if>
				</div>
				<div class="AudioFlock VideoAudioTabContent">
					<s:iterator value="[0].audioDescriptions" status="status">
					<s:include value="/jsp/template/audio/AudioDescription.jsp"/>
					</s:iterator>
				</div>
			</td>
			<td class="LineIndent"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
</div>
