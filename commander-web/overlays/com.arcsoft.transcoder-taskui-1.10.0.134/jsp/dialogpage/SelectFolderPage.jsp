<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="../include/urlbase.jsp" %>
<base href="<%=urlbase%>/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"  />
<title>Select a folder</title>
<link href="style/UIStyle.css?${rnd}" rel="stylesheet" type="text/css" />
<link href="style/uictrl.css?${rnd}" rel="stylesheet" type="text/css" />
<link href="style/jqueryFileTree.css?${rnd}" rel="stylesheet" type="text/css" />
<script src="js/common/jquery.js?${rnd}" type="text/javascript" ></script>
<script src="js/common/util.js?${rnd}" type="text/javascript" ></script>
<script src="js/common/uictrl.js?${rnd}" type="text/javascript"></script>
<script src="js/controls/jqueryFileTree.js?${rnd}" type="text/javascript" ></script>
<style type="text/css">
	.PageTitle{
		position:absolute;
		width:100%;height:20px;
		text-align:center;
	}
	.PageBody{
		position:absolute;
		top:24px;left:2px;right:2px;bottom:50px;		
		overflow:auto;
		background:#ffffff;
	}
	.BtnPanel{
		position:absolute;
		bottom:4px;
		width:100%; height:40px;
		text-align:center;
	}
	.Btn{
		margin:12px;
	}
</style>
<script type="text/javascript">
	var $fileView;
	
	function init()
	{
		var rootdir = '${param.dir}';
		if(rootdir==''){
			rootdir = '/';
		}		
		$fileView = $('#PageBody');		
		$fileView.fileTree(
				{
					root: rootdir,
					expandSpeed: -1,
					collapseSpeed: -1,
					onlyFolder: true,
					script: 'getDirFiles'
				}, null);		
	}
	
	function mycancel(){
		//console.log(window.parent);
		<%if(request.getParameter("fnclose")!=null){%>
			<%=request.getParameter("fnclose")%>(0,null);			
		<%}%>		
	}
	function myok(){
		<%if(request.getParameter("fnclose")!=null){%>
		<%=request.getParameter("fnclose")%>(-1,$fileView.getFilePath());
	<%}%>
	}
</script>
</head>
<body onload="init()" style="height:100%;">

<div style="position:relative;width:100%;height:99%;">
	<div class="PageTitle"> 选择文件夹</div>
	<div id="PageBody" class="PageBody">
	</div>
	<div class="BtnPanel">
		<form name="frm">
		<input class="Btn" type="button" id="cancel" name="cancel" value="<s:text name='button.label.cancel'/>" onclick="mycancel()"/>
		<input class="Btn" type="button" id="ok" name="ok" value="<s:text name='button.label.ok'/>" onclick="myok()"/>
		</form>
	</div>
</div>

</body>
</html>