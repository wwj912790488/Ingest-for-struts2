package com.arcsoft.commander.action.operationlog;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.operationlog.OperationLog;
import com.arcsoft.commander.domain.security.Account;
import com.arcsoft.commander.service.operationlog.OperationLogService;
import com.arcsoft.commander.service.security.SecurityService;

/**
 * The action for operation log
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class OperationLogAction extends BaseAction implements PageControl {

	private static final long TIME_DAY_MILLISECONDS = 86400000;
	private OperationLogService operationLogService;
	private SecurityService securityService;
	private String timeDuration;
	private String user;
	private String type;
	private String begin;
	private String end;
	private String description;
	private List<OperationLog> logList;

	private Pager pager;
	private Date dtBegin;
	private Date dtEnd;
	private Integer id;
	
	/**{type, desc}...*/
	protected Map<String, String> typeList = null;
	private Map<String, String> userList;

	public void setOperationLogService(OperationLogService operationLogService) {
		this.operationLogService = operationLogService;
	}

	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

	public String getTimeDuration() {
		return timeDuration;
	}

	public void setTimeDuration(String timeDuration) {
		this.timeDuration = timeDuration;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
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

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<OperationLog> getLogList() {
		return logList;
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
			typeList = new LinkedHashMap<String, String>(8);
			typeList.put("task", getText("log.type.task"));
			typeList.put("liveprofile", getText("log.type.liveprofile"));
			typeList.put("preset", getText("log.type.preset"));	
			typeList.put("device", getText("log.type.device"));
			typeList.put("setting", getText("log.type.setting"));
			typeList.put("user", getText("log.type.user"));
			typeList.put("role", getText("log.type.role"));
			typeList.put("record", getText("log.type.record"));
			typeList.put("channel", getText("log.type.channel"));
		}
		return typeList;
	}

	public Map<String, String> getUserList() {
		return userList;
	}

	private Condition buildParam() {
		List<Condition> conditions = new ArrayList<>();
		if (type != null && type.length() > 0)
			conditions.add(Condition.eq("type", type));
		if (user != null && user.length() > 0)
			conditions.add(Condition.eq("user", user));
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
		QueryInfo query = new QueryInfo();
		Condition condition = Condition.ne("name", "Admin");
		query.setCondition(condition);
		query.addSortOrder(SortOrder.asc("name"));
		List<Account> accounts = securityService.list(query);
		this.userList = new HashMap<>();
		userList.put("Admin", getText("security.role.admin"));
		if (accounts != null) {
			for (Account account : accounts)
				userList.put(account.getName(), account.getRealName());
		}
		QueryInfo info = new QueryInfo();
		info.setCondition(buildParam());
		info.addSortOrder(SortOrder.desc("createdAt"));
		pager = operationLogService.getLogs(info, getPager().getPageIndex(), getPager().getPageSize(), false);
		for (Object result : pager.getResult()) {
			OperationLog log = (OperationLog) result;
			String user = userList.get(log.getUser());
			if (user != null)
				log.setUser(user);
		}
		this.logList = pager.getResult();
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	public String showAttachment() {
		return SUCCESS;
	}

	public InputStream getAttachmentStream() throws IOException {
		String xml = operationLogService.getLogAttachment(id);
		if (xml == null) {
			return null;
		} else {
			return new ByteArrayInputStream(xml.getBytes("utf-8"));
		}
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	public String delete() {
		Condition condition = buildParam();
		operationLogService.deleteLogs(condition);
		return SUCCESS;
	}

	public String export() {
		HttpServletResponse resp = ServletActionContext.getResponse();
		resp.addHeader("Content-Type", "application/vnd.ms-excel");
		resp.addHeader("Content-Disposition", "attachment;filename=\"OperationLog.xls\"");
		resp.setCharacterEncoding("GBK");

		OutputStreamWriter os = null;
		try {
			os = new OutputStreamWriter(resp.getOutputStream(), "GBK");
			StringBuffer sb = new StringBuffer();
			// write column caption
			sb.append(getText("log.field.time")).append("\t");
			sb.append(getText("log.field.user")).append("\t");
			sb.append(getText("log.field.type")).append("\t");
			sb.append(getText("log.field.description")).append("\r\n");
			os.write(sb.toString());

			Pager pager = null;
			int pageIndex1 = 1;
			QueryInfo info = new QueryInfo();
			info.setCondition(buildParam());
			info.addSortOrder(SortOrder.desc("createdAt"));
			getTypeList();
			SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			do {
				pager = operationLogService.getLogs(info, pageIndex1, 10, true);
				@SuppressWarnings("unchecked")
				List<? extends OperationLog> logs = pager.getResult();

				// write column data
				for (OperationLog log : logs) {
					sb = new StringBuffer();
					String logTime = timeFormat.format(log.getCreatedAt());
					sb.append(logTime).append("\t");
					sb.append(log.getUser()).append("\t");
					sb.append(typeList.get(log.getType())).append("\t");
					String logDetail = log.getDescription();
					sb.append("\"");
					if (logDetail != null) {
						logDetail = logDetail.replaceAll("\"", "\"\"");
						sb.append(logDetail);
					}
					sb.append("\"\t");
					String attachment = log.getAttachment();
					sb.append("\"");
					if (attachment != null) {
						attachment = attachment.replaceAll("\"", "\"\"");
						sb.append(attachment);
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
