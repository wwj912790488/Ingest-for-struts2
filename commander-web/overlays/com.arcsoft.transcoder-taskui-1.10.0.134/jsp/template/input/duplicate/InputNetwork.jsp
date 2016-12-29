<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Network" class="InputSepcialOption">
	<input type="hidden" name="InputBody" value="Network"/>
	<div class="InputRuntimeNotSupport">
		<!-- 1 -->
		<div class="LineSpacing"></div>
		<table >
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.protocol_type"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<select name="InputProtocol" class="TaskContentText DefaultSelect">
						<option value=""></option>
					</select>
				</td>
				<td class="InputColumn1 LabelAlign LicenseFailoverTime">
					<span class="TaskLabelText"><s:text name="input.failoverTime"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseFailoverTime"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2 LicenseFailoverTime">
					<input type="hidden" name="FailoverTime" class="TaskContentText InputText2"
						value="3000"/>
					<input type="text" name="FailoverTimeSecond" class="TaskContentText InputText2"
						value="3"/>
					<span class="TaskContentText"><s:text name="common.second"/></span>
				</td>
				<td class="InputColumn1 LabelAlign Hide">				
				</td>
				<td class="LabelEndSpacing  Hide"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2  Hide">
					<input type="hidden" name="SrcIpDown" 
						value="">
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- 2 -->
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
		<!-- 3 -->
		<div class="LineSpacing LicenseFillModeLost"></div>
		<table class="LicenseFillModeLost">
			<tr>
				<td class="ProgramColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.fill_mode_lost"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ProgramColumn2">
					<input type="checkbox" name="FillModeLost" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td class="ProgramColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.fill_lost_time"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="ProgramColumn2">
					<input type="text" name="FillLostTime" class="TaskContentText" style="width: 90px"
						value="1000" />
					<span class="TaskContentText">ms</span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing LicenseFillModeLost"></div>
	</div>
	<div class="InputRuntimeSupport AllowProgramIdChangeItem">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="InputColumn0 LabelAlign LicenseAllowProgramIdChange">
					<span class="TaskLabelText"><s:text name="input.allow_program_id_change"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseAllowProgramIdChange"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2 LicenseAllowProgramIdChange">
					<input type="checkbox" name="AllowProgramIdChange" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
	<div class="InputRuntimeNotSupport">
	<div class="LineSpacing"></div>
	<table class="">
		<tr>
			<td class="ProgramColumn1 LabelAlign LicenseLiveSyncMode">
				<span class="TaskLabelText"><s:text name="input.live_sync_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseLiveSyncMode"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2 LicenseLiveSyncMode">
				<input type="checkbox" name="InputLiveSyncMode" value="1"
					/>
			</td>
			<td class="ProgramColumn1 LabelAlign LicenseDelayOutputTime">
				<span class="TaskLabelText"><s:text name="input.delay_output_time"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseDelayOutputTime"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2 LicenseDelayOutputTime">
				<input type="text" name="DelayOutputTime" class="TaskContentText" style="width: 90px" 
					value="-1" />
				<span class="TaskContentText">ms</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table class="">
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="label.inputUrl"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="InputURI" class="TaskContentText InputURIInput"
					value=""/>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputPreviewBtn" style="width: 28px">
				<div class="ICON_Play InputPreviewTrigger MouseHover"></div>
			</td>
			<td class="OpenFileBtn" style="width: 20px">
				<div class="OpenFileTrigger icon_folder MouseHover"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputInfoLabel" style="width: 100px">
				<span class="TaskContentText InputInfo"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing LicenseSrcIp"></div>	
	<table class="LicenseSrcIp">
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.localEth"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<select name="SrcIp" class="TaskContentText DefaultSelect">
					<option value="" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing LicenseSrcIp"></div>
	<div class="ProgramEditor">
		<div class="ProgramItemList">
		<s:include value="/jsp/template/input/ProgramItem.jsp"/>
		</div>
	</div>
	<div class="LineSpacing"></div>
	<%--<s:include value="/jsp/template/input/ESOverRTPSetting.jsp"/> --%>
	<s:include value="/jsp/template/input/AlternateURIContainer.jsp"/>
	</div>
</div>