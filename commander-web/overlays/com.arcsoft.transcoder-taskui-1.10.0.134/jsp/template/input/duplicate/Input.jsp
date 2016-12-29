<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Input" class="Input">
	<div style="height: 26px"></div>
	<div style="padding-left: 58px; padding-right: 58px">
		<table>
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.inputSource"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<select name="InputType" class="TaskContentText DefaultSelect">
						<option value="LocalFile"></option>
					</select>
				</td>
				<td>
					<span class="TaskContentText InputNote"></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="InputOption">
		</div>
		<div style="height: 28px"></div>
		<div class="LicenseInputEditing">
		<s:include value="/jsp/template/input/InputEditor.jsp" />
		</div>
		<div style="height: 12px"></div>
	</div>
</div>
