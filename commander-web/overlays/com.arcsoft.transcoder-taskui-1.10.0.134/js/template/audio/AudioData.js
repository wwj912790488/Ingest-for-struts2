var AUDIO_CODEC_AAC ="AAC";
var AUDIO_CODEC_AMR ="AMR";
var AUDIO_CODEC_MP2 ="MP2";
var AUDIO_CODEC_MP3 ="MP3";
var AUDIO_CODEC_DDPLUS ="DD+";
var AUDIO_CODEC_AC3 ="AC3";
var AUDIO_CODEC_DTS ="DTS";
var AUDIO_CODEC_VORBIS ="Vorbis";
var AUDIO_CODEC_PCM ="PCM";
var AUDIO_CODEC_WMA ="WMA";
var AUDIO_CODEC_PASSTHROUGH ="PassThrough";

var AUDIO_PROFILE_LC ="LC";
var AUDIO_PROFILE_MPEG2LC ="MPEG2LC";
var AUDIO_PROFILE_HEV1 ="HEV1";
var AUDIO_PROFILE_HEV2 ="HEV2";
var AUDIO_PROFILE_MAIN ="MAIN";
var AUDIO_PROFILE_NB ="NB";
var AUDIO_PROFILE_WB ="WB";
var AUDIO_PROFILE_L2 ="L2";
var AUDIO_PROFILE_L3 ="L3";
var AUDIO_PROFILE_V1 ="V1";
var AUDIO_PROFILE_V2 ="V2";
var AUDIO_PROFILE_DDPLUS ="DD+";
var AUDIO_PROFILE_AC3 ="AC3";
var AUDIO_PROFILE_DTS ="DTS";
var AUDIO_PROFILE_VORBIS ="Vorbis";
var AUDIO_PROFILE_PCM ="profilePCM";

var CHANNEL_1 = "1";
var CHANNEL_2 = "2";
var CHANNEL_5 = "5";
var CHANNEL_6 = "6";
var CHANNEL_8 = "8";

var CHANNEL_PROCESSING_NONE = "None";
var CHANNEL_PROCESSING_LEFT = "Left";
var CHANNEL_PROCESSING_RIGHT = "Right";
var CHANNEL_PROCESSING_MIX = "Mix";

var VOLUME_MODE_SOURCE = "0";
var VOLUME_MODE_BOOST = "1";
var VOLUME_MODE_BALANCE = "2";

var ENCODING_MODE_VIDEO = "0";
var ENCODING_MODE_MUSIC = "1";	

var AUDIO_PACKAGEMODE_LATM = "1";
var AUDIO_PACKAGEMODE_ADTS = "2";

var SAMPLERATE_SOURCE = "268435456";	//0x10000000

var audioData = new Object();
audioData.license = {};

audioData.codec = [
	{key: AUDIO_CODEC_AAC, value: "AAC"},
	{key: AUDIO_CODEC_AMR, value: "AMR"},
	{key: AUDIO_CODEC_MP2, value: "MP2"},
	{key: AUDIO_CODEC_MP3, value: "MP3"},
	{key: AUDIO_CODEC_WMA, value: "WMA"},
	{key: AUDIO_CODEC_AC3, value: "AC3"},
	{key: AUDIO_CODEC_DTS, value: "DTS"},
	{key: AUDIO_CODEC_VORBIS, value: "Vorbis"},
	{key: AUDIO_CODEC_PCM, value: "PCM"},
	{key: AUDIO_CODEC_DDPLUS, value: "DD+"},
	{key: AUDIO_CODEC_PASSTHROUGH, value: str_video.passThrough}
	];

audioData.license.codec = [
	{key: AUDIO_CODEC_AAC, value: license.AUDIO_ENCODER_AAC},
	{key: AUDIO_CODEC_AMR, value: license.AUDIO_ENCODER_AMR},
	{key: AUDIO_CODEC_MP2, value: license.AUDIO_ENCODER_MP2},
	{key: AUDIO_CODEC_MP3, value: license.AUDIO_ENCODER_MP3},
	{key: AUDIO_CODEC_WMA, value: license.AUDIO_ENCODER_WMA},
	{key: AUDIO_CODEC_AC3, value: license.AUDIO_ENCODER_AC3},
	{key: AUDIO_CODEC_DTS, value: license.AUDIO_ENCODER_DTS},
	{key: AUDIO_CODEC_VORBIS, value: license.AUDIO_ENCODER_VORBIS},
	{key: AUDIO_CODEC_PCM, value: license.AUDIO_ENCODER_PCM},
	{key: AUDIO_CODEC_DDPLUS, value: license.AUDIO_ENCODER_DDP},
	{key: AUDIO_CODEC_PASSTHROUGH, value: license.AUDIO_ENCODER_PASSTHROUGH}
	];

