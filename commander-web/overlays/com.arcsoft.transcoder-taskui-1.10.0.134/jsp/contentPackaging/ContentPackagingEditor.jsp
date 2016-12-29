<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%@ page import="com.arcsoft.arcvideo.web.jsp.JspContext"%>


<html>
<head>
<s:include value="/jsp/include/LicenseData.jsp"/>
<s:set var="currLang" value="locale.language" scope="request" />

<%
String currLang = (String)request.getAttribute("currLang");
//String currLang = "zh";
JspContext jspContext = new JspContext(request, response, out);

jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/jqueryFileTree.css");
jspContext.addCssRef("style/farbtastic.css");
jspContext.addCssRef("style/PopupMenu.css");
jspContext.addCssRef("style/pattern2/TaskDetail.css");
jspContext.addCssRef("style/alertmsg.css");
jspContext.addCssRef("style/ContentPackaging.css");

jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/Validator.js");
jspContext.addJSRef("js/common/String_" + currLang + ".js");
jspContext.addJSRef("js/controls/FileView.js");
jspContext.addJSRef("js/controls/jqueryFileTree.js");
jspContext.addJSRef("js/template/input/InputData.js");
jspContext.addJSRef("js/common/playerutil.js");
jspContext.addJSRef("js/controls/farbtastic.js");
jspContext.addJSRef("js/controls/Palette.js");
jspContext.addJSRef("js/controls/LineSelector.js");

jspContext.addJSRef("js/contentPackaging/ContentPackagingEditor.js");
jspContext.addJSRef("js/contentPackaging/ContentPackagingDef.js");
jspContext.addJSRef("js/contentPackaging/ContentTab.js");
jspContext.addJSRef("js/xmlparser/TaskParser.js");
jspContext.addJSRef("js/template/editor/MotionIcon.js");
jspContext.addJSRef("js/template/editor/DynamicText.js");
jspContext.addJSRef("js/template/editor/EditorSubtitleData.js");
jspContext.addJSRef("js/template/video/VideoData.js");
%>
</head>

<body onload="OnContentPackagingLoad()">
	<div class="ContentPackagePos">
		<s:include value="/jsp/contentPackaging/ContentPackagingBody.jsp"/>
	</div>
	
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/controls/DialogFrame.jsp"/>
		<s:include value="/jsp/controls/Palette.jsp"/>
		<s:include value="/jsp/controls/LineSelector.jsp"/>

		<s:include value="/jsp/contentPackaging/ContentTab.jsp"/>
		<s:include value="/jsp/contentPackaging/ContentMotionIcon.jsp"/>
		<s:include value="/jsp/contentPackaging/ContentDynamicText.jsp"/>
	</div>
</body>
</html>
