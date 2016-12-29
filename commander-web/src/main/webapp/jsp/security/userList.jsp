<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>
<%
	jspContext.addJSRef("js/jquery.js");
	jspContext.addJSRef("js/jquery-md5.js");
	jspContext.addJSRef("js/jquery.extend.js");
	jspContext.addJSRef("js/security/security.js");
%>

<script type="text/javascript">
	var msg_changePwdFail = '<s:text name="msg.error.security.changePassworod.fail"/>';
	var msg_unRegisterFail = '<s:text name="msg.error.security.unRegister.fail"/>';
	var msg_addFail = '<s:text name="msg.error.add.fail"/>';
	var msg_editFail = '<s:text name="msg.error.edit.fail"/>';
	var msg_warning = '<s:text name="msg.dialog.title.warning"/>';
	var msg_unRegisterUser = '<s:text name="security.warning.willUnRegisterUser"/>';
	var msg_chooseUser = '<s:text name="msg.chooseOneUser"/>';
	var msg_Ok = '<s:text name="msg.ok"/>';
	var msg_Cancel = '<s:text name="msg.cancel"/>';
	var keySearch = '<s:property value="keyword"/>';
	var pageNumber = <s:property value="pager.pageIndex"/>;
	$(function() {
		var security = new Security();
		security.init();
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
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER_ADD'})">
			<div class="right">
				<div class="action_btns">
					<a id="addBtn"> <span class="btn_left"></span> <span
						class="btn_middle"> <span class="left"> <s:text
									name="addUser" />
						</span> <span class="right"></span>
					</span> <span class="btn_right"></span>
					</a>
				</div>
			</div>
			</sec:authorize>
		</div>

		<div class="cm_actionbar">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER_EDIT'})">
			<div id="edit" class="item img_edit">
				<s:text name="action.edit" />
			</div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER_EDIT_CHANGE_PASSWORD'})">
			<div id="change_pwd" class="item img_change_pwd">
				<s:text name="changePasswod" />
			</div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER_EDIT_UNREGIST'})">
			<div id="unRegister" class="item img_del">
				<s:text name="unRegister" />
			</div>
			</sec:authorize>
			<div id="disabledText">
				<s:text name="user.already.disabled" />
			</div>
		</div>

		<table class="tab_list">
			<tr class="tab_header">
				<th class="userName"><s:text name="userName" /></th>
				<th class="realName"><s:text name="realName" /></th>
				<th class="roleName"><s:text name="role" /></th>
				<th class="registerTime"><s:text name="registerTime" /></th>
				<th class="unRigisterTime"><s:text name="unRegisterTime" /></th>
				<th class="remarks" align="left"><s:text name="remarks" /></th>
			</tr>
		</table>
	</div>
	<div class="list_view_content_with_submenu">
		<table class="tab_list single_selection">
			<s:iterator value="pager.result" var="var" status='st'>
				<tr uid="<s:property value="#var.id"/>" isEnabled="<s:property value="#var.isEnabled"/>" class="tab_content">
					<td id="userName_<s:property value="#var.id"/>" class="userName">
						<div class="userName ellipsis">
							<s:property value="#var.name" />
						</div>
					</td>
					<td id="realName_<s:property value="#var.id"/>" class="realName">
						<div class="realName ellipsis">
							<s:property value="#var.realName" />
						</div>
					</td>
					<td class="roleName" id="role_<s:property value="#var.id"/>" role_id="<s:property value="#var.role.id" />">
						<div class="roleName ellipsis">
							<s:if test="#var.role != null">
							<s:property value="#var.role.name" />
							</s:if>
							<s:else>
							&lt;None&gt;
							</s:else>
						</div>
					</td>
					<td class="registerTime">
						<s:date name="#var.registerTime" format="yyyy/MM/dd" />
					</td>
					<td class="unRigisterTime">
						<s:date name="#var.unRegisterTime" format="yyyy/MM/dd" />
					</td>
					<td class="remarks">
						<div id="remarks_<s:property value="#var.id"/>" class="remarks ellipsis">
							<s:property value="#var.remarks" />
						</div>
					</td>
				</tr>
			</s:iterator>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
</div>
