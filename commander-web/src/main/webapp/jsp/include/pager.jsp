<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="pagination">
	<s:if test="pager.getPageCount()>1">
		<s:bean name="com.arcsoft.commander.common.query.PageHelper" id="pageHepler">
			<s:param name="curPage" value="%{pager.pageIndex}"></s:param>
			<s:param name="pageTotalCount" value="%{pager.getPageCount()}"></s:param>
			<s:param name="navigatePageCount" value="3"></s:param>
		</s:bean>
		<%/** use hideFocus to disabled solid border of a tag in IE */ %>
			<a id="nav_pre" hideFocus class="<s:if test="pager.pageIndex > 1">nav_pre</s:if><s:else>nav_pre_disable</s:else>"></a>
			<s:if test="pager.pageIndex!=1">
			<a class="nav_page" index="1" href="javascript:void(0)" hideFocus>1</a>
			</s:if>
			<s:if test="#pageHepler.leftDotEnabled">
				<span>...</span>
			</s:if>
			<s:iterator value="#pageHepler.left">
				<a index=<s:property/>	class="nav_page" href="javascript:void(0)" hideFocus>
							<s:property/>
				</a>
			</s:iterator>
			<a index="<s:property value="#pageHepler.curPage"/>"
					class="nav_page active" href="javascript:void(0)" hideFocus>
					<s:property value="#pageHepler.curPage"/>
			</a>
			<s:iterator value="#pageHepler.right">
				<a index=<s:property/> class="nav_page" href="javascript:void(0)" hideFocus><s:property/></a>
			</s:iterator>
			<s:if test="#pageHepler.rightDotEnabled">
				<span>...</span>
			</s:if>
			<s:if test="pager.pageIndex!=pager.getPageCount()">
				<a class="nav_page"  index=<s:property value="pager.getPageCount()"/> href="javascript:void(0)" hideFocus><s:property value="pager.getPageCount()"/></a>
			</s:if>
			<a id="nav_next" href="javascript:void(0)" hideFocus class="<s:if test="pager.pageIndex<pager.getPageCount()">nav_next</s:if><s:else>nav_next_disable</s:else>"></a>
	</s:if>
	<s:if test="pager.getTotalRows()>0">
		<s:text name="pager.page.info">
			<s:param><input type="text" id="nav_pageindex" name="pager.pageIndex" value="${pager.pageIndex}"/></s:param>
			<s:param><input type="text" id="nav_pagesize" name="pager.pageSize" value="${pager.pageSize}"/></s:param>
			<s:param>${pager.totalRows}</s:param>
		</s:text>
	</s:if>
	<form style="display: none;" method="post" id="pagerForm" action="<s:url includeParams="none"/>">
		<input type="hidden" id="pageIndex" name="pager.pageIndex" value='<s:property value="%{pager.pageIndex}"/>'>
		<input type="hidden" id="pageSize" name="pager.pageSize" value='<s:property value="%{pager.pageSize}"/>'>
		<input type="hidden" id="totalRows" value="<s:property value="pager.totalRows"/>"/>
		<input type="hidden" id="pageUrl" value='<s:url includeParams="none"/>'>
	</form>

</div>