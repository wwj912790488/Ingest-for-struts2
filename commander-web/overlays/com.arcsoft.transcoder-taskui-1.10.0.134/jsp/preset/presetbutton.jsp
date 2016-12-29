<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table>
	<tr>
		<td><div class="LinePlaceHolder"></div></td>
		<td style="width: 160px">
			<table class="MouseHover BackTrigger">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText"><s:text name="common.cancel"/></span>
					</td>
					<td class="BTN_Right"></td>
				</tr>
			</table>
		</td>
		<td style="width: 20px"></td>
		<td style="width: 160px">
			<table class="MouseHover SubmitTrigger">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText"><s:text name="common.save"/></span>
					</td>
					<td class="BTN_Right"></td>
				</tr>
			</table>
		</td>
		<td><div class="LinePlaceHolder"></div></td>
	</tr>
</table>