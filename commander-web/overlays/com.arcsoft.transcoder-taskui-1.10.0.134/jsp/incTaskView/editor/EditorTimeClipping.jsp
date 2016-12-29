<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>
	<div>
		<span>				
			<s:if test='[0].timesliceClipping.trimmed'>
				<s:text name="editor.reserve_inside"/>
			</s:if> 
			<s:else>
				<s:text name="editor.reserve_outside"/>	
			</s:else>
		</span>
	</div>
	<div class="TimeSlices">
	<s:iterator value="[0].timesliceClipping.timeslices">
		<div class="TimeSlice">
			<span class="TimeSliceParam">
				<span><s:text name="editor.enter_point"/>:</span>
				<s:property value='[0].start' />
			</span>
			<span class="TimeSliceParam">	
				<span><s:text name="editor.exit_point"/>:</span>
				<s:property value='[0].end' />
			</span>
		</div>
	</s:iterator>	
	</div>
</div>