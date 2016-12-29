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
jspContext.addCssRef("style/MultiLineTab.css");
jspContext.addCssRef("style/PopupMenu.css");
jspContext.addCssRef("style/TaskDetail.css");
jspContext.addCssRef("style/alertmsg.css");

jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/Validator.js");
jspContext.addJSRef("js/controls/alertmsg.js");
jspContext.addJSRef("js/controls/farbtastic.js");
jspContext.addJSRef("js/controls/Palette.js");
jspContext.addJSRef("js/controls/jqueryFileTree.js");
jspContext.addJSRef("js/controls/FileView.js");
jspContext.addJSRef("js/controls/MultiLineTab.js");
jspContext.addJSRef("js/controls/NameDialog.js");
jspContext.addJSRef("js/controls/MediaInfoControl.js");
jspContext.addJSRef("js/controls/LineSelector.js");
jspContext.addJSRef("js/common/Lang_"+ currLang +".js");
jspContext.addJSRef("js/common/MediaInfoParser.js");
jspContext.addJSRef("js/common/playerutil.js");
jspContext.addJSRef("js/template/input/PreviewAdvertisement.js");
jspContext.addJSRef("js/template/input/SDIPreview.js");
jspContext.addJSRef("js/template/input/ProgramPreview.js");
jspContext.addJSRef("js/template/input/InputPreview.js");
jspContext.addJSRef("js/template/output/OutputPreview.js");
jspContext.addJSRef("js/common/KeyHandler.js");
jspContext.addJSRef("js/common/String_"+currLang+".js");
jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/template/input/InputData.js");
jspContext.addJSRef("js/template/editor/EditorMosaicData.js");
jspContext.addJSRef("js/template/editor/EditorMosaic.js");
jspContext.addJSRef("js/template/editor/EditorTrim.js");
jspContext.addJSRef("js/template/editor/EditorPaddingImage.js");
jspContext.addJSRef("js/template/editor/EditorAudioProcess.js");
jspContext.addJSRef("js/template/editor/EditorTimeClipping.js");
jspContext.addJSRef("js/template/editor/Advertisement.js");
jspContext.addJSRef("js/template/editor/AdvertisementData.js");
jspContext.addJSRef("js/template/editor/EditorLogoInserter.js");
jspContext.addJSRef("js/template/editor/EditorPipInserter.js");
jspContext.addJSRef("js/template/editor/EditorSubtitleData.js");
jspContext.addJSRef("js/template/editor/EditorSubtitle.js");
jspContext.addJSRef("js/template/editor/Watermarking.js");
jspContext.addJSRef("js/template/editor/ImageGrabbing.js");
jspContext.addJSRef("js/template/editor/MotionIcon.js");
jspContext.addJSRef("js/template/editor/DynamicText.js");
jspContext.addJSRef("js/template/editor/VideoDrm.js");
jspContext.addJSRef("js/template/input/AlternateURI.js");
jspContext.addJSRef("js/template/input/CandidateSdi.js");
jspContext.addJSRef("js/template/input/Joined.js");
jspContext.addJSRef("js/template/input/InputEditor.js");
jspContext.addJSRef("js/template/input/ProgramEditor.js");
jspContext.addJSRef("js/template/input/Input.js");
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
jspContext.addJSRef("js/template/output/TSAdvancedOptions.js");
jspContext.addJSRef("js/template/output/MxfSetting.js");
jspContext.addJSRef("js/template/output/Mp4Setting.js");
jspContext.addJSRef("js/template/output/AviSetting.js");
jspContext.addJSRef("js/template/output/ESSetting.js");
jspContext.addJSRef("js/template/output/TSOverRTPSetting.js");
jspContext.addJSRef("js/template/output/DRMOptions.js");
jspContext.addJSRef("js/template/output/OutputGroupData.js");
jspContext.addJSRef("js/template/output/OutputGroup.js");
jspContext.addJSRef("js/template/output/CandidateOutput.js");
jspContext.addJSRef("js/template/output/CandidateOutput.js");
jspContext.addJSRef("js/task/TaskData.js");
jspContext.addJSRef("js/task/Task.js");
jspContext.addJSRef("js/xmlparser/TaskParser.js");

%>

