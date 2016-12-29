package com.arcsoft.commander.agent.service.record;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.commander.agent.service.builder.TaskXmlProcessFilter;
import com.arcsoft.commander.agent.service.oss.OSSUploadService;
import com.arcsoft.commander.agent.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.agent.service.task.impl.TaskEventHandler;
import com.arcsoft.commander.agent.service.task.impl.TaskInfo;
import com.arcsoft.commander.agent.service.task.impl.TaskStateChangedListener;
import com.arcsoft.commander.agent.service.task.impl.TaskUtils;
import com.arcsoft.commander.cluster.action.record.ScheduleDeleteFileRequest;
import com.arcsoft.transcoder.MediaInfoTool;
import com.arcsoft.util.SystemExecutor;
import com.arcsoft.web4transcoder.domain.Location;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.output.LiveOutput;
import com.arcsoft.web4transcoder.domain.outputgroup.ArchiveGroupSetting;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import com.arcsoft.web4transcoder.service.parser.XmlParser;
import com.arcsoft.web4transcoder.service.translator.TransformableTranslator;
import com.arcsoft.web4transcoder.type.TaskStatus;

import javax.swing.plaf.ViewportUI;

/**
 * Record task service.
 *
 * @author fjli
 */
public class RecordTaskService extends RemoteExecutorServiceSupport implements TaskXmlProcessFilter, TaskEventHandler, TaskStateChangedListener {

    private static final int SEGMENT_START = 0x00099003;
    private static final int SEGMENT_FINISHED = 0x00099004;
    private XmlParser taskXmlParser;
    private Logger log = Logger.getLogger(RecordTaskService.class);
    private BlockingQueue<Request> messageQueue;
    private Thread thread;
    private OSSUploadService ossUploadService;

    public void setOssUploadService(OSSUploadService ossUploadService) {
        this.ossUploadService = ossUploadService;
    }

    public void setTaskXmlParser(XmlParser taskXmlParser) {
        this.taskXmlParser = taskXmlParser;
    }

    public void init() {
        this.messageQueue = new LinkedBlockingQueue<>();
        this.thread = new Thread() {
            @Override
            public void run() {
                while (!thread.isInterrupted()) {
                    try {
                        Request request = messageQueue.take();
                        for (int retryCount = 0; retryCount < 10; retryCount++) {
                            try {
                                remoteExecutorService.remoteExecute(request);
                                break;
                            } catch (ActionException e) {
                                try {
                                    Thread.sleep(10000);
                                } catch (InterruptedException e1) {
                                    break;
                                }
                            }
                        }
                    } catch (InterruptedException e) {
                        break;
                    } catch (Exception e) {
                    }
                }
            }
        };
        thread.start();
    }

    public void destroy() {
        messageQueue.clear();
        if (thread != null) {
            thread.interrupt();
        }
    }

    @Override
    public List<Integer> getEventCodes() {
        return Arrays.asList(SEGMENT_START, SEGMENT_FINISHED);
    }

    @Override
    public void preProcessTask(Task task) {
        for (LiveOutputGroup outputGroup : task.getOutputGroups()) {
            OutputGroupSetting setting = outputGroup.getOutputGroupSetting();
            if (setting instanceof ArchiveGroupSetting) {
                ArchiveGroupSetting archive = (ArchiveGroupSetting) setting;
                if (StringHelper.isNotBlank(archive.getTempExtension())) {
                    archive.setExtension(archive.getTempExtension());
                    archive.setTempExtension(null);
                }
                Location location = archive.getLocation();
                if (location != null) {
                    String uri = location.getUri();
                    if (uri != null && ossUploadService.isFeatureEnabled() && StringHelper.startsWithIgnoreCase(uri, "oss:")) {
                        String localPath = ossUploadService.mappingToLocalPath(uri) + "_" + task.getId();
                        location.setUri(localPath);
                        new File(localPath).mkdirs();
                    }
                }
            }
        }
    }

