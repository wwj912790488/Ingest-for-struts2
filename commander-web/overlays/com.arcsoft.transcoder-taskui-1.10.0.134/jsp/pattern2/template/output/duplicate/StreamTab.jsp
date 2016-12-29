<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Hide">
	<%--used for normal stream tab --%>
	<table id="StreamTabItemTmpl" class="StreamTabItem stream_tab_item">
		<tr>
			<td class="stream_tab_item_1"><div class="LinePlaceHolder"></div></td>
			<td class="stream_tab_item_2">
				<table>
					<tr>
						<td>
							<span class="TaskLabelText StreamTabItemLabel">abcd</span>
						</td>
						<td class="stream_tab_item_delete">
							<div id="DeleteTrigger" class="ICON_Delete2 TabTrigger"></div>
						</td>
						<td class="stream_tab_item_play">
							<div id="PlayTrigger" class="ICON_Play TabTrigger"></div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	
	<%--used for runtime stream tab --%>
	<table id="StreamTabItemTmpl2" class="StreamTabItem stream_tab_item">
		<tr>
			<td class="stream_tab_item_1"><div class="LinePlaceHolder"></div></td>
			<td class="stream_tab_item_2">
				<table>
					<tr>
						<td>
							<span class="TaskLabelText StreamTabItemLabel">abcd</span>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	
	<%--used for normal outputgroup tab --%>
	<table id="StreamTabItemTmpl3" class="StreamTabItem stream_tab_item">
		<tr>
			<td class="stream_tab_item_1"><div class="LinePlaceHolder"></div></td>
			<td class="stream_tab_item_2">
				<table>
					<tr>
						<td>
							<span class="TaskLabelText StreamTabItemLabel">abcd</span>
						</td>
						<td class="stream_tab_item_delete">
							<div id="DeleteTrigger" class="ICON_Delete2 TabTrigger"></div>
						</td>
						<td class="stream_tab_item_toggle">
							<div id="ToggleTrigger" class="ICON_toggle_on ToggleTrigger"></div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	
	<%--used for runtime outputgroup tab --%>
	<table id="StreamTabItemTmpl4" class="StreamTabItem stream_tab_item">
		<tr>
			<td class="stream_tab_item_1"><div class="LinePlaceHolder"></div></td>
			<td class="stream_tab_item_2">
				<table>
					<tr>
						<td>
							<span class="TaskLabelText StreamTabItemLabel">abcd</span>
						</td>
						<td class="stream_tab_item_toggle">
							<div id="ToggleTrigger" class="ICON_toggle_on ToggleTrigger"></div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>