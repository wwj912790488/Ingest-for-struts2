var _cxt;
var g_ImportDialog = null;

function _GetPresetId(rowDIV){
	return rowDIV.getAttribute("id");
}

function _GetRowDIVArray(listDIV){
	return $(".tab_list .tab_content");
}

function uiRedrawTableBG(list, rowId){
	for(var i=0;i<list.length;i++){
		uPaintTableRowBg(list[i], i, rowId);
	}
}
function uiShowActionBar(isShow){
	if(1) return; //always show
	var a = document.getElementById("ActionBar");
	var h = document.getElementById("TblHead");
//	if(isShow){
//		a.style.display="inline-block";
//		h.style.display="none";
//	}else{
//		a.style.display="none";
//		h.style.display="inline-block";
//	}
	
	if(isShow)
		uAnim_SwitchDisplay(h, a,'inline-block');
	else
		uAnim_SwitchDisplay(a, h,'inline-block');
}

function uiUpdateSelectHint(row, t){
	if(row!=null){
		document.getElementById('ActionBarHint').innerHTML=t;
	}
}

function PLG_OnSelectSubRow(row, parentRow){
	if(parentRow==undefined||parentRow==null)
		parentRow = uGetContainer(row,function(n){return n.getAttribute('id')=='PresetGroup';});
	
	if(row!=null)
		PLG_OnSelectRow(/*parentRow*/null);
	
	var rowContainer = uFindFirstNodeById(parentRow, 'ListContainer');
	var rows = _GetRowDIVArray(rowContainer);
	
	uPaintTableRowSelected( rows, row, null, 'transparent');
	for(var i=0;i<rows.length;i++){
		var chk = uFindFirstNodeByName(rows[i], "input","chk");
		chk.checked = rows[i]==row;
	}
	if(row!=null)
		uiShowActionBar(true);
	uiUpdateSelectHint(row,$(row).find('.TblCol_Name').text());
}

function PLG_OnSelectRow(row){
	if(row!=null){
		var clzPattern = /[\s]*TblRow[\s]*/;
		if( !clzPattern.test(row.getAttribute('class')) )
			row = uGetContainer( row, function(n){return clzPattern.test(n.getAttribute('class'));} );
	}
	var rowContainer = uGetContainer(row,function(n){return n.getAttribute('id')=='ListContainer';});
	var rows = _GetRowDIVArray(rowContainer);
	uPaintTableRowSelected( rows, row, 'RowBG' );
	for(var i=0;i<rows.length;i++){			
		var chk = uFindFirstNodeByName(rows[i], "input","chk");		
		PLG_OnSelectSubRow(null,rows[i]);		
		chk.checked = rows[i]==row;
	}
	uiShowActionBar(row!=null);
	uiUpdateSelectHint(row, $(row).find('.GroupName').text());
}

function PLG_Toggle(expDIV){
	var gDIV = uGetContainer(expDIV, function(n){return n.getAttribute("id")=="PresetGroup";});
	var gSub = uFindFirstNodeById(gDIV,"ListContainer");
	var currExp = expDIV.getAttribute('class')=='BgIconExpand';
	if(currExp){
		gSub.setAttribute('class', gSub.getAttribute('class') + ' GroupSubNone');
		expDIV.setAttribute('class', 'BgIconCollaps');
	}else{
		uReplaceStyle(gSub, 'GroupSubNone','');
		expDIV.setAttribute('class', 'BgIconExpand');
	}
}

function PLG_Edit(isGroup, id){
	//alert(isGroup + " id=" + id);
	if(isGroup){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.preset_name + '!');
		return;
	}else{
		location.href="editPreset?presetId=" + id;
	}
}

