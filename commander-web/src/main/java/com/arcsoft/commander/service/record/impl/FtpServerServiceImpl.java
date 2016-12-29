package com.arcsoft.commander.service.record.impl;

import com.arcsoft.commander.service.record.FtpServerService;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.List;


public class FtpServerServiceImpl implements FtpServerService {
    FTPClient ftp;

    /**
     * Description: 向FTP服务器上传文件
     *
     * @param url      FTP服务器hostname
     * @param port     FTP服务器端口
     * @param username FTP登录账号
     * @param password FTP登录密码
     * @return 成功返回true，否则返回false
     * @Version1.0
     */
    public boolean ftpConnection(
            String url,//FTP服务器hostname
            int port,//FTP服务器端口
            String username, // FTP登录账号
            String password //FTP登录密码
    ) {
        boolean success = false;
        ftp = new FTPClient();
        try {
            int reply;
            ftp.connect(url, port);//连接FTP服务器
            //如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器
            ftp.login(username, password);//登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return success;
            }
            ftp.setControlEncoding("UTF-8");
            success = true;
            return success;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return success;
    }

    public void logout() {
        try {
            ftp.logout();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }

    }

    public File[] getFiles(String path) {
        List<File> fileList = new ArrayList<File>();
        try {
            //ftp.enterLocalActiveMode();//开通
            FTPFile[] list = ftp.listFiles(path);
            for (FTPFile ftpFile : list) {
                if (ftpFile.isDirectory()) {
                    File file = new File(path,ftpFile.getName());
                    fileList.add(file);
                }
            }
            return  fileList.toArray(new File[0]);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


   /* public static void main(String[] args) {
        FtpServerServiceImpl ftp = new FtpServerServiceImpl();
        boolean flag = ftp.ftpConnection("172.17.230.34", 21, "ftpadmin", "ftpadmin");
        System.out.println(flag);
        ftp.getFiles("/ftp");
        ftp.logout();

    }*/

}
