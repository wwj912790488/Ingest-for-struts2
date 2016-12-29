<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/ajaxfileupload.js");
jspContext.addJSRef("js/settings/grouplicense.js");
jspContext.addCssRef("css/settings/grouplicense.css");
%>

<script type="text/javascript">
<!--
	$(function() {
		var groupLicense = new GroupLicense();
		groupLicense.init();
	});
//-->
</script>

<div id="license_update_panel">
	<s:text name="license.label.update.license"/>
	<input type="file" id="licenseFile" name="licenseFile"/>
	<input type="button" id="btnUpdateLicense" value="<s:text name="license.button.update"/>"/>
</div>
<div>
	<%@ include file="/jsp/settings/errorservers.jsp"%>
	<s:iterator value="groupView.groupList" var="groupData">
	<div class="group_title">
		<div class="left">
			<div class="group_icon icon_detail_close"></div>
			(${groupData.list.size()})
			<s:text name="license.label.product.type"/>${groupData.list[0].data.productType}
		</div>
		<div class="left">
			<s:text name="license.label.license.id"/>${groupData.list[0].data.licenseId}
		</div>
	</div>
	<div class="clear"></div>
	<div class="group_detail">
		<s:iterator value="#groupData.list" var="serverData">
		<div>${serverData.server.name} (${serverData.server.ip})</div>
		</s:iterator>
	</div>
	</s:iterator>
</div>
