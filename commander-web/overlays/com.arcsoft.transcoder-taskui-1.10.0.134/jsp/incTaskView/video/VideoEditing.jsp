<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="VideoEditing" class="ParamTableBody VideoEditing">

	<div class="EditorLogoInserter">
		<div class="title">
			<span class="TaskHead2Text"><s:text name="editor.logo"/></span> 
		</div>
		<%@ include file="../editor/EditorLogo.jsp" %>
	</div>
	
	<div class="EditorSubtitle">
		<div class="title">
			<span class="TaskHead2Text"><s:text name="input.subtitle"/></span> 
			<span class="EditorEnabled">
				(<s:text name="%{#liveOutput.streamAssembly.videoDescription.subtitleInserter.enabled ? 'editor.enabled' : 'editor.disabled'}"/>)
			</span>
		</div>
		<%@ include file="../editor/EditorSubtitle.jsp" %>
	</div>
</div>
