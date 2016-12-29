<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<style>
.DynamicTextEditor {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 400px;
	height: 242px;	/*do not change*/
	background: #f0f0f0;
	border: 1px solid #ccc;
	border-radius: 4px 4px 4px 4px;
	box-shadow: 3px 3px 3px rgba(111,111,111,0.2);
	overflow: hidden;
	z-index:10100;'
}

.EditorTitle {
	height: 20px;
	overflow: hidden;
	padding:6px 10px;
	font-size: 18px;
}

.EditorContainer{
	height: 160px;
	overflow: hidden;
	background: #fff;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	padding: 8px;
}

.EditorBottom {
}

.editor_area {
	width: 380px;
	height: 150px;
	resize: none;
}

</style>

<div id="DynamicTextEditorTmpl" class="DynamicTextEditor">
	<div class="EditorTitle"></div>
	<div class="EditorContainer">
		<textarea class="DynamicTextArea editor_area"></textarea>
	</div>
	<div class="EditorBottom">
		<table>
			<tr>
				<td style="width: 10px"><div class="LinePlaceHolder"></div></td>
				<td style="width: 25px">
					<div id="DynamicTextMacroTrigger" class="icon_macro MouseHover EditorButton"></div>
				</td>
				<td style="width: 10px"><div class="LinePlaceHolder"></div></td>
				<td style="width: 25px">
					<div id="DynamicTextMaterialTrigger" class="icon_material MouseHover EditorButton"></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
				<td style="width: 80px">
					<div id="OKTrigger" class="TaskLabelText operate_button EditorButton"><s:text name="common.OK"/></div>
				</td>
				<td style="width: 10px"><div class="LinePlaceHolder"></div></td>
				<td style="width: 80px">
					<div id="CancelTrigger" class="TaskLabelText operate_button EditorButton"><s:text name="common.cancel"/></div>
				</td>
				<td style="width: 10px"><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
</div>

