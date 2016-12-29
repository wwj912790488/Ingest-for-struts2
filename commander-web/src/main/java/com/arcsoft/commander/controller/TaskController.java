package com.arcsoft.commander.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;

import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordTask;
import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;
import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.commander.service.record.RecordTaskService;
import com.arcsoft.commander.service.schedule.SchedulePersistentService;
import com.arcsoft.commander.util.DateFormatUtil;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.TransientDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerCapabilities;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskHttpGroupSettingAccessorEntry;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.util.ConstantUtils;
import com.arcsoft.web4transcoder.AppConfig;
import com.arcsoft.web4transcoder.controller.ControllerSupport;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.domain.Location;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.audio.AbstractAudioSetting;
import com.arcsoft.web4transcoder.domain.audio.AudioDescription;
import com.arcsoft.web4transcoder.domain.audio.AudioSetting;
import com.arcsoft.web4transcoder.domain.container.RtpOverEsSetting;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.input.InputBody;
import com.arcsoft.web4transcoder.domain.input.InputType;
import com.arcsoft.web4transcoder.domain.input.NetworkInput;
import com.arcsoft.web4transcoder.domain.output.LiveOutput;
import com.arcsoft.web4transcoder.domain.output.Preset;
import com.arcsoft.web4transcoder.domain.output.StreamAssembly;
import com.arcsoft.web4transcoder.domain.outputgroup.AppleLiveGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.ArchiveGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.HttpGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.RtmpGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.RtpGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.UdpGroupSetting;
import com.arcsoft.web4transcoder.domain.video.AbstractVideoSetting;
import com.arcsoft.web4transcoder.domain.video.VideoDescription;
import com.arcsoft.web4transcoder.domain.video.VideoSetting;
import com.arcsoft.web4transcoder.exception.ValidationException;
import com.arcsoft.web4transcoder.factory.OutputFactory;
import com.arcsoft.web4transcoder.factory.OutputGroupFactory;
import com.arcsoft.web4transcoder.service.LiveProfileService;
import com.arcsoft.web4transcoder.service.PresetService;
import com.arcsoft.web4transcoder.service.parser.XmlParser;
import com.arcsoft.web4transcoder.service.parser.ext.InputFile;
import com.arcsoft.web4transcoder.service.parser.ext.OutputFile;
import com.arcsoft.web4transcoder.service.parser.ext.Profile;
import com.arcsoft.web4transcoder.service.parser.ext.TaskExt;
import com.arcsoft.web4transcoder.service.validation.XmlValidator;
import com.arcsoft.web4transcoder.service.validation.validators.TransformableObjectValidator;
import com.arcsoft.web4transcoder.type.TaskStatus;

import static com.arcsoft.commander.controller.ApiErrorCode.*;
import static com.arcsoft.commander.controller.ControllerUtils.*;
import static com.arcsoft.commander.controller.ControllerUtils.createModelMap;

@Controller
public class TaskController extends ControllerSupport {
	private Logger log = Logger.getLogger(TaskController.class);
	
	public static final int SELECT_SERVER_MODE_DEFAULT    = 0; // Get the first available server
	public static final int SELECT_SERVER_MODE_IDLEST     = 1;  // Get the idlest server
	public static final int SELECT_SERVER_MODE_RANDOM     = 2;  // Get the available server random 
	public static final int SELECT_SERVER_MODE_RANDOM_EXT = 3;  // Get the available server random ext
	private int selectServerMode = SELECT_SERVER_MODE_RANDOM;
	
	private final static String TYPE_TASK = "task";
	private final static String VIEW_SINGLE_TASK = "task";
	private final static String VIEW_MULTI_TASK = "tasks";
	private final static String VIEW_LIST_TASK = "tasklist";
	private final static String VIEW_TASK_PROGRESS = "progress";
	private final static String SIGNAL_SWITCH_MODE = "signal";
	
	private ServerService serverService = null;
	private XmlValidator taskXmlValidator = null;
	private TaskExecuteService taskExecuteService;
	private CustomTaskService taskService = null;
	private TransformableObjectValidator transformableObjectValidator = null;
	private XmlParser taskXmlParser = null;
	private XmlParser tasksXmlParser = null;
	private RecordTaskService recordTaskService;
	private RecordInfoService recordInfoService;
	private SchedulePersistentService schedulePersistentService;

	private XmlValidator taskExtXmlValidator = null;
	private XmlParser taskExtXmlParser = null;
	private LiveProfileService liveProfileService = null;
	private PresetService presetService;
	private OutputGroupFactory outputGroupFactory;
	private OutputFactory outputFactory;

	public void setSelectServerMode(Integer selectServerMode) {
		if (selectServerMode != null) {
			this.selectServerMode = selectServerMode;
		}
	}


	public void setRecordTaskService(RecordTaskService recordTaskService) {
		this.recordTaskService = recordTaskService;
	}

	public void setRecordInfoService(RecordInfoService recordInfoService) {
		this.recordInfoService = recordInfoService;
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setTaskXmlValidator(XmlValidator taskXmlValidator) {
		this.taskXmlValidator = taskXmlValidator;
	}
	
	public final void setTaskXmlParser(XmlParser taskXmlParser) {
		this.taskXmlParser = taskXmlParser;
	}
	
	public final void setTasksXmlParser(XmlParser tasksXmlParser) {
		this.tasksXmlParser = tasksXmlParser;
	}
	
	public final void setTransformableObjectValidator(TransformableObjectValidator transformableObjectValidator) {
		this.transformableObjectValidator = transformableObjectValidator;
	}

	public void setSchedulePersistentService(SchedulePersistentService schedulePersistentService) {
		this.schedulePersistentService = schedulePersistentService;
	}

	public final void setTaskService(CustomTaskService taskService) {
		this.taskService = taskService;
	}

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}
	
	public void setTaskExtXmlValidator(XmlValidator taskExtXmlValidator) {
		this.taskExtXmlValidator = taskExtXmlValidator;
	}

	public void setTaskExtXmlParser(XmlParser taskExtXmlParser) {
		this.taskExtXmlParser = taskExtXmlParser;
	}
	
	public void setLiveProfileService(LiveProfileService liveProfileService) {
		this.liveProfileService = liveProfileService;
	}
	
	public void setPresetService(PresetService presetService) {
		this.presetService = presetService;
	}
	
	public void setOutputGroupFactory(OutputGroupFactory outputGroupFactory) {
		this.outputGroupFactory = outputGroupFactory;
	}

	public void setOutputFactory(OutputFactory outputFactory) {
		this.outputFactory = outputFactory;
	}

	@RequestMapping(method = RequestMethod.POST, value = "api/task/overtime")
	@ResponseBody
	public Map<String, Object> addTimeSchedule(
			@RequestParam(value = "id") Integer id,
			@RequestParam(value = "endtime") String endtime) {
		try {
			if (id == null || endtime == null) {
				return createModelMap(INVALID_ARGUMENT, "Id must be args");
			}

			RecordTask recordTask = recordTaskService.getRecordTaskById(id);
			if (recordTask != null) {
				RecordInfo recordInfo = recordInfoService.get(recordTask.getRecordId());
				if (recordInfo != null) {
					Schedule schedule = recordInfo.getSchedule();
					ScheduleEvent scheduleEvent = schedulePersistentService.getEvent(recordTask.getScheduleEventId());
					//last one
					ScheduleTrigger scheduleTrigger = scheduleEvent.getTriggers().get(scheduleEvent.getTriggers().size()-1);
					if (scheduleTrigger.getTriggered() == true) {
						return createModelMap(RECORD_NOT_EXIST, "triggered is go on");
					} else {
						schedule.setEndTime(Time.valueOf(DateFormatUtil.DatetimeToString2(DateFormatUtil.StringToDatetime(endtime))));
						scheduleTrigger.setScheduleTime(Timestamp.valueOf(endtime));
						schedulePersistentService.updateThisTriggered(scheduleTrigger);
						schedulePersistentService.update(schedule);
						Map<String, Object> model = createSuccessMap();
						model.put("id", id);
						return model;
					}

				} else {
					return createModelMap(RECORD_NOT_EXIST, "recordInfo is null");
				}
			}else {
				return createModelMap(RECORD_NOT_EXIST, "recordTask is null");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return createModelMap(UNKNOWN_ERROR, "query faild");
		}

	}

    @RequestMapping(method=RequestMethod.GET, value="/api/task/{id}")
    @ResponseBody
    public Map<String, Object> getTask(@PathVariable String id) {
        log.info("TaskController.getTask: " + id);

        Map<String, Object> model = createSuccessMap();
        try {
            Integer taskId = Integer.parseInt(id);

            Task task = taskService.getTask(taskId, true);
            if (task != null) {
                model.put("task",task);
                return model;
            }

            return createModelMap(TASK_NOT_EXIST, "Query task(id=%d) failed.", id);
        }
        catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Query task(id=%d) failed.", id);
        }
    }

    //ToDo:
    @RequestMapping(method=RequestMethod.GET, value="/api/task/{id}/progress")
	public ModelAndView getTaskProgress(@PathVariable String id, HttpServletResponse response) {
		log.info("TaskController.getTaskProgress: " + id);

		String[] idarr = id.trim().split(",");

		ModelAndView mv = new ModelAndView();

		for(int i=0; i<idarr.length; i++){
			try {
				Integer taskId = Integer.parseInt(idarr[i]);
				Task task = taskService.getTask(taskId, true);
				if (task == null) {
					fillErrorModelAndView(mv, TYPE_TASK, idarr[i]);
					return mv;
				}
			} catch (Exception e) {
				fillErrorModelAndView(mv, TYPE_TASK, idarr[i]);
				return mv;
			}
		}

		String xml = null;
		try {
			Document progressList = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
			Element results = progressList.createElement("results");

			for (int i = 0; i < idarr.length; i++) {
				Document progressInfo = taskExecuteService.getTaskProgress(Integer.decode(idarr[i]));
				results.appendChild(progressList.importNode(progressInfo.getDocumentElement(), true));
			}
			progressList.appendChild(results);

			xml = XmlHelper.saveAsString(progressList, "UTF-8");
			response.addHeader("Content-Type", "text/html;charset=utf-8");
			response.getOutputStream().write(xml.getBytes());
		} catch (Exception e) {
			fillErrorModelAndView(mv, TYPE_TASK, "-1");
			response.setContentType("application/xml;charset=UTF-8");
			return mv;
		}
		return null;
	}

    //ToDo:
	@RequestMapping(method=RequestMethod.GET, value="/api/task/{id}/progress_thumb")
	public ModelAndView getTaskProgressThumb(@PathVariable String id, 
			HttpServletRequest request, HttpServletResponse response) {
		log.info("TaskController.getTaskProgressThumb: " + id);
		int width = 64;
		try {
			String sw = request.getParameter("width");
			if (sw != null && sw.length() > 0) {
				try {
					int w = Integer.decode(sw);
					if (w > 0 && w < 4096) {
						width = w;
					}
				} catch (Exception e) {
					log.error(null, e);
				}
			}

			response.setContentType("image/jpeg");
			ServletOutputStream out = response.getOutputStream();

			byte[] buf = taskExecuteService.getTaskThumbnail(Integer.parseInt(id), width);
			if (buf == null) {
				try {
					Thread.sleep(3000);
				} catch (Exception e) {
					log.error(null, e);
				}
				buf = taskExecuteService.getTaskThumbnail(Integer.parseInt(id), width);
			}
			if (buf == null) {
				String url = "/images/progress_thumb_waiting.jpg";
				String f = request.getServletContext().getRealPath(url);
				InputStream ins = new FileInputStream(f);
				try {

					byte[] buf1 = new byte[8096];
					int len;
					while ((len = ins.read(buf1)) != -1) {
						out.write(buf1, 0, len);
					}
					out.flush();

				} catch (Exception e) {
					log.error(null, e);
				} finally {
					ins.close();
				}
			}

			if (buf != null) {
				out.write(buf, 0, buf.length);
				out.flush();
			}

		} catch (Exception e) {
			log.error(null, e);
		}
		return null;
	}

