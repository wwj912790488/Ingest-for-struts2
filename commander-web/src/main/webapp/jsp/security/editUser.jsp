<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div id="dialog_edit_user" style="display: none">
	<div class="template_title">
	<s:text name="editUser" />
	</div>
	<div class="template_content" parent_align="center">
		<div class="top_mov_20">
		<form id="update_user_form" method="post" action="updateUser.action" onsubmit="return false">
			<table>
				<tr>
					<td  class="td_label" align="right"><s:text name="inputRealName" />:</td>
					<td><input class="input_text" type="text" name="realName"
						value="" /></td>
				</tr>
				<tr>
					<td></td>
					<td class="error" name="user.realName"></td>
				</tr>
				<tr>
					<td class="td_label" align="right"><s:text name="remarks" />:</td>
					<td><textarea name="remarks"></textarea></td>
				</tr>
				<tr>
					<td></td>
					<td class="error" name="user.remarks"></td>
				</tr>
				<tr>
					<td class="td_label" align="right"><s:text name="inputRole" />:</td>
					<td align="left">
						<div style="max-height: 100px; overflow-x: hidden; overflow-y: auto">
						<table>
						<s:iterator value="roles" var="role">
						<tr>
						<td><input type="radio" name="role" id="role${role.id}" value="${role.id}"/></td>
						<td><div style="overflow: hidden; text-overflow: ellipsis; width: 200px">${role.name}</td>
						</tr>
						</s:iterator>
						</table>
						</div>
					</td>
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
