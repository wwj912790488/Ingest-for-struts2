<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AdvertisementPadding">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="AdvertisementColumn4 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.total_duration"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<input type="text" name="AdDurationLimit" class="TaskContentText" style="width: 106px"
					value="<s:property value='[0].advertisementInserter.mv4Enlight.totalDuration' />">
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.padding_type"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="AdvertisementColumn4">
				<select name="AdPaddingType" class="TaskContentText DefaultSelect">
					<option value="<s:property value='[0].advertisementInserter.mv4Enlight.padding' />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="AdvertisementColumn4 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.padding_mv"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 280px">
				<input type="text" name="AdPaddingUri" class="TaskContentText" style="width: 280px"
						value="<s:property value='[0].advertisementInserter.mv4Enlight.uri' />">
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectADPaddingTrigger"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="AdvertisementColumn4 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.padding_logo"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 280px">
				<input type="text" name="AdPaddingLogo" class="TaskContentText" style="width: 280px"
						value="<s:property value='[0].advertisementInserter.mv4Enlight.logoUri' />">
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 80px">
				<div class="TaskLabelText operate_button SelectADPaddingLogoTrigger"><s:text name="common.select"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="DashLine"></div>
</div>