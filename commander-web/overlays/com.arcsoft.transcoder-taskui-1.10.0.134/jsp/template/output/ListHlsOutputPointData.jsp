<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="HlsOutputPointData">
	<s:iterator value="[0].getHlsOutputPoints()" status="status">
	<div class="HlsOutputPointItem">
		<div class="Key"><s:property value="[0].uri" /></div>
		<div class="Value"><s:property value="[0].name" /></div>
	</div>	
	</s:iterator>	
</div>
