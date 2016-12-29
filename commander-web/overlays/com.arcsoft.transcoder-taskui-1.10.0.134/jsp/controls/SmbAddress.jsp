<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table>
	<tr>
		<td>Result:</td>
		<td><div id="result"><s:property value="getResult()"/></div></td>
	</tr>
	<tr>
		<td>URI:</td>
		<td><div id="uri"><s:property value="getOutputURI()"/></div></td>
	</tr>
	<tr>
		<td>Error:</td>
		<td><div id="error"><s:property value="getError()"/></div></td>
	</tr>
</table>
