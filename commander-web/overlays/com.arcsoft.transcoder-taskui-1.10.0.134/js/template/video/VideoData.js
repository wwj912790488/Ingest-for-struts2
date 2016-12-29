var VIDEO_CODEC_H264 ="H264";
var VIDEO_CODEC_AVS ="AVS";
var VIDEO_CODEC_H265 = "H265";
var VIDEO_CODEC_MPEG2 ="MPEG2";
var VIDEO_CODEC_MPEG4 ="MPEG4";
var VIDEO_CODEC_MPEG1 ="MPEG1";
var VIDEO_CODEC_WMV ="VC-1";
var VIDEO_CODEC_H263 ="H263";
var VIDEO_CODEC_DV ="DV";
var VIDEO_CODEC_S263 ="S263";
var VIDEO_CODEC_PRORES ="ProRes";
var VIDEO_CODEC_RAW ="RAW";
var VIDEO_CODEC_DNXHD ="DNxHD";
var VIDEO_CODEC_PASSTHROUGH ="PassThrough";

/*video codec profile*/
var VIDEO_PROFILE_HIGH ="High";
var VIDEO_PROFILE_MAIN ="Main";
var VIDEO_PROFILE_BASELINE ="Baseline";
var VIDEO_PROFILE_AVCIntra50 ="AVCIntra50";
var VIDEO_PROFILE_AVCIntra100 ="AVCIntra100";
var VIDEO_PROFILE_AVCIntra200 ="AVCIntra200";
var VIDEO_PROFILE_SIMPLE ="Simple";
var VIDEO_PROFILE_HIGH422 = "High422";
var VIDEO_PROFILE_MPEG30 = "MPEG30";
var VIDEO_PROFILE_MPEG40 = "MPEG40";
var VIDEO_PROFILE_MPEG50 = "MPEG50";
var VIDEO_PROFILE_ADVANCED ="Advanced";
var VIDEO_PROFILE_AUTO = "Auto";
var VIDEO_PROFILE_H265_MAIN = "H265_Profile_Main";
var VIDEO_PROFILE_AVS_BASE = "Base";
var VIDEO_PROFILE_AVS_BROADCASTING = "Broadcasting";
var VIDEO_PROFILE_0 = "Profile0";
var VIDEO_PROFILE_1 = "Profile1";
var VIDEO_PROFILE_2 = "Profile2";
var VIDEO_PROFILE_3 = "Profile3";
var VIDEO_PROFILE_4 = "Profile4";
var VIDEO_PROFILE_5 = "Profile5";
var VIDEO_DV25411 = "DV25411";
var VIDEO_PROFILE_PRORES_PROXY = "ProRes_Proxy";
var VIDEO_PROFILE_PRORES_LT = "ProRes_LT";
var VIDEO_PROFILE_PRORES_STANDARD = "ProRes_Standard";
var VIDEO_PROFILE_PRORES_HQ = "ProRes_HQ";
var VIDEO_PROFILE_RAW = "RAW_Profile";
var VIDEO_PROFILE_DNXHD_220X = "DNxHD220X";
var VIDEO_PROFILE_DNXHD_220 = "DNxHD220";
var VIDEO_PROFILE_DNXHD_145 = "DNxHD145";
var VIDEO_PROFILE_DNXHD_100 = "DNxHD100";
var VIDEO_PROFILE_MPEG2_I="MPEG2-I";
var VIDEO_PROFILE_MPEG2_XDCAM_HD_50="XDCAM-HD-50";
var VIDEO_PROFILE_MPEG2_XDCAM_HD_35="XDCAM-HD-35";
var VIDEO_PROFILE_MPEG2_XDCAM_HD_25="XDCAM-HD-25";
var VIDEO_PROFILE_MPEG2_XDCAM_17_5= "XDCAM-HD-17.5";
var VIDEO_PROFILE_MPEG2_SD_25="SD-25";
var VIDEO_PROFILE_MPEG2_SD_12="SD-12";

/*video rate control mode*/
var VIDEO_RATE_CONTROL_VBR ="VBR";
var VIDEO_RATE_CONTROL_CBR ="CBR";
var VIDEO_RATE_CONTROL_ABR ="ABR";
var VIDEO_RATE_CONTROL_CQ ="CQ";
var VIDEO_RATE_CONTROL_CRF ="CRF";

var VIDEO_INTERLACE_SOURCE ="-1";
var VIDEO_INTERLACE_FRAME ="0";
var VIDEO_INTERLACE_FIELD ="2";
var VIDEO_INTERLACE_MBAFF = "3";
var VIDEO_INTERLACE_PAFF = "4";

var VIDEO_FOLLOW_SOURCE = "source";
var VIDEO_CUSTOM = "custom";

var MPEG2_LEVEL = "9999";	//It's special level identify the mpeg2 codec

var VIDEO_SCD_DISABLED = "0";
var VIDEO_SCD_ADD_IDR = "1";
var VIDEO_SCD_ADD_I = "2";

var FRAME_RATE_MODE_FIXED = "0";
var FRAME_RATE_MODE_UP_SOURCE = "1";
var FRAME_RATE_MODE_DOWN_SOURCE = "2";

var INTERPOLATE_STRETCH = "0";
var INTERPOLATE_FIXED = "1";
var INTERPOLATE_CHANGE_INFO = "2";

var videoData = new Object();
videoData.license = {};

videoData.codec = [
	{key: VIDEO_CODEC_H264,	value: "H264"},
	{key: VIDEO_CODEC_AVS,	value: "AVS"},
	{key: VIDEO_CODEC_H265,	value: "H265"},
	{key: VIDEO_CODEC_MPEG2, value: "MPEG2"},
	{key: VIDEO_CODEC_MPEG4, value: "MPEG4"},
	{key: VIDEO_CODEC_MPEG1, value: "MPEG1"},
	{key: VIDEO_CODEC_WMV, value: "VC-1"},
	{key: VIDEO_CODEC_H263, value: "H263"},
	{key: VIDEO_CODEC_DV, value: "DV"},
	{key: VIDEO_CODEC_PRORES, value: "ProRes"},
	{key: VIDEO_CODEC_RAW, value: "RAW"},
	{key: VIDEO_CODEC_DNXHD, value: "DNxHD"},
	{key: VIDEO_CODEC_S263, value: "S263"},
	{key: VIDEO_CODEC_PASSTHROUGH, value: str_video.passThrough}
	];

