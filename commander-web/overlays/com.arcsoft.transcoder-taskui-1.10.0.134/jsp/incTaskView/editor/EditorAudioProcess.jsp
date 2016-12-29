<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>
		<span class="TaskLabelText paramlbl"><s:text name="editor.audio_delay"/>:</span>
		<span class="paramval"><s:property value='[0].audioDelay' /> 
			<s:text name="common.millisecond"/> 
		</span>
</div>
