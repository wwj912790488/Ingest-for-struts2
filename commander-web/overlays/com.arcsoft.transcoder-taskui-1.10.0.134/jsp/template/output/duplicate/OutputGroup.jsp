<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="OutputGroup" class="OutputGroup output_group">
	<input type="hidden" name="OutputGroupLabel" 
		value=""/>
	<input type="hidden" name="OutputGroupActive" 
		value="1"/>
	<table class="OutputGroupDescription">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="common.description"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputGroupColumnEnd">
				<input type="text" name="OutputGroupDescription" class="TaskContentText OutputURIInput"
					value=""/>
			</td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupDescription"></div>
	<div class="LineSpacing OutputGroupDescription"></div>
	<table class="OutputGroupType">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="output.outputGroupType"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputGroupColumn2">
				<select name="OutputGroupType" class="TaskContentText output_group_select">
					<option value="FileArchive" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupType"></div>
	<div class="LineSpacing OutputGroupType"></div>
	<table class="OutputGroupContainerType">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="output.containerType"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputGroupColumn2">
				<select name="OutputGroupContainer" class="TaskContentText output_group_select">
					<option value="TS" selected="selected"></option>					
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupContainerType"></div>
	<div class="LineSpacing OutputGroupContainerType"></div>
	<table class="OutputGroupSupportCodec">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="output.outputGroupCodec"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText ContainerVideoAudio"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupSupportCodec"></div>
	<div class="OutputGroupOption">
		<s:include value="/jsp/template/output/duplicate/OGroupArchive.jsp" />
	</div>
	<div class="ContainerSettingDiv">
	</div>
	<div class="LineSpacing"></div>
	<div class="DrmSettingDiv">
	</div>
	<div class="LineSpacing"></div>
	<table class="StreamSettingTable">
		<tr style="background-color: #f5f5f5; height: 40px">
			<td>
				<table>
					<tr>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
						<td>
							<span class="TaskHead2Text"><s:text name="output.streamSetting"/></span>
						</td>
						<td style="width: 80px">
							<div class="TaskLabelText operate_button NewOutputTrigger"><s:text name="stream.new_stream"/></div>
						</td>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr style="background-color: #ffffff;">
			<td>
				<table>
					<tr>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
						<td class="OutputFlock">
						</td>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
