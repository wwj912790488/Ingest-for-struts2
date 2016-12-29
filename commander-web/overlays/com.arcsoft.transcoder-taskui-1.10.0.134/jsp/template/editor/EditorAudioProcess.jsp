<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="TabAudioProcess" class="InputEditorPanel EditorAudioProcess">
	<div class="LineSpacing"></div>
	<div class="Unsupport">
		<span class="TaskLabelText"><s:text name="editor.media_is_not_supported"/></span>
	</div>
	<div class="Support">
		<table>
			<tr>
				<td class="LabelAlign" style="width: 80px">
					<span class="TaskLabelText"><s:text name="editor.audio_delay"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td style="width: 280px">
					<input type="text" name="AudioDelay" class="TaskContentText DefaultText"
						value="<s:property value='[0].audioDelay' />">
					<span class="TaskContentText"><s:text name="common.millisecond"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
	</div>
	<div class="LineSpacing"></div>
</div>