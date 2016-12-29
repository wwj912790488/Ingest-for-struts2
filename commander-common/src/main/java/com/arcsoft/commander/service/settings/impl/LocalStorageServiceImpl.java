package com.arcsoft.commander.service.settings.impl;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.log4j.Logger;

import com.arcsoft.commander.dao.settings.StorageMountDao;
import com.arcsoft.commander.dao.settings.StoragePersistenceDao;
import com.arcsoft.commander.domain.settings.Storage;
import com.arcsoft.commander.service.settings.LocalStorageService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * The implementation of LocalStorageService.
 * 
 * @author hxiang
 */
public class LocalStorageServiceImpl implements LocalStorageService {

	private Logger log = Logger.getLogger(getClass());
	private StoragePersistenceDao persistDao;
	private StorageMountDao mountDao;

	public void setMountDao(StorageMountDao mountDao) {
		this.mountDao = mountDao;
	}

	public void setPersistDao(StoragePersistenceDao persistDao) {
		this.persistDao = persistDao;
	}

	public void initialize() {
		// Auto mount the storages;
		List<Storage> storages = persistDao.get();
		if (storages.size() > 0) {
			ExecutorService es = Executors.newCachedThreadPool();
			for (final Storage each : storages) {
				es.execute(new Runnable() {
					public void run() {
						try {
							mountDao.mount(each);
						} catch (Exception e) {
							log.error("mount " + each.getPath() + " failed.", e);
						}
					}
				});
			}
			es.shutdown();
		}
	}

	@Override
	public Map<String, String> getRemoteMounted() throws ShellException {
		return mountDao.getMounted();
	}

	@Override
	public void mountStorage(Storage s) throws Exception {
		mountDao.mount(s);
	}

	@Override
	public void umountStorage(Storage s) throws Exception {
		mountDao.unmount(s, false);
	}

	@Override
	public void addRemoteStorage(Storage st)  {
		persistDao.save(st);
	}

	@Override
	public void delRemoteStorage(Integer id) throws ShellException{
		Storage st = getRemoteStorage(id);
		if (st != null)
			mountDao.unmount(st, true);
		persistDao.delete(id);
	}

	@Override
	public List<Storage> findAllRemoteStorages() {
		return persistDao.get();
	}

	@Override
	public Storage getRemoteStorage(Integer id) {
		return persistDao.get(id);
	}

	@Override
	public Storage getRemoteStorageByName(String name) {
		Storage ret = null;
		for (Storage s : findAllRemoteStorages()) {
			if (s.getName().equals(name)) {
				ret = s;
				break;
			}
		}
		return ret;
	}

	@Override
	public void updateStorage(Storage s) throws Exception {
		Storage oldStorage = new Storage();
		Storage storage = persistDao.get(s.getId());
		oldStorage.setId(storage.getId());
		oldStorage.setName(storage.getName());
		oldStorage.setPath(storage.getPath());
		oldStorage.setUser(storage.getUser());
		oldStorage.setPwd(storage.getPwd());
		oldStorage.setType(storage.getType());
		if (oldStorage != null && !oldStorage.equals(s)) {
			// umount storage and delete folder.
			mountDao.unmount(oldStorage, true);
			persistDao.update(s);
		}
	}

}
