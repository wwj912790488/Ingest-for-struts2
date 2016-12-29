<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/setting.css");
jspContext.addCssRef("css/settings/signalsettings.css");
%>

<script type="text/javascript">
	var msgTitle       = '<s:text name="msg.dialog.title.info"/>';
	var msgSaveFailed  = '<s:text name="settings.err.save.failed"/>';
	var msgSaveSuccess = '<s:text name="msg.success.save"/>';
	
	var notifyIntervalName = '<s:text name="source.signal.notify.interval"/>';
	var signalBrokenName   = '<s:text name="source.signal.signalbroken"/>';
	var patLossName        = '<s:text name="source.signal.patloss"/>';
	var progidLossName     = '<s:text name="source.signal.progidloss"/>';
	var pmtLossName        = '<s:text name="source.signal.pmtloss"/>';
	var avLossName         = '<s:text name="source.signal.avloss"/>';
	var ccErrorName        = '<s:text name="source.signal.ccerror"/>';
	var ccErrorName        = '<s:text name="source.signal.ccerror"/>';
	var signalCond         = '<s:text name="source.signal.condition"/>';
	var notifyCond         = '<s:text name="source.signal.notify.condition"/>';
	
	$(function(){
	});

	function saveSignalSettings(frm){
		$("input").css("border", "");
		
		var p = $(frm).serialize();
		$.post('saveSourceSignal', p, function(data){
			if (data.actionErrors && data.actionErrors.length > 0) {
				showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgSaveFailed : data.actionErrors[0]);
			} else if (data.fieldErrors) {
				var style = "1px solid red";
				var errStr = "";
				for ( var p in data.fieldErrors) {
					if (p == "notifyInterval"){
						$("input[name='notifyInterval']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + notifyIntervalName + ")";
					} else if (p == "signalBrokenTimeout") {
						$("input[name='signalBrokenTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + signalBrokenName + signalCond + ")";
					} else if (p == "patLossTimeout") {
						$("input[name='patLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + patLossName + signalCond + ")";
					} else if (p == "progidLossTimeout") {
						$("input[name='progidLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + progidLossName + signalCond + ")";
					} else if (p == "pmtLossTimeout") {
						$("input[name='pmtLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + pmtLossName + signalCond + ")";
					} else if (p == "avLossTimeout") {
						$("input[name='avLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + avLossName + signalCond + ")";
					} else if (p == "ccErrorTimeout") {
						$("input[name='ccErrorTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + ccErrorName + signalCond + ")";
					} else if (p == "ccErrorCount") {
						$("input[name='ccErrorCount']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + ccErrorName + signalCond + ")";
					} else if (p == "warningSignalBrokenTimeout") {
						$("input[name='warningSignalBrokenTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + signalBrokenName + notifyCond + ")";
					} else if (p == "warningPatLossTimeout") {
						$("input[name='warningPatLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + patLossName + notifyCond + ")";
					} else if (p == "warningProgidLossTimeout") {
						$("input[name='warningProgidLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + progidLossName + notifyCond + ")";
					} else if (p == "warningPmtLossTimeout") {
						$("input[name='warningPmtLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + pmtLossName + notifyCond + ")";
					} else if (p == "warningAvLossTimeout") {
						$("input[name='warningAvLossTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + avLossName + notifyCond + ")";
					} else if (p == "warningCcErrorTimeout") {
						$("input[name='warningCcErrorTimeout']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + ccErrorName + notifyCond + ")";
					} else if (p == "warningCcErrorCount") {
						$("input[name='warningCcErrorCount']").css("border", style);
						errStr += "<br>" + data.fieldErrors[p] + "(" + ccErrorName + notifyCond + ")";
					};
				}
				$("#ss_error").html(errStr);
			} else {
				showMessage(msgTitle, msgSaveSuccess);
				
				// refresh
				$.post("setSourceSignal", null, function(data) {
					$("#content").html(data);
				});
			};
		});
	}
</script>

