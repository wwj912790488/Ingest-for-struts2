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
<title>preset by group</title>
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
%>

<script type="text/javascript">
	var MSG = {
			is_del_select	: '<s:text name="msg.is_del_select" />',	
			cannot_del		: '<s:text name="msg.cannot_del" />',
			is_export_presets	: '<s:text name="msg.is_export_presets" />',
			importPresets	: '<s:text name="title.importPresets" />',
			pls_select_one	: '<s:text name="msg.pls_select_one" />'
	};
	var LABEL = {
			nogroup			: '<s:text name="label.nogroup"/>'
	};
	// js context
	var cxtOTL = {
			group_name		: '<s:text name="group_name" />',
			preset_name		: '<s:text name="preset_name" />',
			waittingIconSrc : "images/icons/waitting.gif",
			activeFilter	: "${filter}",
			msg				: MSG,
			label			: LABEL
	};

	function doFilter(f){
		window.location.href= f=='0'?'listPreset' : 'listPresetCategory';
	}
	
	//init on document ready
	$(document).ready(
		function() {
			PL_InitByG(cxtOTL);
		}
	);
</script>
<style type="text/css">
html, body{
	overflow: hidden;
}
.GroupTitle{
	width:1024px;	
}
</style>
</head>
<body>
	<div class="list_view_header_with_submenu">
		<div id="FilterPanel" class="FilterPanel ActionBarText">
			<table class="ContentPos">
				<tr>
					<td>
						<div id="0" class="FilterButton" onclick="doFilter('0')">
							<s:text name="filter.all" />
						</div>
						<div id="1" class="FilterButtonPressed" onclick="doFilter('1')">
							<s:text name="filter.group" />
						</div>
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
						<div class="action_btns" style="float: right;">
							<a onclick="window.location.href='newPreset'">
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
		<div id="TblHeadContainer" class="ContentPos TblHeadContainer">
			<form name="frmTableHead">								
				<div id="ActionBar" class="cm_actionbar">	
					<div id="ActionBarHint" class="ActionBarHint" style="padding-left:0px;margin-left: 0px;display: none;"></div>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_EDIT_IMPORT'})">
					<div class="ActionBarItem ActionItemEdit" style="margin-left: 20px;"  onclick="PLG_Action(PLG_Edit)"><s:text name="action.edit" /></div>
					</sec:authorize>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_PRESET_DELETE'})">
					<div class="ActionBarItem ActionItemDelete" onclick="PLG_Action(PLG_Del)"><s:text name="action.del" /></div>
					</sec:authorize>
				    <div id="blank" style="display: inline-block;padding-left: 30px;line-height: 44px;vertical-align: middle;"></div>
				</div>
				<div id="TblHead" class="TblHead TableColTitleText">	
					<div class="Col_Group" style="width:32px;"></div>
					<div class="Col_Group"><s:text name="title.group" /></div>	
					<div class="Col_Group" style="width:18px;"></div>
			        <div class="TblCol_Name"><s:text name="title.name" /></div>			        
			        <div class="Col_Desc"><s:text name="title.desc" /></div>	
				</div>				
			</form>
		</div>
	</div>

	<div class="ContentArea list_view_content_with_submenu">
		<table border="0" >
			<tr>
				<td style="width:auto;" onclick="PLG_OnSelectRow(null)"></td>
				<td style="width:1024px;">
					<form name="frm">
						<div id="ListContainer" class="TableItemText ListBody" >
							<s:iterator value="allPresetCategories" status="status" var="presetCat">							
								<div id="PresetGroup" class="TblRow">	
									<input type="checkbox" name="chk" value="${id}" style="display:none"/>																									
									<div id="RowBG" class="GroupTitle TableItemText" onclick="PLG_OnSelectRow(this)">
										<span id="BgIconCollaps" class="BgIconCollaps" onclick="PLG_Toggle(this)"></span>										
										<span class="GroupName">										
											<s:if test="#presetCat.name==null">
												<s:text name="label.nogroup" />
											</s:if><s:else>
												<s:property value="name" />
											</s:else>
										</span>
										<span style="padding-left:10px">(${presetCat.presets.size()})</span>
									</div>
									<div id="ListContainer" class="GroupSub GroupSubNone" style="padding-left: 0px;width : 1024px;background-color:${status.index%2==0?"#f4f4f4":"transparent"}">	
										<s:iterator value="presets" status="status" var="preset">
											<div id="${id}" class="TblRow TableItemText RowBG" onclick="PLG_OnSelectSubRow(this)">																			
												<input type="checkbox" name="chk" value="${id}" style="display:none"/>	
												<div>
												<div class="Col_Group"></div>				
												<div class="TblCol_Name"><s:property value="name" /></div>
												<div class="Col_Desc" style="width: 645px;">
													<span><s:property
															value="[0].streamAssembly.videoDescription.settingsType" />
														<s:property
															value="[0].streamAssembly.videoDescription.width" />x<s:property
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
															value="[0].streamAssembly.audioDescriptions.get(0).audioSetting.channels" /><s:text name="label.channels" />
														<s:property
															value="[0].getBitRateOption([0].streamAssembly.audioDescriptions.get(0).audioSetting.bitrate)" />Kbps</span>
												</div>
												</div>
											</div>	
										</s:iterator>
									</div>
								</div>
							</s:iterator>
						</div>
					</form>
				</td>
				<td style="width:auto;" onclick="PLG_OnSelectRow(null)"></td>
			</tr>
		</table>
	
	</div>
	<div style="display: none">
		<%@ include file="/jsp/controls/DialogFrame.jsp"%>
		<%@ include file="/jsp/controls/ImportContent.jsp"%>
	</div>
</body>
</html>