audioData.profile = [
	{key: AUDIO_PROFILE_LC, value: "LC"},
	{key: AUDIO_PROFILE_MPEG2LC, value: "MPEG2LC"},
	{key: AUDIO_PROFILE_HEV1, value: "HEV1"},
	{key: AUDIO_PROFILE_HEV2, value: "HEV2"},
	{key: AUDIO_PROFILE_MAIN, value: "MAIN"},
	{key: AUDIO_PROFILE_NB, value: "NB"},
	{key: AUDIO_PROFILE_WB, value: "WB"},
	{key: AUDIO_PROFILE_L2, value: "L2"},
	{key: AUDIO_PROFILE_L3, value: "L3"},
	{key: AUDIO_PROFILE_V1, value: "V1"},
	{key: AUDIO_PROFILE_V2, value: "V2"},
	{key: AUDIO_PROFILE_AC3, value: "AC3"},
	{key: AUDIO_PROFILE_DTS, value: "DTS"},
	{key: AUDIO_PROFILE_VORBIS, value: "Vorbis"},
	{key: AUDIO_PROFILE_PCM, value: "PCM"},
	{key: AUDIO_PROFILE_DDPLUS, value: "DD+"}
	];

audioData.profileMap = [
 	{key: AUDIO_CODEC_AAC, value: [AUDIO_PROFILE_LC, AUDIO_PROFILE_MPEG2LC, AUDIO_PROFILE_HEV1, AUDIO_PROFILE_HEV2, AUDIO_PROFILE_MAIN]},
	{key: AUDIO_CODEC_AMR, value: [AUDIO_PROFILE_NB, AUDIO_PROFILE_WB]},
	{key: AUDIO_CODEC_MP2, value: [AUDIO_PROFILE_L2]},
	{key: AUDIO_CODEC_MP3, value: [AUDIO_PROFILE_L3]},
	{key: AUDIO_CODEC_WMA, value: [AUDIO_PROFILE_V1, AUDIO_PROFILE_V2]},
	{key: AUDIO_CODEC_AC3, value: [AUDIO_PROFILE_AC3]},
	{key: AUDIO_CODEC_DTS, value: [AUDIO_PROFILE_DTS]},
	{key: AUDIO_CODEC_VORBIS, value: [AUDIO_PROFILE_VORBIS]},
	{key: AUDIO_CODEC_PCM, value: [AUDIO_PROFILE_PCM]},
	{key: AUDIO_CODEC_DDPLUS, value: [AUDIO_PROFILE_DDPLUS]}
 	];

audioData.packageMode = [
	{key: AUDIO_PACKAGEMODE_LATM, value: "LATM"},
	{key: AUDIO_PACKAGEMODE_ADTS, value: "ADTS"}
];

audioData.packageModeMap = [
    {key: AUDIO_CODEC_AAC, value: [AUDIO_PACKAGEMODE_LATM, AUDIO_PACKAGEMODE_ADTS]}
];

audioData.channels = [
	{key: CHANNEL_1, value: "Mono"},
	{key: CHANNEL_2, value: "Stereo"},
	{key: CHANNEL_6, value: "5.1"},
	{key: CHANNEL_8, value: "7.1"}
	];

audioData.volumeMode = [
	{key: VOLUME_MODE_SOURCE, value: str_audio.volume_mode_source},
	{key: VOLUME_MODE_BOOST, value: str_audio.volume_mode_boost},
	{key: VOLUME_MODE_BALANCE, value: str_audio.volume_mode_balance}
	];

audioData.encodingMode = [
	{key: ENCODING_MODE_VIDEO, value: str_audio.encoding_mode_video},
	{key: ENCODING_MODE_MUSIC, value: str_audio.encoding_mode_music}
	];