<div class="SubPanel">
	<div class="NetBody" style="text-align: left" >
	<form name="frm" method="post">
		<div class="signal_header">&nbsp;</div>
		<div class="">
			<s:text name="source.signal.notify.interval"/>:
			<input type="text" class="DefaultText" name="notifyInterval" value="${notifyInterval}"/>
			<s:text name="common.unit.second"/>
		</div>
		<div style="height: 20px">&nbsp;</div>
		<div class="signal_block">
			<div class="div_left">
				<div class="signal_option_base signal_option_lt"><s:text name="source.signal.detections"/></div>
				
				<div class="signal_option_base signal_option_lc">
					<s:text name="source.signal.signalbroken">
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_lc hidden">
					<s:text name="source.signal.patloss">
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_lc">
					<s:text name="source.signal.progidloss">
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_lc hidden">
					<s:text name="source.signal.pmtloss">
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_lc">
					<s:text name="source.signal.avloss">
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_lb">
					<s:text name="source.signal.ccerror">
					</s:text>
				</div>
			</div>
			<div class="div_center" style="">
				<div class="signal_option_base signal_option_ct"><s:text name="source.signal.condition"/></div>
				
				<div class="signal_option_base signal_option_cc">
					<s:checkbox name="signalBrokenEnabled"/>
					<s:text name="source.signal.switch.signalbroken">
						<s:param><input type="text" class="DefaultText" name="signalBrokenTimeout" value="${signalBrokenTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_cc hidden">
					<s:checkbox name="patLossEnabled"/>
					<s:text name="source.signal.switch.patloss">
						<s:param><input type="text" class="DefaultText" name="patLossTimeout" value="${patLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_cc">
					<s:checkbox name="progidLossEnabled"/>
					<s:text name="source.signal.switch.progidloss">
						<s:param><input type="text" class="DefaultText" name="progidLossTimeout" value="${progidLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_cc hidden">
					<s:checkbox name="pmtLossEnabled"/>
					<s:text name="source.signal.switch.pmtloss">
						<s:param><input type="text" class="DefaultText" name="pmtLossTimeout" value="${pmtLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_cc">
					<s:checkbox name="avLossEnabled"/>
					<s:text name="source.signal.switch.avloss">
						<s:param><input type="text" class="DefaultText" name="avLossTimeout" value="${avLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_cb">
					<s:checkbox name="ccErrorEnabled"/>
					<s:text name="source.signal.switch.ccerror">
						<s:param><input type="text" class="DefaultText" name="ccErrorTimeout" value="${ccErrorTimeout}"/></s:param>
						<s:param><input type="text" class="DefaultText" name="ccErrorCount" value="${ccErrorCount}"/></s:param>
					</s:text>
				</div>
			</div>
			
			<div class="div_right" style="">
				<div class="signal_option_base signal_option_rt"><s:text name="source.signal.notify.condition"/></div>
				
				<div class="signal_option_base signal_option_rc">
					<s:checkbox name="warningSignalBrokenEnabled"/>
					<s:text name="source.signal.notify.signalbroken">
						<s:param><input type="text" class="DefaultText" name="warningSignalBrokenTimeout" value="${warningSignalBrokenTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_rc hidden">
					<s:checkbox name="warningPatLossEnabled"/>
					<s:text name="source.signal.notify.patloss">
						<s:param><input type="text" class="DefaultText" name="warningPatLossTimeout" value="${warningPatLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_rc">
					<s:checkbox name="warningProgidLossEnabled"/>
					<s:text name="source.signal.notify.progidloss">
						<s:param><input type="text" class="DefaultText" name="warningProgidLossTimeout" value="${warningProgidLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_rc hidden">
					<s:checkbox name="warningPmtLossEnabled"/>
					<s:text name="source.signal.notify.pmtloss">
						<s:param><input type="text" class="DefaultText" name="warningPmtLossTimeout" value="${warningPmtLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_rc">
					<s:checkbox name="warningAvLossEnabled"/>
					<s:text name="source.signal.notify.avloss">
						<s:param><input type="text" class="DefaultText" name="warningAvLossTimeout" value="${warningAvLossTimeout}"/></s:param>
					</s:text>
				</div>
		
				<div class="signal_option_base signal_option_rb">
					<s:checkbox name="warningCcErrorEnabled"/>
					<s:text name="source.signal.notify.ccerror">
						<s:param><input type="text" class="DefaultText" name="warningCcErrorTimeout" value="${warningCcErrorTimeout}"/></s:param>
						<s:param><input type="text" class="DefaultText" name="warningCcErrorCount" value="${warningCcErrorCount}"/></s:param>
					</s:text>
				</div>
			</div>
		</div>
		<div id="ss_error" style="color:red"></div>
		<div style="height: 20px">&nbsp;</div>
		<div class="signal_buttons">
			<input class="button" type="reset" name="reset" value="<s:text name='button.label.reset'/>"/>
			<input class="button" type="button" name="submit" value="<s:text name='button.label.save'/>" onclick="saveSignalSettings(frm)"/>
		</div>
	</form>
	</div>
</div>
