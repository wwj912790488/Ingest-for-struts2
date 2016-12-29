<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="DRMOptions">
	<div class="paramCol1">
		<span class="lbl" style="font-weight: bold;"><s:text name="output.drm_options"/></span>
		<span class="val"></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">DRM Service:</span>
		<span class="val"><s:property value="[0].drmDescription.enabled? 'Yes' :'No' "/></span>
		
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Service ID:</span>
		<span class="val"><s:property value="[0].drmDescription.drmSetting.contentId" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Server IP:</span>
		<span class="val"><s:property value="[0].drmDescription.drmSetting.serverIP" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl">Server Port:</span>
		<span class="val"><s:property value="[0].drmDescription.drmSetting.serverPort" /></span>
	</div>
</div>