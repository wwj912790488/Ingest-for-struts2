<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<style>
.LineSelector {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 500px;
	height: 450px;	/*do not change*/
	background: #f0f0f0;
	border: 1px solid #ccc;
	border-radius: 4px 4px 4px 4px;
	box-shadow: 3px 3px 3px rgba(111,111,111,0.2);
	overflow: hidden;
	z-index:20100;'
}

.LineSelectorTitle {
	height: 20px;
	overflow: hidden;
	padding:6px 10px;
	font-size: 18px;
}

.LineSelectorContainer{
	height: 390px;
	overflow: auto;
	background: #fff;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
}

.LineSelectorBottom {
}

.LineSelectorItem {
	min-height: 28px;
	overflow: hidden;
	padding:2px 10px;
	font-size: 16px;
}

.LineSelectorItem:hover {
	color: #fff;
	background-color: #3b73af;
	cursor: pointer;
}

.ItemInput {
	width: 80px;
}

</style>

<div id="LineSelectorTmpl" class="LineSelector">
	<div class="LineSelectorTitle">LineSelector</div>
	<div class="LineSelectorContainer">
	</div>
	<div class="LineSelectorBottom"></div>
</div>

<div id="LineSelectorItemTmpl" data-key="" class="LineSelectorItem"><span class="ItemLabel"></span></div>

<div id="LineSelectorItemTmpl1" data-key="" class="LineSelectorItem">
	<span class="ItemLabel"></span>
	<input type="text" class="ItemInput"/>
	<span>x</span>
	<input type="text" class="ItemInput"/>
</div>

<div id="LineSelectorItemTmpl2" data-key="" class="LineSelectorItem">
	<span class="ItemLabel"></span>
	<input type="text" class="ItemInput"/>
	<span>:</span>
	<input type="text" class="ItemInput"/>
</div>
