package com.arcsoft.commander.controller;

import java.io.InputStream;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import com.arcsoft.web4transcoder.action.task.NewTaskAction;
import com.arcsoft.web4transcoder.domain.audio.AacSetting;
import com.arcsoft.web4transcoder.domain.audio.Ac3Setting;
import com.arcsoft.web4transcoder.domain.audio.AudioDescription;
import com.arcsoft.web4transcoder.domain.outputgroup.ArchiveGroupSetting;
import com.arcsoft.web4transcoder.domain.video.*;
import com.arcsoft.web4transcoder.service.translator.TransformableTranslator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.arcsoft.web4transcoder.controller.ControllerSupport;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.service.LiveProfileService;
import com.arcsoft.web4transcoder.service.parser.XmlParser;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

@Controller
public class SimpleProfileController extends ControllerSupport {
	
	private final static String TYPE_LIVEPROFILE = "profile";	
	private final static String VIEW_SINGLE_SIMPLEPROFILE = "simpleprofile";
//	private XmlValidator liveProfileXmlValidator = null;

	private XmlParser liveProfileXmlParser = null;
//	private TransformableObjectValidator transformableObjectValidator = null;
	private LiveProfileService liveProfileService = null;

	public void setLiveProfileXmlParser(XmlParser liveProfileXmlParser) {
		this.liveProfileXmlParser = liveProfileXmlParser;
	}

//	public final void setTransformableObjectValidator(TransformableObjectValidator transformableObjectValidator) {
//		this.transformableObjectValidator = transformableObjectValidator;
//	}
	
	public final void setLiveProfileService(LiveProfileService liveProfileService) {
		this.liveProfileService = liveProfileService;
	}

