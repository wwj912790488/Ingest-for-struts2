<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ContentPackagingListItem">
	<table class="ContentPackagingRow">
		<tr>
			<td class="cpl_col3">
				<input type="checkbox" class="cplItemCheckBox DefaultCheckbox">
				<span class="cplItemType TaskContentText"><s:text name="label.inputType"/></span>
			</td>
			<td class="cpl_col4">
				<span class="cplItemName TaskContentText"><s:text name="common.name"/></span>
			</td>
			<td class="cpl_col5 DynamicTextEditorTrigger MouseHover">
				<%--<table>
					<tr>
						<td style="width: 140px">
							<input type="text" name="DynamicTextLabel" class="DynamicTextLabel cpl_dynamictext"
								value=""/>
						</td>
						<td>
							<div class="PopupMenu cpl_dynamictext"><div class="PopupMenuToggle">+</div>
							<div class="PopupMenuItems">
								<div class="DynamicTextMacroTrigger PopupMenuItem"><s:text name="common.insert_macro"/></div>
								<div class="DynamicTextMaterialTrigger PopupMenuItem"><s:text name="common.insert_material"/></div>
							</div>
						</div>
						</td>
					</tr>
				</table> --%>
				<input type="hidden" name="DynamicTextLabel" class="DynamicTextLabel" value=""/>
				<div class="DynamicTextLabelDisp TaskContentText"></div>
			</td>
			<td class="cpl_col6">
				<div id="MoveUpTrigger" class="MoveTrigger ICON_move_up MouseHover"></div>
				<div id="MoveDownTrigger" class="MoveTrigger ICON_move_down MouseHover"></div>
			</td>
		</tr>
	</table>
</div>

