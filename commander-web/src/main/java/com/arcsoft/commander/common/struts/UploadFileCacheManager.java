package com.arcsoft.commander.common.struts;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.IOUtils;

/**
 * Upload file cache manager.
 * 
 * @author fjli
 */
public class UploadFileCacheManager {

	private Map<String, File> fileMap = new ConcurrentHashMap<String, File>();
	private ScheduledExecutorService schedule;
	private File path;
	private boolean deleteOnInit = false;
	private boolean deleteOnExit = false;
	private long expiredTime = TimeUnit.MINUTES.toMillis(30);

	/**
	 * Set save path.
	 */
	public void setPath(String path) {
		this.path = new File(path);
	}

	/**
	 * Delete all files in cache path on initial.
	 */
	public void setDeleteOnInit(boolean deleteOnInit) {
		this.deleteOnInit = deleteOnInit;
	}

	/**
	 * Delete the files on exit.
	 */
	public void setDeleteOnExit(boolean deleteOnExit) {
		this.deleteOnExit = deleteOnExit;
	}

	/**
	 * Set cache expired time.
	 */
	public void setExpiredTime(int expiredTime) {
		this.expiredTime = TimeUnit.SECONDS.toMillis(expiredTime);
	}

	/**
	 * Initialize the cache manager.
	 */
	public void init() {
		if (path.exists()) {
			if (!path.isDirectory())
				throw new RuntimeException("The specified upload file cache path is not a file.");

			if (deleteOnInit) {
				// delete all files on the cache path.
				File[] files = path.listFiles();
				if (files != null) {
					for (File file : files) {
						if (file.isFile())
							file.delete();
					}
				}
			}
		}

		schedule = Executors.newScheduledThreadPool(1);
		schedule.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				deleteExpiredFiles();
			}
		}, 0, 30, TimeUnit.SECONDS);
	}

	/**
	 * Destroy the cache manager.
	 */
	public void destroy() {
		if (schedule != null)
			schedule.shutdownNow();
		if (deleteOnExit)
			clearCache();
	}

	private void clearCache() {
		for (File file : fileMap.values())
			file.delete();
		fileMap.clear();
	}

	private void deleteExpiredFiles() {
		long current = System.currentTimeMillis();
		for (String key : fileMap.keySet()) {
			File file = getFile(key);
			long created = file.lastModified();
			if ((current - created) >= expiredTime) {
				file.delete();
				fileMap.remove(key);
			}
		}
	}

	/**
	 * Add the specified file to this cache.
	 * 
	 * @param file - the specified file
	 * @return the key assigned to this file
	 * @throws IOException - if save file failed.
	 */
	public String addFile(File file) throws IOException {
		String key = UUID.randomUUID().toString();
		if (!path.exists())
			path.mkdirs();
		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			fis = new FileInputStream(file);
			File dest = new File(path, key);
			fos = new FileOutputStream(dest);
			IOUtils.copy(fis, fos);
			fileMap.put(key, dest);
		} finally {
			IOUtils.closeQuietly(fis);
			IOUtils.closeQuietly(fos);
		}
		return key;
	}

	/**
	 * Get the cache file with the specified key.
	 * 
	 * @param key - the specified key
	 * @return the cache file.
	 */
	public File getFile(String key) {
		return fileMap.get(key);
	}

	/**
	 * Touch the cache file with the specified key.
	 * 
	 * @param key - the specified key.
	 */
	public void touch(String key) {
		File file = fileMap.get(key);
		if (file != null)
			file.setLastModified(System.currentTimeMillis());
	}

	/**
	 * Delete the cache file with the specified key.
	 * 
	 * @param key - the specified key
	 */
	public void deleteFile(String key) {
		File file = fileMap.remove(key);
		if (file != null) {
			file.delete();
		}
	}

}
