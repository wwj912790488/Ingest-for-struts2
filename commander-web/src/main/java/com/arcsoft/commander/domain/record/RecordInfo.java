package com.arcsoft.commander.domain.record;

import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.schedule.Schedule;

import java.util.List;

/**
 * Record info.
 *
 * @author fjli
 */
public class RecordInfo {

    private Integer id;
    private String name;
    private Integer channelId;
    private Integer profile;
    private String profileName;
    private RecordType recordType;
    private String outputPath;
    private String fileName;
    private Schedule schedule;
    private Boolean generateThumb;
    private Integer thumbWidth;
    private Integer thumbHeight;
    private String createFolderMap;
    private boolean ftpOption;
    private String ftpPath;
    private boolean ftpApiOption;
    private String ftpApiIP;
    private String ftpApiUserName;
    private String ftpApiPassWord;
    private String ftpApiPath;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getChannelId() {
        return channelId;
    }

    public void setChannelId(Integer channelId) {
        this.channelId = channelId;
    }

    public Integer getProfile() {
        return profile;
    }

    public void setProfile(Integer profile) {
        this.profile = profile;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public RecordType getRecordType() {
        return recordType;
    }

    public void setRecordType(RecordType recordType) {
        this.recordType = recordType;
    }

    public String getOutputPath() {
        return outputPath;
    }

    public void setOutputPath(String outputPath) {
        this.outputPath = outputPath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Boolean getGenerateThumb() {
        return generateThumb;
    }

    public void setGenerateThumb(Boolean generateThumb) {
        this.generateThumb = generateThumb;
    }

    public Integer getThumbWidth() {
        return thumbWidth;
    }

    public void setThumbWidth(Integer thumbWidth) {
        this.thumbWidth = thumbWidth;
    }

    public Integer getThumbHeight() {
        return thumbHeight;
    }

    public void setThumbHeight(Integer thumbHeight) {
        this.thumbHeight = thumbHeight;
    }

    public List<Channel> getChannels() {
        return channels;
    }

    public void setChannels(List<Channel> channels) {
        this.channels = channels;
    }

    public String getCreateFolderMap() {
        return createFolderMap;
    }

    public void setCreateFolderMap(String createFolderMap) {
        this.createFolderMap = createFolderMap;
    }

    public String getFtpApiPath() {
        return ftpApiPath;
    }

    public void setFtpApiPath(String ftpApiPath) {
        this.ftpApiPath = ftpApiPath;
    }

    public String getFtpApiIP() {
        return ftpApiIP;
    }

    public void setFtpApiIP(String ftpApiIP) {
        this.ftpApiIP = ftpApiIP;
    }

    public String getFtpApiPassWord() {
        return ftpApiPassWord;
    }

    public void setFtpApiPassWord(String ftpApiPassWord) {
        this.ftpApiPassWord = ftpApiPassWord;
    }

    public String getFtpApiUserName() {
        return ftpApiUserName;
    }

    public void setFtpApiUserName(String ftpApiUserName) {
        this.ftpApiUserName = ftpApiUserName;
    }

    public boolean isFtpApiOption() {
        return ftpApiOption;
    }

    public void setFtpApiOption(boolean ftpApiOption) {
        this.ftpApiOption = ftpApiOption;
    }

    private List<Channel> channels;

    public boolean isFtpOption() {
        return ftpOption;
    }

    public void setFtpOption(boolean ftpOption) {
        this.ftpOption = ftpOption;
    }

    public String getFtpPath() {
        return ftpPath;
    }


    public void setFtpPath(String ftpPath) {
        this.ftpPath = ftpPath;
    }
}
