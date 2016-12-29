package com.arcsoft.commander.service.record.impl;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.*;

import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.domain.channel.SourceType;
import com.arcsoft.web4transcoder.AppConfig;
import com.arcsoft.web4transcoder.domain.audio.AudioDescription;
import com.arcsoft.web4transcoder.domain.input.*;
import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.ConfigVarProperties;
import com.arcsoft.arcvideo.common.utils.ConfigVarsConverter;
import com.arcsoft.arcvideo.common.utils.DateHelper;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.record.FullTimeRecordInfo;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordSetting;
import com.arcsoft.commander.domain.record.RecordTask;
import com.arcsoft.commander.domain.record.RecordType;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;
import com.arcsoft.commander.domain.schedule.ScheduleTriggerEvent;
import com.arcsoft.commander.service.channel.ChannelService;
import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.commander.service.record.RecordTaskService;
import com.arcsoft.commander.service.schedule.ScheduleEventProcessor;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.web4transcoder.domain.Location;
import com.arcsoft.web4transcoder.domain.outputgroup.ArchiveGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;


import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

public class ScheduleEventProcessorImpl implements ScheduleEventProcessor {

    private static final ConfigVarsConverter CONVERTER = ConfigVarsConverter.getConverter("#{", '}', false, '|');
    private Logger log = Logger.getLogger(ScheduleEventProcessorImpl.class);
    private RecordInfoService recordInfoService;
    private CustomTaskService customTaskService;
    private RecordTaskService recordTaskService;
    private ChannelService channelService;
    private TaskExecuteService taskExecuteService;


    public void setRecordInfoService(RecordInfoService recordInfoService) {
        this.recordInfoService = recordInfoService;
    }

    public void setChannelService(ChannelService channelService) {
        this.channelService = channelService;
    }

    public void setCustomTaskService(CustomTaskService customTaskService) {
        this.customTaskService = customTaskService;
    }

    public void setRecordTaskService(RecordTaskService recordTaskService) {
        this.recordTaskService = recordTaskService;
    }

