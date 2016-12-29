package com.arcsoft.commander.service.task.filemonitor;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ResourceListener {
	private final Logger logger = LoggerFactory.getLogger(ResourceListener.class);
	private static ExecutorService fixedThreadPool = Executors.newFixedThreadPool(100);//100
	private WatchService ws;
	private String listenerPath;
	private String targetName;
	private Integer maxCount;

	private ResourceListener(String path,String targetName,Integer maxCount) {
		try {
			logger.info("ResourceListener:Path[" + path + "], targetName[" + targetName + "], MaxCount["+ maxCount+"]");
			ws = FileSystems.getDefault().newWatchService();
			this.listenerPath = path;
			this.targetName = targetName;
			this.maxCount = maxCount;
			start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void start() {
		fixedThreadPool.execute(new Listner(ws,this.listenerPath, this.targetName, this.maxCount));
	}

	public static void addListener(String path,String targetName,Integer maxcount) throws IOException {
		ResourceListener resourceListener = new ResourceListener(path,targetName,maxcount);
		Path p = Paths.get(path);
		p.register(resourceListener.ws,StandardWatchEventKinds.ENTRY_CREATE);
	}

	public  static void removeListener(String path) throws IOException{
		WatchService ws = FileSystems.getDefault().newWatchService();
		Path p = Paths.get(path);
		p.register(ws,StandardWatchEventKinds.ENTRY_DELETE);
		ws.close();
	}
}

class Listner implements Runnable {
	private WatchService service;
	private String rootPath;
	private String targetName;
	private Integer curIndex = 1;
	private Integer maxCount = 5;

	public Listner(WatchService service,String rootPath, String targetName, Integer maxCount) {
		this.service = service;
		this.rootPath = rootPath;
		this.targetName = targetName;
		this.maxCount = maxCount;
	}

	public void run() {
		try {
			while(true){
				WatchKey watchKey = service.take();
				List<WatchEvent<?>> watchEvents = watchKey.pollEvents();
				for(WatchEvent<?> event : watchEvents){
					//TODO 根据事件类型采取不同的操作。。。。。。。
					System.out.println("["+rootPath+"/"+event.context()+"]文件发生了["+event.kind()+"]事件");

					if(event.kind() == StandardWatchEventKinds.ENTRY_CREATE){
						// TODO check 当前不是 target file ，复制当前文件为 target+curIndex.jpg  Overwrite
						// curIndex + 1  if == 6 curInex = 1
						try{
							WatchEvent<Path> ev = (WatchEvent<Path>)event;
							Path pathName = ev.context();
							if(pathName.toString().startsWith(targetName)){
								continue;
							}
							Thread.sleep(500);
							Path source = Paths.get(rootPath + "/" + pathName);
							Path target = Paths.get(rootPath + "/" + targetName + curIndex.toString() + ".jpg");
							Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
							curIndex++;
							if(curIndex > maxCount){
								curIndex = 1;
							}
						}catch(IOException e)
						{
							System.out.println("["+event.context()+"] copy to [" +targetName + curIndex.toString() +
									".jpg]" + "exception:" + e.getMessage());
						}
					}
				}
				watchKey.reset();
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}finally{
			System.out.println("ResourceListener stop.");
			try {
				service.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
