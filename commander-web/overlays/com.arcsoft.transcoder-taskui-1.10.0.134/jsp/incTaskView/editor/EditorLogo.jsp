<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>
	<s:iterator value="#liveOutput.streamAssembly.videoDescription.imageInserters"  status="iterStatus">
		<div>			
			<div class="paramCol1">
				<span class="TaskLabelText lbl">
					<span><s:property value="#iterStatus.count"/> . </span>
					<s:text name="editor.logo.image_file"/>:
				</span>
				<span class="val"><s:property value="[0].location.uri"/></span>
			</div>
			<div class="paramCol1">
				<span class="TaskLabelText lbl"><s:text name="editor.xpos"/>:</span>
				<span class="val"><s:property value="[0].imageX"/></span>
			</div>
			<div class="param">
				<span class="TaskLabelText lbl"><s:text name="editor.ypos"/>:</span>
				<span class="val"><s:property value="[0].imageY"/></span>
			</div>
			<div class="param">
				<span class="TaskLabelText lbl"><s:text name="editor.logo.opacity"/>:</span>
				<span class="val"><s:property value="[0].opacity"/>%</span>
			</div>
			
		</div>	
	</s:iterator>
</div>
