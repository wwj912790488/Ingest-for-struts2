<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="CandidateOutputContainer">
	<div style="border: 1px solid #dddddd; background-color: #f5f5f5">
		<table style="height: 33px">
			<tr>
				<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn1">
					<span class="TaskHead2Text"><s:text name="input.alternate_location"/></span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td><div class="LinePlaceHolder"></div></td>
				<td style="width: 80px">
					<div class="TaskLabelText operate_button NewCandidateOutput"><s:text name="input.new_alternate_location"/></div>
				</td>
				<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
	<div class="CandidateOutputList">
	<s:iterator value="[0].outputGroupSetting.candidateOutputs" status="status" var="theLocation">
	<s:include value="/jsp/template/output/CandidateOutput.jsp"/>
	</s:iterator>
	</div>
</div>
