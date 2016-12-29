<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %>

<s:include value="/jsp/preset/presetjs.jsp"/>

<style type="text/css">
html, body {
	overflow: hidden;
}
.ContentPos {
	width: auto;
	margin-left: 0px;
	margin-right: 0px;
	position: absolute;
	top: 20px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	overflow-y: auto;
}
.TitleHeadSpacing {
	height: 0px;
}
</style>

</head>

<body onload="OnPageReady()">
	<div class="ContentPos">
		<s:push value="[0].preset">
			<s:include value="/jsp/preset/PresetBody.jsp"/>
			<s:include value="/jsp/preset/presetbutton.jsp"/>
			<div style="height: 100px"></div>
		</s:push>
	</div>
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/preset/presettemplate.jsp"/>
	</div>
</body>
</html>
