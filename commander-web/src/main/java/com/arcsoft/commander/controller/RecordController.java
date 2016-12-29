package com.arcsoft.commander.controller;

import static com.arcsoft.commander.controller.ApiErrorCode.*;
import static com.arcsoft.commander.controller.ControllerUtils.*;

import java.security.PrivateKey;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.dao.record.impl.RecordTaskDaoImpl;
import com.arcsoft.commander.domain.record.*;
import com.arcsoft.commander.domain.schedule.*;
import com.arcsoft.commander.service.record.EpgInfoService;
import com.arcsoft.commander.service.record.RecordTaskService;
import com.arcsoft.commander.service.record.impl.FtpServerServiceImpl;
import com.arcsoft.commander.service.schedule.SchedulePersistentService;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.util.DateFormatUtil;
import org.hibernate.annotations.Parameter;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.LocalTime;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.service.channel.ChannelService;
import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.service.LiveProfileService;

/**
 * REST API for record manager.
 *
 * @author fjli
 */
@Controller
public class RecordController {

    private RecordInfoService recordInfoService;
    private LiveProfileService liveProfileService;
    private ChannelService channelService;
    private EpgInfoService epgInfoService;
    private CustomTaskService customTaskService;
    private Pager pager;
    private List<RecordTask> tasks = null;
    private String RECORDID = "id";
    private String TASKID = "id";



    public void setLiveProfileService(LiveProfileService liveProfileService) {
        this.liveProfileService = liveProfileService;
    }
    public void setRecordInfoService(RecordInfoService recordInfoService) {
        this.recordInfoService = recordInfoService;
    }

    public void setChannelService(ChannelService channelService) {
        this.channelService = channelService;
    }

    public void setEpgInfoService(EpgInfoService epgInfoService) {
        this.epgInfoService = epgInfoService;
    }

    public void setCustomTaskService(CustomTaskService customTaskService) {
        this.customTaskService = customTaskService;
    }

    public Pager getPager() {
        if (pager == null) {
            pager = new Pager();
        }
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }

    public List<RecordTask> getTasks() {
        return this.tasks;
    }

    @RequestMapping(method = RequestMethod.POST, value = "api/record/fulltime")
    @ResponseBody
    public Map<String, Object> add(@RequestBody FullTimeRecordInfo info) {
        if (info.getRecordType() != RecordType.FULLTIME) {

            return createModelMap(INVALID_ARGUMENT, "Invalid record type for fulltime: %s", info.getRecordType());
        }
        if (info.getKeepTimes() != null && (info.getKeepTimes() % 60 != 0)) {
            return createModelMap(INVALID_ARGUMENT, "The keep time must be N times of 60 minutes.");
        }
        if (StringHelper.isBlank(info.getName())) {
            return createModelMap(INVALID_ARGUMENT, "The name has not specified.");
        }
        if (StringHelper.isBlank(info.getOutputPath())) {
            return createModelMap(INVALID_ARGUMENT, "The output path has not specified.");
        }
        if (StringHelper.isBlank(info.getFileName())) {
            return createModelMap(INVALID_ARGUMENT, "The file name has not specified.");
        }
        if (info.getSegmentLength() == null) {
            return createModelMap(INVALID_ARGUMENT, "The segment length has not specified.");
        } else {
            switch (info.getSegmentLength()) {
                case 10:
                case 600:
                case 900:
                case 1200:
                case 1800:
                case 3600:
                case 7200:
                    break;
                default:
                    return createModelMap(INVALID_ARGUMENT, "The segment length (%d) is not accept.", info.getSegmentLength());
            }
        }
        if (info.getChannelId() != null) {
            if (channelService.get(info.getChannelId()) == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find the channel(id=%d).", info.getChannelId());
            }
        } else {
            return createModelMap(INVALID_ARGUMENT, "The channel has not specified.");
        }
        if (info.getProfile() != null) {
            if (liveProfileService.getLiveProfile(info.getProfile()) == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find profile(id=%d).", info.getProfile());
            }
        } else if (info.getProfileName() != null) {
            List<LiveProfile> profiles = liveProfileService.getAllLiveProfiles(false);
            for (LiveProfile profile : profiles) {
                if (info.getProfileName().equals(profile.getName())) {
                    info.setProfile(profile.getId());
                    break;
                }
            }
            if (info.getProfile() == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find profile(name=%s).", info.getProfileName());
            }
        } else {
            return createModelMap(INVALID_ARGUMENT, "The profile has not specified.");
        }

        Schedule schedule = info.getSchedule();
        if (schedule == null) {
            schedule = new Schedule();
            info.setSchedule(schedule);
            schedule.setScheduleType(ScheduleType.ONCE);
        } else if (schedule.getScheduleType() != ScheduleType.ONCE) {
            return createModelMap(INVALID_ARGUMENT, "Invalid schedule type %s.", schedule.getScheduleType());
        }
        if (schedule.getStartDate() == null) {
            long current = System.currentTimeMillis();
            schedule.setStartDate(new Date(current));
            schedule.setStartTime(new Time(current));
            schedule.setStartType(StartType.SCHEDULE);
        } else {
            schedule.setStartType(StartType.SCHEDULE);
        }
        if (schedule.getEndDate() == null) {
            schedule.setEndType(EndType.CONTINUOUS);
            schedule.setEndDate(null);
            schedule.setEndTime(null);
        } else {
            schedule.setEndType(EndType.BYTIME);
        }

        if (schedule.getStartDate() != null && schedule.getEndDate() != null) {
            LocalDateTime startDateTime = new LocalDate(schedule.getStartDate()).toLocalDateTime(schedule.getStartTime() == null ? LocalTime.MIDNIGHT : new LocalTime(schedule.getStartTime()));
            LocalDateTime endDateTime = new LocalDate(schedule.getEndDate()).toLocalDateTime(schedule.getEndTime() == null ? LocalTime.MIDNIGHT : new LocalTime(schedule.getEndTime()));
            if (!startDateTime.isBefore(endDateTime)) {
                return createModelMap(INVALID_ARGUMENT, "Invalid schedule time range startTime: %s, endTime: %s.", startDateTime.toString(), endDateTime.toString());
            }
        }
        //判断ftp是否连接成功，不成功返回信息
        if (info.isFtpApiOption()) {
            FtpServerServiceImpl ftp = new FtpServerServiceImpl();
            boolean flag = ftp.ftpConnection(info.getFtpApiIP(), 21, info.getFtpApiUserName(), info.getFtpApiPassWord());
            if (!flag) {
                return createModelMap(INVALID_ARGUMENT, "Invalid args FTP connection faild", info.getChannelId(), info.getName());
            }

        }

        try

        {
            info.setId(null);
            RecordInfo recordInfo = recordInfoService.save(info);
            Map<String, Object> model = createSuccessMap();
            model.put(RECORDID, recordInfo.getId());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save record (channel=%d, name=%s) failed.", info.getChannelId(), info.getName());
        }

    }

