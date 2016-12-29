package com.arcsoft.commander.service.task.impl;

import com.arcsoft.util.MediaInfo;
import com.arcsoft.web4transcoder.domain.input.CandidateLocation;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.service.builder.MediaInfoService;
import com.arcsoft.web4transcoder.service.builder.MediaSummary;

/**
 * Empty media service for merge transcoder.
 * 
 * @author fjli
 */
public class EmptyMediaInfoService implements MediaInfoService {

	@Override
	public MediaSummary getMediaSummary(Input input) {
		return null;
	}

	@Override
	public MediaSummary getMediaSummary(Input input, MediaInfo mediaInfo){
		return null;
	}

	@Override
	public MediaSummary getMediaSummary(CandidateLocation cl){
		return null;
	}

	@Override
	public String getAudioTrackIds(MediaInfo mi, Integer programId) {
		return null;
	}

	@Override
	public MediaInfo getMediaInfo(Input input) {
		return null;
	}

	@Override
	public MediaInfo getMediaInfo(CandidateLocation candidateLocation) {
		return null;
	}

	@Override
	public MediaInfo fetchSavingMediaInfo(Input input) {
		return null;
	}

	@Override
	public MediaInfo fetchSavingMediaInfo(CandidateLocation candidateLocation) {
		return null;
	}

}
