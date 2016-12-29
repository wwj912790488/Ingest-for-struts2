<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PaletteTmpl" class="Palette">
	<div>
		<label for="color"><s:text name="editor.subtitle.color"/>:</label><input type="text" id="PaletteColor" name="PaletteColor" value="#123456" />
	</div>
	<div>
		<span><s:text name="editor.subtitle.color_info"/></span>
	</div>
	<div style="height:10px"></div>
	<div id="PalettePicker"></div>
</div>