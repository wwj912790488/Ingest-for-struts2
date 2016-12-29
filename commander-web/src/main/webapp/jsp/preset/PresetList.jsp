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
<title>preset</title>

<%
jspContext.addCssRef("css/common.css");
jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/PresetList.css");
jspContext.addCssRef("style/uictrl.css");
jspContext.addCssRef("style/PopupMenu.css");
jspContext.addCssRef("style/TaskDetail.css");

jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/controls/ImportContent.js");
jspContext.addJSRef("js/preset/PresetList.js");
jspContext.addJSRef("js/appui.listview.js");
%>

<script type="text/javascript">
	// js context
	var MSG = {
			is_del_select	: '<s:text name="msg.is_del_select" />',
			is_export_presets	: '<s:text name="msg.is_export_presets" />',
			importPresets	: '<s:text name="title.importPresets" />',
			pls_select_one	: '<s:text name="msg.pls_select_one" />'
	};
	var cxtOTL = {
			preset_name		: '<s:text name="preset_name" />',
			waittingIconSrc : "images/icons/waitting.gif",
			activeFilter	: "",
			msg				: MSG
	};

	function doFilter(f){
		window.location.href= f=='0'?'listPreset' : 'listPresetCategory';
	}
	
	//init on document ready
	$(document).ready(
		function() {
			PL_Init(cxtOTL);
			$.pagination({
				"method" : "get"
			});
		}
	);
</script>
<style type="text/css">
html, body{
	overflow: hidden;
}
</style>
</head>
<body>
	<div class="list_view_header_with_submenu">
		<div id="FilterPanel" class="cm_operatebar ActionBarText">
			<table class="ContentPos">
				<tr>
					<td>
						<div/>
					</td>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_VIEW_EXPORT'})">
					<td style="width: 86px">
						<span class="action_normal_btns">
							<a onclick="PL_ExportPresets()" style="min-width: 86px">
								<span class="btn_left"></span>
								<span class="btn_middle" style="min-width: 80px"><p><s:text name="action.export" /></p></span>
								<span class="btn_right"></span>
							</a>
						</span>
					</td>
					</sec:authorize>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_ADD_IMPORT'})">
					<td style="width: 10px"></td>
					<td style="width: 86px">
						<span class="action_normal_btns">
							<a onclick="PL_ImportPresets()" style="min-width: 86px">
								<span class="btn_left"></span>
								<span class="btn_middle" style="min-width: 80px"><p><s:text name="action.import" /></p></span>
								<span class="btn_right"></span>
							</a>
						</span>
					</td>
					</sec:authorize>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_ADD_NEW'})">
					<td style="width: 10px"></td>
					<td style="width: 100px">
						<div class="action_btns">
							<a onclick="window.location.href='newPreset.action'">
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
		<div class="cm_actionbar">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_EDIT_IMPORT'})">
		    <div class="ActionBarItem ActionItemEdit" style="margin-left: 20px;" onclick="PL_Edit()"><s:text name="action.edit" /></div>
		    </sec:authorize>
		    <sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_ADD_NEW'})">
		    <div class="ActionBarItem ActionItemCopy" onclick="PL_Copy()"><s:text name="action.copy" /></div>
		    </sec:authorize>
		    <sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_DELETE'})">
		    <div class="ActionBarItem ActionItemDelete" onclick="PL_Del()"><s:text name="action.del" /></div>
		    </sec:authorize>
		    <div id="ActionMessage" style="display:inline-block;height:44px;vertical-align:middle;color:#FF0000;"></div>
		    <div id="blank" style="display: inline-block;padding-left: 30px;line-height: 44px;vertical-align: middle;"></div>
		</div>
		<table class="tab_list">
			<thead>
				<tr class="tab_header" style="font-weight: bold">
					<td style="width:10px"></td>
					<td style="width:50px"><s:text name="taskcol.id" /></td>
					<td style="width:300px"><s:text name="title.name" /></td>
					<td style="width:100px"><s:text name="title.group" /></td>
					<td align="left"><s:text name="title.desc" /></td>
				</tr>
			</thead>
		</table>
	</div>
	<div class="list_view_content_with_submenu">
		<table class="tab_list single_selection">
			<tbody>
				<s:iterator value="presets" status="status" var="preset">
				<tr class="tab_content" style="line-height: 23px">
					<td style="width:10px"><input type="checkbox" name="chk" value="${preset.id}" style="display:none"/></td>
					<td style="width:50px">${preset.id}</td>
					<td style="width:300px"><div class="app_text_ellipsis" style="width: 300px">${preset.name}</div></td>
					<td style="width:100px">
						<s:if test="(#preset.presetCategory==null || #preset.presetCategory.name==null)">
							<s:text name="label.nogroup" />
						</s:if><s:else>
							<s:property value="presetCategory.name" />
						</s:else>
					</td>
					<td style="text-align: left">
						<span><s:property
							value="[0].streamAssembly.videoDescription.settingsType" />
						<s:property value="[0].streamAssembly.videoDescription.width" />x<s:property
							value="[0].streamAssembly.videoDescription.height" />
						<s:if test='[0].streamAssembly.videoDescription.videoSetting.framerateFollowSource'>
						</s:if>																			
						<s:elseif test='[0].streamAssembly.videoDescription.videoSetting.getFramerate().toString()!="0"'>
							@<s:property value="[0].streamAssembly.videoDescription.videoSetting.getFramerate().toString()"/>fps
						</s:elseif>	
						<s:property
							value="[0].streamAssembly.videoDescription.videoSetting.rateControlMode" />
						<s:property value="[0].streamAssembly.videoDescription.videoSetting.bitrate"/>Kbps | <s:property
							value="[0].streamAssembly.audioDescriptions.get(0).settingsType" />
						<s:property
							value="[0].getSampleRateOption([0].streamAssembly.audioDescriptions.get(0).audioSetting.sampleRate)" />KHz
						<s:property
							value="[0].streamAssembly.audioDescriptions.get(0).audioSetting.channels" />
						<s:text name="label.channels" /> <s:property
							value="[0].getBitRateOption([0].streamAssembly.audioDescriptions.get(0).audioSetting.bitrate)" />Kbps</span>
					</td>
				</tr>
				</s:iterator>
			</tbody>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