audioData.license.volumeMode = [
	{key: VOLUME_MODE_SOURCE, value: license.ENABLED},
	{key: VOLUME_MODE_BOOST, value: license.AUDIO_VOLUME_BOOST},
	{key: VOLUME_MODE_BALANCE, value: license.AUDIO_VOLUME_BALANCE}
	];

audioData.channelProcessing = [
	{key: CHANNEL_PROCESSING_NONE, value: str_audio.channelProcessingNone},
	{key: CHANNEL_PROCESSING_LEFT, value: str_audio.channelProcessingLeft},
	{key: CHANNEL_PROCESSING_RIGHT, value: str_audio.channelProcessingRight},
	{key: CHANNEL_PROCESSING_MIX, value: str_audio.channelProcessingMix}
	];

audioData.channelProcessingMap = [
	{key: CHANNEL_1, value: [CHANNEL_PROCESSING_NONE, CHANNEL_PROCESSING_LEFT, CHANNEL_PROCESSING_RIGHT]},
	{key: CHANNEL_2, value: [CHANNEL_PROCESSING_NONE, CHANNEL_PROCESSING_LEFT, CHANNEL_PROCESSING_RIGHT, CHANNEL_PROCESSING_MIX]},
	{key: CHANNEL_6, value: [CHANNEL_PROCESSING_NONE]},
	{key: CHANNEL_8, value: [CHANNEL_PROCESSING_NONE]}
	];

audioData.bitsPerSample = [
	{key: SAMPLERATE_SOURCE, value: str_output.source},
	//{key: "8", value: "8"},
	{key: "16", value: "16"},
	{key: "24", value: "24"}
	];

audioData.sampleRate = [
	{key: SAMPLERATE_SOURCE, value: str_output.source},
	{key: "8000", value: "8.0"},
	{key: "11025", value: "11.025"},
	{key: "12000", value: "12.0"},
	{key: "16000", value: "16.0"},
	{key: "22050", value: "22.05"},
	{key: "24000", value: "24.0"},
	{key: "32000", value: "32.0"},
	{key: "44100", value: "44.1"},
	{key: "48000", value: "48.0"},
	{key: "64000", value: "64.0"},
	{key: "88200", value: "88.2"},
	{key: "96000", value: "96.0"}
	];

audioData.bitrate = [
	{key: "4750", value: "4.75"},
	{key: "5150", value: "5.15"},
	{key: "5900", value: "5.9"},
	{key: "6000", value: "6.0"},
	{key: "6600", value: "6.6"},
	{key: "6700", value: "6.7"},
	{key: "7000", value: "7.0"},
	{key: "7400", value: "7.4"},
	{key: "7950", value: "7.95"},
	{key: "8000", value: "8.0"},
	{key: "8850", value: "8.85"},
	{key: "10000", value: "10.0"},
	{key: "10200", value: "10.2"},
	{key: "12000", value: "12.0"},
	{key: "12200", value: "12.2"},
	{key: "12650", value: "12.65"},
	{key: "14000", value: "14.0"},
	{key: "14250", value: "14.25"},
	{key: "15850", value: "15.85"},
	{key: "16000", value: "16.0"},
	{key: "18000", value: "18.0"},
	{key: "18250", value: "18.25"},
	{key: "19850", value: "19.85"},
	{key: "20000", value: "20.0"},
	{key: "23050", value: "23.05"},
	{key: "23850", value: "23.85"},
	{key: "24000", value: "24.0"},
	{key: "28000", value: "28.0"},
	{key: "32000", value: "32.0"},
	{key: "40000", value: "40.0"},
	{key: "44000", value: "44.0"},
	{key: "48000", value: "48.0"},
	{key: "52000", value: "52.0"},
	{key: "56000", value: "56.0"},
	{key: "64000", value: "64.0"},
	{key: "80000", value: "80.0"},
	{key: "96000", value: "96.0"},
	{key: "112000", value: "112.0"},
	{key: "128000", value: "128.0"},
	{key: "160000", value: "160.0"},
	{key: "180000", value: "180.0"},
	{key: "192000", value: "192.0"},
	{key: "224000", value: "224.0"},
	{key: "256000", value: "256.0"},
	{key: "320000", value: "320.0"},
	{key: "384000", value: "384.0"},
	{key: "480000", value: "480.0"},
	{key: "512000", value: "512.0"},
	{key: "560000", value: "560.0"},
	{key: "640000", value: "640.0"},
	{key: "768000", value: "768.0"},
	{key: "1024000", value: "1024.0"},
	{key: "1536000", value: "1536.0"},
	{key: "2048000", value: "2048.0"},
	{key: "2560000", value: "2560.0"},
	{key: "3072000", value: "3072.0"},
	{key: "3584000", value: "3584.0"},
	{key: "4096000", value: "4096.0"},
	{key: "6000000", value: "6000.0"}
	];

