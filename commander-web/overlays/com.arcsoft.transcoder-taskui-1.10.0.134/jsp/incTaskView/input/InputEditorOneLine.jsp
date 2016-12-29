<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.web4transcoder.domain.*" %>
<%@ page import="com.arcsoft.web4transcoder.domain.input.*" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%
if( request.getAttribute("input") != null )
{
	Input input = (Input)request.getAttribute("input");
%>

	<%
	boolean bMosaic = false;
	if(input.getMosaicInserters()!=null){
		for(MosaicInserter mi : input.getMosaicInserters()){
			//if(mi.getActiveTime()){
				bMosaic = true;
				break;
			//}
		}
	}
	%>
	<%if(bMosaic){%>
		<span class="OneLineEditorItem">
			<s:text name="editor.mosaic"/>
		</span>
	<%} %>
	
	<s:if test="#input.cropping.enabled">
		<span class="OneLineEditorItem">
			<s:text name="editor.cropping"/>	  
		</span>	
	</s:if>
	
	<s:if test="#input.timesliceClipping.enabled">
		<span class="OneLineEditorItem">
			<s:text name="editor.clipping"/>
		</span>	
	</s:if>
	
	<%
	boolean bAd = false;
	if(input.getAdvertisementInserter()!=null && input.getAdvertisementInserter().getClips()!=null){
		for(CandidateLocation c : input.getAdvertisementInserter().getClips()){
			//if(c.getCropping()){
				bAd = true;
				break;
			//}
		}
	}
	%>	
	<%if(bAd){%>
		<span class="OneLineEditorItem">
			<s:text name="editor.advertisement"/>
		</span>
	<%} %>
	
	<s:if test="#input.paddingImage!=null && #input.paddingImage !='' ">
		<span class="OneLineEditorItem">
			<s:text name="editor.padding_image"/>	  
		</span>	
	</s:if>						

	<s:if test="#input.audioDelay!=null && #input.audioDelay !=0 ">
		<span class="OneLineEditorItem">
			<s:text name="editor.audio_delay"/>	  
		</span>	
	</s:if>			



<%} %>
