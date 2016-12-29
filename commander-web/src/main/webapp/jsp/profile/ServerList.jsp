<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul id="ServerListData" style="display:none">
	<s:iterator value="serverGroups" var="val">
		<s:iterator value="#val.servers">
			<s:if test="backup == 0">
				<li>
					<div><s:property value="name"/></div>
					<div><s:property value="id"/></div>
				</li>
			</s:if>
		</s:iterator>
	
	</s:iterator>
																									
</ul>