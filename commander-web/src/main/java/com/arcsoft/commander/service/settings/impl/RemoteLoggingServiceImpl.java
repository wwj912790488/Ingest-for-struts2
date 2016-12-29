package com.arcsoft.commander.service.settings.impl;

import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import com.arcsoft.arcvideo.logging.conf.LoggingSetting;
import com.arcsoft.commander.cluster.action.logging.GetLoggingSettingRequest;
import com.arcsoft.commander.cluster.action.logging.GetLoggingSettingResponse;
import com.arcsoft.commander.cluster.action.logging.UpdateASLogRequest;
import com.arcsoft.commander.cluster.action.logging.UpdateLoggingSettingRequest;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.settings.InvalidLoggingSettingException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteLoggingService;

/**
 * This service process aslog relation requests for the specified agent.
 * 
 * @author fjli
 */
public class RemoteLoggingServiceImpl extends RemoteExecutorServiceSupport implements RemoteLoggingService {

	@Override
	public LoggingSetting getLoggingSetting(Server agent) {
		GetLoggingSettingRequest request = new GetLoggingSettingRequest();
		GetLoggingSettingResponse response = remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent, response.getErrorCode());
		StringReader reader = new StringReader(response.getSetting());
		try {
			JAXBContext context = JAXBContext.newInstance(LoggingSetting.class);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			LoggingSetting setting = (LoggingSetting) unmarshaller.unmarshal(reader);
			return setting;
		} catch (Exception e) {
			throw new InvalidLoggingSettingException();
		}
	}

	@Override
	public void updateLoggingSetting(Server agent, LoggingSetting setting) {
		StringWriter writer = new StringWriter();
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(LoggingSetting.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(setting, writer);
		} catch (JAXBException e) {
			throw new InvalidLoggingSettingException();
		}
		UpdateLoggingSettingRequest request = new UpdateLoggingSettingRequest();
		request.setSetting(writer.toString());
		remoteExecuteWithoutResponse(request, agent);
	}

	@Override
	public void updateASLog(Server agent, String data) {
		UpdateASLogRequest request = new UpdateASLogRequest();
		request.setData(data);
		remoteExecuteWithoutResponse(request, agent);
	}

}
