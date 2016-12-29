<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:set var="videoType" value="'H265'"/>
<div id="VideoH265" class="VideoDetail">
	<input type="hidden" name="VideoMarkId" 
		value="-1" />
	<!-- a1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.codec"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoCodec" class="TaskContentText VideoSelect">
					<option value="H265" selected="selected">H265</option>
				</select>
				<input type="hidden" name="VideoSetting" value="H265"/>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseDeviceEncode">
				<span class="TaskLabelText "><s:text name="video.device_encode"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseDeviceEncode"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseDeviceEncode">
				<input type="checkbox" name="DeviceEncode" class="DefaultCheckbox DeviceEncode" value="1"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- a2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.resolution"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="hidden" name="VideoWidth" class="SummaryTrigger TaskContentText VideoText"
					value="720" />
				<input type="hidden" name="VideoHeight" class="SummaryTrigger TaskContentText VideoText"
					value="576" />
				<input type="text" name="VideoResolution" class="SummaryTrigger TaskContentText VideoText"
					value="" />
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.pixelAspectRatio"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="hidden" name="VideoPAR" class="TaskContentText VideoText" 
					value="source"/>
				<input type="hidden" name="VideoPARX" class="TaskContentText VideoText"
					value=""/>
				<input type="hidden" name="VideoPARY" class="TaskContentText VideoText"
					value=""/>
				<input type="text" name="VideoPARDisp" class="TaskContentText VideoText"
					value=""/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.framerate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="hidden" name="VideoFrameRate" class="SummaryTrigger TaskContentText VideoText"
					value="source" />
				<input type="hidden" name="VideoFrameRateX" class="SummaryTrigger TaskContentText VideoText"
					value="" />
				<input type="hidden" name="VideoFrameRateY" class="SummaryTrigger TaskContentText VideoText"
					value=""/>
				<input type="text" name="VideoFrameRateDisp" class="SummaryTrigger TaskContentText VideoText"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- a3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.rateControlMode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoRateControl" class="SummaryTrigger TaskContentText VideoSelect">
					<option value="VBR" selected="selected">VBR</option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.bitrate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoBitrate" class="SummaryTrigger TaskContentText VideoText"
					value="1000"/>
				<span class="TaskContentText">Kbps</span>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.max_bitrate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoMaxBitrate" class="TaskContentText VideoText"
					value="3000"/>
				<span class="TaskContentText">Kbps</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- a4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.gopSize"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoGopSize" class="TaskContentText VideoText"
					value="<s:property value="[0].getVideoDescription(#videoType).videoSetting.gopSize"/>"/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.numberOfBFrames"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoBFrame" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.referenceFrames"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoReferenceFrame" class="TaskContentText VideoText"
					value="1"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- a5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.quality_level"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="QualityLevelDisp" class="TaskContentText VideoSelect">
					<option value="3"></option>
				</select>
				<input type="hidden" name="DeviceId" value="<s:property value="[0].getVideoDescription(#videoType).videoSetting.deviceId"/>"/>
				<input type="hidden" name="QualityLevel" value="<s:property value="[0].getVideoDescription(#videoType).videoSetting.qualityLevel"/>"/>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVideoBitDepth">
				<span class="TaskLabelText"><s:text name="video.bitDepth"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoBitDepth"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoBitDepth">
				<select name="VideoBitDepth" class="TaskContentText VideoText" >	
					<option value="8" selected="selected">8</option>
				</select>
			</td>			
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- advance line -->
	<table>
		<tr>
			<td width="30px"><div class="VideoAdvanceExpandTrigger VideoAdvanceExpandIcon ICON_ArrowRight MouseHover"></div></td>
			<td width="100px">
				<a href="javascript:void(0);" class="A_ClickWrapper" >
				<span class="TaskHead2Text VideoAdvanceExpandTrigger MouseHover"><s:text name="video.advance_param"/></span>
				</a>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="VideoAdvanceExpandTarget">
	<!-- b1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.profile"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoCodecProfile" class="TaskContentText VideoSelect">
					<option value="Auto" selected="selected">Auto</option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.level"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoCodecLevel" class="TaskContentText VideoSelect">
					<option value="auto" selected="selected">auto</option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign TwoPassOption">
				<span class="TaskLabelText"><s:text name="video.two_pass"/>:</span>
			</td>
			<td class="LabelEndSpacing TwoPassOption"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 TwoPassOption">
				<input type="checkbox" name="TwoPass" class="DefaultCheckbox" value="1"
					/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign LicenseVideoInterpolate">
				<span class="TaskLabelText"><s:text name="video.interpolate_frame"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoInterpolate"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoInterpolate">
				<select name="VideoInterpolate" class="TaskContentText VideoSelect">
					<option value="1" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseFrameRateMode">
				<span class="TaskLabelText"><s:text name="video.frame_rate_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseFrameRateMode"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseFrameRateMode">
				<select name="VideoFrameRateMode" class="TaskContentText VideoSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseSmartBorder">
				<span class="TaskLabelText"><s:text name="video.aspect_ratio_conversion"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseSmartBorder"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseSmartBorder">
				<select name="VideoSmartBorder" class="TaskContentText VideoSelect">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.bufferSize"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoBufferSize" class="TaskContentText VideoText"
					value="375"/>
				<span class="TaskContentText">kb</span>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.initialBufferFill"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoBufferFill" class="TaskContentText VideoText"
					value="1000"/>
				<span class="TaskContentText"><s:text name="common.millisecond"/></span>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.scd"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoSCD" class="TaskContentText VideoSelect">
					<option value="0" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b3.1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign LicenseGopModeId">
				<span class="TaskLabelText"><s:text name="video.gop_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseGopModeId"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseGopModeId">
				<select name="VideoGopModeId" class="TaskContentText VideoSelect">
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVideoGopType">
				<span class="TaskLabelText"><s:text name="video.gop_type"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoGopType"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoGopType">
				<select name="VideoGopType" class="TaskContentText VideoSelect">
					<option value="0"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.max_cu"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoMaxCUSize" class="TaskContentText VideoSelect">
					<option value="64" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.max_cu_depth"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoMaxCUDepth" class="TaskContentText VideoSelect">
					<option value="3" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVideoQuantizer">
				<span class="TaskLabelText"><s:text name="video.quantizer"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoQuantizer"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoQuantizer">
				<input type="text" name="VideoQuantizer" class="TaskContentText VideoText"
					value="18"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.max_tu"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoMaxTUSize" class="TaskContentText VideoSelect">
					<option value="32" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.min_tu"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoMinTUSize" class="TaskContentText VideoSelect">
					<option value="4" selected="selected" ></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b6 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.max_inter_tu_depth"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoMaxInterTUDepth" class="TaskContentText VideoSelect">
					<option value="1" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.max_intra_tu_depth"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoMaxIntraTUDepth" class="TaskContentText VideoSelect">
					<option value="1" selected="selected" ></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b7 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText">SAO:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="VideoSAO" class="DefaultCheckbox"
					/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText">AMP:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="VideoAMP" class="DefaultCheckbox"
					/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.loop_filter"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="VideoLoopFilter" class="DefaultCheckbox"
					checked="checked"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- b8 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.parallel_frame_count"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoThreadCount" class="TaskContentText VideoText"
					value="5" />
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.look_head_frame"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoLookHeadFrame" class="TaskContentText VideoText"
					value="20" />
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.wpp_thread_count"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoWppThreadCount" class="TaskContentText VideoSelect">
					<option value="4" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- final -->
	<div class="LicenseVideoCodecId">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="video.video_codec_id"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="VideoCodecId" class="TaskContentText VideoText"
						value="-1"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
	<div class="LineSpacing"></div>
	</div>
</div>
