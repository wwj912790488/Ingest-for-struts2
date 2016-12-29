<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="SDI" class="InputSepcialOption">
	<input type="hidden" name="InputBody" value="SDI"/>
	<div class="LineSpacing"></div>
	<table class="Hide">
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.inputFormat"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputColumn2">
				<select name="InputFormat" class="TaskContentText DefaultSelect">
					<option value="<s:property value='[0].body.inputFormat'/>" selected="selected"></option>
				</select>
			</td>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.failoverTime"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputColumn2">
				<input type="text" name="FailoverTime" class="TaskContentText InputText2"
					value="<s:property value="[0].failoverTime" />"/>
				<span class="TaskContentText"><s:text name="common.millisecond"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<table>
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="common.port"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputColumn2">
				<select name="InputFormat" class="TaskContentText DefaultSelect">
					<option value="<s:property value='[0].body.inputFormat'/>" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>