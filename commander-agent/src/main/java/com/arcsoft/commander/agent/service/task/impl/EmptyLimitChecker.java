package com.arcsoft.commander.agent.service.task.impl;

import com.arcsoft.transcoder.ITranscodingTracker;
import com.arcsoft.transcoder.LimitChecker;
import com.arcsoft.util.errorcode.ErrorCode;

/**
 * Empty limit checker.
 * 
 * @author fjli
 */
public class EmptyLimitChecker extends LimitChecker {

	@Override
	public int checkLimit(ITranscodingTracker toDo, StringBuilder outErrDesc) {
		return ErrorCode.ERR_NONE;
	}

}
