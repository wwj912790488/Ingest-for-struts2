package com.arcsoft.commander.action.task;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.task.TaskQueryParams;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.web4transcoder.domain.Task;

@SuppressWarnings("serial")
public class ListTaskAction extends CommanderTaskActionSupport implements PageControl {

	private Logger log = Logger.getLogger(getClass());
	private Integer allTaskCount;
	private List<Task> tasks = null;
	private String filter = null;
	private String curServerId = null;
	private TaskQueryParams taskQuery;
	private CustomTaskService customTaskService;
	private Pager pager;

	// get task switch modes
	private Map<Integer, String> switchModes;

	public Map<Integer, String> getSwitchModes() {
		return switchModes;
	}	
	
	@Override
	public Pager getPager() {
		if(pager == null){
			pager = new Pager();
		}
		return pager;
	}

	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public List<Task> getTasks() {
		return this.tasks;
	}

	public void setTaskQuery(TaskQueryParams taskQuery) {
		this.taskQuery = taskQuery;
	}

	public TaskQueryParams getTaskQuery() {
		taskQuery = taskQuery == null ? new TaskQueryParams() : taskQuery;
		return taskQuery;
	}

	public String getFilter() {
		return filter == null ? "" : filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public Integer getAllTaskCount() {
		return allTaskCount;
	}

	public void setAllTaskCount(Integer allTaskCount) {
		this.allTaskCount = allTaskCount;
	}

	public String getCurServerId() {
		return curServerId;
	}

	public void setCurServerId(String curServerId) {
		this.curServerId = curServerId;
	}

	public CustomTaskService getCustomTaskService() {
		return customTaskService;
	}

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String execute() {
		try {
			pager = customTaskService.findTasks(true, getTaskQuery(), this.getPager().getPageIndex(), this.getPager().getPageSize());
			this.tasks = (List<Task>) pager.getResult();
			this.totalRows = (int) pager.getTotalRows();
			setServerGroups();
			this.allTaskCount = this.getTaskService().getAllTaskCount();
			
			// query task switch modes and save to a map
			if (this.tasks != null) {
				switchModes = new HashMap<>();
				for (Task task : tasks) {
					int mode = getTaskService().getSwitchMode(task.getId());
					if (mode != -1)
						switchModes.put(task.getId(), getText("source.signal.mode."+ mode));
				}
			}			
		} catch (Exception e) {
			log.error("execute list failed.", e);
			return ERROR;
		}
		return SUCCESS;
	}
}
