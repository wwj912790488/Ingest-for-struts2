var INPUT_TYPE_SDI		="SDI";
var INPUT_TYPE_CVBS		="CVBS";
var INPUT_TYPE_HDMI		="HDMI";
var INPUT_TYPE_AES_EBU		="AESEBU";
var INPUT_TYPE_ASI		="ASI";
var INPUT_TYPE_NETWORK	="Network";
var INPUT_TYPE_FILE		="LocalFile";
var INPUT_TYPE_BD		="BD";
var INPUT_TYPE_DVD		="DVD";
var INPUT_TYPE_P2		="P2";
var INPUT_TYPE_COMBINATION		="COMBINATION";
var INPUT_TYPE_OSS		="OSS";

var INPUT_PROTOCOL_TSOVERUDP ="TSOverUDP";
var INPUT_PROTOCOL_TSOVERRTP ="TSOverRTP";
var INPUT_PROTOCOL_ESOVERRTP ="ESOverRTP";
var INPUT_PROTOCOL_HTTP ="HTTP";
var INPUT_PROTOCOL_RTSP ="RTSP";
var INPUT_PROTOCOL_RTMP ="RTMP";
var INPUT_PROTOCOL_FTP ="FTP";
var INPUT_PROTOCOL_MMS = "MMS";

var inputData = new Object();
inputData.license = {};

inputData.type = [
	{key: INPUT_TYPE_FILE, value: "File"},
	{key: INPUT_TYPE_NETWORK, value: "Network"},
	{key: INPUT_TYPE_SDI, value: "SDI"},
	{key: INPUT_TYPE_CVBS, value: "CVBS"},
	{key: INPUT_TYPE_HDMI, value: "HDMI"},
	{key: INPUT_TYPE_AES_EBU, value: "AES/EBU"},
	{key: INPUT_TYPE_ASI, value: "ASI"},
	{key: INPUT_TYPE_BD, value: "BD"},
	{key: INPUT_TYPE_DVD, value: "DVD"},
	{key: INPUT_TYPE_P2, value: "P2"}
	];

inputData.license.type = [
	{key: INPUT_TYPE_FILE, value: license.INPUT_FILE},
	{key: INPUT_TYPE_NETWORK, value: license.INPUT_NETWORK},
	{key: INPUT_TYPE_SDI, value: license.INPUT_CABLE_HDSDI},
	{key: INPUT_TYPE_CVBS, value: license.INPUT_CABLE_CVBS},
	{key: INPUT_TYPE_HDMI, value: license.INPUT_CABLE_HDMI},
	{key: INPUT_TYPE_AES_EBU, value: license.INPUT_CABLE_AES_EBU},
	{key: INPUT_TYPE_ASI, value: license.INPUT_CABLE_ASI},
	{key: INPUT_TYPE_BD, value: license.INPUT_BD},
	{key: INPUT_TYPE_DVD, value: license.INPUT_DVD},
	{key: INPUT_TYPE_P2, value: license.INPUT_P2}
	];

inputData.protocol = [
	{key: INPUT_PROTOCOL_TSOVERUDP, value: "TSOverUDP"},
	{key: INPUT_PROTOCOL_TSOVERRTP, value: "TSOverRTP"},
	{key: INPUT_PROTOCOL_ESOVERRTP, value: "ESOverRTP"},
	{key: INPUT_PROTOCOL_HTTP, value: "HTTP"},
	{key: INPUT_PROTOCOL_RTSP, value: "RTSP"},
	{key: INPUT_PROTOCOL_RTMP, value: "RTMP"},
	{key: INPUT_PROTOCOL_MMS, value: "MMS"},
	{key: INPUT_PROTOCOL_FTP, value: "FTP"}
	];

inputData.license.protocol = [
	{key: INPUT_PROTOCOL_TSOVERUDP, value: license.INPUT_NETWORK_TSOVERUDP},
	{key: INPUT_PROTOCOL_TSOVERRTP, value: license.DISABLED},
	{key: INPUT_PROTOCOL_ESOVERRTP, value: license.INPUT_NETWORK_ESOVERRTP},
	{key: INPUT_PROTOCOL_HTTP, value: license.INPUT_NETWORK_HTTP},
	{key: INPUT_PROTOCOL_RTSP, value: license.INPUT_NETWORK_RTSP},
	{key: INPUT_PROTOCOL_RTMP, value: license.INPUT_NETWORK_RTMP},
	{key: INPUT_PROTOCOL_MMS, value: license.DISABLED},
	{key: INPUT_PROTOCOL_FTP, value: license.INPUT_NETWORK_FTP}
	];

inputData.protocolHead = [
	{key: INPUT_PROTOCOL_TSOVERUDP,	value: "udp://"},
	{key: INPUT_PROTOCOL_TSOVERRTP,	value: "/"},
	{key: INPUT_PROTOCOL_ESOVERRTP,	value: "/"},
	{key: INPUT_PROTOCOL_HTTP,	value: "http://"},
	{key: INPUT_PROTOCOL_RTSP,	value: "rtsp://"},
	{key: INPUT_PROTOCOL_RTMP,	value: "rtmp://"},
	{key: INPUT_PROTOCOL_MMS,	value: "mms://"},
	{key: INPUT_PROTOCOL_FTP, value: "ftp://"}
	];

inputData.inputFormat = [
	{key: "Auto",	value: "Auto"},
	{key: "NTSC",	value: "NTSC"},
	{key: "NTSC2398",	value: "NTSC2398"},
	{key: "PAL",	value: "PAL"},
	{key: "NTSCp",	value: "NTSCp"},
	{key: "PALp",	value: "PALp"},
	{key: "HD1080p2398",	value: "HD1080p2398"},
	{key: "HD1080p24",	value: "HD1080p24"},
	{key: "HD1080p25",	value: "HD1080p25"},
	{key: "HD1080p2997",	value: "HD1080p2997"},
	{key: "HD1080p30",	value: "HD1080p30"},
	{key: "HD1080i50",	value: "HD1080i50"},
	{key: "HD1080i5994",	value: "HD1080i5994"},
	{key: "HD1080i60",	value: "HD1080i60"},
	{key: "HD1080p50",	value: "HD1080p50"},
	{key: "HD1080p5994",	value: "HD1080p5994"},
	{key: "HD1080p60",	value: "HD1080p60"},
	{key: "HD720p50",	value: "HD720p50"},
	{key: "HD720p5994",	value: "HD720p5994"},
	{key: "HD720p60",	value: "HD720p60"}
	];

inputData.fillType = [
	{key: "0", value: str_common.close},
	{key: "1", value: str_input.filltype_video},
	{key: "2", value: str_input.filltype_audio},
	{key: "3", value: str_input.filltype_video_audio}
	];

/*license control*/
inputData.type = uLicenseFilterKey(inputData.type, inputData.license.type);
inputData.protocol = uLicenseFilterKey(inputData.protocol, inputData.license.protocol);

/* function */
inputData.getTypeArray = function() {
	return inputData.type;
};

inputData.getProtocolArray = function() {
	return inputData.protocol;
};

inputData.getProtocolHead = function(protocol) {
	var value = uGetMapValue(inputData.protocolHead, protocol);
	return value;
};

inputData.getInputFormat = function() {
	return inputData.inputFormat;
};

inputData.getFillType = function() {
	return inputData.fillType;
};
