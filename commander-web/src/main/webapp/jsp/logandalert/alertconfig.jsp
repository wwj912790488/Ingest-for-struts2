<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="dialog_setting" style="display: none">
	<div class="template_title">
		<s:text name="alert.config" />
	</div>
	<div class="template_content">
		<form name="frm" id="settingForm" method="post">
			<div id="alert_setting">
				<div class="item_title" style="margin-top:20px; height:20px"><s:text name="alert.config" /></div>
				<div class="item_frame" style="border:1px solid #dedede">
					<div class="item_content" style="margin: 15px 15px 15px 20px;">
						<div style="height:28px"><s:text name="alert.config.auto.delete.hint" /></div>
						<table class="tblcol2">
							<tbody>
								<tr style="height:28px">
									<td style="text-align: right; width:60px; padding-right: 5px;"><s:text name="alert.config.auto.delete.keep.time"/>:</td>
									<td><input type="text" id="deleteBeforeDays" name="deleteBeforeDays" style="width:30px"><s:text name="common.unit.day"/>
										<span id="error_deleteBeforeDays" style="height:28px;color:red"></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div id="alert_mail_setting">
				<div class="space" style="height:25px"></div>
				<div class="item_title" style="margin-top:20px; height:20px"><s:text name="alert.config.mail" /></div>
				<div class="item_frame" style="border:1px solid #dedede">
					<div class="item_content" style="margin: 15px 15px 15px 20px;">
						<table class="tblcol2">
							<tbody>
								<tr style="height:28px">
									<td style="text-align: right; width:60px; padding-right: 5px;"><s:text name="alert.config.smtp.host"/></td>
									<td ><input type="text" id="host" name="emailSetting.smtpHost" style="min-width: 380px;"></td>
								</tr>
								<tr style="height:28px">
									<td style="text-align: right; width:60px; padding-right: 5px;"><s:text name="alert.config.smtp.port"/></td>
									<td ><input type="text" id="port" name="emailSetting.smtpPort">
										 <span id="error_smtpPort" style="height:28px;color:red"></span>
									</td>
								</tr>
								<tr style="height:28px">
									<td style="text-align: right; width:60px; padding-right: 5px;"><s:text name="alert.config.smtp.user"/></td>
									<td class="TableItemText valL"><input type="text" id="user" name="emailSetting.smtpUser" style="width: 200px;"></td>
								</tr>
								<tr style="height:28px">
									<td style="text-align: right; width:60px; padding-right: 5px;"><s:text name="alert.config.smtp.password"/></td>
									<td class="TableItemText valL"><input type="password" id="password" name="emailSetting.smtpPassword" style="width: 200px;"></td>
								</tr>
								<tr style="height:28px">
									<td style="text-align: right; width:60px; padding-right: 5px;"><s:text name="alert.config.smtp.receivers"/></td>
									<td class="TableItemText valL"><input type="text" id="recv" name="recv" style="min-width: 380px;">
										<br>(<s:text name="alert.config.smtp.receivers.comment"/>)</td>
								</tr>
							</tbody>
						</table>
						<div style="text-align:right;">
							<input type="button" id="btnSendTestMail" value="<s:text name='alert.config.mail.btn.test'/>" />
						</div>
					</div>
				</div>
			</div>
		</form>
		<div id="error_action" style="height:28px;color:red"></div>
	</div>
	<div class="template_button">
		<input type="button" id="btnSave" value="<s:text name='settings.save'/>" />
		<input type="button" id="btnCancel" value="<s:text name='msg.cancel'/>" />
	</div>
</div>
