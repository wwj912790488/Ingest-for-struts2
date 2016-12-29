<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoH265" class="VideoDetail">
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
		<span class="val"><s:text name="%{'H265CodecLevel.' + #liveOutput.streamAssembly.videoDescription.videoSetting.codecLevelId}"/></span>
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
		<span class="val"><s:text name="%{'VideoEnableBorder.' + #liveOutput.streamAssembly.videoDescription.enableBorder}" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.framerate"/>:</span>
		<span class="val">
			<s:if test='#liveOutput.streamAssembly.videoDescription.videoSetting.framerateFollowSource'>
				<s:text name="video.followSource" />
			</s:if>
			<s:elseif test='[0].isBuiltinFramerate(#liveOutput.streamAssembly.videoDescription.videoSetting.framerateNumerator, #liveOutput.streamAssembly.videoDescription.videoSetting.framerateDenominator)'>
				<s:property value="[0].getBuiltinFramerate(#liveOutput.streamAssembly.videoDescription.videoSetting.framerateNumerator, #liveOutput.streamAssembly.videoDescription.videoSetting.framerateDenominator)" />
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
		<span class="TaskLabelText lbl"><s:text name="video.max_bitrate"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.maxBitrate"/>Kbps</span>
	</div>
	<div class="param TwoPassOption">
		<span class="TaskLabelText lbl"><s:text name="video.two_pass"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.twoPasses? 'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.bufferSize"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.bufSize"/>kb</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.initialBufferFill"/>:</span>
		<span class="val">
			<s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.bufFillPct"/>
			<s:text name="common.millisecond"/>
		</span>
	</div>
	<div class="param LicenseVideoQuantizer">
		<span class="TaskLabelText lbl"><s:text name="video.quantizer"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.cqQuantizer"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.gopSize"/>:</span>
		<span class="val">
			<s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.gopSize"/>
			<s:text name="video.frames"/>
		</span>
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
		<span class="TaskLabelText lbl"><s:text name="video.max_cu"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.maxCU'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.max_cu_depth"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.maxCUDepth'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.max_tu"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.maxTU'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.min_tu"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.minTU'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.max_inter_tu_depth"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.maxInterTUDepth'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.max_intra_tu_depth"/>:</span>
		<span class="val"><s:property value='#liveOutput.streamAssembly.videoDescription.videoSetting.maxIntraTUDepth'/></span>	
	</div>
	<div class="param">
		<span class="TaskLabelText lbl">SAO:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.sao?'Yes':'No'}</span>	
	</div>
	<div class="param">
		<span class="TaskLabelText lbl">AMP:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.amp?'Yes':'No'}</span>	
	</div>
		
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.loop_filter"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.loopFilter?'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.scd"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.videoSetting.scd!=0?'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.quality_level"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.videoSetting.qualityLevel + 1"/></span>
	</div>
</div>