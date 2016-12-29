var OUTPUT_GROUP_APPLE		="AppleStreaming";
var OUTPUT_GROUP_ARCHIVE	="FileArchive";
var OUTPUT_GROUP_FLASH		="FlashStreaming";
var OUTPUT_GROUP_MSS		="MSStreaming";
var OUTPUT_GROUP_UDP		="UdpStreaming";
var OUTPUT_GROUP_RTP		="RtpStreaming";
var OUTPUT_GROUP_HTTP		="HttpStreaming";
var OUTPUT_GROUP_ASI		="AsiStreaming";
var OUTPUT_GROUP_SDI		="SdiStreaming";

var CONTAINER_3GP		="3GP";
var CONTAINER_HLS		="HLS";
var CONTAINER_TS		="TS";
var CONTAINER_MP4		="MP4";
var CONTAINER_RTMP		="RTMP";
var CONTAINER_FLV		="FLV";
var CONTAINER_ASF		="ASF";
var CONTAINER_MOV		="MOV";
var CONTAINER_AVI		="AVI";
var CONTAINER_PS		="PS";
var CONTAINER_MKV		="MKV";
var CONTAINER_MXF		="MXF";
var CONTAINER_AAC		="File_AAC";
var CONTAINER_MP3		="File_MP3";
var CONTAINER_WMA		="File_WMA";
var CONTAINER_MP2		="File_MP2";
var CONTAINER_AMR		="File_AMR";
var CONTAINER_AC3		="File_AC3";
var CONTAINER_OGG		="File_OGG";
var CONTAINER_WAV		="File_WAV";
var CONTAINER_TSOVERUDP	="UDPOverTS";	//special name
var CONTAINER_ESOVERRTP ="RTPOverES";	//special name
var CONTAINER_TSOVERRTP ="RTPOverTS";	//special name
var CONTAINER_TSOVERHTTP ="TSOverHTTP";
var CONTAINER_FLVOVERHTTP ="FLVOverHTTP";
var CONTAINER_MP3OVERHTTP ="MP3OverHTTP";
var CONTAINER_MSS		="MSSmoothStreaming";
var CONTAINER_ASI		="ASIStreaming";
var CONTAINER_SDI		="SDIStreaming";

var ENCRYPTION_TYPE_NONE = "";
var ENCRYPTION_TYPE_AES128 = "AES128";
var ENCRYPTION_TYPE_AES256 = "AES256";

var SUPPORT_ALL			="all";

var HLS_MOUNT_POINT = "/mnt/data/remote/hls/";

var outputGroupData = new Object();
outputGroupData.license = {};

outputGroupData.type = [
	{key: OUTPUT_GROUP_ARCHIVE,	value: str_output.fileArchive},
	{key: OUTPUT_GROUP_APPLE,	value: str_output.appleLive},
	{key: OUTPUT_GROUP_FLASH,	value: str_output.flash},
	{key: OUTPUT_GROUP_UDP,		value: str_output.udp},
	{key: OUTPUT_GROUP_RTP,		value: str_output.rtp},
	{key: OUTPUT_GROUP_HTTP,	value: str_output.http},
	{key: OUTPUT_GROUP_MSS,		value: str_output.mss},
	{key: OUTPUT_GROUP_SDI,		value: str_output.sdi},
	{key: OUTPUT_GROUP_ASI,		value: str_output.asi}
	];

outputGroupData.license.type = [
	{key: OUTPUT_GROUP_ARCHIVE,	value: license.EX_OUTPUT_FILE},
	{key: OUTPUT_GROUP_APPLE,	value: license.EX_OUTPUT_APPLE_STREAMING},
	{key: OUTPUT_GROUP_FLASH,	value: license.EX_OUTPUT_FLASH_STREAMING},
	{key: OUTPUT_GROUP_UDP,		value: license.EX_OUTPUT_UDP_STREAMING},
	{key: OUTPUT_GROUP_RTP,		value: license.EX_OUTPUT_RTP_STREAMING},
	{key: OUTPUT_GROUP_HTTP,	value: license.EX_OUTPUT_HTTP_STREAMING},
	{key: OUTPUT_GROUP_MSS,		value: license.EX_OUTPUT_MS_SMOOTH_STREAMING},
	{key: OUTPUT_GROUP_SDI,		value: license.EX_OUTPUT_SDI_STREAMING},
	{key: OUTPUT_GROUP_ASI,		value: license.EX_OUTPUT_ASI_STREAMING}
	];

