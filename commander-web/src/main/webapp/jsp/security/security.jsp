<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>
<%
	jspContext.addJSRef("js/security/security.js");
	jspContext.addCssRef("css/security/userlist.css");
%>

<script type="text/javascript">
$(document).ready(function(){
	$.post("listUsers.action", {"pager.pageIndex" : 1}, function(data){
		$("#security_content").append(data);
	});
});
</script>

<div id="security_content" class="tab_content_parent" style="padding:0px">
</div>
<%@ include file="/jsp/security/changePassword.jsp" %>
<%@ include file="/jsp/security/addUser.jsp" %>
<%@ include file="/jsp/security/editUser.jsp" %>
<%@ include file="/jsp/security/changePasswordSuccess.jsp"%>
<%@ include file="/jsp/include/footer.jsp"%>
