<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoEditing">
	<div class="BlockSpacing"></div>
	<table>
		<tr>
			<td width="30"><div class="VideoEditingExpandTrigger VideoEditingExpandIcon ICON_ArrowRight MouseHover"></div></td>
			<td>
				<a href="javascript:void(0);" class="A_ClickWrapper" >
				<span class="TaskHead2Text VideoEditingExpandTrigger MouseHover"><s:text name="video.output_editor"/></span>
				</a>
			</td>
		</tr>
	</table>
	<div class="VideoEditingExpandTarget">
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/EditorLogo.jsp"/>
		<div class="BlockSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/EditorPip.jsp"/>
		<div class="BlockSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/EditorSubtitle.jsp"/>
		<div class="BlockSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/Watermarking.jsp"/>
		<div class="BlockSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/ImageGrabbing.jsp"/>
		<div class="BlockSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/MotionIcon.jsp"/>
		<div class="BlockSpacing"></div>
		<s:include value="/jsp/template/editor/duplicate/DynamicText.jsp"/>
		<div class="BlockSpacing"></div>
	</div>
</div>
