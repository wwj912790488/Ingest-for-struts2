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
%>

<script type="text/javascript">
var changePassword = '<s:text name="changePasswod" />';
var logout = '<s:text name="logout" />';
var isDropDownMenuShow = false;
function showUserSettingMenu(obj){
	if (isDropDownMenuShow)
		return;
	var dialog = new DropdownMenu(function(){
		isDropDownMenuShow = false;
	});
	dialog.show();
	dialog.setSize(153,63);
	dialog.addMenu(changePassword, "click", function(){
		isDropDownMenuShow = false;
		dialog.close();
		showChangePasswordDialog();
	}, true);
	dialog.addMenu(logout, "click", function(){
		isDropDownMenuShow = false;
		dialog.close();
		location.href = "<%=jspContext.getAbsolutePath("logout")%>";
	});
	var pos = $(".navTab2").position();	
	dialog.move(pos.left + $(".navTab2").width() - 163, pos.top);
	$(window).resize(function(){
		pos = $(".navTab2").position();
		dialog.move(pos.left + $(".navTab2").width() - 163, pos.top);
		});
	isDropDownMenuShow = true;
}

function updateState(obj){
	var url = $(obj).find("a").attr("href");
	if (url == undefined)
		url = $("#" + obj.id + "Child > a:first").attr("action");
	if (url == undefined)
		return;
	window.frames["mainFrame"].location.href = url;
	window.location.href="#" + url;
	$("#navTabPanel .navTab").each(function(index, item) {
		if (item == obj) {
			$(item).addClass("active");
		} else {
			$(item).removeClass("active");
		}
	});
}

function updateSubmenu(obj) {
	var url = $(obj).attr("action");
	if (url == undefined)
		return;
	window.frames["mainFrame"].location.href = url;
	window.location.href="#" + url;
	$(".second-nav > .active").removeClass("active");
	$(obj).addClass("active");
}

$(function() {
	$("#navTabPanel .navTab").click(function() {
		updateState(this);
		switchNavOfTemplate($(this));
	});
	
	$(".navTab2").click(function() {
		showUserSettingMenu(this);
	});

	var url = location.href;
	var index = url.indexOf("#");
	var matched = false;
	var newurl = "";
	var subUrl = "";
	if (index != -1) {
		var nextIndex = url.indexOf("#", index+1);
		if (nextIndex != -1) {
			newurl = url.substring(index+1, nextIndex);
			subUrl = url.substring(nextIndex + 1);
		} else {
			newurl = url.substring(index+1);
		}
		$("#navTabPanel .navTab").each(function(index, item) {
			if ($(item).find("a").attr("href") == newurl) {
				$(item).click();
				matched = true;
				return false;
			}
		});
		if (!matched) {
			$(".second-nav > a").each(function(index, item){
				if ($(item).attr("action") == newurl) {
					var id = $(item).parent().attr("id");
					$("#" + id.substring(0, id.length-"Child".length)).click();
					updateSubmenu(item);
					matched = true;
					return false;
				}
			});
		}
	}
	if (!matched) {
		$("#navTabPanel .navTab:first").click();
	} else {
		if (subUrl != "") {
			window.frames["mainFrame"].location.href = subUrl;
		}
	}

	$(".second-nav > a").click(function(){
		updateSubmenu(this);
	});

	$("#mainFrame").load(function() {
		var frameUrl = window.frames["mainFrame"].location.href;
		if (frameUrl == undefined || frameUrl == "" || frameUrl == "about:blank") {
			return;
		}
		var i = frameUrl.lastIndexOf("/");
		if (i != -1) {
			frameUrl = frameUrl.substring(i + 1);
		}
		var url = window.location.href;
		var index = url.indexOf("#");
		if (index != -1) {
			var nextIndex = url.indexOf("#", index+1);
			if (nextIndex != -1) {
				url = url.substring(index + 1, nextIndex);
			} else {
				url = url.substring(index + 1);
			}
		} else {
			url = "";
		}
		var targetUrl = url;
		if (frameUrl.indexOf(url) != 0) {
			targetUrl += (targetUrl != "" ? "#" : "") + frameUrl;
		}
		window.location.href = "#" + targetUrl;
	});
});

