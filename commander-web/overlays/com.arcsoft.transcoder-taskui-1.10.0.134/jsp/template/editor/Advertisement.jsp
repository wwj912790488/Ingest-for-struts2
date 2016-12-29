<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TabAdvertisement" class="InputEditorPanel Advertisement">
	<div class="Unsupport">
		<span class="TaskLabelText"><s:text name="editor.media_is_not_supported"/></span>
	</div>
	<div class="Support">
		<input type="hidden" name="AdvertisementEnable" value="1"/>
		<s:include value="/jsp/template/editor/AdvertisementPadding.jsp" />
		<div class="LineSpacing"></div>
		<table style="height: 23px">
			<tr>
				<td><div class="LinePlaceHolder"></div></td>
				<td style="width: 80px">
					<div class="TaskLabelText operate_button NewAdvertisementTrigger"><s:text name="editor.new_ads"/></div>
				</td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="AdvertisementList" style="height: 180px; overflow-y: auto;">
			<s:iterator value="[0].advertisementInserter.clips"  status="status">
			<s:include value="/jsp/template/editor/AdvertisementItem.jsp" />
			</s:iterator>
		</div>
	</div>
	<div class="LineSpacing"></div>
</div>