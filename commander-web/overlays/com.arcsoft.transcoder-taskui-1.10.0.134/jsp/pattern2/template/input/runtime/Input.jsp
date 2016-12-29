<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="Input" class="Input">
	<div style="height: 26px"></div>
	<div style="padding-left: 58px; padding-right: 58px">
		<div class="Hide">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.inputSource"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn2">
					<select name="InputType" class="TaskContentText DefaultSelect">
						<option value="<s:property value = '[0].getVideoInputType()'/>" ></option>
					</select>
				</td>
				<td>
					<span class="TaskContentText InputNote"></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		</div>
		<div class="InputOption">
			<s:if test='[0].getVideoInputType().equalsIgnoreCase("Network")'>
				<s:include value="/jsp/template/input/InputNetwork.jsp" />
			</s:if>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("LocalFile")'>
				<s:include value="/jsp/template/input/InputLocalFile.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("BD")'>
				<s:include value="/jsp/template/input/InputBD.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("DVD")'>
				<s:include value="/jsp/template/input/InputDVD.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("SDI")'>
				<s:include value="/jsp/template/input/InputSDI.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("CVBS")'>
				<s:include value="/jsp/template/input/InputCvbs.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("HDMI")'>
				<s:include value="/jsp/template/input/InputHdmi.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("AESEBU")'>
				<s:include value="/jsp/template/input/InputAesEbu.jsp" />
			</s:elseif>
			<s:elseif test='[0].getVideoInputType().equalsIgnoreCase("ASI")'>
				<s:include value="/jsp/template/input/InputASI.jsp" />
			</s:elseif>
		</div>
		<div class="LineSpacing"></div>
		<div class="Hide">
		<s:include value="/jsp/template/input/InputEditor.jsp" />
		</div>
		<div style="height: 12px"></div>
		</div>
	</div>
</div>