function PLG_Del(isGroup, id){
	var msg;
	if(isGroup){		
		if(id==''||id=='0'||id==0){
			msg = _cxt.msg.cannot_del.replace('%s', '"'  + _cxt.label.nogroup + '"');
			alert(msg);
			return;
		}
		msg = _cxt.msg.is_del_select.replace('%s', _cxt.group_name);
		if(!window.confirm(msg))
			return;
		$.post('deletePresetCategory', 'presetCategoryId=' + id,
				function(data){
					window.location.href='listPresetCategory?rnd=' + Math.random();		
				}
			);
	}else{
		msg = _cxt.msg.is_del_select.replace('%s', _cxt.preset_name);
		if(!window.confirm(msg))
			return;
		$.post('deletePreset', 'presetId=' + id,
				function(data){
					//window.location.href='listPresetCategory?rnd='+ Math.random();
					PL_DelResponse(data, "listPresetCategory");
				}
			);
	}
}

function PLG_Action(fnAction){
	var groups = _GetRowDIVArray(null);
	for(var i=0;i<groups.length;i++){
		var chk = uFindFirstNodeByName(groups[i], "input","chk");
		if(chk.checked){
			fnAction(true, chk.getAttribute('value'));
			return;
		}
		var presets = _GetRowDIVArray(uFindFirstNodeById(groups[i],'ListContainer'));
		for(var j=0;j<presets.length;j++){
			chk = uFindFirstNodeByName(presets[j], "input","chk");
			if(chk.checked){
				fnAction(false, chk.getAttribute('value'));
				return;
			}
		}
	}
}

function PL_GetSelected(){
	var ret = new Array();
	var rows = _GetRowDIVArray();	
	for(var i=0;i<rows.length;i++){
		var chk = uFindFirstNodeByName(rows[i], "input", "chk");
		if(chk.checked)
			ret[ret.length] = chk.value;
	}
	return ret;
}

function PL_Edit(){
	var sel = PL_GetSelected();
	if(sel.length!=1){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.preset_name + '!');
		return;
	}
	location.href="editPreset?presetId=" + sel[0];
}

function PL_Copy(){
	var sel = PL_GetSelected();
	if(sel.length!=1){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.preset_name + '!');
		return;
	}
	location.href="newPreset?presetId=" + sel[0];
}


function PL_Del(){
	var sel = PL_GetSelected();
	if(sel.length==0){
		alert(_cxt.msg.pls_select_one +' '+ _cxt.preset_name + '!');
		return;	
	}
	var msg = _cxt.msg.is_del_select.replace('%s', _cxt.preset_name);
	if(!window.confirm(msg))
		return;
	$.post('deletePreset', 'presetId=' + sel[0],
			function(data){
				//window.location.href='listPreset';
				PL_DelResponse(data, "listPreset");
			}
		);
}

function PL_DelResponse(data, dstUrl) {
	function parseResponse(data) {
		var errorList = [];
		var $data = $(data);
		var $errs = $(".errorMessage", $data);
		if($errs.length > 0) {
			$errs.each(function() {
				var msg = $("span", this).text();
				errorList.push(msg);
			});
		}
		return errorList;
	}
	
	var list = parseResponse(data);
	if(list.length > 0) {
		//alert(list);
		$("#ActionMessage").text(list);
	} else {
		window.location.href=dstUrl;
	}
}

function PL_ImportPresets() {
	if(g_ImportDialog == null) {
		g_ImportDialog = new ImportContent();
		var body = document.getElementsByTagName("body");
		g_ImportDialog.Init("importPresets", body);
		g_ImportDialog.SetTitle(_cxt.msg.importPresets);
	}
	g_ImportDialog.Show();
}

function PL_ExportPresets() {
	if(!window.confirm(_cxt.msg.is_export_presets + "\n" ))
		return;
	var url = 'exportPresets';
	window.location.href = url;
}

function PL_Init(cxt){
	_cxt = cxt;
}

function PL_InitByG(cxt){
	_cxt = cxt;
	uiRedrawTableBG(_GetRowDIVArray(),"RowBG");
}