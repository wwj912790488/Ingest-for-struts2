<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="OutputPreviewTemplate" style="display: block">
	<table id="PreviewDlgBody">
		<tr>
			<td style="width: 480px;">
				<div class="TMPlayerContainer" style="width: 100%; height:100%"></div>
				<div class="LineSpacing"></div>
				<table class="LicenseFrameControl">
					<tr>
						<td style="width: 80px">
							<input type="text" name="SeekTime" style="width: 80px"
								value="0:0:0:0"/>
						</td>
						<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
						<td style="width: 80px">
							<div class="TaskLabelText operate_button SeekTimeTrigger"><s:text name="editor.seek"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
			<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px; height: 360px; vertical-align: top">
				<div style="display: block">
					<a href="javascript:void(0)" style="text-decoration: none;">
						<table class="PreprocessTab" style="height: 26px">
							<tr>
								<td id="TabLogo" class="MouseHover UnderLineTab_Trigger UnderLineTab_Active" style="width: 80px;">
									<span class="TaskLabelText"><s:text name="editor.logo"/></span>
								</td>
								<td id="TabSubtitle" class="MouseHover UnderLineTab_Trigger" style="width: 80px;">
									<span class="TaskLabelText"><s:text name="editor.subtitle"/></span>
								</td>
								<td id="TabMotionIcon" class="MouseHover UnderLineTab_Trigger" style="width: 80px;">
									<span class="TaskLabelText"><s:text name="editor.motion_icon"/></span>
								</td>
								<td id="TabDynamicText" class="MouseHover UnderLineTab_Trigger" style="width: 80px;">
									<span class="TaskLabelText"><s:text name="editor.dynamic_text"/></span>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
							</tr>
						</table>
					</a>
					<div style="height: 1px; background-color: #b0b0b0;"></div>
					<div class="LineSpacing"></div>
					<div class="LineSpacing"></div>
					<!-- logo -->
					<div id="TabLogo" class="ProcessPage EditorLogoInserter">
						<table>
							<tr>
								<td class="Hide">
									<input type="checkbox" name="LogoEnable" class="DefaultCheckbox"/>
									<span class="TaskLabelText"><s:text name="editor.logo.active_info"/></span>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button NewLogoTrigger"><s:text name="common.new"/></div>
								</td>
								<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button PreviewLogoTrigger"><s:text name="editor.preivew"/></div>
								</td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="LogoItemContainer" style="height: 250px; overflow-y: auto;">
						</div>
						<div class="LineSpacing"></div>
					</div>
					<!-- subtitle -->
					<div id="TabSubtitle" class="ProcessPage EditorSubtitle">
						<table>
							<tr>
								<td><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button NewSubtitleTrigger"><s:text name="common.new"/></div>
								</td>
								<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button PreviewSubtitleTrigger"><s:text name="editor.preivew"/></div>
								</td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="SubtitleItemContainer" style="height: 250px; overflow-y: auto;">
						</div>
						<div class="LineSpacing"></div>
					</div>
					<!-- MotionIcon -->
					<div id="TabMotionIcon" class="ProcessPage MotionIcon">
						<table>
							<tr>
								<td><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button NewMotionIconTrigger"><s:text name="common.new"/></div>
								</td>
								<td class="PreButtonSpacing "><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px" class="">
									<div class="TaskLabelText operate_button PreviewMotionIconTrigger"><s:text name="editor.preivew"/></div>
								</td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="MotionIconItemContainer" style="height: 250px; overflow-y: auto;">
						</div>
						<div class="LineSpacing"></div>
					</div>
					<!-- DynamicText -->
					<div id="TabDynamicText" class="ProcessPage DynamicText">
						<table>
							<tr>
								<td><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button NewDynamicTextTrigger"><s:text name="common.new"/></div>
								</td>
								<td class="PreButtonSpacing "><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px" class="">
									<div class="TaskLabelText operate_button PreviewDynamicTextTrigger"><s:text name="editor.preivew"/></div>
								</td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="DynamicTextItemContainer" style="height: 250px; overflow-y: auto;">
						</div>
						<div class="LineSpacing"></div>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<div style="display: none">
		<%--hidden element --%>
		<s:include value="/jsp/template/output/PreviewLogo.jsp"/>
		<s:include value="/jsp/template/output/PreviewSubtitle.jsp"/>
		<s:include value="/jsp/template/output/PreviewDynamicText.jsp"/>
		<s:include value="/jsp/template/output/PreviewMotionIcon.jsp"/>
	</div>
</div>
