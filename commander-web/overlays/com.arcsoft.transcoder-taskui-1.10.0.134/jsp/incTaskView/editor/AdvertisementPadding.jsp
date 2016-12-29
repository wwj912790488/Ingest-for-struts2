<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AdvertisementPadding list2columns">

<s:if test="[0].advertisementInserter.mv4Enlight.uri!=null && ![0].advertisementInserter.mv4Enlight.uri.isEmpty() || [0].advertisementInserter.mv4Enlight.logoUri!=null && ![0].advertisementInserter.mv4Enlight.logoUri.isEmpty() ">
	
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="editor.total_duration"/>:</span>
		<span class="val"><s:property value='[0].advertisementInserter.mv4Enlight.totalDuration' /></span>
	</div>		
	
	<div class="row">		
		<span class="TaskLabelText lbl"><s:text name="editor.padding_type"/>:</span>			
		<span class="val"><s:text name="%{'mvenlight.padding.type.' + [0].advertisementInserter.mv4Enlight.padding}" /></span>		
	</div>
		
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="editor.padding_mv"/>:</span>
		<span class="val"><s:property value='[0].advertisementInserter.mv4Enlight.uri' /></span>
	</div>

	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="editor.padding_logo"/>:</span>
		<span class="val"><s:property value='[0].advertisementInserter.mv4Enlight.logoUri' /></span>
	</div>
	
</s:if>
	
</div>