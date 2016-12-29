<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="P2" class="InputSepcialOption">
	<input type="hidden" name="InputBody" value="P2"/>
	<div class="InputRuntimeNotSupport">
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.fileLocation"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="InputURI" class="TaskContentText InputURIInput"
					value=""/>
			</td>
			<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputOpenFileButton">
				<div class="operate_button TaskLabelText OpenFileTrigger" style="width: 80px"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<s:include value="/jsp/template/input/duplicate/ProgramEditor.jsp"/>
	</div>
</div>