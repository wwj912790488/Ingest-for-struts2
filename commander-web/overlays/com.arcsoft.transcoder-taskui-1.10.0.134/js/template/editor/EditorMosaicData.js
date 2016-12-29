var MOSAIC_TYPE_MOSAIC = "0";
var MOSAIC_TYPE_ERASE = "1";
var MOSAIC_TYPE_BLUR = "2";

var editorMosaicData = new Object();

editorMosaicData.blur = [
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

editorMosaicData.mosiacType = [
	{key: MOSAIC_TYPE_MOSAIC, value: g_string.mosaic.type_mosaic},
	{key: MOSAIC_TYPE_ERASE, value: g_string.mosaic.type_erase},
	{key: MOSAIC_TYPE_BLUR, value: g_string.mosaic.type_blur}
];

/* function */
editorMosaicData.getBlur = function() {
	return editorMosaicData.blur;
};

editorMosaicData.getType = function() {
	return editorMosaicData.mosiacType;
};
