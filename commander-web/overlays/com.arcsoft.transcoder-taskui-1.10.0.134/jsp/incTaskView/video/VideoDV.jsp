<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoDV" class="VideoDetail">
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.codec"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.settingsType}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.profile"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.codecProfile'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.resolution"/>:</span>
		<span class="val">
			<s:property value="#liveOutput.streamAssembly.videoDescription.width"/>
			x
			<s:property value="#liveOutput.streamAssembly.videoDescription.height"/>
		</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.pixelAspectRatio"/>:</span>
		<span class="val">
			<s:if test='#liveOutput.streamAssembly.videoDescription.videoSetting.parFollowSource'>
				<s:text name="video.followSource" />
			</s:if>
			<s:elseif test='isBuiltinPar(#liveOutput.streamAssembly.videoDescription.videoSetting.parNumerator, #liveOutput.streamAssembly.videoDescription.videoSetting.parDenominator)'>
				<s:property value="getBuiltinPar(#liveOutput.streamAssembly.videoDescription.videoSetting.parNumerator, #liveOutput.streamAssembly.videoDescription.videoSetting.parDenominator)" />
			</s:elseif>
			<s:else>		
				<span><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.parNumerator" /></span>
				/
				<span><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.parDenominator" /></span>
			</s:else>
		</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.smart_board"/>:</span>
		<span class="val">${iveOutput.streamAssembly.videoDescription.enableBorder?'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.framerate"/>:</span>
		<span class="val">
			<s:if test='#liveOutput.streamAssembly.videoDescription.videoSetting.framerateFollowSource'>
				<s:text name="video.followSource" />
			</s:if>
			<s:elseif test='isBuiltinFramerate(#liveOutput.streamAssembly.videoDescription.videoSetting.framerateNumerator, #liveOutput.streamAssembly.videoDescription.videoSetting.framerateDenominator)'>
				<s:property value="getBuiltinFramerate(#liveOutput.streamAssembly.videoDescription.videoSetting.framerateNumerator, #liveOutput.streamAssembly.videoDescription.videoSetting.framerateDenominator)" />
			</s:elseif>
			<s:else>			
				<span><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.framerateNumerator" /></span>
				/
				<span><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.framerateDenominator" /></span>
			</s:else>
		</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.interpolate_frame"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.interpolateFrc" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.rateControlMode"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.rateControlMode'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.bitrate"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.bitrate"/>Kbps</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.gopSize"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.gopSize"/><s:text name="video.frames"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.scd"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.scd!=0 ? 'Yes':'No'}</span>
	</div>
</div>