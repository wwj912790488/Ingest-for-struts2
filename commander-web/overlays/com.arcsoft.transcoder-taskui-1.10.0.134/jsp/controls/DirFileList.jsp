<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.File" %>
<%@ page import="java.util.List" %>

<ul class="jqueryFileTree" style="display: none;">

<%
List files = (List)request.getAttribute("files");
for(int i=0; i<files.size(); i++ ) {
	File file = (File)files.get(i);
	String absPath = file.getAbsolutePath().replace('\\', '/').replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
	String name = file.getName().replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
	String liClz;
	if(file.isDirectory()){
		liClz = "directory collapsed";
		absPath += "/";
	} else if(file.isFile()) {
		int p = name.lastIndexOf('.');
		String ext = p>0 ? name.substring(p+1) : "";
		liClz = "file ext_" + ext;
	} else {
		liClz = "error";
	}
%>

<li class="<%=liClz%>" >
	<a href="javascript:void(0);" rel="<%=absPath%>" ><%=name%></a>
</li>

<%} %>
</ul>
		
		