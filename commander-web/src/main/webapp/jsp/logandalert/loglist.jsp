<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<%
jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/plugin/My97DatePicker/WdatePicker.js");
jspContext.addJSRef("js/logandalert/log.js");
jspContext.addCssRef("css/logandalert/log.css");
%>
<script type="text/javascript">
<!--
	var log = new Log("log");
	$(document).ready(function(){
		log.init();
	});
//-->
</script>

<div id="log_content">
	<div id="log_header">
		<%request.setAttribute("actionModule", "Log"); %><%@ include file="/jsp/logandalert/actionform.jsp"%>
		<table class="tab_list">
			<thead>
				<tr class="tab_header">
					<th style="width:10px"></th>	
					<th style="width:140px"><s:text name="log.field.time" /></th>
					<th style="width:100px"><s:text name="log.field.user" /></th>
					<th style="width:80px"><s:text name="log.field.type" /></th>
					<th><s:text name="log.field.description" /></th>
					<th style="width:50px"><s:text name="log.field.attachment" /></th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="log_data">
		<table class="tab_list">
			<tbody>
				<s:iterator value="logList" status="s">
					<tr class="tab_content">
						<td style="width:10px"></td>
						<td style="width:140px"><s:text name="format.date"><s:param value="createdAt"/></s:text></td>
						<td style="width:100px"><s:property value="user"/></td>
						<td style="width:80px"><s:property value="typeList[type]"/></td>
						<td style="text-align:left;line-height:20px;"><s:property value="description"/></td>
						<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOG_VIEW'})">
						<td style="width:50px">
							<s:if test="hasAttachment">
								<a href="showLogAttachment.action?id=<s:property value="id"/>" target="_blank"><img src="images/icons/attachment.png" width="30px" height="30px" align="absmiddle" border="0"/></a>
							</s:if>
						</td>
						</sec:authorize>
					</tr>
				</s:iterator>
			</tbody>			
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
</div>
<%@ include file="/jsp/logandalert/delete.jsp" %>
<%@ include file="/jsp/include/footer.jsp"%>