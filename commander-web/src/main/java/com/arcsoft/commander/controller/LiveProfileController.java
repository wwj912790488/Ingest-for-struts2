package com.arcsoft.commander.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.arcsoft.util.ConstantUtils;
import com.arcsoft.util.Pager;
import com.arcsoft.util.errorcode.ErrorCode;
import com.arcsoft.web4transcoder.controller.ControllerSupport;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.exception.AppException;
import com.arcsoft.web4transcoder.exception.ValidationException;
import com.arcsoft.web4transcoder.service.LiveProfileService;
import com.arcsoft.web4transcoder.service.parser.XmlParser;
import com.arcsoft.web4transcoder.service.validation.XmlValidator;
import com.arcsoft.web4transcoder.service.validation.validators.TransformableObjectValidator;

import javax.servlet.http.HttpServletResponse;

@Controller
public class LiveProfileController extends ControllerSupport {
	
	private final static String TYPE_LIVEPROFILE = "profile";	
	private final static String VIEW_SINGLE_LIVEPROFILE = "profile";
	private final static String VIEW_MULTI_LIVEPROFILE = "profiles";
	private final static String VIEW_LIST_LIVEPROFILE = "profilelist";
	
	private XmlValidator liveProfileXmlValidator = null;
	private XmlParser liveProfileXmlParser = null;
	private XmlParser liveProfilesXmlParser = null;
	private TransformableObjectValidator transformableObjectValidator = null;
	private LiveProfileService liveProfileService = null;
		
	public void setLiveProfileXmlValidator(XmlValidator liveProfileXmlValidator) {
		this.liveProfileXmlValidator = liveProfileXmlValidator;
	}
	
	public final void setLiveProfileXmlParser(XmlParser liveProfileXmlParser) {
		this.liveProfileXmlParser = liveProfileXmlParser;
	}
	
	public final void setLiveProfilesXmlParser(XmlParser liveProfilesXmlParser) {
		this.liveProfilesXmlParser = liveProfilesXmlParser;
	}
	
	public final void setTransformableObjectValidator(TransformableObjectValidator transformableObjectValidator) {
		this.transformableObjectValidator = transformableObjectValidator;
	}
	
