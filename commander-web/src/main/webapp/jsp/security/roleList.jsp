<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
	jspContext.addJSRef("js/jquery.js");
	jspContext.addJSRef("js/jquery.extend.js");
	jspContext.addJSRef("js/security/role.js");
	jspContext.addCssRef("css/security/userlist.css");
%>


<script type="text/javascript">
	var msg_unRegisterFail = '<s:text name="msg.error.security.unRegister.fail"/>';
	var msg_addFail = '<s:text name="msg.error.add.fail"/>';
	var msg_editFail = '<s:text name="msg.error.edit.fail"/>';
	var msg_warning = '<s:text name="msg.dialog.title.warning"/>';
	var msg_deleteConfirm = '<s:text name="security.role.delete.confirm"/>';
	var msg_chooseUser = '<s:text name="msg.chooseOneRole"/>';
	var msg_Ok = '<s:text name="msg.ok"/>';
	var msg_Cancel = '<s:text name="msg.cancel"/>';
	var keySearch = '<s:property value="keyword"/>';
	var pageNumber = <s:property value="pager.pageIndex"/>;
	$(function() {
		var role = new Role();
		role.init();
	});
</script>
<div>
	<div class="list_view_header_with_submenu">
		<div class="cm_operatebar">
			<div class="left">
				<div class="div_input_search left">
					<label class="left input_search"><s:text name='keySearch' /></label>
					<input id="key_search" class="input_search" type="text" value="" />
					<a class="left searchBtn"></a>
				</div>
			</div>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ROLE_ADD'})">
			<div class="right">
				<div class="action_btns">
					<a id="addBtn"> <span class="btn_left"></span> <span
						class="btn_middle"> <span class="left"> <s:text name="security.role.add" />
						</span> <span class="right"></span>
					</span> <span class="btn_right"></span>
					</a>
				</div>
			</div>
			</sec:authorize>
		</div>

		<div class="cm_actionbar">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ROLE_EDIT'})">
			<div id="edit" class="item img_edit">
				<s:text name="common.action.edit" />
			</div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ROLE_DELETE'})">
			<div id="deleteRole" class="item img_del">
				<s:text name="common.action.delete" />
			</div>
			</sec:authorize>
		</div>

		<table class="tab_list">
			<tr class="tab_header">
				<th class="userName"><s:text name="security.role.name" /></th>
				<th align="left"><s:text name="security.role.remarks" /></th>
			</tr>
		</table>
	</div>
	<div class="list_view_content_with_submenu">
		<table class="tab_list single_selection">
			<s:iterator value="list" var="var" status='st'>
				<tr uid="<s:property value="#var.id"/>" isEnabled="<s:property value="#var.isEnabled"/>" class="tab_content">
					<td id="roleName_<s:property value="#var.id"/>" class="userName" reses="<s:property value='#var.resIds'/>">
						<div class="userName ellipsis">
							<s:property value="#var.name" />
						</div>
					</td>
					<td>
						<div id="remarks_<s:property value="#var.id"/>" class="role_remarks ellipsis">
							<s:property value="#var.remarks" />
						</div>
					</td>
				</tr>
			</s:iterator>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
</div>
