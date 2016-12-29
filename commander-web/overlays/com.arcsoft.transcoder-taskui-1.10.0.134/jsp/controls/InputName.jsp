<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="InputNameTemplate" class="InputNameTemplate">
	<table>
		<tr>
			<td>
				<div class="Name">
					<div class="TaskHead2Text"><s:text name="common.name"/></div>
					<input type="text" id="inputName" name="Name" class="TaskContentText" style="width: 300px;" value=""/>
					<div class="LineSpacing"></div>
				</div>
				<div class="Category">
					<div class="LineSpacing"></div>
					<div class="TaskHead2Text"><s:text name="presetDetail.category"/></div>
					<input type="text" name="Category" class="TaskContentText" style="width: 300px;" value=""/>
					<div class="LineSpacing"></div>
				</div>
				<div class="Description">
					<div class="LineSpacing"></div>
					<div class="TaskHead2Text"><s:text name="common.description"/></div>
					<textarea name="Description" class="TaskContentText" style="width: 300px; height: 60px; resize: none; overflow-y: auto"></textarea>
				</div>
			</td>
		</tr>
	</table>
</div>