videoData.license.codec = [
	{key: VIDEO_CODEC_H264,	value: license.VIDEO_ENCODER_H264},
	{key: VIDEO_CODEC_AVS,	value: license.VIDEO_ENCODER_AVS},
	{key: VIDEO_CODEC_H265,	value: license.VIDEO_ENCODER_H265},
	{key: VIDEO_CODEC_MPEG2, value: license.VIDEO_ENCODER_MPEG2},
	{key: VIDEO_CODEC_MPEG4, value: license.VIDEO_ENCODER_MPEG4},
	{key: VIDEO_CODEC_MPEG1, value: license.VIDEO_ENCODER_MPEG1},
	{key: VIDEO_CODEC_WMV, value: license.VIDEO_ENCODER_WMV9},
	{key: VIDEO_CODEC_H263, value: license.VIDEO_ENCODER_H263},
	{key: VIDEO_CODEC_DV, value: license.VIDEO_ENCODER_DV},
	{key: VIDEO_CODEC_PRORES, value: license.VIDEO_ENCODER_PRORES},
	{key: VIDEO_CODEC_RAW, value: license.VIDEO_ENCODER_RAW},
	{key: VIDEO_CODEC_DNXHD, value: license.VIDEO_ENCODER_DNXHD},
	{key: VIDEO_CODEC_S263, value: license.VIDEO_ENCODER_S263},
	{key: VIDEO_CODEC_PASSTHROUGH, value: license.VIDEO_ENCODER_PASSTHROUGH}
	];

videoData.profile = [
  	{key: VIDEO_PROFILE_HIGH, value: "High"},
 	{key: VIDEO_PROFILE_MAIN, value: "Main"},
 	{key: VIDEO_PROFILE_BASELINE, value: "Baseline"},
 	{key: VIDEO_PROFILE_AVCIntra50, value: "AVCIntra50"},
 	{key: VIDEO_PROFILE_AVCIntra100, value: "AVCIntra100"},
 	{key: VIDEO_PROFILE_AVCIntra200, value: "AVCIntra200"},
 	{key: VIDEO_PROFILE_SIMPLE, value: "Simple"},
 	{key: VIDEO_PROFILE_HIGH422, value: "High422"},
 	{key: VIDEO_PROFILE_MPEG30, value: "MPEG30"},
 	{key: VIDEO_PROFILE_MPEG40, value: "MPEG40"},
 	{key: VIDEO_PROFILE_MPEG50, value: "MPEG50"},
 	{key: VIDEO_PROFILE_ADVANCED, value: "Advanced"},
 	{key: VIDEO_PROFILE_AUTO, value:  "Auto"},
 	{key: VIDEO_PROFILE_AVS_BASE, value: "Base"},
 	{key: VIDEO_PROFILE_AVS_BROADCASTING, value: "Broadcasting(AVS+)"},
 	{key: VIDEO_PROFILE_H265_MAIN, value:  "Main"},
 	{key: VIDEO_PROFILE_0, value:  "Profile0"},
 	{key: VIDEO_PROFILE_1, value:  "Profile1"},
 	{key: VIDEO_PROFILE_2, value:  "Profile2"},
 	{key: VIDEO_PROFILE_3, value:  "Profile3"},
 	{key: VIDEO_PROFILE_4, value:  "Profile4"},
 	{key: VIDEO_PROFILE_5, value:  "Profile5"},
 	{key: VIDEO_DV25411, value:  "DV25411"},
 	{key: VIDEO_PROFILE_PRORES_PROXY, value:  "Proxy"},
 	{key: VIDEO_PROFILE_PRORES_LT, value:  "LT"},
 	{key: VIDEO_PROFILE_PRORES_STANDARD, value:  "Standard"},
 	{key: VIDEO_PROFILE_PRORES_HQ, value:  "HQ"},
 	{key: VIDEO_PROFILE_RAW, value:  "RAW_Profile"},
	{key: VIDEO_PROFILE_DNXHD_220X, value:  "DNxHD 185x"},
 	{key: VIDEO_PROFILE_DNXHD_220, value:  "DNxHD 185"},
 	{key: VIDEO_PROFILE_DNXHD_145, value:  "DNxHD 120"},
 	{key: VIDEO_PROFILE_DNXHD_100, value:  "DNxHD 85"}
 	];

videoData.license.profile = [
 	{key: VIDEO_PROFILE_HIGH, value: license.ENABLED},
	{key: VIDEO_PROFILE_MAIN, value: license.ENABLED},
	{key: VIDEO_PROFILE_BASELINE, value: license.ENABLED},
	{key: VIDEO_PROFILE_AVCIntra50, value: license.VIDEO_ENCODER_H264_AVCINTRA50},
	{key: VIDEO_PROFILE_AVCIntra100, value: license.VIDEO_ENCODER_H264_AVCINTRA100},
	{key: VIDEO_PROFILE_AVCIntra200, value: license.VIDEO_ENCODER_H264_AVCINTRA200},
	{key: VIDEO_PROFILE_SIMPLE, value: license.ENABLED},
	{key: VIDEO_PROFILE_HIGH422, value: license.VIDEO_ENCODER_MPEG2_HIGH422},
	{key: VIDEO_PROFILE_MPEG30, value: license.VIDEO_ENCODER_MPEG2_MPEG30},
	{key: VIDEO_PROFILE_MPEG40, value: license.VIDEO_ENCODER_MPEG2_MPEG40},
	{key: VIDEO_PROFILE_MPEG50, value: license.VIDEO_ENCODER_MPEG2_MPEG50},
	{key: VIDEO_PROFILE_ADVANCED, value: license.ENABLED},
	{key: VIDEO_PROFILE_AUTO, value:  license.ENABLED},
	{key: VIDEO_PROFILE_AVS_BASE, value: license.ENABLED},
	{key: VIDEO_PROFILE_AVS_BROADCASTING, value: license.VIDEO_ENCODER_AVSP},
	{key: VIDEO_PROFILE_H265_MAIN, value:  license.ENABLED},
	{key: VIDEO_PROFILE_0, value:  license.ENABLED},
	{key: VIDEO_PROFILE_1, value:  license.ENABLED},
	{key: VIDEO_PROFILE_2, value:  license.ENABLED},
	{key: VIDEO_PROFILE_3, value:  license.ENABLED},
	{key: VIDEO_PROFILE_4, value:  license.ENABLED},
	{key: VIDEO_PROFILE_5, value:  license.ENABLED},
	{key: VIDEO_PROFILE_5, value:  license.ENABLED},
 	{key: VIDEO_PROFILE_PRORES_PROXY, value:  license.ENABLED},
 	{key: VIDEO_PROFILE_PRORES_LT, value:  license.ENABLED},
 	{key: VIDEO_PROFILE_PRORES_STANDARD, value:  license.ENABLED},
 	{key: VIDEO_PROFILE_PRORES_HQ, value:  license.ENABLED},
 	{key: VIDEO_PROFILE_RAW, value:  license.ENABLED},
 	{key: VIDEO_PROFILE_DNXHD_220X, value:  license.ENABLED},	
 	{key: VIDEO_PROFILE_DNXHD_220, value:  license.ENABLED},	
 	{key: VIDEO_PROFILE_DNXHD_145, value:  license.ENABLED},	
 	{key: VIDEO_PROFILE_DNXHD_100, value:  license.ENABLED}
	];

