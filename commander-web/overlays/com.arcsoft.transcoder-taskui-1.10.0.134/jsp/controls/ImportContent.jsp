<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ImportContentTmpl" class="ImportContentTmpl">
	<div style="height: 20px"></div>
	<form name="ImportContentForm" method="post" enctype="multipart/form-data" action="importTasks">
		<input type="file" name="importedFile"/>
	</form>
	<div style="height: 20px"></div>
</div>
