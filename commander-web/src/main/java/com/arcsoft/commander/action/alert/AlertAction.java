package com.arcsoft.commander.action.alert;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.alert.AlertLevel;
import com.arcsoft.commander.domain.alert.AlertType;
import com.arcsoft.commander.domain.alert.SysAlert;
import com.arcsoft.commander.service.alert.SysAlertService;

/**
 * The action for operation alert
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class AlertAction extends BaseAction implements PageControl {

	private static final long TIME_DAY_MILLISECONDS = 86400000;
	private SysAlertService sysAlertService;
	private String timeDuration;
	private String level;
	private String type;
	private String begin;
	private String end;
	private String description;
	private List<SysAlert> alertList;

	private Pager pager;
	private Date dtBegin;
	private Date dtEnd;
	
	/**{type, desc}...*/
	protected Map<String, String> typeList = null;

	public void setSysAlertService(SysAlertService sysAlertService) {
		this.sysAlertService = sysAlertService;
	}

	public SysAlertService getSysAlertService() {
		return sysAlertService;
	}

	public String getTimeDuration() {
		return timeDuration;
	}

	public void setTimeDuration(String timeDuration) {
		this.timeDuration = timeDuration;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getBegin() {
		return begin;
	}

	public void setBegin(String begin) {
		this.begin = begin;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<SysAlert> getAlertList() {
		return alertList;
	}

	@Override
	public Pager getPager() {
		if(this.pager == null){
			this.pager = new Pager();
		}
		return pager;
	}

	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public Map<String, String> getTypeList() {
		if(typeList==null){
			typeList = new LinkedHashMap<String, String>(5); 
			typeList.put(String.valueOf(AlertType.TASK), getText("alert.type.task"));
			typeList.put(String.valueOf(AlertType.SYSTEM), getText("alert.type.system"));
			typeList.put(String.valueOf(AlertType.SOURCE), getText("alert.type.source"));
			typeList.put(String.valueOf(AlertType.HARDWARE), getText("alert.type.hardware"));
			typeList.put(String.valueOf(AlertType.DEVICE), getText("alert.type.device"));
		}
		return typeList;
	}

	public Map<String, String> getLevelMap() {
		Map<String, String> map = new LinkedHashMap<String, String>(2);
		for (AlertLevel level : AlertLevel.values())
			map.put(level.name(), level.name());
		return map;
	}

	private Condition buildParam() {
		List<Condition> conditions = new ArrayList<>();
		if (type != null && type.length() > 0)
			conditions.add(Condition.eq("type", type));
		if (level != null && level.length() > 0)
			conditions.add(Condition.eq("level", level));
		if (description != null && description.length() > 0)
			conditions.add(Condition.like("description", "%" + description + "%"));
		if (timeDuration.equals("1")) {
			// last week
			dtEnd = new Date();
			long t = dtEnd.getTime() - 7 * TIME_DAY_MILLISECONDS;
			dtBegin = new Date(t);
		} else if (timeDuration.equals("2")) {
			// last month
			dtEnd = new Date();
			long t = dtEnd.getTime() - 30 * TIME_DAY_MILLISECONDS;
			dtBegin = new Date(t);
		} else if (timeDuration.equals("3")) {
			//other time
			if (begin != null && begin.length() > 0 && end != null && end.length() > 0) {
				try {
					dtBegin = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(begin);
					dtEnd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(end);
				} catch (ParseException e) {
				}
			}
		}
		if (dtBegin != null && dtEnd != null)
			conditions.add(Condition.between("createdAt", dtBegin, dtEnd));
		if (!conditions.isEmpty())
			return Condition.and(conditions);
		return null;
	}

	@SuppressWarnings("unchecked")
	public String list() {
		QueryInfo info = new QueryInfo();
		info.setCondition(buildParam());
		info.addSortOrders(SortOrder.desc("createdAt"), SortOrder.desc("timestamp"));
		pager = sysAlertService.getAlerts(info, getPager().getPageIndex(), getPager().getPageSize());
		this.alertList = pager.getResult();
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	public String delete() {
		Condition condition = buildParam();
		sysAlertService.deleteAlerts(condition);
		return SUCCESS;
	}

	public String export() {
		HttpServletResponse resp = ServletActionContext.getResponse();
		resp.addHeader("Content-Type", "application/vnd.ms-excel");
		resp.addHeader("Content-Disposition", "attachment;filename=\"Alert.xls\"");
		resp.setCharacterEncoding("GBK");

		OutputStreamWriter os = null;
		try {
			os = new OutputStreamWriter(resp.getOutputStream(), "GBK");
			StringBuilder sb = new StringBuilder();
			// write column caption
			sb.append(getText("alert.field.time")).append("\t");
			sb.append(getText("alert.field.type")).append("\t");
			sb.append(getText("alert.field.level")).append("\t");
			sb.append(getText("alert.field.ip")).append("\t");
			sb.append(getText("alert.field.description")).append("\r\n");
			os.write(sb.toString());
			os.flush();

			Pager pager = null;
			int pageIndex1 = 1;
			QueryInfo info = new QueryInfo();
			info.setCondition(buildParam());
			info.addSortOrders(SortOrder.desc("createdAt"), SortOrder.desc("timestamp"));
			getTypeList();
			SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			do {
				pager = sysAlertService.getAlerts(info, pageIndex1, 1000);
				@SuppressWarnings("unchecked")
				List<SysAlert> alerts = pager.getResult();

				// write column data
				for (SysAlert alert : alerts) {
					sb = new StringBuilder();
					String alertTime = timeFormat.format(alert.getCreatedAt());
					sb.append(alertTime).append("\t");
					sb.append(typeList.get(alert.getType())).append("\t");
					sb.append(alert.getLevel()).append("\t");
					sb.append(StringHelper.toEmptyIfNull(alert.getIp())).append("\t");
					String alertDetail = alert.getDescription().replaceAll("\"", "\"\"");
					sb.append("\"").append(alertDetail).append("\"\r\n");
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
