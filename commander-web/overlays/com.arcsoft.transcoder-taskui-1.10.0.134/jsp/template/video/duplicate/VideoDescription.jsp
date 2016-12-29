<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoDescription">
	<input type="hidden" name="VideoId" 
		value="-1" />
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="LabelAlign" style="width: 40px;">
				<span class="TaskHead2Text" style="color: #1895c1"><s:text name="video.video"/></span>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseVIdeoPassThrough">
				<span class="TaskLabelText Hide">Pass Through</span>
			</td>
			<td class="LabelEndSpacing LicenseVideoPassThrough"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseVideoPassThrough">
				<input type="checkbox" name="VideoPassThrough" class="DefaultCheckbox Hide" value="1"
					/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="DeleteVideoTrigger MouseHover" style="width: 40px">
				<div class="ICON_Delete "></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="VideoContainer">
	<s:include value="/jsp/template/video/duplicate/VideoH264.jsp"/>
	</div>
	<div class="VideoPassThroughContent">
		<s:include value="/jsp/template/video/duplicate/VideoProcessing.jsp"/>
		<div class="LicenseVideoEditing">
		<s:include value="/jsp/template/video/duplicate/VideoEditing.jsp"/>
		</div>
	</div>
</div>