    @Override
    public void processTaskEvent(TaskInfo taskInfo, int code, String message) {
        log.info("---- processTaskEvent code:" + code + " Message:" + message);
        switch (code) {
            case SEGMENT_START:
                break;
            case SEGMENT_FINISHED:
                onSegmentFinished(taskInfo, message);
                break;
        }
    }

    @Override
    public void onTaskStateChanged(TaskInfo taskInfo, TaskStatus oldState, TaskStatus newState) {
        log.info("onTaskStateChanged: " + taskInfo.getTaskId() + ", " + newState);
        switch (newState) {
            case ERROR:
            case CANCELLED:
            case COMPLETED:
                onTaskFinished(taskInfo);
                break;
            default:
                break;
        }
    }

    /**
     * On segment finished.
     */
    private void onSegmentFinished(final TaskInfo taskInfo, final String message) {
        log.info("---------------onSegmentFinished------------------");
        if (message != null) {
            SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {
                @Override
                public void run() {
                    Task task = convert(taskInfo);
                    Map<String, String> extensionMap = taskInfo.getExtensionData();
                    boolean ftpOption = Boolean.valueOf(extensionMap.get("ftpOption"));

                    // Format: LabelName="Value";FileName="Value"
                    Map<String, String> values = TaskUtils.parseArgsToMap(message);
                    String fileName = values.get("FileName");
                    String labelName = values.get("LabelName");
                    if (labelName == null || labelName == "") {
                        labelName = values.get("DumpLabelName");
                    }
                    // fetch thumb
                    int[] thumbSize = getThumbSize(extensionMap.get("thumb"));
                    String thumbFile = null;
                    if (thumbSize != null) {
                        thumbFile = fileName.replaceAll("\\.[^\\.]+$", ".jpg");
                        fetchThumbnail(Paths.get(fileName), Paths.get(thumbFile), thumbSize);
                    }

                    String path = Paths.get(fileName).toString().substring(0, Paths.get(fileName).toString().lastIndexOf('/'));

                    // copy file to folder.
                    String createfolderMap = extensionMap.get("createfolderMap");
                    if (createfolderMap != null && !createfolderMap.isEmpty()) {
                        Calendar c = Calendar.getInstance();//${YEAR}${MONTH}${DAY}-yyyyMMdd
                        if (createfolderMap.contains("yyyy")) {
                            createfolderMap = createfolderMap.replace("yyyy", String.valueOf(c.get(Calendar.YEAR)));
                        }
                        if (createfolderMap.contains("MM")) {
                            createfolderMap = createfolderMap.replace("MM",
                                    c.get(Calendar.MONTH) < 9 ? "0" + String.valueOf(c.get(Calendar.MONTH) + 1) : String.valueOf(c.get(Calendar.MONTH) + 1));
                        }
                        if (createfolderMap.contains("dd")) {
                            createfolderMap = createfolderMap.replace("dd",
                                    c.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + String.valueOf(c.get(Calendar.DAY_OF_MONTH)) : String.valueOf(c.get(Calendar.DAY_OF_MONTH)));
                        }

                        new File(Paths.get(path, createfolderMap).toString()).mkdirs();

                        if (thumbFile != null && !thumbFile.isEmpty()) {
                            String orifile = thumbFile;
                            thumbFile = Paths.get(Paths.get(path, createfolderMap).toString(),
                                    Paths.get(thumbFile).getFileName().toString()).toString();
                            renameFile(Paths.get(orifile), Paths.get(thumbFile));
                        }
                    }
                    // rename file
                    String finalName = null;
                    List<LiveOutputGroup> groups = task.getOutputGroups();
                    for (int groupIndex = 0; groupIndex < groups.size(); groupIndex++) {
                        LiveOutputGroup outputGroup = groups.get(groupIndex);
                        List<LiveOutput> outputs = outputGroup.getLiveOutputs();
                        for (int outputIndex = 0; outputIndex < outputs.size(); outputIndex++) {
                            String label = taskInfo.getTaskId() + "_" + groupIndex + "-" + outputIndex;
                            String labelNew = taskInfo.getTaskId() + "_" + groupIndex + "-o" + outputIndex;
                            log.info("label:" + label + " labelNew:" + labelNew);
                            OutputGroupSetting setting = outputGroup.getOutputGroupSetting();
                            if ((label.equals(labelName) || labelNew.equals(labelName)) && setting instanceof ArchiveGroupSetting) {
                                ArchiveGroupSetting archive = (ArchiveGroupSetting) setting;
                                if (archive.getSegmentType() == 1) {
                                    String extension = archive.getExtension();
                                    if (!extension.startsWith(".")) {
                                        extension = "." + extension;
                                    }
                                    if (!fileName.endsWith(extension)) {
                                        String orifile = fileName;
                                        finalName = fileName.replaceAll("\\.[^\\.]+$", extension);
                                        finalName = Paths.get(createfolderMap!=null?Paths.get(path, createfolderMap).toString():path,
                                                Paths.get(finalName).getFileName().toString()).toString();
                                        renameFile(Paths.get(orifile), Paths.get(finalName));
                                    } else if(createfolderMap!=null){
                                        String orifile = fileName;
                                        finalName = Paths.get(Paths.get(path, createfolderMap).toString(),
                                                Paths.get(fileName).getFileName().toString()).toString();
                                        renameFile(Paths.get(orifile), Paths.get(finalName));
                                    }

                                    path = archive.getLocation().getUri();
                                    String targetName = archive.getTargetName();

                                    //upload ftp
                                    if (ftpOption) {
                                        String ftpIP = extensionMap.get("ftpIP");
                                        String ftpUserName = extensionMap.get("ftpUserName");
                                        String ftpPassword = extensionMap.get("ftpPassword");
                                        String ftpPath = extensionMap.get("ftpPath");
                                        File SourceFile = Paths.get(finalName != null ? finalName : fileName).toFile();
                                        //String SourceUri = archive.getLocation().getUri() + "/" + SourceFile.getName();
                                        if (SourceFile.exists() && SourceFile.isFile()) {
                                            try {
                                                FileInputStream in = new FileInputStream(SourceFile);
                                                FtpServerServiceImpl ftpServerService = new FtpServerServiceImpl();
                                                boolean flag = ftpServerService.uploadFile(ftpIP, 21, ftpUserName, ftpPassword, ftpPath, SourceFile.getName(), in);
                                                if (flag) {
                                                    //delete task file
                                                    SourceFile.delete();
                                                }
                                                //jpg upload
                                                if (thumbSize != null) {
                                                    File jpgFile = Paths.get(thumbFile != null ? thumbFile : fileName).toFile();
                                                    FileInputStream jpgIn = new FileInputStream(jpgFile);
                                                    boolean jpgFlag = ftpServerService.uploadFile(ftpIP, 21, ftpUserName, ftpPassword, ftpPath, jpgFile.getName(), jpgIn);
                                                    if (jpgFlag) {
                                                        jpgFile.delete();
                                                    }
                                                }

                                                log.info("ftp_" + SourceFile.getName() + ": return " + flag);
                                            } catch (IOException e) {
                                                e.printStackTrace();
                                            }
                                        }

                                    }

                                }
                            }
                        }
                    }


                    // schedule to delete files.
                    Integer keepTimes = StringHelper.toInteger(extensionMap.get("keepTimes"));
                    if (keepTimes != null) {
                        ScheduleDeleteFileRequest request = new ScheduleDeleteFileRequest();
                        request.setFileName(finalName != null ? finalName : fileName);
                        Calendar c = Calendar.getInstance();
                        c.add(Calendar.MINUTE, keepTimes);
                        request.setDeleteAt(c.getTime());
                        messageQueue.add(request);
                    }
                }
            });
        }
    }


    /**
     * On task finished.
     */
    private void onTaskFinished(final TaskInfo taskInfo) {
        log.info("---------------- onTaskFinished: " + taskInfo.getTaskId());
        SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {
            @Override
            public void run() {
                final Task task = convert(taskInfo);
                Map<String, String> extensionMap = taskInfo.getExtensionData();
                int[] thumbSize = getThumbSize(extensionMap.get("thumb"));
                String createFolderMap = extensionMap.get("createfolderMap");
                if (createFolderMap != null && !createFolderMap.isEmpty()) {
                    Calendar c = Calendar.getInstance();//${YEAR}${MONTH}${DAY}-yyyyMMdd
                    if (createFolderMap.contains("yyyy")) {
                        createFolderMap = createFolderMap.replace("yyyy", String.valueOf(c.get(Calendar.YEAR)));
                    }
                    if (createFolderMap.contains("MM")) {
                        createFolderMap = createFolderMap.replace("MM",
                                c.get(Calendar.MONTH) < 9 ? "0" + String.valueOf(c.get(Calendar.MONTH) + 1) : String.valueOf(c.get(Calendar.MONTH) + 1));
                    }
                    if (createFolderMap.contains("dd")) {
                        createFolderMap = createFolderMap.replace("dd",
                                c.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + String.valueOf(c.get(Calendar.DAY_OF_MONTH)) : String.valueOf(c.get(Calendar.DAY_OF_MONTH)));
                    }
                }
                boolean ftpOption = Boolean.valueOf(extensionMap.get("ftpOption"));

                final List<Callable<Void>> actions = new LinkedList<>();
                for (LiveOutputGroup outputGroup : task.getOutputGroups()) {
                    OutputGroupSetting setting = outputGroup.getOutputGroupSetting();
                    if (setting instanceof ArchiveGroupSetting) {
                        ArchiveGroupSetting archive = (ArchiveGroupSetting) setting;
                        if (archive.getSegmentType() == 0) {
                            String path = archive.getLocation().getUri();
                            if(createFolderMap!=null){
                                new File(Paths.get(path, createFolderMap).toString()).mkdirs();
                            }
                            boolean isOssPath = false;
                            if (path != null && StringHelper.startsWithIgnoreCase(path, "oss:")) {
                                path = ossUploadService.mappingToLocalPath(path) + "_" + task.getId();
                                isOssPath = true;
                            }
                            Path finalFile = null;
                            Path thumb = null;
                            if (!isOssPath || ossUploadService.isFeatureEnabled()) {
                                String targetName = archive.getTargetName();
                                String tmpExtension = archive.getTempExtension();
                                String extension = archive.getExtension();
                                thumb = Paths.get(path, targetName + ".jpg");
                                if (!extension.startsWith(".")) {
                                    extension = "." + extension;
                                }
                                finalFile = Paths.get(path, targetName + extension);
                                if (tmpExtension != null && !tmpExtension.equalsIgnoreCase(extension)) {
                                    if (!tmpExtension.startsWith(".")) {
                                        tmpExtension = "." + tmpExtension;
                                    }
                                    Path tmpFile = Paths.get(path, targetName + tmpExtension);
                                    if (thumbSize != null) {
                                        fetchThumbnail(tmpFile, thumb, thumbSize);
                                    }
                                    finalFile = createFolderMap!=null?Paths.get(path, createFolderMap, targetName + extension):
                                            Paths.get(path, targetName + extension);
                                    renameFile(tmpFile, finalFile);
                                } else {
                                    if (thumbSize != null) {
                                        fetchThumbnail(finalFile, thumb, thumbSize);
                                    }
                                    String oriFileName = finalFile.toString();
                                    finalFile = createFolderMap!=null?Paths.get(path, createFolderMap, Paths.get(oriFileName).getFileName().toString()):
                                    Paths.get(path, Paths.get(oriFileName).getFileName().toString());
                                    renameFile(Paths.get(oriFileName), Paths.get(finalFile.toString()));
                                }
                                if (thumb != null) {
                                    String oriThumbName = thumb.toString();
                                    thumb = createFolderMap!=null?Paths.get(path, createFolderMap, Paths.get(oriThumbName).getFileName().toString()):
                                            Paths.get(path, Paths.get(oriThumbName).getFileName().toString());
                                    renameFile(Paths.get(oriThumbName), Paths.get(thumb.toString()));
                                }
                            }

                            if (isOssPath && ossUploadService.isFeatureEnabled()) {
                                // upload file to OSS.
                                final File srcFile = finalFile.toFile();
                                final String ossUri = archive.getLocation().getUri() + "/" + srcFile.getName();
                                final Path ossPath = Paths.get(path);
                                actions.add(new Callable<Void>() {
                                    @Override
                                    public Void call() throws Exception {
                                        try {
                                            if (srcFile.exists() && srcFile.isFile()) {
                                                ossUploadService.upload(srcFile, ossUri);
                                            } else {
                                                throw new IOException("Upload to oss failed, file not exist or not a file.");
                                            }
                                        } finally {
                                            // delete the file.
                                            srcFile.delete();
                                            // if the directory is empty, the path will be deleted.
                                            ossPath.toFile().delete();
                                        }
                                        return null;
                                    }
                                });
                            }
                            //upload ftp
                            if (ftpOption) {
                                String ftpIP = extensionMap.get("ftpIP");
                                String ftpUserName = extensionMap.get("ftpUserName");
                                String ftpPassword = extensionMap.get("ftpPassword");
                                String ftpPath = extensionMap.get("ftpPath");
                                String fileName = taskInfo.getName();
                                //outputGroup.getLiveOutputs()
                                File SourceFile = finalFile.toFile();
                                String SourceUri = archive.getLocation().getUri() + "/" + SourceFile.getName();
                                if (SourceFile.exists() && SourceFile.isFile()) {
                                    try {
                                        FileInputStream in = new FileInputStream(SourceFile);
                                        FtpServerServiceImpl ftpServerService = new FtpServerServiceImpl();
                                        boolean flag = ftpServerService.uploadFile(ftpIP, 21, ftpUserName, ftpPassword, ftpPath, SourceFile.getName(), in);
                                        if (flag) {
                                            //delete task file
                                            SourceFile.delete();
                                        }
                                        //jpg upload
                                        if (thumb != null) {
                                            File jpgFile = thumb.toFile();
                                            FileInputStream jpgIn = new FileInputStream(jpgFile);
                                            boolean jpgFlag = ftpServerService.uploadFile(ftpIP, 21, ftpUserName, ftpPassword, ftpPath, jpgFile.getName(), jpgIn);
                                            if (jpgFlag) {
                                                jpgFile.delete();
                                            }
                                        }

                                        log.info("ftp_" + SourceFile.getName() + ": return " + flag);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                }

                            }

                        }
                    }
                }

                // execute pending actions.
                final String callback = extensionMap.get("callback");
                SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {
                    @Override
                    public void run() {
                        boolean success = true;
                        if (!actions.isEmpty()) {
                            final CountDownLatch counter = new CountDownLatch(actions.size());
                            final boolean[] results = new boolean[actions.size()];
                            for (int i = 0; i < actions.size(); i++) {
                                final int index = i;
                                final Callable<Void> action = actions.get(i);
                                SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {
                                    @Override
                                    public void run() {
                                        try {
                                            action.call();
                                            results[index] = true;
                                        } catch (Exception e) {
                                            log.error("execute action failed.", e);
                                            results[index] = false;
                                        } finally {
                                            counter.countDown();
                                        }
                                    }
                                });
                            }
                            try {
                                counter.await();
                                for (boolean result : results) {
                                    if (!result) {
                                        success = false;
                                        break;
                                    }
                                }
                            } catch (InterruptedException e) {
                                success = false;
                            }
                        }
                        if (StringHelper.isNotBlank(callback)) {
                            executeCallback(callback, task, success);
                        }
                    }
                });
            }
        });
    }

    /**
     * Rename the tmp file to final file. If the final file already exist, delete it first.
     */
    private void renameFile(Path tmpFile, Path finalFile) {
        File dst = finalFile.toFile();
        if (dst.exists()) {
            log.info("The file already exist: " + dst.getAbsolutePath());
            if (!dst.delete()) {
                log.info("Rename failed: delete exist file failed: " + dst.getAbsolutePath());
                return;
            }
        }
        if (tmpFile.toFile().renameTo(dst)) {
            log.info("Rename success: " + dst.getAbsolutePath());
        } else {
            log.info("Rename failed: " + dst.getAbsolutePath());
        }
    }

    /**
     * Fetch the specified file's thumbnail.
     */
    private void fetchThumbnail(Path srcFile, Path thumbFile, int[] thumbSize) {
        String fileName = srcFile.toFile().getAbsolutePath();
        MediaInfoTool tool;
        try {
            tool = new MediaInfoTool(fileName, thumbSize[0]);
            InputStream data = tool.getThumbnail();
            if (data != null) {
                Files.copy(data, thumbFile, StandardCopyOption.REPLACE_EXISTING);
                log.info("get thumbnail success:  " + fileName);
            } else {
                log.info("get thumbnail failed:  " + fileName);
            }
        } catch (Exception e) {
            log.error("fetch thumbnail failed." + fileName, e);
        }
    }

    /**
     * Convert task info to task.
     */
    private Task convert(TaskInfo taskInfo) {
        try {
            Task task = (Task) taskXmlParser.parse(taskInfo.getTaskXml());
            task.setId(taskInfo.getTaskId());
            TransformableTranslator.associate(task);
            return task;
        } catch (Exception e) {
            log.error("convert task failed.", e);
            return null;
        }
    }

    /**
     * Parse thumb size.
     */
    private int[] getThumbSize(String thumb) {
        if (thumb != null && thumb.matches("^((-1)|([1-9][0-9]*))(x((-1)|([1-9][0-9]*)))?$")) {
            int[] size = new int[]{-1, -1};
            String[] thumbsize = thumb.split("x");
            size[0] = Integer.parseInt(thumbsize[0]);
            if (thumbsize.length > 1) {
                size[1] = Integer.parseInt(thumbsize[1]);
            }
            return size;
        } else {
            return null;
        }
    }

    /**
     * Execute callback.
     */
    private void executeCallback(String callback, Task task, boolean success) {
        log.info("begin execute task(id=" + task.getId() + ") callback result, success=" + success);
        HttpClientParams httpParams = new HttpClientParams();
        httpParams.setContentCharset("utf-8");
        httpParams.setConnectionManagerTimeout(10000);
        HttpClient client = new HttpClient(httpParams);
        PostMethod method = new PostMethod(callback);
        try {
            StringBuilder request = new StringBuilder();
            request.append("{");
            request.append("\"id\":").append(task.getId()).append(",");
            request.append("\"state\": \"").append(success ? "SUCCESS" : "ERROR").append("\"");
            request.append("}");
            method.setRequestEntity(new StringRequestEntity(request.toString(), "application/json", "utf-8"));
            int state = client.executeMethod(method);
            log.info("execute task(id=" + task.getId() + ") callback result, state=" + state + ", response: " + method.getResponseBodyAsString());
        } catch (IOException e) {
            log.error("execute task(id=" + task.getId() + ") callback failed: " + e.getMessage(), e);
        } finally {
            method.releaseConnection();
        }
    }

}
