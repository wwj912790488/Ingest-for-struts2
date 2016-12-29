<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div id="dialog_edit_nio" style="display: none">
	<div class="template_title">
		<s:text name="server.setting.network.nio.edit" />
	</div>
	<div class="template_content " parent_align="center">
		<div class="top_mov_20">
				<table>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.network.nio.name"/>:</td>
						<td><input name="editNioName" type="text" value=""/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="editNioNameErr"></td>
					</tr>
					<tr>
						<td class="td_label" align="right"><s:text name="server.setting.network.nio.type"/>:</td>
						<td><s:select name="editNioType" list="nioOptions" listKey="key" listValue="value">
						</s:select></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="editNioTypeErr"></td>
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
