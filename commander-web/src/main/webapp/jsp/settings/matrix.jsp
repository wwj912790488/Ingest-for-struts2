<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/matrix.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
	var matrix;
	$(function(){
		matrix = new Matrix();
		matrix.init();
	});
</script>

<div id="secondNavigation">
	<div id="secondNavigationPanel">
		<input type="hidden" id="groupid" value="<s:property value='group.id' />" />
		
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_MATRIX'})">
			<div href="matrixInit.action" id="matrixMenu1" class="secondClassNav secondClassNavActive"><s:text name="group.setting.matrix.init" /></div>
		</sec:authorize>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_MATRIX'})">
				<div href="matrixSetting.action" id="matrixMenu2" class="secondClassNav"><s:text name="group.setting.matrix.setting" /></div>
		</sec:authorize>
	</div>
</div>

<div id="main">

</div>