outputGroupData.container = [
	{key: CONTAINER_HLS,	value: "HLS"},
	{key: CONTAINER_3GP,	value: "3GP"},
	{key: CONTAINER_TS,		value: "MPEG-2 TS"},
	{key: CONTAINER_MP4,	value: "MPEG-4"},
	{key: CONTAINER_FLV,	value: "MPEG-4 FLV"},
	{key: CONTAINER_ASF,	value: "ASF/WMV"},
	{key: CONTAINER_MOV,	value: "Quicktime MOV"},
	{key: CONTAINER_AVI,	value: "AVI"},
	{key: CONTAINER_PS,		value: "MPEG2 PS"},
	{key: CONTAINER_MKV,	value: "MKV"},
	{key: CONTAINER_MXF,	value: "MXF"},
	{key: CONTAINER_AAC,	value: "AAC"},
	{key: CONTAINER_MP3,	value: "MP3"},
	{key: CONTAINER_WMA,	value: "WMA"},
	{key: CONTAINER_MP2,	value: "MP2"},
	{key: CONTAINER_AMR,	value: "AMR"},
	{key: CONTAINER_AC3,	value: "AC3"},
	{key: CONTAINER_OGG,	value: "OGG"},
	{key: CONTAINER_WAV,	value: "WAV"},
	{key: CONTAINER_RTMP,	value: "RTMP"},
	{key: CONTAINER_TSOVERUDP,	value: "TSOverUDP"},
	{key: CONTAINER_ESOVERRTP,	value: "ESOverRTP"},
	{key: CONTAINER_TSOVERRTP,	value: "TSOverRTP"},
	{key: CONTAINER_TSOVERHTTP,	value: "TSOverHTTP"},
	{key: CONTAINER_FLVOVERHTTP,	value: "FLVOverHTTP"},
	{key: CONTAINER_MP3OVERHTTP,	value: "MP3OverHTTP"},
	{key: CONTAINER_MSS,	value: "MSS"},
	{key: CONTAINER_SDI,	value: "SDI Streaming"},
	{key: CONTAINER_ASI,	value: "ASI Streaming"}
	];

outputGroupData.containerVideo = [
	{key: CONTAINER_HLS,	value: ["H264", "H265", "MPEG2","PassThrough"]},
	{key: CONTAINER_3GP,	value: ["H264", "H265", "H263", "MPEG4", "PassThrough"]},
	{key: CONTAINER_TS,		value: ["H264", "H265", "AVS", "MPEG2","PassThrough"]},
	{key: CONTAINER_MP4,	value: ["H264", "H265", "MPEG4", "H263", "PassThrough"]},
	{key: CONTAINER_FLV,	value: ["H264", "S263", "PassThrough"]},
	{key: CONTAINER_ASF,	value: ["VC-1","PassThrough"]},
	{key: CONTAINER_MOV,	value: ["H264", "H265", "MPEG4", "H263", "DNxHD", "ProRes", "DV","PassThrough"]},
	{key: CONTAINER_AVI,	value: ["H264", "MPEG2", "DNxHD","PassThrough"]},
	{key: CONTAINER_PS,		value: ["MPEG1", "MPEG2","PassThrough"]},
	{key: CONTAINER_MKV,	value: ["H264","PassThrough"]},
	{key: CONTAINER_MXF,	value: ["MPEG2", "DNxHD", "DV", "H264","PassThrough"]}, /*AVCIntral*/
	{key: CONTAINER_MSS,	value: ["H264","PassThrough"]},
	{key: CONTAINER_AAC,	value: []},
	{key: CONTAINER_MP3,	value: []},
	{key: CONTAINER_WMA,	value: []},
	{key: CONTAINER_MP2,	value: []},
	{key: CONTAINER_AMR,	value: []},
	{key: CONTAINER_AC3,	value: []},
	{key: CONTAINER_OGG,	value: []},
	{key: CONTAINER_WAV,	value: []},
	{key: CONTAINER_RTMP,	value: ["H264"]},
	{key: CONTAINER_TSOVERUDP,	value: ["H264", "AVS", "H265", "MPEG2"]},
	{key: CONTAINER_ESOVERRTP,	value: ["H264", "H263", "H265", "MPEG4"]},
	{key: CONTAINER_TSOVERRTP,	value: ["H264", "AVS", "H265", "MPEG2"]},
	{key: CONTAINER_TSOVERHTTP,	value: ["H264", "AVS", "H265", "MPEG2"]},
	{key: CONTAINER_FLVOVERHTTP,	value: ["H264", "S263"]},
	{key: CONTAINER_MP3OVERHTTP,	value: []},
	{key: CONTAINER_SDI,	value: ["RAW"]},
	{key: CONTAINER_ASI,	value: ["H264", "AVS", "H265", "MPEG2"]}
	];

