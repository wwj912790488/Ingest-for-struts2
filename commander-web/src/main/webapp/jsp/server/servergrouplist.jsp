<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>
<% 
	int DEVICE_TYPE_GROUP = 1;
	int DEVICE_TYPE_SERVER = 2;
%>

<%
jspContext.addCssRef("css/server/servergrouplist.css");
jspContext.addJSRef("js/server/servergrouplist.js");
%>

<script type="text/javascript">
//<!--
	var msgTitle = "<s:text name="msg.dialog.title.warning" />";
	var msgOk = "<s:text name='msg.ok'/>";
	var msgCancel = "<s:text name='msg.cancel'/>";
	var msgDeleteGroupConfirm = '<s:text name="msg.group.delete.confirm" />';
	var msgDeleteServerConfirm = "<s:text name="msg.server.delete.confirm" />";
	var msgRenameRequired = "<s:text name="server.group.err.name.required" />";
	var msgRenameTooLong = "<s:text name="server.group.err.name.too.long" />";
	var msgDeviceManage = '<s:text name="homepage.navigation.device" />';
	var canOperate = true;
	// update server's name after rename server
	function updateServerName(id, newName){
		$("tr").each(function(){
			var serverId = $(this).attr("id");
			if(serverId == id){
				$(this).find(".nameText").text(newName).attr("title", newName);
			}
		});
	}

	var serverGroupList = new ServerGroupList();

	$(document).ready(function() {
		
		serverGroupList.init();
	});
