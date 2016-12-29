<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="InputEditor">
	<table style="background-color: #f5f5f5;">
		<tr style="height: 40px">
			<td style="width: 12px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="MouseHover InputEditorExpandTrigger InputEditorExpandIcon ICON_ArrowRight LinePlaceHolder"></div>
			</td>
			<td style="width: 70px">
				<div class="TaskLabelText MouseHover InputEditorExpandTrigger"><s:text name="input.editing"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 28px">
				<div class="ICON_Play InputPreviewTrigger MouseHover"></div>
			</td>
			<td style="width:25px"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="InputEditorExpandTarget BoldLine"></div>
	<div class="InputEditorExpandTarget" style="height: 14px"></div>
	<table class="InputEditorExpandTarget">
		<tr>
			<td style="width: 25px"><div class="LinePlaceHolder"></div></td>
			<td>
				<table style="height: 250px">
					<tr style="height: 26px">
						<td>
							<a href="javascript:void(0)" style="text-decoration: none;">
								<table class="InputEditorTab" style="height: 20px">
									<tr>
										<td class="TabMosaic" style="width: 85px;">
											<div id="TabMosaic" class="UnderLineTab_Trigger UnderLineTab_Active"><s:text name="editor.mosaic"/></div>
										</td>
										<td class="TabTrim" style="width: 85px;">
											<div id="TabTrim" class="UnderLineTab_Trigger"><s:text name="editor.cropping"/></div>
										</td>
										<td class="TabTimeClipping" style="width: 85px;">
											<div id="TabTimeClipping" class="UnderLineTab_Trigger"><s:text name="editor.clipping"/></div>
										</td>
										<td class="TabAdvertisement" style="width: 85px;">
											<div id="TabAdvertisement" class="UnderLineTab_Trigger"><s:text name="editor.advertisement"/></div>
										</td>
										<td class="TabPaddingImage" style="width: 85px;">
											<div id="TabPaddingImage" class="UnderLineTab_Trigger"><s:text name="editor.padding_image"/></div>
										</td>
										<td class="TabAudioProcess" style="width: 85px;">
											<div id="TabAudioProcess" class="UnderLineTab_Trigger"><s:text name="editor.audio_process"/></div>
										</td>
										<td><div class="LinePlaceHolder"></div></td>
									</tr>
								</table>
							</a>
							<div class="LineSpacing"></div>
						</td>
					</tr>
					<tr>
						<td style="vertical-align: top">
							<s:include value="/jsp/template/editor/EditorMosaic.jsp"/>
							<s:include value="/jsp/template/editor/EditorTrim.jsp"/>
							<s:include value="/jsp/template/editor/EditorTimeClipping.jsp"/>
							<s:include value="/jsp/template/editor/Advertisement.jsp"/>
							<s:include value="/jsp/template/editor/EditorPaddingImage.jsp"/>
							<s:include value="/jsp/template/editor/EditorAudioProcess.jsp"/>
						</td>
					</tr>
				</table>
			</td>
			<td style="width: 25px"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
</div>
