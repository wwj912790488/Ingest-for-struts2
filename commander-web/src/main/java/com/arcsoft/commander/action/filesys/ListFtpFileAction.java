package com.arcsoft.commander.action.filesys;

import java.io.File;
import java.io.FileFilter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.commander.service.record.impl.FtpServerServiceImpl;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.service.settings.LocalStorageService;
import com.arcsoft.commons.utils.app.ShellException;
import com.arcsoft.util.OSInfo;
import com.arcsoft.web4transcoder.AppConfig;
import com.arcsoft.web4transcoder.action.support.FileDialogAction;
import com.opensymphony.xwork2.ActionSupport;


@SuppressWarnings("serial")
public class ListFtpFileAction extends ActionSupport implements FileDialogAction, ServletRequestAware {

    private HttpServletRequest request;
    private LocalStorageService localStorageService = null;
    protected String dir = null;
    private List<File> files = null;
    private boolean onlyFolder;
    private boolean ftpFlag;
    private String IP;
    private String userName;
    private String passWrod;
    private RecordInfoService recordInfoService;

    @Override
    public void setServletRequest(HttpServletRequest req) {
        this.request = req;
    }

    public void setLocalStorageService(LocalStorageService localStorageService) {
        this.localStorageService = localStorageService;
    }

    public RecordInfoService getRecordInfoService() {
        return recordInfoService;
    }

    public void setRecordInfoService(RecordInfoService recordInfoService) {
        this.recordInfoService = recordInfoService;
    }

    public String getIP() {
        return IP;
    }

    public void setIP(String IP) {
        this.IP = IP;
    }

    public String getPassWrod() {
        return passWrod;
    }

    public void setPassWrod(String passWrod) {
        this.passWrod = passWrod;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setOnlyFolder(boolean onlyFolder) {
        this.onlyFolder = onlyFolder;
    }

    public boolean isFtpFlag() {
        return ftpFlag;
    }

    public void setFtpFlag(boolean ftpFlag) {
        this.ftpFlag = ftpFlag;
    }

    @Override
    public void setDir(String dir) {
        this.dir = dir;
    }

    @Override
    public List<File> getFiles() {
        return files;
    }

    protected String decodeDir(String dir) throws UnsupportedEncodingException {
        String ret;
        ret = URLDecoder.decode(dir, "UTF-8");
        return ret;
    }

    private String mapRealPath(String dir) {
        if ("/".equals(dir)) { //root dir is only allowed from /mnt/data
            if (OSInfo.getOS() == OSInfo.WINDOW) {
                //windows
                dir = this.request.getServletContext().getRealPath("/");
                dir = dir.substring(0, dir.indexOf(File.separatorChar) + 1);
            } else {
                //linux
                dir = AppConfig.getProperty(AppConfig.KEY_LIST_PATH);
            }
            if (!dir.endsWith("/") && !dir.endsWith("\\")) {
                dir = dir + "/";
            }
        }

        return dir;
    }

    @Override
    public String execute() throws Exception {
        File[] fs = null;
        if (ftpFlag) {
            FtpServerServiceImpl ftp = new FtpServerServiceImpl();
            boolean flag = ftp.ftpConnection(IP, 21, userName, passWrod);
            if (flag) {
                String theDir = decodeDir(this.dir);
                fs = ftp.getFiles(theDir);
                ftp.logout();
                this.files = Arrays.asList(fs == null ? new File[0] : fs);
                request.setAttribute("dir", theDir);
                return SUCCESS;
            }

        } else {
            IP = recordInfoService.getSetting().getFtpip();
            userName = recordInfoService.getSetting().getFtpuser();
            passWrod = recordInfoService.getSetting().getFtppass();
            FtpServerServiceImpl ftp = new FtpServerServiceImpl();
            boolean flag = ftp.ftpConnection(IP, 21, userName, passWrod);
            if (flag) {
                String theDir = decodeDir(this.dir);
                fs = ftp.getFiles(theDir);
                ftp.logout();
                this.files = Arrays.asList(fs == null ? new File[0] : fs);
                request.setAttribute("dir", theDir);
                return SUCCESS;
            }


        }
        return null;
    }

    private File[] getRemoteDirs(File remoteBaseDir) throws ShellException {
        ArrayList<File> dirs = new ArrayList<File>();
        List<Storage> storages = this.localStorageService.findAllRemoteStorages();
        Map<String, String> alreadyMountedMap = this.localStorageService.getRemoteMounted();
        if (alreadyMountedMap != null && !alreadyMountedMap.isEmpty()) {
            for (Storage st : storages) {
                if (st.getPath().equals(alreadyMountedMap.get(st.getName()))) {
                    File d = new File(remoteBaseDir, st.getName());
                    dirs.add(d);
                }
            }
        }
        return dirs.toArray(new File[0]);
    }

}
