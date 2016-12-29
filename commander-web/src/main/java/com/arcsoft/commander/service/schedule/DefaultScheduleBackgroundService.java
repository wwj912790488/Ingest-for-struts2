package com.arcsoft.commander.service.schedule;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;
import com.arcsoft.commander.domain.schedule.ScheduleTriggerEvent;
import com.arcsoft.commander.domain.schedule.ScheduleType;

/**
 * Default schedule service.
 * 
 * TODO: Add some logic to resolve the issue while the time is adjust backward.
 * 
 * @author fjli
 */
public class DefaultScheduleBackgroundService implements ScheduleBackgroundService, ScheduleChangeListener {

	private Logger log = Logger.getLogger(DefaultScheduleBackgroundService.class);
	private ScheduledExecutorService scheduleExecutor = null;
	private ExecutorService executor;
	private ReentrantLock scheduleLock = new ReentrantLock();
	private Condition scheduleCondition = scheduleLock.newCondition();
	private boolean running = false;
	private StandardTimeGenerator standardTimeGenerator;
	private Map<String, ScheduleEventProcessor> processors;
	private SchedulePersistentService schedulePersistentService;
	private Map<ScheduleType, ScheduleEventParser> parsers = new HashMap<>();
	private SystemDao systemDao;

	public DefaultScheduleBackgroundService() {
		parsers.put(ScheduleType.ONCE, new OnceScheduleEventParser());
		parsers.put(ScheduleType.WEEKLY, new WeeklyScheduleEventParser());
		standardTimeGenerator = new DefaultStandardTimeGenerator();
	}

	public void setSchedulePersistentService(SchedulePersistentService schedulePersistentService) {
		this.schedulePersistentService = schedulePersistentService;
	}

	public void setStandardTimeGenerator(StandardTimeGenerator standardTimeGenerator) {
		this.standardTimeGenerator = standardTimeGenerator;
	}

	public void setProcessors(Map<String, ScheduleEventProcessor> processors) {
		this.processors = processors;
	}

	public void setSystemDao(SystemDao systemDao) {
		this.systemDao = systemDao;
	}

	public void setScheduleEventParsers(List<ScheduleEventParser> scheduleEventParsers) {
		for (ScheduleEventParser parser : scheduleEventParsers) {
			parsers.put(parser.getScheduleType(), parser);
		}
	}

