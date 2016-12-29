<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoAVS" class="VideoDetail">
	<input type="hidden" name="VideoMarkId" 
		value="<s:property value="[0].videoDescription.markId"/>" />
	<!-- a0 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.codec"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoCodec" class="TaskContentText VideoSelect">
					<option value="AVS" selected="selected">AVS</option>
				</select>
				<input type="hidden" name="VideoSetting" value="AVS"/>
				<span class="VideoCodecText TaskContentText Hide">AVS</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- a1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.resolution"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="hidden" name="VideoWidth" class="SummaryTrigger TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.width"/>" />
				<input type="hidden" name="VideoHeight" class="SummaryTrigger TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.height"/>" />
				<input type="text" name="VideoResolution" class="SummaryTrigger TaskContentText VideoText"
					value="" />
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.pixelAspectRatio"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="hidden" name="VideoPAR" class="TaskContentText VideoText" 
					value="<s:if test='[0].videoDescription.videoSetting.parFollowSource'>source</s:if>"/>
				<input type="hidden" name="VideoPARX" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.parNumerator" />"/>
				<input type="hidden" name="VideoPARY" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.parDenominator" />"/>
				<input type="text" name="VideoPARDisp" class="TaskContentText VideoText"
					value=""/>
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
				<span class="TaskLabelText"><s:text name="video.framerate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="hidden" name="VideoFrameRate" class="SummaryTrigger TaskContentText VideoText"
					value="<s:if test='[0].videoDescription.videoSetting.framerateFollowSource'>source</s:if>" />
				<input type="hidden" name="VideoFrameRateX" class="SummaryTrigger TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.framerateNumerator" />" />
				<input type="hidden" name="VideoFrameRateY" class="SummaryTrigger TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.framerateDenominator" />"/>
				<input type="text" name="VideoFrameRateDisp" class="SummaryTrigger TaskContentText VideoText"
					value=""/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.rateControlMode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoRateControl" class="SummaryTrigger TaskContentText VideoSelect">
					<option value="<s:property value='[0].videoDescription.videoSetting.rateControlMode'/>" selected="selected" ></option>
				</select>
				<span class="VideoRateControlText TaskContentText Hide"><s:property value='[0].videoDescription.videoSetting.rateControlMode'/></span>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.bitrate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoBitrate" class="SummaryTrigger TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.bitrate"/>"/>
				<span class="TaskContentText">Kbps</span>
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
				<span class="TaskLabelText"><s:text name="video.gopSize"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoGopSize" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.gopSize"/>"/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.numberOfBFrames"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoBFrame" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.gopNumBFrames"/>"/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.referenceFrames"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoReferenceFrame" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.numRefFrames"/>"/>
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
					<option value="<s:property value='[0].videoDescription.videoSetting.codecProfile'/>" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.level"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoCodecLevel" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.videoSetting.codecLevelId"/>" ></option>
				</select>
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
					<option value="<s:property value='[0].videoDescription.videoSetting.interpolateFrc'/>" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseFrameRateMode">
				<span class="TaskLabelText"><s:text name="video.frame_rate_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseFrameRateMode"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseFrameRateMode">
				<select name="VideoFrameRateMode" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.videoSetting.frameRateSourceMode" />" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseSmartBorder">
				<span class="TaskLabelText"><s:text name="video.aspect_ratio_conversion"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseSmartBorder"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseSmartBorder">
				<select name="VideoSmartBorder" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.enableBorder" />" selected="selected"></option>
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
				<span class="TaskLabelText"><s:text name="video.mode"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoInterlace" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.videoSetting.interlaceModeId"/>" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseField1stShow">
				<span class="TaskLabelText"><s:text name="video.top_field_first"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseField1stShow"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseField1stShow">
				<select name="VideoTopFieldFirst" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.videoSetting.topFieldFirst"/>" selected="selected" ></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVideoQuantizer">
				<span class="TaskLabelText"><s:text name="video.quantizer"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoQuantizer"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoQuantizer">
				<input type="text" name="VideoQuantizer" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.cqQuantizer"/>"/>
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
				<span class="TaskLabelText"><s:text name="video.cabac"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="VideoCABAC" class="DefaultCheckbox" value="1"
					<s:if test='[0].videoDescription.videoSetting.cabac'>checked</s:if>/>
			</td>
			<td class="VideoColumn1 LabelAlign Hide">
				<span class="TaskLabelText"><s:text name="video.intraprediction"/>:</span>
			</td>
			<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 Hide">
				<input type="checkbox" name="VideoIntraPrediction" class="DefaultCheckbox" value="1"
					<s:if test='[0].videoDescription.videoSetting.intraPrediction8x8'>checked</s:if>/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.transform"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="checkbox" name="VideoTransform" class="DefaultCheckbox" value="1"
					<s:if test='[0].videoDescription.videoSetting.transform8x8'>checked</s:if>/>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVideoGopType">
				<span class="TaskLabelText"><s:text name="video.gop_type"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoGopType"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoGopType">
				<select name="VideoGopType" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.videoSetting.gopType"/>"></option>
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
						value="<s:property value='[0].videoDescription.videoCodecId'/>"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
	<div class="LineSpacing"></div>
	</div>
</div>