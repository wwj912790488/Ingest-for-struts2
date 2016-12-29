<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div style="color: red; text-align: center; padding: 10px;">
	<s:if test="actionErrors.size() > 0">
		<s:iterator value="actionErrors" var="error">
			<s:property value="error" />
		</s:iterator>
	</s:if>
	<s:else>
		<s:if test="fieldErrors.size() > 0">
			<s:iterator value="fieldErrors" var="error">
				<s:property value="error" />
			</s:iterator>
		</s:if>
		<s:else>
			<s:text name="common.error.unknown" />
		</s:else>
	</s:else>
</div>