videoData.profileMap = [
	{key: VIDEO_CODEC_H264, value: [VIDEO_PROFILE_HIGH, VIDEO_PROFILE_MAIN, VIDEO_PROFILE_BASELINE, VIDEO_PROFILE_AVCIntra50, VIDEO_PROFILE_AVCIntra100, VIDEO_PROFILE_AVCIntra200]},
	{key: VIDEO_CODEC_AVS, value: [VIDEO_PROFILE_AVS_BASE, VIDEO_PROFILE_AVS_BROADCASTING]},
	{key: VIDEO_CODEC_H265, value: [VIDEO_PROFILE_AUTO, VIDEO_PROFILE_H265_MAIN]},
	{key: VIDEO_CODEC_MPEG2, value: [VIDEO_PROFILE_SIMPLE, VIDEO_PROFILE_MAIN, VIDEO_PROFILE_HIGH422, VIDEO_PROFILE_MPEG30, VIDEO_PROFILE_MPEG40, VIDEO_PROFILE_MPEG50]},
	{key: VIDEO_CODEC_MPEG4, value: [VIDEO_PROFILE_SIMPLE]},
	{key: VIDEO_CODEC_MPEG1, value: [VIDEO_PROFILE_SIMPLE, VIDEO_PROFILE_MAIN]},
	{key: VIDEO_CODEC_WMV, value: [VIDEO_PROFILE_ADVANCED]},
	{key: VIDEO_CODEC_H263, value: [VIDEO_PROFILE_0, VIDEO_PROFILE_1, VIDEO_PROFILE_2, VIDEO_PROFILE_3, VIDEO_PROFILE_4, VIDEO_PROFILE_5]},
	{key: VIDEO_CODEC_DV, value: [VIDEO_DV25411]},
	{key: VIDEO_CODEC_PRORES, value: [VIDEO_PROFILE_PRORES_PROXY, VIDEO_PROFILE_PRORES_LT, VIDEO_PROFILE_PRORES_STANDARD, VIDEO_PROFILE_PRORES_HQ]},
	{key: VIDEO_CODEC_RAW, value: [VIDEO_PROFILE_RAW]},
	{key: VIDEO_CODEC_DNXHD, value: [VIDEO_PROFILE_DNXHD_220X, VIDEO_PROFILE_DNXHD_220,VIDEO_PROFILE_DNXHD_145/*,VIDEO_PROFILE_DNXHD_100*/]},
	{key: VIDEO_CODEC_S263, value: [VIDEO_PROFILE_0, VIDEO_PROFILE_1, VIDEO_PROFILE_2, VIDEO_PROFILE_3, VIDEO_PROFILE_4, VIDEO_PROFILE_5]}                                
	];

videoData.rateControl = [
	{key: VIDEO_RATE_CONTROL_VBR, value: "VBR"},
	{key: VIDEO_RATE_CONTROL_CBR, value: "CBR"},
	{key: VIDEO_RATE_CONTROL_ABR, value: "ABR"},
	{key: VIDEO_RATE_CONTROL_CQ, value: "CQ"},
	{key: VIDEO_RATE_CONTROL_CRF, value: "CRF"}
	];

videoData.license.rateControl = [
	{key: VIDEO_RATE_CONTROL_VBR, value: license.ENABLED},
	{key: VIDEO_RATE_CONTROL_CBR, value: license.ENABLED},
	{key: VIDEO_RATE_CONTROL_ABR, value: license.ENABLED},
	{key: VIDEO_RATE_CONTROL_CQ, value: license.VIDEO_ENCODER_CQ},
	{key: VIDEO_RATE_CONTROL_CRF, value: license.VIDEO_ENCODER_CRF}
	];

videoData.rateControlMap = [
	{key: VIDEO_CODEC_H264,	value: [VIDEO_RATE_CONTROL_VBR, VIDEO_RATE_CONTROL_CBR, VIDEO_RATE_CONTROL_ABR, VIDEO_RATE_CONTROL_CQ, VIDEO_RATE_CONTROL_CRF]},
	{key: VIDEO_CODEC_AVS,	value: [VIDEO_RATE_CONTROL_ABR, VIDEO_RATE_CONTROL_CQ, VIDEO_RATE_CONTROL_CRF]},
	{key: VIDEO_CODEC_H265,	value: [VIDEO_RATE_CONTROL_VBR, VIDEO_RATE_CONTROL_CBR, VIDEO_RATE_CONTROL_ABR, VIDEO_RATE_CONTROL_CQ, VIDEO_RATE_CONTROL_CRF]},
	{key: VIDEO_CODEC_MPEG2, value: [VIDEO_RATE_CONTROL_VBR, VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_MPEG4, value: [VIDEO_RATE_CONTROL_ABR, VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_MPEG1, value: [VIDEO_RATE_CONTROL_VBR, VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_WMV, value: [VIDEO_RATE_CONTROL_VBR]},
	{key: VIDEO_CODEC_H263, value: [VIDEO_RATE_CONTROL_ABR]},
	{key: VIDEO_CODEC_DV, value: [VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_PRORES, value: [VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_RAW, value: [VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_DNXHD, value: [VIDEO_RATE_CONTROL_CBR]},
	{key: VIDEO_CODEC_S263, value: [VIDEO_RATE_CONTROL_ABR]}
	];

videoData.aspectRatio = [
	{key: VIDEO_FOLLOW_SOURCE, value: str_output.source},
	{key: VIDEO_CUSTOM, value: str_output.custom},
	{key: "1:1", value: "1:1"},
	{key: "16:9", value: "16:9"},
	{key: "4:3", value: "4:3"},
	{key: "40:33", value: "40:33"},
	{key: "16:11", value: "16:11"},
	{key: "221:100", value: "221:100"}
	];

videoData.aspectRatioMapFraction = [
	{key: VIDEO_FOLLOW_SOURCE, value: [VIDEO_FOLLOW_SOURCE, VIDEO_FOLLOW_SOURCE]},
	{key: VIDEO_CUSTOM, value: ["3", "2"]},
	{key: "1:1", value: ["1", "1"]},
	{key: "16:9", value: ["16", "9"]},
	{key: "4:3", value: ["4", "3"]},
	{key: "40:33", value: ["40", "33"]},
	{key: "16:11", value: ["16", "11"]},
	{key: "221:100", value: ["221", "100"]}
	];

videoData.codecMapAspectRatio = [
	{key: VIDEO_CODEC_H264, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]},
	{key: VIDEO_CODEC_AVS, value: [VIDEO_FOLLOW_SOURCE, "1:1", "16:9", "4:3", "221:100"]},
	{key: VIDEO_CODEC_H265, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]},
	{key: VIDEO_CODEC_MPEG2, value: [VIDEO_FOLLOW_SOURCE, "16:9", "4:3", "221:100"]},
	{key: VIDEO_CODEC_MPEG4, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]},
	{key: VIDEO_CODEC_MPEG1, value: [VIDEO_FOLLOW_SOURCE, "16:9", "4:3", "221:100"]},
	{key: VIDEO_CODEC_WMV, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]},
	{key: VIDEO_CODEC_H263, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]},
	{key: VIDEO_CODEC_DV, value: [ "4:3"]},
	{key: VIDEO_CODEC_PRORES, value: ["16:9"]},
	{key: VIDEO_CODEC_RAW, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]},
	{key: VIDEO_CODEC_DNXHD, value: [ "16:9"]},
	{key: VIDEO_CODEC_S263, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "16:9", "4:3", "40:33", "16:11"]}
	];

