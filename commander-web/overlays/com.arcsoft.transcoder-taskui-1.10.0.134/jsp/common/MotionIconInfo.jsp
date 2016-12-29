<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>
	<div id="fileName"><s:property value="[0].fileName"/></div>
	<div id="width"><s:property value="[0].imageInfo.width"/></div>
	<div id="height"><s:property value="[0].imageInfo.height"/></div>
</div>