<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div id="dialog_edit_storage" style="display: none">
	<div class="template_title">
		<s:text name="server.setting.storage.editStorage" />
	</div>
	<div class="template_content " parent_align="center">
		<div class="top_mov_20">
				<table>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.storage.type" />:</td>
						<td><select name="storage.type" class="comboBox left">
						<s:iterator value="supportedTypes" var="var">
							<option><s:property value="#var" /></option>
						</s:iterator></select>
						</td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="storage.type"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.storage.remotePath" />:</td>
						<td><input class="input_text_2" type="text" name="storage.path"
							value="" /></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="storage.path"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.storage.name" />:</td>
						<td><input class="input_text_2" name="storage.name" value="" /></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="storage.name"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.storage.user" />:</td>
						<td><input class="input_text_2" name="storage.user"/></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="storage.user"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.storage.password" />:</td>
						<td><input class="input_text_2" type="password" name="storage.pwd"/></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="storage.pwd"></td>
					</tr>
				</table>
				<div class="error" name="actionError" style="text-align:center"></div>
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
