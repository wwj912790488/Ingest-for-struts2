<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Stream" class="Stream">
	<input type="hidden" name="StreamId" 
		value="<s:property value="[0].id" />"/>
	<table style="height: 40px;">
		<tr>
			<td class="" style="width: 30px">
				<div class="StreamExpandTrigger StreamExpandIcon MouseHover ICON_ArrowRight"></div>
			</td>
			<td>
				<a href="javascript:void(0);"  class="StreamExpandTrigger MouseHover A_ClickWrapper">
					<span class="TaskContentText StreamIndex">1</span><span class="TaskContentText">.</span>
					<span class="TaskContentText Summary"></span>
				</a>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="" style="width: 30px">
				<div class="PreviewTrigger MouseHover ICON_Play "></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="" style="width: 30px">
				<div class="DeleteStreamTrigger MouseHover ICON_Delete "></div>
			</td>
		</tr>
	</table>
	<div class="StreamExpandTarget">
		<div class="DashLine"></div>
		<table style="background-color: #f3f3f3">
			<tr>
				<td class="LineIndent"><div class="LinePlaceHolder"></div></td>
				<td>
					<div class="LineSpacing"></div>
					<table>
						<tr>
							<td class="VideoColumn1 LabelAlign">
								<span class=""><s:text name="stream.linked_preset"/>:</span>
							</td>
							<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
							<td style="width: 200px">
								<select name="LinkedPreset" class="TaskContentText" style="width: 200px; height: 20px">
									<option value="<s:property value="[0].presetId" />" selected="selected"></option>
								</select>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
							<td class="OutputButton">
								<table class="NewVideoTrigger MouseHover">
									<tr class="BTN_Container">
										<td class="BTN_GreenLeft"></td>
										<td class="BTN_GreenCenter">
											<span class="TaskButtonGreenText">+新增视频</span>
										</td>
										<td class="BTN_GreenRight"></td>
									</tr>
								</table>
							</td>
							<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
							<td class="OutputButton">
								<table class="SaveAsPreset MouseHover">
									<tr class="BTN_Container">
										<td class="BTN_GreenLeft"></td>
										<td class="BTN_GreenCenter">
											<span class="TaskButtonGreenText"><s:text name="stream.save_as_scene"/></span>
										</td>
										<td class="BTN_GreenRight"></td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
					<div class="LineSpacing"></div>
					<div class="VideoFlock">
						<s:if test='[0].videoDescription != null'>
						<s:include value="/jsp/template/video/VideoDescription.jsp"/>
						</s:if>
					</div>
					<div class="BlockSpacing"></div>
					<table>
						<tr>
							<td class="LabelAlign" style="width: 40px;">
								<span class="TaskHead2Text" style="color: #1895c1"><s:text name="audio.audio"/></span>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
							<td class="OutputButton">
								<a href="javascript:void(0);" class="A_ClickWrapper">
								<table class="MouseHover NewAudioTrigger">
									<tr class="BTN_Container">
										<td class="BTN_GreenLeft"></td>
										<td class="BTN_GreenCenter">
											<span class="TaskButtonGreenText" >+<s:text name="audio.new"/></span>
										</td>
										<td class="BTN_GreenRight"></td>
									</tr>
								</table></a>
							</td>
						</tr>
					</table>
					<div class="AudioFlock">
						<s:iterator value="[0].audioDescriptions" status="status">
						<s:include value="/jsp/template/audio/AudioDescription.jsp"/>
						</s:iterator>
					</div>
				</td>
				<td class="LineIndent"><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
	<div class="BoldLine" style="background-color: #aaaaaa;height: 2px;"></div>
</div>
