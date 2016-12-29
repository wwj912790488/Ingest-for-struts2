//
// Basic functions for mediainfo dom
//

/**
 * 
 * @param {Element}elemObj
 * @param {String}propTagName
 * @returns{String} null or val
 */
function miGetPropVal(elemObj, propTagName){
	if(elemObj==null)
		return null;
	var used = uFindFirstInArray(elemObj.childNodes, function(n){return n.nodeName==propTagName;});
	return used==null? null : $(used).text();
}

/**
 * 
 * @param {Element}elemObj
 * @returns{Boolean}
 */
function miIsUsed(elemObj){
	return miGetPropVal(elemObj,'used') == '1';
}

/**
 * 
 * @param {Element}elemObj
 */
function miGetId(elemObj){
	var p = miGetPropVal(elemObj, 'pid');
	return p!=null && p.length>0 ? p : elemObj.getAttribute('idx');
}

function miHasProgram(doc){
	var programs = uFindFirstInArray(doc.documentElement.childNodes, function(n){return n.nodeName=='programs';});
	return programs!=null;
}

/**
 * @param {Element}elemP	mediainfo XML DOM document, or any Element
 * @param {String}tagName	program, video, audo, subtitle
 * @returns{Array} Element array. size 0: no program
 */
function miFindAll(elemP, tagName){
	var ret = new Array();
	uFindNodeArray(ret,elemP,function(n){return n.nodeName==tagName;},true);
	return ret;
}


/**
 * @param {Document}doc
 * @param {String}progId	
 * @retturn {Node}			mediaInfo Node or program Node
 */
function miGetMiNode(doc, progId){	
	var root = doc.documentElement;
	var progs = miFindAll(root, 'program');
	if( progs.length==0) {
		return root;
	}else{			
		if(progId==undefined||progId==null||progId=='-1'||progId==-1){
			var prog = uFindFirstInArray(progs, function(p){return miIsUsed(p);});
			return prog==null ? progs[0] : prog;
		}else{
			return uFindFirstInArray(progs, function(p){return miGetId(p)==progId;});
		}
	}	
}

function __Mi_GetInfoNode(nodeMi, av, id){
	if(nodeMi.nodeName=='program'){
		var all = miFindAll(nodeMi, av);
		if(id==undefined||id==null||id=='-1'||id==-1){
			var a = uFindFirstInArray(all, function(p){return miIsUsed(p);});
			return a!=null ? a : (all.length>0?all[0]:null);
		}else{
			return uFindFirstInArray(all, function(p){return miGetId(p)==id;});
		}
	}else{
		return uFindFirstNode(nodeMi, function(n){return n.nodeName==av;}, true);
	}
}

function miMi_GetVideoNode(nodeMi, id){
	return __Mi_GetInfoNode(nodeMi,'video',id);
}
function miMi_GetAudioNode(nodeMi, id){
	return __Mi_GetInfoNode(nodeMi,'audio',id);
}
function miMi_GetSubtitleNode(nodeMi, id){
	return __Mi_GetInfoNode(nodeMi,'subtitle',id);
}

function mMiVideo_GetDuration(nodeVideo){
	if(nodeVideo==null)
		return null;
	var d = miGetPropVal(nodeVideo, 'duration');
	if(d==null && nodeVideo.parentNode.nodeName=='mediaInfo'){
		d = miGetPropVal(nodeVideo.parentNode, 'duration');
	}
	return d;
}
