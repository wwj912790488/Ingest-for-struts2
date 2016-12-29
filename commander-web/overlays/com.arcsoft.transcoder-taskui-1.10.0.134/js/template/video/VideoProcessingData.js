var DENOISE_METHOD_CLOSE = "-1";
var DENOISE_METHOD_0 = "0";
var DENOISE_METHOD_1 = "1";

var videoProcessingData = new Object();
videoProcessingData.license = {};

videoProcessingData.deinterlace = [
	{key: "0",	value: str_common.off},
	{key: "1", value: str_common.on},
	{key: "2", value: str_common.auto}
	];

videoProcessingData.antiShaking = [
	{key: "-1",	value: str_common.off},
	{key: "0", value: str_video.antiShakingOn},
	{key: "1", value: str_video.antiShakingOnDelay}
	];

videoProcessingData.license.antiShaking = [
	{key: "-1",	value: license.ENABLED},
	{key: "0", value: license.IMAGE_EDITING_ANTISHAKING_DELAY},
	{key: "1", value: license.ENABLED}
	];

videoProcessingData.denoiseM0 = [
	{key: "0", value: "0"},
	{key: "1", value: "1"},
	{key: "2", value: "2"},
	{key: "3", value: "3"},
	{key: "4", value: "4"},
	{key: "5", value: "5"},
	{key: "6", value: "6"},
	{key: "7", value: "7"},
	{key: "8", value: "8"},
	{key: "9", value: "9"},
	{key: "10", value: "10"}
	];

videoProcessingData.denoiseM1 = [
   	{key: "0", value: "0"},
   	{key: "1", value: "1"},
   	{key: "2", value: "2"},
   	{key: "3", value: "3"}
   	];

videoProcessingData.denoiseMethod = [
   	{key: DENOISE_METHOD_0, value: str_video.denoise_method_0},
   	{key: DENOISE_METHOD_1, value: str_video.denoise_method_1}
   	];

videoProcessingData.license.denoiseMethod = [
	{key: DENOISE_METHOD_0, value: license.ENABLED},
	{key: DENOISE_METHOD_1, value: license.IMAGE_EDITING_DENOISE_QUALITY}
	];

videoProcessingData.delight = [
	{key: "0", value: "0"},
	{key: "1", value: "1"},
	{key: "2", value: "2"},
	{key: "3", value: "3"},
	{key: "4", value: "4"},
	{key: "5", value: "5"},
	{key: "6", value: "6"}
	];

videoProcessingData.sharpen = [
	{key: "0", value: "0"},
	{key: "1", value: "1"},
	{key: "2", value: "2"},
	{key: "3", value: "3"},
	{key: "4", value: "4"},
	{key: "5", value: "5"}
	];

videoProcessingData.deinterlaceAlg = [
   	{key: "3", value: str_video.deinterlacealg_quality},
   	{key: "1", value: str_video.deinterlacealg_speed}
   	];

videoProcessingData.resizeAlg = [
 	//{key: "0", value: "AUTO"},
 	//{key: "2", value: "GUASS"},
 	{key: "3", value: str_video.resizealg_lanczos},
 	{key: "1", value: str_video.resizealg_bilinear}
 	];

/* license control */
videoProcessingData.antiShaking = uLicenseFilterKey(videoProcessingData.antiShaking, videoProcessingData.license.antiShaking);
videoProcessingData.denoiseMethod = uLicenseFilterKey(videoProcessingData.denoiseMethod, videoProcessingData.license.denoiseMethod);

videoProcessingData.getDeinterlace = function() {
	return videoProcessingData.deinterlace;
};

videoProcessingData.getDenoise = function(method) {
	if(method == DENOISE_METHOD_0) {
		return videoProcessingData.denoiseM0;
	}
	else if(method == DENOISE_METHOD_1) {
		return videoProcessingData.denoiseM1;
	}
	else {
		return videoProcessingData.denoiseM0;
	}
	
};

videoProcessingData.getDelight = function() {
	return videoProcessingData.delight;
};

videoProcessingData.getSharpen = function() {
	return videoProcessingData.sharpen;
};

videoProcessingData.getAntiShaking = function() {
	return videoProcessingData.antiShaking;
};

videoProcessingData.getResizeAlg = function() {
	return videoProcessingData.resizeAlg;
};

videoProcessingData.getDeinterlaceAlg = function() {
	return videoProcessingData.deinterlaceAlg;
};

videoProcessingData.getDenoiseMethod = function() {
	return videoProcessingData.denoiseMethod;
};