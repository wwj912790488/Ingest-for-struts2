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
		<s:include value="/jsp/template/editor/EditorLogo.jsp"/>
		<s:include value="/jsp/template/editor/EditorPip.jsp"/>
		<s:include value="/jsp/template/editor/EditorSubtitle.jsp"/>
		<s:include value="/jsp/template/editor/Watermarking.jsp"/>
		<s:include value="/jsp/template/editor/ImageGrabbing.jsp"/>
		<s:include value="/jsp/template/editor/MotionIcon.jsp"/>
		<s:include value="/jsp/template/editor/DynamicText.jsp"/>
		<%-- VideoDrm is not used yet 
		<s:include value="/jsp/template/editor/VideoDrm.jsp"/>--%>
		<div class="LineSpacing"></div>
	</div>
</div>