outputGroupData.containerAudio = [
	{key: CONTAINER_HLS,	value: ["AAC", "MP2", "AC3", "DD+", "DTS", "PassThrough"]},
	{key: CONTAINER_3GP,	value: ["PCM", "AAC", "AMR", "MP3", "AC3", "DD+","PassThrough"]},
	{key: CONTAINER_TS,		value: ["AAC", "MP2", "AC3", "DD+", "DTS", "PassThrough"]},
	{key: CONTAINER_MP4,	value: ["PCM", "AAC", "AMR", "MP3", "AC3", "DD+", "DTS","PassThrough"]},
	{key: CONTAINER_FLV,	value: ["AAC", "MP3","PassThrough"]},
	{key: CONTAINER_ASF,	value: ["WMA","PassThrough"]},
	{key: CONTAINER_MOV,	value: ["PCM", "AAC", "AMR", "MP3", "AC3", "DD+","PassThrough"]},
	{key: CONTAINER_AVI,	value: ["PCM", "AAC", "MP2", "AC3","PassThrough"]},
	{key: CONTAINER_PS,		value: ["MP2", "AC3","PassThrough"]},
	{key: CONTAINER_MKV,	value: ["AAC","PassThrough"]},
	{key: CONTAINER_MXF,	value: ["PCM","PassThrough"]},
	{key: CONTAINER_MSS,	value: ["AAC","PassThrough"]},
	{key: CONTAINER_AAC,	value: ["AAC","PassThrough"]},
	{key: CONTAINER_MP3,	value: ["MP3","PassThrough"]},
	{key: CONTAINER_WMA,	value: ["WMA","PassThrough"]},
	{key: CONTAINER_MP2,	value: ["MP2","PassThrough"]},
	{key: CONTAINER_AMR,	value: ["AMR","PassThrough"]},
	{key: CONTAINER_AC3,	value: ["AC3","PassThrough"]},
	{key: CONTAINER_OGG,	value: ["Vorbis","PassThrough"]},
	{key: CONTAINER_WAV,	value: ["PCM","PassThrough"]},
	{key: CONTAINER_RTMP,	value: ["AAC"]},
	{key: CONTAINER_TSOVERUDP,	value: ["AC3", "AAC", "MP2", "DD+"]},
	{key: CONTAINER_ESOVERRTP,	value: ["AAC", "AMR"]},
	{key: CONTAINER_TSOVERRTP,	value: ["AC3", "AAC", "MP2", "DD+"]},
	{key: CONTAINER_TSOVERHTTP,	value: ["AC3", "AAC", "MP2", "DD+"]},
	{key: CONTAINER_FLVOVERHTTP,	value: ["AAC", "MP3"]},
	{key: CONTAINER_MP3OVERHTTP,	value: ["MP3"]},
	{key: CONTAINER_SDI,	value: ["PCM"]},
	{key: CONTAINER_ASI,	value: ["AC3", "AAC", "MP2" ,"DD+"]}
	];

