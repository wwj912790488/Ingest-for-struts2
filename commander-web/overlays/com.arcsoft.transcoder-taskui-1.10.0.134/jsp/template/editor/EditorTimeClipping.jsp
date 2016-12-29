<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TabTimeClipping" class="InputEditorPanel EditorTimeClipping">
	<input type="hidden" name="TimeClippingTrimmed" value="<s:if test='![0].timesliceClipping.trimmed'>0</s:if>"/>
	<div Class="Unsupport">
		<span class="TaskLabelText"><s:text name="editor.media_is_not_supported"/></span>
	</div>
	<div Class="Support">
		<table><tr>
			<td style="width: 160px">
				<input type="checkbox" name="TimeClippingEnable" class="DefaultCheckbox"
					<s:if test='[0].timesliceClipping.enabled'>checked="checked"</s:if>/>
				<span class="TaskLabelText"><s:text name="editor.open_clipping"/></span>
			</td>
			<td style="width: 120px">
				<input type="radio" name="TimeClippingMode" class="DefaultCheckbox" 
					value="true" checked="checked"/><span class="TaskLabelText"><s:text name="editor.reserve_inside"/></span>
			</td>
			<td style="width: 120px">
				<input type="radio" name="TimeClippingMode" class="DefaultCheckbox" 
					value="false"/><span class="TaskLabelText"><s:text name="editor.reserve_outside"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button NewClipTrigger"><s:text name="editor.new_clipping"/></div>
			</td>
		</tr></table>
		<div class="LineSpacing"></div>
		<div class="ClipContainer" style="height: 180px; overflow-y: auto;">
			<s:iterator value="[0].timesliceClipping.timeslices">
			<s:include value="/jsp/template/editor/Timeslice.jsp" />
			</s:iterator>
		</div>
		<div class="LineSpacing"></div>
	</div>
</div>