<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="RtpStreaming" class="OutputGroupSpecial">
	<input type="hidden" name="OutputGroupSetting" value="RtpStreaming"/>
	<table class="output_group_not_support OutputGroupNotSupport Hide">
		<tr>
			<td>
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="OutputURIInput">
				<div class="TaskLabelText"><s:text name="label.runtime_setting_is_not_support"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="OutputGroupContent">
		<!-- line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.destination"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="OutputGroupURI" class="TaskContentText OutputURIInput"
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line2 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.output_ip"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<select name="SourceIP" class="TaskContentText output_group_select">
						<option value="" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line3 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.buffer_size"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="BufferSize" class="TaskContentText output_group_text"
						value="65535"/>
				</td>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText">TTL:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="TTL" class="TaskContentText output_group_text"
						value="255"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>