<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<s:iterator value="servers" var="server">
<script language="javascript">window.parent.addServer('${server.id}', '${server.name}', ${server.type}, '${server.ip}', ${server.port}, ${server.added});</script>
<%out.flush();%>
</s:iterator>

<%@ include file="/jsp/include/footer.jsp"%>
