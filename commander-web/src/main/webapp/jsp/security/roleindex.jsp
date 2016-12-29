<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>
<%
	jspContext.addJSRef("js/security/role.js");
	jspContext.addCssRef("css/security/userlist.css");
%>

<script type="text/javascript">
$(document).ready(function(){
	$.post("listRoles.action", {"pager.pageIndex" : 1}, function(data){
		$("#role_content").append(data);
	});
});
</script>

<div id="role_content" class="tab_content_parent" style="padding:0px">
</div>
<%@ include file="/jsp/security/addRole.jsp" %>
<%@ include file="/jsp/security/editRole.jsp" %>
<%@ include file="/jsp/include/footer.jsp"%>
