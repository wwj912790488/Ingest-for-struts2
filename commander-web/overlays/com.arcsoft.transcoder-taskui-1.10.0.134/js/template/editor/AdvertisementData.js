var advertisementData = new Object();

advertisementData.paddingType = [
	{key: "0", value: str_advertisement.reserveTail},
	{key: "1", value: str_advertisement.reserveHead}
];

/* function */
advertisementData.getPaddingType = function() {
	return advertisementData.paddingType;
};

