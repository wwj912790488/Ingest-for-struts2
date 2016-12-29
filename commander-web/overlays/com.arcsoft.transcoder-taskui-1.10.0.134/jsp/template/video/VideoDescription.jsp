<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoDescription">
	<input type="hidden" name="VideoId" 
		value="<s:property value="[0].videoDescription.id"/>" />
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="LabelAlign" style="width: 40px;">
				<span class="TaskHead2Text" style="color: #1895c1"><s:text name="video.video"/></span>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVideoPassThrough">
				<span class="TaskLabelText Hide">Pass Through</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoPassThrough Hide"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoPassThrough">
				<input type="checkbox" name="VideoPassThrough" class="DefaultCheckbox Hide" value="1"
					<s:if test='[0].videoDescription.passthrough'>checked="checked"</s:if>/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="DeleteVideoTrigger MouseHover" style="width: 40px">
				<div class="ICON_Delete "></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="VideoContainer">
	<s:if test='[0].videoDescription.passthrough'>
		<s:include value="/jsp/template/video/duplicate/VideoPassThrough.jsp"/>
	</s:if>
	<s:else>
		<s:if test='[0].videoDescription.settingsType.equalsIgnoreCase("H264")'>
			<s:include value="/jsp/template/video/VideoH264.jsp"/>
		</s:if>
		<s:if test='[0].videoDescription.settingsType.equalsIgnoreCase("AVS")'>
			<s:include value="/jsp/template/video/VideoAVS.jsp"/>
		</s:if>
		<s:if test='[0].videoDescription.settingsType.equalsIgnoreCase("H265")'>	
			<s:include value="/jsp/template/video/VideoH265.jsp"/>
		</s:if>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("MPEG2")'>
			<s:include value="/jsp/template/video/VideoMPEG2.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("MPEG4")'>
			<s:include value="/jsp/template/video/VideoMPEG4.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("MPEG1")'>
			<s:include value="/jsp/template/video/VideoMPEG1.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("H263")'>
			<s:include value="/jsp/template/video/VideoH263.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("DV")'>
			<s:include value="/jsp/template/video/VideoDV.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("S263")'>
			<s:include value="/jsp/template/video/VideoS263.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("VC-1")'>
			<s:include value="/jsp/template/video/VideoWMV.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("ProRes")'>
			<s:include value="/jsp/template/video/VideoProRes.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("RAW")'>
			<s:include value="/jsp/template/video/VideoRAW.jsp"/>
		</s:elseif>
		<s:elseif test='[0].videoDescription.settingsType.equalsIgnoreCase("DNxHD")'>
			<s:include value="/jsp/template/video/VideoDNxHD.jsp"/>
		</s:elseif>
	</s:else>
	</div>
	<div class="VideoPassThroughContent">
		<s:if test='[0].videoDescription.passthrough'>
			<s:include value="/jsp/template/video/duplicate/VideoProcessing.jsp"/>
			<div class="LicenseVideoEditing">
			<s:include value="/jsp/template/video/duplicate/VideoEditing.jsp"/>
			</div>
		</s:if>
		<s:else>
			<s:include value="/jsp/template/video/VideoProcessing.jsp"/>
			<div class="LicenseVideoEditing">
			<s:include value="/jsp/template/video/VideoEditing.jsp"/>
			</div>
		</s:else>
	</div>
</div>
