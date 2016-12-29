package com.arcsoft.commander.domain.record;

/**
 * Record settings.
 *
 * @author fjli
 */
public class RecordSetting {

    private Integer startOffsetTime;
    private Integer stopOffsetTime;
    private Boolean enableTempExtension;
    private String tempExtension;
    private Boolean enableThumb;
    private Integer thumbWidth;
    private String fulltimeFileName;
    private String fulltimeFilePath;
    private Integer fulltimeKeepTimes;
    private String scheduleFileName;
    private String scheduleFilePath;
    private String epgFileName;
    private String epgFilePath;

    private String ftpip;
    private String ftpuser;
    private String ftppass;
    private String ftpPath;

    public String getFtpPath() {
        return ftpPath;
    }

    public void setFtpPath(String ftpPath) {
        this.ftpPath = ftpPath;
    }

    public String getFtpip() {
        return ftpip;
    }

    public void setFtpip(String ftpip) {
        this.ftpip = ftpip;
    }

    public String getFtppass() {
        return ftppass;
    }

    public void setFtppass(String ftppass) {
        this.ftppass = ftppass;
    }

    public String getFtpuser() {
        return ftpuser;
    }

    public void setFtpuser(String ftpuser) {
        this.ftpuser = ftpuser;
    }

    public Integer getStartOffsetTime() {
        return startOffsetTime;
    }

    public void setStartOffsetTime(Integer startOffsetTime) {
        this.startOffsetTime = startOffsetTime;
    }

    public Integer getStopOffsetTime() {
        return stopOffsetTime;
    }

    public void setStopOffsetTime(Integer stopOffsetTime) {
        this.stopOffsetTime = stopOffsetTime;
    }

    public Boolean getEnableTempExtension() {
        return enableTempExtension;
    }

    public void setEnableTempExtension(Boolean enableTempExtension) {
        this.enableTempExtension = enableTempExtension;
    }

    public String getTempExtension() {
        return tempExtension;
    }

    public void setTempExtension(String tempExtension) {
        this.tempExtension = tempExtension;
    }

    public Boolean getEnableThumb() {
        return enableThumb;
    }

    public void setEnableThumb(Boolean enableThumb) {
        this.enableThumb = enableThumb;
    }

    public Integer getThumbWidth() {
        return thumbWidth;
    }

    public void setThumbWidth(Integer thumbWidth) {
        this.thumbWidth = thumbWidth;
    }

    public String getFulltimeFileName() {
        return fulltimeFileName;
    }

    public void setFulltimeFileName(String fulltimeFileName) {
        this.fulltimeFileName = fulltimeFileName;
    }

    public String getFulltimeFilePath() {
        return fulltimeFilePath;
    }

    public void setFulltimeFilePath(String fulltimeFilePath) {
        this.fulltimeFilePath = fulltimeFilePath;
    }

    public Integer getFulltimeKeepTimes() {
        return fulltimeKeepTimes;
    }

    public void setFulltimeKeepTimes(Integer fulltimeKeepTimes) {
        this.fulltimeKeepTimes = fulltimeKeepTimes;
    }

    public String getScheduleFileName() {
        return scheduleFileName;
    }

    public void setScheduleFileName(String scheduleFileName) {
        this.scheduleFileName = scheduleFileName;
    }

    public String getScheduleFilePath() {
        return scheduleFilePath;
    }

    public void setScheduleFilePath(String scheduleFilePath) {
        this.scheduleFilePath = scheduleFilePath;
    }

    public String getEpgFileName() {
        return epgFileName;
    }

    public void setEpgFileName(String epgFileName) {
        this.epgFileName = epgFileName;
    }

    public String getEpgFilePath() {
        return epgFilePath;
    }

    public void setEpgFilePath(String epgFilePath) {
        this.epgFilePath = epgFilePath;
    }

}