outputGroupData.extensionMap = [
	{key: CONTAINER_HLS,	value: "m3u8"},
	{key: CONTAINER_3GP,	value: "3gp"},
	{key: CONTAINER_TS,		value: "ts"},
	{key: CONTAINER_MP4,	value: "mp4"},
	{key: CONTAINER_FLV,	value: "flv"},
	{key: CONTAINER_ASF,	value: "wmv"},
	{key: CONTAINER_MOV,	value: "mov"},
	{key: CONTAINER_AVI,	value: "avi"},
	{key: CONTAINER_PS,		value: "mpg"},
	{key: CONTAINER_MKV,	value: "mkv"},
	{key: CONTAINER_MXF,	value: "mxf"},
	{key: CONTAINER_AAC,	value: "adts"},
	{key: CONTAINER_MP3,	value: "mp3"},
	{key: CONTAINER_WMA,	value: "wma"},
	{key: CONTAINER_MP2,	value: "mp2"},
	{key: CONTAINER_AMR,	value: "amr"},
	{key: CONTAINER_AC3,	value: "ac3"},
	{key: CONTAINER_OGG,	value: "ogg"},
	{key: CONTAINER_WAV,	value: "wav"},
	{key: CONTAINER_RTMP,	value: "rtmp"},
	{key: CONTAINER_TSOVERUDP,	value: "ts"},
	{key: CONTAINER_ESOVERRTP,	value: "ts"},
	{key: CONTAINER_TSOVERRTP,	value: "ts"},
	{key: CONTAINER_TSOVERHTTP,	value: "ts"},
	{key: CONTAINER_FLVOVERHTTP,	value: "flv"},
	{key: CONTAINER_MSS,	value: "ismv"}
	];

outputGroupData.codecLicense = [
	{key: "H264", value: license.VIDEO_ENCODER_H264},
	{key: "MPEG2", value: license.VIDEO_ENCODER_MPEG2},
	{key: "H263", value: license.VIDEO_ENCODER_H263},
	{key: "S263", value: license.VIDEO_ENCODER_S263},
	{key: "VC-1", value: license.VIDEO_ENCODER_WMV9},
	{key: "MPEG1", value: license.VIDEO_ENCODER_MPEG1},
	{key: "MPEG4", value: license.VIDEO_ENCODER_MPEG4},
	{key: "AVS", value: license.VIDEO_ENCODER_AVS},
	{key: "H265", value: license.VIDEO_ENCODER_H265},
	{key: "ProRes", value: license.VIDEO_ENCODER_PRORES},
	{key: "RAW", value: license.VIDEO_ENCODER_RAW},
	{key: "DNxHD", value: license.VIDEO_ENCODER_DNXHD},
	{key: "DV", value: license.VIDEO_ENCODER_DV},
	{key: "AAC", value: license.AUDIO_ENCODER_AAC},	
	{key: "MP2", value: license.AUDIO_ENCODER_MP2},
	{key: "MP3", value: license.AUDIO_ENCODER_MP3},
	{key: "WMA", value: license.AUDIO_ENCODER_WMA},
	{key: "AMR", value: license.AUDIO_ENCODER_AMR},
	{key: "AC3", value: license.AUDIO_ENCODER_AC3},
	{key: "DTS", value: license.AUDIO_ENCODER_DTS},
	{key: "Vorbis", value: license.AUDIO_ENCODER_VORBIS},
	{key: "PCM", value: license.AUDIO_ENCODER_PCM},
	{key: "DD+", value: license.AUDIO_ENCODER_DDP},
	{key: "PassThrough", value: license.VIDEO_ENCODER_PASSTHROUGH}
	];

