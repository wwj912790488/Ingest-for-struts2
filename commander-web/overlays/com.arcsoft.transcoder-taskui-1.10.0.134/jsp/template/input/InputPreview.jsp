<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="InputPreviewTemplate" style="display: block">
	<table id="PreviewDlgBody">
		<tr>
			<td style="width: 480px;">
				<div class="TMPlayerContainer" style="width: 100%; height:100%"></div>
				<div class="LineSpacing"></div>
				<table class="LicenseFrameControl">
					<tr>
						<td style="width: 80px">
							<div class="TaskLabelText operate_button PreFrameTrigger"><s:text name="editor.frame_backward"/></div>
						</td>
						<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
						<td style="width: 80px">
							<input type="text" name="FrameSkipNumber" class="InputText1" onchange="javascript:uCheckInputInt(this);"
								value="1"/>
							<span class="TaskLabelText"><s:text name="video.frames"/></span>
						</td>
						<td style="width: 80px">
							<div class="TaskLabelText operate_button NextFrameTrigger"><s:text name="editor.frame_forward"/></div>
						</td>
						<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
						<td>
							<span class="Hour TaskLabelText">0
							</span><span class="TaskLabelText">:</span><span class="Minute TaskLabelText">0
							</span><span class="TaskLabelText">:</span><span class="Second TaskLabelText">0
							</span><span class="TaskLabelText">:</span><span class="Frame TaskLabelText">0
							</span></td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<table class="LicenseFrameControl">
					<tr>
						<td style="width: 80px">
							<div class="TaskLabelText operate_button SeekTimeTrigger"><s:text name="editor.seek"/></div>
						</td>
						<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
						<td style="width: 80px">
							<input type="text" name="SeekTime" style="width: 80px"
								value="0:0:0:0"/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
			<td style="width: 20px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px; height: 360px; vertical-align: top">
				<div style="display: block">
					<a href="javascript:void(0)" class="A_ClickWrapper">
						<table class="PreprocessTab" style="height: 26px">
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
								<td class="TabSnapshot" style="width: 85px;">
									<div id="TabSnapshot" class="UnderLineTab_Trigger"><s:text name="editor.snapshot"/></div>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
							</tr>
						</table>
					</a>
					<div class="LineSpacing"></div>
					<div class="LineSpacing"></div>
					<%-- mosaic begin --%>
					<div id="TabMosaic" class="ProcessPage EditorMosaic">
						<table>
							<tr>
								<td class="Hide">
									<input type="checkbox" name="MosaicEnable" class="DefaultCheckbox"/>
									<span class="TaskLabelText"><s:text name="editor.mosaic.open_info"/></span>
								</td>
								<td><div class="LinePlaceHolder">&nbsp;</div></td>
								<td style="width: 80px;">
									<div class="TaskLabelText operate_button NewMosaicTrigger"><s:text name="common.new"/></div>
								</td>
								<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button PreviewMosaicTrigger"><s:text name="editor.preivew"/></div>
								</td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="MosaicItemContainer" style="height: 250px; overflow-y: auto;">
						</div>
						<div class="LineSpacing"></div>
					</div>
					<%-- mosaic end --%>
					<%-- trim begin --%>
					<div id="TabTrim" class="ProcessPage TabTrim">
						<table>
							<tr>
								<td>
									<input type="checkbox" name="TrimEnable" class="DefaultCheckbox" />
									<span class="TaskLabelText"><s:text name="editor.open_cropping"/></span>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button SelectBoxTrigger"><s:text name="editor.select_region"/></div>
								</td>
								<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
								<td style="width: 80px">
									<div class="TaskLabelText operate_button PreviewTrimTrigger"><s:text name="editor.preivew"/></div>
								</td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
						<table class="ValueChanger"><tr>
							<td class="CroppingColumn1 LabelAlign">
								<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
							</td>
							<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
							<td class="MosaicColumn3">
								<input type="text" name="TrimX" class="TaskContentText InputText2 VerifyTrim" onchange="javascript:uCheckInputInt(this);"
									value="0"/>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
						</tr></table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
						<table class="ValueChanger"><tr>
							<td class="CroppingColumn1 LabelAlign">
								<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
							</td>
							<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
							<td class="MosaicColumn3">
								<input type="text" name="TrimY" class="TaskContentText InputText2 VerifyTrim" onchange="javascript:uCheckInputInt(this);"
									value="0"/>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
						</tr></table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
						<table class="ValueChanger"><tr>
							<td class="CroppingColumn1 LabelAlign">
								<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
							</td>
							<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
							<td class="MosaicColumn3">
								<input type="text" name="TrimWidth" class="TaskContentText InputText2 VerifyTrim" onchange="javascript:uCheckInputInt(this);"
									value="10"/>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
						</tr></table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
						<table class="ValueChanger"><tr>
							<td class="CroppingColumn1 LabelAlign">
								<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
							</td>
							<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
							<td  class="MosaicColumn3">
								<input type="text" name="TrimHeight" class="TaskContentText InputText2 VerifyTrim" onchange="javascript:uCheckInputInt(this);"
									value="10"/>
							</td>
							<td><div class="LinePlaceHolder"></div></td>
						</tr></table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
					</div>
					<%-- trim end --%>
					<%-- clip begin --%>
					<div id="TabTimeClipping" class="ProcessPage EditorTimeClipping">
						<div class="Unsupport">
							<span class="TaskLabelText"><s:text name="editor.media_is_not_supported"/></span>
						</div>
						<div class="Support">
							<table>
								<tr>
									<td>
										<input type="checkbox" name="TimeClippingEnable" class="DefaultCheckbox" />
										<span class="TaskLabelText"><s:text name="editor.open_clipping"/></span>
									</td>
									<td><div class="LinePlaceHolder"></div></td>
									<td style="width: 80px">
										<div class="TaskLabelText operate_button NewClipTrigger"><s:text name="common.new"/></div>
									</td>
									<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
									<td style="width: 80px">
										<div class="TaskLabelText operate_button PreviewClipTrigger"><s:text name="editor.preivew"/></div>
									</td>
								</tr>
							</table>
							<div class="LineSpacing"></div>
							<table class="">
								<tr>
									<td style="width: 120px">
										<input type="radio" name="TimeClippingMode" class="DefaultCheckbox" 
											value="true" checked="checked"/><span class="TaskLabelText"><s:text name="editor.reserve_inside"/></span>
									</td>
									<td style="width: 120px">
										<input type="radio" name="TimeClippingMode" class="DefaultCheckbox" 
											value="false"/><span class="TaskLabelText"><s:text name="editor.reserve_outside"/></span>
									</td>
									<td><div class="LinePlaceHolder"></div></td>
								</tr>
							</table>
							<div class="LineSpacing"></div>
							<div class="ClipContainer" style="height: 250px; overflow-y: auto;">
							</div>
							<div class="LineSpacing"></div>
						</div>
					</div>
					<%--clip end --%>
					<%-- advertisement begin --%>
					<div id="TabAdvertisement" class="ProcessPage Advertisement">
						<div class="Unsupport">
							<span class="TaskLabelText"><s:text name="editor.media_is_not_supported"/></span>
						</div>
						<div class="Support">
							<table style="height: 23px">
								<tr>
									<td><div class="LinePlaceHolder"></div></td>
									<td style="width: 80px;">
										<div class="TaskLabelText operate_button NewAdvertisementTrigger"><s:text name="common.new"/></div>
									</td>
									<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
									<td style="width: 80px">
										<div class="TaskLabelText operate_button PreviewAdvertisementTrigger"><s:text name="editor.preivew"/></div>
									</td>
								</tr>
							</table>
							<div class="LineSpacing"></div>
							<div class="AdvertisementList" style="height: 250px; overflow-y: auto;">
							</div>
						</div>
						<div class="LineSpacing"></div>
					</div>
					<%-- advertisement end --%>
					<%-- snapshot begin --%>
					<div id="TabSnapshot" class="ProcessPage">
						<table>
							<tr>
								<td class="LabelAlign" style="width: 80px">
									<span class="TaskLabelText"><s:text name="editor.local_path"/>:</span>
								</td>
								<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
								<td>
									<input type="text" name="LocalPath" class="TaskContentText" style="width: 200px"/>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
						<table>
							<tr>
								<td class="LabelAlign" style="width: 80px">
									<span class="TaskLabelText"><s:text name="editor.filename"/>:</span>
								</td>
								<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
								<td>
									<input type="text" name="LocalName" class="TaskContentText" style="width: 200px"/>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
							</tr>
						</table>
						<div class="LineSpacing"></div>
						<div class="LineSpacing"></div>
						<table>
							<tr>
								<td class="LabelAlign" style="width: 80px">
									<div style="width: 80px" class="TaskLabelText operate_button SnapshotTrigger"><s:text name="editor.snapshot"/></div>
								</td>
								<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
								<td>
									<span class="TaskLabelText"><s:text name="editor.snapshot_info"/></span>
								</td>
								<td><div class="LinePlaceHolder"></div></td>
							</tr>
						</table>
					</div>
					<%--snapshot end --%>
				</div>
			</td>
		</tr>
	</table>
	<div style="display: none">
		<%--hidden element --%>
		<s:include value="/jsp/template/input/PreviewTimeslice.jsp"/>
		<s:include value="/jsp/template/input/PreviewMosaic.jsp"/>
		<s:include value="/jsp/template/input/PreviewAdItem.jsp"/>
	</div>
</div>
