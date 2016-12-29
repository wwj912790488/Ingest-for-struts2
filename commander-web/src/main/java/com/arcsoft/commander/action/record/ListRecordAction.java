package com.arcsoft.commander.action.record;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.record.FullTimeRecordInfo;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordType;
import com.arcsoft.commander.domain.schedule.ScheduleType;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletResponse;

/**
 * Action for view channels.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ListRecordAction extends BaseRecordAction<RecordInfo> implements PageControl {

	private Pager pager = new Pager();

	private String taskId;
	private String channelName;
	private String taskType;
	private String taskRunTime;
	private String profile;
	private String filePath;

    protected Map<String, String> typeList = null;

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getChannelName() {
		return channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

	public String getTaskType() {
		return taskType;
	}

	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}

	public String getTaskRunTime() {
		return taskRunTime;
	}

	public void setTaskRunTime(String taskRunTime) {
		this.taskRunTime = taskRunTime;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	@Override
	public Pager getPager() {
		return pager;
	}

	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public String getChannelName(Integer id) {
		for (Channel channel : channels) {
			if (channel.getId().equals(id)) {
				return channel.getName();
			}
		}
		return null;
	}

    public String getProfileName(Integer id) {
        for (LiveProfile profile : profiles) {
            if (profile.getId().equals(id)) {
                return profile.getName();
            }
        }
        return null;
    }


	/**
	 * Query the record info.
	 */
	@Override
	public String execute() throws Exception {
		preparePageData();
		QueryInfo info = new QueryInfo();
		List<Condition> conditions = new ArrayList<>();
		conditions.add(Condition.ne("recordType", RecordType.EPGITEM));
		if (task != null) {
			if (task.getId() != null) {
				conditions.add(Condition.eq("id", task.getId()));
			}
			if (StringHelper.isNotBlank(task.getName())) {
				conditions.add(Condition.like("name", "%" + task.getName() + "%"));
			}
			if (task.getRecordType() != null) {
				conditions.add(Condition.eq("recordType", task.getRecordType()));
			}
			if (task.getChannelId() != null) {
				conditions.add(Condition.eq("channelId", task.getChannelId()));
			}
		}
		info.setCondition(Condition.and(conditions));
		info.addSortOrder(SortOrder.desc("id"));
		pager = recordInfoService.list(info, pager.getPageIndex(), pager.getPageSize());
		for (Object obj : pager.getResult()){
			RecordInfo recordInfo = (RecordInfo)obj;
			for(LiveProfile profile: profiles){
				if(recordInfo.getProfile() == profile.getId()){
					recordInfo.setProfileName(profile.getName());
					break;
				}
			}
		}
		return SUCCESS;
	}

    public Map<String, String> getTypeList() {
        if(typeList==null){
            typeList = new LinkedHashMap<String, String>(6);
            typeList.put("SCHEDULE", getText("record.task.type.schedule"));
            typeList.put("FULLTIME", getText("record.task.type.fulltime"));
            typeList.put("EPG", getText("record.task.type.epg"));
            typeList.put("WEEKLY", getText("record.task.type.weekly"));
            typeList.put("ONCE", getText("record.task.times.once"));
            typeList.put("LOOP", getText("record.task.times.loop"));
        }
        return typeList;
    }

	public String export() {
		preparePageData();
		HttpServletResponse resp = ServletActionContext.getResponse();
		resp.addHeader("Content-Type", "application/vnd.ms-excel");
		resp.addHeader("Content-Disposition", "attachment;filename=\"Record.xls\"");
		resp.setCharacterEncoding("GBK");

        getTypeList();
		OutputStreamWriter os = null;
		try {
			os = new OutputStreamWriter(resp.getOutputStream(), "GBK");
			StringBuffer sb = new StringBuffer();
			// write column caption
			sb.append(getText("taskcol.id")).append("\t");
			sb.append(getText("channel.name")).append("\t");
			sb.append(getText("record.task.type")).append("\t");
			sb.append(getText("record.task.run.time")).append("\t");
			sb.append(getText("record.task.profile")).append("\t");
			sb.append(getText("record.task.file.path")).append("\r\n");
			os.write(sb.toString());

			Pager pager = null;
			int pageIndex1 = 1;
			QueryInfo info = new QueryInfo();
			info.addSortOrder(SortOrder.desc("id"));

			do {
				pager = recordInfoService.list(info, pageIndex1, 10);
				@SuppressWarnings("unchecked")
				List<? extends RecordInfo> recordInfos = pager.getResult();

				// write column data
				for (RecordInfo recordInfo : recordInfos) {
					sb = new StringBuffer();
					String taskId = recordInfo.getId().toString();
					sb.append(taskId).append("\t");
					sb.append(getChannelName(recordInfo.getChannelId()));
                    if(recordInfo.getName()!= null && !recordInfo.getName().isEmpty()){
                        sb.append("("+recordInfo.getName()+")");
                    }
                    sb.append("\t");

					sb.append(typeList.get(recordInfo.getRecordType().toString()));
                    if(recordInfo.getRecordType() == RecordType.FULLTIME){
                        sb.append("(").append(getText("record.task.segment.length")).append(":")
                        .append(((FullTimeRecordInfo)recordInfo).getSegmentLength()).append(
                                getText("record.task.segment.length")).append(")");
                    }else if(recordInfo.getRecordType() == RecordType.SCHEDULE){
                        if(recordInfo.getSchedule().getScheduleType()== ScheduleType.ONCE){
                            sb.append(getText("record.task.times.once"));
                        }else{
                            sb.append(getText("record.task.times.loop"));
                        }
                    }
                    sb.append("\t");

					String taskRunTime = "";
                    if(recordInfo.getSchedule().getScheduleType().toString().equals("EPG")){
                        taskRunTime = getText("record.task.epg.bytime");
                    }else if(recordInfo.getSchedule().getScheduleType().toString().equals("WEEKLY")){
                        taskRunTime = recordInfo.getSchedule().getStartDate().toString()
                                + "-" + recordInfo.getSchedule().getRepeatEndDate().toString();
                        Integer days = recordInfo.getSchedule().getDays();
                        switch(days){
                            case 127:
                                taskRunTime += " " + getText("common.every.day") + " ";
                                break;
                            case 62:
                                taskRunTime += " " + getText("common.every.workday")+ " ";
                                break;
                            default:
                                if((days & 1)!=0){taskRunTime += " " + getText("common.week.simple.day0");}
                                if((days & 2)!=0){taskRunTime += " " + getText("common.week.simple.day1");}
                                if((days & 4)!=0){taskRunTime += " " + getText("common.week.simple.day2");}
                                if((days & 8)!=0){taskRunTime += " " + getText("common.week.simple.day3");}
                                if((days & 16)!=0){taskRunTime += " " + getText("common.week.simple.day4");}
                                if((days & 32)!=0){taskRunTime += " " + getText("common.week.simple.day5");}
                                if((days & 64)!=0){taskRunTime += " " + getText("common.week.simple.day6");}
                        }
                        taskRunTime += recordInfo.getSchedule().getStartTime().toString() +"-"+
                                recordInfo.getSchedule().getEndTime().toString();

                    }else if(recordInfo.getSchedule().getScheduleType().toString().equals("ONCE")){
                        taskRunTime = recordInfo.getSchedule().getStartDate().toString()
                                + " " + recordInfo.getSchedule().getStartTime().toString();
                        if(recordInfo.getSchedule().getEndType().toString().equals("BYTIME")){
                            taskRunTime += recordInfo.getSchedule().getEndDate().toString()
                                    + " " + recordInfo.getSchedule().getEndTime().toString();
                        }else{
                            taskRunTime += "-" + getText("record.task.start.always.loop");
                        }
                        if(recordInfo.getRecordType().toString().equals("FULLTIME") && recordInfo instanceof FullTimeRecordInfo){
                            if(((FullTimeRecordInfo)recordInfo).getKeepTimes()!=null){
                                taskRunTime += getText("record.task.keep.times");
                                Integer time = ((FullTimeRecordInfo)recordInfo).getKeepTimes();
                                if(time >= 1440){
                                    taskRunTime += ((Integer)(time / 1440)).toString() + getText("common.unit.day");
                                }else{
                                    taskRunTime += ((Integer)(time / 60)).toString() + getText("common.unit.hour");
                                }
                            }
                        }

                    }
                    sb.append(taskRunTime);
					sb.append("\t");
					String profileName = getProfileName(recordInfo.getProfile());
                    sb.append(profileName);
                    sb.append("\t");
                    String outputPath = recordInfo.getOutputPath();
                    sb.append("\"");
                    if (outputPath != null) {
                        outputPath = outputPath.replaceAll("\"", "\"\"");
                        sb.append(outputPath);
                    }
                    sb.append("\"");
					sb.append("\r\n");
					os.write(sb.toString());
				}
				os.flush();
				pageIndex1++;
			} while (pageIndex1 <= pager.getPageCount());

		} catch (IOException e) {
		} finally {
			if (null != os) {
				try {
					os.close();
				} catch (IOException e) {
				}
			}
		}
		return null;
	}

}
