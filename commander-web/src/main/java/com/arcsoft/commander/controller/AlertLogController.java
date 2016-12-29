package com.arcsoft.commander.controller;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;

import com.arcsoft.commander.domain.alert.SysAlert;
import com.arcsoft.commander.service.alert.SysAlertService;
import com.arcsoft.commander.service.alert.impl.SysAlertServiceImpl;
import com.arcsoft.commander.service.channel.ChannelService;
import com.arcsoft.commander.util.DateFormatUtil;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.arcsoft.web4transcoder.controller.ControllerSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* internal: used for agent upload log package */
@Controller
@RequestMapping("/api/alert")
public class AlertLogController extends ControllerSupport {

    private SysAlertService sysAlertService;


    public void setSysAlertService(SysAlertService sysAlertService) {
        this.sysAlertService = sysAlertService;
    }

    public static final String DATE_FULL_STR = "yyyy-MM-dd HH:mm:ss";

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView handleUploadView() {
        return null;
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ModelAndView uploadAlertLogFile(DefaultMultipartHttpServletRequest request, Model model,HttpServletResponse response) {
        MultipartFile file = request.getFile("logfile");
        String folder = System.getProperty("java.io.tmpdir");
        response.setContentType("application/xml;charset=UTF-8");
        try {
            if (file != null) {
                String fileName = null;
                InputStream inputStream = null;
                OutputStream outputStream = null;
                if (file.getSize() > 0) {
                    inputStream = file.getInputStream();

                    fileName = folder + "/" + file.getOriginalFilename();
                    outputStream = new FileOutputStream(fileName);
                    int readBytes = 0;
                    byte[] buffer = new byte[8192];
                    while ((readBytes = inputStream.read(buffer, 0, 8192)) != -1) {
                        outputStream.write(buffer, 0, readBytes);
                    }
                    outputStream.close();
                    inputStream.close();
                    // ..........................................
                    request.getSession().setAttribute("logfile", file.getOriginalFilename());
                }
                // MultipartFile file = uploadItem.getFileData();
                model.addAttribute("success", "true");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @RequestMapping( method = RequestMethod.GET,value = "/queryListLog")
    @ResponseBody
    public List<SysAlert> queryList(HttpServletRequest request, Model model,
                                    @RequestParam(value = "beginTime", required = false) String beginTime,
                                    @RequestParam(value = "endTime", required = false) String endTime,
                                    @RequestParam(value = "pageIndex", required = false) Integer pageIndex,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        try {
            Date beginDate = DateFormatUtil.StringToDatetime(beginTime);
            Date endDate = DateFormatUtil.StringToDatetime(endTime);
            List<SysAlert> list = sysAlertService.queryList(beginDate,endDate,pageIndex,pageSize);
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
