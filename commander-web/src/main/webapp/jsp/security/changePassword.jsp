<div id="dialog_change_pwd" style="display: none">
	<div class="template_title">
		<s:text name="changePasswod" />
	</div>
	<div class="template_content" parent_align="center">
		<div class="top_mov_20">
			<form id="change_pwd_form" method="post"
				action="changePassword.action">
				<table>
					<tr name="old_password">
						<td class="td_label" align="right"><s:text name="inputOldPassword" />:</td>
						<td><input class="input_text" type="password" name="old_password"
							value="" /></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="oldPassword"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="inputNewPassword" />:</td>
						<td><input class="input_text" type="password" name="new_password"
							value="" /></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="newPassword"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="inputNewPasswordAgain" />:</td>
						<td><input type="password" class="input_text"
							name="new_password_confirm" value="" /></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="newPasswordConfirm"></td>
					</tr>
				</table>
				<div class="error" name="actionError"></div>
			</form>
		</div>
	</div>
	<div class="template_button">
		<div class="div_space"></div>
		<div class="div_buttons">
			<table align="center">
			<tr>
				<td><input type="button" class="button_1" id="btnOk"
				value="<s:text name='msg.ok'/>" /></td>
				<td class="td_space"></td>
				<td><input type="button"
				class="button_1" id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
			<tr>
			</table>					
		</div>
	</div>
</div>