    //ToDo:
	@RequestMapping(method=RequestMethod.PUT, value="/api/task/{id}")
	public ModelAndView updateTask(@PathVariable String id, @RequestBody String taskXml,HttpServletResponse response) {
		log.info("TaskController.updateTask: " + id);
		
		ModelAndView mv = new ModelAndView();
		response.setContentType("application/xml;charset=UTF-8");

		Integer taskId = 0;
		try {
			taskId = Integer.parseInt(id);
		} catch (NumberFormatException e) {
			fillErrorModelAndView(mv, TYPE_TASK, id);
			return mv;
		}

		CommanderTask task1 = (CommanderTask) taskService.getTask(taskId, false);
		if (task1 == null) {
			fillErrorModelAndView(mv, TYPE_TASK, id);
			return mv;
		}

		String guid = task1.getUserData();

		TaskStatus st = getTaskRealtimeStatus(taskId);
		if (st == null) {
			fillErrorModelAndView(mv, TYPE_TASK, id);
			return mv;
		}

		if (TaskStatus.WAITING.equals(st) || TaskStatus.RUNNING.equals(st) || TaskStatus.STOPPING.equals(st)) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "it needs to stop the task first!" }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}

		List<String> errors = new ArrayList<String>();
		if (taskXml == null || taskXml.trim().length() == 0 || !taskXmlValidator.validate(taskXml, errors)) {
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		// log.info(taskXml);
		Task task = (Task) this.taskXmlParser.parse(taskXml);

		try {
			transformableObjectValidator.validate(task);
		} catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		BeanUtils.copyProperties(task, task1);
		task1.setId(taskId);
		task1.setUserData(guid);
		task = taskService.updateTask(task1);

		mv.setViewName(VIEW_SINGLE_TASK);
		mv.addObject(ConstantUtils.MODEL, task);
		return mv;
	}

    //ToDo:
	@RequestMapping(method=RequestMethod.POST, value="/api/task/description/{id}")
	public ModelAndView updateTaskDescription(@PathVariable String id, @RequestBody String taskXml,HttpServletResponse response) {
		log.info("Task: " + id);
		
		ModelAndView mv = new ModelAndView();
		response.setContentType("application/xml;charset=UTF-8");

		try {
			Integer taskId = Integer.parseInt(id);
			Task task = taskService.getTask(taskId, false);
			if (task == null) {
				throw new Exception("Task is not found " + taskId);
			}
			
			XmlHelper helper = new XmlHelper(new StringReader(taskXml));
			String desc = helper.getNodeText("task/description");
			if(desc == null) {
				throw new Exception("Task description is not found " + taskId);
			}
			
			task.setDescription(desc);
			taskService.updateTaskStatus(task);
			
			mv.setViewName(VIEW_SUCCESS);
		}
		catch (Exception e) {
			String msg = e.getMessage();
			if(msg == null) {
				msg = e.toString();
			}
			fillErrorModelAndView(mv, msg);
			return mv;
		}
		
		return mv;
	}

    //ToDo:
	@RequestMapping(method = RequestMethod.POST, value = "/api/task")
	public ModelAndView addTask(@RequestBody String taskXml,HttpServletResponse response) {
		log.info("TaskController.addTask");

		ModelAndView mv = new ModelAndView();
		response.setContentType("application/xml;charset=UTF-8");
		List<String> errors = new ArrayList<String>();

		if (taskXml == null || taskXml.trim().length() == 0 || !taskXmlValidator.validate(taskXml, errors)) {
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		// log.info(taskXml);
		Task task = (Task) this.taskXmlParser.parse(taskXml);
		try {
			transformableObjectValidator.validate(task);
		} catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		int hdCount = 0, sdCount = 0, passCount = 0;
		List<LiveOutputGroup> outputGroups = task.getOutputGroups();
		for (LiveOutputGroup outputGroup : outputGroups) {
			List<LiveOutput> outputs = outputGroup.getLiveOutputs();
			for (LiveOutput output : outputs) {
				if (output.getStreamAssembly().getVideoDescription() == null)
					continue;
				
				if (output.getStreamAssembly().getVideoDescription().getPassthrough()) {
					passCount++;
				} else {
					if (output.getStreamAssembly().getVideoDescription().getHeight() >= 720) {
						hdCount++;
					} else {
						sdCount++;
					}
				}
			}
		}
		Server server = getAvaliableServer(outputGroups.size(), hdCount, sdCount, passCount);
		if (server == null) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "There is no avaliable server" }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		CommanderTask task1 = new CommanderTask();
		BeanUtils.copyProperties(task, task1);
		task1.setType(server.getGroup().getType());
		task1.setGroupId(server.getGroup().getId());
		task1.setCurServerId(server.getId());

		task = taskService.saveTask(task1);

		mv.setViewName(VIEW_SINGLE_TASK);
		mv.addObject(ConstantUtils.MODEL, task);
		return mv;
	}

	/**
	 * Get profile by name.
	 */
	private Integer getProfileByName(String name) {
		List<LiveProfile> profiles = liveProfileService.getAllLiveProfiles(false);
		if (profiles != null && !profiles.isEmpty()) {
			for (LiveProfile profile : profiles) {
				if (profile.getName().equalsIgnoreCase(name))
					return profile.getId();
			}
		}
		return null;
	}

	private List<Preset> GetPresets(SmsOutput smsOutput) {
		List<Preset> presets = null;
		
		if (smsOutput != null) {
			if (smsOutput.isPassthrough() == true) {
				presets = presetService.getPresets("passthrough", true);
			} else {
				if (smsOutput.getVcodec() == null && smsOutput.getAcodec() == null)
					return null;
				
				List<String> presetNames = new ArrayList<String>();
				boolean hasVideo = false;
				boolean hasAudio = false;
				
				// init preset name list
				String vcodec = smsOutput.getVcodec();
				if (vcodec == null || vcodec.isEmpty()) {
					presetNames.add("bitrate_acodec");
					presetNames.add("0_acodec");
				} else {
					hasVideo = true;
					
					String acodec = smsOutput.getAcodec();
					String amatcher = "_acodec";
					if (acodec == null || acodec.isEmpty()) {
						amatcher = "";
					} else {
						hasAudio = true;
					}
					presetNames.add("bitrate_width*height_vcodec" + amatcher);
					presetNames.add("0_width*height_vcodec" + amatcher);
					presetNames.add("bitrate_0*height_vcodec" + amatcher);
					presetNames.add("0_0*height_vcodec" + amatcher);
					presetNames.add("bitrate_width*0_vcodec" + amatcher);
					presetNames.add("0_width*0_vcodec" + amatcher);
				}
				
				// create the real preset name list
				for (int i = 0; i < presetNames.size(); i++) {
					String presetName = presetNames.get(i);
					
					String bitrate = "0";
					if (smsOutput.getBitrate() > 0)
						bitrate = Integer.toString(smsOutput.getBitrate());
					presetName = presetName.replaceFirst("bitrate", bitrate);
	
					if (hasVideo) {
						String width = "0";
						String height = "0";
						if (smsOutput.getWidth() > 0)
							width = Integer.toString(smsOutput.getWidth());
						if (smsOutput.getHeight() > 0)
							height = Integer.toString(smsOutput.getHeight());
						
						presetName = presetName.replaceFirst("width", width);
						presetName = presetName.replaceFirst("height", height);
						presetName = presetName.replaceFirst("vcodec", smsOutput.getVcodec());
					}
					if (hasAudio) {
						presetName = presetName.replaceFirst("acodec", smsOutput.getAcodec());
					}
					presetNames.set(i, presetName);
				}
	
				// set the process result
				smsOutput.setHasVideo(hasVideo);
				smsOutput.setHasAudio(hasAudio);
	
				// get presets
				for (int ipreset = 0; ipreset < presetNames.size(); ipreset++) {
					if (log.isInfoEnabled())
						log.info("[RestAPI] check exist of preset template: " + presetNames.get(ipreset));
					
					presets = presetService.getPresets(presetNames.get(ipreset), true);
					if (presets != null && presets.isEmpty() == false) {
						if (log.isInfoEnabled())
							log.info("[RestAPI] Use preset template: " + presetNames.get(ipreset));
						
						// set the process result
						if ((ipreset %2) == 1) // bitrate is zero
							smsOutput.setBitrateReset(true);
						else
							smsOutput.setBitrateReset(false);
						
						if (hasVideo) {
							if (ipreset == 2 || ipreset == 3) // width is zero
								smsOutput.setWidthReset(true);
							else
								smsOutput.setWidthReset(false);
		
							if (ipreset == 4 || ipreset == 5) // height is zero
								smsOutput.setHeightReset(true);
							else
								smsOutput.setHeightReset(false);
						}
						break;
					}
				}
				
				if (smsOutput.getFrameRateDenominator() != null && smsOutput.getFrameRateDenominator() > 0 &&
					smsOutput.getFrameRateNumerator() != null && smsOutput.getFrameRateNumerator() > 0) {
					smsOutput.setFrameReset(true);
				}
				
				if (smsOutput.getGopSize() != -1) {
					smsOutput.setGopSizeReset(true);
				}
			}
		} else {
			if (log.isInfoEnabled())
				log.info("Invalid smsoutput parameters");
		}
		return presets;
	}
	
	private int CalcMaxBitrate(int bitrate) {
		//float maxBitrateFactorMin = 1.0f;
		//float maxBitrateFactorMax = 5.0f;
		//float maxBitrateFactorRecommand = 3.0f;
		float maxBitrateFactorRecommand = 1.25f;
		return (int) Math.floor(bitrate * maxBitrateFactorRecommand);
	};
	
	private int CalcVBVSize(int bitrate) {
		//float vbvSizeFactorMin = 0.05f;
		//float vbvSizeFactorMax = 20.0f;
		//float vbvSizeFactorRecommand = 1.0f;
		float vbvSizeFactorRecommand = 2.0f;

		// min = Math.ceil(bitrate * vbvSizeFactorMin / 8);
		// max = Math.ceil(bitrate * vbvSizeFactorMax / 8);
		//return (int) Math.ceil(bitrate * vbvSizeFactorRecommand / 8);
		return (int) Math.ceil(bitrate * vbvSizeFactorRecommand / 8);
	};
	
	private int CalcVBVDelay(int bitrate, int vbvSize) {
		//int vbvDelayMin = 48;
		int vbvDelayMax = (int) Math.floor(vbvSize * 8 * 1000 / bitrate);
		int vbvDelayRecommand = vbvDelayMax;
		return vbvDelayRecommand;
	};
	
	// add task by template
	// url:/api/addtaskex
	// method: post
	// task parameters: xml
	// add parameter "?start=true": 添加任务后自动启动
	/* 1. 需要添加任务模板(基于输入，输出随便设置)：udp, http, rtmp, rtsp, rtp
	 *    命名不可改，
	 * 2. rtp输入url为了容易识别，需要在路径前加上rtp:/
	 *    如：rtp://mnt/data/local-disk1/
	 *    创建任务是会把"rtp:/"去掉
	 *    rtp输出默认video端口:5540;默认audio端口5542
	 * 3. 根据需求添加相应的流模板
	 *    (a) 视频+音频：
	 *        ${bitrate}_${resolution}_${vcodec}_${acodec}
	 *        例如：500_704*576_h264_aac
	 *    (b) 纯音频输出:
	 *        ${bitrate}_${acodec}
	 *        例如：192_aac
	 *    (c) 纯视频输出:
	 *        ${bitrate}_${resolution}_${vcodec}
	 *        例如：500_704*576_h264
	 *    (d) 如果某个值不随源则该值为0，如bitrate随源
	 *        0_1920*1080_h264_aac
	 *    (e) 如果需要支持passthrough，需要建一个passthrough的流模板
	 *        passthrough
	 * 4. only support network input
	 *     udp://
	 *     http://
	 *     rtmp://
	 *     rtsp://
	 *     rtp://
	 * 5. support output format 
	 *     1: 归档文件(MPEG-2)
	 *     2: 归档文件(MPEG-4)
	 *     3: Apple Live
	 *     4: RTMP(Flash)
	 *     5: UDP(TSOverUDP)
	 *     6: RTP(ESOverRTPP)
	 *     7: HTTP(TSOverHTTP)
	 *     8: HTTP(FLVOverHTTP)
	 *     9: HTTP(MP3OverHTTP)
	 * 6. 增加参数start可以添加任务后自动重启
	 * 7. 返回任务ID
	 */
	/*
	 * <?xml version="1.0" encoding="UTF-8"?>
	 * <request>
	 *    <name>xxxx</name>
	 *    <!-- 必填，输入地址 -->
	 *    <url>rtmp://test.com:1935/live/stream</url>
	 *    <!-- 如果是udp mpts，必填 -->
	 *    <pid></pid>
	 *    <!-- output -->
	 *    <output>
	 *       <!-- item 支持多个，表示一进多出 -->
	 * 	     <item>
	 *          <!-- 输出类型，必填 -->
	 *          <!--  1: 归档文件(MPEG-2) -->
	 *          <!--  2: 归档文件(MPEG-4) -->
	 *          <!--  3: Apple Live -->
	 *          <!--  4: RTMP(Flash) -->
	 *          <!--  5: UDP(TSOverUDP) -->
	 *          <!--  6: RTP(ESOverRTP) -->
	 *          <!--  7: HTTP(TSOverHTTP) -->
	 *          <!--  8: HTTP(FLVOverHTTP) -->
	 *          <!--  9: HTTP(MP3OverHTTP) -->
	 *          <!--   : MS Streaming(MSS) -->
	 *          <type>2</type>
	 *          <!-- 输出地址，必填 -->
	 *          <!-- http输出地址为一个字符串(要保证每个任务不同,不要有特殊字符，例如时间戳154665646) -->
	 *          <!--     ts -最终输出格式为: http://集群ip/ts/154665646) -->
	 *          <!--     flv-最终输出格式为: http://集群ip/flv/154665646) -->
	 *          <!--     mp3-最终输出格式为: http://集群ip/mp3/154665646) -->
	 *          <!-- rtp输出地址格式如下: rtp://123.123.123.13:5555 -->
	 *          <out>rtmp://test.com:1935/live/stream_500k</out>
	 *          <!-- passthrough -->
	 *          <passthrough>0</passthrough>
	 *          <!-- 视频格式，目前仅支持 h264 -->
	 *          <!-- 纯音频输出时移除该项 -->
	 *          <!-- passthrough时忽略-->
	 *          <vcodec>h264</vcodec>
	 *          <!-- 音频格式，必填，目前仅支持 aac -->
	 *          <!-- 纯视频输出时移除该项 -->
	 *          <!-- passthrough时忽略-->
	 *          <acodec>aac</acodec>
	 *          <!-- 视频分辨率，如果为空时则表示和输入的分辨率一致 -->
	 *          <!-- 纯音频输出时移除该项 -->
	 *          <!-- passthrough时忽略-->
	 *          <resolution>704*572</resolution>
	 *          <!-- 视频码率，单位: kbps -->
	 *          <!-- 纯音频输出时，该项为音频码率-->
	 *          <!-- passthrough时忽略-->
	 *          <bitrate>500</bitrate>
	 *          <!-- video rate control -->
	 *          <!-- bitrate有效时vrc才会生效 -->
	 *          <!--    0: VBR -->
	 *          <!--    1: CBR -->
	 *          <!--    2: ABR -->
	 *          <!-- passthrough时忽略-->
	 *          <vrc>1</vrc>
	 *          <!-- 视频帧率，如果为空时则表示和输入的帧率一致 -->
	 *          <!-- 格式Numerator/Denominator -->
	 *          <!-- 如24帧用24000/1000表示 -->
	 *          <!-- 29.97帧用30000/1001表示-->
	 *          <!-- 纯音频输出时移除该项 -->
	 *          <!-- passthrough时忽略-->
	 *          < framerate >30000/1000</framerate>
	 *          <!-- GOP size -->
	 *          <!-- passthrough时忽略-->
	 *          <gopsize>30</gopsize>
	 *          <!-- rtp输出设置 -->
	 *          <!-- 非rtp输出不填 -->
	 *          <esvideoport>5540</esvideoport>
	 *          <esaudioport>5542</esaudioport>
	 *          <!-- rtp sdp path -->
	 *          <!-- 非rtp输出不填 -->
	 *          <sdp>/mnt/data/local-disk1/test/test.sdp</sdp>
	 *       </item>
	 *    </output>
	 * </request>   
	 */
    //ToDo:
	@RequestMapping(method = RequestMethod.POST, value = "/api/taskex")
	public ModelAndView addTaskEx(@RequestBody String requestXml, HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView();
		// parse xml
		XmlHelper helper;
		try {
			helper = new XmlHelper(new StringReader(requestXml));
		} catch (Exception e) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "create xml parser failed." }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		
		// get task name
		String taskName = null;
		try {
			taskName = helper.getNodeText("request/name");
			if (taskName != null)
				taskName = taskName.trim();
		} catch (Exception e) {
		}
		
		// get input url
		String requestUrl = null;
		try {
			requestUrl = helper.getNodeText("request/url");
			if (requestUrl != null)
				requestUrl = requestUrl.trim();
		} catch (Exception e) {
		}		
		if (requestUrl == null) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "invalid xml." }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}

		// check input url

		// get input pid
		Integer pid = null;
		String requestPid = null;
		try {
			requestPid = helper.getNodeText("request/pid");
			if (requestUrl != null)
				requestPid = requestPid.trim();
		} catch (Exception e) {
		}		
		if (requestPid != null) {
			try {
				pid = Integer.parseInt(requestPid);
			} catch (Exception e) {
				mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "invalid pid." }));
				mv.setViewName(VIEW_ERROR);
				return mv;
			}
		}
		
		// find profile
		String profileName;
		if (requestUrl.startsWith("udp://") == true) {
			profileName = "udp";
		} else if (requestUrl.startsWith("http://") == true) {
			profileName = "http";
		} else if (requestUrl.startsWith("rtsp://") == true) {
			profileName = "rtsp";
		} else if (requestUrl.startsWith("rtmp://") == true) {
			profileName = "rtmp";
		} else if (requestUrl.startsWith("rtp:/") == true) {
			profileName = "rtp";
			requestUrl = requestUrl.substring(5);
		} else {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "unsupport the input stream." }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		Integer profile = getProfileByName(profileName); // should create a task templete named with "common"
		if (profile == null) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "task template is not exist." }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}

		// parse output streams
		List<SmsOutput> smsOuputs = new ArrayList<>();
		String erstr = "";
		String field = "";
		String str = "";
		int i = 0;		
		try {
			NodeList outputList = helper.selectNodes("request/output/item");
			if (outputList == null || outputList.getLength() == 0) {
				if (log.isInfoEnabled())
					log.info("Invalid outputs: " + requestXml);
				mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "Invalid outputs." }));
				mv.setViewName(VIEW_ERROR);
				return mv;
			}
			for (i = 0; i < outputList.getLength(); i++) {
				Node item = outputList.item(i);
				SmsOutput smsOutput = new SmsOutput();
				// 1. parse output type
				field = "type";
				str = helper.getNodeText("type", item).trim();
				if (str == null || str.isEmpty()) {
					erstr = "Not existed: item " + i + " " + field;
					break;
				}
				int type = Integer.parseInt(str);
				if (type <= 0) {
					erstr = "Invalid ouptut type: item " + i + " " + field + "[" + str + "]";
					break;
				}
				smsOutput.setType(type);
								
				// 2. parse output url
				field = "out";
				str = helper.getNodeText("out", item).trim();
				if (str == null || str.isEmpty()) {
					erstr = "Not existed: item " + i + " " + field;
					break;
				}
				smsOutput.setUri(str);

				if (type == 6) {
					// 2. parse es video port
					field = "esvideoport";
					str = helper.getNodeText("esvideoport", item).trim();
					if (str == null || str.isEmpty()) {
						erstr = "Not existed: item " + i + " " + field;
						break;
					}
					int esVideoPort = Integer.parseInt(str);
					smsOutput.setEsVideoPort(esVideoPort);		

					// 2. parse es audio port
					field = "esaudioport";
					str = helper.getNodeText("esaudioport", item).trim();
					if (str == null || str.isEmpty()) {
						erstr = "Not existed: item " + i + " " + field;
						break;
					}
					int esAudioPort = Integer.parseInt(str);
					smsOutput.setEsAudioPort(esAudioPort);		
					
					// 2. parse rtp sdp path
					field = "sdp";
					str = helper.getNodeText("sdp", item).trim();
					if (str == null || str.isEmpty()) {
						erstr = "Not existed: item " + i + " " + field;
						break;
					}
					smsOutput.setSdp(str);
				}
				
				// 3. parse passthrough
				try {
					field = "passthrough";
					str = helper.getNodeText("passthrough", item).trim();
					if (str == null || str.isEmpty()) {
						erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
						break;
					}				
					int passthrough = Integer.parseInt(str);
					smsOutput.setPassthrough(passthrough > 0 ? true : false);
				} catch (NullPointerException e) {
					// node isn't existed
					smsOutput.setPassthrough(false);
				}

				if (!smsOutput.isPassthrough()) {
					// 4. parse video codec
					try {
						field = "vcodec";
						str = helper.getNodeText("vcodec", item).trim();
						if (str == null || str.isEmpty()) {
							erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
							break;
						}					
						smsOutput.setVcodec(str);
					} catch (NullPointerException e) {
						// node isn't existed
						smsOutput.setVcodec(null);
					}
					
					// 5. parse audio codec
					try {
						field = "acodec";
						str = helper.getNodeText("acodec", item).trim();
						if (str == null || str.isEmpty()) {
							erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
							break;
						}					
						smsOutput.setAcodec(str);
					} catch (NullPointerException e) {
						// node isn't existed
						smsOutput.setAcodec(null);
					}
					
					// 6. parse bitrate
					try {
						field = "bitrate";
						str = helper.getNodeText("bitrate", item).trim();
						if (str == null || str.isEmpty()) {
							erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
							break;
						}				
						int bitrate = Integer.parseInt(str);
						if (bitrate <= 0) { // remove passthrough
							erstr = "Invalid number format: item " + i + " " + field + "[" + str + "]";
							break;
						}
						smsOutput.setBitrate(bitrate);
					} catch (NullPointerException e) {
						// node isn't existed
						smsOutput.setBitrate(-1);
					}
					
					// 6.1. parse bitrate
					if (smsOutput.getBitrate() != -1) {
						try {
							field = "vrc";
							str = helper.getNodeText("vrc", item).trim();
							if (str == null || str.isEmpty()) {
								erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
								break;
							}
							int vrc = Integer.parseInt(str);
							if (vrc <= 0) {
								erstr = "Invalid number format: item " + i + " " + field + "[" + str + "]";
								break;
							}
							smsOutput.setVrc(vrc);
						} catch (NullPointerException e) {
							// node isn't existed
							smsOutput.setVrc(-1);
						}
					}
					
					// 7. parse resolution
					try {
						field = "resolution";
						str = helper.getNodeText("resolution", item).trim();
						if (str == null || str.isEmpty()) {
							erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
							break;
						}								
						String[] substrs = str.split("\\*");
						int width = Integer.parseInt(substrs[0].trim());
						int height = Integer.parseInt(substrs[1].trim());
						if (width < 0 || height < 0) {
							erstr = "Invalid number format: item " + i + " " + field + "[" + str + "]";
							break;
						}
						smsOutput.setWidth(width);
						smsOutput.setHeight(height);
					} catch (NullPointerException e) {
						// node isn't existed
						smsOutput.setWidth(-1);
						smsOutput.setHeight(-1);
					}
					
					// 8. parse frame rate
					try {
						field = "framerate";
						str = helper.getNodeText("framerate", item).trim();
						if (str == null || str.isEmpty()) {
							erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
							break;
						}
						String[] substrs = str.split("/");
						int frameRateNumerator = Integer.parseInt(substrs[0].trim());
						int frameRateDenominator = Integer.parseInt(substrs[1].trim());
						if (frameRateNumerator < 0 || frameRateDenominator < 0) {
							erstr = "Invalid number format: item " + i + " " + field + "[" + str + "]";
							break;
						}						
						smsOutput.setFrameRateNumerator(frameRateNumerator);
						smsOutput.setFrameRateDenominator(frameRateDenominator);
					} catch (NullPointerException e) {
						// node isn't existed
						smsOutput.setFrameRateNumerator(-1);
						smsOutput.setFrameRateDenominator(-1);
					}
					
					// 9. parse gop size
					try {
						field = "gopsize";
						str = helper.getNodeText("gopsize", item).trim();
						if (str == null || str.isEmpty()) {
							erstr = "Not existed: item " + i + " " + field + "[" + str + "]";
							break;
						}
						int gopSize = Integer.parseInt(str);
						if (gopSize <= 0) {
							erstr = "Invalid number format: item " + i + " " + field + "[" + str + "]";
							break;
						}
						smsOutput.setGopSize(gopSize);
					} catch (NullPointerException e) {
						// node isn't existed
						smsOutput.setGopSize(-1);
					}
				}				
				smsOuputs.add(smsOutput);
			}
		} catch (NullPointerException e) {
			// node isn't existed
			erstr = "Not existed: item " + i + " " + field;
		} catch (NumberFormatException e) {
			// not a invalid number
			erstr = "Invalid number format: item " + i + " " + field + "[" + str + "]";
		} catch (Exception e) {
			erstr = "Invalid xml";
		}
		
		if (!erstr.isEmpty()) {
			if (log.isInfoEnabled())
				log.info(erstr);
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { erstr }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		
		if (smsOuputs == null || smsOuputs.isEmpty()) {
			if (log.isInfoEnabled())
				log.info("invalid outputs: " + requestXml);
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "invalid outputs." }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		
		Integer taskId = -1;
		try {
			// check exist the task by url.
	
			// create task
			CommanderTask task = (CommanderTask) taskService.newTaskFromLiveProfile(profile);
			// set task name
			if (taskName != null && !taskName.isEmpty())
				task.setName(taskName);
			else
				task.setName(requestUrl);
			// set task input
			List<Input> inputs = task.getInputs();
			if (inputs == null || inputs.isEmpty()) {
				if (log.isInfoEnabled())
					log.info("invalid template: input not set.");
				mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "invalid template: input not set." }));
				mv.setViewName(VIEW_ERROR);
				return mv;
			}
			Input input = inputs.get(0);
			if (pid != null) {
				input.setProgramId(pid);
			}
			
			InputBody body = input.getBody();
			if (body instanceof NetworkInput) {
				NetworkInput netwokInput = (NetworkInput) input.getBody();
				netwokInput.setUri(requestUrl);
			} else {
				if (log.isInfoEnabled())
					log.info("invalid template: input type error.");
				mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "invalid template: input type error." }));
				mv.setViewName(VIEW_ERROR);
				return mv;
			}
			
			// set outputs
			int hdCount = 0, sdCount = 0, passCount = 0;
			List<StreamAssembly> streamAssemblys = new ArrayList<>();
			List<LiveOutputGroup> outputGroups = new ArrayList<>();
			for (SmsOutput smsOutput : smsOuputs) {
				int bitRate = smsOutput.getBitrate();
				
				List<Preset> presets = GetPresets(smsOutput);
				if (presets == null || presets.isEmpty()) {
					mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "invalid template: cannot find stream template." }));
					mv.setViewName(VIEW_ERROR);
					return mv;
				}
				
				if (!smsOutput.isPassthrough()) {
					// add streamAssembly list
					if (smsOutput.isHasVideo()) {
						VideoDescription vd = presets.get(0).getStreamAssembly().getVideoDescription();
						if (vd != null) {
							if (smsOutput.isBitrateReset() == true) {
								VideoSetting videoSetting = vd.getVideoSetting();
								AbstractVideoSetting baseVideoSetting = ((AbstractVideoSetting) videoSetting);
								int maxBitRate = bitRate;
								if (smsOutput.getVrc() == 1) { // CBR
									baseVideoSetting.setRateControlMode("CBR");
								} else if (smsOutput.getVrc() == 2) {// ABR
									baseVideoSetting.setRateControlMode("ABR");
								} else { // VBR
									maxBitRate = CalcMaxBitrate(bitRate);
									baseVideoSetting.setRateControlMode("VBR");
									baseVideoSetting.setMaxBitrate(maxBitRate);
								}
								baseVideoSetting.setBitrate(bitRate);
								int vbvSize = CalcVBVSize(bitRate);
								baseVideoSetting.setBufSize(vbvSize);
								baseVideoSetting.setBufFillPct(CalcVBVDelay(Math.max(bitRate, maxBitRate), vbvSize));
								if (log.isInfoEnabled())
									log.info("[RestAPI] reset bitrate to " + bitRate);
							}
							if (smsOutput.isWidthReset()) {
								int vw = smsOutput.getWidth();
								vw = vw <= 0 ? -1 : vw;
								vd.setWidth(vw);
								if (log.isInfoEnabled())
									log.info("[RestAPI] reset width to " + vw);
							}
							if (smsOutput.isHeightReset()) {
								int vh = smsOutput.getHeight();
								vh = vh <= 0 ? -1 : vh;
								vd.setHeight(vh);
								if (log.isInfoEnabled())
									log.info("[RestAPI] reset height to " + vh);
							}
							if (smsOutput.isFrameReset()) {
								AbstractVideoSetting baseVideoSetting = ((AbstractVideoSetting) vd.getVideoSetting());
								baseVideoSetting.setFramerateFollowSource(false);
								baseVideoSetting.setFramerateNumerator(smsOutput.getFrameRateNumerator());
								baseVideoSetting.setFramerateDenominator(smsOutput.getFrameRateDenominator());
								if (log.isInfoEnabled())
									log.info("[RestAPI] reset framerate to ");
							}
							if (smsOutput.isGopSizeReset()) {
								AbstractVideoSetting baseVideoSetting = ((AbstractVideoSetting) vd.getVideoSetting());
								baseVideoSetting.setGopSize(smsOutput.getGopSize());
							}
						}
					}
					if (!smsOutput.isHasVideo() && smsOutput.isHasAudio()) {
						List<AudioDescription> ads = presets.get(0).getStreamAssembly().getAudioDescriptions();
						if (ads != null && !ads.isEmpty()) {
							if (smsOutput.isBitrateReset() == true) {
								for (AudioDescription ad : ads) {
									AudioSetting audioSetting = ad.getAudioSetting();
									AbstractAudioSetting baseAudioSetting = ((AbstractAudioSetting) audioSetting);
									baseAudioSetting.setBitrate(bitRate * 1000);
								}
								if (log.isInfoEnabled())
									log.info("[RestAPI] reset bitrate to " + bitRate * 1000);
							}						
						}
					}
				}
				streamAssemblys.add(presets.get(0).getStreamAssembly());
				
				/* output
				 *  1: 归档文件(MPEG-2) -->
				 *  2: 归档文件(MPEG-4) -->
				 *  3: Apple Live -->
				 *  4: RTMP(Flash) -->
				 *  5: UDP(TSOverUDP) -->
				 *  6: RTP(ESOverRTP) -->
				 *  7: HTTP(TSOverHTTP) -->
				 *  8: HTTP(FLVOverHTTP) -->
				 *  9: HTTP(MP3OverHTTP) -->
				 *  10: MS Streaming(MSS) -->
				 */
				LiveOutputGroup outputGroup = outputGroupFactory.createOutputGroup();
				LiveOutput output = outputFactory.createOutput();
				if (smsOutput.getType() == 1) {
					outputGroup.setSettingsType("FileArchive");
					outputGroup.setContainer("TS");
	
					File f = new File(smsOutput.getUri());
					String path = f.getParent();
					String name = f.getName();
					ArchiveGroupSetting archiveGroupSetting = new ArchiveGroupSetting();
					Location location = new Location();
					location.setUri(path);
					archiveGroupSetting.setLocation(location);
					archiveGroupSetting.setTargetName(name);
					outputGroup.setOutputGroupSetting(archiveGroupSetting);			
				} else if (smsOutput.getType() == 2) {
					outputGroup.setSettingsType("FileArchive");
					outputGroup.setContainer("MP4");
	
					File f = new File(smsOutput.getUri());
					String path = f.getParent();
					String name = f.getName();
					ArchiveGroupSetting archiveGroupSetting = new ArchiveGroupSetting();
					Location location = new Location();
					location.setUri(path);
					archiveGroupSetting.setLocation(location);
					archiveGroupSetting.setTargetName(name);
					outputGroup.setOutputGroupSetting(archiveGroupSetting);			
				} else if (smsOutput.getType() == 3) {
					outputGroup.setSettingsType("AppleStreaming");
					outputGroup.setContainer("HLS");
	
					AppleLiveGroupSetting appleLiveGroupSetting = new AppleLiveGroupSetting();
					appleLiveGroupSetting.setTargetName("index");
					appleLiveGroupSetting.setPlaylistName("${id}");
					appleLiveGroupSetting.setSegmentName("${starttime}-${id}-${seq}");
					appleLiveGroupSetting.setIndexNSegments(10);
					appleLiveGroupSetting.setDeleteUploaded(1);
					Location location = new Location();
					location.setUri(smsOutput.getUri());
					appleLiveGroupSetting.setLocation(location);
					outputGroup.setOutputGroupSetting(appleLiveGroupSetting);			
				} else if (smsOutput.getType() == 4) {
					outputGroup.setSettingsType("FlashStreaming");
					outputGroup.setContainer("RTMP");
	
					RtmpGroupSetting rtmpGroupSetting = new RtmpGroupSetting();
					Location location = new Location();
					location.setUri(smsOutput.getUri());
					rtmpGroupSetting.setLocation(location);
					outputGroup.setOutputGroupSetting(rtmpGroupSetting);			
				} else if (smsOutput.getType() == 5) {
					outputGroup.setSettingsType("UdpStreaming");
					outputGroup.setContainer("UDPOverTS");
					outputGroup.setSrcPort(1234);
					
					UdpGroupSetting udpGroupSetting = new UdpGroupSetting();
					udpGroupSetting.setBufferSize("65535");
					udpGroupSetting.setTtl(255);
					Location location = new Location();
					location.setUri(smsOutput.getUri());
					udpGroupSetting.setLocation(location);
					outputGroup.setOutputGroupSetting(udpGroupSetting);
				} else if (smsOutput.getType() == 6) {
					outputGroup.setSettingsType("RtpStreaming");
					outputGroup.setContainer("RTPOverES");

					RtpOverEsSetting rtpOverEsSetting = new RtpOverEsSetting();
					String sdp = smsOutput.getSdp();
					int pos = sdp.lastIndexOf('/');
					rtpOverEsSetting.setTargetPath(sdp.substring(0, pos));
					rtpOverEsSetting.setTargetName(sdp.substring(pos + 1));
					rtpOverEsSetting.setVideoPort(smsOutput.getEsVideoPort());
					rtpOverEsSetting.setAudioPort(smsOutput.getEsAudioPort());
					outputGroup.setContainerSetting(rtpOverEsSetting);
					
					RtpGroupSetting rtpGroupSetting = new RtpGroupSetting();
					rtpGroupSetting.setBufferSize("65535");
					rtpGroupSetting.setTtl(255);
					Location location = new Location();
					location.setUri(smsOutput.getUri());
					rtpGroupSetting.setLocation(location);
					outputGroup.setOutputGroupSetting(rtpGroupSetting);
					

				} else if (smsOutput.getType() == 7) {
					outputGroup.setSettingsType("HttpStreaming");
					outputGroup.setContainer("TSOverHTTP");
					
					HttpGroupSetting httpGroupSetting = new HttpGroupSetting();
					httpGroupSetting.setPathUri("ts");
					httpGroupSetting.setCustomUri(smsOutput.getUri());
					outputGroup.setOutputGroupSetting(httpGroupSetting);
				} else if (smsOutput.getType() == 8) {
					outputGroup.setSettingsType("HttpStreaming");
					outputGroup.setContainer("FLVOverHTTP");
					
					HttpGroupSetting httpGroupSetting = new HttpGroupSetting();
					httpGroupSetting.setPathUri("flv");
					httpGroupSetting.setCustomUri(smsOutput.getUri());
					outputGroup.setOutputGroupSetting(httpGroupSetting);
				} else if (smsOutput.getType() == 9) {
					outputGroup.setSettingsType("HttpStreaming");
					outputGroup.setContainer("MP3OverHTTP");
					
					HttpGroupSetting httpGroupSetting = new HttpGroupSetting();
					httpGroupSetting.setPathUri("mp3");
					httpGroupSetting.setCustomUri(smsOutput.getUri());
					outputGroup.setOutputGroupSetting(httpGroupSetting);
				}
				output.setStreamAssemblyId(presets.get(0).getStreamAssembly().getId());
				//output.setOutputSettingsType(outputGroup.getSettingsType());
				//output.setContainerSettingsType(outputGroup.getContainer());
				//output.setLiveOutputGroup(outputGroup);
				outputGroup.setDescription("");
				outputGroup.addLiveOutput(output);

				outputGroups.add(outputGroup);
				
				if (presets.get(0).getStreamAssembly().getVideoDescription() != null) {
					if (presets.get(0).getStreamAssembly().getVideoDescription().getPassthrough())
						passCount++;
					else {
						if (presets.get(0).getStreamAssembly().getVideoDescription().getHeight() >= 720) {
							hdCount++;
						} else {
							sdCount++;
						}
					}
				}
			}
			task.setStreamAssemblys(streamAssemblys);
			task.setOutputGroups(outputGroups);

			// select server
			Server server = getAvaliableServer(outputGroups.size(), hdCount, sdCount, passCount);
			if (server == null) {
				mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "There is no avaliable server" }));
				mv.setViewName(VIEW_ERROR);
				return mv;
			}
			task.setType(0);
			task.setGroupId(server.getGroup().getId());
			task.setCurServerId(server.getId());
			log.info("dispatch " + task.getName() + " to " + server.getGroup().getName() + "." + server.getName() + "(ip=" + server.getIp() + ")");

			if ("true".equals(request.getParameter("start"))) {
				task.setState(TaskStatus.WAITING);
			}
			taskService.saveTask(task);
			log.info("[RestAPI] save task " + task.getId());
			
			taskId = task.getId();
			
			// start task
			if ("true".equals(request.getParameter("start"))) {
				try {
					for (int maxRetry=3;;) {
						try {
							log.info("[RestAPI] start task " + task.getId());
							taskExecuteService.startTask(task.getId());
							break;
						} catch (TransientDataAccessException e) {
							if (maxRetry > 0) {
								log.info("[RestAPI] start task " + task.getId() + " failed, try later.", e);
								Thread.sleep(500);
								maxRetry--;
							} else {
								throw e;
							}
						}
					}
				} catch (Exception e) {
					taskService.deleteTask(task.getId());
					log.error("start task failed, delete the task " + task.getId(), e);
					mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "start task failed." }));
					mv.setViewName(VIEW_ERROR);
					return mv;
				}
			}
			
			// success
			if (log.isInfoEnabled())
				log.info("[RestAPI] create and start task succss: " + task.getName());
		} finally {
		}
		String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		xml += String.format("<success><id>%d</id></success>", taskId);
		
		response.setContentType("text/xml; charset=UTF-8");
		try {
			response.getOutputStream().write(xml.getBytes());
		} catch (IOException e) {
		}
		return null;
	}

    @RequestMapping(method = RequestMethod.DELETE, value = "/api/task/{id}")
	@ResponseBody
    public Map<String, Object> deleteTask(@PathVariable String id, HttpServletRequest request) {
        log.info("TaskController.deleteTask: " + id);

        Integer taskId;
        TaskStatus st;

        try {
            taskId = Integer.parseInt(id);
        } catch (NumberFormatException e) {
            return createModelMap(TASK_NOT_EXIST, "The specified task (id=%s) is not exist.", id);
        }

        if ("true".equals(request.getParameter("force"))) {
            try {
                taskExecuteService.stopTask(taskId);
            } catch (Exception e) {
                return createModelMap(TASK_DELETE_FAILED, "stop task (id=%s) failed!", id);
            }
        } else {
            st = getTaskRealtimeStatus(taskId);
            if (st == null) {
                return createModelMap(TASK_DELETE_FAILED, "can't get task (id=%s) status!", id);
            }

            // check status
            if (!taskService.canEditTask(st)) {
				return createModelMap(TASK_DELETE_FAILED, "it needs to stop the task (id=%s) first!", id);
            }
        }

        taskService.deleteTask(taskId);
		return createSuccessMap();
    }

	//ToDo:
	@RequestMapping(method = RequestMethod.GET, value = "/api/tasks/{state}/{pageNo}")
	public ModelAndView getTasks(@PathVariable String state, @PathVariable String pageNo, HttpServletResponse response) {
		log.info("TaskController.getTasks: " + state + ", " + pageNo);

		Integer pageIndex = 1;
		try {
			pageIndex = Integer.parseInt(pageNo);
			if (pageIndex <= 0) {
				pageIndex = 1;
			}
		} catch (NumberFormatException e) {
			pageIndex = 1;
		}

		Pager pager = taskService.getTasks(true, state, pageIndex, pageSize);

		@SuppressWarnings("unchecked")
		List<Task> tasks = (List<Task>) pager.getResult();
		Integer totalRows = (int) pager.getTotalRows();

		ModelAndView mv = new ModelAndView(VIEW_MULTI_TASK);
		mv.addObject(ConstantUtils.MODELS, tasks);
		mv.addObject("currentPage", pageIndex);
		mv.addObject("totalRows", totalRows);
		mv.addObject("pageSize", pageSize);
		mv.addObject("hasNextPage", (totalRows > pageIndex * pageSize));
		mv.addObject("state", state);
		response.setContentType("application/xml;charset=UTF-8");
		return mv;
	}

	//ToDo:
	@RequestMapping(method = RequestMethod.POST, value = "/api/task/launch")
	public ModelAndView launchTask(@RequestBody String taskXml,HttpServletResponse response) {
		log.info("TaskController.launchTask");

		ModelAndView mv = new ModelAndView();
		List<String> errors = new ArrayList<String>();
		response.setContentType("application/xml;charset=UTF-8");

		if (taskXml == null || taskXml.trim().length() == 0 || !taskXmlValidator.validate(taskXml, errors)) {
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		Task task = (Task) this.taskXmlParser.parse(taskXml);

		try {
			transformableObjectValidator.validate(task);
		} catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		int hdCount = 0, sdCount = 0, passCount = 0;
		List<LiveOutputGroup> outputGroups = task.getOutputGroups();
		for (LiveOutputGroup outputGroup : outputGroups) {
			List<LiveOutput> outputs = outputGroup.getLiveOutputs();
			for (LiveOutput output : outputs) {
				if (output.getStreamAssembly().getVideoDescription() == null)
					continue;
				
				if (output.getStreamAssembly().getVideoDescription().getPassthrough())
					passCount++;
				else {
					if (output.getStreamAssembly().getVideoDescription().getHeight() >= 720) {
						hdCount++;
					} else {
						sdCount++;
					}
				}
			}
		}
		Server server = getAvaliableServer(outputGroups.size(), hdCount, sdCount, passCount);
		if (server == null) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "There is no avaliable server" }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		CommanderTask task1 = new CommanderTask();
		BeanUtils.copyProperties(task, task1);
		task1.setType(server.getGroup().getType());
		task1.setGroupId(server.getGroup().getId());
		task1.setCurServerId(server.getId());

		task = taskService.saveTask(task1);

		try {
			taskExecuteService.startTask(task.getId());

			task = taskService.getTask(task.getId(), true);
			mv.setViewName(VIEW_SINGLE_TASK);
			mv.addObject(ConstantUtils.MODEL, task);
			return mv;
		} catch (Exception e) {
			log.error(null, e);
			String msg = e.getMessage();
			errors.add(msg);
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}
	}

	private String getFilePath(String uri) {
		if (uri == null || uri.trim().length() == 0) {
			return uri;
		}

		int index = uri.lastIndexOf(File.separator);
		if (index != -1) {
			return uri.substring(0, index + 1);
		} else {
			index = uri.lastIndexOf("/");
			if (index != -1) {
				return uri.substring(0, index + 1);
			} else {
				return uri.substring(0, uri.length());
			}
		}
	}

	private String getFileName(String uri) {
		if (uri == null || uri.trim().length() == 0) {
			return uri;
		}

		int index1 = uri.lastIndexOf(File.separator);
		if (index1 == -1) {
			index1 = uri.lastIndexOf("/");
			if (index1 == -1) {
				index1 = 0;
			}
		}
		int index2 = uri.lastIndexOf(".");
		if (index2 == -1) {
			index2 = uri.length();
		}

		return uri.substring(index1 + 1, index2);
	}

	/**
	 * <task>
	 * <name>test</name>
	 * <encodingoption>Balance</encodingoption>
	 * <priority>10</priority>
	 * <profile id="6"></profile>
	 * <inputfile>
	 * <uri>a</uri>
	 * </inputfile>
	 * <outputfile>
	 * <uri>b</uri>
	 * <uri>c</uri>
	 * <uri>d</uri>
	 * </outputfile>
	 * </task>
	 * */
	@RequestMapping(method = RequestMethod.POST, value = "/api/task/ext/launch")
	public ModelAndView launchTaskExt(@RequestBody String taskExtXml,HttpServletResponse response) {
		log.info("TaskController.launchTaskExt: \r" + taskExtXml);

		ModelAndView mv = new ModelAndView();
		List<String> errors = new ArrayList<String>();
		response.setContentType("application/xml;charset=UTF-8");

		if (taskExtXml == null || taskExtXml.trim().length() == 0 || !taskExtXmlValidator.validate(taskExtXml, errors)) {
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		TaskExt taskExt = (TaskExt) this.taskExtXmlParser.parse(taskExtXml);

		Profile profile = taskExt.getProfile();
		Integer profileId = profile.getId();
		LiveProfile liveProfile = liveProfileService.getLiveProfile(profileId, true);
		if (liveProfile == null) {
			errors.add("invalid profile resulted from profile id.");
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		List<Input> inputs = liveProfile.getInputs();
		if (inputs.size() == 0) {
			errors.add("invalid input resulted from invalid profile id.");
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		Input input = inputs.get(0);
		if(input.getVideoInputType().equalsIgnoreCase(InputType.LABEL_FILE) 
			|| input.getVideoInputType().equalsIgnoreCase(InputType.LABEL_NETWORK)){
		}
		else {
			errors.add("invalid input resulted from invalid profile id.");
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		InputFile inputFile = taskExt.getInputFile();
		InputBody inputBody = input.getBody();
		if (inputBody instanceof Location) {
			Location location = (Location) inputBody;
			location.setUri(inputFile.getUri());
		} else if (inputBody instanceof NetworkInput) {
			NetworkInput networkInput = (NetworkInput) inputBody;
			networkInput.setUri(inputFile.getUri());
		}
		input.setProgramId(inputFile.getProgramId());
		input.setAudioTrackId(inputFile.getAudioTrackId());
		input.setSubtitleId(inputFile.getSubtitleId());

		List<LiveOutputGroup> liveOutputGroups = liveProfile.getOutputGroups();
		if (liveOutputGroups.size() == 0) {
			errors.add("invalid live outputGroup resulted from invalid profile id.");
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		OutputFile outputFile = taskExt.getOutputFile();
		List<String> uris = outputFile.getUris();
		if (uris != null && uris.size() > 0) {
			for (int i = 0; i < uris.size(); i++) {
				LiveOutputGroup liveOutputGroup = liveOutputGroups.get(i);
				String settingsType = liveOutputGroup.getSettingsType();
				if (!settingsType.equalsIgnoreCase(OutputGroupSetting.SETTING_TYPE_ARCHIVEFILE)) {
					errors.add("invalid live outputGroup resulted from invalid profile id.");
					fillErrorModelAndView(mv, TYPE_TASK, errors);
					return mv;
				}
				ArchiveGroupSetting archiveGroupSetting = (ArchiveGroupSetting) liveOutputGroup.getOutputGroupSetting();
				Location oLocation = archiveGroupSetting.getLocation();

				String fileFullPath = uris.get(i);
				String path = getFilePath(fileFullPath);
				String name = getFileName(fileFullPath);

				oLocation.setUri(path);
				archiveGroupSetting.setTargetName(name);
			}
		}

		Task task = new Task();
		task.setName(taskExt.getName());
		task.setEncodingOption(taskExt.getEncodingoption());
		task.setPriority(taskExt.getPriority());
		task.setStreamAssemblys(liveProfile.getStreamAssemblys());

		task.setInputs(liveProfile.getInputs());
		task.setOutputGroups(liveProfile.getOutputGroups());

		try {
			transformableObjectValidator.validate(task);
		} catch (ValidationException e) {
			errors.add(e.getMessage());
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}

		int hdCount = 0, sdCount = 0, passCount = 0;
		List<LiveOutputGroup> outputGroups = task.getOutputGroups();
		for (LiveOutputGroup outputGroup : outputGroups) {
			List<LiveOutput> outputs = outputGroup.getLiveOutputs();
			for (LiveOutput output : outputs) {
				if (output.getStreamAssembly().getVideoDescription() == null)
					continue;
				
				if (output.getStreamAssembly().getVideoDescription().getPassthrough())
					passCount++;
				else {
					if (output.getStreamAssembly().getVideoDescription().getHeight() >= 720) {
						hdCount++;
					} else {
						sdCount++;
					}
				}
			}
		}
		Server server = getAvaliableServer(outputGroups.size(), hdCount, sdCount, passCount);
		if (server == null) {
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "There is no avaliable server" }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}
		CommanderTask task1 = new CommanderTask();
		BeanUtils.copyProperties(task, task1);
		task1.setType(server.getGroup().getType());
		task1.setGroupId(server.getGroup().getId());
		task1.setCurServerId(server.getId());

		task = taskService.saveTask(task1);

		try {
			taskExecuteService.startTask(task.getId());

			task = taskService.getTask(task.getId(), true);
			mv.setViewName(VIEW_SINGLE_TASK);
			mv.addObject(ConstantUtils.MODEL, task);
			return mv;
		} catch (Exception e) {
			log.error(null, e);
			String msg = e.getMessage();
			errors.add(msg);
			fillErrorModelAndView(mv, TYPE_TASK, errors);
			return mv;
		}
	}

	/**
	 * 
	 * @param id
	 * @return
	 */
    @RequestMapping(method = RequestMethod.PUT, value = "/api/task/{id}/start")
    @ResponseBody
    public Map<String, Object> startTask(@PathVariable String id) {
        log.info("TaskController.startTask: " + id);

        Integer taskId;
        Task task;

        try {
            taskId = Integer.parseInt(id);
        } catch (Exception e) {
            return createModelMap(INVALID_ARGUMENT, "Invalid task id: %s", id);
        }

        task = taskService.getTask(taskId, false);
        if (task == null) {
            return createModelMap(TASK_NOT_EXIST, "Query task(id=%s) failed.", id);
        }

        // check status
        TaskStatus st = task.getStatus();
        if (TaskStatus.WAITING.equals(st) || TaskStatus.RUNNING.equals(st) || TaskStatus.STOPPING.equals(st)) {
            return createModelMap(TASK_START_FAILED, "cannot start task (id=%s) with status:"+ (st == null ? "" : st.name()) +"", id);
        }

        String msg;
        try {
            taskExecuteService.startTask(taskId);
            return createSuccessMap();
        } catch (Exception e) {
            log.error(null, e);
            msg = e.getMessage();
    }

        return createModelMap(TASK_START_FAILED,msg,taskId);
    }

	//ToDo:
	// signalMode: 0: main; 2: backup; 3: padding;
	@RequestMapping(method = RequestMethod.PUT, value = "/api/task/{id}/switch/{signalMode}")
	public ModelAndView switchTaskSignal(@PathVariable String id, @PathVariable String signalMode,HttpServletResponse response) {
		log.info("TaskController.switchSignal: " + id + " " + signalMode);

		ModelAndView mv = new ModelAndView();
		response.setContentType("application/xml;charset=UTF-8");
		Integer taskId = 0;
		TaskStatus st = null;

		try {
			taskId = Integer.parseInt(id);
		} catch (NumberFormatException e) {
			fillErrorModelAndView(mv, TYPE_TASK, id);
			return mv;
		}

		Integer singalSwitchMode = 0;
		try {
			singalSwitchMode = Integer.parseInt(signalMode);
		} catch (NumberFormatException e) {
			fillErrorModelAndView(mv, SIGNAL_SWITCH_MODE, signalMode);
			return mv;
		}
		if (singalSwitchMode < 0 || singalSwitchMode > 4) {
			fillErrorModelAndView(mv, SIGNAL_SWITCH_MODE, signalMode);
			return mv;
		}
		
		st = getTaskRealtimeStatus(taskId);
		if (st == null) {
			fillErrorModelAndView(mv, TYPE_TASK, id);
			return mv;
		}

		//check status
		if ( ! (TaskStatus.WAITING.equals(st)  || 
				TaskStatus.RUNNING.equals(st)) ) 
		{
			mv.addObject(ConstantUtils.ERRORS,
					Arrays.asList(new String[] { "cannot switch source task with status:" + (st == null ? "" : st.name()) }));
			mv.setViewName(VIEW_ERROR);
			return mv;
		}

		String view = VIEW_SUCCESS;

		try {
			TaskChangedInfo info = new TaskChangedInfo();
			info.setTaskId(taskId);
			info.setSignalSwitchMode(singalSwitchMode);
			taskExecuteService.updateTaskInfo(info);
		} catch (Exception e) {
			log.error(null, e);
			view = VIEW_ERROR;
			String msg = e.getMessage();
			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { msg }));
		}
		mv.setViewName(view);
		return mv;
	}

	// signalMode: 0: main; 2: backup; 3: padding;
	/* <?xml version="1.0" encoding="UTF-8"?>
	 * <switchs>
	 *    <switch>
	 *       <switchAt>yyyy-MM-dd HH:mm:ss<switchAt>
	 *       <signalMode></signalMode>
	 *    </switch>
	 * </switchs>
	 */
//	@RequestMapping(method = RequestMethod.PUT, value = "/api/task/{id}/timeswitch")
//	public ModelAndView timeswitchTaskSignal(@PathVariable String id, @RequestBody String requestXml) {
//		log.info("TaskController.timeswitch: " + id);
//
//		ModelAndView mv = new ModelAndView();
//		Integer taskId = 0;
//		TaskStatus st = null;
//
//		try {
//			taskId = Integer.parseInt(id);
//		} catch (NumberFormatException e) {
//			fillErrorModelAndView(mv, TYPE_TASK, id);
//			return mv;
//		}
//
//		List<SourceTimeSwitch> sourceTimeSwitchs = new ArrayList<SourceTimeSwitch>();
//		String erstr = "";
//		try {
//			XmlHelper helper = new XmlHelper(new StringReader(requestXml));
//			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//
//			NodeList switchList = helper.selectNodes("switchs/switch");
//			if (switchList == null || switchList.getLength() == 0) {
//				log.info("Invalid switch settings: " + requestXml);
//				fillErrorModelAndView(mv, "invalid switch settings");
//				return mv;
//			}
//			for (int i = 0; i < switchList.getLength(); i++) {
//				Node item = switchList.item(i);
//
//				SourceTimeSwitch sourceTimeSwitch = new SourceTimeSwitch();
//
//				// switchAt
//				String str = helper.getNodeText("switchAt", item).trim();
//				if (str == null || str.isEmpty()) {
//					erstr = "Not existed: item " + i + " switchAt";
//					break;
//				}
//				sourceTimeSwitch.setSwitchAt(df.parse(str));
//
//				// signalMode
//				str = helper.getNodeText("signalMode", item).trim();
//				if (str == null || str.isEmpty()) {
//					erstr = "Not existed: item " + i + " signalMode";
//					break;
//				}
//				Integer switchMode = Integer.parseInt(str);
//				if (switchMode < 0 || switchMode > 4) {
//					erstr = "Not existed: item " + i + " signalMode";
//					break;
//				}
//				sourceTimeSwitch.setSwitchMode(switchMode);
//
//				sourceTimeSwitchs.add(sourceTimeSwitch);
//			}
//		} catch (Exception e) {
//			erstr = "Invalid xml";
//		}
//		if (!erstr.isEmpty()) {
//			log.info(erstr);
//
//			fillErrorModelAndView(mv, erstr);
//			return mv;
//	    }
//
//		st = getTaskRealtimeStatus(taskId);
//		if (st == null) {
//			fillErrorModelAndView(mv, TYPE_TASK, id);
//			return mv;
//		}
//
//		//check status
//		if (!(TaskStatus.WAITING.equals(st) ||
//			TaskStatus.RUNNING.equals(st)) )
//		{
//			mv.addObject(ConstantUtils.ERRORS,
//					Arrays.asList(new String[] { "cannot stop task with status:" + (st == null ? "" : st.name()) }));
//			mv.setViewName(VIEW_ERROR);
//			return mv;
//		}
//
//		String view = VIEW_SUCCESS;
//		try {
//			TaskChangedInfo info = new TaskChangedInfo();
//			info.setTaskId(taskId);
//			info.setSourceTimeSwitchs(sourceTimeSwitchs);
//			taskExecuteService.updateTaskInfo(info);
//		} catch (Exception e) {
//			log.error(null, e);
//			view = VIEW_ERROR;
//			String msg = e.getMessage();
//			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { msg }));
//		}
//		mv.setViewName(view);
//		return mv;
//    }

	@RequestMapping(method = RequestMethod.PUT, value = "/api/task/{id}/stop")
	@ResponseBody
	public Map<String, Object> stopTask(@PathVariable String id) {
		log.info("TaskController.stopTask: " + id);

		Integer taskId;
		TaskStatus st;

		try {
			taskId = Integer.parseInt(id);
		} catch (NumberFormatException e) {
			return createModelMap(INVALID_ARGUMENT, "Invalid task id: %s", id);
		}

		st = getTaskRealtimeStatus(taskId);
		if (st == null) {
			return createModelMap(TASK_STOP_FAILED, "get task (id=%s) status failed", id);
		}

		//check status
		if ( ! (TaskStatus.WAITING.equals(st)  ||
				TaskStatus.RUNNING.equals(st)  ||
				TaskStatus.STOPPING.equals(st) ||
				TaskStatus.SUSPENDED.equals(st)) )
		{
			return createModelMap(TASK_STOP_FAILED, "cannot stop task (id=%s) with status:"+
					(st == null ? "" : st.name()) +"", id);
		}

		String msg;
		try {
			taskExecuteService.stopTask(taskId);
			return createSuccessMap();
		} catch (Exception e) {
			log.error(null, e);
			msg = e.getMessage();
		}

		return createModelMap(TASK_STOP_FAILED, "Stop task (id=%s) Exception:"+ msg, id);
	}

	// @RequestMapping(method=RequestMethod.POST, value="/api/task/all/stop")
	// public ModelAndView stopAllTasks() {
	// String view = SUCCESS_VIEW;
	// ModelAndView mv = new ModelAndView();
	// try {
	// taskService.stopAllTasks();
	// } catch (Exception e) {
	// log.error(null,e);
	// view = ERROR_VIEW;
	// String msg = null;
	// if (e instanceof AppException) {
	// msg = ((AppException) e).getErrorDesc();
	// } else {
	// msg = "Error code=" + AppException.ERR_START_TASK_FAILED;
	// }
	// mv.addObject(ConstantUtils.ERRORS,
	// Arrays.asList(new String[] { msg }));
	// }
	// mv.setViewName(view);
	// return mv;
	// }

	TaskStatus getTaskRealtimeStatus(Integer taskId) {
		TaskStatus status = null; // taskExecuteService.getRunningStatus(taskId);
		if (status == null) {
			Task task = taskService.getTask(taskId, false);
			if (task != null)
				status = task.getStatus();
		}
		return status;
	}

	private Server getAvaliableServer(int outputCountReq, int hdCountReq, int sdCountReq, int passCountReq) {
		List<ServerCap> serverCaps = new ArrayList<ServerCap>();

		List<ServerGroup> groups = serverService.list(true);
		for (ServerGroup group : groups) {
			List<Server> servers = group.getServers();
			for (Server server : servers) {
				if (!server.isBackup() && server.isAlive() && server.getState() == Server.STATE_OK && server.getCapabilities() != null && server.getCapabilities().getMaxTasks() > 0 ) { //&& server.getDeployState() == Server.DEPLOY_STATE_OK
					ServerCapabilities sc = server.getCapabilities();
					//List<Task> tasks = taskService.getTasksByCurServerIdAndStates(server.getId(), TaskStatus.RUNNING, TaskStatus.WAITING);
					List<Task> tasks = taskService.getRunningTasks(server.getId());
					if (tasks.size() >= sc.getMaxTasks())
						continue;

					//int outputCount = 0;
					int hdCount = 0;
					int sdCount = 0;
					int passCount = 0;

					for (Task task : tasks) {
						List<LiveOutputGroup> outputGroups = task.getOutputGroups();
						//outputCount += outputGroups.size();
						for (LiveOutputGroup outputGroup : outputGroups) {
							List<LiveOutput> outputs = outputGroup.getLiveOutputs();
							for (LiveOutput output : outputs) {
								if (output.getStreamAssembly().getVideoDescription() == null)
									continue;

								if (output.getStreamAssembly().getVideoDescription().getPassthrough())
									passCount++;
								else {
									if (output.getStreamAssembly().getVideoDescription().getHeight() >= 720) {
										hdCount++;
									} else {
										sdCount++;
									}
								}
							}
						}
					}
					if (tasks.size() >= sc.getMaxTasks())
						continue;
					if (outputCountReq > sc.getMaxOutputGroups())
						continue;
					if (hdCount + hdCountReq > sc.getMaxHDCount())
						continue;
					if ((sdCount + sdCountReq) * 10 + (passCount + passCountReq) > sc.getMaxSDCount() * 10)
						continue;

					if (selectServerMode == SELECT_SERVER_MODE_DEFAULT)
						return server;

					int cap = (sc.getMaxHDCount() * 4 + sc.getMaxSDCount()) * 10 - (hdCount * 4 + sdCount) * 10;
					serverCaps.add(new ServerCap(server, cap, tasks.size(), hdCount, sdCount, passCount));
				}
			}
		}

		if (selectServerMode == SELECT_SERVER_MODE_IDLEST) {
			if (serverCaps.size() > 0) {
				Collections.sort(serverCaps, new Comparator<ServerCap>() {
					@Override
					public int compare(ServerCap cap1, ServerCap cap2) {
						return cap2.getCap() - cap1.getCap();
					}
				});
				return serverCaps.get(0).getServer();
			}
		} else if (selectServerMode == SELECT_SERVER_MODE_RANDOM) {
			if (!serverCaps.isEmpty()) {
				int index = (int) (Math.random() * serverCaps.size());
				return serverCaps.get(index).getServer();
			}
		} else if (selectServerMode == SELECT_SERVER_MODE_RANDOM_EXT) {
			if (!serverCaps.isEmpty()) {
				Collections.sort(serverCaps, new Comparator<ServerCap>() {
					@Override
					public int compare(ServerCap cap1, ServerCap cap2) {
						return cap2.getCap() - cap1.getCap();
					}
				});
				int maxcap = 0;
				for (ServerCap cap1 : serverCaps) {
					maxcap += cap1.getCap();
				}
				int selcap = (int) (Math.random() * maxcap);
				int cap = 0;
				int index = 0;
				for (ServerCap cap2 : serverCaps) {
					cap += cap2.getCap();
					if (cap > selcap)
						break;
					index ++;
				}
				if (index >= serverCaps.size()) index = serverCaps.size() - 1;
				return serverCaps.get(index).getServer();
			}
		}
		return null;
	}

	private class ServerCap {

		private Server server;
		private int cap;
		private int taskCount;
		private int hdCount;
		private int sdCount;
		private int passCount;

		ServerCap(Server server, int cap, int taskCount, int hdCount, int sdCount, int passCount) {
			this.server = server;
			this.cap = cap;
			this.taskCount = taskCount;
			this.hdCount = hdCount;
			this.sdCount = sdCount;
			this.passCount = passCount;
		}

		public Server getServer() {
			return server;
		}

		public int getCap() {
			return cap;
		}

		public int getTaskCount() {
			return taskCount;
		}

		public int getHdCount() {
			return hdCount;
		}

		public int getSdCount() {
			return sdCount;
		}

		public int getPassCount() {
			return passCount;
		}

		public void setPassCount(int passCount) {
			this.passCount = passCount;
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/ts/{publish}")
	public void httpTsRedirect(@PathVariable String publish, HttpServletRequest request, HttpServletResponse response) {
		StringBuffer path = request.getRequestURL();
		int pos = -1;
		String container = null;
		pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_FLV + "/");
		if (pos >= 0) {
			container = HttpGroupSetting.PATH_URI_FLV;
		}

		if (pos < 0) {
			pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_MP3 + "/");
			if (pos >= 0) {
				container = HttpGroupSetting.PATH_URI_MP3;
			}
		}

		if (pos < 0) {
			pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_TS + "/");
			if (pos >= 0) {
				container = HttpGroupSetting.PATH_URI_TS;
			}
		}

		if (pos < 0) {
			try {
				response.sendError(404);
			} catch (IOException e) {
			}
			return;
		}
		publish = path.substring(pos + container.length() + 2);

		String location = toRedirectUrl(container, publish);
		if (location != null) {
			if (log.isDebugEnabled())
				log.debug("redirect to " + location + " for publish name " + publish);
			int forward = AppConfig.getPropertyAsint("forward_http_stream_data", 0);
			if (forward == 0) {
				try {
					response.sendRedirect(location);
				} catch (IOException e) {
				}
			} else {
				// use forward instead of redirect
				log.info("httpTsRedirect start");
				PostMethod postMethod = null;
				HttpClient client = null;
				try {
					ServletOutputStream out = response.getOutputStream();
					if("false".equals(AppConfig.getProperty("http_stream_chunked_transfer"))) {
						String contentLength = AppConfig.getProperty("http_stream_content_length");
						if(contentLength == null) {
							contentLength = String.valueOf(Long.MAX_VALUE);
						}
						response.setHeader("Content-Length", contentLength);
					}
					
					postMethod = new PostMethod(location);
					client = new HttpClient();
					int statusCode = client.executeMethod(postMethod);
					if (statusCode != HttpStatus.SC_OK) {
						log.error("connect http failed: " + postMethod.getStatusLine());
					}
					InputStream in = postMethod.getResponseBodyAsStream();
					if (in != null) {
						byte[] buf = new byte[8096];
						int len;
						try {
							while ((len = in.read(buf)) != -1) {
								out.write(buf, 0, len);
							}
							out.flush();
							log.info("httpTsRedirect end transcoder task stop");
						} catch (IOException e) {
							log.info(e);
							log.info("httpTsRedirect end");
						}
					}
				} catch (Exception e) {
					log.info(e);
					log.info("httpTsRedirect end1");
				} finally {
					if (postMethod != null) {
						postMethod.releaseConnection();
					}
					if (client != null) {
						((SimpleHttpConnectionManager)client.getHttpConnectionManager()).shutdown();
					}
				}
			}
		} else {
			try {
				response.sendError(404);
			} catch (IOException e) {
			}
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/flv/{publish}")
	public void httpFlvRedirect(@PathVariable String publish, HttpServletRequest request, HttpServletResponse response) {
		StringBuffer path = request.getRequestURL();
		int pos = -1;
		String container = null;
		pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_FLV + "/");
		if (pos >= 0) {
			container = HttpGroupSetting.PATH_URI_FLV;
		}

		if (pos < 0) {
			pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_MP3 + "/");
			if (pos >= 0) {
				container = HttpGroupSetting.PATH_URI_MP3;
			}
		}

		if (pos < 0) {
			pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_TS + "/");
			if (pos >= 0) {
				container = HttpGroupSetting.PATH_URI_TS;
			}
		}

		if (pos < 0) {
			try {
				response.sendError(404);
			} catch (IOException e) {
			}
			return;
		}
		publish = path.substring(pos + container.length() + 2);

		String location = toRedirectUrl(container, publish);
		if (location != null) {
			if (log.isDebugEnabled())
				log.debug("redirect to " + location + " for publish name " + publish);
			int forward = AppConfig.getPropertyAsint("forward_http_stream_data", 0);
			if (forward == 0) {
				try {
					response.sendRedirect(location);
				} catch (IOException e) {
				}
			} else {
				// use forward instead of redirect
				log.info("httpFlvRedirect start");
				PostMethod postMethod = null;
				HttpClient client = null;
				try {
					ServletOutputStream out = response.getOutputStream();
					if("false".equals(AppConfig.getProperty("http_stream_chunked_transfer"))) {
						String contentLength = AppConfig.getProperty("http_stream_content_length");
						if(contentLength == null) {
							contentLength = String.valueOf(Long.MAX_VALUE);
						}
						response.setHeader("Content-Length", contentLength);
					}

					postMethod = new PostMethod(location);
					client = new HttpClient();
					int statusCode = client.executeMethod(postMethod);
					if (statusCode != HttpStatus.SC_OK) {
						log.error("connect http failed: " + postMethod.getStatusLine());
					}
					InputStream in = postMethod.getResponseBodyAsStream();
					if (in != null) {
						byte[] buf = new byte[8096];
						int len;
						try {
							while ((len = in.read(buf)) != -1) {
								out.write(buf, 0, len);
							}
							out.flush();
							log.info("httpFlvRedirect end transcoder task stop");
						} catch (IOException e) {
							log.info(e);
							log.info("httpFlvRedirect end");
						}
					}
				} catch (Exception e) {
					log.info(e);
					log.info("httpFlvRedirect end1");
				} finally {
					if (postMethod != null) {
						postMethod.releaseConnection();
					}
					if (client != null) {
						((SimpleHttpConnectionManager)client.getHttpConnectionManager()).shutdown();
					}
				}
			}
		} else {
			try {
				response.sendError(404);
			} catch (IOException e) {
			}
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/mp3/{publish}")
	public void httpMp3Redirect(@PathVariable String publish, HttpServletRequest request, HttpServletResponse response) {
		StringBuffer path = request.getRequestURL();
		int pos = -1;
		String container = null;
		pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_FLV + "/");
		if (pos >= 0) {
			container = HttpGroupSetting.PATH_URI_FLV;
		}

		if (pos < 0) {
			pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_MP3 + "/");
			if (pos >= 0) {
				container = HttpGroupSetting.PATH_URI_MP3;
			}
		}

		if (pos < 0) {
			pos = path.indexOf("/" + HttpGroupSetting.PATH_URI_TS + "/");
			if (pos >= 0) {
				container = HttpGroupSetting.PATH_URI_TS;
			}
		}

		if (pos < 0) {
			try {
				response.sendError(404);
			} catch (IOException e) {
			}
			return;
		}
		publish = path.substring(pos + container.length() + 2);

		String location = toRedirectUrl(container, publish);
		if (location != null) {
			if (log.isDebugEnabled())
				log.debug("redirect to " + location + " for publish name " + publish);
			int forward = AppConfig.getPropertyAsint("forward_http_stream_data", 0);
			if (forward == 0) {
				try {
					response.sendRedirect(location);
				} catch (IOException e) {
				}
			} else {
				// use forward instead of redirect
				log.info("httpMp3Redirect start");

				PostMethod postMethod = null;
				HttpClient client = null;
				try {
					ServletOutputStream out = response.getOutputStream();

					postMethod = new PostMethod(location);
					client = new HttpClient();
					int statusCode = client.executeMethod(postMethod);
					if (statusCode != HttpStatus.SC_OK) {
						log.error("connect http failed: " + postMethod.getStatusLine());
					}
					InputStream in = postMethod.getResponseBodyAsStream();
					if (in != null) {
						byte[] buf = new byte[8096];
						int len;
						try {
							while ((len = in.read(buf)) != -1) {
								out.write(buf, 0, len);
							}
							out.flush();
							log.info("httpMp3Redirect end transcoder task stop");
						} catch (IOException e) {
							log.info(e);
							log.info("httpMp3Redirect end");
						}
					}
				} catch (Exception e) {
					log.info(e);
					log.info("httpMp3Redirect end1");
				} finally {
					if (postMethod != null) {
						postMethod.releaseConnection();
					}
					if (client != null) {
						((SimpleHttpConnectionManager)client.getHttpConnectionManager()).shutdown();
					}
				}
			}
		} else {
			try {
				response.sendError(404);
			} catch (IOException e) {
			}
		}
	}

	/**
	 * To redirect url according to the publish name.
	 */
	private String toRedirectUrl(String container, String publish) {
		TaskHttpGroupSettingAccessorEntry entry = null;
		try {
			entry = taskExecuteService.getTaskHttpGroupSettingAccessor(container, publish);
		} catch (Exception e) {
			log.error("get entry failed: " + e.getMessage());
			return null;
		}
		if (entry == null) {
			if (log.isInfoEnabled())
				log.info("entry not found.");
			return null;
		}
		String targetUri = "http://" + entry.getServerIp() + "/tms.content?url=udp://" + entry.getIp() + ":"
				+ entry.getPort();
		if (container.equalsIgnoreCase(HttpGroupSetting.PATH_URI_FLV))
			targetUri += "/mediaformat=flv";
		return targetUri;
	}
	
	
	public class SmsOutput {
		private int type;
		private String uri;
		
		private String sdp= null;
		private Integer esVideoPort= 5540;
		private Integer esAudioPort= 5542;
		
		private boolean passthrough = false;
		
		private String vcodec = null;
		private String acodec = null;
		
		private Integer bitrate = -1;
		private Integer vrc = -1;
		private Integer width = -1;
		private Integer height = -1;
		private Integer frameRateNumerator = -1;
		private Integer frameRateDenominator = -1;
		private Integer gopSize = -1;

		private boolean bitrateReset = false;
		private boolean widthReset = false;
		private boolean heightReset = false;
		private boolean frameReset = false;
		private boolean gopSizeReset = false;
		private boolean hasVideo = false;
		private boolean hasAudio = false;

		public int getType() {
			return type;
		}

		public void setType(int type) {
			this.type = type;
		}	

		public String getUri() {
			return uri;
		}

		public void setUri(String uri) {
			this.uri = uri;
		}

		public String getSdp() {
			return sdp;
		}

		public void setSdp(String sdp) {
			this.sdp = sdp;
		}
		
		public boolean isPassthrough() {
			return passthrough;
		}

		public void setPassthrough(boolean passthrough) {
			this.passthrough = passthrough;
		}
		
		public String getVcodec() {
			return vcodec;
		}

		public void setVcodec(String vcodec) {
			this.vcodec = vcodec;
		}

		public String getAcodec() {
			return acodec;
		}

		public void setAcodec(String acodec) {
			this.acodec = acodec;
		}

		public int getBitrate() {
			return bitrate;
		}

		public void setBitrate(int bitrate) {
			this.bitrate = bitrate;
		}

		public Integer getVrc() {
			return vrc;
		}

		public void setVrc(Integer vrc) {
			this.vrc = vrc;
		}
		
		public int getWidth() {
			return width;
		}

		public void setWidth(int width) {
			this.width = width;
		}

		public int getHeight() {
			return height;
		}

		public void setHeight(int height) {
			this.height = height;
		}

		public Integer getFrameRateNumerator() {
			return frameRateNumerator;
		}

		public void setFrameRateNumerator(Integer frameRateNumerator) {
			this.frameRateNumerator = frameRateNumerator;
		}

		public Integer getFrameRateDenominator() {
			return frameRateDenominator;
		}

		public void setFrameRateDenominator(Integer frameRateDenominator) {
			this.frameRateDenominator = frameRateDenominator;
		}
		
		public Integer getGopSize() {
			return gopSize;
		}

		public void setGopSize(Integer gopSize) {
			this.gopSize = gopSize;
		}
		
		public boolean isHasVideo() {
			return hasVideo;
		}

		public void setHasVideo(boolean hasVideo) {
			this.hasVideo = hasVideo;
		}

		public boolean isHasAudio() {
			return hasAudio;
		}

		public void setHasAudio(boolean hasAudio) {
			this.hasAudio = hasAudio;
		}
		
		public boolean isBitrateReset() {
			return bitrateReset;
		}

		public void setBitrateReset(boolean bitrateReset) {
			this.bitrateReset = bitrateReset;
		}

		public boolean isWidthReset() {
			return widthReset;
		}

		public void setWidthReset(boolean widthReset) {
			this.widthReset = widthReset;
		}

		public boolean isHeightReset() {
			return heightReset;
		}

		public void setHeightReset(boolean heightReset) {
			this.heightReset = heightReset;
		}

		public boolean isFrameReset() {
			return frameReset;
		}

		public void setFrameReset(boolean frameReset) {
			this.frameReset = frameReset;
		}
		
		public boolean isGopSizeReset() {
			return gopSizeReset;
		}

		public void setGopSizeReset(boolean gopSizeReset) {
			this.gopSizeReset = gopSizeReset;
		}

		public Integer getEsVideoPort() {
			return esVideoPort;
		}

		public void setEsVideoPort(Integer esVideoPort) {
			this.esVideoPort = esVideoPort;
		}

		public Integer getEsAudioPort() {
			return esAudioPort;
		}

		public void setEsAudioPort(Integer esAudioPort) {
			this.esAudioPort = esAudioPort;
		}

	}

	/**
	 * 
	 * @param taskXml
	 * 
	 * 
	 * @return taskId
	 */
