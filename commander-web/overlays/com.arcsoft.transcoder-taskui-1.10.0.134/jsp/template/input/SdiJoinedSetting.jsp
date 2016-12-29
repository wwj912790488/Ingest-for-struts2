<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="JoinedSetting">
	<input type="hidden" name="JoinedIdGenerator" value="-10"/>
	<div style="border: 1px solid #dddddd; background-color: #f5f5f5">
		<table style="height: 33px">
			<tr>
				<td style="width: 12px"><div class="LinePlaceHolder"></div></td>
				<td class="InputColumn1">
					<span class="TaskLabelText"><s:text name="input.audio_input"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
				<td style="width: 82px">
					<div class="white_button TaskLabelText NewJoinedItemTrigger" style="width: 80px"><s:text name="audio.new"/></div>
				</td>
				<td style="width:25px"><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
	<div class="JoinedItemList">
	<s:iterator value="[0].body.additionalAudios" status="status">
	<s:include value="/jsp/template/input/SdiJoinedItem.jsp"/>
	</s:iterator>
	</div>
</div>
