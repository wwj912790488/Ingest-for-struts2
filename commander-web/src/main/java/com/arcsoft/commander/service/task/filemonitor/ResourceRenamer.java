package com.arcsoft.commander.service.task.filemonitor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;



public class ResourceRenamer implements Runnable {

	private String rootPath;
	private String targetName;
	private Integer curIndex = 1;
	private Integer maxCount = 5;

	private org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(ResourceRenamer.class);

	public volatile boolean exit = false;

	public ResourceRenamer(String rootPath, String targetName, Integer maxCount) {
		this.rootPath = rootPath;
		this.targetName = targetName;
		this.maxCount = maxCount;
	}

	public void mkDir() {
		File folder = new File(this.rootPath);
		if(!folder.exists() || !folder.isDirectory()) {
			folder.mkdirs();
		}
	}

	public void stop() {
		exit = true;
	}

	public void run() {
		try {
			while(!exit){
				try{
					File folder = new File(rootPath);
					if(!folder.exists() || !folder.isDirectory()) {
						folder.mkdirs();
					}

					if(!folder.isDirectory()){
						break;
					}

//					try(DirectoryStream<Path> dirStream = Files.newDirectoryStream(folder.toPath())) {
//						for (Path p: dirStream) {
//							System.out.println(p.getFileName());
//						}
//					} catch (Exception e) {
//						log.error(e);
//					}


					File[] files = folder.listFiles();

					log.error(folder + ", get file count [" +files.length + "]" + ", " + folder.canRead() + ", " + folder.canWrite());

					for(int nIndex = 0;nIndex<files.length;nIndex++){
						if(files[nIndex].getName().startsWith(targetName))
							continue;

						if(!files[nIndex].getName().contains(".jpg"))
							continue;

						Path source = Paths.get(files[nIndex].getAbsolutePath());
						Path target = Paths.get(rootPath + "/" + targetName + curIndex.toString() + ".jpg");
						Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
						curIndex++;

						if(curIndex > maxCount){
							curIndex = 1;
						}
					}

					Thread.sleep(1000);

				}catch(FileAlreadyExistsException e){
					e.printStackTrace();
				}catch(IOException e){
					e.printStackTrace();
				}
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}finally{
			System.out.println("Renamer stop.");
		}
	}
}