    public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
        this.taskExecuteService = taskExecuteService;
    }

    @Override
    public void processScheduleEvent(ScheduleTriggerEvent event) {
        ScheduleEvent scheduleEvent = event.getScheduleEvent();
        ScheduleTrigger trigger = event.getScheduleTrigger();
        List<ScheduleTrigger> triggers = scheduleEvent.getTriggers();
        log.info("Schedule event(id=" + scheduleEvent.getId() + ") is triggered at " + trigger.getScheduleTime() + ", " + new Timestamp(System.currentTimeMillis()));

        if (triggers.indexOf(trigger) == 0) {
            if (triggers.size() > 1) {
                ScheduleTrigger stopTrigger = triggers.get(1);
                Calendar c = Calendar.getInstance();
                c.add(Calendar.SECOND, 10);
                if (stopTrigger.getScheduleTime().before(c.getTime())) {
                    log.warn("The stop time is already past, skip start the task.");
                    return;
                }
            }
            startTask(scheduleEvent, trigger);
        } else {
            stopTask(scheduleEvent.getId());
        }
    }

    private ConfigVarProperties getProperties(Channel channel, RecordInfo info, ScheduleEvent event) {
        ConfigVarProperties p = new ConfigVarProperties(CONVERTER);
        p.setProperty("channel.id", channel.getId().toString());
        p.setProperty("channel.name", channel.getName());
        if (info.getRecordType() == RecordType.SCHEDULE || info.getRecordType() == RecordType.EPGITEM) {
            if (info.getName() != null) {
                p.setProperty("name", info.getName());
            }
            int size = event.getTriggers().size();
            if (size > 0) {
                p.setProperty("starttime", String.valueOf(event.getTriggers().get(0).getScheduleTime().getTime()));
                if (size > 1) {
                    p.setProperty("endtime", String.valueOf(event.getTriggers().get(1).getScheduleTime().getTime()));
                }
            }
        }
        return p;
    }

    private String generateExtensionData(RecordInfo info) {
        String extensionData = "";
        if (info.getGenerateThumb() != null && info.getGenerateThumb()) {
            extensionData += ";thumb=" + StringHelper.toDefaultIfNull(info.getThumbWidth(), -1) + "x" + StringHelper.toDefaultIfNull(info.getThumbHeight(), -1);
        }
        if (info instanceof FullTimeRecordInfo) {
            FullTimeRecordInfo fulltime = (FullTimeRecordInfo) info;
            if (fulltime.getKeepTimes() != null) {
                extensionData += ";keepTimes=" + fulltime.getKeepTimes();
            }
        }

        // create folder extension info
        if (info.getCreateFolderMap() != null && !info.getCreateFolderMap().isEmpty()) {
            Channel channel = channelService.get(info.getChannelId());
            String map = info.getCreateFolderMap();
            if(map.contains("${CHANNELNAME}")){
                map = map.replace("${CHANNELNAME}",channel.getName());
            }
            if(map.contains("${YEAR}")){
                map = map.replace("${YEAR}","yyyy");
            }
            if(map.contains("${MONTH}")){
                map = map.replace("${MONTH}","MM");
            }
            if(map.contains("${DAY}")){
                map = map.replace("${DAY}","dd");
            }
            extensionData += ";createfolderMap=" + map;
        }

        //ftp extension info
        if (info.isFtpApiOption()) {
            extensionData += ";ftpOption=" + info.isFtpApiOption();
            extensionData += ";ftpIP=" + info.getFtpApiIP();
            extensionData += ";ftpUserName=" + info.getFtpApiUserName();
            extensionData += ";ftpPassword=" + info.getFtpApiPassWord();
            extensionData += ";ftpPath=" + info.getFtpApiPath() + ";";
            return extensionData.replaceAll("^;+", "");
        }

        if (info.isFtpOption()) {
            String ftpIP = StringHelper.toDefaultIfNull(recordInfoService.getSetting().getFtpip(), "");
            String ftpUserName = StringHelper.toDefaultIfNull(recordInfoService.getSetting().getFtpuser(), "");
            String ftpPassword = StringHelper.toDefaultIfNull(recordInfoService.getSetting().getFtppass(), "");
            String ftpPath = info.getFtpPath();
            extensionData += ";ftpOption=" + info.isFtpOption();
            extensionData += ";ftpIP=" + ftpIP;
            extensionData += ";ftpUserName=" + ftpUserName;
            extensionData += ";ftpPassword=" + ftpPassword;
            extensionData += ";ftpPath=" + ftpPath + ";";
            return extensionData.replaceAll("^;+", "");
        }

        return extensionData.replaceAll("^;+", "");
    }

    private void startTask(ScheduleEvent event, ScheduleTrigger trigger) {
        RecordInfo info = recordInfoService.find(event.getSchedule().getId());
        if (info == null) {
            log.error("cannot find the record info by schedule id(" + event.getSchedule().getId() + ")");
            return;
        }

        String outputFilename = "";
        String outputFileExt = "";
        String[] audioIds = {};
        Boolean doMultiAudio = false;
        Channel channel = channelService.get(info.getChannelId());
        if (channel.getAudioAll() != null && !channel.getAudioAll().isEmpty()) {
            audioIds = channel.getAudioAll().trim().split(" ");
            if (audioIds.length > 1) {
                doMultiAudio = true;
            }
        }
        RecordTask task = new RecordTask();
        customTaskService.fillTaskWithLiveProfile(info.getProfile(), task);
        if (channel.getScreenshotPath() != null && channel.getScreenshotPath() != "") {
            if (task.getStreamAssemblys().size() > 0 && task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().size() > 0) {
                task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().get(0).setTargetPath(channel.getScreenshotPath());
            }
        }
        task.setGroupId(channel.getGroup().getId());
        task.setType(channel.getGroup().getType());
        task.setRecordId(info.getId());
        task.setScheduleEventId(event.getId());
        for (Input input : task.getInputs()) {
            if (channel.getType() == SourceType.UDP) {
                input.setVideoInputType("UDP");
                NetworkInput network = new NetworkInput();
                network.setProtocol("TSOverUDP");
                network.setUri(channel.getUri());
                if (channel.getProgramId() == 0) {
                    network.setAllowProgramIdChange(1);
                }
                if (doMultiAudio) {
                    List<CandidateLocation> additionalAudios = new ArrayList<>();
                    for (int index = 1; index < audioIds.length; index++) {
                        CandidateLocation audio = new CandidateLocation();
                        audio.setId(index);
                        audio.setInputType("Network");
                        audio.setUri(channel.getUri());
                        audio.setProgramId(channel.getProgramId());
                        audio.setAudioTrackId(Integer.parseInt(audioIds[index]));
                        audio.setSubtitleId(-3);
                        audio.setAudioChannelId(-1);
                        audio.setAudioTrackIds(audioIds[index]);
                        additionalAudios.add(audio);
                    }
                    network.setAdditionalAudios(additionalAudios);
                }
                input.setBody(network);
            } else if (channel.getType() == SourceType.HTTP) {
                input.setVideoInputType("HTTP");
                NetworkInput network = new NetworkInput();
                network.setProtocol("HTTP");
                network.setUri(channel.getUri());
                input.setBody(network);
            } else if (channel.getType() == SourceType.SDI) {
                input.setVideoInputType("SDI");
                SdiDeviceInput sdi = new SdiDeviceInput();
                if (channel.getUri().startsWith("sdi:")) {
                    String port = channel.getUri().replace("sdi:", " ").trim();
                    sdi.setChannel(Integer.parseInt(port));
                }
                input.setBody(sdi);
            } else if (channel.getType() == SourceType.ASI) {
                input.setVideoInputType("ASI");
                AsiDeviceInput asi = new AsiDeviceInput();
                if (channel.getUri().startsWith("asi:")) {
                    String port = channel.getUri().replace("asi:", " ").trim();
                    asi.setChannel(Integer.parseInt(port));
                }
                input.setBody(asi);
            }

            input.setProgramId(channel.getProgramId());
            input.setVideoTrackId(channel.getVideoId());
            input.setAudioTrackId(channel.getAudioId());

        }

        if (doMultiAudio) {
            if (task.getStreamAssemblys().size() > 0 && task.getStreamAssemblys().get(0).getAudioDescriptions().size() > 1) {
                List<AudioDescription> audioDescriptions = new ArrayList<>();
                audioDescriptions.clear();
                for (int index = 0; index < task.getStreamAssemblys().get(0).getAudioDescriptions().size(); index++) {
                    if (index == 0) {
                        task.getStreamAssemblys().get(0).getAudioDescriptions().get(index).setCandidateLocationId("0");
                        audioDescriptions.add(task.getStreamAssemblys().get(0).getAudioDescriptions().get(index));
                    } else {
                        String sId = ((Integer) index).toString();
                        if (audioIds.length > index) {
                            task.getStreamAssemblys().get(0).getAudioDescriptions().get(index).setCandidateLocationId(sId);
                            audioDescriptions.add(task.getStreamAssemblys().get(0).getAudioDescriptions().get(index));
                        } else {
                            break;
                        }
                    }
                }
                task.getStreamAssemblys().get(0).setAudioDescriptions(audioDescriptions);
            }
        }

        // set the task name
        String taskName = channel.getName();
        if (info.getName() != null) {
            taskName += "-" + info.getName();
        }
        taskName += "-" + DateHelper.formatDateTime(trigger.getScheduleTime(), "yyyyMMddHHmmss");
        task.setName(taskName);

        // set output segment info.
        RecordSetting recordSetting = recordInfoService.getSetting();
        Boolean enableTempExtension = recordSetting.getEnableTempExtension();
        String tmpExtension = Boolean.TRUE.equals(enableTempExtension) ? recordSetting.getTempExtension() : null;
        ConfigVarProperties vars = getProperties(channel, info, event);
        for (LiveOutputGroup outputGroup : task.getOutputGroups()) {
            OutputGroupSetting setting = outputGroup.getOutputGroupSetting();
            if (setting instanceof ArchiveGroupSetting) {
                ArchiveGroupSetting archive = (ArchiveGroupSetting) setting;
                // create output path.
                String outputPath = info.getOutputPath();
                if(outputPath.contains("${CHANNELNAME}")){
                    outputPath = outputPath.replace("${CHANNELNAME}",channel.getName());
                }
                if(!outputPath.contains("${")){
                    File file = new File(outputPath);
                    if (!file.exists()) {
                        file.mkdirs();
                    }
                }
                Location location = new Location();
                location.setUri(outputPath);
                archive.setLocation(location);
                if (tmpExtension != null && !tmpExtension.isEmpty()) {
                    if (((ArchiveGroupSetting) setting).getExtension().equals("ts") ||
                            ((ArchiveGroupSetting) setting).getExtension().equals("mp4")) {
                        archive.setTempExtension(tmpExtension);
                    } else {
                        archive.setTempExtension(((ArchiveGroupSetting) setting).getExtension());
                    }
                }
                vars.setProperty("RESULT", info.getFileName());
                archive.setTargetName(vars.getString("RESULT"));
                outputFilename = archive.getTargetName();
                outputFileExt = archive.getExtension();
                switch (info.getRecordType()) {
                    case FULLTIME:
                        FullTimeRecordInfo fulltime = (FullTimeRecordInfo) info;
                        archive.setSegmentType(1);
                        archive.setSegmentRecordLength(fulltime.getSegmentLength());
                        break;
                    case SCHEDULE:
                    case EPGITEM:
                        archive.setSegmentType(0);
                        break;
                    default:
                        break;
                }
            }
        }

        // set user data.
        task.setUserData(generateExtensionData(info));

        Integer saveXml = Integer.parseInt(AppConfig.getProperty("create.output.xml"));
        if (saveXml == 1) {
            saveXML(info, channel, outputFilename, outputFileExt);
        }

        // save task
        customTaskService.saveTask(task);

        // start task
        try {
            log.info("start task: taskId=" + task.getId() + ", recordId=" + task.getRecordId() + ", eventId=" + task.getScheduleEventId());
            taskExecuteService.startTask(task.getId());
        } catch (Exception e) {
            log.error("start task failed: task id=" + task.getId(), e);
        }
    }

    private void stopTask(Long eventId) {
        RecordTask task = recordTaskService.getRecordTaskByEventId(eventId);
        if (task != null) {
            log.info("stop task: taskId=" + task.getId() + ", recordId=" + task.getRecordId() + ", eventId=" + task.getScheduleEventId());
            taskExecuteService.stopTask(task.getId());
        }
    }

    private void saveXML(RecordInfo info, Channel channel, String outputFilename, String outputFileExt) {
        try {
            Path path = Paths.get(info.getOutputPath(), outputFilename);

            Document doc;
            DocumentBuilderFactory factory = DocumentBuilderFactory
                    .newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            doc = builder.newDocument();

            Element root = doc.createElement("EPGItems");
            doc.appendChild(root);
            Element item = doc.createElement("EPGItem");

            Element channelName = doc.createElement("channelname");
            channelName.appendChild(doc.createTextNode(channel.getName()));
            item.appendChild(channelName);

            Element name = doc.createElement("name");
            name.appendChild(doc.createTextNode(info.getName()));
            item.appendChild(name);

            Element startdatetime = doc.createElement("startdatetime");
            startdatetime.appendChild(doc.createTextNode(
                    info.getSchedule().getStartDate() + "_" + info.getSchedule().getStartTime()));
            item.appendChild(startdatetime);

            Element enddatetime = doc.createElement("enddatetime");
            enddatetime.appendChild(doc.createTextNode(
                    info.getSchedule().getEndDate() + "_" + info.getSchedule().getEndTime()));
            item.appendChild(enddatetime);

            Element outputpath = doc.createElement("path");
            outputpath.appendChild(doc.createTextNode(
                    path.toString() + "." + outputFileExt));
            item.appendChild(outputpath);
            root.appendChild(item);

            writeXML(doc, path.toString() + ".xml");
        } catch (Exception e) {
            log.error("saveXML failed." + e.getMessage(), e);
        }
    }

    private synchronized void writeXML(Document doc, String filePath) {
        try {
            TransformerFactory tf = TransformerFactory.newInstance();
            try {
                Transformer transformer = tf.newTransformer();
                doc.setXmlStandalone(true);
                DOMSource source = new DOMSource(doc);
                transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
                transformer.setOutputProperty(OutputKeys.INDENT, "yes");
                PrintWriter pw = new PrintWriter(new FileOutputStream(filePath));
                StreamResult result = new StreamResult(pw);

                transformer.transform(source, result);
            } catch (TransformerConfigurationException e) {
                log.error("writeXML failed." + e.getMessage());
            } catch (IllegalArgumentException e) {
                log.error("writeXML failed." + e.getMessage());
            } catch (FileNotFoundException e) {
                log.error("writeXML failed." + e.getMessage());
            } catch (TransformerException e) {
                log.error("writeXML failed." + e.getMessage());
            }
        } catch (Exception e) {
            log.error("saveXML failed." + e.getMessage(), e);
        }
    }

}