	public final void setLiveProfileService(LiveProfileService liveProfileService) {
		this.liveProfileService = liveProfileService;
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/profile/{id}")
	public ModelAndView getLiveProfile(@PathVariable String id,HttpServletResponse response) {
		// logger.info("LiveProfileController.getLiveProfile: " + id);
		response.setContentType("application/xml;charset=UTF-8");
		
		ModelAndView mv = new ModelAndView();
		try {
			Integer liveProfileId = Integer.parseInt(id);
			
			LiveProfile liveProfile = liveProfileService.getLiveProfile(liveProfileId);
			if (liveProfile != null) {
				mv.setViewName(VIEW_SINGLE_LIVEPROFILE);
		        mv.addObject(ConstantUtils.MODEL, liveProfile);        
		        return mv;
			}
			
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, id);
			return mv;
		}
		catch (Exception e) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, id);			
			return mv;
		}
	}	
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/profile/{id}")
	public ModelAndView updateLiveProfile(@PathVariable String id, @RequestBody String liveProfileXml,HttpServletResponse response) {
		// logger.info("LiveProfileController.updateLiveProfile: " + id);
		response.setContentType("application/xml;charset=UTF-8");
		
		Integer liveProfileId = 0;
		ModelAndView mv = new ModelAndView();
		
		try {
			liveProfileId = Integer.parseInt(id);		
		}
		catch (NumberFormatException e) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, id);
			return mv;
		}
		
		LiveProfile liveProfile = liveProfileService.getLiveProfile(liveProfileId, false);
		if (liveProfile == null) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, id);
			return mv;
		}
		
		List<String> errors = new ArrayList<String>();
		if (liveProfileXml == null || liveProfileXml.trim().length() == 0 || !liveProfileXmlValidator.validate(liveProfileXml, errors)) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}
		
		// logger.info(liveProfileXml);
		liveProfile = (LiveProfile)this.liveProfileXmlParser.parse(liveProfileXml);
		
		try {
			transformableObjectValidator.validate(liveProfile);
		}
		catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}
		
		liveProfile.setId(liveProfileId);
		liveProfile = liveProfileService.updateLiveProfile(liveProfile);

		mv.setViewName(VIEW_SINGLE_LIVEPROFILE);
	    mv.addObject(ConstantUtils.MODEL, liveProfile);
		return mv;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/profile")
	public ModelAndView addLiveProfile(@RequestBody String liveProfileXml,HttpServletResponse response) {
		// logger.info("LiveProfileController.addLiveProfile");
		response.setContentType("application/xml;charset=UTF-8");
		
		ModelAndView mv = new ModelAndView();
		List<String> errors = new ArrayList<String>();
		
		if (liveProfileXml == null || liveProfileXml.trim().length() == 0 || !liveProfileXmlValidator.validate(liveProfileXml, errors)) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}

		// logger.info(liveProfileXml);
		LiveProfile liveProfile = (LiveProfile)this.liveProfileXmlParser.parse(liveProfileXml);
		
		try {
			transformableObjectValidator.validate(liveProfile);
		}
		catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}
		
		liveProfile = liveProfileService.saveLiveProfile(liveProfile);
		
		mv.setViewName(VIEW_SINGLE_LIVEPROFILE);
	    mv.addObject(ConstantUtils.MODEL, liveProfile);	    
		return mv;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/profile/{id}")
	public ModelAndView deleteLiveProfile(@PathVariable String id,HttpServletResponse response) {
		// logger.info("LiveProfileController.deleteLiveProfile: " + id);
		response.setContentType("application/xml;charset=UTF-8");
		
		Integer liveProfileId = 0;
		ModelAndView mv = new ModelAndView();
		
		try {
			liveProfileId = Integer.parseInt(id);		
		}
		catch (NumberFormatException e) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, id);
			return mv;
		}
		
		LiveProfile liveProfile = liveProfileService.getLiveProfile(liveProfileId, false);
		if (liveProfile == null) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, id);
			return mv;
		}
		
		try {
			liveProfileService.deleteLiveProfile(liveProfileId);
		} 
		catch (AppException e){
			if (e.getErrorCode() == ErrorCode.ERR_LIVEPORFILE_REFERENCED_BY_AUTOMATION){
				fillErrorModelAndView(mv, "The profile is in use by automation");
				return mv;
			}
		}
		catch (Exception e) {
			fillErrorModelAndView(mv, "Internal error!");
			return mv;
		}
		
		mv.setViewName(VIEW_SUCCESS);
		return mv;
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/profiles/{pageNo}")
	public ModelAndView getLiveProfiles(@PathVariable String pageNo,HttpServletResponse response) {
		// logger.info("LiveProfileController.getLiveProfiles: " + pageNo);
		response.setContentType("application/xml;charset=UTF-8");
		
		Integer pageIndex = 1;
		try {
			pageIndex = Integer.parseInt(pageNo);
			if (pageIndex <= 0) {
				pageIndex = 1;
			}
		}
		catch (NumberFormatException e) {
			pageIndex = 1;
		}
		
		Pager pager = liveProfileService.getLiveProfiles(true, pageIndex, pageSize);
		
		@SuppressWarnings("unchecked")
		List<LiveProfile> liveProfiles = (List<LiveProfile>)pager.getResult();
		Integer totalRows = (int)pager.getTotalRows();
		
		ModelAndView mv = new ModelAndView(VIEW_MULTI_LIVEPROFILE);
	    mv.addObject(ConstantUtils.MODELS, liveProfiles);
	    mv.addObject("currentPage", pageIndex);
	    mv.addObject("totalRows", totalRows);
	    mv.addObject("pageSize", pageSize);
	    mv.addObject("hasNextPage", (totalRows > pageIndex * pageSize));
	    
		return mv;
	}

	@RequestMapping(method=RequestMethod.POST, value="/api/profile/import")
	public ModelAndView importLiveProfiles(@RequestBody String liveProfilesXml,HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		List<String> errors = new ArrayList<String>();
		response.setContentType("application/xml;charset=UTF-8");
		
		if (liveProfilesXml == null || liveProfilesXml.trim().length() == 0) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}

		// logger.info(liveProfileXml);
		@SuppressWarnings("unchecked")
		List<LiveProfile> liveProfiles = (List<LiveProfile>)this.liveProfilesXmlParser.parse(liveProfilesXml);
		
		try {
			for (LiveProfile liveProfile : liveProfiles) {
				transformableObjectValidator.validate(liveProfile);
			}
		}
		catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}
		
		for (LiveProfile liveProfile : liveProfiles) {
			liveProfile = liveProfileService.saveLiveProfile(liveProfile);
		}
		
		mv.setViewName(VIEW_LIST_LIVEPROFILE);
	    mv.addObject(ConstantUtils.MODELS, liveProfiles);
		return mv;
	}

}
