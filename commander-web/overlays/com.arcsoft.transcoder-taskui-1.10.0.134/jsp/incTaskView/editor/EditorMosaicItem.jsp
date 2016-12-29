<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="MosaicItem">
	<span class="MosaicParam">
		<span><s:text name="editor.xpos" />:</span> 
		<span><s:property value='[0].imageX' /></span> 
	</span>	
	
	<span class="MosaicParam">
		<span class="TaskLabelText"><s:text name="editor.ypos" />:</span> 
		<span class="TaskLabelText"><s:property value='[0].imageY' /></span> 
	</span>
	
	<span class="MosaicParam">
		<span class="TaskLabelText"><s:text name="editor.width" />:</span>
		<s:property value='[0].imageWidth' />
	</span>
	
	<span class="MosaicParam">	
		<span><s:text name="editor.height" />:</span>
		<s:property value='[0].imageHeight' />
	</span>
	
	
	<span class="MosaicParam">
		<span><s:text name="editor.mosaic.type" />:</span>
		<s:text name='%{"mosaic.type." + [0].mosaicType}' />
	</span>
	
	<span class="MosaicParam">
		<span><s:text name="editor.granularity" />:</span>
		<s:property value='[0].grain' />
	</span>
	
	<span class="MosaicParam">
		<span><s:text name="editor.mosaic.time" />:</span>
		<s:property value='[0].start' />~<s:property value='[0].end' />
	</span>
	
	<span class="MosaicParam">
		<s:text name="%{[0].activeTime ? 'editor.enabled' :'editor.disabled'}" />		
	</span>

</div>