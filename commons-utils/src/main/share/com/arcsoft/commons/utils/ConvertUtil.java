package com.arcsoft.commons.utils;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.apache.log4j.Logger;

public class ConvertUtil {

	private static Logger log = Logger.getLogger(ConvertUtil.class);

	public static Object convert2Object(File xmlfile, Class<?> clazz) {
		JAXBContext context;
		Object obj = null;
		FileReader fr = null;
		try {
			context = JAXBContext.newInstance(clazz);
			fr = new FileReader(xmlfile);
			Unmarshaller um = context.createUnmarshaller();
			obj = um.unmarshal(fr);
		} catch (Exception e) {
			log.error("convert to object failed.", e);
		} finally {
			if (fr != null) {
				try {
					fr.close();
				} catch(IOException e) {
				}
			}
		}
		return obj;
	}

	public static Object convert2Object(URL url, Class<?> clazz) {
		try {
			JAXBContext context = JAXBContext.newInstance(clazz);
			Unmarshaller um = context.createUnmarshaller();
			return um.unmarshal(url);
		} catch (JAXBException e) {
			log.error("convert to object failed.", e);
			return null;
		}
	}

	public static void convert2XML(Object obj, File targetFile) {
		JAXBContext context;
		FileWriter fw = null;
		try {
			context = JAXBContext.newInstance(obj.getClass());
			Marshaller m = context.createMarshaller();
			m.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			fw = new FileWriter(targetFile);
			m.marshal(obj, fw);
		} catch (Exception e) {
			log.error("convert to xml failed.", e);
		} finally {
			if (fw != null) {
				try {
					fw.close();
				} catch(IOException e) {
				}
			}
		}
	}

}