    @RequestMapping(method = RequestMethod.POST, value = "api/record/addepgfile")
    @ResponseBody
    public Map<String, Object> addepgfile(@RequestBody EpgInfo info) {
        if (StringHelper.isBlank(info.getFilePath())) {
            return createModelMap(INVALID_ARGUMENT, "The epg path has not specified.");
        }
        if (info.getChannelId() != null) {
            if (channelService.get(info.getChannelId()) == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find the channel(id=%d).", info.getChannelId());
            }
        } else {
            return createModelMap(INVALID_ARGUMENT, "The channel has not specified.");
        }

        try {
            Map<String, Object> model = createSuccessMap();
            info.setId(null);
            EpgInfo oriInfo = epgInfoService.findByChannelId(info.getChannelId());
            if (oriInfo != null) {
                oriInfo.setFilePath(info.getFilePath());
                epgInfoService.update(oriInfo);
                model.put("id", oriInfo.getId());
            } else {
                epgInfoService.save(info);
                model.put("id", info.getId());
            }
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save epg (channel=%d, name=%s) failed.", info.getChannelId(), info.getFilePath());
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "api/record/{id}")
    @ResponseBody
    public Map<String, Object> delete(@PathVariable Integer id) {
        RecordInfo recordInfo = recordInfoService.get(id);
        if (recordInfo == null) {
            return createModelMap(RECORD_NOT_EXIST, "The specified Record (id=%d) is not exist.", id);
        } else {
            try {
                recordInfoService.delete(id);
                return createSuccessMap();
            } catch (Exception e) {
                return createModelMap(UNKNOWN_ERROR, "Delete record(id=%d) failed.", id);
            }
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "api/record/{id}/taskid")
    @ResponseBody
    public Map<String, Object> getTaskIdByRecordId(@PathVariable Integer id) {
        Integer taskId;
        try {

            pager = customTaskService.getTasks(true, this.getPager().getPageIndex(), this.getPager().getPageSize());
            this.tasks = (List<RecordTask>) pager.getResult();
            if (this.tasks != null) {
                for (RecordTask task : tasks) {
                    if (task.getRecordId() != null && task.getRecordId().equals(id)) {
                        taskId = task.getId();
                        Map<String, Object> model = createSuccessMap();
                        model.put(TASKID, taskId);
                        model.put("state", task.getState());
                        return model;
                    }
                }
            }
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Exception: GetTaskIdByRecordId failed.(%s)", e.getMessage());
        }

        return createModelMap(UNKNOWN_ERROR, "GetTaskIdByRecordId failed, Can't find match Task");
    }




    @RequestMapping(method = RequestMethod.POST, value = "api/record/schedule")
    @ResponseBody
    public Map<String, Object> addchedule(@RequestBody RecordInfo info) {
        if (info.getRecordType() != RecordType.SCHEDULE) {
            return createModelMap(INVALID_ARGUMENT, "Invalid record type for schedule: %s", info.getRecordType());
        }

        if (StringHelper.isBlank(info.getName())) {
            return createModelMap(INVALID_ARGUMENT, "The name has not specified.");
        }
        if (StringHelper.isBlank(info.getOutputPath())) {
            return createModelMap(INVALID_ARGUMENT, "The output path has not specified.");
        }
        if (StringHelper.isBlank(info.getFileName())) {
            return createModelMap(INVALID_ARGUMENT, "The file name has not specified.");
        }
        if (info.getChannelId() != null) {
            if (channelService.get(info.getChannelId()) == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find the channel(id=%d).", info.getChannelId());
            }
        } else {
            return createModelMap(INVALID_ARGUMENT, "The channel has not specified.");
        }
        if (info.getProfile() != null) {
            if (liveProfileService.getLiveProfile(info.getProfile()) == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find profile(id=%d).", info.getProfile());
            }
        } else if (info.getProfileName() != null) {
            List<LiveProfile> profiles = liveProfileService.getAllLiveProfiles(false);
            for (LiveProfile profile : profiles) {
                if (info.getProfileName().equals(profile.getName())) {
                    info.setProfile(profile.getId());
                    break;
                }
            }
            if (info.getProfile() == null) {
                return createModelMap(INVALID_ARGUMENT, "Cannot find profile(name=%s).", info.getProfileName());
            }
        } else {
            return createModelMap(INVALID_ARGUMENT, "The profile has not specified.");
        }

        Schedule schedule = info.getSchedule();
        if (schedule == null) {
            schedule = new Schedule();
            info.setSchedule(schedule);
            schedule.setScheduleType(ScheduleType.ONCE);
        } else if (schedule.getScheduleType() != ScheduleType.ONCE &&
                schedule.getScheduleType() != ScheduleType.WEEKLY) {
            schedule.setScheduleType(ScheduleType.ONCE);
        }
        if (schedule.getStartDate() == null) {
            long current = System.currentTimeMillis();
            schedule.setStartDate(new Date(current));
            schedule.setStartTime(new Time(current));
            schedule.setStartType(StartType.SCHEDULE);
        } else {
            schedule.setStartType(StartType.SCHEDULE);
        }
        if (schedule.getScheduleType() == ScheduleType.ONCE) {
            if (schedule.getEndDate() == null) {
                schedule.setEndType(EndType.CONTINUOUS);
                schedule.setEndDate(null);
                schedule.setEndTime(null);
            } else {
                schedule.setEndType(EndType.BYTIME);
            }
        } else if (schedule.getScheduleType() == ScheduleType.WEEKLY) {
            if (schedule.getRepeatEndDate() == null) {
                return createModelMap(INVALID_ARGUMENT, "The Weekly schedule RepeatEndDate has not specified.");
            } else {
                schedule.setEndType(EndType.BYTIME);
                schedule.setRepeatEndType(RepeatEndType.BYDATE);
            }
            if (schedule.getDays() < 0 || schedule.getDays() > 127) {
                return createModelMap(INVALID_ARGUMENT, "The Weekly schedule Repeat days has not specified.");
            }
        }

        schedule.setInterval(1);

        if (schedule.getStartDate() != null && schedule.getEndDate() != null) {
            LocalDateTime startDateTime = new LocalDate(schedule.getStartDate()).toLocalDateTime(schedule.getStartTime() == null ? LocalTime.MIDNIGHT : new LocalTime(schedule.getStartTime()));
            LocalDateTime endDateTime = new LocalDate(schedule.getEndDate()).toLocalDateTime(schedule.getEndTime() == null ? LocalTime.MIDNIGHT : new LocalTime(schedule.getEndTime()));
            if (!startDateTime.isBefore(endDateTime)) {
                return createModelMap(INVALID_ARGUMENT, "Invalid schedule time range startTime: %s, endTime: %s.", startDateTime.toString(), endDateTime.toString());
            }
        }

        //判断ftp是否连接成功，不成功返回信息
        if (info.isFtpApiOption()) {
            FtpServerServiceImpl ftp = new FtpServerServiceImpl();
            boolean flag = ftp.ftpConnection(info.getFtpApiIP(), 21, info.getFtpApiUserName(), info.getFtpApiPassWord());
            if (!flag) {
                return createModelMap(INVALID_ARGUMENT, "Invalid args FTP connection faild", info.getChannelId(), info.getName());
            }

        }


        try {
            info.setId(null);
            RecordInfo recordInfo = recordInfoService.save(info);

            Map<String, Object> model = createSuccessMap();
            model.put(RECORDID, recordInfo.getId());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save record (channel=%d, name=%s) failed.", info.getChannelId(), info.getName());
        }
    }
}
