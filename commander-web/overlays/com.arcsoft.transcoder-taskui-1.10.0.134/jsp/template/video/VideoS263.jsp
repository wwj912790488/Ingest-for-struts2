<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoS263" class="VideoDetail">
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
					<option value="S263" selected="selected">S263</option>
				</select>
				<input type="hidden" name="VideoSetting" value="S263"/>
				<span class="VideoCodecText TaskContentText Hide">S263</span>
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
			<td class="VideoColumn1 LabelAlign Hide">
				<span class="TaskLabelText"><s:text name="video.rateControlMode"/>:</span>
			</td>
			<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 Hide">
				<select name="VideoRateControl" class="SummaryTrigger TaskContentText VideoSelect">
					<option value="ABR">ABR</option>
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
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.gopSize"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<input type="text" name="VideoGopSize" class="TaskContentText VideoText"
					value="<s:property value="[0].videoDescription.videoSetting.gopSize"/>"/>
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
	<div class="LineSpacing LicenseVideoGopType"></div>
	<table class="LicenseVideoGopType">
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.gop_type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="VideoGopType" class="TaskContentText VideoSelect">
					<option value="<s:property value="[0].videoDescription.videoSetting.gopType"/>"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing LicenseVideoGopType"></div>
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