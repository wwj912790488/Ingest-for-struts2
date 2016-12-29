<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Preset Output">
	<form action="savePreset" method="post"> 
	<input type="hidden" name="PageName" value="PresetBody"/>
	<input type="hidden" id="ActionType" name="presetAction" value="<s:property value="[0].presetAction" />"/>
	<input type="hidden" name="Id" value="<s:property value="[0].preset.id" />"/>
	<div class="TitleHeadSpacing"></div>
	<table>
		<tr>
			<td class="LineIndent"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskHeadText"><s:text name="stream.scene"/></span>
			</td>
		</tr>
	</table>
	<div class="BlockSpacing"></div>
	<s:if test="[0].getLinkedStreamAssemblyCount() > 0">
	<div class="LineSpacing"></div>
	<div>
		<span class="TaskLabelText" style="color:#ff0000">- 有任务关联本参数模板，对本模板的变更会导致关联任务的变更。
			如果关联的任务正在运行，则下次运行时变更才会生效。</span>
	</div>
	<div class="LineSpacing"></div>
	</s:if>
	<div style="height: 3px; background-color: #b0b0b0;"></div>
	<div class="FieldError">
		<s:iterator value="fieldErrors" var="fieldError">
			<div class="FieldErrorText">
				<s:iterator value="value">
         			<s:property />   
     			</s:iterator>
			</div>
		</s:iterator>
	</div>
	<div class="BlockSpacing"></div>
	<div class="BlockSpacing"></div>
	<table>
		<tr>
			<td class="LineIndent"><div class="LinePlaceHolder"></div></td>
			<td style="width: 350px;">
				<table>
					<tr>
						<td style="width: 70px">
							<span class="TaskLabelText"><s:text name="common.name"/>:</span>
						</td>
						<td style="width: 190px">
							<input type="text" name="Name" class="TaskContentText" style="width: 180px;"
								value="<s:property value="[0].preset.name" />"/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td style="width: 70px">
							<span class="TaskLabelText"><s:text name="presetDetail.category"/>:</span>
						</td>
						<td style="width: 190px">
							<input type="text" name="Category" class="TaskContentText" style="width: 180px;"
								value="<s:property value="[0].preset.presetCategory.name" />"/>
						</td>
						<td style="width: 60px">
							<table class="MouseHover CategoryListTrigger">
								<tr class="BTN_Container">
									<td class="BTN_Left"></td>
									<td class="BTN_Center">
										<span class="TaskContentText"><s:text name="common.select"/></span>
									</td>
									<td class="BTN_Right"></td>
								</tr>
							</table>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
			<td>
				<table>
					<tr>
						<td style="width: 80px">
							<span class="TaskLabelText"><s:text name="common.description"/>:</span>
						</td>
						<td>
							<textarea name="Description" class="TaskContentText" style="width: 400px; height: 50px; resize: none;"><s:property value="[0].preset.description"/></textarea>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<div class="BlockSpacing"></div>
	<div class="BlockSpacing"></div>
	<table class="StreamSettingTable">
		<tr style="background-color: #f5f5f5; height: 40px">
			<td>
				<table>
					<tr>
						<td class="InputSettingIndent"><div class="LinePlaceHolder"></div></td>
						<td>
							<span class="TaskHead2Text"><s:text name="presetDetail.streamSetting"/></span>
						</td>
						<td class="InputSettingIndent"><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr style="background-color: #ffffff;">
			<td>
				<table>
					<tr>
						<td class="InputSettingIndent"><div class="LinePlaceHolder"></div></td>
						<td>
							<div class="StreamExpand">
								<s:include value="/jsp/preset/PresetStream.jsp"/>
							</div>
						</td>
						<td class="InputSettingIndent"><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<div class=BlockSpacing></div>
	</form>
</div>