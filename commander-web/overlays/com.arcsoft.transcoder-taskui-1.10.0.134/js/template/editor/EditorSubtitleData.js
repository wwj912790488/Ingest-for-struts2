var editorSubtitleData = new Object();

editorSubtitleData.chineseFont = [
	{key: g_string.font.FangSong, value: g_string.font.FangSong},
	{key: g_string.font.SimSun, value: g_string.font.SimSun},
	{key: g_string.font.KaiTi, value: g_string.font.KaiTi},
	{key: g_string.font.MSYH, value: g_string.font.MSYH},
	{key: g_string.font.SimHei, value: g_string.font.SimHei}
	];

editorSubtitleData.englishFont = [
 	{key: g_string.font.FangSong, value: g_string.font.FangSong},
 	{key: g_string.font.Arial, value: g_string.font.Arial},
 	{key: g_string.font.SegoeUI, value: g_string.font.SegoeUI},
 	{key: g_string.font.SimSun, value: g_string.font.SimSun},
 	{key: g_string.font.KaiTi, value: g_string.font.KaiTi},
 	{key: g_string.font.MSYH, value: g_string.font.MSYH},
 	{key: g_string.font.SimHei, value: g_string.font.SimHei}
 	];

editorSubtitleData.fontSize = [
	{key: "20", value: "20"},
	{key: "25", value: "25"},
	{key: "30", value: "30"},
	{key: "35", value: "35"},
	{key: "40", value: "40"},
	{key: "45", value: "45"},
	{key: "50", value: "50"},
	{key: "55", value: "55"},
	{key: "60", value: "60"},
	{key: "65", value: "65"},
	{key: "70", value: "70"},
	{key: "75", value: "75"},
	{key: "80", value: "80"},
	{key: "85", value: "85"},
	{key: "90", value: "90"},
	{key: "95", value: "95"},
	{key: "100", value: "100"}
	];

/* function */
editorSubtitleData.getChineseFont = function() {
	return editorSubtitleData.chineseFont;
};

editorSubtitleData.getEnglishFont = function() {
	return editorSubtitleData.englishFont;
};

editorSubtitleData.getFontSize = function() {
	return editorSubtitleData.fontSize;
};

