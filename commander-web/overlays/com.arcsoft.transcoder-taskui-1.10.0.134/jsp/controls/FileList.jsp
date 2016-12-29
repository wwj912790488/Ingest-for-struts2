<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<lu>
	<s:iterator value="[0].files" status="status">
	<s:if test="[0].isFile()">
	<li><s:property value='[0].getAbsolutePath()'/></li>
	</s:if>
	</s:iterator>
</lu>