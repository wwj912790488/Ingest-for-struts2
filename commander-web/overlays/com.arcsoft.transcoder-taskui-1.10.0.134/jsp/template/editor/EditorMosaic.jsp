<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TabMosaic" class="InputEditorPanel EditorMosaic">
	<table>
		<tr>
			<td class="Hide">
				<input type="checkbox" name="MosaicEnable" class="DefaultCheckbox"
					checked="checked" />
				<span class="TaskLabelText">勾选开启马赛克功能</span>
			</td>
			<td><div class="LinePlaceHolder">&nbsp;</div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button NewMosaicTrigger"><s:text name="editor.new_mosaic"/></div>
			</td>
		</tr>
	</table>
	<div class="MosaicItemContainer">
	<s:iterator value="[0].mosaicInserters"  status="status">
	<s:include value="/jsp/template/editor/EditorMosaicItem.jsp" />
	</s:iterator>
	</div>
</div>