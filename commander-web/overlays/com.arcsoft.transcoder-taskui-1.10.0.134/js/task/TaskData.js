var ENCODINGPOLICY_BEST = "BestQuality";
var ENCODINGPOLICY_GOOD = "GoodQuality";
var ENCODINGPOLICY_BALANCE = "Balance";
var ENCODINGPOLICY_FAST = "Fast";
var ENCODINGPOLICY_FASTEST = "Fastest";
var ENCODINGPOLICY_CUSTOM = "Custom";

var taskData = new Object();
taskData.license = new Object();

taskData.priority = [
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

taskData.encodingPolicy = [
	{key: ENCODINGPOLICY_CUSTOM, value: str_task.custom},
	{key: ENCODINGPOLICY_BEST, value: str_task.bestQuality},
	{key: ENCODINGPOLICY_GOOD, value: str_task.goodQuality},
	{key: ENCODINGPOLICY_BALANCE, value: str_task.balance},
	{key: ENCODINGPOLICY_FAST, value: str_task.fast},
	{key: ENCODINGPOLICY_FASTEST, value: str_task.fastest}
];

taskData.license.encodingPolicy = [
	{key: ENCODINGPOLICY_BEST, value: license.ENCODINGPOLICY_BEST},
	{key: ENCODINGPOLICY_GOOD, value: license.ENCODINGPOLICY_GOOD},
	{key: ENCODINGPOLICY_BALANCE, value: license.ENCODINGPOLICY_BALANCE},
	{key: ENCODINGPOLICY_FAST, value: license.ENCODINGPOLICY_FAST},
	{key: ENCODINGPOLICY_FASTEST, value: license.ENCODINGPOLICY_FASTEST},
	{key: ENCODINGPOLICY_CUSTOM, value: license.ENABLED}
	];

taskData.gpuId = [
	{key: "-1", value: "AUTO"},
	{key: "0", value: "0"},
	{key: "1", value: "1"},
	{key: "2", value: "2"},
	{key: "3", value: "3"},
	{key: "4", value: "4"},
	{key: "5", value: "5"},
	{key: "6", value: "6"},
	{key: "7", value: "7"},
	{key: "8", value: "8"}
	];

taskData.videoDecoding = [
  	{key: "0", value: "AUTO"},
  	{key: "1", value: "GPU"},
  	{key: "2", value: "CPU"}
  	];

/* license */
taskData.encodingPolicy = uLicenseFilterKey(taskData.encodingPolicy, taskData.license.encodingPolicy);

/* function */
taskData.getPriority = function() {
	return taskData.priority;
};

taskData.getEncodingPolicy = function() {
	return taskData.encodingPolicy;
};

taskData.getGpuId = function() {
	return taskData.gpuId;
};

taskData.getVideoDecoding = function() {
	return taskData.videoDecoding;
};
