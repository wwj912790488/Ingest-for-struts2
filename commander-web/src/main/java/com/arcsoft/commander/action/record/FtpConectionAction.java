package com.arcsoft.commander.action.record;


import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.record.FtpInfo;
import com.arcsoft.commander.service.record.impl.FtpServerServiceImpl;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;


@SuppressWarnings("serial")
public class FtpConectionAction extends BaseAction{
    String ip;
    String username;
    String password;

    private ActionResult result;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ActionResult getResult() {
        return result;
    }

    public String ftpConntection() {
        //com.arcsoft.tmservice

        FtpServerServiceImpl ftp = new FtpServerServiceImpl();
        boolean flag = ftp.ftpConnection(this.getIp(), 21,this.getUsername(), this.getPassword());
        if (flag) {
            result = new ActionResult(true, "ftp连接成功");
            return SUCCESS;
        } else {
            result = new ActionResult(true, "ftp连接失败");
            return SUCCESS;
        }

    }



}
