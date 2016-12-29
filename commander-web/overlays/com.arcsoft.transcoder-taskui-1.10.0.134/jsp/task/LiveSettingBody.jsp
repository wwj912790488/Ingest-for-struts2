<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<form name="frm" id="LiveSettingForm" method="POST" action="liveSetting">
	<input type="hidden" name="groupId" value="${groupId}" />
	<input type="hidden" name="flag" value="${flag}" />
<div class="BodyMain">
	<div style="font-weight:bold;">
		<div class="TaskBody">
			<div class="Row">
				<div class="VideoSettingCol" style="text-align:right;padding-right:10px;">
					<a href="javascript:document.frm.reset()">重置所有</a>
				</div>
				<div class="MotionIconCol">
					<input type="checkbox" name="selectAll1" value="1" onchange="LS_SelectAll(this.checked,'motionIconId')"/>
					<span><s:text name="tl.motionicon" /></span>
					<div class="ApplyAllBtn ui-icon ui-icon-apply"></div><a href="javascript:LS_SaveMotionIcon()">${Apply}</a>
				</div>
				<div class="DyTextCol">
					<input type="checkbox" name="selectAll2" value="1" onchange="LS_SelectAll(this.checked,'dyTextId')"/>
					<span>动态文字</span>
					<div class="ApplyAllBtn ui-icon ui-icon-apply"></div><a href="javascript:LS_SaveDyText()">${Apply}</a>
				</div>
				<div class="PaddingCol">
					<input type="checkbox" name="selectAll3" value="1" onchange="LS_SelectAll(this.checked,'paddingId')"/>
					<span><s:text name="editor.padding_image"/></span>
					<div class="ApplyAllBtn ui-icon ui-icon-apply"></div><a href="javascript:LS_SavePadding()">${Apply}</a>
				</div>
			</div>
		</div>
	</div>
	<div id="TaskListContainer">
	<s:iterator value="tasks" var="task" >
		<div class="TaskEntry" id="${task.id}" running="${task.running?'1':''}">
			<div class="TaskTitle${task.isRunning()?'Running':''}">
				<div class="TitleW">
				<span><input type="checkbox" name="taskId" value="${task.id}"/></span>
				<span class="TaskId">${task.id} - </span>
				<span class="TaskName"><s:property value="name"/></span>
				</div>
			</div>					
			<div class="TaskBody">
				<s:if test="isRunning()">
				<s:iterator value="videoSettingItems" var="vsi" >
				<div class="Row">
					<div class="VideoSettingCol">
						<span><%@include file="../common/VideoSettingOneLine.jsp" %></span>
					</div>
					<div class="MotionIconCol">						
						<s:iterator value="motionIcons" var="mi" >
							<div class="MotionIcon" id="${mi.id}">
								<s:set value="fnIsMotionIconOn(#task.id,#mi)" name="checked" scope="request"/>
								<input type="hidden" name="motionIconIdAll" value="${task.id}-${mi.id}_${mi.isCtrlAllowed()?'y':'n'}-${checked?'y':'n'}" />											
								<input type="checkbox" name="motionIconId" value="${task.id}-${mi.id}" ${checked?'checked="checked"':''} ${mi.isCtrlAllowed()?'':'disabled="disabled"'}/>
								[${mi.id}]<s:property value="name"/> 
								<span style="display:inline-block;margin-left:15px;width:12px;height:12px;" class="${checked?'MotionIconOn':'MotionIconOff' }"></span>
								<span style="color:red;"><s:property value="errMsg"/></span>										
							</div>
						</s:iterator>						
					</div>
					<div class="DyTextCol">
						<s:iterator value="dyTextItems" var="dti" >
							<div class="DyText" id="${dti.id}">
								<s:set value="fnIsDyTextOn(#task.id,#dti)" name="checked" scope="request"/>								
								<input type="hidden" name="dyTextIdAll" value="${task.id}-${dti.id}_${dti.isCtrlAllowed()?'y':'n'}-${checked?'y':'n'}" />											
								<input type="checkbox" name="dyTextId" value="${task.id}-${dti.id}" ${checked?'checked="checked"':''} ${dti.isCtrlAllowed()?'':'disabled="disabled"'}"/>
								[${dti.id}]<s:property value="name"/>
								<span style="display:inline-block;margin-left:15px;width:12px;height:12px;" class="${checked?'MotionIconOn':'MotionIconOff' }"></span>						
								<span style="color:red;"><s:property value="errMsg"/></span>										
							</div>
						</s:iterator>						

					</div>
					<div class="PaddingCol">
						<s:if test="isSupportPaddingImage()">
							<input type="hidden" name="paddingIdAll" value="${task.id}_${task.isOnPaddingImageMode()?'y':'n'}" />	
							<input type="checkbox" name="paddingId" value="${task.id}" ${task.isOnPaddingImageMode()?'checked="checked"':''}/> 显示
							<span style="display:inline-block;margin-left:15px;width:12px;height:12px;" class="<s:property value="fnIsPaddingOn(#task.id)?'MotionIconOn':'MotionIconOff' "/> "></span>
						</s:if>
					</div>
				</div>
				</s:iterator>
				</s:if>
			</div>					
		</div>
	</s:iterator>
	</div>
</div>

</form>