audioData.channelsMap = [
	//key: profile, 			value: [channel...]
	{key: AUDIO_PROFILE_LC, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6]},
	{key: AUDIO_PROFILE_MPEG2LC, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6]},
	{key: AUDIO_PROFILE_HEV1, value: [CHANNEL_1, CHANNEL_2]},
	{key: AUDIO_PROFILE_HEV2, value: [CHANNEL_2]},
	{key: AUDIO_PROFILE_MAIN, value: [CHANNEL_2]},
	{key: AUDIO_PROFILE_NB, value: [CHANNEL_1]},
	{key: AUDIO_PROFILE_WB, value: [CHANNEL_1]},
	{key: AUDIO_PROFILE_L2, value: [CHANNEL_1, CHANNEL_2]},
	{key: AUDIO_PROFILE_L3, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6, CHANNEL_8]},
	{key: AUDIO_PROFILE_V1, value: [CHANNEL_1, CHANNEL_2]},
	{key: AUDIO_PROFILE_V2, value: [CHANNEL_1, CHANNEL_2]},
	{key: AUDIO_PROFILE_AC3, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6, CHANNEL_8]},
	{key: AUDIO_PROFILE_DTS, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6, CHANNEL_8]},
	{key: AUDIO_PROFILE_VORBIS, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6]},
	{key: AUDIO_PROFILE_PCM, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6, CHANNEL_8]},
	{key: AUDIO_PROFILE_DDPLUS, value: [CHANNEL_1, CHANNEL_2, CHANNEL_6, CHANNEL_8]}
	];

audioData.license.channelsMap = [
	{key: AUDIO_PROFILE_DDPLUS, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51, license.DISABLED]},
	{key: AUDIO_PROFILE_AC3, value : [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51, license.AUDIO_CHANNEL_71]},
	{key: AUDIO_PROFILE_DTS, value : [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51, license.AUDIO_CHANNEL_71]},
	{key: AUDIO_PROFILE_VORBIS, value : [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51]},
	{key: AUDIO_PROFILE_PCM, value : [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51, license.AUDIO_CHANNEL_71]},
	{key: AUDIO_PROFILE_LC, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51]},
	{key: AUDIO_PROFILE_MPEG2LC, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2, license.AUDIO_CHANNEL_51]},
	{key: AUDIO_PROFILE_HEV1, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_HEV2, value: [license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_MAIN, value: [license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_NB, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_WB, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_L2, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_L3, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_V1, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]},
	{key: AUDIO_PROFILE_V2, value: [license.AUDIO_CHANNEL_1, license.AUDIO_CHANNEL_2]}
	];

