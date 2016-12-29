<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>

	<span class="TrimParam">
		<span class="paramlbl"><s:text name="editor.xpos"/>:</span>
		<span class="paramval"><s:property value='[0].cropping.x' /></span>
	</span>	
	
	<span class="TrimParam">
		<span><s:text name="editor.ypos"/>:</span>
		<span class="paramval"><s:property value='[0].cropping.y' /></span>
	</span>
	
	<span class="TrimParam">	
		<span class="paramlbl"><s:text name="editor.width"/>:</span>
		<span class="paramval"><s:property value='[0].cropping.width' /></span>
	</span>
	
	<span class="TrimParam">
		<span class="paramlbl"><s:text name="editor.height"/>:</span>
		<span class="paramval"><s:property value='[0].cropping.height' /></span>
	</span>
	
</div>