outputGroupData.containerMap = [
	{key: OUTPUT_GROUP_ARCHIVE,	value: [CONTAINER_TS, CONTAINER_MP4, 
	                           	        CONTAINER_FLV, CONTAINER_MOV, 
	                           	        CONTAINER_ASF, CONTAINER_3GP, 
	                           	        CONTAINER_AVI, CONTAINER_HLS, 
	                           	        CONTAINER_PS, CONTAINER_MKV,
	                           	        CONTAINER_MXF, CONTAINER_MSS,
	                           	        CONTAINER_AAC, CONTAINER_MP3,
	                           	        CONTAINER_WMA, CONTAINER_MP2,
	                           	        CONTAINER_AMR, CONTAINER_AC3,
	                           	        CONTAINER_OGG, CONTAINER_WAV]},
	{key: OUTPUT_GROUP_APPLE,	value: [CONTAINER_HLS]},
	{key: OUTPUT_GROUP_FLASH,	value: [CONTAINER_RTMP]},
	{key: OUTPUT_GROUP_UDP,	value: [CONTAINER_TSOVERUDP]},
	{key: OUTPUT_GROUP_RTP,	value: [CONTAINER_ESOVERRTP, CONTAINER_TSOVERRTP]},
	{key: OUTPUT_GROUP_HTTP,	value: [CONTAINER_TSOVERHTTP, CONTAINER_FLVOVERHTTP, CONTAINER_MP3OVERHTTP]},
	{key: OUTPUT_GROUP_MSS,	value: [CONTAINER_MSS]},
	{key: OUTPUT_GROUP_SDI,	value: [CONTAINER_SDI]},
	{key: OUTPUT_GROUP_ASI,	value: [CONTAINER_ASI]}
	];

outputGroupData.license.containerMap = [
	{key: OUTPUT_GROUP_ARCHIVE,	value: [license.OUTPUT_FILE_TS, license.OUTPUT_FILE_MP4, 
	                           	        license.OUTPUT_FILE_FLV, license.OUTPUT_FILE_MOV,  
	                           	        license.OUTPUT_FILE_ASF, license.OUTPUT_FILE_3GP, 
	                           	        license.OUTPUT_FILE_AVI, license.OUTPUT_FILE_HLS,
	                           	        license.OUTPUT_FILE_PS, license.OUTPUT_FILE_MKV,
	                           	        license.OUTPUT_FILE_MXF, license.OUTPUT_FILE_MSSMOOTHSTREAMING,
	                           	        license.OUTPUT_FILE_AAC, license.OUTPUT_FILE_MP3,
	                           	        license.OUTPUT_FILE_WMA, license.OUTPUT_FILE_MP2,
	                           	        license.OUTPUT_FILE_AMR, license.OUTPUT_FILE_AC3,
	                           	        license.OUTPUT_FILE_OGG, license.OUTPUT_FILE_WAV]},
	{key: OUTPUT_GROUP_APPLE,	value: [license.OUTPUT_STREAM_HLS]},
	{key: OUTPUT_GROUP_FLASH,	value: [license.OUTPUT_STREAM_RTMP]},
	{key: OUTPUT_GROUP_UDP,	value: [license.OUTPUT_STREAM_TSOVERUDP]},
	{key: OUTPUT_GROUP_RTP,	value: [license.OUTPUT_STREAM_ESOVERRTP, license.DISABLED]},
	{key: OUTPUT_GROUP_HTTP,	value: [license.OUTPUT_STREAM_TSOVERHTTP, license.OUTPUT_STREAM_FLVOVERHTTP, license.OUTPUT_STREAM_MP3OVERHTTP]},
	{key: OUTPUT_GROUP_MSS,	value: [license.OUTPUT_STREAM_MSSMOOTHSTREAMING]},
	{key: OUTPUT_GROUP_SDI,	value: [license.OUTPUT_STREAM_SDISTREAMING]},
	{key: OUTPUT_GROUP_ASI,	value: [license.OUTPUT_STREAM_ASISTREAMING]}
	];

/**
 * These definition should be same as MultiLineTab.js.
 * MultiLineTab icon.
 */
outputGroupData.containerIcon = [
	{key: CONTAINER_HLS, 			value: "MLT_ICON_HLS"},
	{key: CONTAINER_TS, 			value: "MLT_ICON_TS"},
	{key: CONTAINER_MP4, 			value: "MLT_ICON_MP4"},
	{key: CONTAINER_FLV, 			value: "MLT_ICON_FLV"},
	{key: CONTAINER_MOV, 			value: "MLT_ICON_MP4"},
	{key: CONTAINER_TSOVERUDP, 		value: "MLT_ICON_TS"},
	{key: CONTAINER_ESOVERRTP, 		value: "MLT_ICON_TS"},
	{key: CONTAINER_TSOVERRTP,	value: "MLT_ICON_TS"},
	{key: CONTAINER_TSOVERHTTP,	value: "MLT_ICON_TS"},
	{key: CONTAINER_FLVOVERHTTP,	value: "MLT_ICON_FLV"},
	{key: CONTAINER_ASI, 		value: "MLT_ICON_TS"}
	];

