<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TSAdvancedOptions">
	<input type="hidden" name="ContainerSetting" value="TS"/>
	<%-- <div style="height: 21px"></div>
	<table>
		<tr>
			<td style="width: 30px">
				<div class="ExpandTrigger ExpandIcon MouseHover ICON_ArrowRight"></div>
			</td>
			<td class="TSAdvancedOptionsCol1">
				<span class="TaskHead3Text ExpandTrigger MouseHover" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>--%>
	<div class="ExpandTarget Hide">
		<div class="TsAudioProcess Hide">
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.audio.process.mode"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<select name="AudioProcessMode" class="TaskContentText TSAdvancedOptionsSelect">
							 <option value="0" selected="selected"></option>
						</select>					
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
		<!-- line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Service name:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoServerName" class="TaskContentText TSAdvancedOptionsInput2"
						value=""/>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.original_network_id"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoOriginalNetworkId" class="TaskContentText TSAdvancedOptionsInput2" 
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
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Service provider:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoServerProvider" class="TaskContentText TSAdvancedOptionsInput2"
						value=""/>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.transport_stream_id"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoTransportStreamId" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line3 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Service ID:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoServiceID" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line4 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.bit_rate_mode"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<select name="TsaoBitRateMode" class="TaskContentText TSAdvancedOptionsSelect">
						<option value="CBR" selected="selected"></option>
					</select>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign TotalBitRateItem">
					<span class="TaskLabelText"><s:text name="output.total_bitrate"/>:</span>
				</td>
				<td class="LabelEndSpacing TotalBitRateItem"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2 TotalBitRateItem">
					<input type="text" name="TsaoTotalBitrate" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
					<span class="TaskContentText ts_advanced_options_suffix">kbps</span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line4.1 -->
		<div class="LineSpacing VideoDelayItem"></div>
		<table class="VideoDelayItem">
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.video_delay"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoVideoDelay" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
					<span class="TaskContentText ts_advanced_options_suffix">ms</span>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign ">					
				</td>
				<td class="LabelEndSpacing "><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2 ">
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing VideoDelayItem"></div>
		<!-- line4.2 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Cut Audio:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoCutAudio" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>					
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign ">		
					<span class="TaskLabelText">Audio Merge Frame:</span>			
				</td>
				<td class="LabelEndSpacing "><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2 ">
					<input type="text" name="TsaoAudioMergeFrame" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>	
		<!-- line5 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">PCR PID:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoPcrPID" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Start Audio PID:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="">
					<input type="text" name="TsaoAudioPID" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<!-- line5.1 -->
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<div class="LinePlaceHolder"></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<span class="TaskCommentText"><s:text name="output.audio_pid_format"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line6 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">PMT PID:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="TsaoPmtPID" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Video PID:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="">
					<input type="text" name="TsaoVideoPID" class="TaskContentText TSAdvancedOptionsInput2" 
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="TsBlock">
			<!-- line7 -->
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.insert_tot_tdt"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="checkbox" name="TsaoInsertTotTdt" class="DefaultCheckbox" value="1"
							/>
					</td>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.period_tot_tdt"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="TsaoPeriodTotTdt" class="TaskContentText TSAdvancedOptionsInput2" 
							value=""/>
						<span class="TaskContentText ts_advanced_options_suffix">ms</span>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<!-- line8 -->
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.pcr_period"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="TsaoPcrPeriod" class="TaskContentText TSAdvancedOptionsInput2" 
							value=""/>
						<span class="TaskContentText ts_advanced_options_suffix">ms</span>
					</td>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.pat_period"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="TsaoPatPeriod" class="TaskContentText TSAdvancedOptionsInput2" 
							value=""/>
						<span class="TaskContentText ts_advanced_options_suffix">ms</span>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<!-- line9 -->
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.sdt_period"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="TsaoSdtPeriod" class="TaskContentText TSAdvancedOptionsInput2" 
							value=""/>
						<span class="TaskContentText ts_advanced_options_suffix">ms</span>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<!-- line10 -->
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.private_metadata_pid"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="TsaoPrivateMetadataPid" class="TaskContentText TSAdvancedOptionsInput2" 
							value=""/>
					</td>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.private_metadata_type"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="TsaoPrivateMetadataType" class="TaskContentText TSAdvancedOptionsInput2" 
							value=""/>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
	</div>
</div>