<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="OSS" class="InputSepcialOption">
	<input type="hidden" name="InputBody" value="OSS"/>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.key"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="InputKey" class="TaskContentText InputURIInput"
					value=""/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="ProgramEditor">
		<div class="ProgramItemList">
		<s:include value="/jsp/template/input/ProgramItem.jsp"/>
		</div>
	</div>
	<div class="LineSpacing"></div>
</div>