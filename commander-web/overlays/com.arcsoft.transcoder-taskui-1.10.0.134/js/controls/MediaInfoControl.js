function MediaInfoControl() {
	/* controlDom: {program: xxx, audio: xxx, subtitle: xxx, brief: xxx} */
	this.controlDom = null;
	
	this.mediaInfoParser = new MediaInfoParser();
	this.tsParser = new TSParser();
	this.fnOnMediaInfoChanged = null;
	
	/*o: {program: xxx, audio: xxx, subtitle: xxx, brief: xxx}*/
	this.SetControlDom = function(o) {
		this.controlDom = o;
		
		var context = this;
		$(this.controlDom.program).change(function() {
			context.UpdateByProgram();
			context.UpdateMediaInfoText();
		});
		
		$(this.controlDom.audio).change(function() {
			context.updateByAudio();
			context.UpdateMediaInfoText();
		});

		$(this.controlDom.subtitle).change(function() {
			context.UpdateMediaInfoText();
		});

		$(this.controlDom.angle).change(function() {
			context.UpdateMediaInfoText();
		});
	};
	
	this.SetOnMediaInfoChanged = function(fn) {
		this.fnOnMediaInfoChanged = fn;
	};
	
	/* programInfo: {programId: xxx, audioTrackId: xxx, subtitleId: xxx} */
	this.UpdateControl = function(data, programInfo) {
		var domProgram = this.controlDom.program;
		var domAudioTrack = this.controlDom.audio;
		var domSubtitle = this.controlDom.subtitle;
		var domAngle = this.controlDom.angle;
		var domAudioChannel = this.controlDom.audioChannel;
		
		if(data == null) {
			this.mediaInfoParser.Init(null);
			this.tsParser.Init(null);
		} else {
			var mip = this.mediaInfoParser;
			mip.Init(data);
			var ci = mip.GetCommonInfo();
			if(mip.GetProgramCount() != null) {
				var tsp = this.tsParser;
				tsp.Init(data);
				
				var pa = tsp.GetProgramArray();
				if(pa == null || pa.length == 0) {
					domProgram.options.length = 0;
					domAudioTrack.options.length = 0;
					domSubtitle.options.length = 0;
					if(domAngle != null) domAngle.options.length = 0;
					if(domAudioChannel != null) domAudioChannel.options.length = 0;
				} else {
					domProgram.disabled = false;
					uUpdateSelect(domProgram, pa);
					
					var useDefault = false;
					if(programInfo == null || isNaN(programInfo.programId) 
							|| programInfo.programId == -1) {
						useDefault = true;
					} else {
						if(uGetMapValue(pa, programInfo.programId.toString()) == null) {
							useDefault = true;
						}
					}
					
					if(useDefault) {
						var used = tsp.GetProgramUsed();
						if(used != null) $(domProgram).val(used);
					}
					else {
						$(domProgram).val(programInfo.programId);
					}
					
					var programId = $(domProgram).val();
					var aa = tsp.GetAudioArrayi18(programId);
					var usedAudioId = null;
					if(aa != null && aa.length > 0) {
						domAudioTrack.disabled = false;
						uUpdateSelect(domAudioTrack, aa);
						
						useDefault = false;
						if(programInfo == null || isNaN(programInfo.audioTrackId) 
								|| programInfo.audioTrackId == -1) {
							useDefault = true;
						} else {
							if(uGetMapValue(aa, programInfo.audioTrackId.toString()) == null) {
								useDefault = true;
							}
						}
						
						if(useDefault) {
							usedAudioId = tsp.GetAudioUsed(programId);
						}
						else {
							usedAudioId = programInfo.audioTrackId;
						}
						
						$(domAudioTrack).val(usedAudioId);
					} else {
						domAudioTrack.options.length = 0;
					}
					
					var sa = tsp.GetSubtitleArrayi18(programId);
					if(sa != null && sa.length > 0) {
						domSubtitle.disabled = false;
						uUpdateSelect(domSubtitle, sa);
						
						useDefault = false;
						if(programInfo == null || isNaN(programInfo.subtitleId) 
								|| programInfo.subtitleId == -1) {
							useDefault = true;
						} else {
							if(uGetMapValue(sa, programInfo.subtitleId.toString()) == null) {
								useDefault = true;
							}
						}
						
						if(useDefault) {
							var used = tsp.GetSubtitleUsed(programId);
							if(used != null) $(domSubtitle).val(used);
						}
						else {
							$(domSubtitle).val(programInfo.subtitleId);
						}
					} else {
						domSubtitle.options.length = 0;
					}
					
					var angleArr = tsp.GetAngleArray(programId);
					if(domAngle != null) {
						if(angleArr != null && angleArr.length > 0) {
							domAngle.disabled = false;
							uUpdateSelect(domAngle, angleArr);
							
							if(programInfo == null || isNaN(programInfo.angleId)) {
							} else {
								$(domAngle).val(programInfo.angleId);
							}
						} else {
							domAngle.options.length = 0;
						}
					}
					
					var audioChannelArr = tsp.GetAudioChannelArray(programId, usedAudioId);
					if(domAudioChannel != null) {
						if(audioChannelArr != null && audioChannelArr.length > 0) {
							domAudioChannel.disabled = false;
							uUpdateSelect(domAudioChannel, audioChannelArr);
							
							if(programInfo == null || isNaN(programInfo.audioChannelId)) {
							} else {
								$(domAudioChannel).val(programInfo.audioChannelId);
							}
						} else {
							domAudioChannel.options.length = 0;
						}
					}
				}
			} else {
				domProgram.options.length = 0;
				domAudioTrack.options.length = 0;
				domSubtitle.options.length = 0;
				if(domAngle != null) domAngle.options.length = 0;
				
				var audioChannelArr = mip.GetAudioChannelArray();
				if(domAudioChannel != null) {
					if(audioChannelArr != null && audioChannelArr.length > 0) {
						domAudioChannel.disabled = false;
						uUpdateSelect(domAudioChannel, audioChannelArr);
						
						if(programInfo == null || isNaN(programInfo.audioChannelId)) {
						} else {
							$(domAudioChannel).val(programInfo.audioChannelId);
						}
					} else {
						domAudioChannel.options.length = 0;
					}
				}
			}
		}
		
		this.UpdateMediaInfoText();
	};
	
	this.GetMediaInfo = function() {
		var ci = this.mediaInfoParser.GetCommonInfo();
		if(ci == null) return null;
		
		var mediaInfo = {};
		mediaInfo.size = ci.size;
		if(this.mediaInfoParser.GetProgramCount() != null) {
			var program = {};
			var programId = $(this.controlDom.program).val();
			program.programId = programId;

			var tsp = this.tsParser;
			var va = tsp.GetVideoArray(programId);
			if(va != null && va.length > 0) {
				program.videoId = va[0].key;
				var vi = tsp.GetVideoInfo(programId, va[0].key);
				if(vi != null) {
					var video = {};
					video.codec = vi.codec;
					video.bitrate = vi.bitrate;
					video.aspectRatio = vi.aspect_ratio;
					video.framerate = vi.framerate;
					video.resolution = vi.resolution;
					mediaInfo.video = video;
					mediaInfo.duration = vi.duration;
				}
			}
			
			var audioId = $(this.controlDom.audio).val();
			program.audioId = audioId;
			var ai = tsp.GetAudioInfo(programId, audioId);
			if(ai != null) {
				var audio = {};
				audio.codec = ai.codec;
				audio.bitrate = ai.bitrate;
				audio.channel = ai.channel;
				audio.samplerate = ai.samplerate;
				audio.bitdepth = ai.bitdepth;
				mediaInfo.audio = audio;
			}
			
			program.subtitleId = $(this.controlDom.subtitle).val();
			
			if(this.controlDom.angle != null) {
				program.angleId = $(this.controlDom.angle).val();
			}
			
			if(this.controlDom.audioChannel != null) {
				program.audioChannelId = $(this.controlDom.audioChannel).val();
			}
			
			mediaInfo.program = program;
		} else {
			mediaInfo.duration = ci.duration;
			var mip = this.mediaInfoParser;
			var vi = mip.GetVideoInfo();
			if(vi != null) {
				var video = {};
				video.codec = vi.codec;
				video.bitrate = vi.bitrate;
				video.aspectRatio = vi.aspect_ratio;
				video.framerate = vi.framerate;
				video.resolution = vi.resolution;
				mediaInfo.video = video;
			}
			
			var ai = mip.GetAudioInfo();
			if(ai != null) {
				var audio = {};
				audio.codec = ai.codec;
				audio.bitrate = ai.bitrate;
				audio.channel = ai.channel;
				audio.samplerate = ai.samplerate;
				audio.bitdepth = ai.bitdepth;
				mediaInfo.audio = audio;
			}
		}
		return mediaInfo;
	};
	
	this.GetMediaInfoText = function() {
		var mediaInfo = this.GetMediaInfo();
		if(mediaInfo == null) return;
		
		var formatVideo = "{0} {1} {2} {3} {4}";
		var formatAudio = "{0} {1} {2} {3} {4}";
		var formatTime = "{0}:{1}:{2}";
		var outStr = "";
		
		var video = {codec: "", resolution: "", framerate: "", bitrate: ""};
		if(mediaInfo.video != null ) {
			video.codec = mediaInfo.video.codec;
			video.resolution = mediaInfo.video.resolution;
			video.aspectRatio =  mediaInfo.video.aspectRatio;
			video.framerate = CheckMediaInfoValue(mediaInfo.video.framerate);
			if(video.framerate.length != 0) video.framerate += "fps";
			video.bitrate = CheckMediaInfoValue(mediaInfo.video.bitrate);
			if(video.bitrate.length != 0) video.bitrate += "Kbps";
			outStr = formatVideo.format(video.codec, video.resolution, video.aspectRatio, 
					video.framerate, video.bitrate);
		}
		
		var audio = {codec: "", channel: "", samplerate:"", bitrate:"", bitdepth:""};
		if(mediaInfo.audio != null ) {
			audio.codec = mediaInfo.audio.codec;
			audio.channel = CheckMediaInfoValue(mediaInfo.audio.channel);
			if(audio.channel.length != 0) audio.channel += "channel(s)";
			audio.samplerate = CheckMediaInfoValue(mediaInfo.audio.samplerate);
			if(audio.samplerate.length != 0) audio.samplerate += "KHz";
			audio.bitrate = CheckMediaInfoValue(mediaInfo.audio.bitrate);
			if(audio.bitrate.length != 0) audio.bitrate += "Kbps";
			audio.bitdepth = CheckMediaInfoValue(mediaInfo.audio.bitdepth);
			if(audio.bitdepth.length != 0) audio.bitdepth += "bits";
			var s = formatAudio.format(audio.codec, audio.channel, audio.samplerate, audio.bitrate, audio.bitdepth);
			outStr = outStr + " | " + s;
		}
		
		if(mediaInfo.duration != null) {
			var time = uMs2Hmsm(mediaInfo.duration, 25);
			var s = formatTime.format(time.hour, time.minute, time.second);
			outStr = outStr + " | " + s;
		}
		
		return outStr;
	};
	
	this.UpdateMediaInfoText = function() {
		var str = this.GetMediaInfoText();
		$(this.controlDom.brief).text(str);
		
		if($.isFunction(this.fnOnMediaInfoChanged)) {
			this.fnOnMediaInfoChanged(this.GetMediaInfo());
		}
	};
	
	this.UpdateByProgram = function() {
		var tsp = this.tsParser;
		var pa = tsp.GetProgramArray();
		if(pa.length <= 0) return;
		var selected = $(this.controlDom.program).val();
		var pIndex = 0;
		for(pIndex = 0; pIndex < pa.length; pIndex++) {
			if(selected == pa[pIndex].key) {
				break;
			}
		}
		if(pIndex == pa.length) return;
		
		var aa = tsp.GetAudioArrayi18(pa[pIndex].key);
		var domAudioTrack = this.controlDom.audio;
		if(aa.length > 0) {
			domAudioTrack.disabled = false;
			uUpdateSelect(domAudioTrack, aa);
		} else {
			domAudioTrack.disabled = true;
			domAudioTrack.options.length = 0;
		}
		
		var sa = tsp.GetSubtitleArrayi18(pa[pIndex].key);
		var domSubtitle = this.controlDom.subtitle;
		if(sa.length > 0) {
			domSubtitle.disabled = false;
			uUpdateSelect(domSubtitle, sa);
		}

		var angleArr = tsp.GetAngleArray(pa[pIndex].key);
		var domAngle = this.controlDom.angle;
		if(domAngle != null) {
			if(angleArr.length > 0) {
				domAngle.disabled = false;
				uUpdateSelect(domAngle, angleArr);
			}
		}
		
		var audioChannelArr = tsp.GetAudioChannelArray(pa[pIndex].key, aa[0].key);
		var domAudioChannel = this.controlDom.audioChannel;
		if(domAudioChannel != null) {
			if(audioChannelArr.length > 0) {
				domAudioChannel.disabled = false;
				uUpdateSelect(domAudioChannel, audioChannelArr);
			}
		}
	};
	
	/* o:{programId: xxx, audioTrackId: xxx, subtitleId: xxx} */
	this.SetProgram = function(o) {
		var tsp = this.tsParser;
		$(this.controlDom.program).val(o.programId);
		
		var aa = tsp.GetAudioArrayi18(o.programId);
		var domAudioTrack = this.controlDom.audio;
		if(aa != null && aa.length > 0) {
			domAudioTrack.disabled = false;
			uUpdateSelect(domAudioTrack, aa);
			$(domAudioTrack).val(o.audioTrackId);
		} else {
			domAudioTrack.disabled = true;
			domAudioTrack.options.length = 0;
		}
		
		var sa = tsp.GetSubtitleArrayi18(o.programId);
		var domSubtitle = this.controlDom.subtitle;
		if(sa.length > 0) {
			domSubtitle.disabled = false;
			uUpdateSelect(domSubtitle, sa);
			$(domSubtitle).val(o.subtitleId);
		} else {
			domSubtitle.disabled = true;
			domSubtitle.options.length = 0;
		}
		
		var angleArr = tsp.GetAngleArray(o.programId);
		var domAngle = this.controlDom.angle;
		if(domAngle != null) {
			if(angleArr.length > 0) {
				domAngle.disabled = false;
				uUpdateSelect(domAngle, angleArr);
				$(domAngle).val(o.angleId);
			} else {
				domAngle.disabled = true;
				domAngle.options.length = 0;
			}
		}
		
		var audioChannelArr = tsp.GetAudioChannelArray(o.programId, o.audioTrackId);
		var domAudioChannel = this.controlDom.audioChannel;
		if(domAudioChannel != null) {
			if(audioChannelArr.length > 0) {
				domAudioChannel.disabled = false;
				uUpdateSelect(domAudioChannel, audioChannelArr);
				$(domAudioChannel).val(o.audioChannelId);
			} else {
				domAudioChannel.disabled = true;
				domAudioChannel.options.length = 0;
			}
		}
		
		this.UpdateMediaInfoText();
	};
	
	/*static function*/
	function CheckMediaInfoValue(inputString) {
		var value = parseFloat(inputString);
		if(isNaN(value)) {
			value = "";
		} else if(value < 1) {
			value = "";
		} else {
			value = String(value);
		}
		return value;
	};
}

