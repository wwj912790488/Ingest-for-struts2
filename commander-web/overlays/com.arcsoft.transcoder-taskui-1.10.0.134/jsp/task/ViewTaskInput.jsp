<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

	<div style="display:none">	
		<s:iterator value="inputs" var="input" status="status">	
			<div id="iuri"><s:property value="[0].body.getInputMediaInfoURI(null)" /></div>
		</s:iterator>			
	</div>

	<div class="HeadTitle Head1Text"><s:text name="label.input" /> (${inputs.size()})</div>
	
	<div class="Content TableItemText">
		<s:iterator value="inputs" var="input" status="status">
		<div id="inputinfo" class="Row">
			<div class="ThumbCol">
				<img id="TaskImg" src="images/icons/task_ready.png" width="120" height="68"/>
			</div>			
			<div class="InputDetail">
			
				<div id="iSrcType" class="Item">
					<span class="Lbl"><s:text name="label.inputType" />:</span>
					${input.inputType}					
				</div>
				
				<div id="iSrcUri" class="Item" >							
					<s:if test='#input.videoInputType.equalsIgnoreCase("SDI")||#input.videoInputType.equalsIgnoreCase("ASI")'>
						<span class="Lbl"><s:text name="common.port"/>:</span>
						${input.body.channel}	
					</s:if>
					<s:else>
						<span class="Lbl"><s:text name="label.inputUrl" />:</span>
						<span class="Val"><s:property value="body.uri" /></span>
					</s:else>				
				</div>
				
				<div id="iSrcExtraInfoContainer" class="Item">
					<span class="Lbl"></span>
					<span id="iSrcExtraInfo">		
							<span id="iSrcCh" style="display:none">		
								<span id="iSrcChVal" style="display:none">${input.programId }</span>						
							</span>
							<span id="iSrcTr" style="display:none">
								<span id="iSrcTrVal" style="display:none">${input.audioTrackId }</span>
							</span>
							<span id="iSrcSt" style="display:none">
								<span id="iSrcStVal" style="display:none">${input.subtitleId }</span>
							</span>
							<span id="iSrcExtraInfoDesc"></span>
					</span>
				</div>
				
							
				<div id="iSrcMediaInfoContainer" class="Item">
					<span class="Lbl"><!-- <s:text name="input.media_info"/>: --> </span>
					<span id="MediaInfo"></span>
				</div>	
				
				<div id="optional_inputs" class="item">
					<%@ include file="../incTaskView/input/AlternateURIContainer.jsp" %>
				</div>
							
				<div id="preprocess_edit" class="Item">	
					<span class="Lbl">
						<s:text name="title.preprocess">
							<s:param></s:param>
							<s:param></s:param>
							<s:param></s:param>
							<s:param></s:param>
						</s:text>
					</span>	
					<span>		
						<%@ include file="../incTaskView/input/InputEditorOneLine.jsp" %>
					</span>
				</div>
				
			</div>			
		</div>
		</s:iterator>
	</div>
	

	



