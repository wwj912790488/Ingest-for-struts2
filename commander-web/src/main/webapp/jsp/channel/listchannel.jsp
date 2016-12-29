<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<%
jspContext.addJSRef("js/jquery.extend.js");
jspContext.addJSRef("js/common/MediaInfoParser.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/channel/listchannel.js");
%>

<script type="text/javascript">
<!--
var CONFIRM_DELETE_MESSAGE = '<s:text name="channel.delete.confirm"/>';

$(function() {
	channel_init();
});
//-->
</script>

<div id="channel_content">
	<div class="list_view_header">
		<div class="cm_operatebar">
			<div class="left">
				<form id="queryForm" action="listChannel.action">
				<span><s:text name="channel.id"/></span>
				<s:textfield name="channel.id" cssStyle="width: 50px"/>
				<span><s:text name="channel.name"/></span>
				<s:textfield name="channel.name" cssStyle="width: 100px"/>
				<span><s:text name="channel.uri"/></span>
				<s:textfield name="channel.uri" cssStyle="width: 120px"/>
				<span><s:text name="channel.program_id"/></span>
				<s:textfield name="channel.programId" cssStyle="width: 50px"/>
				<span><s:text name="channel.video_id"/></span>
				<s:textfield name="channel.videoId" cssStyle="width: 50px"/>
				<span><s:text name="channel.audio_id"/></span>
				<s:textfield name="channel.audioId" cssStyle="width: 50px"/>
				</form>
			</div>
			<div class="right">
				<div class="action_normal_btns">
					<a id="btnQuery">
						<span class="btn_left"></span>
						<span class="btn_middle"><p><s:text name="common.action.query"/></p></span>
						<span class="btn_right"></span>
					</a>
				</div>
				<div class="action_btns">
					<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_CHANNEL_ADD'})">
					<a id="addChannel">
						<span class="btn_left"></span>
						<span class="btn_middle">
							<span class="left">
								<s:text name="common.action.add" />
							</span>
							<span class="right"></span>
						</span>
						<span class="btn_right"></span>
					</a>
					</sec:authorize>
				</div>
			</div>
		</div>

		<div class="cm_actionbar">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_CHANNEL_EDIT'})">
			<div id="btnEdit" class="item img_edit"><s:text name="common.action.edit"/></div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_CHANNEL_DELETE'})">
			<div id="btnDelete" class="item img_del"><s:text name="common.action.delete"/></div>
			</sec:authorize>
			<span id="statusText" style="padding-left: 20px"><s:text name="common.select.text"/></span>
		</div>
		<table class="tab_list">
			<thead>
				<tr class="tab_header">
					<th style="width:30px; text-align: right"><input type="checkbox"/></th>
					<th style="width:50px"><s:text name="channel.id"/></th>
					<th style="width:100px"><s:text name="channel.name"/></th>
					<th style="width:200px"><s:text name="channel.uri"/></th>
					<th style="width:70px"><s:text name="channel.program_id"/></th>
					<th style="width:120px"><s:text name="channel.video_id"/> | <s:text name="channel.audio_id"/></th>
					<th style="width:310px"><s:text name="channel.media.info"/></th>
					<th style="width:100px"><s:text name="server.group.name"/></th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
	<div class="list_view_content">
		<table class="tab_list multi_selection">
			<tbody>
				<s:iterator value="pager.result" var="rs">
					<tr class="tab_content" style="line-height: 23px">
						<td style="width:30px; text-align: right"><input type="checkbox" name="id" value="${rs.id}"/></td>
						<td style="width:50px">${rs.id}</td>
						<td style="width:100px"><div class="app_text_ellipsis" style="width: 100px">${rs.name}</div></td>
						<td style="width:200px">${rs.uri}</td>
						<td style="width:80px">
							<s:if test="#rs.programId == null"> N/A </s:if>
							<s:elseif test="#rs.programId == 0"> - </s:elseif>
							<s:else>${rs.programId}</s:else></td>
						<td style="width:100px">
							<s:if test="#rs.videoId == null"> N/A </s:if>
							<s:elseif test="#rs.videoId == 0"> - </s:elseif>
							<s:else>${rs.videoId}</s:else>|
							<s:if test="#rs.audioId == null"> N/A </s:if>
							<s:elseif test="#rs.audioId == 0"> - </s:elseif>
							<s:elseif test="#rs.audioAll.length()>1"> ALL(${rs.audioAll}) </s:elseif>
							<s:else>${rs.audioId}</s:else></td>
						<td style="width:320px">
							<s:if test="#rs.videoInfo == null && #rs.audioInfo == null">N/A</s:if>
							<s:else>${rs.videoInfo}<br>${rs.audioInfo}</s:else></td>
						<td style="width:100px">${rs.group.name}</td>
						<td></td>
					</tr>
				</s:iterator>
			</tbody>
		</table>
		<s:include value="/jsp/include/pager.jsp" />
	</div>
</div>

<%@ include file="/jsp/include/footer.jsp"%>