MediaInfoControl.prototype = {
	updateByAudio : function() {
		var tsp = this.tsParser;
		
		var programId = parseInt($(this.controlDom.program).val());
		if(programId == null || isNaN(programId)) return;
		
		var audioId = parseInt($(this.controlDom.audio).val());
		if(audioId == null || isNaN(audioId)) return;
		
		var audioChannelArr = tsp.GetAudioChannelArray(programId, audioId);
		var domAudioChannel = this.controlDom.audioChannel;
		if(domAudioChannel != null) {
			if(audioChannelArr.length > 0) {
				domAudioChannel.disabled = false;
				uUpdateSelect(domAudioChannel, audioChannelArr);
			}
		}
	}
};

var g_MediaInfoAjax = new MediaInfoAjax();
function MediaInfoAjax() {
	this.postingCount = 0;
	
	/* inputInfo: {type: xxx, uri: xxx} */
	this.RequestMediaInfo = function(inputInfo, fnOnResponse, userData) {
		var context = this;
		var inputType = inputInfo.type;
		
		var url ="getMediaFileInfo";
		var uri = inputInfo.uri;
		if(!VerifyURI(uri, inputType)) {
			return false;
		}
		
		if(inputType == INPUT_TYPE_SDI) {
			if(inputInfo.sdi4k != null && inputInfo.sdi4k) {
				uri = "sdi4k:" + uri;
			}
			else {
				uri = "sdi:" + uri;
			}
		} else if(inputType == INPUT_TYPE_CVBS) {
			uri = "cvbs:" + uri;
		} else if(inputType == INPUT_TYPE_HDMI) {
			uri = "hdmi:" + uri;
		} else if(inputType == INPUT_TYPE_AES_EBU) {
			uri = "aes:" + uri;
		} else if(inputType == INPUT_TYPE_ASI) {
			uri = "asi:" + uri;
		} else if(inputType == INPUT_TYPE_BD) {
			uri = "bd:" + uri;
		} else if(inputType == INPUT_TYPE_DVD) {
			uri = "dvd:" + uri;
		} else if(inputType == INPUT_TYPE_P2) {
			uri = "p2:" + uri;
		}

		var param = { 'uri': uri, 'rnd': Math.random() };
		if(inputInfo.eth != null) {
			$.extend(param, param, {'eth': inputInfo.eth});
		}
		if(g_params_getMediaFileInfo != null) {
			$.extend(param, param, g_params_getMediaFileInfo);
		}
		this.postingCount++;
		$.post(url, param, function(data) {
			context.postingCount--;
			if($.isFunction(fnOnResponse)) {
				fnOnResponse(data, userData);
			}
		}, "xml");
		
		return true;
	};
	
	/*static function*/
	function VerifyURI(uri, inputType) {
		if(uri == null) return false;
		if(uri.length < 1) return false;
		if(inputType == INPUT_TYPE_NETWORK) {
			//if(uri.length < 7) return false;
			//if(uri.indexOf("://") == -1) return false;
		} else if(inputType == INPUT_TYPE_SDI
				|| inputType == INPUT_TYPE_CVBS
				|| inputType == INPUT_TYPE_HDMI
				|| inputType == INPUT_TYPE_ASI) {
			var port = parseInt(uri);
			if(isNaN(port) || port < 0) return false;
		}
		return true;
	};
};

var g_MediaInfoRequestList = new MediaInfoRequestList;
function MediaInfoRequestList() {
	this.mrList = new Array();
	
	this.getIndex = function(requester) {
		for(var i = 0; i < this.mrList.length; i++) {
			if(this.mrList[i] === requester) {
				return i;
			}
		}
		
		return -1;
	};
	
	this.remove = function(requester) {
		var index = this.getIndex(requester);
		if(index >= 0) {
			this.mrList.splice(index, 1);
		}
		return index;
	};
	
	this.add = function(requester) {
		var index = this.getIndex(requester);
		if(index < 0) {
			this.mrList.push(requester);
			index = this.mrList.length - 1;
		}
		return index;
	};
	
	this.getCount = function() {
		return this.mrList.length;
	};
}
