<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>
<%
	jspContext.addJSRef("js/jquery.js");
	jspContext.addJSRef("js/jquery.extend.js");
	jspContext.addJSRef("js/settings/selectPort.js");
	jspContext.addCssRef("css/settings/selectport.css");
%>

<html>
<body background="#069">
	<table>
	<s:bean name="org.apache.struts2.util.Counter" id="rowCounter">
        <s:param name="first" value="1" />
        <s:param name="last" value="rowCount" />
        <s:iterator>  
              <tr>
              	<s:bean name="org.apache.struts2.util.Counter" id="colCounter">
              		<s:param name="first" value="1" />
       			 	<s:param name="last" value="colCount" />
       			 	 <s:iterator> 
       			 	 	<s:if test="%{(#rowCounter.current - 2) * colCount + #colCounter.current - 1 < portCount + 1}">
       			  			<td class="td_port" ondblclick="closePage(this);"><s:property value="(#rowCounter.current - 2) * colCount + #colCounter.current - 1"/></td>
       			  		</s:if>
       			  	</s:iterator>
       			</s:bean>
              </tr>
        </s:iterator>
     </s:bean>
	</table>
</body>
</html>