<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<table id="MultiLineTabTemplate" class="MultiLineTab">
	<tr>
		<td class="MLT_Main">
			<div class="MLT_Container"></div>
		</td>
		<td class="MLT_Prev">
			<table>
				<tr>
					<td class="MLT_ItemNormalLeft"></td>
					<td class="MLT_ItemNormalCenter">
						<div class="MLT_IconPrev"></div>
					</td>
					<td class="MLT_ItemNormalRight"></td>
				</tr>
			</table>
		</td>
		<td class="MLT_Next">
			<table>
				<tr>
					<td class="MLT_ItemNormalLeft"></td>
					<td class="MLT_ItemNormalCenter">
						<div class="MLT_IconNext"></div>
					</td>
					<td class="MLT_ItemNormalRight"></td>
				</tr>
			</table>
		</td>
		<td class="MLT_Tail"><div></div></td>
	</tr>
	<tr>
		<td class="MLT_BottomLine"></td>
		<td class="MLT_BottomLine"></td>
		<td class="MLT_BottomLine"></td>
		<td class="MLT_BottomLine"></td>
	</tr>
</table>

<table id="MLT_LineTemplate" class="MLT_Line">
	<tr>
		<td class="MLT_LineHead"><div></div></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_Item"></td>
		<td class="MLT_LineEnd"><div class="MLT_PlaceHolder"></div></td>
	</tr>
</table>

<table id="MLT_ItemNormalTemplate" class="MLT_ItemNormal">
	<tr>
		<td class="MLT_ItemSpacing"></td>
		<td class="MLT_ItemNormalLeft"></td>
		<td class="MLT_ItemNormalCenter">
			<table>
				<tr>
					<td class="MLT_ItemHead"><div></div></td>
					<td class="MLT_ItemIcon"><div></div></td>
					<td class="MLT_ItemContent">
						<span class="MLT_ItemText"></span>
					</td>
					<td class="MLT_Remove"><div></div></td>
				</tr>
			</table>
		</td>
		<td class="MLT_ItemNormalRight"></td>
		<td class="MLT_ItemSpacing"></td>
	</tr>
</table>

<table id="MLT_ItemActiveTemplate" class="MLT_ItemActive">
	<tr>
		<td class="MLT_ItemSpacing"></td>
		<td class="MLT_ItemActiveLeft"></td>
		<td class="MLT_ItemActiveCenter">
			<table>
				<tr>
					<td class="MLT_ItemHead"><div></div></td>
					<td class="MLT_ItemIcon"><div></div></td>
					<td class="MLT_ItemContent">
						<span class="MLT_ItemText"></span>
					</td>
					<td class="MLT_Remove MLT_IconDelete"><div></div></td>
				</tr>
			</table>
		</td>
		<td class="MLT_ItemActiveRight"></td>
		<td class="MLT_ItemSpacing"></td>
	</tr>
</table>
