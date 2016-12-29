package com.arcsoft.commander.action.task;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.util.ServletContextAware;

public class GetTaskProgressThumbAction extends CommanderTaskActionSupport implements ServletContextAware {
	private static final long serialVersionUID = -4290113010628924585L;

	private Logger log = Logger.getLogger(getClass());
	private Integer taskId = null;
	private ServletContext servletCxt;
	private int width = 64;

	public void setWidth(int width) {
		this.width = width;
	}

	@Override
	public void setServletContext(ServletContext servletCxt) {
		this.servletCxt = servletCxt;		
	}
	
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	@Override
	public String execute() throws Exception {
		if (taskId == null)
			return ERROR;
		return SUCCESS;
	}

	public InputStream getThumbStream() throws Exception {
		byte[] data = this.getTaskExecuteService().getTaskThumbnail(taskId, width);
		InputStream ins = null;
		if (data != null && data.length > 0) {
			ins = new ByteArrayInputStream(data);
		} else {
			String url = "/images/progress_thumb_waiting.jpg";
			String f = servletCxt.getRealPath(url);
			try {
				byte[] buf = FileUtils.readFileToByteArray(new File(f));
				if (buf != null)
					ins = new ByteArrayInputStream(buf);
			} catch (Exception e) {
				log.error(e.getMessage());
			}
		}
		return ins;
	}

}
