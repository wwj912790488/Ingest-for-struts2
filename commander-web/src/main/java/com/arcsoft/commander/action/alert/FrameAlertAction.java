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
public class FrameAlertAction  extends AlertAction {

    public String delete() {
        return super.delete();
    }
}
