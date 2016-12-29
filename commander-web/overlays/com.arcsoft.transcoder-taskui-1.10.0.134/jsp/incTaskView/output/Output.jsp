<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	//stack[0]: liveOutput : LiveOutput
%>
<div id="OutputStream" class="OutputStream">

	<div class="Title">
		<span class="IconExpand" onclick="toggleViewBlock(this, this.parentNode.parentNode)"></span>
		<span><%@ include file="../../common/OutputSimpleDescription.jsp" %></span>
		<span>
			<s:if test="#liveOutput.streamAssembly.presetId>0" >
				(<s:text name="stream.linked_preset"/>)
			</s:if>
		</span>

	</div>	
		
	<div id="Body" class="Body">	
	
		<div class="Video">
			<div class="head1"><s:text name="video.video"/></div>
			<div>
				<s:if test='#liveOutput.streamAssembly.videoDescription != null'>
					<%@ include file="../video/VideoDescription.jsp" %>
				</s:if>
			</div>
		</div>
	
		<div class="Audio">
			<div class="head1"><s:text name="audio.audio" /></div>
			<div>
				<s:iterator value="#liveOutput.streamAssembly.audioDescriptions" var="audioDescription" status="iterStatus">
					<%@ include file="../audio/AudioDescription.jsp" %>
				</s:iterator>
			</div>
		</div>
	</div>
	
</div>