//-->
</script>
<div id="groupPanel">
	<div id="rootPanel" class="pointer font_12">
		<div style="position:relative;margin-top:5px;height:40px;float:left;">
			<img alt="" src="images/servergroup/commander.png" />
			<img class="focus hidden" alt="" src="images/servergroup/commander_focus.png" />
		</div>
		<div><s:text name="server.group.label" /></div>
	</div>
	<div id="groupLabel">
		<div class="font_12 left"><s:text name="server.group.list" /></div>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_ADD'})">
			<a class="addBtn right" href="javascript:serverGroupList.showAddGroupDialog()" onclick="this.blur();"></a>
		</sec:authorize>
	</div>	
	<div id="groupList">
	<s:if test="groups.size()==0">
		<div id="emptyPanel">
			<img alt="empty" src="images/servergroup/default group.png">
			<div id="emptyLabel"><s:text name="server.group.empty" /></div>
		</div>
	</s:if>
	<s:else>
	<s:iterator value="groups" var="group">
		<div>
			<table width="100%">
				<tr class="group pointer" id="${group.id}">
					<td width="14px"></td>
					<td width="30px" class="expIco"><div class="groupToggleIcon groupToggleIconOpen"></div><div class="groupToggleIconFocus groupToggleIconFocusOpen hidden"></div></td>
					<td width="40px"><div class="groupIcon groupIconNormal"></div></td>
					<td>
						<div class="nameText left font_12" type="group"><s:property value="name" /></div>
						<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_RENAME'})">
							<input class="nameInput" id="group" style="display: none" type="text" />
							<span class="nameError hidden"></span>
						</sec:authorize>
						<s:if test="#group.type==0">
							<%int master=0, slave=0; %>
							<s:iterator value="#group.servers" var="server">
							<s:if test="#server.backup==false">
							<%master++;%>
							</s:if>
							<s:else>
							<%slave++;%>
							</s:else>
							</s:iterator>
							<div class="nameComment left font_11">(M=<%=master%> N=<%=slave%>) </div>
						</s:if>	
						<s:else>
							<div class="nameComment left font_11">(<s:text name="server.group.type.live" />)</div>
						</s:else>
					</td>
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_DELETE'})">
						<td width="40px"><a class="deleteBtn" href="javascript:serverGroupList.showDeleteConfirmDialog(<%=DEVICE_TYPE_GROUP%>, ${group.id})" onclick="this.blur();" ></a></td>
					</sec:authorize>
					<td width="14px"></td>
				</tr>
			</table>
			
			<div class="serverList">
				<table width="100%">
					<s:iterator value="servers" var="server">
						<tr class="server pointer" id="${server.id}">
							<td width="52px"></td>	
							<td width="30px">
								<div style="position:relative;">
									<img alt="listIcon" src="images/servergroup/branch.png">
									<img class="focus hidden" alt="listIcon" src="images/servergroup/branch_focus.png">
								</div>
							</td>
							<td width="40px">
							<div style="position:relative;" title="<s:if test="#server.alive==false || #server.state !=0">ERROR: <s:if test="#server.alive==false">offline</s:if> <s:if test="(#server.state&1) != 0">gpu</s:if> <s:if test="(#server.state&2) != 0">network</s:if></s:if>">
							<s:if test="#server.backup">
								<s:if test="#server.alive==false">
									<img alt="serverBakIdleIcon" src="images/servergroup/standby eq_abnormal.png">
									<img class="focus hidden" alt="serverBakIdleIcon" src="images/servergroup/standby eq_abnormal_focus.png">
								</s:if>
								<s:elseif test="#server.state==0">
									<img alt="serverBakIdleIcon" src="images/servergroup/standby eq_wait.png">
									<img class="focus hidden" alt="serverBakIdleIcon" src="images/servergroup/standby eq_wait_focus.png">
								</s:elseif>
								<s:else>
									<img alt="serverBakErrorIcon" src="images/servergroup/standby eq_abnormal.png">
									<img class="focus hidden" alt="serverBakErrorIcon" src="images/servergroup/standby eq_abnormal_focus.png">
								</s:else>
							</s:if>
							<s:else>
								<s:if test="#server.alive==false">
									<img alt="serverIdleIcon" src="images/servergroup/main eq_abnormal.png">
									<img class="focus hidden" alt="serverIdleIcon" src="images/servergroup/main eq_abnormal_focus.png">
								</s:if>
								<s:elseif test="#server.state==0">
									<img alt="serverIdleIcon" src="images/servergroup/main eq_wait.png">
									<img class="focus hidden" alt="serverIdleIcon" src="images/servergroup/main eq_wait_focus.png">
								</s:elseif>
								<s:else>
									<img alt="serverErrorIcon" src="images/servergroup/main eq_abnormal.png">
									<img class="focus hidden" alt="serverErrorIcon" src="images/servergroup/main eq_abnormal_focus.png">
								</s:else>
							</s:else>
							</div>
							</td>
							<td>
								<div class="serverText">
									<div class="nameText left font_11" type="server"><s:property value="name" /></div>
									<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_RENAME'})">
										<input class="nameInput" type="text" id="server" style="display: none"/>
										<span class="nameError hidden"></span>
									</sec:authorize>
									<div class="clear"></div>
								<div class="font_11"><s:property value="ip" /></div>
								</div>
							</td>
						</tr>
					</s:iterator>
				</table>
				<!--The live group cannot add more when already has two devices-->
				<s:if test="#group.type==0 || (#group.type==1 && #group.servers.size()<2)">
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_ADD'})">
					<table width="100%">
						<tr class="newServer pointer" id="${group.id}" >
							<td width="52px"></td>	
							<td width="30px"><img alt="listIcon" src="images/servergroup/branch.png"></td>
							<td width="40px"><img alt="serverBakIdleIcon" src="images/servergroup/add device.png"></td>
							<td><div class="serverText font_11"><s:text name="add.server" /></div></td>
						</tr>
					</table>
					</sec:authorize>
				</s:if>
			</div>
		</div>
	</s:iterator>
	</s:else>
	</div>
</div>
<div id="detailContainer" >
	<div id="defaultPanel">
		<img alt="default" src="images/servergroup/detailed information.png">
		<p><s:text name="server.panel.details"/></p>
	</div>
	<iframe id="detailFrame" name="detailFrame" style="display: none" scrolling="auto" width="100%" frameborder="no"></iframe>
</div>

<%@ include file="/jsp/include/footer.jsp"%>
