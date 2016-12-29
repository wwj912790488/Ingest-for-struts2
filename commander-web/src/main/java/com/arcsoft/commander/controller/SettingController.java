package com.arcsoft.commander.controller;


import java.io.*;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalDateTimeService;
import com.arcsoft.commander.service.settings.LocalStorageService;
import com.arcsoft.commander.service.settings.RemoteDateTimeService;
import com.arcsoft.commander.service.settings.RemoteStorageService;

import com.arcsoft.util.ConstantUtils;
import com.arcsoft.web4transcoder.AppConfig;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.server.ServerService;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * REST API for channel manager.
 * 
 * @author fjli
 */
@Controller
public class SettingController {

    private LocalDateTimeService localDateTimeService;
    private RemoteDateTimeService remoteDateTimeService;

    private ServerService serverService;

    private LocalStorageService localStorageService;
    private RemoteStorageService remoteStorageService;

    private Logger logger = Logger.getLogger(LiveEventController.class);
    private ExecutorService executor = Executors.newCachedThreadPool();
    private NTPStatus ntpStatus;

    private final static String VIEW_GROUP_STORAGES = "storages";
    private final static String VIEW_GROUP_NTPS = "ntps";
    protected static final String VIEW_SUCCESS = "success";
    protected static final String VIEW_ERROR = "error";
    private final static String VIEW_VERSION = "version";

    public void setLocalDateTimeService(LocalDateTimeService localDateTimeService) {
        this.localDateTimeService = localDateTimeService;
    }

    public void setRemoteDateTimeService(RemoteDateTimeService remoteDateTimeService) {
        this.remoteDateTimeService = remoteDateTimeService;
    }

    public void setRemoteStorageService(RemoteStorageService remoteStorageService) {
        this.remoteStorageService = remoteStorageService;
    }

    public void setServerService(ServerService serverService) {
        this.serverService = serverService;
    }

    public void setLocalStorageService(LocalStorageService localStorageService) {
        this.localStorageService = localStorageService;
    }

    public void destroy() {
        executor.shutdown();
        try {
            executor.awaitTermination(Long.MAX_VALUE, TimeUnit.DAYS);
        } catch (InterruptedException e) {
            logger.error(e);
        }
    }

    @XmlRootElement(name = "ntpServers")
    public static class NtpList {
        @XmlElement(name = "ntpServer")
        private List<String> ntps;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/ntp")
    public ModelAndView getGroupNtp(@RequestBody String ntps,HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        response.setContentType("application/xml;charset=UTF-8");
        try {
            NTPStatus ntpStatus = localDateTimeService.getNTPStatus();
            mv.addObject("ntps", ntpStatus.getNtpServers());
            mv.setViewName(VIEW_GROUP_NTPS);
        } catch (Exception e) {
            fillErrorModelAndView(mv, e.getMessage());
            return mv;
        }
        return mv;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/ntp/update")
    public ModelAndView updateGroupNtp(@RequestBody String ntps,HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        response.setContentType("application/xml;charset=UTF-8");
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(NtpList.class);
            Unmarshaller marshaller = jaxbContext.createUnmarshaller();
            NtpList list = (NtpList) marshaller.unmarshal(new StringReader(ntps));
            final NTPStatus ntpservers = new NTPStatus(true, list.ntps);
            executor.execute(new Runnable() {

                @Override
                public void run() {
                    try {
                        // update commander
                        localDateTimeService.syncWithNTP(ntpservers);
                    } catch (Exception e) {
                        logger.error(e);
                    }
                    // update servers
                    for (ServerGroup group : serverService.list(false)) {
                        for (Server server : serverService.getGroup(group.getId(), true).getServers()) {
                            try {
                                remoteDateTimeService.setDateTime(server, new Date(), ntpservers);
                            } catch (Exception e) {
                                logger.error(e);
                            }
                        }
                    }
                }
            });
            mv.setViewName(VIEW_SUCCESS);
        } catch (Exception e) {
            fillErrorModelAndView(mv, e.getMessage());
            return mv;
        }
        return mv;
    }

