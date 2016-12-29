var JS_VIDEO_CODEC			="select[name='VideoCodec']";
var JS_VIDEO_WIDTH			="input[name='VideoWidth']";
var JS_VIDEO_HEIGHT			="input[name='VideoHeight']";
var JS_VIDEO_PAR			="input[name='VideoPAR']";
var JS_VIDEO_PAR_X			="input[name='VideoPARX']";
var JS_VIDEO_PAR_Y			="input[name='VideoPARY']";
var JS_VIDEO_PAR_DISP		="input[name='VideoPARDisp']";
var JS_VIDEO_FRAMERATE		="input[name='VideoFrameRate']";
var JS_VIDEO_FRAMERATE_X	="input[name='VideoFrameRateX']";
var JS_VIDEO_FRAMERATE_Y	="input[name='VideoFrameRateY']";
var JS_VIDEO_FRAMERATE_DISP ="input[name='VideoFrameRateDisp']";
var JS_VIDEO_RATE_CONTROL	="select[name='VideoRateControl']";
var JS_VIDEO_BITRATE		="input[name='VideoBitrate']";
var JS_VIDEO_MAX_BITRATE	="input[name='VideoMaxBitrate']";
var JS_VIDEO_QUANTIZER		="input[name='VideoQuantizer']";
var JS_VIDEO_BUFFER_SIZE	="input[name='VideoBufferSize']";
var JS_VIDEO_BUFFER_FILL	="input[name='VideoBufferFill']";
var JS_VIDEO_GOP_SIZE		="input[name='VideoGopSize']";
var JS_VIDEO_GOP_TYPE		="select[name='VideoGopType']";
var JS_VIDEO_SCD		="select[name='VideoSCD']";
var JS_VIDEO_FRAME_RATE_MODE		="select[name='VideoFrameRateMode']";
var JS_VIDEO_B_FRAME		="input[name='VideoBFrame']";
var JS_VIDEO_CABAC			="input[name='VideoCABAC']";
var JS_VIDEO_TRANSFORM			="input[name='VideoTransform']";
var JS_VIDEO_INTRA_PREDICTION	="input[name='VideoIntraPrediction']";
var JS_VIDEO_REFERENCE_FRAME	="input[name='VideoReferenceFrame']";
var JS_VIDEO_CODEC_PROFILE	="select[name='VideoCodecProfile']";
var JS_VIDEO_INTERLACE		="select[name='VideoInterlace']";
var JS_VIDEO_TOP_FIELD_FIRST		="select[name='VideoTopFieldFirst']";
var JS_FRAMERATE_CONVERSION_MODE	="input[name='FrameRateConversionMode']";
var JS_VIDEO_INTERPOLATE ="select[name='VideoInterpolate']";
var JS_FILL_ON_VIDEO_LOST	="input[name='FillOnVideoLost']";
var JS_VIDEO_CODEC_LEVEL	="select[name='VideoCodecLevel']";
var JS_VIDEO_MAX_CU_SIZE	="select[name='VideoMaxCUSize']";
var JS_VIDEO_MAX_CU_DEPTH	="select[name='VideoMaxCUDepth']";
var JS_VIDEO_MAX_TU_SIZE	="select[name='VideoMaxTUSize']";
var JS_VIDEO_MIN_TU_SIZE	="select[name='VideoMinTUSize']";
var JS_VIDEO_MAX_INTER_TU_DEPTH	="select[name='VideoMaxInterTUDepth']";
var JS_VIDEO_MAX_INTRA_TU_DEPTH	="select[name='VideoMaxIntraTUDepth']";
var JS_VIDEO_SAO = "input[name='VideoSAO']";
var JS_VIDEO_AMP = "input[name='VideoAMP']";
var JS_VIDEO_LOOP_FILTER = "input[name='VideoLoopFilter']";
var JS_VIDEO_SMART_BORDER	="select[name='VideoSmartBorder']";
var JS_VIDEO_CODEC_ID = "input[name='VideoCodecId']";
var JS_VIDEO_MARK_ID = "input[name='VideoMarkId']";
var JS_VIDEO_GOP_MODE_ID = "select[name='VideoGopModeId']";
var JS_VIDEO_RESOLUTION = "input[name='VideoResolution']";
var JS_VIDEO_THREAD_COUNT = "input[name='VideoThreadCount']";
var JS_VIDEO_LOOK_HEAD_FRAME = "input[name='VideoLookHeadFrame']";
var JS_VIDEO_WPP_THREAD_COUNT = "select[name='VideoWppThreadCount']";
var JS_TWO_PASS = "input[name='TwoPass']";
var JS_QUALITY_LEVEL_DISP = "select[name='QualityLevelDisp']";
var JS_QUALITY_LEVEL = "input[name='QualityLevel']";
var JS_VIDEO_PLAY_RATE = "input[name='VideoPlayRate']";
var JS_DEVICE_ID = "input[name='DeviceId']";
var JS_VIDEO_COLOR_FORMAT = "input[name='VideoColorFormat']";
var JS_VIDEO_BIT_DEPTH = "select[name='VideoBitDepth']";
var JS_VIDEO_PROFILE_DISP = "select[name='VideoCodecProfileDisp']";

var TAG_VIDEO_H264			="h264";
var TAG_VIDEO_AVS			="avs";
var TAG_VIDEO_H265			="h265";
var TAG_VIDEO_H263			="h263";
var TAG_VIDEO_DV			="dv";
var TAG_VIDEO_PRORES		="prores";
var TAG_VIDEO_RAW		="raw";
var TAG_VIDEO_DNXHD			="dnxhd";
var TAG_VIDEO_S263			="s263";
var TAG_VIDEO_WMV			="vc-1";
var TAG_VIDEO_MPEG2			="mpeg2";
var TAG_VIDEO_MPEG4			="mpeg4";
var TAG_VIDEO_MPEG1			="mpeg1";
var TAG_VIDEO_WIDTH			="width";
var TAG_VIDEO_HEIGHT		="height";
var TAG_VIDEO_PAR			="par";
var TAG_VIDEO_PAR_X			="par_x";
var TAG_VIDEO_PAR_Y			="par_y";
var TAG_VIDEO_FRAMERATE		="fr";
var TAG_VIDEO_FRAMERATE_X	="fr_x";
var TAG_VIDEO_FRAMERATE_Y	="fr_y";
var TAG_VIDEO_RATE_CONTROL	="rc";
var TAG_VIDEO_BITRATE		="bitrate";
var TAG_VIDEO_MAX_BITRATE	="maxbitrate";
var TAG_VIDEO_QUANTIZER	="cqquantizer";
var TAG_VIDEO_BUFFER_SIZE	="bufsize";
var TAG_VIDEO_BUFFER_FILL	="buffillpct";
var TAG_VIDEO_GOP_SIZE		="gopsize";
var TAG_VIDEO_GOP_TYPE		="goptype";
var TAG_VIDEO_SCD		="scd";
var TAG_VIDEO_B_FRAME		="bframe";
var TAG_VIDEO_CABAC			="cabac";
var TAG_VIDEO_TRANSFORM		="transform8x8";
var TAG_VIDEO_INTRA_PREDICTION	="intraprediction8x8";
var TAG_VIDEO_REFERENCE_FRAME	="refframe";
var TAG_VIDEO_CODEC_PROFILE		="profile";
var TAG_VIDEO_INTERLACE			="interlace";
var TAG_VIDEO_TOP_FIELD_FIRST	="topfieldfirst";
var TAG_VIDEO_INTERPOLATE = "interpolate";
var TAG_VIDEO_FRAME_RATE_MODE = "frameratesourcemode";
var TAG_VIDEO_FILL_ON_VIDEO_LOST = "fillonlost";
var TAG_VIDEO_CODEC_LEVEL	="level";
var TAG_VIDEO_SMART_BORDER	="smartborder";
var TAG_VIDEO_MAX_CU = "maxcu";
var TAG_VIDEO_MAX_CU_DEPTH = "maxcudepth";
var TAG_VIDEO_MAX_TU = "maxtu";
var TAG_VIDEO_MIN_TU = "mintu";
var TAG_VIDEO_MAX_INTER_TU_DEPTH = "maxintertudepth"; 
var TAG_VIDEO_MAX_INTRA_TU_DEPTH = "maxintratudepth";
var TAG_VIDEO_SAO = "sao";
var TAG_VIDEO_AMP = "amp";
var TAG_VIDEO_LOOP_FILTER = "loopfilter";
var TAG_VIDEO_CODEC_ID = "videocodecid";
var TAG_VIDEO_MARK_ID = "markid";
var TAG_VIDEO_GOP_MODE_ID = "gopmodeid";
var TAG_VIDEO_THREAD_COUNT = "threadcount";
var TAG_VIDEO_LOOK_HEAD_FRAME = "lookheadframe";
var TAG_VIDEO_WPP_THREAD_COUNT = "wppthreadcount";
var TAG_TWO_PASS = "twopass";
var TAG_DEVICE_ID = "deviceid";
var TAG_QUALITY_LEVEL = "qualitylevel";
var TAG_VIDEO_PLAY_RATE = "videoplayrate";
var TAG_VIDEO_BIT_DEPTH = "bitdepth";

var FIELD_VIDEO_SETTING		="videoSetting";
var FIELD_VIDEO_PAR			="parFollowSource";
var FIELD_VIDEO_PAR_X		="parNumerator";
var FIELD_VIDEO_PAR_Y		="parDenominator";
var FIELD_VIDEO_FRAMERATE	="framerateFollowSource";
var FIELD_VIDEO_FRAMERATE_X	="framerateNumerator";
var FIELD_VIDEO_FRAMERATE_Y	="framerateDenominator";
var FIELD_VIDEO_RATE_CONTROL	="rateControlMode";
var FIELD_VIDEO_BITRATE		="bitrate";
var FIELD_VIDEO_MAX_BITRATE	="maxBitrate";
var FIELD_VIDEO_QUANTIZER	="cqQuantizer";
var FIELD_VIDEO_BUFFER_SIZE	="bufSize";
var FIELD_VIDEO_BUFFER_FILL	="bufFillPct";
var FIELD_VIDEO_GOP_SIZE	="gopSize";
var FIELD_VIDEO_GOP_TYPE	="gopType";
var FIELD_VIDEO_SCD = "scd";
var FIELD_VIDEO_B_FRAME		="gopNumBFrames";
var FIELD_VIDEO_CABAC		="cabac";
var FIELD_VIDEO_TRANSFORM	="transform8x8";
var FIELD_VIDEO_INTRA_PREDICTION	="intraPrediction8x8";
var FIELD_VIDEO_REFERENCE_FRAME	="numRefFrames";
var FIELD_VIDEO_CODEC_PROFILE	="codecProfile";
var FIELD_VIDEO_INTERLACE	="interlaceModeId";
var FIELD_VIDEO_TOP_FIELD_FIRST	="topFieldFirst";
var FIELD_VIDEO_INTERPOLATE = "interpolateFrc";
var FIELD_VIDEO_VIDEO_FRAME_RATE_MODE = "frameRateSourceMode";
var FIELD_VIDEO_FILL_ON_VIDEO_LOST = "fillOnVideoLost";
var FIELD_VIDEO_CODEC_LEVEL		="codecLevelId";
var FIELD_VIDEO_MAX_CU = "maxCU";
var FIELD_VIDEO_MAX_CU_DEPTH = "maxCUDepth";
var FIELD_VIDEO_MAX_TU = "maxTU";
var FIELD_VIDEO_MIN_TU = "minTU";
var FIELD_VIDEO_MAX_INTER_TU_DEPTH = "maxInterTUDepth";
var FIELD_VIDEO_MAX_INTRA_TU_DEPTH = "maxIntraTUDepth";
var FIELD_VIDEO_SAO = "sao";
var FIELD_VIDEO_AMP = "amp";
var FIELD_VIDEO_LOOP_FILTER = "loopFilter";
var FIELD_VIDEO_GOP_MODE_ID = "gopModeId";
var FIELD_VIDEO_THREAD_COUNT = "threadCount";
var FIELD_VIDEO_LOOK_HEAD_FRAME = "lookHeadFrame";
var FIELD_VIDEO_WPP_THREAD_COUNT = "wppThreadCount";
var FIELD_TWO_PASS = "twoPasses";
var FIELD_DEVICE_ID = "deviceId";
var FIELD_QUALITY_LEVEL = "qualityLevel";
var FIELD_VIDEO_BIT_DEPTH = "bitDepth";

