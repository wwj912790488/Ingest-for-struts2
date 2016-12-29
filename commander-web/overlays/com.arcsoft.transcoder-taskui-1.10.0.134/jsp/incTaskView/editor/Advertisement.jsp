<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Advertisement">
	<%@ include file="AdvertisementPadding.jsp" %>
	<div class="AdClips">
		<s:iterator value="[0].advertisementInserter.clips"  var="clip" status="status">		
			<%@ include file="AdvertisementItem.jsp" %>		
		</s:iterator>
	</div>
</div>