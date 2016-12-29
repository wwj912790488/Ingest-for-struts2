<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="CandidateSdiContainer">
	<div style="border: 1px solid #dddddd; background-color: #f5f5f5">
		<table style="height: 33px">
			<tr>
				<td style="width: 12px"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn1">
					<span class="TaskLabelText"><s:text name="input.candidate_sid"/></span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td><div class="LinePlaceHolder"></div></td>
				<td style="width: 100px">
					<div class="white_button TaskLabelText NewCandidateSdi" style="width: 100px"><s:text name="input.new_alternate_location"/></div>
				</td>
				<td style="width:25px"><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
	<div class="CandidateSdiList">
	<s:iterator value="[0].body.candidateLocations" status="status" var="theLocation">
	<s:include value="/jsp/template/input/CandidateSdiItem.jsp"/>
	</s:iterator>
	</div>
</div>
