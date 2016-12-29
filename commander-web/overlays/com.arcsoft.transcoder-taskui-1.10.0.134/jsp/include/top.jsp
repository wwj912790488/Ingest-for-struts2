<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.arcsoft.web4transcoder.App" %>
<%@ page import="com.arcsoft.web4transcoder.AppConfig" %>
<%@ page import="com.arcsoft.web4transcoder.domain.security.*" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<% 
String[] _keys = {
		"taskmgr", 
		"history",
		"tmplmgr", 
		"auto",
		"syssetting",
		"profile",
		"preset",
		"watchfolder",
		"schedule",
		"syslog",
		"sysalert",
		"accountmgr"
		};

String __topTabActive__ = (String)request.getAttribute("__topTabActive__");
if(__topTabActive__==null)
	__topTabActive__ = "none";

HashMap<String,String> _Active = new HashMap<String,String>();
for(int i=0;i<_keys.length;i++){
	_Active.put(_keys[i], __topTabActive__.indexOf(_keys[i])!=-1 ? "Active" : "");
}

//Account sessionUser = (Account)session.getAttribute("user");

%>

<s:set name="autoHref" value='[0].getLimitation("AUTOMATION_WATCHFOLDER")=="1" ? "listWatchFolder":"listSchedule"' scope="request" />
<s:set name="PRODUCT_HEADER" value='[0].getLimitation("PRODUCT_HEADER")' scope="request" />
<s:set name="PRODUCT_LOGO" value='[0].getLimitation("PRODUCT_LOGO")' scope="request" />

<s:set name="showWatchFolder" value='[0].getLimitation("AUTOMATION_WATCHFOLDER")=="1"' scope="request" />
<s:set name="showSchedule" value='[0].getLimitation("AUTOMATION_SCHEDULE")=="1"' scope="request" />

<%
	String bg_p = null;
	String logo = null;
	String pHeader = (String)request.getAttribute("PRODUCT_HEADER");
	if(pHeader==null||pHeader.length()==0||pHeader.indexOf('_')==-1){
		bg_p = "ARCSOFT_CORE";
	}else{
		int p = pHeader.indexOf('_');
		bg_p = "ARCSOFT" + pHeader.substring(p);
	}
	
	logo = (String)request.getAttribute("PRODUCT_LOGO");
	
	if(bg_p!=null) request.setAttribute("bg_p", bg_p);
	if(logo!=null) request.setAttribute("logo", logo);
%>
<div class="HeadPanel">
	<%if(App.getInstance().needAlertTryDate()) {%>
		<div class="TryUseAlert">
		<%=App.getInstance().getLocalizedString("label.try_to_date") %>:
		<%=new java.text.SimpleDateFormat("yyyy-MM-dd").format(App.getInstance().getTryDate()) %>
		</div>	
	<%} %>
	<div id="MiniAlertBox" class="TopMiniAlert">
		<%if(!Boolean.FALSE.equals(session.getAttribute("enableTopAlert"))) {%>
		<script>timerUpdateMiniAlertBox('all');</script>
		<%} %>
	</div>
	<div class="HeadPanelContent" style="background-image:url(images/Header/Header_BG_p${bg_p}.png)">
		<%@include file="logo.jsp" %>
		<div id="HeadBlank" style="position:relative;height:81px;visibility: hidden;" ></div>
			
		<div class="HeadTabPanel">
			<div class="HeadTab" style="width:10px;visibility:hidden;">
			</div><div class="HeadTab<%=_Active.get("taskmgr")%> HeadBtnText" >
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('TASK')">
					<div class="HitArea" onclick="window.location.href='listTask'"><s:text name="tmenu.taskmgr" /></div>	
				</s:if>					
				<s:else>
					<div class="HitArea Disabled"><s:text name="tmenu.taskmgr" /></div>
				</s:else>			
				<div class="L"></div><div class="R"></div>	
							
			</div><div class="HeadTab<%=_Active.get("tmplmgr")%> HeadBtnText" >
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('TEMPLATE')">
					<div class="HitArea" onclick="window.location.href='listProfile'"><s:text name="tmenu.profile" /></div>
				</s:if>
				<s:else>
					<div class="HitArea Disabled"><s:text name="tmenu.profile" /></div>
				</s:else>
				<div class="L"></div><div class="R"></div>
				
			</div><s:if test='#request.showWatchFolder||#request.showSchedule'><div class="HeadTab<%=_Active.get("auto")%> HeadBtnText">
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('AUTOMATION')">
					<div class="HitArea" onclick="window.location.href='${autoHref}'"><s:text name="tmenu.auto" /></div>
				</s:if>
				<s:else>
					<div class="HitArea Disabled"><s:text name="tmenu.auto" /></div>
				</s:else>
				<div class="L"></div><div class="R"></div> 
				
			</div></s:if><div class="HeadTab<%=_Active.get("syssetting")%> HeadBtnText">
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('SETTING')">
					<div class="HitArea" onclick="location.href='editSysSetting?m=network'"><s:text name="tmenu.syssetting" /></div>
				</s:if>
				<s:else>
					<div class="HitArea Disabled"><s:text name="tmenu.syssetting" /></div>
				</s:else>
				<div class="L"></div><div class="R"></div>
				
			</div><div class="HeadTab<%=_Active.get("syslog")%> HeadBtnText">
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('LOG')">
				<div class="HitArea" onclick="location.href='listSysLog'"><s:text name="tmenu.syslog"/></div>
				</s:if>
				<s:else>
				<div class="HitArea Disabled"><s:text name="tmenu.syslog"/></div>
				</s:else>
				<div class="L"></div><div class="R"></div>
				
			</div><div class="HeadTab<%=_Active.get("sysalert")%> HeadBtnText">
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('WARNING')">
				<div class="HitArea" onclick="location.href='listSysAlert'"><s:text name="tmenu.syswarning"/></div>
				</s:if>
				<s:else>
				<div class="HitArea Disabled"><s:text name="tmenu.syswarning"/></div>
				</s:else>
				<div class="L"></div><div class="R"></div>
				
			</div><div class="HeadTab<%=_Active.get("accountmgr")%> HeadBtnText">
				<s:if test="#session.user.hasPriv('ALL')||#session.user.hasPriv('ACCOUNT')">
				<div class="HitArea" onclick="location.href='accountSetting?m=account'"><s:text name="menu.setting.account"/></div>
				</s:if>
				<s:else>
				<div class="HitArea Disabled"><s:text name="menu.setting.account"/></div>
				</s:else>
				<div class="L"></div><div class="R"></div>				
			</div>
			
		</div>	
	</div>
	<div style="position:absolute;right:2px;bottom:10px;width:80px;height:28px;line-height:30px;color:white;cursor:pointer;text-decoration:underline;" onclick="location.href='login?logout=1'"><s:text name="label.logout" /></div>
	<div class="HeadHLine"></div>
</div>

<div class="TopGradient"></div>
<div style="position:relative;left:0px;top:0px;height:128px;visibility:hidden" ></div>

