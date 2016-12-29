package com.arcsoft.commander.controller;

import static com.arcsoft.commander.controller.ApiErrorCode.*;
import static com.arcsoft.commander.controller.ControllerUtils.*;

import java.util.List;
import java.util.Map;

import com.arcsoft.commander.domain.media.MediaInfo;
import com.arcsoft.commander.domain.media.ProgramInfo;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.service.task.MediaInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.channel.SourceType;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.channel.ChannelService;
import com.arcsoft.commander.service.server.ServerService;

/**
 * REST API for channel manager.
 *
 * @author fjli
 */
@Controller
public class ChannelController {

    private ChannelService channelService;
    private ServerService serverService;
    private MediaInfoService cmdMediaInfoService;

    public void setChannelService(ChannelService channelService) {
        this.channelService = channelService;
    }

    public void setServerService(ServerService serverService) {
        this.serverService = serverService;
    }

    public void setCmdMediaInfoService(MediaInfoService cmdMediaInfoService) {
        this.cmdMediaInfoService = cmdMediaInfoService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "api/channels/{pageNo}")
    @ResponseBody
    public Map<String, Object> list(@PathVariable String pageNo) {
        int index = 0;
        int pageSize = 20;
        if (pageNo.equalsIgnoreCase("ALL")) {
            pageSize = Integer.MAX_VALUE;
        } else {
            try {
                index = Integer.parseInt(pageNo);
            } catch (NumberFormatException e) {
                return createModelMap(INVALID_PAGE_NO, "Invalid page number: %s", pageNo);
            }
        }
        try {
            QueryInfo info = new QueryInfo();
            info.addSortOrder(SortOrder.desc("id"));
            Pager pager = channelService.list(info, index, pageSize);
            Map<String, Object> model = createSuccessMap();
            model.put("total", pager.getTotalRows());
            model.put("pagesize", pageSize == Integer.MAX_VALUE ? pager.getTotalRows() : pageSize);
            model.put("pageindex", pager.getPageIndex());
            model.put("pagecount", pager.getPageCount());
            model.put("channels", pager.getResult());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Query channels(page=%s) failed.", pageNo);
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "api/channel")
    @ResponseBody
    public Map<String, Object> add(@RequestBody Channel channel) {
        if (SourceType.UDP != channel.getType() && SourceType.HTTP != channel.getType()) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel source type: %s", channel.getType());
        }
        if (SourceType.UDP == channel.getType()) {
            if (channel.getUri() == null || !channel.getUri().matches("^(udp:(//)?)?([0-9\\.\\:]*)$")) {
                return createModelMap(INVALID_ARGUMENT, "Invalid channel uri: %s", channel.getUri());
            } else {
                channel.setUri(channel.getUri().replaceAll("^(udp:(//)?)?([0-9\\.\\:]*)$", "udp://$3"));
            }
        } else if (SourceType.HTTP == channel.getType()) {
            if (channel.getUri() == null || !channel.getUri().matches("^(http:(//)?)?([^\\s]*)$")) {
                return createModelMap(INVALID_ARGUMENT, "Invalid channel uri: %s", channel.getUri());
            } else {
                channel.setUri(channel.getUri().replaceAll("^(http:(//)?)?([^\\s]*)$", "http://$3"));
            }
        }
        List<ServerGroup> groups = serverService.list(true);
        if (groups.isEmpty()) {
            return createModelMap(NO_SERVER_GROUP, "No server group is assigned.");
        }
        /*try {
            channel.setGroup(groups.get(0));
			channel.setId(null);
			channelService.save(channel);
			Map<String, Object> model = createSuccessMap();
			model.put("id", channel.getId());
			model=this.addchannel(channel);
			return model;
		} catch (Exception e) {
			return createModelMap(UNKNOWN_ERROR, "Save channel(name=%s, uri=%s) failed.", channel.getName(), channel.getUri());
		}*/
        try {
            channel.setGroup(groups.get(0));
            channel.setId(null);
            //set default source type
            channel.setType(SourceType.UDP);

            // Need parse source, update videoPid/audioPid
            Server selectedServer = null;
            MediaInfo mediaInfo;
            if (channel.getVideoId() == null || channel.getVideoId() == 0 || channel.getAudioId() == null || channel.getAudioId() == 0) {
                for (Server server : groups.get(0).getServers()) {
                    if (server.isAlive() & server.getState() == Server.STATE_OK) {
                        selectedServer = server;
                        break;
                    }
                }
                mediaInfo = cmdMediaInfoService.getMediaInfoObject(selectedServer, channel.getUri(), null);
                if (mediaInfo.getPrograms().size() == 1) {
                    ProgramInfo program = mediaInfo.getPrograms().get(0);
                    channel.setVideoId(program.getVideos().get(0).getPid());
                    channel.setAudioId(program.getAudios().get(0).getPid());
                    String videoInfo = program.getVideos().get(0).getCodec() + " "
                            + program.getVideos().get(0).getResolution() + " "
                            + program.getVideos().get(0).getAspectRatio() + " "
                            + program.getVideos().get(0).getFramerate() + "fps";
                    channel.setVideoInfo(videoInfo);
                    String audioInfo = program.getAudios().get(0).getCodec() + " "
                            + program.getAudios().get(0).getChannel() + " "
                            + program.getAudios().get(0).getSamplerate() + "channel(s) "
                            + program.getAudios().get(0).getBitdepth() + "bits";
                    channel.setAudioInfo(audioInfo);
                } else {
                    //default agrs
                    channel.setVideoId(mediaInfo.getPrograms().get(0).getVideos().get(0).getPid());
                    channel.setAudioId(mediaInfo.getPrograms().get(0).getAudios().get(0).getPid());
                    String videoInfo = mediaInfo.getPrograms().get(0).getVideos().get(0).getCodec() + " "
                            + mediaInfo.getPrograms().get(0).getVideos().get(0).getResolution() + " "
                            + mediaInfo.getPrograms().get(0).getVideos().get(0).getAspectRatio() + " "
                            + mediaInfo.getPrograms().get(0).getVideos().get(0).getFramerate() + "fps";
                    channel.setVideoInfo(videoInfo);
                    String audioInfo = mediaInfo.getPrograms().get(0).getAudios().get(0).getCodec() + " "
                            + mediaInfo.getPrograms().get(0).getAudios().get(0).getChannel() + " "
                            + mediaInfo.getPrograms().get(0).getAudios().get(0).getSamplerate() + "channel(s) "
                            + mediaInfo.getPrograms().get(0).getAudios().get(0).getBitdepth() + "bits";
                    channel.setAudioInfo(audioInfo);
                    for (ProgramInfo program : mediaInfo.getPrograms()) {
                        if (program.getId() == channel.getProgramId()) {
                            channel.setVideoId(program.getVideos().get(0).getPid());
                            channel.setAudioId(program.getAudios().get(0).getPid());
                            String videoInfoProgram = program.getVideos().get(0).getCodec() + " "
                                    + program.getVideos().get(0).getResolution() + " "
                                    + program.getVideos().get(0).getAspectRatio() + " "
                                    + program.getVideos().get(0).getFramerate() + "fps";
                            channel.setVideoInfo(videoInfoProgram);
                            String audioInfoProgram = program.getAudios().get(0).getCodec() + " "
                                    + program.getAudios().get(0).getChannel() + " "
                                    + program.getAudios().get(0).getSamplerate() + "channel(s) "
                                    + program.getAudios().get(0).getBitdepth() + "bits";
                            channel.setAudioInfo(audioInfoProgram);
                            channel.setProgramId(program.getId());
                            break;
                        }
                    }
                    if(channel.getProgramId()==0){
                        channel.setProgramId(mediaInfo.getPrograms().get(0).getId());
                    }

                }
            }
            channelService.save(channel);

            Map<String, Object> model = createSuccessMap();
            model.put("id", channel.getId());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save channel(name=%s, uri=%s) failed.", channel.getName(), channel.getUri());
        }

    }

