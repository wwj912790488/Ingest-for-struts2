<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Editor" class="Editor">
	<div class="title">
		<s:text name="input.editing"/>
	</div>
	<div class="EditorItem EditorMosaic">
		<div class="EditorItemTitle"><s:text name="editor.mosaic"/></div>
		<div class="EditorItemBody"><%@ include file="../editor/EditorMosaic.jsp"%></div>
	</div>
	<div class="EditorItem EditorTrim">	
		<div class="EditorItemTitle">
			<span><s:text name="editor.cropping"/></span>			  
			<span class="EditorEnabled">
				(<s:text name="%{#input.cropping.enabled ? 'editor.enabled' : 'editor.disabled'}"/>)
			</span>			
		</div>
		<div class="EditorItemBody">
			<s:if test="#input.cropping.enabled">
				<%@ include file="../editor/EditorTrim.jsp"%>
			</s:if>
		</div>
	</div>	
	<div class="EditorItem EditorTimeClipping">	
		<div class="EditorItemTitle">
			<span><s:text name="editor.clipping"/></span>
			<span class="EditorEnabled">
				(<s:text name="%{#input.timesliceClipping.enabled ? 'editor.enabled' : 'editor.disabled'}"/>)
			</span>
		</div>
		<div class="EditorItemBody">
			<s:if test="#input.timesliceClipping.enabled">
				<%@ include file="../editor/EditorTimeClipping.jsp"%>
			</s:if>
		</div>
	</div>
	<div class="EditorItem Advertisement">	
		<div class="EditorItemTitle"><s:text name="editor.advertisement"/></div>
		<div class="EditorItemBody"><%@ include file="../editor/Advertisement.jsp"%></div>
	</div>	
	<div class="EditorItem EditorPaddingImage">
		<div class="EditorItemTitle"><s:text name="editor.padding_image"/></div>
		<div class="EditorItemBody"><%@ include file="../editor/EditorPaddingImage.jsp"%></div>
	</div>									
	<div class="EditorItem EditorAudioProcess">
		<div class="EditorItemTitle"><s:text name="editor.audio_process"/></div>
		<div class="EditorItemBody"><%@ include file="../editor/EditorAudioProcess.jsp"%></div>
	</div>		
</div>