function VideoCodec() {
	var bitrateRange = {min: 32, max: 40000, recommand: 1000};
	var bitrateRangeH263 = {min: 500, max: 40000, recommand: 1000};
	var quantizerRange = {min: 18, max: 51, recommand: 40};
	
	var codecTagMap = [
		{key: VIDEO_CODEC_H264, value: TAG_VIDEO_H264},
		{key: VIDEO_CODEC_AVS, value: TAG_VIDEO_AVS},
		{key: VIDEO_CODEC_H265, value: TAG_VIDEO_H265},
		{key: VIDEO_CODEC_H263, value: TAG_VIDEO_H263},
		{key: VIDEO_CODEC_DV, value: TAG_VIDEO_DV},
		{key: VIDEO_CODEC_PRORES, value: TAG_VIDEO_PRORES},
		{key: VIDEO_CODEC_RAW, value: TAG_VIDEO_RAW},
		{key: VIDEO_CODEC_DNXHD, value: TAG_VIDEO_DNXHD},
		{key: VIDEO_CODEC_S263, value: TAG_VIDEO_S263},
		{key: VIDEO_CODEC_WMV, value: TAG_VIDEO_WMV},
		{key: VIDEO_CODEC_MPEG2, value: TAG_VIDEO_MPEG2},
		{key: VIDEO_CODEC_MPEG4, value: TAG_VIDEO_MPEG4},
		{key: VIDEO_CODEC_MPEG1, value: TAG_VIDEO_MPEG1}
	];
	
	var h264TagMap = [
		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: TAG_VIDEO_CODEC_LEVEL, value: JS_VIDEO_CODEC_LEVEL},
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_PLAY_RATE, value: JS_VIDEO_PLAY_RATE},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_MAX_BITRATE, value: JS_VIDEO_MAX_BITRATE},
		{key: TAG_VIDEO_QUANTIZER, value: JS_VIDEO_QUANTIZER},
		{key: TAG_VIDEO_TRANSFORM, value: JS_VIDEO_TRANSFORM},
		{key: TAG_VIDEO_INTRA_PREDICTION, value: JS_VIDEO_INTRA_PREDICTION},
		{key: TAG_VIDEO_BUFFER_SIZE, value: JS_VIDEO_BUFFER_SIZE},
		{key: TAG_VIDEO_BUFFER_FILL, value: JS_VIDEO_BUFFER_FILL},
		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
		{key: TAG_VIDEO_GOP_MODE_ID, value: JS_VIDEO_GOP_MODE_ID},
		{key: TAG_VIDEO_SCD, value: JS_VIDEO_SCD},
		{key: TAG_VIDEO_B_FRAME, value: JS_VIDEO_B_FRAME},
		{key: TAG_VIDEO_CABAC, value: JS_VIDEO_CABAC},
		{key: TAG_VIDEO_REFERENCE_FRAME, value: JS_VIDEO_REFERENCE_FRAME},
		{key: TAG_VIDEO_INTERLACE, value: JS_VIDEO_INTERLACE},
		{key: TAG_VIDEO_TOP_FIELD_FIRST, value: JS_VIDEO_TOP_FIELD_FIRST},
		{key: TAG_VIDEO_THREAD_COUNT, value: JS_VIDEO_THREAD_COUNT},
		{key: TAG_VIDEO_LOOK_HEAD_FRAME, value: JS_VIDEO_LOOK_HEAD_FRAME},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER},
		{key: TAG_TWO_PASS, value: JS_TWO_PASS},
		{key: TAG_DEVICE_ID, value: JS_DEVICE_ID},
		{key: TAG_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var h265TagMap = [
		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: TAG_VIDEO_CODEC_LEVEL, value: JS_VIDEO_CODEC_LEVEL},
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_MAX_BITRATE, value: JS_VIDEO_MAX_BITRATE},
		{key: TAG_VIDEO_QUANTIZER, value: JS_VIDEO_QUANTIZER},
		{key: TAG_VIDEO_BUFFER_SIZE, value: JS_VIDEO_BUFFER_SIZE},
		{key: TAG_VIDEO_BUFFER_FILL, value: JS_VIDEO_BUFFER_FILL},
		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
		{key: TAG_VIDEO_GOP_MODE_ID, value: JS_VIDEO_GOP_MODE_ID},
		{key: TAG_VIDEO_SCD, value: JS_VIDEO_SCD},
		{key: TAG_VIDEO_B_FRAME, value: JS_VIDEO_B_FRAME},
		{key: TAG_VIDEO_BIT_DEPTH, value: JS_VIDEO_BIT_DEPTH},
		{key: TAG_VIDEO_MAX_CU, value: JS_VIDEO_MAX_CU_SIZE},
		{key: TAG_VIDEO_MAX_CU_DEPTH, value: JS_VIDEO_MAX_CU_DEPTH},
		{key: TAG_VIDEO_MAX_TU, value: JS_VIDEO_MAX_TU_SIZE},
		{key: TAG_VIDEO_MIN_TU, value: JS_VIDEO_MIN_TU_SIZE},
		{key: TAG_VIDEO_MAX_INTER_TU_DEPTH, value: JS_VIDEO_MAX_INTER_TU_DEPTH},
		{key: TAG_VIDEO_MAX_INTRA_TU_DEPTH, value: JS_VIDEO_MAX_INTRA_TU_DEPTH},
		{key: TAG_VIDEO_SAO, value: JS_VIDEO_SAO},
		{key: TAG_VIDEO_AMP, value: JS_VIDEO_AMP},
		{key: TAG_VIDEO_LOOP_FILTER, value: JS_VIDEO_LOOP_FILTER},
		{key: TAG_VIDEO_REFERENCE_FRAME, value: JS_VIDEO_REFERENCE_FRAME},
		{key: TAG_VIDEO_THREAD_COUNT, value: JS_VIDEO_THREAD_COUNT},
		{key: TAG_VIDEO_LOOK_HEAD_FRAME, value: JS_VIDEO_LOOK_HEAD_FRAME},
		{key: TAG_VIDEO_WPP_THREAD_COUNT, value: JS_VIDEO_WPP_THREAD_COUNT},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER},
		{key: TAG_TWO_PASS, value: JS_TWO_PASS},
		{key: TAG_DEVICE_ID, value: JS_DEVICE_ID},
		{key: TAG_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var mpeg2TagMap = [
		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_MAX_BITRATE, value: JS_VIDEO_MAX_BITRATE},
		{key: TAG_VIDEO_BUFFER_SIZE, value: JS_VIDEO_BUFFER_SIZE},
		{key: TAG_VIDEO_BUFFER_FILL, value: JS_VIDEO_BUFFER_FILL},
		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
		{key: TAG_VIDEO_GOP_MODE_ID, value: JS_VIDEO_GOP_MODE_ID},
		{key: TAG_VIDEO_B_FRAME, value: JS_VIDEO_B_FRAME},
		{key: TAG_VIDEO_INTERLACE, value: JS_VIDEO_INTERLACE},
		{key: TAG_VIDEO_TOP_FIELD_FIRST, value: JS_VIDEO_TOP_FIELD_FIRST},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER},
		{key: TAG_TWO_PASS, value: JS_TWO_PASS},
		{key: TAG_DEVICE_ID, value: JS_DEVICE_ID},
		{key: TAG_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var mpeg4TagMap = [
   		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
   		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
   		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
   		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
   		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
   		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
   		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
   		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
   		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
   		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
   		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
   		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
   		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
   		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
   		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
   		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
   		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
   		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
   		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
   		];
	
	var mpeg1TagMap = [
   		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
   		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
   		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
   		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
   		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
   		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
   		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
   		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
   		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
   		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
   		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
   		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
   		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
   		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
   		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
   		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
   		{key: TAG_VIDEO_MAX_BITRATE, value: JS_VIDEO_MAX_BITRATE},
   		{key: TAG_VIDEO_BUFFER_SIZE, value: JS_VIDEO_BUFFER_SIZE},
   		{key: TAG_VIDEO_BUFFER_FILL, value: JS_VIDEO_BUFFER_FILL},
   		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
   		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
   		{key: TAG_VIDEO_B_FRAME, value: JS_VIDEO_B_FRAME},
   		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
   		];
	
	var wmvTagMap = [
		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: TAG_VIDEO_CODEC_LEVEL, value: JS_VIDEO_CODEC_LEVEL},
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_MAX_BITRATE, value: JS_VIDEO_MAX_BITRATE},
		{key: TAG_VIDEO_BUFFER_SIZE, value: JS_VIDEO_BUFFER_SIZE},
		{key: TAG_VIDEO_BUFFER_FILL, value: JS_VIDEO_BUFFER_FILL},
		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
		{key: TAG_VIDEO_B_FRAME, value: JS_VIDEO_B_FRAME},
		{key: TAG_VIDEO_REFERENCE_FRAME, value: JS_VIDEO_REFERENCE_FRAME},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
		];
	
	var h263TagMap = [
 		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
 		{key: TAG_VIDEO_CODEC_LEVEL, value: JS_VIDEO_CODEC_LEVEL},
 		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
 		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
 		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
 		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
 		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
 		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
 		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
 		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
 		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
 		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
 		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
 		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
 		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
 		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
 		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
 		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
 		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
 		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
 		];
	
	var dvTagMap = [
   		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
   		{key: TAG_VIDEO_CODEC_LEVEL, value: JS_VIDEO_CODEC_LEVEL},
   		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
   		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
   		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
   		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
   		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
   		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
   		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
   		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
   		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
   		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
   		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
   		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
   		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
   		{key: TAG_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
   		{key: TAG_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
   		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
   		];
	
	var proresTagMap = [
		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_INTERLACE, value: JS_VIDEO_INTERLACE},
		{key: TAG_VIDEO_TOP_FIELD_FIRST, value: JS_VIDEO_TOP_FIELD_FIRST},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER},
		{key: TAG_TWO_PASS, value: JS_TWO_PASS},
		{key: TAG_DEVICE_ID, value: JS_DEVICE_ID},
		{key: TAG_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var rawTagMap = [
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_INTERLACE, value: JS_VIDEO_INTERLACE},
		{key: TAG_VIDEO_TOP_FIELD_FIRST, value: JS_VIDEO_TOP_FIELD_FIRST},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
		];
	
	var dnxhdTagMap = [
   		{key: TAG_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: TAG_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
		{key: TAG_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
		{key: TAG_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: TAG_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: TAG_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: TAG_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: TAG_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: TAG_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: TAG_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: TAG_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: TAG_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: TAG_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: TAG_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
		{key: TAG_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: TAG_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: TAG_VIDEO_INTERLACE, value: JS_VIDEO_INTERLACE},
		{key: TAG_VIDEO_TOP_FIELD_FIRST, value: JS_VIDEO_TOP_FIELD_FIRST},
		{key: TAG_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER},
		{key: TAG_TWO_PASS, value: JS_TWO_PASS},
		{key: TAG_DEVICE_ID, value: JS_DEVICE_ID},
		{key: TAG_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var fieldMap = [
		{key: FIELD_VIDEO_PAR, value: JS_VIDEO_PAR},
		{key: FIELD_VIDEO_PAR_X, value: JS_VIDEO_PAR_X},
		{key: FIELD_VIDEO_PAR_Y, value: JS_VIDEO_PAR_Y},
		{key: FIELD_VIDEO_FRAMERATE, value: JS_VIDEO_FRAMERATE},
		{key: FIELD_VIDEO_FRAMERATE_X, value: JS_VIDEO_FRAMERATE_X},
		{key: FIELD_VIDEO_FRAMERATE_Y, value: JS_VIDEO_FRAMERATE_Y},
		{key: FIELD_VIDEO_RATE_CONTROL, value: JS_VIDEO_RATE_CONTROL},
		{key: FIELD_VIDEO_BITRATE, value: JS_VIDEO_BITRATE},
		{key: FIELD_VIDEO_MAX_BITRATE, value: JS_VIDEO_MAX_BITRATE},
		{key: FIELD_VIDEO_QUANTIZER, value: JS_VIDEO_QUANTIZER},
		{key: FIELD_VIDEO_BUFFER_SIZE, value: JS_VIDEO_BUFFER_SIZE},
		{key: FIELD_VIDEO_BUFFER_FILL, value: JS_VIDEO_BUFFER_FILL},
		{key: FIELD_VIDEO_GOP_SIZE, value: JS_VIDEO_GOP_SIZE},
		{key: FIELD_VIDEO_GOP_TYPE, value: JS_VIDEO_GOP_TYPE},
		{key: FIELD_VIDEO_SCD, value: JS_VIDEO_SCD},
		{key: FIELD_VIDEO_B_FRAME, value: JS_VIDEO_B_FRAME},
		{key: FIELD_VIDEO_BIT_DEPTH, value: JS_VIDEO_BIT_DEPTH},
		{key: FIELD_VIDEO_CABAC, value: JS_VIDEO_CABAC},
		{key: FIELD_VIDEO_TRANSFORM, value: JS_VIDEO_TRANSFORM},
		{key: FIELD_VIDEO_INTRA_PREDICTION, value: JS_VIDEO_INTRA_PREDICTION},
		{key: FIELD_VIDEO_REFERENCE_FRAME, value: JS_VIDEO_REFERENCE_FRAME},
		{key: FIELD_VIDEO_CODEC_PROFILE, value: JS_VIDEO_CODEC_PROFILE},
		{key: FIELD_VIDEO_INTERLACE, value: JS_VIDEO_INTERLACE},
		{key: FIELD_VIDEO_TOP_FIELD_FIRST, value: JS_VIDEO_TOP_FIELD_FIRST},
		{key: FIELD_VIDEO_INTERPOLATE, value: JS_VIDEO_INTERPOLATE},
		{key: FIELD_VIDEO_VIDEO_FRAME_RATE_MODE, value: JS_VIDEO_FRAME_RATE_MODE},
		{key: FIELD_VIDEO_FILL_ON_VIDEO_LOST, value: JS_FILL_ON_VIDEO_LOST},
		{key: FIELD_VIDEO_CODEC_LEVEL, value: JS_VIDEO_CODEC_LEVEL},
		{key: FIELD_VIDEO_MAX_CU, value: JS_VIDEO_MAX_CU_SIZE},
		{key: FIELD_VIDEO_MAX_CU_DEPTH, value: JS_VIDEO_MAX_CU_DEPTH},
		{key: FIELD_VIDEO_MAX_TU, value: JS_VIDEO_MAX_TU_SIZE},
		{key: FIELD_VIDEO_MIN_TU, value: JS_VIDEO_MIN_TU_SIZE},
		{key: FIELD_VIDEO_MAX_INTER_TU_DEPTH, value: JS_VIDEO_MAX_INTER_TU_DEPTH},
		{key: FIELD_VIDEO_MAX_INTRA_TU_DEPTH, value: JS_VIDEO_MAX_INTRA_TU_DEPTH},
		{key: FIELD_VIDEO_SAO, value: JS_VIDEO_SAO},
		{key: FIELD_VIDEO_AMP, value: JS_VIDEO_AMP},
		{key: FIELD_VIDEO_LOOP_FILTER, value: JS_VIDEO_LOOP_FILTER},
		{key: FIELD_VIDEO_GOP_MODE_ID, value: JS_VIDEO_GOP_MODE_ID},
		{key: FIELD_VIDEO_THREAD_COUNT, value: JS_VIDEO_THREAD_COUNT},
		{key: FIELD_VIDEO_LOOK_HEAD_FRAME, value: JS_VIDEO_LOOK_HEAD_FRAME},
		{key: FIELD_VIDEO_WPP_THREAD_COUNT, value: JS_VIDEO_WPP_THREAD_COUNT},
		{key: FIELD_TWO_PASS, value: JS_TWO_PASS},
    	{key: FIELD_DEVICE_ID, value: JS_DEVICE_ID},
    	{key: FIELD_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var infoChanger = [
		JS_VIDEO_PAR,
		JS_VIDEO_PAR_X,
		JS_VIDEO_PAR_Y,
		JS_VIDEO_FRAMERATE,
		JS_VIDEO_FRAMERATE_X,
		JS_VIDEO_FRAMERATE_Y,
		JS_VIDEO_RATE_CONTROL,
		JS_VIDEO_BITRATE,
		JS_VIDEO_MAX_BITRATE,
		JS_VIDEO_QUANTIZER,
		JS_VIDEO_BUFFER_SIZE,
		JS_VIDEO_BUFFER_FILL,
		JS_VIDEO_GOP_SIZE,
		JS_VIDEO_GOP_TYPE,
		JS_VIDEO_B_FRAME, 
		JS_VIDEO_CABAC, 
		JS_VIDEO_TRANSFORM,
		JS_VIDEO_INTRA_PREDICTION, 
		JS_VIDEO_REFERENCE_FRAME, 
		JS_VIDEO_CODEC_PROFILE, 
		JS_VIDEO_INTERLACE,
		JS_VIDEO_TOP_FIELD_FIRST,
		JS_VIDEO_THREAD_COUNT,
		JS_VIDEO_LOOK_HEAD_FRAME,
		JS_VIDEO_WPP_THREAD_COUNT,
		JS_VIDEO_INTERPOLATE, 
		JS_FILL_ON_VIDEO_LOST,
		JS_VIDEO_CODEC_LEVEL, 
		JS_VIDEO_MAX_CU_SIZE, 
		JS_VIDEO_MAX_CU_DEPTH,
		JS_VIDEO_MAX_TU_SIZE, 
		JS_VIDEO_MIN_TU_SIZE, 
		JS_VIDEO_MAX_INTER_TU_DEPTH, 
		JS_VIDEO_MAX_INTRA_TU_DEPTH,
		JS_VIDEO_SAO, 
		JS_VIDEO_AMP, 
		JS_VIDEO_LOOP_FILTER,
		JS_TWO_PASS,
		JS_QUALITY_LEVEL_DISP
		];
	
	var profileMap = [
		{codec:VIDEO_CODEC_H264, profile:VIDEO_PROFILE_HIGH, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME, JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION], disable:[]},
		{codec:VIDEO_CODEC_H264, profile:VIDEO_PROFILE_MAIN, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME], disable:[JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},
		{codec:VIDEO_CODEC_H264, profile:VIDEO_PROFILE_BASELINE, enable:[], disable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME, JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},		
		{codec:VIDEO_CODEC_H264, profile:VIDEO_PROFILE_AVCIntra50, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME], disable:[JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},
		{codec:VIDEO_CODEC_H264, profile:VIDEO_PROFILE_AVCIntra100, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME], disable:[JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},
		{codec:VIDEO_CODEC_H264, profile:VIDEO_PROFILE_AVCIntra200, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME], disable:[JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},		
		{codec:VIDEO_CODEC_WMV, profile:VIDEO_PROFILE_ADVANCED, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME, JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION], disable:[]},
		{codec:VIDEO_CODEC_WMV, profile:VIDEO_PROFILE_MAIN, enable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME], disable:[JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},
		{codec:VIDEO_CODEC_WMV, profile:VIDEO_PROFILE_SIMPLE, enable:[], disable:[JS_VIDEO_CABAC, JS_VIDEO_B_FRAME, JS_VIDEO_TRANSFORM, JS_VIDEO_INTRA_PREDICTION]},
		{codec:VIDEO_CODEC_MPEG2, profile:VIDEO_PROFILE_MAIN, enable:[JS_VIDEO_B_FRAME], disable:[]},
		{codec:VIDEO_CODEC_MPEG2, profile:VIDEO_PROFILE_SIMPLE, enable:[], disable:[JS_VIDEO_B_FRAME]},
		{codec:VIDEO_CODEC_MPEG2, profile:VIDEO_PROFILE_HIGH422, enable:[JS_VIDEO_B_FRAME], disable:[]},
		{codec:VIDEO_CODEC_MPEG1, profile:VIDEO_PROFILE_MAIN, enable:[JS_VIDEO_B_FRAME], disable:[]},
		{codec:VIDEO_CODEC_MPEG1, profile:VIDEO_PROFILE_SIMPLE, enable:[], disable:[JS_VIDEO_B_FRAME]}
		];
	
	var defaultValueMap = [
  		{codec:VIDEO_CODEC_DNXHD, profile:VIDEO_PROFILE_DNXHD_220X, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:185000,frameRate:25,colorFormat:422,bitDepth:10},
  		{codec:VIDEO_CODEC_DNXHD, profile:VIDEO_PROFILE_DNXHD_220, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:185000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_DNXHD, profile:VIDEO_PROFILE_DNXHD_145, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:120000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_DNXHD, profile:VIDEO_PROFILE_DNXHD_100, resolutionX:1440, resolutionY:1080,parX:16,parY:9,bitrate:85000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_PRORES, profile:VIDEO_PROFILE_PRORES_PROXY, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:38000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_PRORES, profile:VIDEO_PROFILE_PRORES_LT, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:85000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_PRORES, profile:VIDEO_PROFILE_PRORES_STANDARD, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:122000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_PRORES, profile:VIDEO_PROFILE_PRORES_HQ, resolutionX:1920, resolutionY:1080,parX:16,parY:9,bitrate:184000,frameRate:25,colorFormat:422,bitDepth:8},
  		{codec:VIDEO_CODEC_DV, profile:VIDEO_DV25411, resolutionX:720, resolutionY:576,parX:4,parY:3,bitrate:25000,frameRate:25,colorFormat:411,bitDepth:8}
  		];
	
	var mpeg2ProfileData=[		
		{key:VIDEO_PROFILE_MPEG2_I, value:VIDEO_PROFILE_MPEG2_I},
		{key:VIDEO_PROFILE_MPEG2_XDCAM_HD_50, value:VIDEO_PROFILE_MPEG2_XDCAM_HD_50},
		{key:VIDEO_PROFILE_MPEG2_XDCAM_HD_35, value:VIDEO_PROFILE_MPEG2_XDCAM_HD_35},
		{key:VIDEO_PROFILE_MPEG2_XDCAM_HD_25, value:VIDEO_PROFILE_MPEG2_XDCAM_HD_25},
		{key:VIDEO_PROFILE_MPEG2_XDCAM_17_5, value:VIDEO_PROFILE_MPEG2_XDCAM_17_5},
		{key:VIDEO_PROFILE_MPEG30, value:VIDEO_PROFILE_MPEG30},
		{key:VIDEO_PROFILE_MPEG40, value:VIDEO_PROFILE_MPEG40},
		{key:VIDEO_PROFILE_MPEG50, value:VIDEO_PROFILE_MPEG50},
		{key:VIDEO_PROFILE_MPEG2_SD_25, value:VIDEO_PROFILE_MPEG2_SD_25},
		{key:VIDEO_PROFILE_MPEG2_SD_12, value:VIDEO_PROFILE_MPEG2_SD_12},
		{key:VIDEO_PROFILE_HIGH422, value:VIDEO_PROFILE_HIGH422},
		{key:VIDEO_PROFILE_MAIN, value:VIDEO_PROFILE_MAIN}
		];

	var mpeg2DefaultValueMap=[
		{profileDisp:VIDEO_PROFILE_MPEG2_I, profile:VIDEO_PROFILE_HIGH422,resolutionX:1920, resolutionY:1080,parX:16,parY:9,rateMode:"CBR",bitrate:100000,frameRate:25,gopSize:1,bFrame:0,colorFormat:422,bitDepth:8,interlace:2},
  		{profileDisp:VIDEO_PROFILE_MPEG2_XDCAM_HD_50, profile:VIDEO_PROFILE_HIGH422,resolutionX:1920, resolutionY:1080,parX:16,parY:9,rateMode:"CBR",bitrate:50000,frameRate:25,gopSize:12,bFrame:2,colorFormat:422,bitDepth:8,interlace:3},
  		{profileDisp:VIDEO_PROFILE_MPEG2_XDCAM_HD_35, profile:VIDEO_PROFILE_MAIN,resolutionX:1440, resolutionY:1080,parX:16,parY:9,rateMode:"VBR",bitrate:35000,frameRate:25,gopSize:12,bFrame:2,colorFormat:420,bitDepth:8,interlace:3},
  		{profileDisp:VIDEO_PROFILE_MPEG2_XDCAM_HD_25,profile:VIDEO_PROFILE_MAIN, resolutionX:1440, resolutionY:1080,parX:16,parY:9,rateMode:"CBR",bitrate:25000,frameRate:25,gopSize:12,bFrame:2,colorFormat:420,bitDepth:8,interlace:3},
  		{profileDisp:VIDEO_PROFILE_MPEG2_XDCAM_17_5, profile:VIDEO_PROFILE_MAIN,resolutionX:1440, resolutionY:1080,parX:16,parY:9,rateMode:"VBR",bitrate:18000,frameRate:25,gopSize:12,bFrame:2,colorFormat:420,bitDepth:8,interlace:3},
  		{profileDisp:VIDEO_PROFILE_MPEG30, profile:VIDEO_PROFILE_MPEG30, resolutionX:720, resolutionY:576,parX:4,parY:3,rateMode:"CBR",bitrate:30000,frameRate:25,gopSize:1,bFrame:0,colorFormat:422,bitDepth:8,interlace:2},
  		{profileDisp:VIDEO_PROFILE_MPEG40, profile:VIDEO_PROFILE_MPEG40, resolutionX:720, resolutionY:576,parX:4,parY:3,rateMode:"CBR",bitrate:40000,frameRate:25,gopSize:1,bFrame:0,colorFormat:422,bitDepth:8,interlace:2},
  		{profileDisp:VIDEO_PROFILE_MPEG50, profile:VIDEO_PROFILE_MPEG50,resolutionX:720, resolutionY:576,parX:4,parY:3,rateMode:"CBR",bitrate:50000,frameRate:25,gopSize:1,bFrame:0,colorFormat:422,bitDepth:8,interlace:2},
  		{profileDisp:VIDEO_PROFILE_MPEG2_SD_25, profile:VIDEO_PROFILE_HIGH422,resolutionX:720, resolutionY:576,parX:4,parY:3,rateMode:"CBR",bitrate:25000,frameRate:25,gopSize:12,bFrame:2,colorFormat:422,bitDepth:8,interlace:2},
		{profileDisp:VIDEO_PROFILE_MPEG2_SD_12,profile:VIDEO_PROFILE_MAIN, resolutionX:720, resolutionY:576,parX:4,parY:3,rateMode:"CBR",bitrate:12000,frameRate:25,gopSize:12,bFrame:2,colorFormat:420,bitDepth:8,interlace:2},
		{profileDisp:VIDEO_PROFILE_HIGH422,profile:VIDEO_PROFILE_HIGH422, resolutionX:1920, resolutionY:1080,parX:16,parY:9,rateMode:"CBR",bitrate:50000,frameRate:25,gopSize:12,bFrame:2,colorFormat:422,bitDepth:8,interlace:2},
		{profileDisp:VIDEO_PROFILE_MAIN,profile:VIDEO_PROFILE_MAIN, resolutionX:720, resolutionY:576,parX:4,parY:3,rateMode:"CBR",bitrate:1000,frameRate:25,gopSize:100,bFrame:0,colorFormat:420,bitDepth:8,interlace:2},
		];
	
	var defaultValue = [
		{key: JS_VIDEO_CABAC, value: ENABLE_TRUE},
		{key: JS_VIDEO_TRANSFORM, value: ENABLE_TRUE},
		{key: JS_VIDEO_INTRA_PREDICTION, value: ENABLE_TRUE},
		{key: JS_VIDEO_B_FRAME, value: "0"}
		];
	
	var rateControlMap = [
		{mode:VIDEO_RATE_CONTROL_CBR, enable:[JS_VIDEO_BITRATE, JS_VIDEO_BUFFER_SIZE, JS_VIDEO_BUFFER_FILL], disable:[JS_VIDEO_MAX_BITRATE, JS_VIDEO_QUANTIZER]},
		{mode:VIDEO_RATE_CONTROL_VBR, enable:[JS_VIDEO_MAX_BITRATE, JS_VIDEO_BITRATE, JS_VIDEO_BUFFER_SIZE, JS_VIDEO_BUFFER_FILL], disable:[JS_VIDEO_QUANTIZER]},
		{mode:VIDEO_RATE_CONTROL_ABR, enable:[JS_VIDEO_BITRATE], disable:[JS_VIDEO_MAX_BITRATE, JS_VIDEO_QUANTIZER, JS_VIDEO_BUFFER_SIZE, JS_VIDEO_BUFFER_FILL]},
		{mode:VIDEO_RATE_CONTROL_CQ, enable:[JS_VIDEO_QUANTIZER], disable:[JS_VIDEO_MAX_BITRATE, JS_VIDEO_BITRATE, JS_VIDEO_BUFFER_SIZE, JS_VIDEO_BUFFER_FILL]},
		{mode:VIDEO_RATE_CONTROL_CRF, enable:[JS_VIDEO_QUANTIZER], disable:[JS_VIDEO_MAX_BITRATE, JS_VIDEO_BITRATE, JS_VIDEO_BUFFER_SIZE, JS_VIDEO_BUFFER_FILL]}
		];
	
	var validatorMap = [
		{selector: JS_VIDEO_WIDTH, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: null, recommend: 640} },
		{selector: JS_VIDEO_HEIGHT, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: null, recommend: 480} },
		{selector: JS_VIDEO_PAR_X, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 1920, recommend: 16} },
		{selector: JS_VIDEO_PAR_Y, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 1088, recommend: 9} },
		{selector: JS_VIDEO_FRAMERATE_X, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 100000, recommend: 25} },
		{selector: JS_VIDEO_FRAMERATE_Y, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 100000, recommend: 1} },
		{selector: JS_VIDEO_BITRATE, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 700000000, recommend: 1000} },
		{selector: JS_VIDEO_MAX_BITRATE, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 2100000000, recommend: 3000} },
		{selector: JS_VIDEO_BUFFER_SIZE, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 262500000, recommend: 375} },
		{selector: JS_VIDEO_BUFFER_FILL, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 2000, recommend: 1000} },
		{selector: JS_VIDEO_B_FRAME, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 4, recommend: 0} },
		{selector: JS_VIDEO_QUANTIZER, type: VALIDATOR_TYPE_INTEGER, param: {min: 18, max: 51, recommend: 40} },
		{selector: JS_VIDEO_GOP_SIZE, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 30} },
		{selector: JS_VIDEO_THREAD_COUNT, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 20, recommend: 5} },
		{selector: JS_VIDEO_LOOK_HEAD_FRAME, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 40, recommend: 20} },
		{selector: JS_VIDEO_REFERENCE_FRAME, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 16, recommend: 1} }
		];
	
	this.dom = null;
	this.videoDescription = null;
	
	/* field */
	this.prefixField = "";
	this.myField = FIELD_VIDEO_SETTING;
	this.fieldIndex = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetVideoDescription = function(videoDescription) {
		this.videoDescription = videoDescription;
	};
	
	this.Create = function(domParent, videoCodecTmpl, container) {
		if(videoCodecTmpl == null) {
			return null;
		}
		var $template = $(videoCodecTmpl);
		if($template.length == 0) return null;
		
		var $parent = $(domParent);
		var	pilot = $parent.find(JS_VIDEO_FLOCK).last();
		if(pilot.length == 0) return null;
		
		var $object = $template.clone();
		$object.show();
		pilot.append($object.get(0));

		this.Init($object.get(0), container);
		
		return this.dom;
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		$(this.dom).remove();
	};
	
	this.Init = function(dom, container) {
		if(dom == null) return;
		if(container != undefined){
			this.container = container;
		}
		this.SetDOM(dom);
		this.LicenseControl();
		
		var codecType1 = this.GetCodecType();
		this.UpdateCodecUI();
		var codecType2 = this.GetCodecType();
		if(codecType1 != codecType2) {
			this.UpdateCodec(codecType2);
		}
		
		this.UpdateResolution();
		this.UpdateAspectRatio();
		this.UpdateFrameRate();
		this.Bind();

		this.UpdateBitDepth();
		this.UpdateFramreRateMode();
		this.UpdateInterpolate();
		this.UpdateRateControlUI();
		this.UpdateLevelUI();
		this.UpdateProfile();
		this.ChangeByProfile(false);
		this.updateGopType();
		this.UpdateInterlace();
		this.UpdateTopFieldFirst();
		this.UpdateGopModeId();
		this.ChangeRateControl();
		this.UpdateMaxCUSize();
		this.UpdateMaxCUDepth();
		this.UpdateMaxTUSize();
		this.UpdateMinTUSize();
		this.UpdateTUDepth();
		this.updateQualityLevelDisp();
		this.updateByActionType();
		this.UpdateProfileDisp();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_ENCODER_SMARTBORDER) != license.ENABLED) {
			$(JS_LICENSE_SMART_BORDER, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_CODEC_ID) != license.ENABLED) {
			$(JS_LICENSE_VIDEO_CODEC_ID, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_PLAY_RATE) != license.ENABLED) {
			$(JS_LICENSE_VIDEO_PLAY_RATE, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_H263_LEVEL) != license.ENABLED) {
			$(JS_LICENSE_VIDEO_H263_LEVEL, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_INTERLACE_FIELD_1ST_MODE_SHOW)!=license.ENABLED){
			$(JS_VIDEO_ENCODER_INTERLACE_FIELD_1ST_MODE_SHOW,this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_GOP_MODE_ID) != license.ENABLED) {
			$(JS_LICENSE_GOP_MODE_ID, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_FRAME_RATE_MODE) != license.ENABLED) {
			$(JS_LICENSE_FRAME_RATE_MODE, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_FILL_ON_VIDEO_LOST) != license.ENABLED) {
			$(JS_LICENSE_FILL_ON_VIDEO_LOST, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_CQ) != license.ENABLED) {
			$(JS_LICENSE_VIDEO_QUANTIZER, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_INTERPOLATE) != license.ENABLED) {
			$(".LicenseVideoInterpolate", this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_TWO_PASS) != license.ENABLED) {
			$(JS_TWO_PASS_OPTION, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_GOP_TYPE) != license.ENABLED) {
			$(".LicenseVideoGopType", this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_QUALITY_LEVEL_HARD) != license.ENABLED) {
			$(".LicenseDeviceEncode", this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_BIT_DEPTH) != license.ENABLED) {
			$(".LicenseVideoBitDepth", this.dom).remove();
		}
		
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;

		$(JS_VIDEO_MAX_CU_SIZE, this.dom).change(function() {
			context.UpdateMaxCUDepth();
			context.UpdateMaxTUSize();
			context.UpdateMinTUSize();
			context.UpdateTUDepth();
		});
		
		$(JS_VIDEO_MAX_TU_SIZE, this.dom).change(function() {
			context.UpdateMinTUSize();
			context.UpdateTUDepth();
		});
		
		$(JS_VIDEO_MIN_TU_SIZE, this.dom).change(function() {
			context.UpdateTUDepth();
		});
		
		$(JS_VIDEO_CODEC_PROFILE, this.dom).change(function() {
			context.ChangeByProfile(true);
			context.UpdateInterlace();
			context.UpdateTopFieldFirst();
			context.UpdateByProfile();
		});
		
		$(JS_VIDEO_CODEC_LEVEL, this.dom).change(function() {
			context.UpdateInterlace();
			context.UpdateTopFieldFirst();
		});
		
		$(JS_VIDEO_INTERLACE, this.dom).change(function() {
			context.UpdateTopFieldFirst();
		});
		
		$(JS_VIDEO_RATE_CONTROL, this.dom).change(function() {
			context.ChangeRateControl();
			context.UpdateBitrate();
			context.UpdateQuantizer();
			g_taskSupport.onTotalBitrateChange();
		});
		
		//validator before update
		ValidatorBindArray(this.dom, validatorMap);
		
		$(JS_VIDEO_BITRATE, this.dom).change(function() {
			context.UpdateBitrate();
			g_taskSupport.onTotalBitrateChange();
		});
		
		$(JS_VIDEO_BUFFER_SIZE, this.dom).change(function() {
			context.UpdateVBVSize();
			context.RevertText(this);
		});
		
		$(JS_VIDEO_MAX_BITRATE, this.dom).change(function() {
			context.UpdateMaxBitrate();
			context.RevertText(this);
			g_taskSupport.onTotalBitrateChange();
		});
		
		$(JS_VIDEO_BUFFER_FILL, this.dom).change(function() {
			context.RevertText(this);
		});
		
		$(JS_SUMMARY_TRIGGER, this.dom).change(function() {
			context.UpdateSummary();
		});
		
		$(JS_VIDEO_CODEC, this.dom).change(function() {
			context.UpdateCodec($(this).val());
			context.UpdateSummary();
		});
		
		$(JS_VIDEO_FRAMERATE, this.dom).change(function() {
			context.UpdateFramreRateMode();
			context.UpdateInterpolate();
		});
		
		$(JS_VIDEO_PAR_DISP, this.dom).focus(function() {
			this.blur();
			
			var codec = context.GetCodecType();
			var map = videoData.getAspectRatioByCodec(codec);
			
			for(var i = 0; i < map.length; i++) {
				if(map[i].key == VIDEO_CUSTOM) {
					map[i].style = 2;
					map[i].inputArray = [3, 2];
				}
			}
			
			g_LineSelector.setContent(map);
			g_LineSelector.setTitle("");
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				context.onAspectRatioSelected(key);
			});
		});
		
		$(JS_VIDEO_FRAMERATE_DISP, this.dom).focus(function() {
			this.blur();
			
			var codec = context.GetCodecType();
			var device = context.getDeviceEncode();
			var map = videoData.getFrameRateByCodec(codec, device);
			
			for(var i = 0; i < map.length; i++) {
				if(map[i].key == VIDEO_CUSTOM) {
					map[i].style = 2;
					map[i].inputArray = [20, 1];
				}
			}
			
			g_LineSelector.setContent(map);
			g_LineSelector.setTitle("");
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				context.onFrameRateSelected(key);
			});
		});
		
		$(JS_VIDEO_RESOLUTION, this.dom).focus(function() {
			this.blur();
			
			var codec = context.GetCodecType();
			var device = context.getDeviceEncode();
			var map = videoData.getResolutionByCodec(codec, device);
			
			for(var i = 0; i < map.length; i++) {
				if(map[i].key == VIDEO_CUSTOM) {
					map[i].style = 1;
					map[i].inputArray = [800, 600];
				}
			}
			
			g_LineSelector.setContent(map);
			g_LineSelector.setTitle("");
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				context.onResolutionSelected(key);
			});
		});
		
		$(JS_VIDEO_B_FRAME, this.dom).focus(function() {
			var codec = context.GetCodecType();
			var device = context.getDeviceEncode();
			var map = videoData.getBFrameByCodec(codec, device);
			if(map != null) {
				var thisDom = this;
				this.blur();
				g_LineSelector.setContent(map);
				g_LineSelector.setTitle("");
				g_LineSelector.show();
				g_LineSelector.setOnSelected(function(key) {
					thisDom.value = key;
					context.updateGopByBframe();
				});
			}
		});
		
		$(JS_VIDEO_GOP_SIZE, this.dom).focus(function() {
			var codec = context.GetCodecType();
			var device = context.getDeviceEncode();
			var bFrame = $(JS_VIDEO_B_FRAME, context.dom).val();
			var map = videoData.getGopSizeByCodec(codec, device, bFrame);
			if(map != null) {
				var thisDom = this;
				this.blur();
				g_LineSelector.setContent(map);
				g_LineSelector.setTitle("");
				g_LineSelector.show();
				g_LineSelector.setOnSelected(function(key) {
					thisDom.value = key;
				});
			}
		});

		var arr = videoData.getSmartBorder();
		uUpdateSelect($(JS_VIDEO_SMART_BORDER, this.dom).get(0), arr);
		
		var codec = this.GetCodecType();
		arr = videoData.getScd(codec);
		uUpdateSelect($(JS_VIDEO_SCD, this.dom).get(0), arr);
		
		arr = videoData.getFrameRateMode();
		uUpdateSelect($(JS_VIDEO_FRAME_RATE_MODE, this.dom).get(0), arr);
		
		arr = videoData.getInterpolate();
		uUpdateSelect($(JS_VIDEO_INTERPOLATE, this.dom).get(0), arr);
		
		arr = videoData.getWppThreadCount();
		uUpdateSelect($(JS_VIDEO_WPP_THREAD_COUNT, this.dom).get(0), arr);
		
		$(JS_QUALITY_LEVEL_DISP, this.dom).change(function() {
			context.syncQualityLevelData();
			context.onQualityLevelChange(this.value);
		});
		
		$(".DeviceEncode", this.dom).change(function() {
			context.onDeviceEncodeChange();
		});

		$(JS_VIDEO_PROFILE_DISP, this.dom).change(function() {			
			context.OnProfileDispChange(this.value);
		});
		
		var expand = {};
		expand.$trigger = $(".VideoAdvanceExpandTrigger", this.dom);
		expand.$icon = $(".VideoAdvanceExpandIcon", this.dom);
		expand.$target = $(".VideoAdvanceExpandTarget", this.dom);
		expand.expand = false;
		uBindExpand(expand);
		
		this.BindInfoChanger();
	};
	
	this.UpdateSummary = function() {
		if(this.videoDescription == null) return;
		this.videoDescription.UpdateSummary();
	};
	
	this.UpdateResolution = function() {
		var $res = $(JS_VIDEO_RESOLUTION, this.dom);
		var resx = parseInt($(JS_VIDEO_WIDTH, this.dom).val());
		var resy = parseInt($(JS_VIDEO_HEIGHT, this.dom).val());
		if(isNaN(resx) || isNaN(resy) || resx <= 0 || resy <= 0) {
			$res.val(str_output.source);
		}
		else {
			$res.val(resx + "x" + resy);
		}
	};
	
	this.UpdateAspectRatio = function() {
		var $parDisp = $(JS_VIDEO_PAR_DISP, this.dom);
		var par = $(JS_VIDEO_PAR, this.dom).val();
		if(par == VIDEO_FOLLOW_SOURCE) {
			$parDisp.val(str_output.source);
		}
		else {
			$parDisp.val($(JS_VIDEO_PAR_X, this.dom).val() + ":" + $(JS_VIDEO_PAR_Y, this.dom).val());
		}
	};
	
	this.UpdateFrameRate = function() {
		var $frDisp = $(JS_VIDEO_FRAMERATE_DISP, this.dom);
		var fr = $(JS_VIDEO_FRAMERATE, this.dom).val();
		if(fr == VIDEO_FOLLOW_SOURCE) {
			$frDisp.val(str_output.source);
		}
		else {
			var x = parseInt($(JS_VIDEO_FRAMERATE_X, this.dom).val());
			var y = parseInt($(JS_VIDEO_FRAMERATE_Y, this.dom).val());
			var frDisp = parseInt((x * 1000 / y)) / 1000.0;
			$frDisp.val(frDisp);
		}
	};
	
	this.UpdateInterpolate = function() {
		var fr = $(JS_VIDEO_FRAMERATE, this.dom).val();
		var $interpolate = $(JS_VIDEO_INTERPOLATE, this.dom);
		if($interpolate.length == 0) return;
		
		if(fr == VIDEO_FOLLOW_SOURCE) {
			$interpolate.get(0).disabled = true;
			$interpolate.val(INTERPOLATE_FIXED);
		}
		else {
			$interpolate.get(0).disabled = false;
		}
	};
	
	this.UpdateFramreRateMode = function() {
		var fr = $(JS_VIDEO_FRAMERATE, this.dom).val();
		var $frameRateMode = $(JS_VIDEO_FRAME_RATE_MODE, this.dom);
		if($frameRateMode.length == 0) return;
		
		if(fr == VIDEO_FOLLOW_SOURCE) {
			$frameRateMode.get(0).disabled = true;
			$frameRateMode.val(FRAME_RATE_MODE_FIXED);
		}
		else {
			$frameRateMode.get(0).disabled = false;
		}
	};

	this.UpdateCodecUI = function() {
		if(this.container != undefined) {
			this.UpdateCodecList();
		} else {
			var srArr = videoData.getCodec();
			uUpdateSelect($(JS_VIDEO_CODEC, this.dom).get(0), srArr);
		}
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.UpdateCodecList = function(){
		var srArr = outputGroupData.GetContainerVideo(this.container);
		var codecArr = [];
		var arr = videoData.getCodec();
		for(var i = 0; i < srArr.length; i++){			
			for(var j = 0 ; j < arr.length; j++) {
				if(srArr[i] == arr[j].key) {
					val = arr[j].value;
				}
			}
		
			codecArr[i] = {key: srArr[i], value: val};
		}
		uUpdateSelect($(JS_VIDEO_CODEC, this.dom).get(0), codecArr);
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.UpdateContainer = function(container){
		this.container = container;
		this.UpdateCodecUI();
	};
	
	this.UpdateLevelUI = function() {
		var $level = $(JS_VIDEO_CODEC_LEVEL, this.dom);
		if($level.length == 0) return;
		var codec = this.GetCodecType();
		var srArr = videoData.getLevelArray(codec);
		uUpdateSelect($level[0], srArr);
	};
	
	this.UpdateInterlace = function() {
		var codec = this.GetCodecType();
		var profile = this.GetValueByJS(JS_VIDEO_CODEC_PROFILE);
		var level = this.GetValueByJS(JS_VIDEO_CODEC_LEVEL);
		var arr = videoData.getInterlace(codec, profile, level);
		var $interlace = $(JS_VIDEO_INTERLACE, this.dom);
		uUpdateSelect($interlace[0], arr);
	};
	
	this.UpdateTopFieldFirst = function() {
		var arr = videoData.getTopFieldFirst();
		var $dom = $(JS_VIDEO_TOP_FIELD_FIRST, this.dom);
		uUpdateSelect($dom[0], arr);
		
		var interlace = $(JS_VIDEO_INTERLACE, this.dom).val();
		if(interlace != null && $dom.length > 0) {
			if(interlace == VIDEO_INTERLACE_FIELD
				|| interlace == VIDEO_INTERLACE_MBAFF
				|| interlace == VIDEO_INTERLACE_PAFF) {
				$dom[0].disabled = false;
			}
			else {
				$dom.val(-1);
				$dom[0].disabled = true;
			}
		}
	};
	
	this.UpdateGopModeId = function() {
		var arr = videoData.getGopModeId();
		uUpdateSelect($(JS_VIDEO_GOP_MODE_ID, this.dom).get(0), arr);
	};

	this.UpdateBitDepth = function(){
		var arr = videoData.getBitDepth();
		uUpdateSelect($(JS_VIDEO_BIT_DEPTH, this.dom).get(0), arr);
	};
	
	this.UpdateMaxCUSize = function() {
		var arr = videoData.getMaxCUSize();
		uUpdateSelect($(JS_VIDEO_MAX_CU_SIZE, this.dom).get(0), arr);
	};
	
	this.UpdateMaxCUDepth = function() {
		var cu = $(JS_VIDEO_MAX_CU_SIZE, this.dom).val();
		var arr = videoData.getMaxCUDepth(cu);
		uUpdateSelect($(JS_VIDEO_MAX_CU_DEPTH, this.dom).get(0), arr);
	};
	
	this.UpdateMaxTUSize = function() {
		var cu = $(JS_VIDEO_MAX_CU_SIZE, this.dom).val();
		var arr = videoData.getMaxTUSize(cu);
		uUpdateSelect($(JS_VIDEO_MAX_TU_SIZE, this.dom).get(0), arr);
	};
	
	this.UpdateMinTUSize = function() {
		var maxtu = $(JS_VIDEO_MAX_TU_SIZE, this.dom).val();
		var arr = videoData.getMinTUSize(maxtu);
		uUpdateSelect($(JS_VIDEO_MIN_TU_SIZE, this.dom).get(0), arr);
	};
		
	this.UpdateTUDepth = function() {
		var maxtu = $(JS_VIDEO_MAX_TU_SIZE, this.dom).val();
		var mintu = $(JS_VIDEO_MIN_TU_SIZE, this.dom).val();
		
		arr = videoData.getMaxInterTUDepth(maxtu, mintu);
		uUpdateSelect($(JS_VIDEO_MAX_INTER_TU_DEPTH, this.dom).get(0), arr);
		
		arr = videoData.getMaxIntraTUDepth(maxtu, mintu);
		uUpdateSelect($(JS_VIDEO_MAX_INTRA_TU_DEPTH, this.dom).get(0), arr);
	};
	
	this.UpdateCodec = function(key) {
		var $template = null;
		if(key == VIDEO_CODEC_MPEG2) {
			$template = $(JS_VIDEO_MPEG2_TEMPLATE);
		} else  if(key == VIDEO_CODEC_MPEG4) {
			$template = $(JS_VIDEO_MPEG4_TEMPLATE);
		} else  if(key == VIDEO_CODEC_MPEG1) {
			$template = $(JS_VIDEO_MPEG1_TEMPLATE);
		} else  if(key == VIDEO_CODEC_WMV) {
			$template = $(JS_VIDEO_WMV_TEMPLATE);
		} else  if(key == VIDEO_CODEC_H263) {
			$template = $(JS_VIDEO_H263_TEMPLATE);
		} else  if(key == VIDEO_CODEC_DV) {
			$template = $(JS_VIDEO_DV_TEMPLATE);
		} else  if(key == VIDEO_CODEC_PRORES) {
			$template = $(JS_VIDEO_PRORES_TEMPLATE);
		} else  if(key == VIDEO_CODEC_RAW) {
			$template = $(JS_VIDEO_RAW_TEMPLATE);
		} else  if(key == VIDEO_CODEC_DNXHD) {
			$template = $(JS_VIDEO_DNXHD_TEMPLATE);
		} else  if(key == VIDEO_CODEC_S263) {
			$template = $(JS_VIDEO_S263_TEMPLATE);
		} else if(key == VIDEO_CODEC_H264) {
			$template = $(JS_VIDEO_H264_TEMPLATE);
		} else if(key == VIDEO_CODEC_AVS) {
			$template = $(JS_VIDEO_AVS_TEMPLATE);
		} else if(key == VIDEO_CODEC_H265) {
			$template = $(JS_VIDEO_H265_TEMPLATE);
		} else if(key == VIDEO_CODEC_PASSTHROUGH) {
			$template = $(JS_VIDEO_PASSTHROUGH_TEMPLATE);
		} else {
			return;
		}
		
		if(key == VIDEO_CODEC_PASSTHROUGH) {
			this.videoDescription.setPassThrough(true);
		}
		else {
			this.videoDescription.setPassThrough(false);
		}
		
		if($template.length == 0) return null;
		var $object = $template.clone();
		$(this.dom).after($object.get(0));
		$(this.dom).remove();
		$object.show();
		this.dom = $object.get(0);
		this.Init(this.dom);
	};
	
	this.UpdateProfile = function() {
		var codec = this.GetCodecType();
		var arr = videoData.getProfileArray(codec);
		uUpdateSelect($(JS_VIDEO_CODEC_PROFILE, this.dom).get(0), arr);
	};

	this.ChangeByProfile = function(bUseDefault) {
		var $video = $(this.dom);
		var codec = this.GetCodecType();
		var profile = this.GetValueByJS(JS_VIDEO_CODEC_PROFILE);
		for(var i = 0; i < profileMap.length; i++) {
			if(codec == profileMap[i].codec && profile == profileMap[i].profile) {
				var j = 0;
				var enableArr = profileMap[i].enable;
				for(j = 0; j < enableArr.length; j++) {
					var $dom = $(enableArr[j], this.dom);
					if($dom.length == 0) continue;
					$dom[0].disabled = false;
					if(bUseDefault) {
						var defv = uGetMapValue(defaultValue, enableArr[j]);
						this.RestoreDefault($dom[0], defv);
					}
				}
				var disableArr = profileMap[i].disable;
				for(j = 0; j < disableArr.length; j++) {
					var $dom = $(disableArr[j], this.dom);
					if($dom.length == 0) continue;
					this.DisableDom($dom.get(0));
				}
				break;
			}
		}
		for(var i = 0; i < defaultValueMap.length; i++) {			
			if(codec == defaultValueMap[i].codec && profile == defaultValueMap[i].profile) {
				this.SetProfileFixedValue(defaultValueMap[i]);
				break;
			}
		}		
	};

	this.UpdateByProfile = function() {
		var codec = this.GetCodecType();
		var profile = this.GetValueByJS(JS_VIDEO_CODEC_PROFILE);
		
		for(var i = 0; i < defaultValueMap.length; i++) {			
			if(codec == defaultValueMap[i].codec && profile == defaultValueMap[i].profile) {
				this.SetResolution(defaultValueMap[i].resolutionX, defaultValueMap[i].resolutionY);
				this.SetAspectRatio(defaultValueMap[i].parX, defaultValueMap[i].parY)
				this.SetColorFormat(defaultValueMap[i].colorFormat);
				this.SetBitDepth(defaultValueMap[i].bitDepth);
				var fr1000 = defaultValueMap[i].frameRate * 1000;
				this.SetFrameRate(fr1000.toString());
				this.SetBitrate(defaultValueMap[i].bitrate);
				break;
			}
		}
	};

	this.UpdateProfileDisp = function(){
		var codec = this.GetCodecType();
		if(codec != VIDEO_CODEC_MPEG2)  return;

		var profileDispDom = $(JS_VIDEO_PROFILE_DISP, this.dom).get(0);
		uUpdateSelect(profileDispDom, mpeg2ProfileData);
		

		var profile = $(JS_VIDEO_CODEC_PROFILE, this.dom).val();
		var bitrate = $(JS_VIDEO_BITRATE, this.dom).val();
		var width = $(JS_VIDEO_WIDTH, this.dom).val();
		var height = $(JS_VIDEO_HEIGHT, this.dom).val();
		var gopSize = $(JS_VIDEO_GOP_SIZE, this.dom).val();
		var updated = false;
		for(var i = 0; i < mpeg2DefaultValueMap.length; i++) {			
			if(profile == mpeg2DefaultValueMap[i].profile 
				&&bitrate == mpeg2DefaultValueMap[i].bitrate && gopSize == mpeg2DefaultValueMap[i].gopSize
				&& width == mpeg2DefaultValueMap[i].resolutionX && height == mpeg2DefaultValueMap[i].resolutionY  ) {
				setSelect(profileDispDom, mpeg2DefaultValueMap[i].profileDisp);
				this.SetProfileFixedValue(mpeg2DefaultValueMap[i]);
				updated  = true;
				break;
			}
		}
		if(!updated) {
			if(profile == VIDEO_PROFILE_HIGH422) {
				for(var i = 0; i < mpeg2DefaultValueMap.length; i++) {			
					if(mpeg2DefaultValueMap[i].profileDisp == VIDEO_PROFILE_HIGH422 ) {
						setSelect(profileDispDom, mpeg2DefaultValueMap[i].profileDisp);
						this.SetProfileFixedValue(mpeg2DefaultValueMap[i]);
						break;
					}
				}
			} else {
				setSelect(profileDispDom, VIDEO_PROFILE_MAIN);
			}
				
		}
		
	};

	this.OnProfileDispChange = function(profileDisp) {		
		for(var i = 0; i <mpeg2DefaultValueMap.length; i++) {			
			if(profileDisp == mpeg2DefaultValueMap[i].profileDisp) {
				this.SetResolution(mpeg2DefaultValueMap[i].resolutionX, mpeg2DefaultValueMap[i].resolutionY);
				this.SetAspectRatio(mpeg2DefaultValueMap[i].parX, mpeg2DefaultValueMap[i].parY)
				this.SetColorFormat(mpeg2DefaultValueMap[i].colorFormat);
				this.SetBitDepth(mpeg2DefaultValueMap[i].bitDepth);
				var fr1000 = mpeg2DefaultValueMap[i].frameRate * 1000;
				this.SetFrameRate(fr1000.toString());
				this.SetBitrate(mpeg2DefaultValueMap[i].bitrate);
				this.SetGopSize(mpeg2DefaultValueMap[i].gopSize);
				this.SetBFrame(mpeg2DefaultValueMap[i].bFrame);
				this.SetRateControl(mpeg2DefaultValueMap[i].rateMode);
				this.SetVideoProfile(mpeg2DefaultValueMap[i].profile);			
				this.SetInterlace(mpeg2DefaultValueMap[i].interlace);				
				break;
			}
		}

		this.UpdateSummary();
	};

	this.SetProfileFixedValue = function(obj) {
		this.SetColorFormat(obj.colorFormat);
		this.SetBitDepth(obj.bitDepth);
	}
	
	
	this.UpdateRateControlUI = function() {
		var $video = $(this.dom);
		var codec = this.GetCodecType();
		var arr = videoData.getRateControlArray(codec);
		uUpdateSelect($video.find(JS_VIDEO_RATE_CONTROL).get(0), arr);
	};
	
	this.ChangeRateControl = function() {
		var $video = $(this.dom);
		var rateControl = $(JS_VIDEO_RATE_CONTROL, this.dom).val();
		for(var i = 0; i < rateControlMap.length; i++) {
			if(rateControl == rateControlMap[i].mode) {
				var j = 0;
				var enableArr = rateControlMap[i].enable;
				for(j = 0; j < enableArr.length; j++) {
					var $dom = $(enableArr[j], this.dom);
					if($dom.length == 0) continue;
					$dom[0].disabled = false;
				}
				var disableArr = rateControlMap[i].disable;
				for(j = 0; j < disableArr.length; j++) {
					var $dom = $(disableArr[j], this.dom);
					if($dom.length == 0) continue;
					this.DisableDom($dom.get(0));
				}
				break;
			}
		}
	};
	
	this.UpdateQuantizer = function() {
		var $video = $(this.dom);
		var $quantizer = $video.find(JS_VIDEO_QUANTIZER);
		if($quantizer.length != 0 && !$quantizer[0].disabled) {
			var quantizer = parseInt($quantizer.val());
			if(isNaN(quantizer)) {
				$quantizer.val(quantizerRange.recommand);
				this.ChangeText($quantizer[0]);
			}
		}
	};
	
	this.UpdateBitrate = function() {
		var $video = $(this.dom);
		var $bitrate = $(JS_VIDEO_BITRATE, this.dom);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) {
			bitrate = bitrateRange.recommand;
			$bitrate.val(bitrate);
			this.ChangeText($bitrate[0]);
		}
		
		var maxBitrate = 0;
		var $maxBitrate = $(JS_VIDEO_MAX_BITRATE, this.dom);
		if($maxBitrate.length != 0 && !$maxBitrate[0].disabled) {
			var maxBitrateRange = this.CalcMaxBitrateRange(bitrate);
			maxBitrate = maxBitrateRange.recommand;
			$maxBitrate.val(maxBitrate);
			this.ChangeText($maxBitrate[0]);
		}
		
		var vbvSize = 0;
		var $vbvSize = $(JS_VIDEO_BUFFER_SIZE, this.dom);
		if($vbvSize.length != 0 && !$vbvSize[0].disabled) {
			bitrate = Math.max(bitrate, maxBitrate);
			var vbvSizeRange = this.CalcVBVSizeRange(bitrate);
			vbvSize = vbvSizeRange.recommand;
			$vbvSize.val(vbvSize);
			this.ChangeText($vbvSize[0]);
		}
		
		var vbvDelay = 0;
		var $vbvDelay = $(JS_VIDEO_BUFFER_FILL, this.dom);
		if($vbvDelay.length != 0 && !$vbvDelay[0].disabled) {
			var vbvDelayRange = this.CalcVBVDelayRange(bitrate, vbvSize);
			vbvDelay = vbvDelayRange.recommand;
			$vbvDelay.val(vbvDelay);
			this.ChangeText($vbvDelay[0]);
		}
	};
	
	this.UpdateVBVSize = function() {
		var $video = $(this.dom);
		var $bitrate = $(JS_VIDEO_BITRATE, this.dom);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) return;
		
		var vbvSize = null;
		var $vbvSize = $(JS_VIDEO_BUFFER_SIZE, this.dom);
		if($vbvSize.length != 0 && !$vbvSize[0].disabled) {
			vbvSize = parseInt($vbvSize.val());
		}
		if(isNaN(vbvSize)) return;
		
		var maxBitrate = 0;
		var $maxBitrate = $(JS_VIDEO_MAX_BITRATE, this.dom);
		if($maxBitrate.length != 0 && !$maxBitrate[0].disabled) {
			maxBitrate = parseInt($maxBitrate.val());
			if(isNaN(maxBitrate)) maxBitrate = 0;
		}
		
		var vbvDelay = 0;
		var $vbvDelay = $(JS_VIDEO_BUFFER_FILL, this.dom);
		if($vbvDelay.length != 0 && !$vbvDelay[0].disabled) {
			bitrate = Math.max(bitrate, maxBitrate);
			var vbvDelayRange = this.CalcVBVDelayRange(bitrate, vbvSize);
			vbvDelay = vbvDelayRange.recommand;
			$vbvDelay.val(vbvDelay);
			this.ChangeText($vbvDelay[0]);
		}
	};
	
	this.UpdateMaxBitrate = function() {
		var $video = $(this.dom);
		var $bitrate = $(JS_VIDEO_BITRATE, this.dom);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) return;
		
		var maxBitrate = 0;
		var $maxBitrate = $(JS_VIDEO_MAX_BITRATE, this.dom);
		if($maxBitrate.length != 0 && !$maxBitrate[0].disabled) {
			maxBitrate = parseInt($maxBitrate.val());
			if(isNaN(maxBitrate)) {
				maxBitrate = 0;
			}
		}
		
		var vbvSize = 0;
		var $vbvSize = $(JS_VIDEO_BUFFER_SIZE, this.dom);
		if($vbvSize.length != 0 && !$vbvSize[0].disabled) {
			bitrate = Math.max(bitrate, maxBitrate);
			var vbvSizeRange = this.CalcVBVSizeRange(bitrate);
			vbvSize = vbvSizeRange.recommand;
			$vbvSize.val(vbvSize);
			this.ChangeText($vbvSize[0]);
		}
		if(isNaN(vbvSize)) return;
		
		var vbvDelay = 0;
		var $vbvDelay = $(JS_VIDEO_BUFFER_FILL, this.dom);
		if($vbvDelay.length != 0 && !$vbvDelay[0].disabled) {
			bitrate = Math.max(bitrate, maxBitrate);
			var vbvDelayRange = this.CalcVBVDelayRange(bitrate, vbvSize);
			vbvDelay = vbvDelayRange.recommand;
			$vbvDelay.val(vbvDelay);
			this.ChangeText($vbvDelay[0]);
		}
	};
	
	this.ValidatorBitrate = function() {
		var $bitrate = $(JS_VIDEO_BITRATE, this.dom);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) return;
		
		var codec = this.GetCodecType();
		var rateControl = $(JS_VIDEO_RATE_CONTROL, this.dom).val();
		var o = this.CalcBitrateRange(codec, rateControl);
		if(bitrate < o.min || bitrate > o.max) {
			outStr = str_warning.outOfRange.format(o.min, o.max);
			alert(outStr);
		}
	};
	
	this.ValidatorMaxBitrate = function() {
		var $video = $(this.dom);
		var $bitrate = $video.find(JS_VIDEO_BITRATE);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) return;
		
		var maxBitrate = 0;
		var $maxBitrate = $video.find(JS_VIDEO_MAX_BITRATE);
		maxBitrate = parseInt($maxBitrate.val());
		if(isNaN(maxBitrate)) return;
		
		var o = this.CalcMaxBitrateRange(bitrate);
		if(maxBitrate < o.min || maxBitrate > o.max) {
			outStr = str_warning.outOfRange.format(o.min, o.max);
			alert(outStr);
		}
	};
	
	this.ValidatorVBVSize = function() {
		var $video = $(this.dom);
		var $bitrate = $video.find(JS_VIDEO_BITRATE);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) return;
		
		var maxBitrate = 0;
		var $maxBitrate = $video.find(JS_VIDEO_MAX_BITRATE);
		maxBitrate = parseInt($maxBitrate.val());
		if(isNaN(maxBitrate)) maxBitrate = 0;
		
		var vbvSize = 0;
		var $vbvSize = $video.find(JS_VIDEO_BUFFER_SIZE);
		vbvSize = parseInt($vbvSize.val());
		if(isNaN(vbvSize)) return;
		bitrate = Math.max(bitrate, maxBitrate);
		var o = this.CalcVBVSizeRange(bitrate);
		if(vbvSize < o.min || vbvSize > o.max) {
			outStr = str_warning.outOfRange.format(o.min, o.max);
			alert(outStr);
		}
	};
	
	this.ValidatorBufferFill = function() {
		var $video = $(this.dom);
		var $bitrate = $video.find(JS_VIDEO_BITRATE);
		if($bitrate[0].disabled) return;
		var bitrate = parseInt($bitrate.val());
		if(isNaN(bitrate)) return;
		
		var maxBitrate = 0;
		var $maxBitrate = $video.find(JS_VIDEO_MAX_BITRATE);
		maxBitrate = parseInt($maxBitrate.val());
		if(isNaN(maxBitrate)) maxBitrate = 0;
		bitrate = Math.max(bitrate, maxBitrate);
		
		var vbvSize = 0;
		var $vbvSize = $video.find(JS_VIDEO_BUFFER_SIZE);
		vbvSize = parseInt($vbvSize.val());
		if(isNaN(vbvSize)) return;
		
		var vbvDelay = 0;
		var $vbvDelay = $video.find(JS_VIDEO_BUFFER_FILL);
		vbvDelay = parseInt($vbvDelay.val());
		if(isNaN(vbvDelay)) return; 
		var o = this.CalcVBVDelayRange(bitrate, vbvSize);
		if(vbvDelay < o.min || vbvDelay > o.max) {
			outStr = str_warning.outOfRange.format(o.min, o.max);
			alert(outStr);
		}
	};

	this.SetVideoProfile = function(profile){
		$(JS_VIDEO_CODEC_PROFILE, this.dom).val(profile);
	};

	this.SetRateControl = function(rateMode) {
		$(JS_VIDEO_RATE_CONTROL, this.dom).val(rateMode);		
	};

	this.SetResolution = function(width, height) {
		$(JS_VIDEO_WIDTH, this.dom).val(width);
		$(JS_VIDEO_HEIGHT, this.dom).val(height);
		var resolution = width + "x" + height;
		$(JS_VIDEO_RESOLUTION, this.dom).val(resolution);
	};

	this.SetAspectRatio = function(parX, parY){
		$(JS_VIDEO_PAR_X, this.dom).val(parX);
		$(JS_VIDEO_PAR_Y, this.dom).val(parY);
		var aspect = parX + ":" + parY;
		$(JS_VIDEO_PAR_DISP, this.dom).val(aspect);
	};

	this.SetBitDepth = function(bitDepth) {
		$(JS_VIDEO_BIT_DEPTH, this.dom).val(bitDepth);
	};

	this.SetColorFormat = function(colorFormat) {
		$(JS_VIDEO_COLOR_FORMAT, this.dom).val(colorFormat);
	};

	this.SetGopSize = function(gopSize){
		$(JS_VIDEO_GOP_SIZE, this.dom).val(gopSize);
	};

	this.SetBFrame = function(bFrame){
		$(JS_VIDEO_B_FRAME, this.dom).val(bFrame);
	};

	this.SetInterlace = function(interface) {
		$(JS_VIDEO_INTERLACE, this.dom).val(interface);
	};

	this.SetFrameRate = function(framerate) {
		var fraction = videoData.getFractionByFrameRate(framerate);
		if(fraction != null) {
			$(JS_VIDEO_FRAMERATE, this.dom).val(framerate);
			$(JS_VIDEO_FRAMERATE_X, this.dom).val(fraction[0]);
			$(JS_VIDEO_FRAMERATE_Y, this.dom).val(fraction[1]);
			
			var floatFr = parseInt(framerate) / 1000;
			$(JS_VIDEO_FRAMERATE_DISP, this.dom).val(floatFr);
		}
	};	
	
	this.SetBitrate = function(bitrate) {
		$(this.dom).find(JS_VIDEO_BITRATE).val(bitrate);
		this.UpdateBitrate();
	};
	
	this.GetBitrate = function() {
		return $(JS_VIDEO_BITRATE, this.dom).val();
	};
	
	this.GetFrameRateText = function() {
		var value = "";
		var fr = $(JS_VIDEO_FRAMERATE, this.dom).val();
		var x = parseInt($(JS_VIDEO_FRAMERATE_X, this.dom).val());
		var y = parseInt($(JS_VIDEO_FRAMERATE_Y, this.dom).val());
		
		if(fr == VIDEO_FOLLOW_SOURCE) {
			value = "";
		}
		else if(isNaN(x) || isNaN(y) || y == 0) {
			value = "";
		}
		else {
			value = String(parseInt(x * 1000 / y) / 1000.0) + "fps";
		}

		return value;
	};
	
	this.GetRateControlText = function() {
		var codec = this.GetCodecType();
		if(codec == VIDEO_CODEC_DNXHD || codec == VIDEO_CODEC_PRORES || codec == VIDEO_CODEC_DV) return "";
		var $rate = $(this.dom).find(JS_VIDEO_RATE_CONTROL);
		var value = "";
		if($rate.length != 0 && !$rate[0].disabled) {
			value = $rate.val();
		}
		return value;
	};
	
	this.GetBitrateText = function() {
		var $bitrate = $(this.dom).find(JS_VIDEO_BITRATE);
		var value = "";
		if(!$bitrate[0].disabled) {
			value = $bitrate.val() + "Kbps";
		}
		return value;
	};
	
	this.GetCodecType = function() {
		return $(JS_VIDEO_CODEC, this.dom).val();
	};
	
	this.GetCodecTag = function() {
		var codec = this.GetCodecType();
		var tag = uGetMapValue(codecTagMap, codec);
		return tag;
	};
	
	/*o: {parSource: true/false, parx: xxx, pary: xxx}*/
	this.GetAspectRatio = function() {
		var o = {};
		
		o.par = this.GetValueByJS(JS_VIDEO_PAR);
		o.parSource = o.par == VIDEO_FOLLOW_SOURCE? true: false;
		
		o.parx = this.GetValueByJS(JS_VIDEO_PAR_X);
		o.parx = parseInt(o.parx);
		if(isNaN(o.parx)) {
			o.parx = 1;
			o.parSource = true;
		}
		
		o.pary = this.GetValueByJS(JS_VIDEO_PAR_Y);
		o.pary = parseInt(o.pary);
		if(isNaN(o.pary)) {
			o.pary = 1;
			o.parSource = true;
		}
		
		return o;
	};
	
	this.GetResolution = function() {
		var o = {};
		
		o.width = this.GetValueByJS(JS_VIDEO_WIDTH);
		o.width = parseInt(o.width);
		if(isNaN(o.width)) o.width = null;
		
		o.height = this.GetValueByJS(JS_VIDEO_HEIGHT);
		o.height = parseInt(o.height);
		if(isNaN(o.height)) o.height = null;
		
		return o;
	};

	this.OnInfoChange = function() {
		if(this.videoDescription == null) return;
		this.videoDescription.OnInfoChange();
	};
	
	this.BindInfoChanger = function() {
		var context = this;
		for(var i = 0; i < infoChanger.length; i++) {
			var sel = infoChanger[i];
			$(sel, this.dom).change(function() {
				context.OnInfoChange();
			});
		}
	};
	
	/* XML submit*/
	this.GetValueByJS = function(selector) {
		var value = null;
		var $sel = $(selector, this.dom);
		if($sel.length == 0 || $sel.get(0).disabled) {
			value = null;
		}
		else if($sel.attr('type') == "checkbox") {
			var checkVal = $sel.val();
			if(checkVal == "on") {
				if($sel.get(0).checked) {
					value = ENABLE_TRUE;
				} else {
					value = ENABLE_FALSE;
				}
			}
			else {
				if($sel.get(0).checked) {
					value = checkVal;
				} else {
					value = null;
				}
			}
		} else {
			value = $sel.val();
		}
		return value;
	};
	
	this.GetValueInXML = function(selector) {
		var value = this.GetValueByJS(selector);
		if(value == null || value.length == 0) {
			if(selector == JS_VIDEO_PAR_X || selector == JS_VIDEO_PAR_Y
				|| selector == JS_VIDEO_FRAMERATE_X || selector == JS_VIDEO_FRAMERATE_Y) {
				value = "-1";
			}
			else if(selector == JS_VIDEO_CODEC_ID) {
				value = null;
			}
		}
		return value;
	};
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		
		//some old tasks have no deviceId and qualityLevel
		this.syncQualityLevelData();
		
		var codec = this.GetCodecType();
		var tagMap = h264TagMap;
		if(codec == VIDEO_CODEC_H264) {
			tagMap = h264TagMap;
		} else if(codec == VIDEO_CODEC_AVS) {
			tagMap = h264TagMap;
		} else if(codec == VIDEO_CODEC_H265) {
			tagMap = h265TagMap;
		} else if(codec == VIDEO_CODEC_MPEG2) {
			tagMap = mpeg2TagMap;
		} else if(codec == VIDEO_CODEC_MPEG4) {
			tagMap = mpeg4TagMap;
		} else if(codec == VIDEO_CODEC_MPEG1) {
			tagMap = mpeg1TagMap;
		} else if(codec == VIDEO_CODEC_WMV) {
			tagMap = wmvTagMap;
		} else if(codec == VIDEO_CODEC_H263) {
			tagMap = h263TagMap;
		} else if(codec == VIDEO_CODEC_DV) {
			tagMap = dvTagMap;
		} else if(codec == VIDEO_CODEC_PRORES) {
			tagMap = proresTagMap;
		} else if(codec == VIDEO_CODEC_RAW) {
			tagMap = rawTagMap;
		} else if(codec == VIDEO_CODEC_DNXHD) {
			tagMap = dnxhdTagMap;
		} else if(codec == VIDEO_CODEC_S263) {
			tagMap = h263TagMap;
		}
		
		var len = tagMap.length;
		var value = "";
		for(var i = 0; i < len; i++) {
			value = this.GetValueInXML(tagMap[i].value);
			if(value == null) continue;
			xml.Node(tagMap[i].key, value);
		}
	};
	
	this.FormatText = function() {
		if(this.dom == null) return;
		var text = "";
		var valueArr = [];
		
		var domSel = $(JS_VIDEO_CODEC, this.dom).get(0);
		if(domSel.selectedIndex >= 0 && domSel.options.length > 0) {
			valueArr[0] = domSel.options[domSel.selectedIndex].text;
		} else {
			valueArr[0] = "";
		}
		
		if(this.GetCodecType() == VIDEO_CODEC_PASSTHROUGH) {
			return valueArr[0];
		}
		
		var resx = parseInt($(JS_VIDEO_WIDTH, this.dom).val());
		var resy = parseInt($(JS_VIDEO_HEIGHT, this.dom).val());
		if(isNaN(resx) || isNaN(resy) || resx <=0 || resy <= 0) {
			valueArr[1] = "";
		} else {
			valueArr[1] = resx + "x" + resy;
		}
		valueArr[2] = this.GetFrameRateText();
		valueArr[3] = this.GetRateControlText();
		valueArr[4] = this.GetBitrateText();
		
		var formatText = str_output.videoBreviary;
		text = formatText.format(valueArr[0], valueArr[1], valueArr[2], valueArr[3], valueArr[4], valueArr[5]);
		return text;
	};
	
	/* Field operate */
	this.SetPrefixField = function(prefix) {
		this.prefixField = prefix;
	};
	
	this.SetFieldIndex = function(i) {
		this.fieldIndex = i;
	};
	
	this.GetFullField = function() {
		var field = "";
		if(this.fieldIndex == null) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}
		return field;
	};
	
	this.UpdateElementName = function() {
		if(this.dom == null) return;
		
		//some old tasks have no deviceId and qualityLevel
		this.syncQualityLevelData();
		
		var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};
		this.UpdateSubElement();
	};
	
	this.UpdateSubElement = function() {
		var prefix = this.GetFullField();
	};
	/* Field operate end */
}

