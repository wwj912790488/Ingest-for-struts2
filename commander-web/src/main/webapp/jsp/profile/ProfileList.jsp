<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix='sec' uri='http://www.springframework.org/security/tags' %>
<%@ include file="/jsp/include/jsonheader.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %> 
<base href="<%=urlbase%>/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"  />
<title>Profile</title>

<%
jspContext.addCssRef("css/common.css");
jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/ProfileList.css");
jspContext.addCssRef("style/uictrl.css");
jspContext.addCssRef("style/PopupMenu.css");
jspContext.addCssRef("style/TaskDetail.css");

jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/mediainfo.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/controls/ImportContent.js");
jspContext.addJSRef("js/profile/ProfileList.js");
jspContext.addJSRef("js/appui.listview.js");
%>

<script type="text/javascript">
	// js context
	var MSG = {
			is_del_select	: '<s:text name="msg.is_del_select" />',
			is_export_profiles	: '<s:text name="msg.is_export_profiles" />',
			import_profiles	: '<s:text name="title.importProfiles" />',	
			pls_select_one	: '<s:text name="msg.pls_select_one" />'
	};
	var cxtTTL = {
			profile_name	: '<s:text name="profile_name" />',
			waittingIconSrc : "images/icons/waitting.gif",
			activeFilter	: "${filter}",
			msg				: MSG
	};

	function doFilter(f){
		window.location.href='listProfile?filter=' + f;
	}
	
	//init on document ready
	$(document).ready(
		function() {
			TTL_Init(cxtTTL);
			$.pagination({
				"method" : "get",
				"data" : {
					"filter" : $("#filter").val()
				}
			});
		}
	);
</script>

<style type="text/css">
html, body{
	overflow: hidden;
}
.FilterButton{
	width: 50px;
}

.FilterButtonPressed{
	width: 50px;
}
</style>
</head>
<body>
	<input type="hidden" id="filter" value="<s:property value="filter"/>"/>
	<div class="list_view_header_with_submenu">
		<div id="FilterPanel" class="cm_operatebar ActionBarText">
			<table class="ContentPos">
				<tr>
					<td>
						<div id="0" class="FilterButton" onclick="doFilter('0')">
							<s:text name="filter.all" />
						</div>
						<div id="1" class="FilterButton" onclick="doFilter('1')">
							<s:text name="filter.predefined" />
						</div>
						<div id="2" class="FilterButton" onclick="doFilter('2')">
							<s:text name="filter.selfdefined" />
						</div>
					</td>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_VIEW_EXPORT'})">
					<td style="width: 86px">
						<span class="action_normal_btns">
							<a onclick="TTL_ExportProfiles()" style="min-width: 86px">
								<span class="btn_left"></span>
								<span class="btn_middle" style="min-width: 80px"><p><s:text name="action.export" /></p></span>
								<span class="btn_right"></span>
							</a>
						</span>
					</td>
					</sec:authorize>
					<td style="width: 10px"></td>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_ADD_IMPORT'})">
					<td style="width: 86px">
						<span class="action_normal_btns">
							<a onclick="TTL_ImportProfiles()" style="min-width: 86px">
								<span class="btn_left"></span>
								<span class="btn_middle" style="min-width: 80px"><p><s:text name="action.import" /></p></span>
								<span class="btn_right"></span>
							</a>
						</span>
					</td>
					</sec:authorize>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_ADD_NEW'})">
					<td style="width: 10px"></td>
					<td style="width: 100px">
						<div class="action_btns">
							<a onclick="window.location.href='newProfile.action?fromUri=listProfile'">
								<span class="btn_left"></span>
								<span class="btn_middle">
									<span class="left">
										<s:text name="btn.new" />
									</span>
									<span class="right"></span>
								</span>
								<span class="btn_right"></span>
							</a>								
						</div>						
					</td>
					</sec:authorize>
				</tr>
			</table>
		</div>
		<div class="cm_actionbar" style="padding-left: 14px">
			<!--
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_ADD_NEW'})">
				<div class="ActionBarItem" style="background-image:url('images/icons/icon_apply.png');margin-left: 20px;" onclick="TTL_Apply()"><s:text name="action.applyTmpl" /></div>
		    </sec:authorize>
		    -->
		    <sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_EDIT'})">
		    	<div class="ActionBarItem ActionItemEdit" onclick="TTL_Edit()"><s:text name="action.edit" /></div>
		    </sec:authorize>
		    <sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_ADD_NEW'})">
		    <div class="ActionBarItem ActionItemCopy" onclick="TTL_Copy()"><s:text name="action.copy" /></div>
		    </sec:authorize>
		    <sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_DELETE'})">
		    <div class="ActionBarItem ActionItemDelete"  onclick="TTL_Del()"><s:text name="action.del" /></div>
		    </sec:authorize>
		    <div id="blank" style="display: inline-block;padding-left: 30px;line-height: 44px;vertical-align: middle;"></div>
		    <div style="display:inline-block;height:40px;vertical-align:middle;"><s:actionmessage/></div>
		</div>
		<table class="tab_list">
			<thead>
				<tr class="tab_header" style="font-weight: bold">
					<td style="width:10px"></td>
					<td style="width:50px"><s:text name="taskcol.id" /></td>
					<td style="width:300px"><s:text name="label.name" /></td>
					<td style="width:100px"><s:text name="taskcol.inum" /></td>
					<td style="width:100px"><s:text name="taskcol.num" /></td>
					<td align="left"><s:text name="label.desc" /></td>
				</tr>
			</thead>
		</table>
	</div>
	<div class="list_view_content_with_submenu">
		<table class="tab_list single_selection">
			<tbody>
				<s:iterator value="allLiveProfiles" status="status" var="profile">
				<tr class="tab_content" style="line-height: 23px">
					<td style="width:10px"><input type="checkbox" name="taskChk" value="${profile.id}" style="display:none"/></td>
					<td style="width:50px">${profile.id}</td>
					<td style="width:300px"><div class="app_text_ellipsis" style="width: 300px">${profile.name}</div></td>
					<td style="width:100px">${profile.inputs.size()}</td>
					<td style="width:100px">${profile.outputGroups.size()}</td>
					<td style="text-align: left">${profile.description}</td>
				</tr>
				</s:iterator>
			</tbody>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
	<div style="display: none">
		<%@ include file="/jsp/controls/DialogFrame.jsp"%>
		<%@ include file="/jsp/controls/ImportContent.jsp"%>
	</div>
</body>
</html>