videoData.frameRate = [
	{key: VIDEO_FOLLOW_SOURCE, value: str_output.source},
	{key: VIDEO_CUSTOM, value: str_output.custom},
	{key: "10:1", value: "10"},
	{key: "15:1", value: "15"},
	{key: "24000:1001", value: "23.976"},
	{key: "24:1", value: "24"},
	{key: "25:1", value: "25"},
	{key: "30000:1001", value: "29.97"},
	{key: "30:1", value: "30"},
	{key: "50:1", value: "50"},
	{key: "60000:1001", value: "59.94"},
	{key: "60:1", value: "60"}
	];

videoData.frameRateMapFraction = [
	{key: VIDEO_FOLLOW_SOURCE, value: [VIDEO_FOLLOW_SOURCE, VIDEO_FOLLOW_SOURCE]},
	{key: VIDEO_CUSTOM, value: ["40", "1"]},
	{key: "10000", value: ["10", "1"]},
	{key: "15000", value: ["15", "1"]},
	{key: "23976", value: ["24000", "1001"]},
	{key: "24000", value: ["24", "1"]},
	{key: "25000", value: ["25", "1"]},
	{key: "29970", value: ["30000", "1001"]},
	{key: "30000", value: ["30", "1"]},
	{key: "50000", value: ["50", "1"]},
	{key: "59940", value: ["60000", "1001"]},
	{key: "60000", value: ["60", "1"]}
	];

