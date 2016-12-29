<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="dialog_delete" style="display: none">
	<div class="template_title">
		<s:text name="action.del"/>
	</div>
	<div class="template_content">
		<div style="height:154px; text-align:center; margin: 25px auto;line-height: 35px;">
			<div><s:text name="log.delete.confirm" /></div>
			<div><s:text name="log.delete.confirm1" /></div>
			<s:if test="begin!=null &&begin != ''&& end != null && end !=''">
				<div class="center">
					<s:text name="log.delete.confirm2">
						<s:param value="begin" />
						<s:param value="end" />
					</s:text>
				</div>
			</s:if>
			<div>
				<s:text name="log.delete.confirm3">
					<s:param value="pager.totalRows" />
				</s:text>
			</div>
		</div>
	</div>
	<div class="template_button">
		<input type="button" id="btnOk" value="<s:text name='msg.ok'/>" />
		<input type="button" id="btnCancel" value="<s:text name='msg.cancel'/>" />
	</div>
</div>