    @XmlRootElement(name = "storages")
    public static class StorageList {
        @XmlElement(name = "storage")
        private List<Storage> storages;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/storages")
//    public ModelAndView getGroupStorages(@RequestBody String storages, @RequestBody String id, @RequestBody Boolean isLocal) {
    public ModelAndView getGroupStorages(@RequestBody String storages,HttpServletResponse response) {
        List<Storage> remoteStorageList = new ArrayList<>();
        ModelAndView mv = new ModelAndView();
        response.setContentType("application/xml;charset=UTF-8");

        try {
            if (true ) {//isLocal
                remoteStorageList = localStorageService.findAllRemoteStorages();

                Map<String, String> mountedMap = localStorageService.getRemoteMounted();
                for (Storage each : remoteStorageList) {
                    each.setMounted(mountedMap.containsKey(each.getName())
                            && mountedMap.get(each.getName()).equals(each.getPath()));
                }
                mv.addObject("storages", remoteStorageList);
                mv.setViewName(VIEW_GROUP_STORAGES);

            } else {
                Server agent = serverService.getServer("0");//id
                Map<String, String> mountedMap = remoteStorageService.getRemoteMounted(agent);
                remoteStorageList = remoteStorageService.findAllRemoteStorages(agent);
                for (Storage each : remoteStorageList){
                    each.setMounted(mountedMap.containsKey(each.getName())
                            && mountedMap.get(each.getName()).equals(each.getPath()));
                }

                mv.addObject("storages", remoteStorageList);
                mv.setViewName(VIEW_GROUP_STORAGES);
            }
        } catch (SystemNotInitializedException e) {
            fillErrorModelAndView(mv, "system.not.initialized");
        } catch (AccessDeniedForSlaveException e) {
            fillErrorModelAndView(mv, "system.slave.access.denied");
        } catch (ServerNotAvailableException se) {
            fillErrorModelAndView(mv, "msg.error.server.not.available");
        } catch (RemoteException re) {
            fillErrorModelAndView(mv, re.getMessage());
        } catch (Exception e) {
            fillErrorModelAndView(mv, e.getMessage());
        }
        return mv;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/storages/update")
//    public ModelAndView updateGroupStorage(@RequestBody String storages, @RequestBody String id, @RequestBody Boolean isLocal) {
    public ModelAndView updateGroupStorage(@RequestBody String storages,HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        List<String> errList = new ArrayList<>();
        response.setContentType("application/xml;charset=UTF-8");

        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(StorageList.class);
            Unmarshaller marshaller = jaxbContext.createUnmarshaller();
            StorageList list = (StorageList) marshaller.unmarshal(new StringReader(storages));

            List<Storage> remoteStorageList = new ArrayList<>();


            if (true) {//isLocal
                remoteStorageList = localStorageService.findAllRemoteStorages();
//                for (Storage storage : remoteStorageList) {
//                    localStorageService.delRemoteStorage(Integer.valueOf(storage.getId()));
//                }
                for (Storage storage : list.storages) {
                    boolean isNeedAdd = true;
                    for (Storage localstorage : remoteStorageList) {
                        if(storage.getName().equals(localstorage.getName())
                            && storage.getPath().equals(localstorage.getPath()))
                        {
                            isNeedAdd = false;
                            break;
                        }
                    }
                    if(isNeedAdd){
                        try {
                            localStorageService.addRemoteStorage(storage);
                            localStorageService.mountStorage(storage);
                            errList.add("[Ingest]:Mount "+storage.getPath()+" with ("+storage.getName()+") update successful.");
                        }catch(Exception e){
                            errList.add("[Ingest]:Mount "+storage.getPath()+" with ("+storage.getName()+") update failed."+e.getMessage());
                        }
                    }else{
                        errList.add("[Ingest]:Mount "+storage.getPath()+" with ("+storage.getName()+") is already exist.");
                    }
                }
            } else {
                Server agent = serverService.getServer("0");//id
                for (Storage storage : list.storages) {
                    remoteStorageService.updateStorage(agent, storage);
                }
            }

            mv.setViewName(VIEW_ERROR);
        } catch (SystemNotInitializedException e) {
            fillErrorModelAndView(mv, "system.not.initialized");
        } catch (AccessDeniedForSlaveException e) {
            fillErrorModelAndView(mv, "system.slave.access.denied");
        } catch (ServerNotAvailableException se) {
            fillErrorModelAndView(mv, "msg.error.server.not.available");
        } catch (RemoteException re) {
            fillErrorModelAndView(mv, re.getMessage());
        } catch (Exception e) {
            fillErrorModelAndView(mv, e.getMessage());
        }

        mv.addObject(ConstantUtils.ERRORS, errList);
        return mv;
    }

    protected final void fillErrorModelAndView(ModelAndView mv, String message) {
        if(message == null) {
            message = "";
        }
        List<String> errorMessages = new ArrayList<String>();
        errorMessages.add(message);

        mv.setViewName(VIEW_ERROR);
        mv.addObject(ConstantUtils.ERRORS, errorMessages);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/version")
    public ModelAndView getVersion(@RequestBody String strversion,HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        response.setContentType("application/xml;charset=UTF-8");

        try {
            String version ="Ingest:" + AppConfig.getProperty("version");
            mv.addObject("version", version);
            mv.setViewName(VIEW_VERSION);
        }catch (Exception e) {
            fillErrorModelAndView(mv, e.getMessage());
        }

        return mv;
    }
}