videoData.codecMapFrameRate = [
	{key: VIDEO_CODEC_H264, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_AVS, value: [VIDEO_FOLLOW_SOURCE, "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_H265, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_MPEG2, value: [VIDEO_FOLLOW_SOURCE, "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_MPEG4, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_MPEG1, value: [VIDEO_FOLLOW_SOURCE, "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_WMV, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_H263, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_DV, value: [VIDEO_CUSTOM, "25:1"]},
	{key: VIDEO_CODEC_PRORES, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_RAW, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]},
	{key: VIDEO_CODEC_DNXHD, value: [VIDEO_FOLLOW_SOURCE, "24:1", "25:1", "30:1", "50:1", "60:1"]},
	{key: VIDEO_CODEC_S263, value: [VIDEO_FOLLOW_SOURCE, VIDEO_CUSTOM, "10:1", "15:1", "24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"]}
	];

videoData.frame_rate_h265_device = ["24000:1001", "24:1", "25:1", "30000:1001", "30:1", "50:1", "60000:1001", "60:1"];

videoData.level = [
	{key: "-1",	value: "AUTO"},
	{key: "0",	value: "L0"},
	{key: "1",	value: "L1"},
	{key: "2",	value: "L2"},
	{key: "3",	value: "L3"},
	{key: "4",	value: "L4"},
	{key: "10",	value: "1.0"},
	{key: "11",	value: "1.1"},
	{key: "12",	value: "1.2"},
	{key: "13",	value: "1.3"},
	{key: "20",	value: "2.0"},
	{key: "21",	value: "2.1"},
	{key: "22",	value: "2.2"},
	{key: "30",	value: "3.0"},
	{key: "31",	value: "3.1"},
	{key: "32",	value: "3.2"},
	{key: "40",	value: "4.0"},
	{key: "41",	value: "4.1"},
	{key: "42",	value: "4.2"},
	{key: "50",	value: "5.0"},
	{key: "51",	value: "5.1"},
	{key: "60",	value: "6.0"},
	{key: "61",	value: "6.1"},
	{key: "62",	value: "6.2"},
	{key: MPEG2_LEVEL,	value: "mpeg2_level"}
	];

videoData.avsLevel = [
	{key: "101",	value: "2.0.0.08.30"},
	{key: "110",	value: "2.1.0.08.15"},
	{key: "111",	value: "2.1.0.08.30"},
	{key: "201",	value: "4.0.0.08.30"},
	{key: "221",	value: "4.2.0.08.30"},
	{key: "222",	value: "4.0.2.08.60"},
	{key: "302",	value: "6.0.0.08.60"},
	{key: "312",	value: "6.0.1.08.60"},
	{key: "322",	value: "6.2.0.08.60"},
	{key: "332",	value: "6.0.3.08.60"},
	{key: "352",	value: "6.0.5.08.60"}
	];

videoData.h263Level = [
   	{key: "-1",	value: "AUTO"},
   	{key: "10",	value: "10"},
   	{key: "20",	value: "20"},
   	{key: "30",	value: "30"},
   	{key: "40",	value: "40"},
   	{key: "45",	value: "45"},
   	{key: "50",	value: "50"},
   	{key: "60",	value: "60"},
   	{key: "70",	value: "70"}
   	];

videoData.levelMap = [
   	{key: VIDEO_CODEC_H264, value: ["-1", "10", "11", "12", "13", "20", "21", "22", "30", "31", "32", "40", "41", "42", "50", "51"]},
   	{key: VIDEO_CODEC_AVS, value: ["101", "110", "111", "201", "221", "222", "302", "312", "322", "332", "352"]},
   	{key: VIDEO_CODEC_H265, value: ["-1", "10", "20", "21", "30", "31", "40", "41", "50", "51", "60", "61", "62"]},
   	{key: VIDEO_CODEC_MPEG2, value: ["9999"]},
   	{key: VIDEO_CODEC_H263, value: ["-1", "10", "20", "30", "40", "45", "50", "60", "70"]},
   	{key: VIDEO_CODEC_DV, value: ["-1"]},
   	{key: VIDEO_CODEC_PRORES, value: ["-1"]},
   	{key: VIDEO_CODEC_RAW, value: ["-1"]},
   	{key: VIDEO_CODEC_DNXHD, value: ["-1"]},
   	{key: VIDEO_CODEC_WMV, value: ["-1", "0", "1", "2", "3", "4"]}
   	];

videoData.interlace = [
	{key: VIDEO_INTERLACE_SOURCE, value: str_output.source},
	{key: VIDEO_INTERLACE_FRAME, value: str_output.frame},
	{key: VIDEO_INTERLACE_FIELD, value: str_output.field_auto},
	{key: VIDEO_INTERLACE_MBAFF, value: "MBAFF"},
	{key: VIDEO_INTERLACE_PAFF, value: "PAFF"}
	];

videoData.license.interlace = [
	{key: VIDEO_INTERLACE_SOURCE, value: license.ENABLED},
	{key: VIDEO_INTERLACE_FRAME, value: license.ENABLED},
	{key: VIDEO_INTERLACE_FIELD, value: license.ENABLED},
	{key: VIDEO_INTERLACE_MBAFF, value: license.VIDEO_ENCODER_INTERLACE_MBAFF},
	{key: VIDEO_INTERLACE_PAFF, value: license.VIDEO_ENCODER_INTERLACE_PAFF}
	];

videoData.interlaceMap = [
	//high
	{key: [VIDEO_PROFILE_HIGH, "10"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "11"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "12"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "13"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "20"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "42"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "50"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_HIGH, "51"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	//main
	{key: [VIDEO_PROFILE_MAIN, "10"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "11"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "12"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "13"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "20"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "42"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "50"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_MAIN, "51"], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME]},
	//baseline
	{key: [VIDEO_PROFILE_BASELINE, "-1"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "10"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "11"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "12"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "13"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "20"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "21"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "22"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "30"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "31"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "32"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "40"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "41"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "42"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "50"], value: [ VIDEO_INTERLACE_FRAME]},
	{key: [VIDEO_PROFILE_BASELINE, "51"], value: [ VIDEO_INTERLACE_FRAME]},
	//mpeg2 main
	//{key: [VIDEO_PROFILE_MAIN, MPEG2_LEVEL], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	//mpeg2 simple
	//{key: [VIDEO_PROFILE_SIMPLE, MPEG2_LEVEL], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	//mpeg2 high422
	//{key: [VIDEO_PROFILE_HIGH422, MPEG2_LEVEL], value: [VIDEO_INTERLACE_SOURCE, VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	//avs base
	{key: [VIDEO_PROFILE_AVS_BASE, "101"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "110"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "111"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "201"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "221"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "222"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "302"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "312"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "322"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "332"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BASE, "352"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	//avs broadcast
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "101"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "110"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "111"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "201"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "221"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "222"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "302"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "312"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "322"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "332"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_AVS_BROADCASTING, "352"], value: [ VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	//ProRes 
	{key: [VIDEO_PROFILE_PRORES_PROXY, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_PRORES_LT, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_PRORES_STANDARD, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_PRORES_HQ, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	//RAW
	{key: [VIDEO_PROFILE_RAW, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]}
	];

videoData.dnxhd = {};
videoData.dnxhd.interlaceMap = [
	//DNxHD
	{key: [VIDEO_PROFILE_DNXHD_220X, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_DNXHD_220, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_DNXHD_145, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]},
	{key: [VIDEO_PROFILE_DNXHD_100, "-1"], value: [VIDEO_INTERLACE_FRAME, VIDEO_INTERLACE_FIELD]}
];

videoData.maxCUSize = [
	{key: "64", value: "64x64"},
	{key: "32", value: "32x32"},
	{key: "16", value: "16x16"}
	];

videoData.maxCUDepth = [
	{key: "4", value: "4"},
	{key: "3", value: "3"},
	{key: "2", value: "2"},
	{key: "1", value: "1"}
	];

videoData.maxCUDepthMap = [
	{key: "64", value: ["1", "2", "3", "4"]},
	{key: "32", value: ["1", "2", "3"]},
	{key: "16", value: ["1", "2"]}
	];

videoData.maxTUSize = [
	{key: "32", value: "32x32"},
	{key: "16", value: "16x16"},
	{key: "8", value: "8x8"},
	{key: "4", value: "4x4"}
	];

videoData.maxTUSizeMap = [
	//MaxTUSize, [MaxTUSize]
	{key: "64", value: ["32", "16", "8", "4"]},
	{key: "32", value: ["32", "16", "8", "4"]},
	{key: "16", value: ["16", "8", "4"]}
	];

videoData.minTUSize = [
   	{key: "32", value: "32x32"},
   	{key: "16", value: "16x16"},
   	{key: "8", value: "8x8"},
   	{key: "4", value: "4x4"}
   	];

videoData.minTUSizeMap = [
	//MaxTUSize, [MinTUSize]
	{key: "32", value: ["32", "16", "8", "4"]},
	{key: "16", value: ["16", "8", "4"]},
	{key: "8", value: ["8", "4"]},
	{key: "4", value: ["4"]}
	];

videoData.maxInterTUDepth = [
	{key: "4", value: "4"},
	{key: "3", value: "3"},
	{key: "2", value: "2"},
	{key: "1", value: "1"}
	];

videoData.maxInterTUDepthMap = [
	//key: ["maxTU", "minTU"], value:["maxInterTUDepth"...]
	{key: ["32", "32"], value:["1"]},
	{key: ["32", "16"], value:["1"]},
	{key: ["32", "8"], value:["2", "1"]},
	{key: ["32", "4"], value:["3", "2", "1"]},
	{key: ["16", "16"], value:["1"]},
	{key: ["16", "8"], value:["1"]},
	{key: ["16", "4"], value:["2", "1"]},
	{key: ["8", "8"], value:["1"]},
	{key: ["8", "4"], value:["1"]},
	{key: ["4", "4"], value:["1"]}
	];

videoData.maxIntraTUDepth = [
	{key: "4", value: "4"},
	{key: "3", value: "3"},
	{key: "2", value: "2"},
	{key: "1", value: "1"}
	];

videoData.maxIntraTUDepthMap = [
	//key: ["maxTU", "minTU"], value:["maxIntraTUDepth"...]
	{key: ["32", "32"], value:["1"]},
	{key: ["32", "16"], value:["1"]},
	{key: ["32", "8"], value:["2", "1"]},
	{key: ["32", "4"], value:["3", "2", "1"]},
	{key: ["16", "16"], value:["1"]},
	{key: ["16", "8"], value:["1"]},
	{key: ["16", "4"], value:["2", "1"]},
	{key: ["8", "8"], value:["1"]},
	{key: ["8", "4"], value:["1"]},
	{key: ["4", "4"], value:["1"]}
	];

videoData.smartBorder = [
	{key: "1", value: str_output.smart_border},
	{key: "2", value: str_output.smart_clipping},
	{key: "0", value: str_output.linear_stretch},
	{key: "3", value: str_output.fit_width},
	{key: "4", value: str_output.fit_height}
	];

videoData.license.smartBorder = [
 	{key: "1", value: license.ENABLED},
 	{key: "2", value: license.ENABLED},
 	{key: "0", value: license.ENABLED},
 	{key: "3", value: license.VIDEO_ENCODER_BORDER_FIT_WIDTH},
 	{key: "4", value: license.VIDEO_ENCODER_BORDER_FIT_HEIGHT}
 	];

videoData.topFiestFirst = [
	{key: "-1", value: str_output.source},
	{key: "0", value: str_video.bottom_field_first},
	{key: "1", value: str_video.top_field_first}
	];

videoData.gopModeId = [
	{key: "1", value: "Closed GOP"},
	{key: "0", value: "Open GOP"}
	];

videoData.resolution = [
	{key: VIDEO_FOLLOW_SOURCE, value: str_output.source},
	{key: VIDEO_CUSTOM, value: str_output.custom},
	{key: "4096x2160", value: "4096x2160"},
	{key: "3840x2160", value: "3840x2160"},
	{key: "2560x1440", value: "2560x1440"},
	{key: "1920x1080", value: "1920x1080"},
	{key: "1440x1080", value: "1440x1080"},
	{key: "1280x720", value: "1280x720"},
	{key: "1024x576", value: "1024x576"},
	{key: "960x540", value: "960x540"},
	{key: "800x480", value: "800x480"},
	{key: "720x576", value: "720x576"},
	{key: "720x480", value: "720x480"},
	{key: "640x480", value: "640x480"},
	{key: "640x360", value: "640x360"},
	{key: "480x360", value: "480x360"},
	{key: "480x320", value: "480x320"},
	{key: "320x240", value: "320x240"}
	];

videoData.resolution_mal = [
	{key: VIDEO_FOLLOW_SOURCE, value: str_output.source},
	{key: VIDEO_CUSTOM, value: str_output.custom},
	{key: "1920x1080", value: "1920x1080"},
	{key: "1440x1080", value: "1440x1080"},
	{key: "1280x720", value: "1280x720"},
	{key: "1024x576", value: "1024x576"},
	{key: "960x540", value: "960x540"},
	{key: "800x480", value: "800x480"},
	{key: "720x576", value: "720x576"},
	{key: "720x480", value: "720x480"},
	{key: "640x480", value: "640x480"},
	{key: "640x360", value: "640x360"},
	{key: "480x360", value: "480x360"},
	{key: "480x320", value: "480x320"},
	{key: "320x240", value: "320x240"}
	];

videoData.resolution_h265_device = [
	{key: "4096x2160", value: "4096x2160"},
	{key: "3840x2160", value: "3840x2160"},
	{key: "1920x1080", value: "1920x1080"},
	{key: "1280x720", value: "1280x720"},
	{key: "720x576", value: "720x576"},
	{key: "720x480", value: "720x480"}
	];

videoData.scd = [
	{key: VIDEO_SCD_DISABLED, value: str_video.scd_disabled},
	{key: VIDEO_SCD_ADD_IDR, value: str_video.scd_add_idr},
	{key: VIDEO_SCD_ADD_I, value: str_video.scd_add_i}
	];

videoData.h265_scd = [
 	{key: VIDEO_SCD_DISABLED, value: str_video.scd_disabled},
 	//{key: VIDEO_SCD_ADD_IDR, value: str_video.scd_add_idr},
 	{key: VIDEO_SCD_ADD_I, value: str_video.scd_add_i}
 	];

videoData.frameRateMode = [
	{key: FRAME_RATE_MODE_FIXED, value: str_video.frame_rate_mode_fixed},
	{key: FRAME_RATE_MODE_UP_SOURCE, value: str_video.frame_rate_mode_up_source},
	{key: FRAME_RATE_MODE_DOWN_SOURCE, value: str_video.frame_rate_mode_down_source}
];

videoData.interpolate = [
	{key: INTERPOLATE_STRETCH, value: str_video.interpolate_0},
	{key: INTERPOLATE_FIXED, value: str_video.interpolate_1},
	{key: INTERPOLATE_CHANGE_INFO, value: str_video.interpolate_2}
	];


videoData.codecRuntimeSupport = [
	{key: VIDEO_CODEC_H264, value: true},
	{key: VIDEO_CODEC_AVS, value: false},
	{key: VIDEO_CODEC_H265, value: false},
	{key: VIDEO_CODEC_MPEG2, value: false},
	{key: VIDEO_CODEC_MPEG4, value: true},
	{key: VIDEO_CODEC_MPEG1, value: false},
	{key: VIDEO_CODEC_WMV, value: false},
	{key: VIDEO_CODEC_H263, value: false},
	{key: VIDEO_CODEC_DV, value: false},
	{key: VIDEO_CODEC_S263, value: false},
	{key: VIDEO_CODEC_PRORES, value: false},
	{key: VIDEO_CODEC_RAW, value: false},
	{key: VIDEO_CODEC_DNXHD, value: false}
	];

videoData.bitDepth = [
	{key: "8", value: "8"},
	{key: "10", value: "10"}
	];

videoData.wppThreadCount = [
	{key: "-1", value: str_common.auto},
	{key: "0", value: str_common.close},
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

/*
 * key: quality level
 * value: max CU size
 * */
videoData.defaultMaxCU = [
	{key: "-1", value: "64"},
	{key: "0", value: "32"},
	{key: "1", value: "32"},
	{key: "2", value: "64"},
	{key: "3", value: "64"},
	{key: "4", value: "64"},	
	{key: "6", value: "64"},
	{key: "7", value: "64"},
	{key: "255", value: "64"}
];

/*
 * key: quality level
 * value: CU depth
 * */
videoData.defaultCUDepth = [
	{key: "-1", value: "4"},
	{key: "0", value: "2"},
	{key: "1", value: "3"},
	{key: "2", value: "3"},
	{key: "3", value: "4"},
	{key: "4", value: "4"},	
	{key: "6", value: "4"},
	{key: "7", value: "4"},
	{key: "255", value: "4"}
];

/*
 * key: quality level
 * value: min TU size
 * */
videoData.defaultMinTU = [
	{key: "-1", value: "4"},
	{key: "0", value: "8"},
	{key: "1", value: "8"},
	{key: "2", value: "4"},
	{key: "3", value: "4"},
	{key: "4", value: "4"},	
	{key: "6", value: "4"},
	{key: "7", value: "4"},
	{key: "255", value: "4"}
];

/*
 * key: quality level
 * value: max intra TU depth
 * */
videoData.defaultMaxIntraTUDepth = [
	{key: "-1", value: "1"},
	{key: "0", value: "1"},
	{key: "1", value: "1"},
	{key: "2", value: "1"},
	{key: "3", value: "1"},
	{key: "4", value: "1"},	
	{key: "6", value: "1"},
	{key: "7", value: "2"},
	{key: "255", value: "1"}
];

/*
 * key: quality level
 * value: max inter TU depth
 * */
videoData.defaultMaxInterTUDepth = [
	{key: "-1", value: "1"},
	{key: "0", value: "1"},
	{key: "1", value: "1"},
	{key: "2", value: "1"},
	{key: "3", value: "1"},
	{key: "4", value: "1"},	
	{key: "6", value: "1"},
	{key: "7", value: "2"},
	{key: "255", value: "1"}
];

/*
 * key: quality level
 * value: SAO
 * */
videoData.defaultSao = [
	{key: "-1", value: true},
	{key: "0", value: false},
	{key: "1", value: false},
	{key: "2", value: false},
	{key: "3", value: false},
	{key: "4", value: true},
	{key: "6", value: true},
	{key: "7", value: true},
	{key: "255", value: true}
];

/*
 * key: quality level
 * value: AMP
 * */
videoData.defaultAmp = [
	{key: "-1", value: true},
	{key: "0", value: false},
	{key: "1", value: false},
	{key: "2", value: false},
	{key: "3", value: false},
	{key: "4", value: true},
	{key: "6", value: true},
	{key: "7", value: true},
	{key: "255", value: true}
];

/*
 * key: quality level
 * value: LookHeadFrame
 * */
videoData.h265DefaultLookHeadFrame = [
	//key: qualitylevel, value: [value, disabled]
	{key: "-1", value: ["", true]},
	{key: "0", value: ["5", false]},
	{key: "1", value: ["10", false]},
	{key: "2", value: ["20", false]},
	{key: "3", value: ["20", false]},
	{key: "4", value: ["30", false]},
	{key: "6", value: ["30", false]},
	{key: "7", value: ["30", false]},
	{key: "255", value: ["30", false]}
];

videoData.h265DefaultThreadCount = [
	//key: qualitylevel, value: [value, disabled]
	{key: "-1", value: ["", true]},
	{key: "0", value: ["5", false]},
	{key: "2", value: ["5", false]},
	{key: "4", value: ["5", false]},
	{key: "6", value: ["5", false]},
	{key: "7", value: ["5", false]},
	{key: "255", value: ["5", false]}
	];

videoData.gopType = [
	{key: "0", value: str_video.gop_type_frame},
	{key: "1", value: str_video.gop_type_ms}
];

videoData.h264DefaultTwoPass = [
	{key: "-1", value: false},
	{key: "0", value: false},
	{key: "2", value: false},
	{key: "4", value: true}
	];

videoData.h264LiveSceneDetection = [
	//key: qualitylevel, value: [value, disabled]
	{key: "-1", value: [VIDEO_SCD_DISABLED, true]},
	{key: "0", value: [VIDEO_SCD_DISABLED, false]},
	{key: "2", value: [VIDEO_SCD_DISABLED, false]},
	{key: "4", value: [VIDEO_SCD_DISABLED, false]},
	{key: "6", value: [VIDEO_SCD_ADD_I, false]},
	{key: "7", value: [VIDEO_SCD_ADD_I, false]},
	{key: "255", value: [VIDEO_SCD_ADD_I, false]}
	];

videoData.h264CloudSceneDetection = [
   	//key: qualitylevel, value: [value, disabled]
   	{key: "-1", value: [VIDEO_SCD_DISABLED, true]},
   	{key: "0", value: [VIDEO_SCD_ADD_I, false]},
   	{key: "2", value: [VIDEO_SCD_ADD_I, false]},
   	{key: "4", value: [VIDEO_SCD_ADD_I, false]},
   	{key: "6", value: [VIDEO_SCD_ADD_I, false]},
   	{key: "7", value: [VIDEO_SCD_ADD_I, false]},
   	{key: "255", value: [VIDEO_SCD_ADD_I, false]}
   	];

videoData.h264DefaultProfile = [
	{key: "-1", value: VIDEO_PROFILE_HIGH},
	{key: "0", value: VIDEO_PROFILE_MAIN},
	{key: "2", value: VIDEO_PROFILE_HIGH},
	{key: "4", value: VIDEO_PROFILE_HIGH}
	];

videoData.h264DefaultThreadCount = [
	//key: qualitylevel, value: [value, disabled]
  	{key: "-1", value: ["", true]},
  	{key: "0", value: ["5", false]},
  	{key: "2", value: ["5", false]},
  	{key: "4", value: ["5", false]}
  	];

videoData.h264DefaultLookHeadFrame = [
	{key: "-1", value: ["", true]},
	{key: "0", value: ["20", false]},
	{key: "2", value: ["20", false]},
	{key: "4", value: ["20", false]}
	];

videoData.bFrame_h265_device = [
	{key: "0", value: "0"},
	{key: "1", value: "1"},
	{key: "3", value: "3"}
	];

videoData.gop_h265_device = [
	{key: "0", value: ["1", "24", "25", "30", "32", "60", "64", "100", "128"]},
	{key: "1", value: ["24", "30", "32", "60", "64", "100", "128"]},
	{key: "3", value: ["24", "32", "60", "64", "100", "128"]}
	];

/*license control*/
videoData.codec = uLicenseFilterKey(videoData.codec, videoData.license.codec);
videoData.profile = uLicenseFilterKey(videoData.profile, videoData.license.profile);
videoData.interlace = uLicenseFilterKey(videoData.interlace, videoData.license.interlace);
videoData.rateControl = uLicenseFilterKey(videoData.rateControl, videoData.license.rateControl);
videoData.smartBorder = uLicenseFilterKey(videoData.smartBorder, videoData.license.smartBorder);

videoData.getCodec = function() {
	return videoData.codec;
};

videoData.getAspectRatioByCodec = function(codec) {
	var arr = uGetMapValue(videoData.codecMapAspectRatio, codec);
	var len = videoData.aspectRatio.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.aspectRatio[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.aspectRatio[i];
		}
	}
	return ret;
};

videoData.getFractionByAspectRatio = function(aspectRatio) {
	var arr = uGetMapValue(videoData.aspectRatioMapFraction, aspectRatio);
	return arr;
};

videoData.getFrameRateByCodec = function(codec, device) {
	var arr = uGetMapValue(videoData.codecMapFrameRate, codec);
	
	//special code for h265 device encode
	if(codec == VIDEO_CODEC_H265) {
		if(device == "1") {
			arr = videoData.frame_rate_h265_device;
		}
	}
	
	var len = videoData.frameRate.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.frameRate[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.frameRate[i];
		}
	}
	return ret;
};

videoData.getFractionByFrameRate = function(frameRate) {
	var arr = uGetMapValue(videoData.frameRateMapFraction, frameRate);
	return arr;
};

videoData.getLevelArray = function(codec) {
	var arr = uGetMapValue(videoData.levelMap, codec);
	var levelArr = null;
	if(codec == VIDEO_CODEC_AVS) {
		levelArr = videoData.avsLevel;
	} else if(codec == VIDEO_CODEC_H263) {
		levelArr = videoData.h263Level;
	} else {
		levelArr = videoData.level;
	}
	var len = levelArr.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = levelArr[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = levelArr[i];
		}
	}
	return ret;
};

videoData.getInterlace = function(codec, profile, level) {
	var interlaceMap = null;
	if(codec == VIDEO_CODEC_DNXHD) {
		interlaceMap = videoData.dnxhd.interlaceMap;
	}
	else {
		interlaceMap = videoData.interlaceMap;
	}
	
	var searchArr = [profile, level];
	var arr = uGetMapValue(interlaceMap, searchArr);
	var ret = null;
	if(arr == null) {
		ret = videoData.interlace;
	} else {
		ret = [];
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < videoData.interlace.length; j++) {
				if(videoData.interlace[j].key == arr[i]) {
					ret[ret.length] = videoData.interlace[j];
				}
			}
		};
	}
	return ret;
};

videoData.getRateControlArray = function(codec) {
	var arr = uGetMapValue(videoData.rateControlMap, codec);
	var len = videoData.rateControl.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.rateControl[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.rateControl[i];
		}
	}
	return ret;
};

videoData.getProfileArray = function(codec) {
	var arr = uGetMapValue(videoData.profileMap, codec);
	var len = videoData.profile.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.profile[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.profile[i];
		}
	}
	return ret;
};

videoData.getMaxCUSize = function() {
	return videoData.maxCUSize;
};

videoData.getMaxCUDepth = function(cu) {
	var arr = uGetMapValue(videoData.maxCUDepthMap, cu);
	var len = videoData.maxCUDepth.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.maxCUDepth[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.maxCUDepth[i];
		}
	}
	return ret;
};