audioData.boostLevel = [
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

audioData.balanceLevel = [
	{key: "0", value: str_audio.balance_level_low},
	{key: "5", value: str_audio.balance_level_medium},
	{key: "10", value: str_audio.balance_level_high}
	];

audioData.sampleRateMap = [
	{key: AUDIO_PROFILE_LC, value: ["8000", "22050", "24000", "32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_MPEG2LC, value: ["8000", "22050", "24000", "32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_HEV1, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_HEV2, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_MAIN, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_NB, value: ["8000"]},
	{key: AUDIO_PROFILE_WB, value: ["16000"]},
	{key: AUDIO_PROFILE_L2, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_L3, value: ["8000", "11025", "12000", "16000", "22050", "24000", "32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_V1, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_V2, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_AC3, value: ["32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_DTS, value: ["44100", "48000"]},
	{key: AUDIO_PROFILE_VORBIS, value: ["8000", "11025", "12000", "16000", "22050", "24000", "32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_PCM, value: [SAMPLERATE_SOURCE, "8000", "11025", "16000", "22050", "24000", "32000", "44100", "48000"]},
	{key: AUDIO_PROFILE_DDPLUS, value: ["32000", "44100", "48000"]}
	];

audioData.bitrateMap = [
	//key: [profile, channel, sampleRate], value:[bitrate1, bitrate2]
	//AUDIO_PROFILE_LC
	{key: [AUDIO_PROFILE_LC, CHANNEL_1, "8000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_1, "22050"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_1, "24000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_1, "32000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_1, "44100"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_1, "48000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_2, "8000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_2, "22050"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_2, "24000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_2, "32000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_2, "44100"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_2, "48000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_6, "8000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_6, "22050"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_6, "24000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_6, "32000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_6, "44100"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_LC, CHANNEL_6, "48000"], value: ["8000", "64000", "384000"]},
	//AUDIO_PROFILE_MPEG2LC
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_1, "8000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_1, "22050"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_1, "24000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_1, "32000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_1, "44100"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_1, "48000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_2, "8000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_2, "22050"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_2, "24000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_2, "32000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_2, "44100"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_2, "48000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_6, "8000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_6, "22050"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_6, "24000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_6, "32000"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_6, "44100"], value: ["8000", "64000", "384000"]},
	{key: [AUDIO_PROFILE_MPEG2LC, CHANNEL_6, "48000"], value: ["8000", "64000", "384000"]},
	//AUDIO_PROFILE_HEV1
	{key: [AUDIO_PROFILE_HEV1, CHANNEL_1, "32000"], value: ["8000", "12000", "18000", "64000"]},
	{key: [AUDIO_PROFILE_HEV1, CHANNEL_1, "44100"], value: ["10000", "14000", "20000", "24000", "32000", "40000", "64000"]},
	{key: [AUDIO_PROFILE_HEV1, CHANNEL_1, "48000"], value: ["12000", "14000", "20000", "24000", "32000", "40000", "64000"]},
	{key: [AUDIO_PROFILE_HEV1, CHANNEL_2, "32000"], value: ["16000", "128000"]},
	{key: [AUDIO_PROFILE_HEV1, CHANNEL_2, "44100"], value: ["16000", "32000", "40000", "128000"]},
	{key: [AUDIO_PROFILE_HEV1, CHANNEL_2, "48000"], value: ["16000", "32000", "40000", "48000", "128000"]},
	//AUDIO_PROFILE_HEV2
	{key: [AUDIO_PROFILE_HEV2, CHANNEL_1, "32000"], value: ["18000"]},
	{key: [AUDIO_PROFILE_HEV2, CHANNEL_1, "44100"], value: ["14000", "20000", "24000", "32000", "40000"]},
	{key: [AUDIO_PROFILE_HEV2, CHANNEL_1, "48000"], value: ["20000", "24000", "32000", "40000"]},
	{key: [AUDIO_PROFILE_HEV2, CHANNEL_2, "32000"], value: ["8000", "18000", "64000"]},
	{key: [AUDIO_PROFILE_HEV2, CHANNEL_2, "44100"], value: ["12000", "24000", "32000", "40000", "64000"]},
	{key: [AUDIO_PROFILE_HEV2, CHANNEL_2, "48000"], value: ["12000", "24000", "32000", "40000", "64000"]},
	//AUDIO_PROFILE_NB
	{key: [AUDIO_PROFILE_NB, CHANNEL_1, "8000"], value: ["4750", "5150", "5900", "6700", "7400", "7950", "10200", "12200"]},
	{key: [AUDIO_PROFILE_NB, CHANNEL_2, "8000"], value: ["4750", "5150", "5900", "6700", "7400", "7950", "10200", "12200"]},
	//AUDIO_PROFILE_WB
	{key: [AUDIO_PROFILE_WB, CHANNEL_1, "16000"], value: ["6600", "8850", "12650", "14250", "15850", "18250", "19850", "23050", "23850"]},
	{key: [AUDIO_PROFILE_WB, CHANNEL_2, "16000"], value: ["6600", "8850", "12650", "14250", "15850", "18250", "19850", "23050", "23850"]},
	//AUDIO_PROFILE_L2
	{key: [AUDIO_PROFILE_L2, CHANNEL_1, "32000"], value: ["32000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000", "384000"]},
	{key: [AUDIO_PROFILE_L2, CHANNEL_1, "44100"], value: ["32000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000", "384000"]},
	{key: [AUDIO_PROFILE_L2, CHANNEL_1, "48000"], value: ["32000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000", "384000"]},
	{key: [AUDIO_PROFILE_L2, CHANNEL_2, "32000"], value: ["32000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000", "384000"]},
	{key: [AUDIO_PROFILE_L2, CHANNEL_2, "44100"], value: ["32000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000", "384000"]},
	{key: [AUDIO_PROFILE_L2, CHANNEL_2, "48000"], value: ["32000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000", "384000"]},
	//AUDIO_PROFILE_L3
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "8000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "11025"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "12000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "16000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "22050"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "24000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "32000"], value: ["32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "44100"], value: ["32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_1, "48000"], value: ["32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "8000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "11025"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "12000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "16000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "22050"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "24000"], value: ["8000", "16000", "24000", "32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "32000"], value: ["32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "44100"], value: ["32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000"]},
	{key: [AUDIO_PROFILE_L3, CHANNEL_2, "48000"], value: ["32000", "40000", "48000", "56000", "64000", "80000", "96000", "112000", "128000", "160000", "192000", "224000", "256000", "320000"]},
	//Audio PROFILE_V1
	{key: [AUDIO_PROFILE_V1, CHANNEL_1, "32000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V1, CHANNEL_1, "44100"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V1, CHANNEL_1, "48000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V1, CHANNEL_2, "32000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V1, CHANNEL_2, "44100"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V1, CHANNEL_2, "48000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	//Audio PROFILE_V2
	{key: [AUDIO_PROFILE_V2, CHANNEL_1, "32000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V2, CHANNEL_1, "44100"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V2, CHANNEL_1, "48000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V2, CHANNEL_2, "32000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V2, CHANNEL_2, "44100"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	{key: [AUDIO_PROFILE_V2, CHANNEL_2, "48000"], value: ["24000", "32000", "64000", "128000", "192000", "256000", "512000", "768000"]},
	//Audio PROFILE_AC3
	{key: [AUDIO_PROFILE_AC3, CHANNEL_1, "32000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_1, "44100"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_1, "48000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_2, "32000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_2, "44100"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_2, "48000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_6, "32000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_6, "44100"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_6, "48000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_8, "32000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_8, "44100"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	{key: [AUDIO_PROFILE_AC3, CHANNEL_8, "48000"], value: ["64000", "96000", "128000", "192000", "256000", "320000", "480000", "560000", "640000"]},
	//Audio PROFILE_DTS
	{key: [AUDIO_PROFILE_DTS, CHANNEL_1, "44100"], value: ["64000", "96000", "128000"]},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_1, "48000"], value: ["64000", "96000", "128000"]},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_2, "44100"], value: ["96000", "128000", "160000", "192000", "224000", "255000"]},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_2, "48000"], value: ["96000", "128000", "160000", "192000", "224000", "255000"]},	
	{key: [AUDIO_PROFILE_DTS, CHANNEL_6, "44100"], value: ["255000", "318000", "384000", "447000", "510000"]},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_6, "48000"], value: ["255000", "318000", "384000", "447000", "510000"]},	
	{key: [AUDIO_PROFILE_DTS, CHANNEL_8, "44100"], value: ["447000", "510000", "576000", "639000", "768000"]},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_8, "48000"], value: ["447000", "510000", "576000", "639000", "768000"]},
	//AUDIO_PROFILE_VORBIS
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "8000"], value: ["8000", "42000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "11025"], value: ["12000", "50000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "12000"], value: ["12000", "50000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "16000"], value: ["16000", "100000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "22050"], value: ["16000", "90000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "24000"], value: ["16000", "90000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "32000"], value: ["30000", "190000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "44100"], value: ["32000", "240000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_1, "48000"], value: ["32000", "240000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "8000"], value: ["12000", "84000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "11025"], value: ["16000", "100000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "12000"], value: ["16000", "100000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "16000"], value: ["24000", "200000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "22050"], value: ["30000", "180000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "24000"], value: ["30000", "180000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "32000"], value: ["36000", "380000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "44100"], value: ["45000", "500000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_2, "48000"], value: ["45000", "500000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "8000"], value: ["48000", "252000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "11025"], value: ["72000", "300000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "12000"], value: ["72000", "300000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "16000"], value: ["96000", "600000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "22050"], value: ["96000", "540000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "24000"], value: ["96000", "540000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "32000"], value: ["180000", "1140000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "44100"], value: ["84000", "1440000"]},
	{key: [AUDIO_PROFILE_VORBIS, CHANNEL_6, "48000"], value: ["84000", "1440000"]},
	//Audio PROFILE_DDPLUS
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_1, "32000"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_1, "44100"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_1, "48000"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_2, "32000"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_2, "44100"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_2, "48000"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_6, "32000"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_6, "44100"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]},
	{key: [AUDIO_PROFILE_DDPLUS, CHANNEL_6, "48000"], value: ["64000", "192000", "256000", "512000", "768000", "1024000", "1536000", "2048000", "2560000", "3072000", "3584000", "4096000"]}
	];

