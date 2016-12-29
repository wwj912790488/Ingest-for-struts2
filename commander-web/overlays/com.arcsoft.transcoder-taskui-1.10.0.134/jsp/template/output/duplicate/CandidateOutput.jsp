<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="CandidateOutputTmpl" class="CandidateOutput alternate_uri_item">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="CandidateOutputIndex TaskLabelText">1</span><span class="TaskLabelText">. </span>
				<span class="TaskLabelText"><s:text name="output.destination"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputURIInput">
				<input type="text" name="CandidateOutputUri" class="TaskContentText OutputURIInput" 
					value="">
			</td>
			<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputOpenFileButton">
				<div class="TaskLabelText operate_button OpenCandidateTrigger"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteCandidateOutput MouseHover ICON_Delete"></div>
			</td>
			<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="CandidateOutputLine2">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.output_ip"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<select name="CandidateOutputSrcIp" class="TaskContentText output_group_select">
						<option value=""></option>
					</select>
					<input type="hidden" name="CandidateOutputSrcIpDown" 
						value="" />
				</td>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.output_port"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="CandidateOutputSrcPort" class="TaskContentText output_group_text"
						value="1234"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
	<div class="CandidateOutputLine1">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.buffer_size"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="CandidateOutputBufferSize" class="TaskContentText output_group_text"
						value="65535"/>
				</td>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText">TTL:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="CandidateOutputTTL" class="TaskContentText output_group_text"
						value="255"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText">IGMP source IP:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="CandidateOutputIgmpSourceIp" class="TaskContentText output_group_text"
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>
