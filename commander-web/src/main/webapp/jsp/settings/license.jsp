<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/ajaxfileupload.js");
jspContext.addJSRef("js/settings/license.js");
jspContext.addCssRef("css/settings/license.css");
%>

<script type="text/javascript">
<!--
var LICENSE_UPDATE_FAILED = '<s:text name="license.error.update.fail"/>';

$(function() {
	var license = new LicenseManager();
	license.init();
});
//-->
</script>

<div id="license_content">
	<table align="center">
	<s:if test="licenseInfo != null">
	<tr>
		<td class="license_view_label"><s:text name="license.label.product.type"/></td>
		<td class="license_view_data"><s:property value="licenseInfo.productType"/></td>
	</tr>
	<tr>
		<td class="license_view_label"><s:text name="license.label.license.id"/></td>
		<td class="license_view_data"><s:property value="licenseInfo.licenseId"/></td>
	</tr>
	</s:if>
	<s:else>
	<tr>
		<td colspan=2 class="license_error_message"><s:property value="description"/></td>
	</tr>
	</s:else>
	<tr>
		<td class="license_view_label"><s:text name="license.label.update.license"/></td>
		<td class="license_view_data"><input type="file" id="licenseFile" name="licenseFile"/></td>
	</tr>
	</table>
	<center>
		<input type="button" id="btnUpdateLicense" value="<s:text name="license.button.update"/>"/>
	</center>
</div>
