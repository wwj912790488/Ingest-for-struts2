<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!-- 9 Block Box - Popup Dialog -->
<div id="DialogFrameTemplate" class="DialogFrame">
	<table>
		<tr>
			<td class="PopupMenu_TopLeft"></td>
			<td class="PopupMenu_TopCenter"></td>
			<td class="PopupMenu_TopRight"></td>
		</tr>
		<tr>
			<td class="PopupMenu_MiddleLeft"></td>
			<td class="PopupMenu_MiddleCenter">
				<table>
					<tr>
						<td  style="text-align: center">
							<span class="TaskHead2Text DF_TitleText"></span>
						</td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="LineIndent"><div></div></td>
						<td class="DF_Container">
							<div class="DF_HeadLine"></div>
						</td>
						<td class="LineIndent"><div></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td><div class="LinePlaceHolder"></div></td>
						<td style="width: 116px;">
							<table id="ButtonOK" class="MouseHover ButtonTrigger" style="width: 100px">
								<tr class="BTN_Container">
									<td class="BTN_Left"></td>
									<td class="BTN_Center">
										<span id="LabelOK" class="TaskLabelText"><s:text name="common.OK"/></span>
									</td>
									<td class="BTN_Right"></td>
								</tr>
							</table>
						</td>
						<td style="width: 116px;">
							<table id="ButtonCancel" class="MouseHover ButtonTrigger" style="width: 100px">
								<tr class="BTN_Container">
									<td class="BTN_Left"></td>
									<td class="BTN_Center">
										<span id="LabelCancel" class="TaskLabelText"><s:text name="common.cancel"/></span>
									</td>
									<td class="BTN_Right"></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
			</td>
			<td class="PopupMenu_MiddleRight"></td>
		</tr>
		<tr>
			<td class="PopupMenu_BottomLeft"></td>
			<td class="PopupMenu_BottomCenter"></td>
			<td class="PopupMenu_BottomRight"></td>
		</tr>
	</table>
</div>
<!-- 9 Block Box - Task Box -->
