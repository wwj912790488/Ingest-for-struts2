package com.arcsoft.commander.service.schedule;

import com.arcsoft.commander.domain.schedule.ScheduleTriggerEvent;

/**
 * Schedule event processor.
 * 
 * @author fjli
 */
public interface ScheduleEventProcessor {

	void processScheduleEvent(ScheduleTriggerEvent event);

}
