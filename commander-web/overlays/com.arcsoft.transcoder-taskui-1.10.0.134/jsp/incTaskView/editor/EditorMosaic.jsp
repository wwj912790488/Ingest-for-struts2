<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="MosaicItems">
	<s:iterator value="#input.mosaicInserters" var="mosaicInserter" status="status">
	<%@ include file="EditorMosaicItem.jsp" %>
	</s:iterator>
</div>	
