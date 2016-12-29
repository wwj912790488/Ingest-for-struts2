<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table>
	<tr>
		<td class="TaskColumn1 LabelAlign">
			<span class="TaskLabelText"><s:text name="task.device.group"/>:</span>
		</td>
		<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="TaskColumn2">
			<select id="serverOrGroupId">
			<option value=""><s:text name="common.select.text"></s:text></option>
					<s:iterator value="serverGroups" var="groups" status="stat">
						<s:if test="#groups.type == 1"><%-- live group --%>
							<c:if test="stat.count == 1">
								<optgroup label="1+1" id="live-1" data="">
							</c:if>
								<option value='<s:property value="id"/>|L' <s:if test="task.groupId == id">selected="selected"</s:if> ><s:property value="name"/></option>
							<c:if test="stat.count == 1">
								</optgroup>
							</c:if>
						</s:if>
					</s:iterator>
			<s:iterator value="serverGroups" var="group" status="stat">
				<s:if test="#group.type == 0"> <%-- M+N can be group or server --%>
						<c:if test="stat.count == 1">
							<optgroup label="<s:property value="name"/> (M+N)" id="live-M" data="<s:property value="id"/>|G" event="none"
								<s:if test="task.groupId == id && (task.curServerId == null || task.curServerId =='')">selected="selected"</s:if>>
						</c:if>										
							<s:iterator value="#group.servers">
								<s:if test="backup == 0">
									<option value='<s:property value="id"/>|S' <s:if test="task.curServerId == id">selected="selected"</s:if> ><s:property value="name"/></option>
								</s:if>
							</s:iterator>
						<c:if test="stat.count == 1">
							</optgroup>
						</c:if>
					</optgroup>
				</s:if>
			</s:iterator>
			</select>
			<input type="hidden" name="type" id="type" value="<s:property value="task.type"/>">
			<input type="hidden" name="groupId" id="groupId" value="<s:property value="task.groupId"/>">
			<input type="hidden" name="curServerId" id="curServerId" value="<s:property value="task.curServerId"/>">
		</td>
		<td><div class="LinePlaceHolder"></div></td>
	</tr>
</table>
<div class="LineSpacing"></div>
<div class="LineSpacing"></div>
