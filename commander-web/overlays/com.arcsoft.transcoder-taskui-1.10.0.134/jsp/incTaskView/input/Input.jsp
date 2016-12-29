<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.web4transcoder.domain.input.*" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	//stack [0] : input	(with detail info)
%>
<div id="Input" class="Input">

	<div class="list2columns ParamTable">	
		<div class="row">
			<span class="TaskLabelText lbl"><s:text name="input.inputSource"/>:</span>
			<span class="val"><s:property value = '[0].getVideoInputType()'/></span>
		</div>	
			
		<%if(request.getAttribute("input")!=null) { 
			  Input input = (Input)request.getAttribute("input");
		%>			  
			<%if(input.getBody() instanceof NetworkInput) {%>	
				<%@ include file="InputNetwork.jsp" %>
			<%}else if(input.getBody() instanceof DeviceInput){ %>
				<%@ include file="InputDevice.jsp" %>
			<%}else{ %>
				<%@ include file="InputLocalFile.jsp" %>
			<%}%>
		
		<%}%>
		
	</div>	
	
	<!-- CandidateLocations -->	
	
	<%@ include file="AlternateURIContainer.jsp" %>
	
	<!-- input preprocess -->	
	<% %>	
	<%@ include file="InputEditor.jsp" %>	
	
</div>