audioData.defaultBitrateMap = [
	//Audio PROFILE_DTS
	{key: [AUDIO_PROFILE_DTS, CHANNEL_1, "44100"], value: "64000"},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_1, "48000"], value: "64000"},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_2, "44100"], value: "96000"},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_2, "48000"], value: "96000"},	
	{key: [AUDIO_PROFILE_DTS, CHANNEL_6, "44100"], value: "384000"},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_6, "48000"], value: "384000"},	
	{key: [AUDIO_PROFILE_DTS, CHANNEL_8, "44100"], value: "447000"},
	{key: [AUDIO_PROFILE_DTS, CHANNEL_8, "48000"], value: "447000"},
	];

/* function */
/*license control*/
audioData.codec = uLicenseFilterKey(audioData.codec, audioData.license.codec);
audioData.channelsMap = uLicenseFilterValue(audioData.channelsMap, audioData.license.channelsMap);
audioData.volumeMode = uLicenseFilterKey(audioData.volumeMode, audioData.license.volumeMode);

audioData.getCodec = function() {
	return audioData.codec;
};

audioData.getChannels = function(profile) {
	var arr = uGetMapValue(audioData.channelsMap, profile);
	var len = audioData.channels.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = audioData.channels[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = audioData.channels[i];
		}
	}
	return ret;
};

