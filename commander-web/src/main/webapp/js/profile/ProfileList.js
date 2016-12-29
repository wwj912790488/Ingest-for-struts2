var _cxt;
var g_ImportDialog = null;

function _GetTaskDIVArray(){
	return $(".tab_list .tab_content");
}

function uiResetFilterStatus(cxtTTL){
	var activeFilter = cxtTTL.activeFilter;
	if(activeFilter=='' || activeFilter==null || activeFilter=='null')
		activeFilter = '0';
	var p = document.getElementById("FilterPanel");
	
	var fDIV = uFindFirstNodeById(p, activeFilter);	
	var divs = new Array();
	var clz = /[\s]*FilterButton[\sRL]*/;
	uFindNodeArray(divs, fDIV, function(n){return clz.test(n.getAttribute("class")); }, false);
	divs[divs.length] = fDIV;
	for(var i=0;i<divs.length;i++){
		var s = divs[i].getAttribute("class");
		s = s.replace(/FilterButton/,"FilterButtonPressed");
		 divs[i].setAttribute("class", s);
	}
}

function TTL_GetSelected(){
	var ret = new Array();
	var rows = _GetTaskDIVArray();	
	for(var i=0;i<rows.length;i++){
		var chk = uFindFirstNodeByName(rows[i], "input", "taskChk");
		if(chk.checked)
			ret[ret.length] = chk.value;
	}
	return ret;
}

function TTL_Edit(){
	var sel = TTL_GetSelected();
	if(sel.length!=1){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.profile_name + '!');
		return;
	}
	location.href="editProfile?profileId=" + sel[0]+"&fromUri=listProfile";
}

function TTL_Copy(){
	var sel = TTL_GetSelected();
	if(sel.length!=1){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.profile_name + '!');
		return;
	}
	location.href="newProfile?profileId=" + sel[0]+"&fromUri=listProfile";
}

function TTL_Apply(){
	var sel = TTL_GetSelected();
	if(sel.length!=1){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.profile_name + '!');
		return;
	}
	location.href="newTask?profileId=" + sel[0];
	var parentWin = $(parent.document);
	var nav = parentWin.find("#navTabPanel");
	nav.find("#templateChild").css("display", "");
	parentWin.find("#headerContainer").css("height", "143px").css("background-image", "url('images/header/tab_down.png')");
	nav.find(".active").removeClass("active");
	nav.find("#task").addClass("active");
}

function TTL_Del(){
	var sel = TTL_GetSelected();
	if(sel.length==0){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.profile_name + '!');
		return;	
	}
	var msg = _cxt.msg.is_del_select.replace('%s', _cxt.profile_name);
	if(!window.confirm(msg))
		return;
	
	window.location.href='deleteProfile?liveProfileId=' + sel[0];
}

function TTL_ImportProfiles() {
	if(g_ImportDialog == null) {
		g_ImportDialog = new ImportContent();
		var body = document.getElementsByTagName("body");
		g_ImportDialog.Init("importProfiles", body);
		g_ImportDialog.SetTitle(_cxt.msg.import_profiles);
	}
	g_ImportDialog.Show();
}

function TTL_ExportProfiles() {
	if(!window.confirm(_cxt.msg.is_export_profiles + "\n" ))
		return;
	var url = 'exportProfiles';
	window.location.href = url;
}

function TTL_Init(cxtTTL){
	_cxt = cxtTTL;
	//reset filter
	uiResetFilterStatus(cxtTTL);	
}