VideoCodec.prototype = {
	ChangeText: function(dom) {
		$(dom).addClass(CLASS_CHANGED_TEXT);
	},
	
	RevertText: function(dom) {
		$(dom).removeClass(CLASS_CHANGED_TEXT);
	},
	
	RestoreDefault: function(dom, value) {
		if(value == null) return;
		var domType = $(dom).attr("type");
		if(domType == "checkbox"){
			if(value == ENABLE_TRUE) {
				dom.checked = true;
			} else {
				dom.checked = false;
			}
		} else {
			$(dom).val(value);
		}
	},
	
	DisableDom: function(dom) {
		dom.disabled = true;
		var domType = $(dom).attr("type"); 
		if(domType == "checkbox"){
			dom.checked = false;
		} else {
			$(dom).val("");
		}
	},
	
	CalcBitrateRange: function(codec, rateControl) {
		if(codec == VIDEO_CODEC_H263
				|| codec == VIDEO_CODEC_S263) {
			return bitrateRangeH263;
		} else if(codec == VIDEO_CODEC_MPEG2) {
			if(rateControl == VIDEO_RATE_CONTROL_CBR) {
				return bitrateRangeH263;
			} else {
				return bitrateRange;
			}
		} else {
			return bitrateRange;
		}
	},
	
	CalcMaxBitrateRange: function(bitrate) {
		var maxBitrateFactor = {min: 1.0, max: 5, recommand: 3};
		var o = {};
		o.min = Math.floor(bitrate * maxBitrateFactor.min);
		o.max = Math.floor(bitrate * maxBitrateFactor.max);
		o.recommand = Math.floor(bitrate * maxBitrateFactor.recommand);
		return o;
	},
	
	CalcVBVSizeRange: function(bitrate) {
		var rc = $(JS_VIDEO_RATE_CONTROL, this.dom).val();
		var vbvSizeFactor = {min: 0.05, max: 20, recommand: 1};
		var o = {};
		o.min = Math.ceil(bitrate * vbvSizeFactor.min / 8);
		o.max = Math.ceil(bitrate * vbvSizeFactor.max / 8);
		if(rc == "CBR") {
			o.recommand = Math.ceil(bitrate * 0.7 * vbvSizeFactor.recommand / 8);
		}
		else {
			o.recommand = Math.ceil(bitrate * vbvSizeFactor.recommand / 8);
		}
		return o;
	},
	
	CalcVBVDelayRange: function(bitrate, vbvSize) {
		var o = {};
		o.min = 48;
		o.max = Math.floor(vbvSize * 8 * 1000 / bitrate);
		o.recommand = o.max;
		return o;
	},
		
	onAspectRatioSelected : function(key) {
		var $par = $(JS_VIDEO_PAR, this.dom);
		var $parx = $(JS_VIDEO_PAR_X, this.dom);
		var $pary = $(JS_VIDEO_PAR_Y, this.dom);
		var $parDisp = $(JS_VIDEO_PAR_DISP, this.dom);
		if(key == VIDEO_FOLLOW_SOURCE) {
			$parDisp.val(str_output.source);
			$par.val(key).change();
		}
		else if(key == VIDEO_CUSTOM) {
			var array = g_LineSelector.getInputValues(key);
			if(array.length == 2) {
				var x = parseInt(array[0]);
				var y = parseInt(array[1]);
				if(!isNaN(x) && !isNaN(y) && y != 0) {
					$parDisp.val(x + ":" + y);
					$parx.val(x);
					$pary.val(y);
					$par.val(key).change();
				}
			}
		}
		else {
			var array = key.split(":");
			if(array.length == 2) {
				var x = parseInt(array[0]);
				var y = parseInt(array[1]);
				if(!isNaN(x) && !isNaN(y) && y != 0) {
					$parDisp.val(x + ":" + y);
					$parx.val(x);
					$pary.val(y);
					$par.val(key).change();
				}
			}
		}
	},
	
	onFrameRateSelected : function(key) {
		var $fr = $(JS_VIDEO_FRAMERATE, this.dom);
		var $frx = $(JS_VIDEO_FRAMERATE_X, this.dom);
		var $fry = $(JS_VIDEO_FRAMERATE_Y, this.dom);
		var $frDisp = $(JS_VIDEO_FRAMERATE_DISP, this.dom);
		
		if(key == VIDEO_FOLLOW_SOURCE) {
			$frDisp.val(str_output.source);
			$fr.val(key).change();
		}
		else if(key == VIDEO_CUSTOM) {
			var array = g_LineSelector.getInputValues(key);
			if(array.length == 2) {
				var x = parseInt(array[0]);
				var y = parseInt(array[1]);
				
				if(!isNaN(x) && !isNaN(y) && y != 0) {
					var frDisp = parseInt(x * 1000 / y) / 1000.0;
					$frDisp.val(frDisp);
					$frx.val(x);
					$fry.val(y);
					$fr.val(key).change();
				}
			}
		}
		else {
			var array = key.split(":");
			if(array.length == 2) {
				var x = parseInt(array[0]);
				var y = parseInt(array[1]);
				
				if(!isNaN(x) && !isNaN(y)) {
					var frDisp = parseInt(x * 1000 / y) / 1000.0;
					$frDisp.val(frDisp);
					$frx.val(x);
					$fry.val(y);
					$fr.val(key).change();
				}
			}
		}
	},
	
	onResolutionSelected : function(key) {
		var $resx = $(JS_VIDEO_WIDTH, this.dom);
		var $resy = $(JS_VIDEO_HEIGHT, this.dom);
		var $res = $(JS_VIDEO_RESOLUTION, this.dom);
		
		if(key == VIDEO_FOLLOW_SOURCE) {
			$resx.val(-1);
			$resy.val(-1);
			$res.val(str_output.source).change();
		}
		else if(key == VIDEO_CUSTOM) {
			var array = g_LineSelector.getInputValues(key);
			if(array.length == 2) {
				var x = parseInt(array[0]);
				var y = parseInt(array[1]);
				if(!isNaN(x) && !isNaN(y)) {
					$resx.val(x);
					$resy.val(y);
					$res.val(x + "x" + y).change();
				}
			}
		}
		else {
			var array = key.split("x");
			if(array.length == 2) {
				var x = parseInt(array[0]);
				var y = parseInt(array[1]);
				if(!isNaN(x) && !isNaN(y)) {
					$resx.val(x);
					$resy.val(y);
					$res.val(x + "x" + y).change();
				}
			}
		}
	},
	
	getTotalBitrate : function() {
		var bitrate = null;
		var $maxBitrate = $(JS_VIDEO_MAX_BITRATE, this.dom);
		if($maxBitrate.length > 0 && !$maxBitrate.get(0).disabled) {
			bitrate = $maxBitrate.val();
		}
		else {
			bitrate = $(JS_VIDEO_BITRATE, this.dom).val();
		}
		
		return bitrate;
	},
	
	updateQualityLevelDisp : function(bChange) {
		var deviceId = $(JS_DEVICE_ID, this.dom).val();
		var qualityLevel = $(JS_QUALITY_LEVEL, this.dom).val();
		var $qlDisp = $(JS_QUALITY_LEVEL_DISP, this.dom);
		var ql = policyData.getQualityLevel(this.GetCodecType(), deviceId);
		
		uUpdateSelect($qlDisp.get(0), ql);

		if(deviceId == DEVICE_ID_CPU) {
			$qlDisp.val(qualityLevel);
		} else {
			$qlDisp.val(QUALITY_LEVEL_HARD);
			
			setInputText($(JS_VIDEO_THREAD_COUNT, this.dom).get(0), "", true);
			setInputText($(JS_VIDEO_LOOK_HEAD_FRAME, this.dom).get(0), "", true);
			setSelect($(JS_VIDEO_SCD, this.dom).get(0), null, true);
		}
		
		if(bChange) {
			$qlDisp.change();
		}
	},
	
	calcDeviceId: function() {
		var value = $(JS_QUALITY_LEVEL_DISP, this.dom).val();
		if(value == QUALITY_LEVEL_HARD) {
			return DEVICE_ID_HARDWARE;
		} else {
			return DEVICE_ID_CPU;
		}
	},
	
	syncQualityLevelData: function() {
		var deviceId = this.calcDeviceId();
		var qualityLevelDisp = $(JS_QUALITY_LEVEL_DISP, this.dom).val();
		
		$(JS_DEVICE_ID, this.dom).val(deviceId);
		if(qualityLevelDisp != QUALITY_LEVEL_HARD) {
			$(JS_QUALITY_LEVEL, this.dom).val(qualityLevelDisp);
		}
	},
	
	onQualityLevelChange : function(qualityLevel) {
		var codec = this.GetCodecType();
		if(codec == VIDEO_CODEC_H264) {
			this.onH264QualityLevelChange(qualityLevel);
		}
		else if(codec == VIDEO_CODEC_H265) {
			this.onH265QualityLevelChange(qualityLevel)
		}
	},
	
	onH264QualityLevelChange: function(qualityLevel) {
		setCheckBox($(JS_TWO_PASS, this.dom).get(0), videoData.getH264DefaultTwoPass(qualityLevel));
		
		var dScd = videoData.getH264DefaultSceneDetection(qualityLevel);
		setSelect($(JS_VIDEO_SCD, this.dom).get(0), dScd[0], dScd[1]);
		
		$(JS_VIDEO_CODEC_PROFILE, this.dom).val(videoData.getH264DefaultProfile(qualityLevel)).change();
		
		var dThreadCount = videoData.getH264DefaultThreadCount(qualityLevel);
		setInputText($(JS_VIDEO_THREAD_COUNT, this.dom).get(0), dThreadCount[0], dThreadCount[1]);
		
		var dLookHeadFrame = videoData.getH264DefaultLookHeadFrame(qualityLevel);
		setInputText($(JS_VIDEO_LOOK_HEAD_FRAME, this.dom).get(0), dLookHeadFrame[0], dLookHeadFrame[1]);
		
		$(JS_VIDEO_CODEC_LEVEL, this.dom).val("-1");
		$(JS_VIDEO_GOP_MODE_ID, this.dom).val("1");
	},
	
	onH265QualityLevelChange: function(qualityLevel) {
		$(JS_VIDEO_CODEC_PROFILE, this.dom).val(VIDEO_PROFILE_AUTO);
		$(JS_VIDEO_CODEC_LEVEL, this.dom).val("-1");
		$(JS_VIDEO_GOP_MODE_ID, this.dom).val("1");
		
		setCheckBox($(JS_TWO_PASS, this.dom).get(0), false);
		
		var dScd = videoData.getH264DefaultSceneDetection(qualityLevel);
		setSelect($(JS_VIDEO_SCD, this.dom).get(0), dScd[0], dScd[1]);
		
		$(JS_VIDEO_MAX_CU_SIZE, this.dom).val(videoData.getDefaultMaxCU(qualityLevel));
		$(JS_VIDEO_MAX_CU_DEPTH, this.dom).val(videoData.getDefaultCUDepth(qualityLevel));
		$(JS_VIDEO_MAX_TU_SIZE, this.dom).val(videoData.getDefaultMaxTU(qualityLevel));
		$(JS_VIDEO_MIN_TU_SIZE, this.dom).val(videoData.getDefaultMinTU(qualityLevel));
		$(JS_VIDEO_MAX_INTRA_TU_DEPTH, this.dom).val(videoData.getH265DefaultMaxIntraTUDepth(qualityLevel));
		$(JS_VIDEO_MAX_INTER_TU_DEPTH, this.dom).val(videoData.getH265DefaultMaxInterTUDepth(qualityLevel));
		
		setCheckBox($(JS_VIDEO_SAO, this.dom).get(0), videoData.getDefaultSao(qualityLevel));
		setCheckBox($(JS_VIDEO_AMP, this.dom).get(0), videoData.getDefaultAmp(qualityLevel));
		setCheckBox($(JS_VIDEO_LOOP_FILTER, this.dom).get(0), true);
		
		var dLookHewdFrame = videoData.getH265DefaultLookHeadFrame(qualityLevel);
		setInputText($(JS_VIDEO_LOOK_HEAD_FRAME, this.dom).get(0), dLookHewdFrame[0], dLookHewdFrame[1]);
		
		var dThreadCount = videoData.getH265DefaultThreadCount(qualityLevel);
		setInputText($(JS_VIDEO_THREAD_COUNT, this.dom).get(0), dThreadCount[0], dThreadCount[1]);
		
		$(JS_VIDEO_WPP_THREAD_COUNT, this.dom).val("-1");
	},
	
	updateGopType: function() {
		var arr = videoData.getGopType();
		uUpdateSelect($(JS_VIDEO_GOP_TYPE, this.dom).get(0), arr);
	},
	
	updateByActionType : function() {
		if(g_taskSupport != null) {
			var taskAction = g_taskSupport.getActionType();
			if(taskAction == "runtime") {
				$(JS_VIDEO_CODEC, this.dom).hide();
				$(JS_VIDEO_RATE_CONTROL, this.dom).hide();
				
				$(".VideoCodecText", this.dom).show();
				$(".VideoRateControlText", this.dom).show();
			}
		}
	},
	
	getDeviceEncode: function() {
		var $deviceEncode = $(".DeviceEncode", this.dom);
		if($deviceEncode.length > 0) {
			if($deviceEncode.get(0).checked) {
				return $deviceEncode.val();
			}
		}
		return "0";
	},
	
	updateGopByBframe: function() {
		var codec = this.GetCodecType();
		var device = this.getDeviceEncode();
		var bFrame = $(JS_VIDEO_B_FRAME, this.dom).val();
		var gop = $(JS_VIDEO_GOP_SIZE, this.dom).val();
		
		var map = videoData.getGopSizeByCodec(codec, device, bFrame);
		var found = false;
		for(var i = 0; i < map.length; i++) {
			if(map[i].key == gop) {
				found = true;
				break;
			}
		}
		if(!found) {
			$(JS_VIDEO_GOP_SIZE, this.dom).val(map[0].key);
		}
	},
	
	onDeviceEncodeChange: function() {
		var device = this.getDeviceEncode();
		$(JS_DEVICE_ID, this.dom).val(device);
		this.updateQualityLevelDisp(true);
		if(device == "1") {
			this.SetResolution(720, 576);
			this.SetFrameRate("25000");
			$(JS_VIDEO_B_FRAME, this.dom).val(0);
			$(JS_VIDEO_GOP_SIZE, this.dom).val(30);
		}
	}
};