//	@RequestMapping(method = RequestMethod.POST, value = "/changxin/task")
//	public ModelAndView changxinTask(@RequestBody String taskXml) {
//		String sdpUrl = null;
//
//		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
//        try {
//        	sdpUrl = "/tmp/" + df.format(new Date()) + ".sdp";
//         } catch (Exception e) {
//            e.printStackTrace();
//        }
//        /*
//        v=0
//        o=- 143450918674 143450918674 IN IP4 172.17.230.98
//        s=2016070701
//        c=IN IP4 172.17.230.98
//        t=0 0
//        m=video 5540 RTP/AVP 102
//        a=rtpmap:102 H264/90000
//        a=fmtp:102 profile-level-id=640028; sprop-parameter-sets=Z2QAKKzoB4BE/eAiAAADAAIAAAMAZc1AAFuNgAC3G0kkAfFi6g==,aP48sA==;packetization-mode=0
//        m=audio 5542 RTP/AVP 96
//        a=rtpmap:96 mpeg4-generic/32000/2
//        a=fmtp:96 streamtype=5; profile-level-id=15; mode=AAC-hbr; config=1290; sizelength=13; indexlength=3; indexdeltalength=0
//        */
//
//		ModelAndView mv = new ModelAndView();
//		List<String> errors = new ArrayList<String>();
//
//		if (taskXml == null || taskXml.trim().length() == 0 || !taskXmlValidator.validate(taskXml, errors)) {
//			fillErrorModelAndView(mv, TYPE_TASK, errors);
//			return mv;
//		}
//
//		// log.info(taskXml);
//		Task task = (Task) this.taskXmlParser.parse(taskXml);
//		try {
//			transformableObjectValidator.validate(task);
//		} catch (ValidationException e) {
//			errors.add(e.getMessage());
//			fillErrorModelAndView(mv, TYPE_TASK, errors);
//			return mv;
//		}
//
//		int hdCount = 0, sdCount = 0, passCount = 0;
//		List<LiveOutputGroup> outputGroups = task.getOutputGroups();
//		for (LiveOutputGroup outputGroup : outputGroups) {
//			List<LiveOutput> outputs = outputGroup.getLiveOutputs();
//			for (LiveOutput output : outputs) {
//				if (output.getStreamAssembly().getVideoDescription() == null)
//					continue;
//
//				if (output.getStreamAssembly().getVideoDescription().getPassthrough()) {
//					passCount++;
//				} else {
//					if (output.getStreamAssembly().getVideoDescription().getHeight() >= 720) {
//						hdCount++;
//					} else {
//						sdCount++;
//					}
//				}
//			}
//		}
//		Server server = getAvaliableServer(outputGroups.size(), hdCount, sdCount, passCount);
//		if (server == null) {
//			mv.addObject(ConstantUtils.ERRORS, Arrays.asList(new String[] { "There is no avaliable server" }));
//			mv.setViewName(VIEW_ERROR);
//			return mv;
//		}
//		CommanderTask task1 = new CommanderTask();
//		BeanUtils.copyProperties(task, task1);
//		task1.setType(server.getGroup().getType());
//		task1.setGroupId(server.getGroup().getId());
//		task1.setCurServerId(server.getId());
//
//		task = taskService.saveTask(task1);
//
//		mv.setViewName(VIEW_SINGLE_TASK);
//		mv.addObject(ConstantUtils.MODEL, task);
//		return mv;
//	}
}
