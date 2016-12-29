<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.arcsoft.web4transcoder.domain.*" %>
<%@ page import="com.arcsoft.web4transcoder.domain.input.*" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%
	if(request.getAttribute("input")!=null) {
		Input input = (Input)request.getAttribute("input");
		if(input.getBody() instanceof DiscInput) {			
			List lcs = input.getBody().getCandidateLocations();
			if(lcs!=null && !lcs.isEmpty()){
				List tmplcs = new ArrayList(lcs);
				tmplcs.remove(0);
				request.setAttribute("candidateLocations", tmplcs);
			}
			request.setAttribute("CandidateLocationType", "CandidateLocation.type.2");
		}
		else if(input.getBody() instanceof Location) {
			List lcs = input.getBody().getAdditionalAudios();
			if(lcs!=null && !lcs.isEmpty()){
				request.setAttribute("candidateLocations", lcs);
			}
			request.setAttribute("CandidateLocationType", "CandidateLocation.type.3");
		}
		else if(input.getBody() instanceof NetworkInput 
				|| input.getBody() instanceof SdiDeviceInput) {
			List lcs = input.getBody().getCandidateLocations();
			if(lcs!=null && !lcs.isEmpty()){
				request.setAttribute("candidateLocations", lcs);
			}
			request.setAttribute("CandidateLocationType", "CandidateLocation.type.1");
		}
	}
%>
<div class="list2columns">
	<s:iterator value="#request.candidateLocations" var="theLocation">
		<div class="row">			
			<span class="TaskLabelText lbl">
				<s:text name="%{#request.CandidateLocationType}"/>:
			</span>
			<span class="val"><s:property value='[0].uri'/></span>
		</div>
		
		<s:if test="[0].uri!=null && [0].uri.startsWith('udp:')">
		<div class="row">
			<span class="TaskLabelText lbl"><s:text name="input.localEth"/>:</span>
			<span class="val"><s:property value="getLocalIpOption(#theLocation.srcIp)" /></span>
		</div>		
		</s:if>
		
		<div class="row">
			<span class="TaskLabelText lbl"></span>
			<span class="val">		
				<s:set value="[0].getMediaInfoObject()" var="mediaInfoObject" scope="request"/>				
				<%@ include file="InputMediaInfo.jsp" %>
			</span>
		</div>	
		<div class="row">
			<span class="TaskLabelText lbl"></span>
			<span class="val">
				<%@ include file="../../common/MediaInfoSimpleDescription.jsp" %>
			</span>
		</div>						
	</s:iterator>
</div>