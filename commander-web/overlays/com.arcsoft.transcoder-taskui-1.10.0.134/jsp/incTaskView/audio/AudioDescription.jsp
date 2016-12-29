<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AudioDescription">

	<s:if test='#audioDescription.passthrough'>
		<span class="TaskLabelText">Pass through</span>
	</s:if>
	<s:else>	

		<s:if test='#audioDescription.settingsType.equalsIgnoreCase("AAC")'>	
			<%@ include file="AudioAAC.jsp" %>
		</s:if>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("AMR")'>
			<%@ include file="AudioAMR.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("MP2")'>
			<%@ include file="AudioMP2.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("MP3")'>
			<%@ include file="AudioMP3.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("AC3")'>
			<%@ include file="AudioAC3.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("PCM")'>
			<%@ include file="AudioPCM.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("DD+")'>
			<%@ include file="AudioDDPlus.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("WMA")'>
			<%@ include file="AudioWMA.jsp" %>
		</s:elseif>
		<s:elseif test='#audioDescription.settingsType.equalsIgnoreCase("Vorbis")'>
			<%@ include file="AudioVorbis.jsp" %>
		</s:elseif>			
	</s:else>	
</div>
