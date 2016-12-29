<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%-- used in list preset action --%>
<s:push value="[0].preset.streamAssembly">
<s:include value="/jsp/pattern2/template/output/Stream.jsp"/>
</s:push>