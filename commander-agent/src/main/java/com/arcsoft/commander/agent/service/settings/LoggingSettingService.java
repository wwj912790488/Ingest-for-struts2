package com.arcsoft.commander.agent.service.settings;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.FileUtils;

import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.logging.GetLoggingSettingRequest;
import com.arcsoft.commander.cluster.action.logging.GetLoggingSettingResponse;
import com.arcsoft.commander.cluster.action.logging.UpdateASLogRequest;
import com.arcsoft.commander.cluster.action.logging.UpdateASLogResponse;
import com.arcsoft.commander.cluster.action.logging.UpdateLoggingSettingRequest;
import com.arcsoft.commander.cluster.action.logging.UpdateLoggingSettingResponse;

/**
 * Logging setting service.
 * 
 * @author fjli
 */
public class LoggingSettingService implements ActionHandler {

	private String DEFAULT_ASLOG_FILE = "/usr/local/arcsoft/arcvideo/transcoder/ASLOG.ini";
	private String DEFAULT_LOGGING_FILE = "/usr/local/arcsoft/arcvideo/logging/conf/logging.xml";
	private File aslogFile;
	private File loggingFile;

	public LoggingSettingService() {
		aslogFile = new File(AppConfig.getString("logging.aslog.file", DEFAULT_ASLOG_FILE)).getAbsoluteFile();
		loggingFile = new File(AppConfig.getString("logging.config.file", DEFAULT_LOGGING_FILE)).getAbsoluteFile();
	}

	/**
	 * Returns all license actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.GET_LOGGING_SETTING,
				Actions.UPDATE_LOGGING_SETTING,
				Actions.UPDATE_ASLOG,
			};
	}

	/**
	 * Receive logging relation requests, and dispatch request to process methods.
	 * 
	 * @param request - the logging request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GetLoggingSettingRequest) {
			return getLoggingSetting();
		} else if (request instanceof UpdateLoggingSettingRequest) {
			return updateLoggingSetting((UpdateLoggingSettingRequest) request);
		} else if (request instanceof UpdateASLogRequest) {
			return updateASLogSetting((UpdateASLogRequest) request);
		}
		return null;
	}

	/**
	 * Update logging settings.
	 * 
	 * @param request - the update logging setting request
	 * @return returns response indicating the action is success or not.
	 */
	private UpdateLoggingSettingResponse updateLoggingSetting(UpdateLoggingSettingRequest request) {
		UpdateLoggingSettingResponse response = new UpdateLoggingSettingResponse();
		String data = request.getSetting();
		if (data == null || data.indexOf("<logging>") == -1) {
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
			return response;
		}
		try {
			saveDataToFile(data, loggingFile);
			response.setErrorCode(ActionErrorCode.SUCCESS);
		} catch(IOException e) {
			response.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return response;
	}

	/**
	 * Get the logging setting.
	 */
	private GetLoggingSettingResponse getLoggingSetting() {
		GetLoggingSettingResponse response = new GetLoggingSettingResponse();
		String data = null;
		try {
			if (loggingFile.exists()) {
				data = FileUtils.readFileToString(loggingFile, "UTF-8");
				response.setSetting(data);
			} else {
				response.setSetting("");
			}
			response.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (IOException e) {
			response.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return response;
	}

	/**
	 * Update aslog settings.
	 * 
	 * @param request - the update aslog setting request
	 * @return returns response indicating the action is success or not.
	 */
	private UpdateASLogResponse updateASLogSetting(UpdateASLogRequest request) {
		UpdateASLogResponse response = new UpdateASLogResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);

		String data = request.getData();
		if (data == null || data.indexOf("[ASLOG]") == -1) {
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
			return response;
		}

		try {
			saveDataToFile(data, aslogFile);
			response.setErrorCode(ActionErrorCode.SUCCESS);
		} catch(IOException e) {
			response.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return response;
	}

	/**
	 * Save data to the specified file.
	 * 
	 * @param data - the data to save
	 * @param file - the specified file
	 * @throws IOException if save failed
	 */
	private void saveDataToFile(String data, File file) throws IOException {
		// Save settings
		FileOutputStream fos = null;
		File backup = null;
		try {
			// if file already exist, rename to backup.
			if (file.exists()) {
				backup = new File(file.getParentFile(), UUID.randomUUID().toString());
				file.renameTo(backup);
			}
			// save the file
			fos = new FileOutputStream(file);
			fos.write(data.getBytes("UTF-8"));
			// delete backup on success.
			if (backup != null)
				backup.delete();
		} catch(IOException e) {
			// delete the error file
			if (file != null)
				file.delete();
			// restore the backup
			if (backup != null)
				backup.renameTo(file);
			throw e;
		} finally {
			IOUtils.closeQuietly(fos);
		}
	}

}