    @RequestMapping(method=RequestMethod.GET, value="/api/simpleprofile/{id}")
	public ModelAndView getSimpleProfile(@PathVariable String id,HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
        response.setContentType("application/xml;charset=UTF-8");
		try {
			Integer liveProfileId = Integer.parseInt(id);
			
			LiveProfile liveProfile = liveProfileService.getLiveProfile(liveProfileId);
			if (liveProfile != null) {
				SimpleProfile simpleProfile = new SimpleProfile();
                VideoDescription videoDescription = liveProfile.getStreamAssemblys().get(0).getVideoDescription();
                AudioDescription audioDescription = liveProfile.getStreamAssemblys().get(0).getAudioDescriptions().get(0);
                simpleProfile.setVideoCodec(videoDescription.getSettingsType());
                simpleProfile.setAudioCodec(audioDescription.getSettingsType());
                if(videoDescription.getWidth() == -1 && videoDescription.getHeight() == -1){
                    simpleProfile.setVideoResolution("跟随源");
                }else{
                    simpleProfile.setVideoResolution(videoDescription.getWidth()+"x"+videoDescription.getHeight());
                }

                if(videoDescription.getSettingsType().equals("H264")){
                    H264Setting h264 = (H264Setting)videoDescription.getVideoSetting();
                    if(h264.getParFollowSource()){
                        simpleProfile.setVideoPARDisp("跟随源");
                    }else{
                        simpleProfile.setVideoPARDisp(h264.getParNumerator()+":"+h264.getParDenominator());
                    }
                    if(h264.getFramerateFollowSource()){
                        simpleProfile.setVideoFrameRateDisp("跟随源");
                    }else{
                        simpleProfile.setVideoFrameRateDisp(getFrameRateDisp(h264.getFramerateNumerator()));
                    }
                    simpleProfile.setVideoRateControl(h264.getRateControlMode());
                    simpleProfile.setVideoBitrate(h264.getBitrate().toString());
                    simpleProfile.setVideoMaxBitrate(h264.getMaxBitrate().toString());
                    simpleProfile.setVideoGopSize(h264.getGopSize().toString());
                    simpleProfile.setVideoBFrame(h264.getGopNumBFrames().toString());
                    simpleProfile.setVideoReferenceFrame(h264.getNumRefFrames().toString());
                    simpleProfile.setQualityLevelDisp(h264.getQualityLevel().toString());
                }else if(videoDescription.getSettingsType().equals("H265")) {
                    H265Setting h265 = (H265Setting)videoDescription.getVideoSetting();
                    if(h265.getParFollowSource()){
                        simpleProfile.setVideoPARDisp("跟随源");
                    }else{
                        simpleProfile.setVideoPARDisp(h265.getParNumerator()+":"+h265.getParDenominator());
                    }
                    if(h265.getFramerateFollowSource()){
                        simpleProfile.setVideoFrameRateDisp("跟随源");
                    }else{
                        simpleProfile.setVideoFrameRateDisp(getFrameRateDisp(h265.getFramerateNumerator()));
                    }
                    simpleProfile.setVideoRateControl(h265.getRateControlMode());
                    simpleProfile.setVideoBitrate(h265.getBitrate().toString());
                    simpleProfile.setVideoMaxBitrate(h265.getMaxBitrate().toString());
                    simpleProfile.setVideoGopSize(h265.getGopSize().toString());
                    simpleProfile.setVideoBFrame(h265.getGopNumBFrames().toString());
                    simpleProfile.setVideoReferenceFrame(h265.getNumRefFrames().toString());
                    simpleProfile.setQualityLevelDisp(h265.getQualityLevel().toString());
                }else if(videoDescription.getSettingsType().equals("MPEG4")) {
                    Mpeg4Setting mpeg4 = (Mpeg4Setting)videoDescription.getVideoSetting();
                    if(mpeg4.getParFollowSource()){
                        simpleProfile.setVideoPARDisp("跟随源");
                    }else{
                        simpleProfile.setVideoPARDisp(mpeg4.getParNumerator()+":"+mpeg4.getParDenominator());
                    }
                    if(mpeg4.getFramerateFollowSource()){
                        simpleProfile.setVideoFrameRateDisp("跟随源");
                    }else{
                        simpleProfile.setVideoFrameRateDisp(getFrameRateDisp(mpeg4.getFramerateNumerator()));
                    }
                    simpleProfile.setVideoRateControl(mpeg4.getRateControlMode());
                    simpleProfile.setVideoBitrate(mpeg4.getBitrate().toString());
                    simpleProfile.setVideoGopSize(mpeg4.getGopSize().toString());
                }

                if(audioDescription.getSettingsType().equals("AAC")){
                    AacSetting aac = (AacSetting)audioDescription.getAudioSetting();
                    simpleProfile.setAudioChannel(aac.getChannels().toString());
                    simpleProfile.setAudioSampleRate(aac.getSampleRate().toString());
                    simpleProfile.setAudioVolumeMode(aac.getVolumeMode());
                    simpleProfile.setAudioBitrateKbps(getBitRateDisp(aac.getBitrate()));
                    simpleProfile.setAudioBoostLevel(aac.getBoostLevel().toString());
                    simpleProfile.setAudioChannelProcessing(aac.getChannelProcessing());
                    simpleProfile.setAudioCodecProfile(aac.getCodecProfile());
                    simpleProfile.setAudioDenoise(aac.getDenoise().toString());
                }else if(audioDescription.getSettingsType().equals("AC3")) {
                    Ac3Setting ac3 = (Ac3Setting)audioDescription.getAudioSetting();
                    simpleProfile.setAudioChannel(ac3.getChannels().toString());
                    simpleProfile.setAudioSampleRate(ac3.getSampleRate().toString());
                    simpleProfile.setAudioVolumeMode(ac3.getVolumeMode());
                    simpleProfile.setAudioBitrateKbps(getBitRateDisp(ac3.getBitrate()));
                    simpleProfile.setAudioBoostLevel(ac3.getBoostLevel().toString());
                    simpleProfile.setAudioChannelProcessing(ac3.getChannelProcessing());
                    simpleProfile.setAudioCodecProfile(ac3.getCodecProfile());
                    simpleProfile.setAudioDenoise(ac3.getDenoise().toString());
                }

                mv.addObject("simpleProfile", simpleProfile);
				mv.setViewName(VIEW_SINGLE_SIMPLEPROFILE);
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


	@RequestMapping(method=RequestMethod.POST, value="/api/simpleprofile")
	public ModelAndView addSimpleProfile(@RequestBody String simpleProfileXml,HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		List<String> errors = new ArrayList<>();
        response.setContentType("application/xml;charset=UTF-8");
		
		if (simpleProfileXml == null || simpleProfileXml.trim().length() == 0 ) {
			fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
			return mv;
		}
		
		try {
            JAXBContext jaxbContext = JAXBContext.newInstance(SimpleProfile.class);
            Unmarshaller marshaller = jaxbContext.createUnmarshaller();
            SimpleProfile simpleProfile = (SimpleProfile) marshaller.unmarshal(new StringReader(simpleProfileXml));

            InputStream is = NewTaskAction.class.getResourceAsStream("/resource/blanktemplates/profile.xml");
            LiveProfile liveProfile = (LiveProfile)this.liveProfileXmlParser.parse(is);

            VideoDescription videoDescription = liveProfile.getStreamAssemblys().get(0).getVideoDescription();
            if(simpleProfile.getVideoResolution().equals("跟随源")){
                videoDescription.setWidth(-1);
                videoDescription.setHeight(-1);
            }else{
                String[] res = simpleProfile.getVideoResolution().split("x");
                videoDescription.setWidth(Integer.parseInt(res[0]));
                videoDescription.setHeight(Integer.parseInt(res[1]));
            }

            if(simpleProfile.getVideoCodec().equals("H264")) {
                videoDescription.setSettingsType("H264");
                H264Setting h264Setting = new H264Setting();
                String[] par = simpleProfile.getVideoPARDisp().split(":");
                if(par.length > 1){
                    h264Setting.setParNumerator(Integer.parseInt(par[0]));
                    h264Setting.setParDenominator(Integer.parseInt(par[1]));
                    h264Setting.setParFollowSource(false);
                }else{
                    h264Setting.setParFollowSource(true);
                }
                String[] frame = getFrameRate(simpleProfile.getVideoFrameRateDisp()).split(":");
                if(frame.length > 1){
                    h264Setting.setFramerateNumerator(Integer.parseInt(frame[0]));
                    h264Setting.setFramerateDenominator(Integer.parseInt(frame[1]));
                    h264Setting.setFramerateFollowSource(false);
                }else{
                    h264Setting.setFramerateFollowSource(true);
                }
                h264Setting.setRateControlMode(simpleProfile.getVideoRateControl());
                h264Setting.setBitrate(Integer.parseInt(simpleProfile.getVideoBitrate()));
                if(simpleProfile.getVideoRateControl().equals("VBR")){
                    h264Setting.setMaxBitrate(Integer.parseInt(simpleProfile.getVideoMaxBitrate()));
                }
                h264Setting.setGopSize(Integer.parseInt(simpleProfile.getVideoGopSize()));
                h264Setting.setGopNumBFrames(Integer.parseInt(simpleProfile.getVideoBFrame()));
                h264Setting.setNumRefFrames(Integer.parseInt(simpleProfile.getVideoReferenceFrame()));
                h264Setting.setQualityLevel(Integer.parseInt(simpleProfile.getQualityLevelDisp()));
                h264Setting.setCodecProfile("High");
                h264Setting.setCodecLevelId(-1);
                h264Setting.setGopModeId(1);
                h264Setting.setInterlaceModeId(-1);
                h264Setting.setGopType(0);
                videoDescription.setVideoSetting(h264Setting);
            }
            else if(simpleProfile.getVideoCodec().equals("H265")){
                videoDescription.setSettingsType("H265");
                H265Setting h265Setting = new H265Setting();
                String[] par = simpleProfile.getVideoPARDisp().split(":");
                if(par.length>1){
                    h265Setting.setParNumerator(Integer.parseInt(par[0]));
                    h265Setting.setParDenominator(Integer.parseInt(par[1]));
                    h265Setting.setFramerateFollowSource(false);
                }else{
                    h265Setting.setFramerateFollowSource(true);
                }
                String[] frame = getFrameRate(simpleProfile.getVideoFrameRateDisp()).split(":");
                if(frame.length > 1){
                    h265Setting.setFramerateNumerator(Integer.parseInt(frame[0]));
                    h265Setting.setFramerateDenominator(Integer.parseInt(frame[1]));
                    h265Setting.setFramerateFollowSource(false);
                }else{
                    h265Setting.setFramerateFollowSource(true);
                }
                h265Setting.setFramerateNumerator(Integer.parseInt(frame[0]));
                h265Setting.setFramerateDenominator(Integer.parseInt(frame[1]));
                h265Setting.setRateControlMode(simpleProfile.getVideoRateControl());
                h265Setting.setBitrate(Integer.parseInt(simpleProfile.getVideoBitrate()));
                if(simpleProfile.getVideoRateControl().equals("VBR")){
                    h265Setting.setMaxBitrate(Integer.parseInt(simpleProfile.getVideoMaxBitrate()));
                }
                h265Setting.setGopSize(Integer.parseInt(simpleProfile.getVideoGopSize()));
                h265Setting.setGopNumBFrames(Integer.parseInt(simpleProfile.getVideoBFrame()));
                h265Setting.setNumRefFrames(Integer.parseInt(simpleProfile.getVideoReferenceFrame()));
                h265Setting.setQualityLevel(Integer.parseInt(simpleProfile.getQualityLevelDisp()));
                h265Setting.setCodecProfile("Auto");
                videoDescription.setVideoSetting(h265Setting);

            }else if (simpleProfile.getVideoCodec().equals("MPEG4")){
                videoDescription.setSettingsType("MPEG4");
                Mpeg4Setting mpeg4Setting = new Mpeg4Setting();
                String[] par = simpleProfile.getVideoPARDisp().split(":");
                if(par.length>1){
                    mpeg4Setting.setParNumerator(Integer.parseInt(par[0]));
                    mpeg4Setting.setParDenominator(Integer.parseInt(par[1]));
                    mpeg4Setting.setFramerateFollowSource(false);
                }else{
                    mpeg4Setting.setFramerateFollowSource(true);
                }
                String[] frame = getFrameRate(simpleProfile.getVideoFrameRateDisp()).split(":");
                if(frame.length > 1){
                    mpeg4Setting.setFramerateNumerator(Integer.parseInt(frame[0]));
                    mpeg4Setting.setFramerateDenominator(Integer.parseInt(frame[1]));
                    mpeg4Setting.setFramerateFollowSource(false);
                }else{
                    mpeg4Setting.setFramerateFollowSource(true);
                }
                mpeg4Setting.setFramerateNumerator(Integer.parseInt(frame[0]));
                mpeg4Setting.setFramerateDenominator(Integer.parseInt(frame[1]));
                mpeg4Setting.setRateControlMode(simpleProfile.getVideoRateControl());
                mpeg4Setting.setBitrate(Integer.parseInt(simpleProfile.getVideoBitrate()));
                mpeg4Setting.setGopSize(Integer.parseInt(simpleProfile.getVideoGopSize()));
                videoDescription.setVideoSetting(mpeg4Setting);

            }else{
                videoDescription.setPassthrough(true);
            }

            AudioDescription audioDescription = liveProfile.getStreamAssemblys().get(0).getAudioDescriptions().get(0);
            if(simpleProfile.getAudioCodec().equals("AAC")) {
                audioDescription.setSettingsType("AAC");
                AacSetting aacSetting = new AacSetting();
                aacSetting.setChannels(Integer.parseInt(simpleProfile.getAudioChannel()));
                aacSetting.setSampleRate(Integer.parseInt(simpleProfile.getAudioSampleRate()));
                aacSetting.setVolumeMode(simpleProfile.getAudioVolumeMode());
                aacSetting.setBitrate(getBitRateFromString(simpleProfile.getAudioBitrateKbps()));
                aacSetting.setBoostLevel(Integer.parseInt(simpleProfile.getAudioBoostLevel()));
                aacSetting.setChannelProcessing(simpleProfile.getAudioChannelProcessing());
                aacSetting.setCodecProfile(simpleProfile.getAudioCodecProfile());
                aacSetting.setDenoise((simpleProfile.getAudioDenoise().equals("true"))?1:0);
                audioDescription.setAudioSetting(aacSetting);

            }else if (simpleProfile.getAudioCodec().equals("AC3")){
                audioDescription.setSettingsType("AC3");
                Ac3Setting ac3Setting = new Ac3Setting();
                ac3Setting.setChannels(Integer.parseInt(simpleProfile.getAudioChannel()));
                ac3Setting.setSampleRate(Integer.parseInt(simpleProfile.getAudioSampleRate()));
                ac3Setting.setVolumeMode(simpleProfile.getAudioVolumeMode());
                ac3Setting.setBitrate(getBitRateFromString(simpleProfile.getAudioBitrateKbps()));
                ac3Setting.setBoostLevel(Integer.parseInt(simpleProfile.getAudioBoostLevel()));
                ac3Setting.setChannelProcessing(simpleProfile.getAudioChannelProcessing());
                ac3Setting.setCodecProfile(simpleProfile.getAudioCodecProfile());
                ac3Setting.setDenoise((simpleProfile.getAudioDenoise().equals("true"))?1:0);
                audioDescription.setAudioSetting(ac3Setting);

            }else{
                audioDescription.setPassthrough(true);
            }

            liveProfile.setName("FromAPI-" + System.currentTimeMillis());
            ArchiveGroupSetting archive = (ArchiveGroupSetting) liveProfile.getOutputGroups().get(0).getOutputGroupSetting();
            archive.setExtension("ts");

            TransformableTranslator.associate(liveProfile);
			//transformableObjectValidator.validate(liveProfile);
            liveProfile = liveProfileService.saveLiveProfile(liveProfile);

            mv.addObject("id",liveProfile.getId());
            mv.setViewName("simpleprofilesuccess");

		}catch(Exception e){
            errors.add(e.getMessage());
            fillErrorModelAndView(mv, TYPE_LIVEPROFILE, errors);
            return mv;
        }

		return mv;
	}

    private String getFrameRate(String frameratedisp){
        if(frameratedisp.equals("10")){
            return "10:1";
        }else if(frameratedisp.equals("15")) {
            return "15:1";
        }else if(frameratedisp.equals("23.976")) {
            return "24000:1001";
        }else if(frameratedisp.equals("24")) {
            return "24:1";
        }else if(frameratedisp.equals("25")) {
            return "25:1";
        }else if(frameratedisp.equals("29.97")) {
            return "30000:1001";
        }else if(frameratedisp.equals("30")) {
            return "30:1";
        }else if(frameratedisp.equals("50")) {
            return "50:1";
        }else if(frameratedisp.equals("59.94")) {
            return "60000:1001";
        }else if(frameratedisp.equals("60")) {
            return "60:1";
        }

        return "25:1";
    }

    private String getFrameRateDisp(Integer framerate){
        try{
            String ret = "25";
            switch(framerate){
                case 10:
                    ret = "10";
                    break;
                case 15:
                    ret = "15";
                    break;
                case 24000:
                    ret = "23.976";
                    break;
                case 24:
                    ret = "24";
                    break;
                case 25:
                    ret = "25";
                    break;
                case 30000:
                    ret = "29.97";
                    break;
                case 30:
                    ret = "30";
                    break;
                case 50:
                    ret = "50";
                    break;
                case 60000:
                    ret = "59.94";
                    break;
                case 60:
                    ret = "60";
                    break;
            }
            return ret;
        }catch(Exception e){
            return "25";
        }
    }

    private Integer getBitRateFromString(String BitrateKbps) {
        Integer ret;
        String[] bitrate = BitrateKbps.split("\\.");
        ret = Integer.parseInt(bitrate[0])*1000;
        if(bitrate.length>1){
            switch(bitrate[1].length()){
                case 1:
                    ret += Integer.parseInt(bitrate[1])*100;
                    break;
                case 2:
                    ret += Integer.parseInt(bitrate[1])*10;
                    break;
                case 3:
                    ret += Integer.parseInt(bitrate[1]);
                    break;
            }
        }

        return ret;
    }

    private String getBitRateDisp(Integer bitrate) {
        String retstr;
        retstr = ((Integer)(bitrate/1000)).toString();
        retstr += ".";
        if(bitrate%1000 != 0){
            retstr += ((Integer)(bitrate%1000/100)).toString();
        }else{
            retstr += "0";
        }

        return retstr;
    }
}