    @RequestMapping(method = RequestMethod.GET, value = "api/channel/{id}")
    @ResponseBody
    public Map<String, Object> get(@PathVariable Integer id) {
        try {
            Channel channel = channelService.get(id);
            if (channel != null) {
                Map<String, Object> model = createSuccessMap();
                model.put("channel", channel);
                return model;
            } else {
                return createModelMap(RECORD_NOT_EXIST, "The specified channel (id=%d) is not exist.", id);
            }
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Query channel(id=%d) failed.", id);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "api/channel/{id}")
    @ResponseBody
    public Map<String, Object> delete(@PathVariable Integer id) {
        Channel channel = channelService.get(id);
        if (channel == null) {
            return createModelMap(RECORD_NOT_EXIST, "The specified channel (id=%d) is not exist.", id);
        } else {
            try {
                channelService.delete(new Integer[]{id});
                return createSuccessMap();
            } catch (Exception e) {
                return createModelMap(UNKNOWN_ERROR, "Delete channel(id=%d) failed.", id);
            }
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "api/addchannel")
    @ResponseBody
    public Map<String, Object> addchannel(@RequestBody Channel channel) {
        if (channel.getName() == null) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel name: %s", channel.getName());
        }
        if (channel.getProgramId() == null) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel program id: %d", channel.getProgramId());
        }
        if (channel.getDefRecordPath() == null) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel default record path: %s", channel.getDefRecordPath());
        }
        if (channel.getUri() == null || !channel.getUri().trim().matches("^(udp:(//)?)?([0-9\\.\\:]*)$")) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel uri: %s", channel.getUri());
        } else {
            channel.setUri(channel.getUri().trim().replaceAll("^(udp:(//)?)?([0-9\\.\\:]*)$", "udp://$3"));
        }
        List<ServerGroup> groups = serverService.list(true);
        if (groups.isEmpty()) {
            return createModelMap(NO_SERVER_GROUP, "No server group is assigned.");
        }
        try {
            channel.setGroup(groups.get(0));
            channel.setId(null);
            //set default source type
            channel.setType(SourceType.UDP);

            // Need parse source, update videoPid/audioPid
            Server selectedServer = null;
            MediaInfo mediaInfo;
            if (channel.getVideoId() == null || channel.getAudioId() == null) {
                for (Server server : groups.get(0).getServers()) {
                    if (server.isAlive() & server.getState() == Server.STATE_OK) {
                        selectedServer = server;
                        break;
                    }
                }
                mediaInfo = cmdMediaInfoService.getMediaInfoObject(selectedServer, channel.getUri(), null);
                if (mediaInfo.getPrograms().size() == 1) {
                    ProgramInfo program = mediaInfo.getPrograms().get(0);
                    channel.setVideoId(program.getVideos().get(0).getPid());
                    channel.setAudioId(program.getAudios().get(0).getPid());
                    String videoInfo = program.getVideos().get(0).getCodec() + " "
                            + program.getVideos().get(0).getResolution() + " "
                            + program.getVideos().get(0).getAspectRatio() + " "
                            + program.getVideos().get(0).getFramerate() + "fps";
                    channel.setVideoInfo(videoInfo);
                    String audioInfo = program.getAudios().get(0).getCodec() + " "
                            + program.getAudios().get(0).getChannel() + " "
                            + program.getAudios().get(0).getSamplerate() + "channel(s) "
                            + program.getAudios().get(0).getBitdepth() + "bits";
                    channel.setAudioInfo(audioInfo);
                } else {
                    for (ProgramInfo program : mediaInfo.getPrograms()) {
                        if (program.getId() == channel.getProgramId()) {
                            channel.setVideoId(program.getVideos().get(0).getPid());
                            channel.setAudioId(program.getAudios().get(0).getPid());
                            String videoInfo = program.getVideos().get(0).getCodec() + " "
                                    + program.getVideos().get(0).getResolution() + " "
                                    + program.getVideos().get(0).getAspectRatio() + " "
                                    + program.getVideos().get(0).getFramerate() + "fps";
                            channel.setVideoInfo(videoInfo);
                            String audioInfo = program.getAudios().get(0).getCodec() + " "
                                    + program.getAudios().get(0).getChannel() + " "
                                    + program.getAudios().get(0).getSamplerate() + "channel(s) "
                                    + program.getAudios().get(0).getBitdepth() + "bits";
                            channel.setAudioInfo(audioInfo);
                            break;
                        }
                    }
                }
            }
            channelService.save(channel);

            Map<String, Object> model = createSuccessMap();
            model.put("id", channel.getId());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save channel(name=%s, uri=%s) failed.", channel.getName(), channel.getUri());
        }
    }


    @RequestMapping(method = RequestMethod.PUT, value = "/api/channel/{id}")
    @ResponseBody
    public Map<String, Object> editPutchannel(@RequestBody Channel channel) {
        if (channel.getId() == null) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel id: %s", channel.getId());
        }
        try {
            Channel oriChannel = channelService.get(channel.getId());
            Boolean programIdUpdate = false;
            Boolean uriUpdate = false;
            if (channel.getName() != null) {
                oriChannel.setName(channel.getName());
            }
            if (channel.getProgramId() != null) {
                oriChannel.setProgramId(channel.getProgramId());
                programIdUpdate = true;
            }
            if (channel.getDefRecordPath() != null) {
                oriChannel.setDefRecordPath(channel.getDefRecordPath());
            }
            if (channel.getUri() != null && channel.getUri().matches("^(udp:(//)?)?([0-9\\.\\:]*)$")) {
                channel.setUri(channel.getUri().replaceAll("^(udp:(//)?)?([0-9\\.\\:]*)$", "udp://$3"));
                oriChannel.setUri(channel.getUri());
                uriUpdate = true;
            }

            if (programIdUpdate || uriUpdate) {
                List<ServerGroup> groups = serverService.list(true);
                if (groups.isEmpty()) {
                    return createModelMap(NO_SERVER_GROUP, "No server group is assigned.");
                }

                // Need parse source, update videoPid/audioPid
                Server selectedServer = null;
                MediaInfo mediaInfo;
                for (Server server : groups.get(0).getServers()) {
                    if (server.isAlive() & server.getState() == Server.STATE_OK) {
                        selectedServer = server;
                        break;
                    }
                }
                mediaInfo = cmdMediaInfoService.getMediaInfoObject(selectedServer, channel.getUri(), null);
                //default agrs
                channel.setVideoId(mediaInfo.getPrograms().get(0).getVideos().get(0).getPid());
                channel.setAudioId(mediaInfo.getPrograms().get(0).getAudios().get(0).getPid());
                String videoInfo = mediaInfo.getPrograms().get(0).getVideos().get(0).getCodec() + " "
                        + mediaInfo.getPrograms().get(0).getVideos().get(0).getResolution() + " "
                        + mediaInfo.getPrograms().get(0).getVideos().get(0).getAspectRatio() + " "
                        + mediaInfo.getPrograms().get(0).getVideos().get(0).getFramerate() + "fps";
                channel.setVideoInfo(videoInfo);
                String audioInfo = mediaInfo.getPrograms().get(0).getAudios().get(0).getCodec() + " "
                        + mediaInfo.getPrograms().get(0).getAudios().get(0).getChannel() + " "
                        + mediaInfo.getPrograms().get(0).getAudios().get(0).getSamplerate() + "channel(s) "
                        + mediaInfo.getPrograms().get(0).getAudios().get(0).getBitdepth() + "bits";
                channel.setAudioInfo(audioInfo);
                for (ProgramInfo program : mediaInfo.getPrograms()) {
                    if (program.getId() == channel.getProgramId()) {
                        oriChannel.setVideoId(program.getVideos().get(0).getPid());
                        oriChannel.setAudioId(program.getAudios().get(0).getPid());
                        String videoInfoProgram = program.getVideos().get(0).getCodec() + " "
                                + program.getVideos().get(0).getResolution() + " "
                                + program.getVideos().get(0).getAspectRatio() + " "
                                + program.getVideos().get(0).getFramerate() + "fps";
                        oriChannel.setVideoInfo(videoInfoProgram);
                        String audioInfoProgram = program.getAudios().get(0).getCodec() + " "
                                + program.getAudios().get(0).getChannel() + " "
                                + program.getAudios().get(0).getSamplerate() + "channel(s) "
                                + program.getAudios().get(0).getBitdepth() + "bits";
                        oriChannel.setAudioInfo(audioInfoProgram);
                        oriChannel.setProgramId(channel.getProgramId());
                        break;
                    }

                }
                if(channel.getProgramId()==0){
                    oriChannel.setProgramId(mediaInfo.getPrograms().get(0).getId());
                }
            }

            channelService.update(oriChannel);
            Map<String, Object> model = createSuccessMap();
            model.put("id", channel.getId());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save channel(name=%s, uri=%s) failed.", channel.getName(), channel.getUri());
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "api/editchannel")
    @ResponseBody
    public Map<String, Object> editchannel(@RequestBody Channel channel) {
        if (channel.getId() == null) {
            return createModelMap(INVALID_ARGUMENT, "Invalid channel id: %s", channel.getId());
        }
        try {
            Channel oriChannel = channelService.get(channel.getId());
            Boolean programIdUpdate = false;
            Boolean uriUpdate = false;
            if (channel.getName() != null) {
                oriChannel.setName(channel.getName());
            }
            if (channel.getProgramId() != null) {
                oriChannel.setProgramId(channel.getProgramId());
                programIdUpdate = true;
            }
            if (channel.getDefRecordPath() != null) {
                oriChannel.setDefRecordPath(channel.getDefRecordPath());
            }
            if (channel.getUri() != null && channel.getUri().matches("^(udp:(//)?)?([0-9\\.\\:]*)$")) {
                channel.setUri(channel.getUri().replaceAll("^(udp:(//)?)?([0-9\\.\\:]*)$", "udp://$3"));
                oriChannel.setUri(channel.getUri());
                uriUpdate = true;
            }

            if (programIdUpdate || uriUpdate) {
                List<ServerGroup> groups = serverService.list(true);
                if (groups.isEmpty()) {
                    return createModelMap(NO_SERVER_GROUP, "No server group is assigned.");
                }

                // Need parse source, update videoPid/audioPid
                Server selectedServer = null;
                MediaInfo mediaInfo;
                for (Server server : groups.get(0).getServers()) {
                    if (server.isAlive() & server.getState() == Server.STATE_OK) {
                        selectedServer = server;
                        break;
                    }
                }
                mediaInfo = cmdMediaInfoService.getMediaInfoObject(selectedServer, channel.getUri(), null);
                for (ProgramInfo program : mediaInfo.getPrograms()) {
                    if (program.getId() == channel.getProgramId()) {
                        oriChannel.setVideoId(program.getVideos().get(0).getPid());
                        oriChannel.setAudioId(program.getAudios().get(0).getPid());
                        String videoInfo = program.getVideos().get(0).getCodec() + " "
                                + program.getVideos().get(0).getResolution() + " "
                                + program.getVideos().get(0).getAspectRatio() + " "
                                + program.getVideos().get(0).getFramerate() + "fps";
                        oriChannel.setVideoInfo(videoInfo);
                        String audioInfo = program.getAudios().get(0).getCodec() + " "
                                + program.getAudios().get(0).getChannel() + " "
                                + program.getAudios().get(0).getSamplerate() + "channel(s) "
                                + program.getAudios().get(0).getBitdepth() + "bits";
                        oriChannel.setAudioInfo(audioInfo);
                        break;
                    }
                }
            }

            channelService.update(oriChannel);
            Map<String, Object> model = createSuccessMap();
            model.put("id", channel.getId());
            return model;
        } catch (Exception e) {
            return createModelMap(UNKNOWN_ERROR, "Save channel(name=%s, uri=%s) failed.", channel.getName(), channel.getUri());
        }
    }
}