outputGroupData.outputCountLimit = [
	{key: CONTAINER_HLS, 			value: 9999},
	{key: CONTAINER_MXF, 			value: 9999},
	{key: CONTAINER_MSS, 			value: 9999}
	];

outputGroupData.encryptionType = [
	{key: ENCRYPTION_TYPE_NONE, value: "None"},
	{key: ENCRYPTION_TYPE_AES128, value: "AES-128"}/*,
	{key: ENCRYPTION_TYPE_AES256, value: "AES-256"}*/
	];

outputGroupData.segmentType = [
	{key: "0", value: str_output.segment_type_normal},
	{key: "1", value: str_output.segment_type_24h_record},
	{key: "2", value: str_output.segment_type_epg_file}
	];

outputGroupData.playlistType = [
	{key: "0", value: str_common.off},
	{key: "1", value: "EVENT"}
	];

outputGroupData.segmentRecordLength = [
	{key: "600", value: "10"},
	{key: "900", value: "15"},
	{key: "1200", value: "20"},
	{key: "1800", value: "30"},
	{key: "3600", value: "60"},
	{key: "7200", value: "120"}
	];

outputGroupData.targetNameMacroLive = [
	{key: "${DATE}", value: str_macro.date},
	{key: "${TIME}", value: str_macro.time},
	{key: "${YEAR}", value: str_macro.year},
	{key: "${MONTH}", value: str_macro.month},
	{key: "${DAY}", value: str_macro.day},
	{key: "${WIDTH}", value: str_macro.width},
	{key: "${HEIGHT}", value: str_macro.height},
	{key: "${BITRATE}", value: str_macro.bitrate},
	{key: "${AUDIOENCODER}", value: str_macro.audio_encoder},
	{key: "${VIDEOENCODER}", value: str_macro.video_encoder}
	];

outputGroupData.targetNameMacroCloud = [
	{key: "${DATE}", value: str_macro.date},
	{key: "${TIME}", value: str_macro.time},
	{key: "${YEAR}", value: str_macro.year},
	{key: "${MONTH}", value: str_macro.month},
	{key: "${DAY}", value: str_macro.day},
	{key: "${FILENAME}", value: str_macro.filename},
	{key: "${FILENAME_PINYIN}", value: str_macro.filename_pinyin},
	{key: "${PROGRAM}", value: str_macro.program},
	{key: "${WIDTH}", value: str_macro.width},
	{key: "${HEIGHT}", value: str_macro.height},
	{key: "${BITRATE}", value: str_macro.bitrate},
	{key: "${AUDIOENCODER}", value: str_macro.audio_encoder},
	{key: "${VIDEOENCODER}", value: str_macro.video_encoder},
	{key: "${TASKNAME}", value: str_macro.task_name},
	{key: "${yyyy}", value: str_macro.yyyy},
	{key: "${MM}", value: str_macro.MM},
	{key: "${dd}", value: str_macro.dd},
	{key: "${HH}", value: str_macro.HH},
	{key: "${mm}", value: str_macro.mm},
	{key: "${ss}", value: str_macro.ss}
	];

outputGroupData.playlistMacroCloud = [
	{key: "${DATE}", value: str_macro.date},
	{key: "${TIME}", value: str_macro.time},
	{key: "${YEAR}", value: str_macro.year},
	{key: "${MONTH}", value: str_macro.month},
	{key: "${DAY}", value: str_macro.day},
	{key: "${FILENAME}", value: str_macro.filename},
	{key: "${WIDTH}", value: str_macro.width},
	{key: "${HEIGHT}", value: str_macro.height},
	{key: "${AUDIOENCODER}", value: str_macro.audio_encoder},
	{key: "${VIDEOENCODER}", value: str_macro.video_encoder},
	{key: "${TASKNAME}", value: str_macro.task_name},
	{key: "${id}", value: str_macro.id},
	{key: "${bitrate}", value: str_macro.bitrate_hls},
	{key: "${videobitrate}", value: str_macro.videobitrate}
	];

