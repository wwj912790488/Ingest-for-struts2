<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	if( ((String)request.getAttribute("gotoUrl")).indexOf('?') ==-1 ){ //only for append '?v=1'
		String gotoUrl = URLEncoder.encode((String)request.getAttribute("gotoUrl"),"UTF-8")+ "?v=1";
		request.setAttribute("gotoUrl", gotoUrl);
	}
%>
<form method="get" onsubmit="javascript:if((!/^[0-9]+$/.test(this.pageIndex.value))||this.pageIndex.value<1||this.pageIndex.value>${pageCount}){alert('No. is from 1 to ${pageCount}!');return false;}location.href='${gotoUrl}' +'&pageIndex='+this.pageIndex.value;return false;">
<div class="TableItemText PageCtrlPanel">
	<s:if test='[0].hasPrev()'>
		<a class="Prev" title="Previous Page" href="javascript:void(0)" onclick="location.href='${gotoUrl}&pageIndex=${pageIndex-1}'">&lt;&lt;</a>
	</s:if>
	<div class="GotoPanel">
		<input class="TableItemText PageNum" type="text" name="pageIndex" value="${pageIndex}" /> / <span>${pageCount}</span>
	</div>
	<s:if test='[0].hasNext()'>
		<a class="Next" title="Next Page" href="javascript:void(0)" onclick="location.href='${gotoUrl}&pageIndex=${pageIndex+1}'">&gt;&gt;</a>
	</s:if>
</div>
</form>