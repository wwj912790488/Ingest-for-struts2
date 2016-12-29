<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%@ page import="com.arcsoft.arcvideo.web.jsp.JspContext"%>

<s:include value="/jsp/include/LicenseData.jsp"/>
<s:set var="currLang" value="locale.language" scope="request" />

<%
String currLang = (String)request.getAttribute("currLang");
JspContext jspContext = new JspContext(request, response, out);

jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/jqueryFileTree.css");
jspContext.addCssRef("style/farbtastic.css");
jspContext.addCssRef("style/PopupMenu.css");
jspContext.addCssRef("style/TaskDetail.css");

jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/Validator.js");
jspContext.addJSRef("js/controls/farbtastic.js");
jspContext.addJSRef("js/controls/Palette.js");
jspContext.addJSRef("js/controls/jqueryFileTree.js");
jspContext.addJSRef("js/controls/FileView.js");
jspContext.addJSRef("js/controls/LineSelector.js");
jspContext.addJSRef("js/template/output/OutputPreview.js");
jspContext.addJSRef("js/common/KeyHandler.js");
jspContext.addJSRef("js/common/String_"+currLang+".js");
jspContext.addJSRef("js/controls/MediaInfoControl.js");
jspContext.addJSRef("js/common/Lang_"+ currLang +".js");
jspContext.addJSRef("js/common/MediaInfoParser.js");
jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/template/input/InputData.js");
jspContext.addJSRef("js/template/editor/EditorLogoInserter.js");
jspContext.addJSRef("js/template/editor/EditorPipInserter.js");
jspContext.addJSRef("js/template/editor/EditorSubtitleData.js");
jspContext.addJSRef("js/template/editor/EditorSubtitle.js");
jspContext.addJSRef("js/template/editor/Watermarking.js");
jspContext.addJSRef("js/template/editor/ImageGrabbing.js");
jspContext.addJSRef("js/template/editor/MotionIcon.js");
jspContext.addJSRef("js/template/editor/DynamicText.js");
jspContext.addJSRef("js/template/editor/VideoDrm.js");
jspContext.addJSRef("js/template/video/VideoProcessingData.js");
jspContext.addJSRef("js/template/video/VideoProcessing.js");
jspContext.addJSRef("js/template/video/VideoData.js");
jspContext.addJSRef("js/template/video/VideoCodec.js");
jspContext.addJSRef("js/template/video/EncodingPolicyData.js");
jspContext.addJSRef("js/template/video/Video.js");
jspContext.addJSRef("js/template/audio/AudioData.js");
jspContext.addJSRef("js/template/audio/Audio.js");
jspContext.addJSRef("js/template/output/Stream.js");
jspContext.addJSRef("js/template/output/Output.js");
jspContext.addJSRef("js/task/TaskData.js");
jspContext.addJSRef("js/preset/Preset.js");
jspContext.addJSRef("js/xmlparser/TaskParser.js");
%>


