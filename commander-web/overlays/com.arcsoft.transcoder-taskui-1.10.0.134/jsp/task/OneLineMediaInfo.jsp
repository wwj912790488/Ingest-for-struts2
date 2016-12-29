<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>
	<div id="proginfo">
		<span>
			<span><s:text name="input.program"/>: </span>
			<span>${program==null ? "N/A" : program.name}</span>
			<span><s:text name="input.audio_track"/>: </span>
			<span>${audioInfo==null ? "N/A" : audioInfo.get("name")}</span>
			<span><s:text name="input.subtitle"/>: </span>
			<span>${subtitleInfo==null ? "N/A" : subtitleInfo.get("name")}</span>
		</span>
	</div>
	
	<div id="minfo">
		<%@ include file="../common/MediaInfoSimpleDescription.jsp" %>
	</div>

</div>