	@Override
	public void scheduleAdded(final Schedule schedule) {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				processScheduleAdded(schedule);
			}
		});
	}

	private void processScheduleAdded(Schedule schedule) {
		log.info("schedule added: " + schedule.getName() + ", " + schedule.getScheduleType());
		ScheduleEventParser parser = parsers.get(schedule.getScheduleType());
		if (parser == null) {
			log.error("cannot find the parser for the specified schedule type: " + schedule.getScheduleType());
			return;
		}
		ScheduleEvent firstEvent = parser.getFirstSchedule(schedule);
		if (firstEvent == null) {
			schedule.setFinished(true);
		} else {
			ScheduleEvent finalEvent = parser.getFinalSchedule(schedule);
			schedule.setFirstTime(firstEvent.getTriggers().get(0).getScheduleTime());
			if (finalEvent != null) {
				schedule.setFinalTime(finalEvent.getTriggers().get(0).getScheduleTime());
			}
			generateNextScheduleEvent(schedule);
		}
	}

	@Override
	public void scheduleRemoved(Schedule schedule) {
		// TODO: schedule removed ...
	}

	@Override
	public void scheduleUpdated(Schedule schedule) {
		// TODO: schedule updated ...
	}

	private void generateNextScheduleEvent(Schedule schedule) {
		log.info("generate next schedule event: " + schedule.getName() + ", " + schedule.getScheduleType());
		ScheduleEventParser parser = parsers.get(schedule.getScheduleType());
		ScheduleEvent scheduleEvent = null;
		if (schedule.getLastTime() == null) {
			if (schedule.getScheduleType() != ScheduleType.ONCE) {
				Calendar current = standardTimeGenerator.getCurrentTime();
				Date date = ScheduleUtils.getDatePartOnly(current.getTimeInMillis());
				scheduleEvent = parser.getNextSchedule(schedule, date);
			} else {
				scheduleEvent = parser.getFirstSchedule(schedule);
			}
		} else {
			Calendar next = Calendar.getInstance();
			next.setTimeInMillis(schedule.getLastTime().getTime());
			next.add(Calendar.DAY_OF_MONTH, 1);
			Date date = ScheduleUtils.getDatePartOnly(next);
			scheduleEvent = parser.getNextSchedule(schedule, date);
		}
		if (scheduleEvent != null) {
			Timestamp nextTime = scheduleEvent.getTriggers().get(0).getScheduleTime();
			log.info("generate next schedule event: next time=" + nextTime);
			schedule.setNextTime(nextTime);
			schedulePersistentService.saveEvent(schedule, scheduleEvent);
			signalAllEvents();
		} else {
			log.info("generate next schedule event: no event any more.");
			schedulePersistentService.updateFinished(schedule);
		}
	}

	private void processTriggerEvent(Long eventId, Long triggerId) {
		// Find event by id which will include all triggers.
		ScheduleEvent event = schedulePersistentService.getEvent(eventId);
		if (event == null) {
			return;
		}

		// Find the triggered trigger.
		ScheduleTrigger trigger = null;
		for (ScheduleTrigger tmpTrigger : event.getTriggers()) {
			if (tmpTrigger.getId() == triggerId) {
				trigger = tmpTrigger;
				break;
			}
		}
		if (trigger == null) {
			return;
		}

		Schedule schedule = event.getSchedule();
		log.info("process trigger event: " + trigger.getScheduleTime());
		schedulePersistentService.updateFinished(trigger);

		int index = event.getTriggers().indexOf(trigger);
		if (index == 0) {
			// If the trigger is the first, generate next schedule event.
			if (schedule != null) {
				schedule.setLastTime(trigger.getScheduleTime());
				schedule.setNextTime(null);
				generateNextScheduleEvent(schedule);
			}
		} else if (index == event.getTriggers().size() - 1) {
			// If the trigger is the last, delete event.
			schedulePersistentService.deleteEvent(event);
		}

		// Process event trigger.
		try {
			if (processors != null) {
				ScheduleEventProcessor processor = processors.get(schedule.getSource());
				if (processor != null) {
					ScheduleTriggerEvent triggerEvent = new ScheduleTriggerEvent(schedule, event, trigger);
					processor.processScheduleEvent(triggerEvent);
				}
			}
		} catch (Exception e) {
			log.error("processor event failed.", e);
		}
	}

	private void scheduleTriggerEvents() {
		int startOffset = StringHelper.toDefaultIfNull(systemDao.getInteger("record.offset.start"), 60);
		int stopOffset = StringHelper.toDefaultIfNull(systemDao.getInteger("record.offset.stop"), 60);
		Calendar c = standardTimeGenerator.getCurrentTime();
		c.add(Calendar.SECOND, 30 + startOffset);
		List<ScheduleTrigger> triggers = schedulePersistentService.findUnTriggeredTriggers(new Timestamp(c.getTimeInMillis()));
		log.info("find schedule untriggered trigger events: " + triggers.size());
		for (final ScheduleTrigger trigger : triggers) {
			long delay = trigger.getScheduleTime().getTime() - standardTimeGenerator.getCurrentTime().getTimeInMillis();
			final ScheduleEvent event = trigger.getEvent();
			if (event.getTriggers().size() > 1 && event.getTriggers().indexOf(trigger) == 1) {
				delay += TimeUnit.SECONDS.toMillis(stopOffset);
			} else {
				delay -= TimeUnit.SECONDS.toMillis(startOffset);
			}
			scheduleExecutor.schedule(new Runnable() {
				@Override
				public void run() {
					processTriggerEvent(event.getId(), trigger.getId());
				}
			}, delay < 0 ? 0 : delay, TimeUnit.MILLISECONDS);
			schedulePersistentService.updateTriggered(trigger);
		}
	}

	private void signalAllEvents() {
		scheduleLock.lock();
		try {
			scheduleCondition.signalAll();
		} finally {
			scheduleLock.unlock();
		}
	}

	@Override
	public synchronized void start() {
		if (running) {
			return;
		}
		running = true;
		executor = Executors.newFixedThreadPool(5);
		scheduleExecutor = Executors.newScheduledThreadPool(5);
		scheduleExecutor.execute(new Runnable() {
			public void run() {
				while (running) {
					scheduleLock.lock();
					try {
						try {
							scheduleTriggerEvents();
						} catch (Exception e) {
							log.error("execute schedule trigger events failed. ", e);
						}
						try {
							scheduleCondition.await(30, TimeUnit.SECONDS);
						} catch (InterruptedException e) {
							break;
						}
					} finally {
						scheduleLock.unlock();
					}
				}
			}
		});
	}

	@Override
	public synchronized void stop() {
		if (running) {
			running = false;
			signalAllEvents();
			executor.shutdownNow();
			scheduleExecutor.shutdownNow();
		}
	}

}
