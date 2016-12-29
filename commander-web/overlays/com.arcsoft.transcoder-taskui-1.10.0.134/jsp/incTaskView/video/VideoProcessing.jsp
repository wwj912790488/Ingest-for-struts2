<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoProcessing" class="ParamTableBody">
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.denoise"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.denoise"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.deinterlace"/>:</span>
		<span class="val"><s:text name="%{'VideoDeinterlaceMode.' + #liveOutput.streamAssembly.videoDescription.imageEditor.deinterlace}"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.deblock"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.imageEditor.deblock? 'Yes':'No'}</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.sharpen"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.sharpen"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.antishaking"/>:</span>
		<span class="val"><s:text name="%{'VideoAntiShakingMode.' + #liveOutput.streamAssembly.videoDescription.imageEditor.antiShaking}"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.antialias"/>:</span>
		<span class="val">${liveOutput.streamAssembly.videoDescription.imageEditor.antialias? 'Yes' : 'No' } </span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.light"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.brightness"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.contrast"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.contrast"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.saturation"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.saturation"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.hue"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.hue"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.delight"/>:</span>
		<span class="val"><s:property value="#liveOutput.streamAssembly.videoDescription.imageEditor.delight"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.deinterlaceAlg"/>:</span>
		<span class="val">		
			<s:text name="%{'DeinterlaceAlg.' + #liveOutput.streamAssembly.videoDescription.imageEditor.deinterlaceAlg}"/>
		</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="video.process.resizeAlg"/>:</span>
		<span class="val">		
			<s:text name="%{'ResizeAlg.' + #liveOutput.streamAssembly.videoDescription.imageEditor.resizeAlg}"/>
		</span>
	</div>
</div>
