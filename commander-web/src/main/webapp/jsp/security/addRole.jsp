<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div id="dialog_add_role" style="display: none">
	<div class="template_title">
		<s:text name="security.role.add" />
	</div>
	<div class="template_content " parent_align="center">
		<div class="top_mov_20">
			<form id="add_User_form" method="post" action="addRole.action">
				<table width="100%">
					<tr>
						<td align="right"><s:text name="security.role.name" />:</td>
						<td align="left"><input class="input_text" style="width: 90%" type="text" name="roleName" value="" /></td>
					</tr>
					<tr>
						<td></td>
						<td class="error" name="role.name"></td>
					</tr>
					<tr >
						<td align="right"><s:text name="security.role.privilege"/>:</td>
						<td align="left">
							<table border="1" width="90%" style="text-align: center">
								<tr>
									<td colspan="2"><s:text name="security.privilege.list"/></td>
									<td><s:text name="common.action.add"/></td>
									<td><s:text name="common.action.delete"/></td>
									<td><s:text name="common.action.edit"/></td>
									<td><s:text name="common.action.view"/></td>
								</tr>
								<tr>
									<td rowspan="3"><s:text name="module.device"/></td>
									<td><s:text name="module.device.commander"/></td>
									<td></td>
									<td></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="2"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="3"></s:checkbox></td>
								</tr>
								<tr>
									<td><s:text name="module.device.group"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="10"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="11"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="12"></s:checkbox></td>
									<td></td>
								</tr>
								<tr>
									<td><s:text name="module.device.server"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="20"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="21"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="22"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="23"></s:checkbox></td>
								</tr>
								<tr>
									<td colspan="2"><s:text name="homepage.navigation.channel"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="100"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="101"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="103"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="102"></s:checkbox></td>
								</tr>
								<tr>
									<td colspan="2"><s:text name="homepage.navigation.record"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="110"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="111"></s:checkbox></td>
									<td></td>
									<%--<td><s:checkbox name="role" theme="simple" fieldValue="112"></s:checkbox></td>--%>
									<td><s:checkbox name="role" theme="simple" fieldValue="113"></s:checkbox></td>
								</tr>
								<tr>
									<td colspan="2"><s:text name="module.task"/></td>
									<%--<td><s:checkbox name="role" theme="simple" fieldValue="30"></s:checkbox></td>--%>
									<td></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="31"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="32"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="33"></s:checkbox></td>
								</tr>
								<tr>
									<td rowspan="2"><s:text name="module.template"/></td>
									<td><s:text name="module.template.profile"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="40"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="41"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="42"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="43"></s:checkbox></td>
								</tr>
								<tr>
									<td><s:text name="module.template.preset"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="50"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="51"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="52"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="53"></s:checkbox></td>
								</tr>
								<tr>
									<td rowspan="2"><s:text name="module.security"/></td>
									<td><s:text name="module.security.user"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="60"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="64"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="62"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="63"></s:checkbox></td>
								</tr>
								<tr>
									<td><s:text name="module.security.role"/></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="70"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="74"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="72"></s:checkbox></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="73"></s:checkbox></td>
								</tr>
								<tr>
									<td colspan="2"><s:text name="module.log"/></td>
									<td></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="81"></s:checkbox></td>
									<td></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="83"></s:checkbox></td>
								</tr>
								<tr>
									<td colspan="2"><s:text name="module.alert"/></td>
									<td></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="91"></s:checkbox></td>
									<td></td>
									<td><s:checkbox name="role" theme="simple" fieldValue="93"></s:checkbox></td>
								</tr>
							</table>
						</td>
					</tr>
					<tr height="80px">
						<td align="right"><s:text name="security.role.remarks"/>:</td>
						<td align="left"><textarea name="remarks" style="width: 90%"></textarea></td>
					</tr>
				</table>
				<div class="error" name="actionError" style="text-align: center"></div>
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
					<td><input type="button" class="button_1" id="btnCancel"
						value="<s:text name='msg.cancel'/>" /></td>
				<tr>
			</table>
		</div>
	</div>
</div>
