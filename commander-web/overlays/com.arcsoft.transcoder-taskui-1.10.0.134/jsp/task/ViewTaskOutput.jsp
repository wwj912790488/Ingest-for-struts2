<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

	
	<div class="HeadTitle Head1Text">
		<span>
		<s:text name="label.output" />
		( ${outputGroups.size()} <s:text name="label.groups">
			<s:param><s:if test="outputGroups.size()>1">s</s:if></s:param>
		</s:text>, ${task.streamAssemblys.size()} <s:text name="label.streams">
					<s:param><s:if test="task.streamAssemblys.size()>1">s</s:if></s:param>
		</s:text> )
		</span>
		
		<%--<span style="padding-left:40px;font-weight:normal;"><s:text name="taskDetail.encodingOption"/>：
			<s:text name="%{'TaskEncodingOption.' + [0].task.encodingOption}" />	 	
		</span> --%>
		
	</div>
		
	<div class="Content TableItemText">
		<form>
			<input type="hidden" id="OutputGroupCount" value="${outputGroups.size()}" />			
			<div id="OutputTab" style="width:99%"></div>
			<s:iterator value="outputGroups" var="outputGroup" status="status">
			<s:set name="outputGroupView" value="getOutputGroupView(#outputGroup)" />
			<div id="${outputGroup.label}" class="IdOutputGroup">
				<input type="hidden" id="OutputGroupContainer" value="${outputGroup.container}" />				
				<table class="OutputTableV">
					<tr>
						<td width="80px"><s:text name="label.outputType" />：</td>
						<td width="20px"><div class="LinePlaceHolder"></div></td>
						<td width="41%">
							<span class="Val">
								${outputGroup.settingsType} - ${outputGroup.container}
							</span>
						</td>
						<td width="9%"><s:text name="label.desc" />：</td>
						<td width="41%">
							<span class="Val"><s:property value="[0].description" /></span>
						</td>
					</tr>
					<tr>
						<td width="80px"><s:text name="label.outputUrl" />：</td>
						<td id="OutputURI_${outputGroup.label}" width="20px" class="OutputConnectedNA" ><div class="LinePlaceHolder"></div></td>
						<td colspan="3">
							<s:if test='[0].settingsType.equalsIgnoreCase("AppleStreaming")||[0].settingsType.equalsIgnoreCase("FileArchive")'>
								<div class="Val" style="max-width:800px;">
									<s:property value="#outputGroupView.outputLocation"/>
									<s:if test="#outputGroupView.outputLocation!=#outputGroupView.outputLocationNoMacro">
										(<s:property value="#outputGroupView.outputLocationNoMacro"/>)
									</s:if>									
								</div>
							</s:if>
							<s:else>
								<div class="Val" style="max-width:800px;">
									<s:if test="[0].settingsType=='HttpStreaming'"><span class="OutputPreviewUri">${urlbase}/<s:property value="#outputGroupView.outputLocation"/></span>
										<a class="OutputPreviewTrigger" href="javascript:void(0);" style="color:#0000ff"><s:text name="common.preview"/></a>
									</s:if>
									<s:else>
									<s:property value="#outputGroupView.outputLocation"/>
									</s:else>
									<s:if test="#outputGroupView.outputLocation!=#outputGroupView.outputLocationNoMacro">
										(<s:property value="#outputGroupView.outputLocationNoMacro"/>)
									</s:if>
								</div>
							</s:else>
						</td>
					</tr>
					<s:iterator value="outputGroupSetting.candidateOutputs" var="cOutput">
					<tr>
						<td width="80px"><s:text name="input.alternate_location" />：</td>
						<td id="CandidateURI_${cOutput.label}" width="20px" class="OutputConnectedNA" ><div class="LinePlaceHolder"></div></td>
						<td colspan="3">
							<div class="Val" style="max-width:800px;">
								<s:if test='[0].settingsType.equalsIgnoreCase("AppleStreaming")'>
								<s:property value="[0].uri" />/<s:property value="#outputGroup.outputGroupSetting.targetName"/>.m3u8
								</s:if>
								<s:else>
								<s:property value="[0].uri" />
								</s:else>
							</div>
						</td>
					</tr>
					</s:iterator>
					<tr>
						<td width="80px" valign="top"><s:text name="label.outputParam" />：</td>
						<td width="20px"><div class="LinePlaceHolder"></div></td>
						<td colspan="3">
							<div>
								<s:iterator value="#outputGroup.liveOutputs" var="liveOutput">
									<div style="margin-bottom:3px;">
									<%@ include file="../common/OutputSimpleDescription.jsp" %>
									</div>
								</s:iterator>
							</div>
						</td>
					</tr>
				</table>
			</div>
			</s:iterator>
		</form>
	</div>


