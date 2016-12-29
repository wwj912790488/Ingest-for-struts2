<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<%

	jspContext.addJSRef("js/messagedialog.js");
	jspContext.addCssRef("css/messagedialog.css");
	jspContext.addJSRef("js/iframedialog.js");
	jspContext.addJSRef("js/dropDownMenu.js");
	jspContext.addJSRef("js/templatedialog.js");
	jspContext.addCssRef("css/homepage.css");
	jspContext.addCssRef("css/security/dialog.css");
	jspContext.addJSRef("js/security/security.js");
	jspContext.addJSRef("js/jquery-md5.js");
	jspContext.addJSRef("js/general/top.js");
	jspContext.addCssRef("style/jqueryFileTree.css");
	jspContext.addJSRef("js/controls/jqueryFileTree.js");
	jspContext.addJSRef("js/plugin/My97DatePicker/WdatePicker.js");

jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/plugin/My97DatePicker/WdatePicker.js");
jspContext.addJSRef("js/logandalert/frameLog.js");
jspContext.addCssRef("css/logandalert/log.css");
	jspContext.addJSRef("js/framecommon.js");
%>

<style type="text/css">
	.tab_header th{
		background-color: #f0f3f6;
		border-left: 1px solid #dddddd;
		border-bottom: 2px solid #dddddd;
	}

	.tab_header td{
		background-color: #f0f3f6;
		border-left: 1px solid #dddddd;
		font-weight: bold;
	}

	.tab_content td{
		border-left: 1px solid #dddddd;
	}

</style>

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
		<%request.setAttribute("actionModule", "Alert"); %><%@ include file="/jsp/logandalert/frameactionform.jsp"%>
		<table class="tab_list">
			<thead>
				<tr class="tab_header">
					<th style="width:10px;border-left: 0px"></th>
					<th style="width:140px;border-left: 0px"><s:text name="alert.field.time" /></th>
					<th style="width:80px"><s:text name="alert.field.type" /></th>
					<th style="width:80px"><s:text name="alert.field.level" /></th>
					<th style="width:130px"><s:text name="alert.field.ip" /></th>
					<th style="width:auto"><s:text name="alert.field.description" /></th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="log_data">
		<table class="tab_list">
			<tbody>
				<s:iterator value="alertList" status="s">
					<tr class="tab_content">
						<td style="width:10px;border-left: 0px;"></td>
						<td style="width:140px;border-left: 0px;"><s:text name="format.date"><s:param value="createdAt"/></s:text></td>
						<td style="width:80px;"><s:property value="typeList[type]"/></td>
						<td style="width:80px;"><s:property value="level"/></td>
						<td style="width:130px;"><s:property value="ip"/></td>
						<td style="text-align:left;line-height:20px;width:auto;">
							<s:if test="type.equals('task')"><s:text name="alert.field.taskId" />[<s:property value="taskId"/>]:</s:if>
							<s:property value="description"/></td>
					</tr>
				</s:iterator>
			</tbody>
			<tfoot>
			<tr class="tab_header">
				<td style="width:10px;border-left: 0px;"></td>
				<td style="width:140px;border-left: 0px;"><s:text name="alert.field.time" /></td>
				<td style="width:80px;"><s:text name="alert.field.type" /></td>
				<td style="width:80px;"><s:text name="alert.field.level" /></td>
				<td style="width:130px;"><s:text name="alert.field.ip" /></td>
				<td style="width:auto;"><s:text name="alert.field.description" /></td>
			</tr>
			</tfoot>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>


</div>
<%@ include file="/jsp/logandalert/delete.jsp" %>
<%@ include file="/jsp/logandalert/alertconfig.jsp" %>
<%@ include file="/jsp/include/footer.jsp"%>