videoData.getMaxTUSize = function(cu) {
	var arr = uGetMapValue(videoData.maxTUSizeMap, cu);
	var len = videoData.maxTUSize.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.maxTUSize[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.maxTUSize[i];
		}
	}
	return ret;
};

videoData.getMinTUSize = function(maxTu) {
	var arr = uGetMapValue(videoData.minTUSizeMap, maxTu);
	var len = videoData.minTUSize.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = videoData.minTUSize[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = videoData.minTUSize[i];
		}
	}
	return ret;
};

videoData.getMaxInterTUDepth = function(maxTU, minTU) {
	var searchArr = [maxTU, minTU];
	var arr = uGetMapValue(videoData.maxInterTUDepthMap, searchArr);
	var ret = undefined;
	if(arr == undefined) {
		ret = videoData.maxInterTUDepth;
	} else {
		ret = [];
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < videoData.maxInterTUDepth.length; j++) {
				if(videoData.maxInterTUDepth[j].key == arr[i]) {
					ret[ret.length] = videoData.maxInterTUDepth[j];
				}
			}
		};
	}
	return ret;
};

videoData.getMaxIntraTUDepth = function(maxTU, minTU) {
	var searchArr = [maxTU, minTU];
	var arr = uGetMapValue(videoData.maxIntraTUDepthMap, searchArr);
	var ret = undefined;
	if(arr == undefined) {
		ret = videoData.maxIntraTUDepth;
	} else {
		ret = [];
		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < videoData.maxIntraTUDepth.length; j++) {
				if(videoData.maxIntraTUDepth[j].key == arr[i]) {
					ret[ret.length] = videoData.maxIntraTUDepth[j];
				}
			}
		};
	}
	return ret;
};

