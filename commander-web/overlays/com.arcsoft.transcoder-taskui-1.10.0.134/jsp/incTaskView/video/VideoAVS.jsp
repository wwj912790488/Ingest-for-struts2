<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoAVS" class="VideoDetail">
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.codec"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.settingsType}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.profile"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.codecProfile'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.level"/>:</span>
		<span class="val"><s:text name="%{'AVSCodecLevel.' + #liveOutput.streamAssembly.videoDescription.videoSetting.codecLevelId}"/></span>
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
		<span class="TaskLabelText lbl"><s:text name="video.mode"/>:</span>
		<span class="val"><s:text name="%{'VideoInterlaceMode.'+ #liveOutput.streamAssembly.videoDescription.videoSetting.interlaceModeId}"/></span>
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
				<s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.parNumerator" />/<s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.parDenominator" />
			</s:else>
		</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.smart_board"/>:</span>
		<span class="val"><s:text name="%{'VideoEnableBorder.' + #liveOutput.streamAssembly.videoDescription.enableBorder}" /></span>
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
				<s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.framerateNumerator" />
				/<s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.framerateDenominator" />
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
		<span class="TaskLabelText lbl"><s:text name="video.max_bitrate"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.maxBitrate"/>Kbps</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.bufferSize"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.bufSize"/>kb</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.initialBufferFill"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.bufFillPct"/><s:text name="common.millisecond"/></span>
	</div>
	<div class="param LicenseVideoQuantizer">
		<span class="TaskLabelText lbl"><s:text name="video.quantizer"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.cqQuantizer"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.gopSize"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.gopSize"/><s:text name="video.frames"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.numberOfBFrames"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.gopNumBFrames"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.referenceFrames"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.numRefFrames"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.cabac"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.cabac?'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.intraprediction"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.intraPrediction8x8 ? 'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.transform"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.transform8x8 ? 'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.scd"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.scd!=0 ? 'Yes':'No'}</span>		
	</div>

</div>