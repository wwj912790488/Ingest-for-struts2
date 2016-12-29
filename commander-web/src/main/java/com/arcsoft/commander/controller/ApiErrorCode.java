package com.arcsoft.commander.controller;

/**
 * Api Error code.
 * 
 * @author fjli
 */
public class ApiErrorCode {

	public static final int SUCCESS = 0;
	public static final int UNKNOWN_ERROR = -1;
	public static final int INVALID_ARGUMENT = 1000;
	public static final int INVALID_PAGE_NO = 1001;
	public static final int RECORD_NOT_EXIST = 1002;
    public static final int TASK_NOT_EXIST = 1003;
    public static final int TASK_START_FAILED = 1004;
    public static final int TASK_STOP_FAILED = 1005;
	public static final int TASK_DELETE_FAILED = 1006;
    public static final int TASK_CHECK_STATUS_FAILED = 1007;
	public static final int NO_SERVER_GROUP = 2001;


}
