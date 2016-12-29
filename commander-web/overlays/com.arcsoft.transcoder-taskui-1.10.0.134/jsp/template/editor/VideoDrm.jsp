<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoDrm">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskHead2Text"><s:text name="editor.video_drm"/></span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button NewVideoDrmTrigger"><s:text name="common.new"/></div>
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td style="width: 40px"></td>
			<td>
				<div class="VideoDrmItemContainer">
				<s:if test="[0].videoDescription.drmDescription != null">
				<s:push value="[0].videoDescription">
				<s:include value="/jsp/template/editor/VideoDrmItem.jsp" />
				</s:push>
				</s:if>
				</div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>