function switchNavOfTemplate(navTabObj){
	var id = navTabObj.attr('id');
	
	if(id && id == 'template'){
		$("#securityChild").css("display", "");
		$("#headerContainer").css("height", "180px").css("background-image", "url('images/header/tab_down_long.png')");
		$("#templateChild").css("display", "inline-block");
		$("#templateChild > .active").removeClass("active");
		$("#templateChild > a:first").addClass("active");
	}else if(id && id == 'security'){
		$("#templateChild").css("display", "");
		$("#headerContainer").css("height", "180px").css("background-image", "url('images/header/tab_down_long.png')");
		$("#securityChild").css("display", "inline-block");
		$("#securityChild > .active").removeClass("active");
		$("#securityChild > a:first").addClass("active");
	}
	else{
		$("#headerContainer").css("height", "143px").css("background-image", "url('images/header/tab_down.png')");
		$("#templateChild").css("display", "");
		$("#securityChild").css("display", "");
	}
}
//-->
</script>
<div id="headerContainer">
	<div id="headerPanel">
		<div id="logoPanel" style="font-size: 32px; color: white">
			<img alt="logo" src="images/header/product_LOGO.png"><s:text name="system.application.name" />
		</div>
		<div id="navTabPanel">
			<s:if test="getLicenseStringValue('LICENSEID') == null">
				<div class="navTab navBtnText"><a href='setting.action?isLocal=true&isLicenseOnly=true'></a><s:text name="setting.host.license.manage" /></div>
			</s:if>
			<s:else>
				<s:if test="isLicenseEnabled('DEVICE_MANAGEMENT')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_VIEW'})">
					<div class="navTab navBtnText"><a href='listServer.action'></a><s:text name="homepage.navigation.device" /></div>
				</sec:authorize>
				</s:if>
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_CHANNEL_VIEW'})">
				<div class="navTab navBtnText"><a href='listChannel.action'></a><s:text name="homepage.navigation.channel" /></div>
				</sec:authorize>
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_RECORD_VIEW'})">
				<div class="navTab navBtnText"><a href='listRecord.action'></a><s:text name="homepage.navigation.record" /></div>
				</sec:authorize>
				<s:if test="isLicenseEnabled('TASK_MANAGEMENT')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_TASK_VIEW'})">
					<div class="navTab navBtnText" id="task"><a href='listTask.action'></a><s:text name="homepage.navigation.task" /></div>
				</sec:authorize>
				</s:if>
				<s:if test="isLicenseEnabled('TEMPLATE_PRESET')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN', 'ROLE_PRESET_VIEW'})">
					<s:set value="'listPreset.action'" name="templeteUrl"  scope="page"/>
				</sec:authorize>
				</s:if>
				<s:if test="isLicenseEnabled('TEMPLATE_PROFILE')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_VIEW'})">
					<s:set value="'listProfile.action'" name="templeteUrl" scope="page"/>
				</sec:authorize>
				</s:if>

				<s:if test="%{#attr.templeteUrl != null}">
					<div class="navTab navBtnText" id="template"><s:text name="homepage.navigation.module" /></div>
				</s:if>

				<s:if test="isLicenseEnabled('SECURITY_ROLES')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ROLE_VIEW'})">
					<s:set value="'roleIndex.action'" name="secUrl"  scope="page"/>
				</sec:authorize>
				</s:if>

				<s:if test="isLicenseEnabled('SECURITY_USERS')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER_VIEW'})">
					<s:set value="'listSecurity.action'" name="secUrl" scope="page"/>
				</sec:authorize>
				</s:if>

				<s:if test="%{#attr.secUrl != null}">
					<div class="navTab navBtnText"  id="security"><s:text name="homepage.navigation.security" /></div>
				</s:if>

				<s:if test="isLicenseEnabled('OPERATION_LOG')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOG_VIEW'})">
					<div class="navTab navBtnText"><a href='listLog.action?rdTime=1&timeDuration=0'></a><s:text name="homepage.navigation.log" /></div>
				</sec:authorize>
				</s:if>
				<s:if test="isLicenseEnabled('ALERT_MANAGEMENT')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ALERT_VIEW'})">
					<div class="navTab navBtnText"><a href='listAlert.action?rdTime=1&timeDuration=0'></a><s:text name="homepage.navigation.warning" /></div>
				</sec:authorize>
				</s:if>
			</s:else>
			<div class="navTab2">
				<table>
					<tr>
					<td><div class="image_user"></div></td>
					<td><label class="navBtnText label_user"><sec:authentication property="principal.realName"></sec:authentication></label></td>
					<td><div class="image_gear"></div></td>
					</tr>
				</table>
			</div>
			<div style="clear: both;"></div>
			<div id="templateChild" class="second-nav">
				<s:if test="isLicenseEnabled('TEMPLATE_PROFILE')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PROFILE_VIEW'})">
				<a action="listProfile.action">
					<span><s:text name="title.profiles" /></span>
				</a>
				</sec:authorize>
				</s:if>
				<s:if test="isLicenseEnabled('TEMPLATE_PRESET')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_VIEW'})">
				<a action="listPreset.action">
					<span><s:text name="title.presets" /></span>
				</a>
				</sec:authorize>
				</s:if>
			</div>
			<div id="securityChild" class="second-nav">
				<s:if test="isLicenseEnabled('SECURITY_USERS')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_USER_VIEW'})">
				<a action="listSecurity.action">
					<span><s:text name="title.user" /></span>
				</a>
				</sec:authorize>
				</s:if>
				<s:if test="isLicenseEnabled('SECURITY_ROLES')">
				<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ROLE_VIEW'})">
				<a action="roleIndex.action">
					<span><s:text name="title.role" /></span>
				</a>
				</sec:authorize>
				</s:if>
			</div>
		</div>
	</div>

</div>

<div id="mainFrameContainer">
	<iframe id="mainFrame" name="mainFrame" frameborder="0"></iframe>
</div>

<div id="footer">
	<div id="footerContent">
		<img src="images/logo.png" width="46" height="21"/>&copy; 2013-2016 ArcVideo, Inc. All rights reserved.
	</div>
</div>

<%@ include file="/jsp/general/top.jsp" %>
<%@ include file="/jsp/security/changePassword.jsp" %>
<%@ include file="/jsp/security/changePasswordSuccess.jsp"%>
<%@ include file="/jsp/include/footer.jsp"%>