audioData.getBoostLevel = function() {
	return audioData.boostLevel;
};

audioData.getBalanceLevel = function() {
	return audioData.balanceLevel;
};

audioData.getSampleRate = function(profile) {
	var arr = uGetMapValue(audioData.sampleRateMap, profile);
	var len = audioData.sampleRate.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = audioData.sampleRate[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = audioData.sampleRate[i];
		}
	}
	return ret;
};

function bps2Kbps(bps) {
	var kbps = parseFloat(bps) / 1000;
	if(isNaN(kbps)) kbps = 0;
	var value = uFormatNumber(kbps, "?.???");
	return value;
}

audioData.getBitrate = function(profile, channel, sampleRate) {
	var searchArr = [profile, channel, sampleRate];
	var arr = uGetMapValue(audioData.bitrateMap, searchArr);
	if(arr == undefined) return undefined;
	var ret = [];
	for(var i = 0; i < arr.length; i++) {
		var o = {};
		o.key = arr[i];
		o.value = bps2Kbps(arr[i]);
		ret.push(o);
	};
	return ret;
};

audioData.getDefaultBitrate = function(profile, channel, sampleRate) {
	var searchArr = [profile, channel, sampleRate];
	return uGetMapValue(audioData.defaultBitrateMap, searchArr);
};

audioData.getProfile = function(codec) {
	var arr = uGetMapValue(audioData.profileMap, codec);
	var len = audioData.profile.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = audioData.profile[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = audioData.profile[i];
		}
	}
	return ret;
};

audioData.getPackageMode = function(codec) {
	var arr = uGetMapValue(audioData.packageModeMap, codec);
	var len = audioData.packageMode.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = audioData.packageMode[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = audioData.packageMode[i];
		}
	}
	return ret;
}

audioData.getChannelProcessing = function(channel) {
	var arr = uGetMapValue(audioData.channelProcessingMap, channel);
	var len = audioData.channelProcessing.length;
	var ret = new Array();
	for(var i = 0; i < len; i++) {
		var key = audioData.channelProcessing[i].key;
		if(uInArray(arr, key)) {
			ret[ret.length] = audioData.channelProcessing[i];
		}
	}
	return ret;
};

audioData.getVolumeMode = function() {
	return audioData.volumeMode;
};

audioData.getBitsPerSample = function() {
	return audioData.bitsPerSample;
};

audioData.getEncodingMode = function() {
	return audioData.encodingMode;
};
