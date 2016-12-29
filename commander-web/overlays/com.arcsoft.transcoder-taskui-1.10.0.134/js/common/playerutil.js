function Player_SelectTrack(domPlayer, uri, program) {
	var programId = parseInt(program.programId);
	if(isNaN(programId)) {
		programId = -1;
	} else {
		if(uri.match(/^udp:/i) != null) {
			//UDP use programId
			programId = programId + 0x10000000;
		}
	}
	
	var videoId = parseInt(program.videoId);
	if(isNaN(videoId)) videoId = -1;
	
	var audioId = parseInt(program.audioId);
	if(isNaN(audioId)) audioId = -1;
	
	var subtitleId = parseInt(program.subtitleId);
	if(isNaN(subtitleId)) subtitleId = -1;
	
	if(program.angleId != null && program.angleId != "0") {
		videoId = program.angleId;
	}

	domPlayer.SelectTrackByID(programId, videoId, audioId, subtitleId);
};

function Player_AddCompose(domPlayer, uri, programList) {
	if(programList == null) return;
	if(programList.length == 0) return;
	
	if(programList.length == 1) {
		var program = programList[0];
		var titleId = program.programId;
		var videoId = program.videoId;
		var audioId = program.audioTrackId;
		var subtitleId = program.subtitleId;
		
		if(uri.match(/^udp:/i) != null) {
			//UDP use programId
			titleId = parseInt(titleId);
			titleId = titleId + 0x10000000;
		}
		
		if(titleId == null) titleId = -1;
		if(videoId == null) videoId = -1;
		if(audioId == null) audioId = -1;
		if(subtitleId == null) subtitleId = -2;
		
		if(program.angleId != null && program.angleId != "0") {
			videoId = program.angleId;
		}
		
		domPlayer.SelectTrackByID(titleId, videoId, audioId, subtitleId);
	} else {
		for(var i = 0; i < programList.length; i++) {
			var program = programList[i];
			var titleId = program.programId;
			var videoId = program.videoId;
			var audioId = program.audioTrackId;
			var subtitleId = program.subtitleId;
			
			if(program.angleId != null && program.angleId != "0") {
				videoId = program.angleId;
			}
			
			domPlayer.AddComposeTitle(titleId, videoId, audioId, subtitleId);
		}
	}
}

function Player_GetMediaType(inputType, uri) {
	var mediaType = 0;
	inputType = inputType.toLowerCase();
	if(inputType == INPUT_TYPE_FILE.toLowerCase()) {
		mediaType = PLAYER_MEDIA_TYPE_FILE;
	}
	else if(inputType == INPUT_TYPE_NETWORK.toLowerCase()) {
		if(uri.match(/^udp:/i) != null
			) {
			mediaType = PLAYER_MEDIA_TYPE_UDP;
		} else {
			mediaType = PLAYER_MEDIA_TYPE_FILE;
		}
	}
	else if(inputType == INPUT_TYPE_BD.toLowerCase()) {
		mediaType = PLAYER_MEDIA_TYPE_BD;
	}
	else if(inputType == INPUT_TYPE_DVD.toLowerCase()) {
		mediaType = PLAYER_MEDIA_TYPE_DVD;
	}
	mediaType = mediaType*0x10000 + 3;
	return mediaType;
};

function Player_Init(domParent) {
	var bi = uBrowserInfo();
	if(!bi.msie || bi.platform != "Win32") {
		LoadFakePlayer(domParent);
		return null;
	}
	
	var domPlayer = LoadTMPlayer(domParent);
	
	if(domPlayer.GetPlayState == undefined) {
		domPlayer = null;
	}
	
	return domPlayer;
}
