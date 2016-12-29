<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>

	<s:if test="[0].paddingImage!=null">
		<span class="TaskLabelText paramlbl"><s:text name="editor.padding_image"/>:</span>
		<span class="paramval"><s:property value='[0].paddingImage' /></span>
	</s:if>
	
</div>