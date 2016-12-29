<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TSAdvancedOptions ParamTableBody">	
	<div class="paramCol1">
		<span class="lbl" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
		<span class="val"></span>
	</div>

	<div class="paramCol2">
		<span class="TaskLabelText lbl">Service name:</span>
		<span class="val"><s:property value="[0].containerSetting.serverName" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">PMT PID:</span>
		<span class="val"><s:property value="[0].containerSetting.pmtPid" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Service provider:</span>
		<span class="val"><s:property value="[0].containerSetting.serviceProvider" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Video PID:</span>
		<span class="val"><s:property value="[0].containerSetting.videoPid" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Service ID:</span>
		<span class="val"><s:property value="[0].containerSetting.serviceId" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Start Audio PID:</span>
		<span class="val"><s:property value="[0].containerSetting.audioPid" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="output.total_bitrate"/>:</span>
		<span class="val">
			<s:property value="%{[0].containerSetting.totalBitrate==null? '' :  [0].containerSetting.totalBitrate + 'Kbps'}" />
		</span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">PCR PID:</span>
		<span class="val"><s:property value="[0].containerSetting.pcrPid" /></span>
	</div>

</div>