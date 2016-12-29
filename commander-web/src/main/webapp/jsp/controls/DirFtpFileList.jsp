<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.io.File" %>
<%@ page import="java.util.List" %>

<ul class="jqueryFileTree" style="display: none;">

    <%
        List files = (List) request.getAttribute("files");
        String dir=(String)request.getAttribute("dir");
        for (int i = 0; i < files.size(); i++) {
            File file = (File) files.get(i);
            String path=dir+ file.getName();
            String absPath =path.replace('\\', '/').replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
            String name = file.getName().replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
            String liClz;
            liClz = "directory collapsed";
            absPath = absPath+"/";
    %>

    <li class="<%=liClz%>">
        <a href="javascript:void(0);" rel="<%=absPath%>"><%=name%>
        </a>
    </li>

    <%} %>
</ul>
		
		