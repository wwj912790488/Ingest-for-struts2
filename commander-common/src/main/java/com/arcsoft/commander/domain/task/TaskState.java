package com.arcsoft.commander.domain.task;

import java.util.Date;

import com.arcsoft.commander.cluster.action.task.StateChangeRequest;

/**
 * 
 * This class used to holder task status for {@link StateChangeRequest}
 * 
 * @author zw
 */
public class TaskState {

	private Integer id;
	private String state;
	private Date date;
	private Integer transcodingTime;
	private Integer postProcessingTime;

	/**
	 * Returns the task id.
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Set the task id.
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Returns the task state.
	 */
	public String getState() {
		return state;
	}

	/**
	 * Set the task state.
	 * 
	 * @param state - the task state
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * Returns the begin or end time. For RUNNING state, it is begin time. For COMPLETED, ERROR, CANCELLED state, it is
	 * end time.
	 */
	public Date getDate() {
		return date;
	}

	/**
	 * Set the begin or end time.
	 * 
	 * @param date - the time to be set
	 */
	public void setDate(Date date) {
		this.date = date;
	}

	/**
	 * Returns the transcoding time.
	 */
	public Integer getTranscodingTime() {
		return transcodingTime;
	}

	/**
	 * Set the transcoding time.
	 * 
	 * @param transcodingTime
	 */
	public void setTranscodingTime(Integer transcodingTime) {
		this.transcodingTime = transcodingTime;
	}

	/**
	 * Return the processing time after transcoding.
	 */
	public Integer getPostProcessingTime() {
		return postProcessingTime;
	}

	/**
	 * Set the processing time after transcoding.
	 * 
	 * @param postProcessingTime
	 */
	public void setPostProcessingTime(Integer postProcessingTime) {
		this.postProcessingTime = postProcessingTime;
	}
}
