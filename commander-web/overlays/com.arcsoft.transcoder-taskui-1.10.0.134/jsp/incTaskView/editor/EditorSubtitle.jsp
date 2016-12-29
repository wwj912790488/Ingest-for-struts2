<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="EditorSubtitle">
	<s:iterator value="#liveOutput.streamAssembly.videoDescription.subtitleInserters"  status="iterStatus">
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.file"/>:</span>
		<span class="val"><s:property value="[0].location.uri"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.chinese_font"/>:</span>
		<span class="val"><s:property value="[0].font"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.chinese_size"/>:</span>
		<span class="val"><s:property value="[0].size"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.english_font"/>:</span>
		<span class="val"><s:property value="[0].englishFont"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.english_size"/>:</span>
		<span class="val"><s:property value="[0].englishSize"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.xpos"/>:</span>
		<span class="val"><s:property value="[0].left"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.ypos"/>:</span>
		<span class="val"><s:property value="[0].getTop()"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.width"/>:</span>
		<span class="val"><s:property value="[0].width"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.height"/>:</span>
		<span class="val"><s:property value="[0].height"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.vertical_position"/>:</span>
		<span class="val"><s:property value="[0].virticalPosition"/></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.color"/>:</span>
		<span class="val"><s:property value="[0].color"/> (RRGGBB)</span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.synchronization"/>:</span>
		<span class="val">
			<s:property value="[0].sync"/>
			<span class="TaskContentText"><s:text name="common.millisecond"/></span>
		</span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="editor.subtitle.opacity"/>:</span>
		<span class="val"><s:property value="[0].opacity"/>%</span>
	</div>
	</s:iterator>
</div>