outputGroupData.playlistMacroLive = [
	{key: "${id}", value: str_macro.id},
	{key: "${bitrate}", value: str_macro.bitrate_hls},
	{key: "${videobitrate}", value: str_macro.videobitrate}
	];

outputGroupData.segmentMacroMap = [
	{key: "${id}", value: str_macro.id},
	{key: "${seq}", value: str_macro.seq},
	{key: "${starttime}", value: str_macro.starttime},
	{key: "${curtime}", value: str_macro.curtime},
	{key: "${bitrate}", value: str_macro.bitrate_hls},
	{key: "${videobitrate}", value: str_macro.videobitrate}
	];

outputGroupData.outputRuntimeSupport = [
	{key: OUTPUT_GROUP_APPLE, value: false},
	{key: OUTPUT_GROUP_ARCHIVE, value: false},
	{key: OUTPUT_GROUP_FLASH, value: true},
	{key: OUTPUT_GROUP_MSS, value: false},
	{key: OUTPUT_GROUP_UDP, value: true},
	{key: OUTPUT_GROUP_RTP, value: true},
	{key: OUTPUT_GROUP_HTTP, value: false},
	{key: OUTPUT_GROUP_ASI, value: false},
	{key: OUTPUT_GROUP_SDI, value: false}
	];

outputGroupData.audioProcessMode = [
	{key:CONTAINER_MOV, value:[{key:"0", value: str_audio.audio_process_default},
               						{key:"1", value: str_audio.audio_process_split}
								//{key:"2", value: str_audio.audio_process_merge},
								//{key:"3", value: str_audio.audio_process_follow_source},
							]},
	{key:CONTAINER_MXF, value:[{key:"0", value: str_audio.audio_process_default},
           						{key:"1", value: str_audio.audio_process_split}
							//{key:"2", value: str_audio.audio_process_merge},
							//{key:"3", value: str_audio.audio_process_follow_source},
						]},
	{key:CONTAINER_AVI, value:[{key:"0", value: str_audio.audio_process_default},
           						{key:"1", value: str_audio.audio_process_split}
							//{key:"2", value: str_audio.audio_process_merge},
							//{key:"3", value: str_audio.audio_process_follow_source},
						]},
	{key:CONTAINER_MP4, value:[{key:"0", value: str_audio.audio_process_default},
           						//{key:"1", value: str_audio.audio_process_split},
							{key:"2", value: str_audio.audio_process_merge},
							{key:"3", value: str_audio.audio_process_follow_source}
						]},
	{key:CONTAINER_TS, value:[{key:"0", value: str_audio.audio_process_default},
           						//{key:"1", value: str_audio.audio_process_split},
							{key:"2", value: str_audio.audio_process_merge},
							{key:"3", value: str_audio.audio_process_follow_source}
						]}

	];

outputGroupData.playlistNameMode = [
	{key:"0", value: str_output.playlist_name_mode0},
	{key:"1", value: str_output.playlist_name_mode1}
	];

outputGroupData.distributeMode = [
	{key:"0", value: str_output.distribute_http_server},
	{key:"1", value: str_output.distribute_local},
	{key:"2", value: str_output.distribute_point}
	];

outputGroupData.license.distributeMode = [
	{key:"0", value: license.ENABLED},
	{key:"1", value: license.OUTPUT_HLS_DISTRIBUTE_LOCAL},
	{key:"2", value: license.OUTPUT_HLS_DISTRIBUTE_POINT}
	];

outputGroupData.deleteUploaded = [
  	{key:"0", value: str_output.hls_reserve_segment},
  	{key:"1", value: str_output.hls_delete_expired},
  	{key:"2", value: str_output.hls_vod_mode}
  	];

outputGroupData.license.deleteUploaded = [
	{key:"0", value: license.ENABLED},
	{key:"1", value: license.ENABLED},
	{key:"2", value: license.OUTPUT_HLS_VOD_LIST}
	];

