package com.arcsoft.commander.dao.settings.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.arcsoft.commander.dao.settings.StoragePersistenceDao;
import com.arcsoft.commander.domain.settings.Storage;

/**
 * 
 * @author hxiang
 */
public class StoragePersistenceDaoImplXML implements StoragePersistenceDao {

	private String path = "./storages.xml";

	private Map<Integer, Storage> storages = new HashMap<Integer, Storage>();

	@Override
	public Storage get(Integer id) {
		return storages.get(id);
	}

	@Override
	public List<Storage> get() {
		List<Storage> list = new ArrayList<Storage>();
		for (Storage each : storages.values())
			list.add(each);
		return list;
	}

	@Override
	public Integer save(Storage storage) {
		storage.setId(autoIncreaseId());
		storages.put(storage.getId(), storage);
		if (!syn()) {
			storages.remove(storage.getId());
			storage.setId(-1);
		}
		return storage.getId();
	}

	@Override
	public void delete(Integer id) {
		storages.remove(id);
		syn();
	}

	@Override
	public boolean update(Storage storage) {
		boolean ret = false;
		if (storages.containsKey(storage.getId())) {
			Storage st = storages.get(storage.getId());
			st.setId(storage.getId());
			st.setType(storage.getType());
			st.setName(storage.getName());
			st.setPath(storage.getPath());
			st.setUser(storage.getUser());
			st.setPwd(storage.getPwd());
			syn();
			ret = true;
		}
		return ret;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public void initialize() {
		try {
			File file = new File(path).getAbsoluteFile();
			if (file.exists()) {
				JAXBContext jaxbContext = JAXBContext.newInstance(StorageList.class);
				Unmarshaller marshaller = jaxbContext.createUnmarshaller();
				StorageList list = (StorageList) marshaller.unmarshal(file);

				for (Storage storage : list.getList()) {
					storages.put(storage.getId(), storage);
				}
			}

		} catch (JAXBException e) {
			// DONOTING
		}
	}

	private int autoIncreaseId() {
		int index = -1;
		for (Integer each : storages.keySet()) {
			if (each > index)
				index = each;
		}
		return index + 1;
	}

	private boolean syn() {
		boolean ret = false;
		try {
			File file = new File(path).getAbsoluteFile();

			File parentDir = new File(file.getParent());
			if (!parentDir.exists()) {
				parentDir.mkdirs();
			}

			if (!file.exists()) {
				file.createNewFile();
			}

			JAXBContext jaxbContext = JAXBContext.newInstance(StorageList.class);
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			StorageList storageList = new StorageList();
			storageList.setList(storages.values());
			marshaller.marshal(storageList, file);
			ret = true;
		} catch (JAXBException e) {
			// Do nothing.
		} catch (IOException e) {
			// Do nothing here.
		} catch (Exception e) {
		}
		return ret;
	}

	@XmlRootElement(name = "root")
	@XmlAccessorType(XmlAccessType.PROPERTY)
	private static class StorageList {

		@XmlElementWrapper(name = "storages")
		@XmlElement(name = "storage")
		private Collection<Storage> list = new ArrayList<Storage>();

		@XmlTransient
		public Collection<Storage> getList() {
			return list;
		}

		public void setList(Collection<Storage> list) {
			this.list = list;
		}
	}
}