videoData.getSmartBorder = function() {
	return videoData.smartBorder;
};

videoData.getTopFieldFirst = function() {
	return videoData.topFiestFirst;
};

videoData.getGopModeId = function() {
	return videoData.gopModeId;
};

videoData.getResolution = function() {
	var arr =  videoData.resolution.slice(2);
	return arr;
};

videoData.getResolutionByCodec = function(codec, device) {
	var resolution = videoData.resolution;
	
	if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
		resolution = videoData.resolution_mal;
	}
	
	if(codec == VIDEO_CODEC_H265) {
		if(device == "1") {
			resolution = videoData.resolution_h265_device;
		}
	}
	
	return resolution;
};

videoData.getWHByResolution = function(resolution) {
	var wh = [];
	if(resolution == VIDEO_FOLLOW_SOURCE) {
		wh[0] = "";
		wh[1] = "";
	}
	else if(resolution == VIDEO_CUSTOM) {
		wh[0] = "1440";
		wh[1] = "960";
	}
	else {
		wh = resolution.split("x");
	}
	return wh;
};

videoData.getScd = function(codec) {
	if(codec == VIDEO_CODEC_H265) {
		return videoData.h265_scd;
	}
	else {
		return videoData.scd;
	}
};

videoData.getFrameRateMode = function() {
	return videoData.frameRateMode;
};

