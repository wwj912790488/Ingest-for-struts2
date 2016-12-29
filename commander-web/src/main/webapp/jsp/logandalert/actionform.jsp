<div class="cm_operatebar">
	<div class="left">
		<form method="post" action="list${actionModule}.action" id="logForm">			
			<div id="type" class="left">
				<span class="left">
					<s:if test="#request.actionModule == 'Log'">
						<s:text name="log.field.type" />
					</s:if>
					<s:else>
						<s:text name="alert.field.type" />
					</s:else>
				</span>
				<select name="type" class="select">
					<option value="" ${type == '' ? 'selected="selected"' : ''}><s:text name="log.query.all"/></option>
					<s:iterator value="typeList.entrySet()" var="theType">
						<option value="${theType.key}"  ${type==theType.key ? 'selected="selected"' : '' } > ${theType.value} </option>
					</s:iterator>
				</select>
			</div>
			<s:if test="#request.actionModule == 'Log'">
			<div id="user" class="left">
				<span class="left">
					<s:text name="log.field.user" />
				</span>
				<s:select name="user" cssClass="select"
				list="userList" listKey="key" listValue="value"
				headerKey="" headerValue="%{getText('log.query.all')}">
				</s:select>
			</div>
			</s:if>
			<s:else>
			<div id="level" class="left">
				<span class="left">
					<s:text name="alert.field.level" />
				</span>
				<s:select name="level" cssClass="select"
				list="levelMap" listKey="key" listValue="value"
				headerKey="" headerValue="%{getText('log.query.all')}">
				</s:select>
			</div>
			</s:else>
			<div id="time" class="left">
				<span class="left">
					<s:if test="#request.actionModule == 'Log'">
						<s:text name="log.field.time" />
					</s:if>
					<s:else>
						<s:text name="alert.field.time" />
					</s:else>
				</span>				
				<div id="fixed" class="left">
					<select name="timeDuration" class="select">
						<option value="0" ${timeDuration == '0' ? 'selected="selected"' : ''}><s:text name="log.query.all"/></option>
						<option value="1" ${timeDuration == '1' ? 'selected="selected"' : ''}><s:text name="log.query.lastweek"/></option>
						<option value="2" ${timeDuration == '2' ? 'selected="selected"' : ''}><s:text name="log.query.lastmonth"/></option>
						<option value="3" ${timeDuration == '3' ? 'selected="selected"' : ''}><s:text name="other"/></option>
					</select>
				</div>	
				<div id="manual" class="left <s:if test='timeDuration != "3"'>hidden</s:if>">
					<input name="begin" value="<s:property value="begin"/>" class="Wdate" type="text" onClick="WdatePicker({startDate:'%y-%M-%d 00:00:00,alwaysUseStartDate:true'})">
					-
					<input name="end" value="<s:property value="end" />" class="Wdate" type="text" onClick="WdatePicker({startDate:'%y-%M-%d 00:00:00,alwaysUseStartDate:true'})">
				</div>
			</div>
			<div id="description" class="left">
				<span class="left">
					<s:if test="#request.actionModule == 'Log'">
						<s:text name="log.field.description" />
					</s:if>
					<s:else>
						<s:text name="alert.field.description"/>
					</s:else>
				</span>
				<s:textfield name="description"/>
			</div>
			</form>
	</div>
	<div class="right">
			<div class="action_normal_btns">
				<a id="btnQuery">
					<span class="btn_left"></span>
						<span class="btn_middle"><p><s:text name="action.query" /></p></span>
					<span class="btn_right"></span>
				</a>			
			</div>
	</div>						
</div>

<div class="cm_actionbar">
	<form id="logActionForm" method="post">
		<input name="type" type="hidden" value="<s:property value="type" />" />
		<s:if test="#request.actionModule == 'Log'">
		<input name="user" type="hidden" value="<s:property value="user" />" />
		</s:if>
		<s:else>
		<input name="level" type="hidden" value="<s:property value="level" />" />
		</s:else>
		<input name="begin" type="hidden" value="<s:property value="begin" />" />
		<input name="end" type="hidden" value="<s:property value="end" />" />	
		<input name="timeDuration" type="hidden" value="<s:property value="timeDuration" />" />
		<input name="description" type="hidden" value="<s:property value="description" />" />
	</form>
	<s:if test="(#request.actionModule == 'Log')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOG_DELETE'})">
			<div id="btnDelete" class="item img_del"><s:text name="action.del"/></div>
		</sec:authorize>
	</s:if>
	<s:else>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_ALERT_DELETE'})">
			<div id="btnDelete" class="item img_del"><s:text name="action.del"/></div>
		</sec:authorize>
	</s:else>
	<div id="btnExport" class="item img_export"><s:text name="action.export"/></div>
	<s:if test="#request.actionModule == 'Alert'">
	<div id="sss" class="item img_export" style="float: right;margin-right: 20px;"><s:text name="alert.config.setting"/></div>
	</s:if>
</div>
	
