<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="EncodingPolicy">
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign TwoPassOption">
				<span class="TaskLabelText"><s:text name="video.two_pass"/>:</span>
			</td>
			<td class="LabelEndSpacing TwoPassOption"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 TwoPassOption">
				<input type="checkbox" name="TwoPass" class="DefaultCheckbox" value="1"
					/>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.quality_level"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="QualityLevelDisp" class="TaskContentText VideoSelect">
					<option value="3"></option>
				</select>
				<input type="hidden" name="DeviceId" value="0"/>
				<input type="hidden" name="QualityLevel" value="2"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
