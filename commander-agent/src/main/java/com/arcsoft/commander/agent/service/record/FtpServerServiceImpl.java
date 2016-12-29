package com.arcsoft.commander.agent.service.record;


import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


public class FtpServerServiceImpl {
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
    public boolean uploadFile(
            String url,//FTP服务器hostname
            int port,//FTP服务器端口
            String username, // FTP登录账号
            String password, //FTP登录密码
            String path,//FTP服务器保存目录
            String filename, //上传到FTP服务器上的文件名
            InputStream input // 输入流
    ) {
        boolean success = false;
        ftp = new FTPClient();
        try {
            int reply;
            ftp.connect(url, port);//连接FTP服务器
            //如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器
            ftp.login(username, password);//登录
            ftp.setBufferSize(1024);
            ftp.setControlEncoding("UTF-8");
            ftp.setFileType(FTP.BINARY_FILE_TYPE);
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return success;
            }
            if (path!=null && path.length() != 0) {
                ftp.makeDirectory(new String(path.getBytes("UTF-8"),"iso-8859-1"));
                ftp.changeWorkingDirectory(new String(path.getBytes("UTF-8"),"iso-8859-1"));
                ftp.storeFile(new String(filename.getBytes("UTF-8"),"iso-8859-1"), input);
            }
            success = true;
            ftp.logout();
            return success;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return success;
    }

   /* public static void main(String[] args) {
        try {
            FtpServerServiceImpl ftpServerService=new FtpServerServiceImpl();
            FileInputStream in = new FileInputStream(new File("D:\\app\\shoulu.ts"));
            boolean flag = ftpServerService.uploadFile("172.17.230.34", 21, "ftpadmin", "ftpadmin", "/ftp/wwj/新文件夹", "444.ts", in);
            System.out.println(flag);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }*/

}
