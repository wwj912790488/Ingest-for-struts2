SelectPort.prototype.init = function(){
};

function SelectPort() {

};

function choosePort(td,portCount){
	
	var returnValue = window.showModalDialog("selectPort.action?portCount=" + portCount,window,"dialogWidth:200px;dialogHeight:200px;status:no;scroll:no;location:no;help:0;");
	$(td).val(returnValue);
};

function closePage(td){
	window.returnValue=$(td).text();
	window.close();
}