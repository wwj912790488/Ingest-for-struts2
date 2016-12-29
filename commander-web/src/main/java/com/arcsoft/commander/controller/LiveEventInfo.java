package com.arcsoft.commander.controller;

import java.util.List;
import java.util.Map;

public class LiveEventInfo {

	private String name;
	private Integer profile;
	private String profileName;
	private LiveInput input;
	private List<LiveOutput> outputs;
	private Map<String, String> options;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getProfile() {
		return profile;
	}

	public void setProfile(Integer profile) {
		this.profile = profile;
	}

	public String getProfileName() {
		return profileName;
	}

	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}

	public LiveInput getInput() {
		return input;
	}

	public void setInput(LiveInput input) {
		this.input = input;
	}

	public List<LiveOutput> getOutputs() {
		return outputs;
	}

	public void setOutputs(List<LiveOutput> outputs) {
		this.outputs = outputs;
	}

	public Map<String, String> getOptions() {
		return options;
	}

	public void setOptions(Map<String, String> options) {
		this.options = options;
	}

}