videoData.getInterpolate = function() {
	return videoData.interpolate;
};

videoData.getCodecRuntimeSupport = function(codec) {
	var support = uGetMapValue(videoData.codecRuntimeSupport, codec);
	return support;
}

videoData.getCodecExpandInfo = function(codec) {
	var o = {expand: true, disabled: false};
	if(g_taskSupport != null) {
		var taskAction = g_taskSupport.getActionType();
		if(taskAction == "runtime") {
			var support = uGetMapValue(videoData.codecRuntimeSupport, codec);
			if(!support) {
				o.expand = false;
				o.disabled = true;
			}
		}
	}
	
	return o;
}

videoData.getBitDepth = function(){
	return videoData.bitDepth;
}

videoData.getWppThreadCount = function() {
	return videoData.wppThreadCount;
}

videoData.getDefaultMaxCU = function(qualityLevel) {
	return uGetMapValue(videoData.defaultMaxCU, qualityLevel);
}

videoData.getDefaultCUDepth = function(qualityLevel) {
	return uGetMapValue(videoData.defaultCUDepth, qualityLevel);
}

videoData.getDefaultMaxTU = function(qualityLevel) {
	return "32";
}

videoData.getDefaultMinTU = function(qualityLevel) {
	return uGetMapValue(videoData.defaultMinTU, qualityLevel);
}

videoData.getDefaultSao = function(qualityLevel) {
	return uGetMapValue(videoData.defaultSao, qualityLevel);
}

videoData.getDefaultAmp = function(qualityLevel) {
	return uGetMapValue(videoData.defaultAmp, qualityLevel);
}

videoData.getH265DefaultLookHeadFrame = function(qualityLevel) {
	return uGetMapValue(videoData.h265DefaultLookHeadFrame, qualityLevel);
}

videoData.getH265DefaultThreadCount = function(qualityLevel) {
	return uGetMapValue(videoData.h265DefaultThreadCount, qualityLevel);
}

videoData.getH265DefaultMaxIntraTUDepth = function(qualityLevel) {
	return uGetMapValue(videoData.defaultMaxIntraTUDepth, qualityLevel);
}

videoData.getH265DefaultMaxInterTUDepth = function(qualityLevel) {
	return uGetMapValue(videoData.defaultMaxInterTUDepth, qualityLevel);
}

videoData.getGopType = function() {
	return videoData.gopType;
}

videoData.getH264DefaultTwoPass = function(qualityLevel) {
	return uGetMapValue(videoData.h264DefaultTwoPass, qualityLevel);
}

videoData.getH264DefaultSceneDetection = function(qualityLevel) {
	if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_LIVE
			|| GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
		return uGetMapValue(videoData.h264LiveSceneDetection, qualityLevel);
	}
	else {
		return uGetMapValue(videoData.h264CloudSceneDetection, qualityLevel);
	}
}

videoData.getH264DefaultProfile = function(qualityLevel) {
	return uGetMapValue(videoData.h264DefaultProfile, qualityLevel);
}

videoData.getH264DefaultThreadCount = function(qualityLevel) {
	return uGetMapValue(videoData.h264DefaultThreadCount, qualityLevel);
}

videoData.getH264DefaultLookHeadFrame = function(qualityLevel) {
	return uGetMapValue(videoData.h264DefaultLookHeadFrame, qualityLevel);
}

videoData.getBFrameByCodec = function(codec, device) {
	if(codec == VIDEO_CODEC_H265) {
		if(device == "1") {
			return videoData.bFrame_h265_device;
		}
	}
	return null;
}

videoData.getGopSizeByCodec = function(codec, device, bFrame) {
	var arr = null;
	if(codec == VIDEO_CODEC_H265) {
		if(device == "1") {
			arr = videoData.gop_h265_device;
		}
	}
	
	var ret = null;
	if(arr != null) {
		var gopArr = uGetMapValue(arr, bFrame);
		ret = [];
		for(var i = 0; i < gopArr.length; i++) {
			var o = {};
			o.key = gopArr[i];
			o.value = gopArr[i];
			ret.push(o);
		}
	}
	
	return ret;
}