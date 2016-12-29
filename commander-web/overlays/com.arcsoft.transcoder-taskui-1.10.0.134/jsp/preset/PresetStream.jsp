<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Stream" class="Stream">
	<s:push value="[0].streamAssembly">
	<input type="hidden" name="StreamId" 
		value="<s:property value="[0].id" />"/>
	<table >
		<tr style="height: 40px">
			<td>
				<span class="TaskContentText Summary"></span>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 120px">
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
			<td>
				<span class="TaskHead2Text" style="color: #1895c1"><s:text name="audio.audio"/></span>
			</td>
			<td style="width: 100px">
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
	</s:push>
</div>