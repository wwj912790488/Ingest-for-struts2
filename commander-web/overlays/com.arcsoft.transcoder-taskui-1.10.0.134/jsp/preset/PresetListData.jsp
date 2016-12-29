<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul id="PresetListData">
	
	<s:iterator value="[0].allPresetCategories" status="status">
	<s:if test='[0].presets.size() > 0'>
	<li class="Category">
		<s:if test='[0].name == null || [0].name.equal("")'>
		<div><s:text name="presetDetail.uncategory"/></div>
		</s:if>
		<s:else>
		<div><s:property value="[0].name" /></div>
		</s:else><%-- category --%>
		<ul><%-- sub list --%>
			<s:iterator value="[0].presets" status="status">
			<li class="Preset">
				<div class="PresetName"><s:property value="[0].name" /></div><%-- value --%>
				<div class="PresetId"><s:property value="[0].Id" /></div><%-- key --%>
			</li>
			</s:iterator>
		</ul>
	</li>
	</s:if>	
	</s:iterator>
	
</ul>