<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<style type="text/css">
.MaterialAddCol1 {
	width: 100px;
}

.MaterialAddCol2 {
	width: 200px;
}

.MaterialCol1 {
	width: 100px;
}

.MaterialCol2 {
	width: 100px;
}

.MaterialCol3 {
	width: 100px;
}

.MaterialCol4 {
	width: 400px;
}

.MaterialCol5 {
	width: 100px;
}
</style>

<div class="MaterialList">
	<div>
		<form method="post" action="addMaterial">
			<table>
				<tr>
					<td class="MaterialAddCol1">name</td>
					<td class="MaterialAddCol2"><input type="text" name="material.name"/></td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="MaterialAddCol1">type</td>
					<td class="MaterialAddCol2"><input type="text" name="material.materialType"/></td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="MaterialAddCol1">content</td>
					<td class="MaterialAddCol2"><input type="text" name="material.content"/></td>
					<td><input type="submit"/></td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</form>
	</div>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="MaterialCol1">ID</td>
			<td class="MaterialCol2">Name</td>
			<td class="MaterialCol3">Type</td>
			<td class="MaterialCol4">Content</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="MaterialCol5">&nbsp;</td>
		</tr>
	</table>
	<s:iterator value="[0].materials" status="status">
	<form method="post" action="deleteMaterial">
		<table>
			<tr>
				<td class="MaterialCol1">
					<s:property value="[0].id"/>
					<input type="hidden" name="id" value="<s:property value="[0].id"/>"/>
				</td>
				<td class="MaterialCol2"><s:property value="[0].name" /></td>
				<td class="MaterialCol3"><s:property value="[0].materialType" /></td>
				<td class="MaterialCol4"><s:property value="[0].content" /></td>
				<td><div class="LinePlaceHolder"></div></td>
				<td class="MaterialCol5"><input type="submit" value="-"/></td>
			</tr>
		</table>
	</form>
	</s:iterator>	
</div>