<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="SDI" class="InputSepcialOption">
	<input type="hidden" name="InputBody" value="SDI"/>
	<div class="InputRuntimeNotSupport">
		<div class="LineSpacing LicenseInputFillType"></div>
		<table class="LicenseInputFillType">
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.fill_type"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<select name="InputFillType" class="TaskContentText DefaultSelect">
						<option value="<s:property value="[0].fillType" />"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing LicenseInputFillType"></div>
		<div class="LineSpacing LicenseLiveSyncMode"></div>
		<table class="LicenseLiveSyncMode">
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.live_sync_mode"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<input type="checkbox" name="InputLiveSyncMode" value="1"
						<s:if test='[0].body.liveSyncMode.equals(1)'>checked="checked"</s:if> />
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing LicenseLiveSyncMode"></div>
		<div class="LineSpacing LicenseInput4k"></div>
		<table class="LicenseInput4k">
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.input4k"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<input type="checkbox" name="Input4k" value="1"
						<s:if test='[0].body.input4k.equals(1)'>checked="checked"</s:if>/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing LicenseInput4k"></div>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="common.port"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<select name="InputPort" class="TaskContentText DefaultSelect">
						<option value="1" >1</option>
						<option value="2" >2</option>
						<option value="3" >3</option>
						<option value="4" >4</option>
					</select>
					<input type="hidden" name="InputPortDown" value="<s:property value='[0].body.channel'/>"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="ProgramEditor">
			<div class="ProgramItemList">
			<s:include value="/jsp/template/input/ProgramItem.jsp"/>
			</div>
		</div>
		<div class="LineSpacing"></div>
		<s:include value="/jsp/template/input/SdiJoinedSetting.jsp"/>
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<s:include value="/jsp/template/input/CandidateSdiContainer.jsp"/>
	</div>
</div>