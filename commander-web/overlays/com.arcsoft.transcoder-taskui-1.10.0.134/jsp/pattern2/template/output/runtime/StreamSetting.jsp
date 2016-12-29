<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TaskTabContent TaskTabStreaming Hide">
	<span class="StreamIdGenerator Hide">-10</span>
	<div class="Hide">
	<table class="InputSettingTitleBar">
		<tr>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 100px">
				<div class="ImportPresetTrigger TaskContentText white_button" style="width: 100px"><s:text name="stream.import_scene"/></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 100px">
				<div class="NewStreamTrigger TaskContentText white_button" style="width: 100px"><s:text name="stream.new_stream"/></div>
			</td>
		</tr>
	</table>
	<div style="height: 10px"></div>
	</div>
	<table class="task_tab_content">
		<tr>
			<td class="stream_tab_left">
				<div class="StreamTab">
				</div>
			</td>
			<td style="vertical-align:top;">
				<div class="StreamFlock">
					<s:iterator value="[0].getStreamAssemblys()" status="status">
					<s:include value="/jsp/pattern2/template/output/runtime/Stream.jsp"/>
					</s:iterator>
				</div>
			</td>
		</tr>
	</table>
</div>