<!-- 
	<div class="ContentArea list_view_content_with_submenu">

		<table border="0" >
			<tr>
				<td style="width:auto;" onclick="PL_OnSelectRow(null)"></td>
				<td style="width:1024px;">
					<form>
						<div id="ListContainer" class="ListContainer TableItemText ListBody">
							<s:iterator value="presets" status="status" var="preset">							
								<div id="${id}" class="TblRow TableItemText" onclick="PL_OnSelectRow(this)">
									<input id="id" type="checkbox" name="chk" value="${id}" style="display:none"/>
									<div style="width: 1024px">
									<div class="TblCol_0"></div>						
									<div class="TblCol_Name"><s:property value="name" /></div>
									<div class="TblCol_Group">
										<s:if test="(#preset.presetCategory==null || #preset.presetCategory.name==null)">
											<s:text name="label.nogroup" />
										</s:if><s:else>
											<s:property value="presetCategory.name" />
										</s:else>
									</div>
									<div class="TblCol_Desc">
										<span><s:property
												value="[0].streamAssembly.videoDescription.settingsType" />
											<s:property value="[0].streamAssembly.videoDescription.width" />x<s:property
												value="[0].streamAssembly.videoDescription.height" />
											<s:if test='[0].streamAssembly.videoDescription.videoSetting.framerateFollowSource'>
											</s:if>																			
											<s:elseif test='[0].streamAssembly.videoDescription.videoSetting.getFramerate().toString()!="0"'>
												@<s:property value="[0].streamAssembly.videoDescription.videoSetting.getFramerate().toString()"/>fps
											</s:elseif>	
											<s:property
												value="[0].streamAssembly.videoDescription.videoSetting.rateControlMode" />
											<s:property value="[0].streamAssembly.videoDescription.videoSetting.bitrate"/>Kbps | <s:property
												value="[0].streamAssembly.audioDescriptions.get(0).settingsType" />
											<s:property
												value="[0].getSampleRateOption([0].streamAssembly.audioDescriptions.get(0).audioSetting.sampleRate)" />KHz
											<s:property
												value="[0].streamAssembly.audioDescriptions.get(0).audioSetting.channels" />
											<s:text name="label.channels" /> <s:property
												value="[0].getBitRateOption([0].streamAssembly.audioDescriptions.get(0).audioSetting.bitrate)" />Kbps</span>
									</div>
									</div>
								</div>
							</s:iterator>
						</div>
					</form>
					<s:include value="/jsp/include/pager.jsp" />
				</td>
				<td style="width:auto;" onclick="PL_OnSelectRow(null)"></td>
			</tr>
		</table>
	
	</div>
 -->
	<div style="display: none">
		<%@ include file="/jsp/controls/DialogFrame.jsp"%>
		<%@ include file="/jsp/controls/ImportContent.jsp"%>
	</div>
</body>
</html>
