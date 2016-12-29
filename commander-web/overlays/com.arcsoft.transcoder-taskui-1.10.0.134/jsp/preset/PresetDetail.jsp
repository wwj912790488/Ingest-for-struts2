<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!-- <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> -->
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %>

<s:include value="/jsp/preset/presetjs.jsp"/>

</head>

<body onload="OnPageReady()">
	<%request.setAttribute("__topTabActive__", "tmplmgr|preset");%><%@ include file="/jsp/include/top.jsp" %>
	
	<div class="TaskContentPos">
		<s:push value="[0].preset">
			<s:include value="/jsp/preset/PresetBody.jsp"/>
			<s:include value="/jsp/preset/presetbutton.jsp"/>
		</s:push>
	</div>
	<div style="height: 100px"></div>
	
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/preset/presettemplate.jsp"/>
	</div>
</body>
</html>