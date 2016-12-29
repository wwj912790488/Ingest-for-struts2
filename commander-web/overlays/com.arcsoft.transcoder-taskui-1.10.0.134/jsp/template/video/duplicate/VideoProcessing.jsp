<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoProcessing">
	<div class="BlockSpacing"></div>
	<table>
		<tr>
			<td width="30"><div class="VideoProcessingExpandTrigger VideoProcessingExpandIcon MouseHover ICON_ArrowRight"></div></td>
			<td>
				<a href="javascript:void(0);" class="A_ClickWrapper" >
				<span class="TaskHead2Text VideoProcessingExpandTrigger MouseHover"><s:text name="video.process"/></span>
				</a>
			</td>
		</tr>
	</table>
	<div class="VideoProcessingExpandTarget">
		<div class="LineSpacing LicenseSimHdScene"></div>
		<table class="LicenseSimHdScene">
			<tr>
				<td class="VideoColumn1 LabelAlign ">
					<div class="ImportSimHdTrigger TaskContentText white_button"><s:text name="stream.import_scene"/></div>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<div class="LinePlaceHolder"></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing LicenseSimHdScene"></div>
		<!-- Line0 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign LicenseDeinterlace">
					<span class="TaskLabelText"><s:text name="video.process.deinterlace"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDeinterlace"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseDeinterlace">
					<select name="Deinterlace" class="TaskContentText DefaultSelect">
						<option value="2"></option>
					</select>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseDeinterlaceAlg">
					<span class="TaskLabelText"><s:text name="video.process.deinterlaceAlg"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDeinterlaceAlg"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseDeinterlaceAlg">
					<select name="DeinterlaceAlg" class="TaskContentText DefaultSelect">
						<option value="0"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="BlockSpacing"></div>
		<!-- Line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign LicenseResizeAlg">
					<span class="TaskLabelText"><s:text name="video.process.resizeAlg"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseResizeAlg"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseResizeAlg">
					<select name="ResizeAlg" class="TaskContentText DefaultSelect">
						<option value="3"></option>
					</select>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseDeblock">
					<span class="TaskLabelText"><s:text name="video.process.deblock"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDeblock"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseDeblock">
					<input type="checkbox" name="Deblock" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="BlockSpacing"></div>
		<!-- Line1.1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign LicenseDenoiseMethod">
					<span class="TaskLabelText"><s:text name="video.process.denoise_method"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDenoiseMethod"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseDenoiseMethod">
					<select name="DenoiseMethod" class="TaskContentText DefaultSelect">
						<option value="0"></option>
					</select>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseDenoise">
					<span class="TaskLabelText"><s:text name="video.process.denoise"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDenoise"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseDenoise">
					<select name="Denoise" class="TaskContentText DefaultSelect">
						<option value="0"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="BlockSpacing"></div>
		<!-- Line2 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign LicenseSharpen">
					<span class="TaskLabelText"><s:text name="video.process.sharpen"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseSharpen"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseSharpen">
					<select name="Sharpen" class="TaskContentText DefaultSelect">
						<option value="0"></option>
					</select>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseAntiShaking">
					<span class="TaskLabelText"><s:text name="video.process.antishaking"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseAntiShaking"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseAntiShaking">
					<select name="AntiShaking" class="TaskContentText DefaultSelect">
						<option value="-1"></option>
					</select>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseAntialias">
					<span class="TaskLabelText"><s:text name="video.process.antialias"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseAntialias"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseAntialias">
					<input type="checkbox" name="AntiAlias" class="DefaultCheckbox" value="1"
						/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="BlockSpacing"></div>
		<!-- Line3 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign LicenseBright">
					<span class="TaskLabelText"><s:text name="video.process.light"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseBright"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseBright">
					<input type="text" name="Bright" class="TaskContentText VideoProcessingText"
						value="0"/>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseContrast">
					<span class="TaskLabelText"><s:text name="video.process.contrast"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseContrast"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseContrast">
					<input type="text" name="Contrast" class="TaskContentText VideoProcessingText"
						value="0"/>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseSaturation">
					<span class="TaskLabelText"><s:text name="video.process.saturation"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseSaturation"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseSaturation">
					<input type="text" name="Saturation" class="TaskContentText VideoProcessingText"
						value="0"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="BlockSpacing"></div>
		<!-- Line4 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign LicenseHue">
					<span class="TaskLabelText"><s:text name="video.process.hue"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseHue"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseHue">
					<input type="text" name="Hue" class="TaskContentText VideoProcessingText"
						value="0"/>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseDelight">
					<span class="TaskLabelText"><s:text name="video.process.delight"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseDelight"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseDelight">
					<select name="Delight" class="TaskContentText DefaultSelect">
						<option value="0"></option>
					</select>
				</td>
				<td class="VideoColumn1 LabelAlign LicenseRotation">
					<span class="TaskLabelText"><s:text name="video.process.rotation"/>:</span>
				</td>
				<td class="LabelEndSpacing LicenseRotation"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2 LicenseRotation">
					<input type="text" name="Rotation" class="TaskContentText VideoProcessingText"
						value=""/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="BlockSpacing"></div>
		<div class="DashLine"></div>
	</div>
</div>
