<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AudioDescription">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td style="width: 30px">
				<div class="AudioExpandTrigger AudioExpandIcon ICON_ArrowRight MouseHover"></div>
			</td>
			<td style="width: 40px">
				<a href="javascript:void(0);" class="A_ClickWrapper" >
				<span class="TaskHead2Text AudioExpandTrigger MouseHover"><s:text name="audio.audio"/></span><span class="TaskHead2Text AudioIndex">1</span>
				</a>
			</td>
			<td><img class="AudioIcon Hidden" style="height:15px;padding-left:12px"/></td>
			<td class="VideoColumn1 LabelAlign LicenseAudioPassThrough">
				<span class="TaskLabelText Hide">Pass Through</span>
			</td>
			<td class="LabelEndSpacing LicenseAudioPassThrough"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseAudioPassThrough">
				<input type="checkbox" name="AudioPassThrough" class="DefaultCheckbox Hide" value="1"
					<s:if test='[0].passthrough'>checked="checked"</s:if>/>
			</td>			
			<td><div class="LinePlaceHolder"></div></td>
			<td class="DeleteAudioTrigger MouseHover" style="width: 40px">
				<div class="ICON_Delete "></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing LicenseAudioJoinedRef"></div>
	<table class="LicenseAudioJoinedRef">
		<tr>
			<td class="VideoColumn1 LabelAlign ">
				<span class="TaskLabelText"><s:text name="audio.input_audio"/>:</span>
			</td>
			<td class="LabelEndSpacing "><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 ">
				<%--<select name="AudioJoinedRef" class="TaskContentText DefaultSelect">
					<option value="<s:property value='[0].candidateLocationId'/>" selected="selected"></option>
				</select> --%>
				<input type="hidden" name="AudioJoinedRef" class="TaskContentText" style="width: 200px"
					value="<s:property value='[0].candidateLocationId'/>"/>
				<input type="text" name="AudioJoinedRefDisp" class="TaskContentText" style="width: 200px" disabled="disabled" 
					value=""/>
			</td>
			<td class="PreButtonSpacing AddJoinedTrigger"><div class="LinePlaceHolder"></div></td>
			<td class="OutputOpenFileButton AddJoinedTrigger">
				<table class=" MouseHover">
					<tr class="BTN_Container">
						<td class="BTN_Left"></td>
						<td class="BTN_Center">
							<span class="TaskLabelText"><s:text name="common.add"/></span>
						</td>
						<td class="BTN_Right"></td>
					</tr>
				</table>
			</td>
			<td class="PreButtonSpacing ClearJoinedTrigger"><div class="LinePlaceHolder"></div></td>
			<td class="OutputOpenFileButton ClearJoinedTrigger">
				<table class=" MouseHover">
					<tr class="BTN_Container">
						<td class="BTN_Left"></td>
						<td class="BTN_Center">
							<span class="TaskLabelText"><s:text name="common.clear"/></span>
						</td>
						<td class="BTN_Right"></td>
					</tr>
				</table>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing LicenseAudioJoinedRef"></div>
	<div class="AudioExpandTarget">
		<s:if test='[0].passthrough'>
			<s:include value="/jsp/template/audio/duplicate/AudioPassThrough.jsp"/>
		</s:if>
		<s:else>
			<s:if test='[0].settingsType.equalsIgnoreCase("AAC")'>	
				<s:include value="/jsp/template/audio/AudioAAC.jsp"/>
			</s:if>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("AMR")'>
				<s:include value="/jsp/template/audio/AudioAMR.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("MP2")'>
				<s:include value="/jsp/template/audio/AudioMP2.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("MP3")'>
				<s:include value="/jsp/template/audio/AudioMP3.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("AC3")'>
				<s:include value="/jsp/template/audio/AudioAC3.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("DTS")'>
				<s:include value="/jsp/template/audio/AudioDTS.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("PCM")'>
				<s:include value="/jsp/template/audio/AudioPCM.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("DD+")'>
				<s:include value="/jsp/template/audio/AudioDDPlus.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("WMA")'>
				<s:include value="/jsp/template/audio/AudioWMA.jsp"/>
			</s:elseif>
			<s:elseif test='[0].settingsType.equalsIgnoreCase("Vorbis")'>
				<s:include value="/jsp/template/audio/AudioVorbis.jsp"/>
			</s:elseif>
		</s:else>
	</div>
	<div class="DashLine"></div>
</div>
