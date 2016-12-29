<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ContentPackaging" style="margin-left: 18px; margin-right:18px">
	<input type="hidden" name="ContentPackagingId" class="ContentPackagingId TaskContentText ContentParamText2"
		value="<s:property value="[0].id" />"/>
	<input type="hidden" name="ContentPackagingOperate" class="ContentPackagingOperate TaskContentText ContentParamText2"
		value="<s:property value="[0].operate" />"/>
	<input type="hidden" name="FromUri" class="FromUri TaskContentText ContentParamText2"
		value="<s:property value="[0].fromUri" />"/>
	<div style="height:15px"></div>
	<table>
		<tr>
			<td style="width: 13px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 8px; ">
				<div class="task_title_left" style="position:relative;top: 2px;"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 90px">
				<span class="TaskHeadText TaskTitle">图文模板</span>
			</td>
			<td style="width:80px">
				<div class="BackTrigger top_button2" style="width: 80px"><s:text name="button.label.back"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="top_button1 TaskLabelText SaveTrigger"><s:text name="button.label.save"/></div>
			</td>
		</tr>
	</table>
	<div style="height:14px"></div>
	<table>
		<tr>
			<td style="vertical-align: top; width: 624px">
				<!-- left content -->
				<div class="TaskLabelText"><s:text name="common.preview"/></div>
				<div class="LineSpacing"></div>
	    		<div class="TMPlayerContainer player_container" >
				</div>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskContentText"><s:text name="common.name"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="ContentPackagingName" class="ContentPackagingName TaskContentText ContentInput"
								value=""/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskContentText"><s:text name="common.description"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="ContentPackagingDescription" class="ContentPackagingDescription TaskContentText ContentInput"
								value=""/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskContentText"><s:text name="input.inputSource"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="ContentPackagingSource" class="ContentPackagingSource TaskContentText ContentInput"
								value=""/>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText SelectSourceTrigger"><s:text name="content_packaging.source"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText PlayTrigger"><s:text name="button.label.play"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskContentText"><s:text name="output.resolution"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="OutputWidth" class="OutputWidth TaskContentText" style="width: 60px"
								value="1280"/>
							<span class="TaskContentText">x</span>
							<input type="text" name="OutputHeight" class="OutputHeight TaskContentText" style="width: 60px"
								value="720"/>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText ResolutionTrigger"><s:text name="common.select"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="ContentInfoCol1 LabelAlign">
							<span class="TaskContentText"><s:text name="video.pixelAspectRatio"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoCol2">
							<input type="text" name="AspectRatioX" class="AspectRatioX TaskContentText" style="width: 60px"
								value="16"/>
							<span class="TaskContentText">:</span>
							<input type="text" name="AspectRatioY" class="AspectRatioY TaskContentText" style="width: 60px"
								value="9"/>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="ContentInfoColBtn">
							<div class="ContentButton3 TaskLabelText AspectRatioTrigger"><s:text name="common.select"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
			<td style="width:20px"><div class="LineSpacing"></div></td>
			<td style="vertical-align: top;">
				<!-- right content -->
				<table>
					<tr>
						<td style="width: 3px;"><div class="LineSpacing" style="background-color:#00c2ff; height: 17px"></div></td>
						<td style="width: 10px;"><div class="LineSpacing"></div></td>
						<td style="width: 200px">
							<span class="TaskLabelText"><s:text name="tmenu.profile"/></span>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
						<td class="TabContentButton">
							<div class="ContentButton1 TaskLabelText NewMotionIconTrigger"><s:text name="editor.motion_icon.add"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TabContentButton">
							<div class="ContentButton1 TaskLabelText NewDynamicTextTrigger"><s:text name="editor.dynamic_text.add"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TabContentButton">
							<div class="ContentButton1 TaskLabelText DeleteProcessorTrigger"><s:text name="button.label.delete"/></div>
						</td>
					</tr>
				</table>
				<div style="height:10px"></div>
				<table>
					<tr>
						<td class="TabContentButton">
							<div class="ContentButton2 TaskLabelText PositionTrigger"><s:text name="editor.select_position"/></div>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TabContentButton">
							<div class="ContentButton2 TaskLabelText PreviewTrigger"><s:text name="common.preview"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div style="height:15px"></div>
				<div style="border:1px solid #ddd;">
					<table>
						<tr>
							<td style="vertical-align: top">
								<div class="ContentParamItem">
								</div>
							</td>
							<td style="width: 100px; vertical-align: top;background-color: #ebeef3">
								<div id="ContentTabList">
								</div>
							</td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>
	<div style="height: 15px"></div>
</div>