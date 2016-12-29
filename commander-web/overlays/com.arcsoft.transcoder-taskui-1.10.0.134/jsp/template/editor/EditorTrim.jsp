<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TabTrim" class="InputEditorPanel EditorTrim">
	<div>
		<input type="checkbox" name="TrimEnable" class="DefaultCheckbox"
			<s:if test='[0].cropping.enabled'>checked="checked"</s:if> />
		<span class="TaskLabelText"><s:text name="editor.open_cropping"/></span>
	</div>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table class="ValueChanger"><tr>
		<td class="CroppingColumn1 LabelAlign">
			<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn2">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="DecreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">-</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn3">
			<input type="text" name="TrimX" class="TaskContentText InputText2 VerifyTrim"
				value="<s:property value='[0].cropping.x' />"/>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn4">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="IncreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">+</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td><div class="LinePlaceHolder"></div></td>
	</tr></table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table class="ValueChanger"><tr>
		<td class="CroppingColumn1 LabelAlign">
			<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn2">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="DecreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">-</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn3">
			<input type="text" name="TrimY" class="TaskContentText InputText2 VerifyTrim"
				value="<s:property value='[0].cropping.y' />"/>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn4">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="IncreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">+</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td><div class="LinePlaceHolder"></div></td>
	</tr></table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table class="ValueChanger"><tr>
		<td class="CroppingColumn1 LabelAlign">
			<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn2">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="DecreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">-</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn3">
			<input type="text" name="TrimWidth" class="TaskContentText InputText2 VerifyTrim"
				value="<s:property value='[0].cropping.width' />"/>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn4">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="IncreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">+</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td><div class="LinePlaceHolder"></div></td>
	</tr></table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table class="ValueChanger"><tr>
		<td class="CroppingColumn1 LabelAlign">
			<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn2">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="DecreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">-</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td  class="MosaicColumn3">
			<input type="text" name="TrimHeight" class="TaskContentText InputText2 VerifyTrim"
				value="<s:property value='[0].cropping.height' />"/>
		</td>
		<%--<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
		<td class="MosaicColumn4">
			<a href="javascript:void(0)" class="A_ClickWrapper">
			<table class="IncreaseTrigger MouseHover">
				<tr class="BTN_Container">
					<td class="BTN_Left"></td>
					<td class="BTN_Center">
						<span class="TaskLabelText">+</span>
					</td>
					<td class="BTN_Right"></td>
			</tr></table></a>
		</td> --%>
		<td><div class="LinePlaceHolder"></div></td>
	</tr></table>
	<div class="LineSpacing"></div>
</div>