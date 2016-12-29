<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

	<div class="task_server_info" style="display:none">
		<span id="taskServerId"><s:property value="task.curServerId"/></span>
		<span id="taskGroupId"><s:property value="task.groupId"/></span>
		<span id="taskType"><s:property value="task.type"/></span>
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

				<div id="iSrcMediaInfoContainer" class="Item">
					<s:if test='!#input.videoInputType.equalsIgnoreCase("SDI")&&!#input.videoInputType.equalsIgnoreCase("ASI")'>
					<div class="row">
						<span class="TaskLabelText lbl"><s:text name="input.localEth"/>:</span>
						<span class="val"><s:property value="getLocalIpOption(#input.body.srcIp)" /></span>
					</div>
					</s:if>
					<div style="display: none" class="media_info">
						<span class="media_program_id"><s:property value='#input.programId'/></span>
						<span class="media_audio_id"><s:property value='#input.audioTrackId'/></span>
						<span class="media_subtitle_id"><s:property value='#input.subtitleId'/></span>
						<span class="media_url"><s:property value='#input.body.uri'/></span>
						<span class="media_eth"><s:property value="#input.body.srcIp" /></span>
					</div>
					<div class="row">
						<span class="TaskLabelText lbl"></span>
						<span class="val"></span>
					</div>
					<div class="row">
						<span class="TaskLabelText lbl"></span>
						<span class="val"></span>
					</div>
				</div>

				<div id="optional_inputs" class="item">
					<div class="list2columns">
						<s:if test="#input.body.candidateLocationType!=0">
						<s:iterator value="[0].body.candidateLocations" status="status" var="theLocation">
							<div class="row">
								<span class="TaskLabelText lbl">
									<s:text name="%{'CandidateLocation.type.'+#input.body.candidateLocationType}"/>:
								</span>
								<span class="val"><s:property value='#theLocation.uri'/></span>
							</div>
							<div class="row">
								<span class="TaskLabelText lbl"><s:text name="input.localEth"/>:</span>
								<span class="val"><s:property value="getLocalIpOption(#theLocation.srcIp)" /></span>
							</div>
							<div style="display: none" class="media_info">
								<span class="media_program_id"><s:property value='#theLocation.programId'/></span>
								<span class="media_audio_id"><s:property value='#theLocation.audioTrackId'/></span>
								<span class="media_subtitle_id"><s:property value='#theLocation.subtitleId'/></span>  
								<span class="media_url"><s:property value='#theLocation.uri'/></span>
								<span class="media_eth"><s:property value="#theLocation.srcIp"/></span>
							</div>
							<div class="row">
								<span class="TaskLabelText lbl"></span>
								<span class="val"></span>
							</div>
							<div class="row">
								<span class="TaskLabelText lbl"></span>
								<span class="val"></span>
							</div>
						</s:iterator>
						</s:if>
					</div>
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
	

	



