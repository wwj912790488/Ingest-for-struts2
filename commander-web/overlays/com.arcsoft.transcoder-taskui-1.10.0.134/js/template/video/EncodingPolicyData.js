var DEVICE_ID_CPU = "0";
var DEVICE_ID_HARDWARE = "1";
var DEVICE_ID_GPU = "2";

var QUALITY_LEVEL_HARD = "-1";
var QUALITY_LEVEL_0 = "0";
var QUALITY_LEVEL_1 = "1";
var QUALITY_LEVEL_2 = "2";
var QUALITY_LEVEL_3 = "3";
var QUALITY_LEVEL_4 = "4";
var QUALITY_LEVEL_5 = "5";
var QUALITY_LEVEL_6 = "6";
var QUALITY_LEVEL_7 = "7";
var QUALITY_LEVEL_8 = "8";
var QUALITY_LEVEL_9 = "9";
var QUALITY_LEVEL_255 = "255";

var policyData = new Object();
policyData.license = new Object();
policyData.qualityLevel = [
	{key: QUALITY_LEVEL_HARD, value: str_video.gpu_fastest},
	{key: QUALITY_LEVEL_0, value: str_video.fast},
	{key: QUALITY_LEVEL_2, value: str_video.balance},
	{key: QUALITY_LEVEL_4, value: str_video.best_quality}
	];

policyData.license.qualityLevel = [
	{key: QUALITY_LEVEL_HARD, value: license.VIDEO_ENCODER_QUALITY_LEVEL_HARD},
	{key: QUALITY_LEVEL_0, value: license.ENABLED},
	{key: QUALITY_LEVEL_2, value: license.ENABLED},
	{key: QUALITY_LEVEL_4, value: license.ENABLED}
	];

policyData.mpeg2QualityLevel = [
	{key: QUALITY_LEVEL_0, value: "1"},
	{key: QUALITY_LEVEL_HARD, value: "0"}
	];

policyData.h265QualityLevel = [
	//{key: QUALITY_LEVEL_HARD, value: str_video.gpu_fastest},
	{key: QUALITY_LEVEL_0, value: str_video.fast},
	{key: QUALITY_LEVEL_1, value: str_video.faster},
	{key: QUALITY_LEVEL_2, value: str_video.balance},
	{key: QUALITY_LEVEL_3, value: str_video.high_quality},
	{key: QUALITY_LEVEL_4, value: str_video.best_quality},
	{key: QUALITY_LEVEL_5, value: str_video.best_quality},
	{key: QUALITY_LEVEL_6, value: str_video.mostbest_quality},
	{key: QUALITY_LEVEL_7, value: str_video.mostbestplus_quality},
	{key: QUALITY_LEVEL_255, value: str_video.mostbest_quality}
	];

policyData.h265QualityLevel_device = [
	{key: QUALITY_LEVEL_HARD, value: str_video.gpu_fastest}
	];

policyData.license.h265QualityLevel = [
	{key: QUALITY_LEVEL_HARD, value: license.VIDEO_ENCODER_QUALITY_LEVEL_HARD},
	{key: QUALITY_LEVEL_0, value: license.ENABLED},
	{key: QUALITY_LEVEL_1, value: license.DISABLED},
	{key: QUALITY_LEVEL_2, value: license.ENABLED},
	{key: QUALITY_LEVEL_3, value: license.DISABLED},
	{key: QUALITY_LEVEL_4, value: license.ENABLED},
	{key: QUALITY_LEVEL_5, value: license.DISABLED},
	{key: QUALITY_LEVEL_6, value: license.DISABLED},
	{key: QUALITY_LEVEL_7, value: license.DISABLED},
	{key: QUALITY_LEVEL_255, value: license.VIDEO_ENCODER_QUALITY_LEVEL_X265}
	];

policyData.dnxhdQualityLevel = [
	{key: QUALITY_LEVEL_0, value: "1"},
	{key: QUALITY_LEVEL_HARD, value: "0"}
	];

policyData.proresQualityLevel = [
	{key: QUALITY_LEVEL_0, value: "1"},
	{key: QUALITY_LEVEL_HARD, value: "0"}
	];

policyData.qualityLevel = uLicenseFilterKey(policyData.qualityLevel, policyData.license.qualityLevel);
policyData.h265QualityLevel = uLicenseFilterKey(policyData.h265QualityLevel, policyData.license.h265QualityLevel);

policyData.getQualityLevel = function(codec, device) {
	if(codec == VIDEO_CODEC_MPEG2) {
		return policyData.mpeg2QualityLevel;
	}
	else if(codec == VIDEO_CODEC_DNXHD) {
		return policyData.dnxhdQualityLevel;
	}
	else if(codec == VIDEO_CODEC_PRORES) {
		return policyData.proresQualityLevel;
	}
	else if(codec == VIDEO_CODEC_H265) {
		if(device == "1") {
			return policyData.h265QualityLevel_device;
		}
		else {
			return policyData.h265QualityLevel;
		}
	}
	else {
		return policyData.qualityLevel;
	}
};
