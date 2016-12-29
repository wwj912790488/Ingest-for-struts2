<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/routelist.js");
jspContext.addCssRef("css/settings/routelist.css");
%>

<script>
var id = '<s:property value="id"/>';
var isLocal = '<s:property value="isLocal"/>';
var title = '<s:text name="msg.dialog.title.warning" />';
var buttonOK = '<s:text name="msg.ok" />';
var msgAddFailed = '<s:text name="msg.error.server.network.route.add" />';
var msgDeleteFailed = '<s:text name="msg.error.server.network.route.delete" />';
$(function(){
	var dao = new RouteDAO();
	dao.init();
});
</script>

<div class="route_content">
	<div id="title">
		<s:text name="server.network.route.title" />
	</div>
	<div id="space_1"></div>
	<div>
		<table class="route_table">
			<tr class="table_head">
				<td><s:text name="server.network.route.dest" /></td>
				<td><s:text name="server.network.route.gateway" /></td>
				<td><s:text name="server.network.route.mask" /></td>
				<td><s:text name="server.network.route.flags" /></td>
				<td><s:text name="server.network.route.metric" /></td>
				<td><s:text name="server.network.route.ref" /></td>
				<td><s:text name="server.network.route.use" /></td>
				<td><s:text name="server.network.route.iface" /></td>
				<td></td>
			</tr>
			<s:iterator value="routes" var="var" status='st'>
				<tr>
					<td id="dest_<s:property value="#st.index+1"/>"><s:property value="#var.dest" /></td>
					<td id="gateway_<s:property value="#st.index+1"/>"><s:property value="#var.gateway" /></td>
					<td id="mask_<s:property value="#st.index+1"/>"><s:property value="#var.mask" /></td>
					<td id="flags_<s:property value="#st.index+1"/>"><s:property value="#var.flags" /></td>
					<td id="metric_<s:property value="#st.index+1"/>"><s:property value="#var.metric" /></td>
					<td id="use_<s:property value="#st.index+1"/>"><s:property value="#var.use" /></td>
					<td id="ref_<s:property value="#st.index+1"/>"><s:property value="#var.ref" /></td>
					<td id="iface_<s:property value="#st.index+1"/>"><s:property value="#var.iface" /></td>
					<td class="deleteBtn" align="center"><a class="deleteBtn" index="<s:property value="#st.index+1"/>"></a></td>
				</tr>
			</s:iterator>
		</table>
	</div>
	<div id="space_2"></div>
	<div>
		<table width=100% id="table_add_route">
			<tr>
				<td><s:text name="server.network.route.dest" /></td>
				<td><s:text name="server.network.route.gateway" /></td>
				<td><s:text name="server.network.route.mask" /></td>
				<td><s:text name="server.network.route.iface" /></td>
				<td></td>
			</tr>
			<tr class="addRouteFrame">
				<td><input name=dest type="text" value="" /></td>
				<td><input name=gateway type="text" value="" /></td>
				<td><input name=mask type="text" value="" /></td>
				<td><select name=iface>
						<s:iterator value="eths" var="var">
							<option><s:property value="#var.id" /></option>
						</s:iterator>
				</select></td>
				<td>
					<button type="button" id="add_button"><s:text name="server.network.add" /></button>
				</td>
			</tr>
		</table>
	</div>
</div>