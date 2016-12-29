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
	var log = new Log("alert");
	$(document).ready(function(){
		log.init();
	});
//-->
</script>
<div id="log_content">
	<div id="log_header">
		<%request.setAttribute("actionModule", "Alert"); %><%@ include file="/jsp/logandalert/actionform.jsp"%>
		<table class="tab_list">
			<thead>
				<tr class="tab_header">	
					<th style="width:10px"></th>		
					<th style="width:140px"><s:text name="alert.field.time" /></th>
					<th style="width:80px"><s:text name="alert.field.type" /></th>
					<th style="width:80px"><s:text name="alert.field.level" /></th>
					<th style="width:130px"><s:text name="alert.field.ip" /></th>
					<th><s:text name="alert.field.description" /></th>			
				</tr>
			</thead>
		</table>
	</div>
	<div id="log_data">
		<table class="tab_list">
			<tbody>
				<s:iterator value="alertList" status="s">
					<tr class="tab_content">
						<td style="width:10px"></td>
						<td style="width:140px"><s:text name="format.date"><s:param value="createdAt"/></s:text></td>
						<td style="width:80px"><s:property value="typeList[type]"/></td>
						<td style="width:80px"><s:property value="level"/></td>
						<td style="width:130px"><s:property value="ip"/></td>
						<td style="text-align:left;line-height:20px;">
							<s:if test="type.equals('task')"><s:text name="alert.field.taskId" />[<s:property value="taskId"/>]:</s:if>
							<s:property value="description"/></td>
					</tr>
				</s:iterator>
			</tbody>		
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
</div>
<%@ include file="/jsp/logandalert/delete.jsp" %>
<%@ include file="/jsp/logandalert/alertconfig.jsp" %>
<%@ include file="/jsp/include/footer.jsp"%>