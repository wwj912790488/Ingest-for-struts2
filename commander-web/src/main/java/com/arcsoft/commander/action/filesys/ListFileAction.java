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
public class ListFileAction extends ActionSupport implements FileDialogAction, ServletRequestAware {

    private HttpServletRequest request;
    private LocalStorageService localStorageService = null;
    protected String dir = null;
    private List<File> files = null;
    private boolean onlyFolder;
    private boolean ftpFlag;
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

        String theDir = mapRealPath(decodeDir(this.dir));
        if (theDir != null) {
            File remoteBaseDir = new File(AppConfig.getProperty("storage.remote.dir"));
            File currdir = new File(theDir);
            if (currdir.equals(remoteBaseDir)) {
                fs = getRemoteDirs(remoteBaseDir);
            } else {
                fs = currdir.listFiles(new FileFilter() {
                    @Override
                    public boolean accept(File f) {
                        if (onlyFolder && !f.isDirectory()) {
                            return false;
                        }
                        return !f.isHidden();
                    }
                });
                if (fs != null) {
                    Arrays.sort(fs, new Comparator<File>() {
                        @Override
                        public int compare(File f1, File f2) {
                            if (f1.isDirectory() && f2.isFile())
                                return -1;
                            else if (f1.isFile() && f2.isDirectory())
                                return 1;
                            else
                                return f1.getName().compareToIgnoreCase(f2.getName());
                        }
                    });
                }
            }
        }

        this.files = Arrays.asList(fs == null ? new File[0] : fs);
        return SUCCESS;

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
