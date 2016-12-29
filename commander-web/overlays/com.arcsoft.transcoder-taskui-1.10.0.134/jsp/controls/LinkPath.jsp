<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table>
	<tr>
		<td>result:</td>
		<td><div id="result"><s:property value="getResult()"/></div></td>
	</tr>
	<tr>
		<td>uri:</td>
		<td><div id="uri"><s:property value="getOutputURI()"/></div></td>
	</tr>
	<tr>
		<td>linked name:</td>
		<td><div id="linkedName"><s:property value="getLinkedName()"/></div></td>
	</tr>
	<tr>
		<td>error:</td>
		<td><div id="error"><s:property value="getError()"/></div></td>
	</tr>
</table>