/*license control*/
outputGroupData.type = uLicenseFilterKey(outputGroupData.type, outputGroupData.license.type);
//outputGroupData.container = uLicenseFilterKey(outputGroupData.container, outputGroupData.license.container);
outputGroupData.containerMap = uLicenseFilterValue(outputGroupData.containerMap, outputGroupData.license.containerMap);
outputGroupData.distributeMode = uLicenseFilterKey(outputGroupData.distributeMode, outputGroupData.license.distributeMode);
outputGroupData.deleteUploaded = uLicenseFilterKey(outputGroupData.deleteUploaded, outputGroupData.license.deleteUploaded);

outputGroupData.GetType = function() {
	var type = outputGroupData.type;
	return type;
};

outputGroupData.GetContainerArray = function(type) {
	var arr = uGetMapValue(outputGroupData.containerMap, type);
	var len = outputGroupData.container.length;
	var ret = new Array();
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < len; j++) {
			var key = outputGroupData.container[j].key;
			if(arr[i] == key) {
				ret[ret.length] = outputGroupData.container[j];
				break;
			}
		}
	}
	return ret;
};

function filterCodecLicense(arr) {
	if(arr == null) return arr;
	var filtedArr = [];
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < outputGroupData.codecLicense.length; j++) {
			if(arr[i] == outputGroupData.codecLicense[j].key) {
				if(GetLicense(outputGroupData.codecLicense[j].value) == license.ENABLED) {
					filtedArr.push(arr[i]);
					break;
				}
			}
		}
	}
	return filtedArr;
}

outputGroupData.GetContainerVideo = function(type) {
	var arr = uGetMapValue(outputGroupData.containerVideo, type);
	var filtedArr = filterCodecLicense(arr);
	return filtedArr;
};

outputGroupData.GetContainerAudio = function(type) {
	var arr = uGetMapValue(outputGroupData.containerAudio, type);
	var filtedArr = filterCodecLicense(arr);
	return filtedArr;
};

outputGroupData.GetExtension = function(container) {
	var value = uGetMapValue(outputGroupData.extensionMap, container);
	return value;
};

outputGroupData.GetOutputLimit = function(container) {
	var value = uGetMapValue(outputGroupData.outputCountLimit, container);
	if(value == null) value = 1;
	return value;
};

outputGroupData.GetEncryptionType = function() {
	return outputGroupData.encryptionType;
};

var Container2Icon = function(container) {
	var value = uGetMapValue(outputGroupData.containerIcon, container);
	if(value == null) value = MLT_ICON_DEFAULT;
	return value;
};

outputGroupData.GetSegmentType = function() {
	return outputGroupData.segmentType;
};

outputGroupData.GetPlaylistType = function() {
	return outputGroupData.playlistType;
};

outputGroupData.GetSegmentRecordLength = function() {
	return outputGroupData.segmentRecordLength;
};

outputGroupData.getTargetNameMacro = function() {
	if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_LIVE
			|| GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
		return outputGroupData.targetNameMacroLive;
	}
	else {
		return outputGroupData.targetNameMacroCloud;
	}
};

outputGroupData.getRuntimeSupport = function(outputGroup) {
	var support = uGetMapValue(outputGroupData.outputRuntimeSupport, outputGroup);
	return support;
};

outputGroupData.getPlaylistMacro = function() {
	if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_LIVE
			|| GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
		return outputGroupData.playlistMacroLive;
	}
	else {
		return outputGroupData.playlistMacroCloud;
	}
};

outputGroupData.getSegmentMacroMap = function() {
	return outputGroupData.segmentMacroMap;
};

outputGroupData.getAudioProcessMode = function(container){	
	for(var i = 0; i < outputGroupData.audioProcessMode.length; i++) {		
		if(outputGroupData.audioProcessMode[i].key == container) {
			return outputGroupData.audioProcessMode[i].value;
		}
	}
};

outputGroupData.getPlaylistNameMode = function(){
	return outputGroupData.playlistNameMode;
};

outputGroupData.getDistributeMode = function() {
	return outputGroupData.distributeMode;
};

outputGroupData.getDeleteUploaded = function() {
	return outputGroupData.deleteUploaded;
};