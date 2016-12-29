function OutputGroupSupport() {
	var JS_CONTAINER_VIDEO_AUDIO =".ContainerVideoAudio";
	var JS_HLS_SETTING = ".HlsSetting";
	var JS_ARCHIVE_URI_INFO = ".ArchiveUriInfo";
	var JS_APPLE_LIVE_URI_INFO = ".AppleLiveUriInfo";
	
	var groupTagMap = [
		{key: OUTPUT_GROUP_APPLE, value: TAG_APPLE_STREAMING},
		{key: OUTPUT_GROUP_ARCHIVE, value: TAG_FILE_ARCHIVE},
		{key: OUTPUT_GROUP_FLASH, value: TAG_FLASH_STREAMING},
		{key: OUTPUT_GROUP_UDP, value: TAG_UDP_STREAMING},
		{key: OUTPUT_GROUP_RTP, value: TAG_RTP_STREAMING},
		{key: OUTPUT_GROUP_MSS, value: TAG_MS_STREAMING},
		{key: OUTPUT_GROUP_HTTP, value: TAG_HTTP_STREAMING},
		{key: OUTPUT_GROUP_SDI, value: TAG_SDI_STREAMING},
		{key: OUTPUT_GROUP_ASI, value: TAG_ASI_STREAMING}
		];
	
	var tagMap = [
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI},
		{key: TAG_TARGET_NAME,					value: JS_TARGET_NAME},
		{key: TAG_EXTENSION,					value: JS_EXTENSION},
		{key: TAG_SEGMENT_LENGTH,				value: JS_SEGMENT_LENGTH},
		{key: TAG_SEGMENT_RECORD_LENGTH,		value: JS_SEGMENT_RECORD_LENGTH},
		{key: TAG_SEGMENT_TYPE,		value: JS_SEGMENT_TYPE},
		{key: TAG_BUFFER_SIZE,				value: JS_BUFFER_SIZE}
		];
	
	var fileArchiveTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI},
		{key: TAG_TARGET_NAME,					value: JS_TARGET_NAME},
		{key: TAG_EXTENSION,					value: JS_EXTENSION},
		{key: TAG_SEGMENT_LENGTH,				value: JS_SEGMENT_LENGTH},
		{key: TAG_SEGMENT_RECORD_LENGTH,		value: JS_SEGMENT_RECORD_LENGTH},
		{key: TAG_SEGMENT_TYPE,		value: JS_SEGMENT_TYPE},
		{key: TAG_EPG_FILE,		value: JS_EPG_FILE},
		{key: TAG_SEGMENT_NAME,					value: JS_SEGMENT_NAME},
		{key: TAG_PLAYLIST_NAME,				value: JS_PLAYLIST_NAME},
		{key: TAG_IFRAME_PLAYLIST,				value: JS_IFRAME_PLAYLIST},
		{key: TAG_BYTE_RANGE_MODE,				value: JS_BYTE_RANGE_MODE},
		{key: TAG_PLAYLIST_TYPE,				value: JS_PLAYLIST_TYPE}
		];
	
	var appleTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI},
		{key: TAG_TARGET_NAME,					value: JS_TARGET_NAME},
		{key: TAG_SEGMENT_LENGTH,				value: JS_SEGMENT_LENGTH},
		{key: TAG_SEGMENT_NAME,					value: JS_SEGMENT_NAME},
		{key: TAG_PLAYLIST_NAME,				value: JS_PLAYLIST_NAME},
		{key: TAG_PLAYLIST_NAME_MODE,				value: JS_PLAYLIST_NAME_MODE},
		{key: TAG_IFRAME_PLAYLIST,				value: JS_IFRAME_PLAYLIST},
		{key: TAG_DELETE_UPLOADED,				value: JS_DELETE_UPLOADED},
		{key: TAG_ENCRYPTION_TYPE,				value: JS_ENCRYPTION_TYPE},
		{key: TAG_KEY_ROTATION_COUNT,				value: JS_KEY_ROTATION_COUNT},
		{key: TAG_IV_FOLLOWS_SEGMENT,				value: JS_IV_FOLLOWS_SEGMENT},
		{key: TAG_LIVE_MODE,					value: JS_LIVE_MODE},
		{key: TAG_DISTRIBUTE_MODE,					value: JS_DISTRIBUTE_MODE},
		{key: TAG_VOD_TARGET_NAME,					value: JS_VOD_TARGET_NAME},
		{key: TAG_VOD_PLAYLIST_NAME,					value: JS_VOD_PLAYLIST_NAME}
		];
	
	var flashTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
  		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
  		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
  		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI}
  		];
	
	var mmsTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI}
		];
	
	var udpTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI},
		{key: TAG_SOURCE_IP,				value: JS_SOURCE_IP},
		{key: TAG_SOURCE_PORT,				value: JS_SOURCE_PORT},
		{key: TAG_BUFFER_SIZE,				value: JS_BUFFER_SIZE},
		{key: TAG_TTL,				value: JS_TTL},
		{key: TAG_IGMP_SOURCE_IP,				value: JS_IGMP_SOURCE_IP}
		];
	
	var httpTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_CUSTOM_URI},
		{key: TAG_OUTPUT_GROUP_PATH_URI,		value: JS_OUTPUT_GROUP_PATH_URI}
		];
	
	var rtpTagMap =[
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI},
		{key: TAG_SOURCE_IP,				value: JS_SOURCE_IP},
		{key: TAG_SOURCE_PORT,				value: JS_SOURCE_PORT},
		{key: TAG_BUFFER_SIZE,				value: JS_BUFFER_SIZE},
		{key: TAG_TTL,				value: JS_TTL}
		];
	
	var asiTagMap = [
		{key: TAG_ACTIVE,		value: JS_OUTPUT_GROUP_ACTIVE},
		{key: TAG_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: TAG_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: TAG_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_PORT}
		];
	
	var fieldMap = [
		{key: FIELD_ID,							value: JS_OUTPUT_GROUP_ID},
		{key: FIELD_ACTIVE,							value: JS_OUTPUT_GROUP_ACTIVE},
		{key: FIELD_OUTPUT_GROUP_TYPE,			value: JS_OUTPUT_GROUP_TYPE},
		{key: FIELD_OUTPUT_GROUP_SETTING,			value: JS_OUTPUT_GROUP_SETTING},
		{key: FIELD_OUTPUT_GROUP_CONTAINER,		value: JS_OUTPUT_GROUP_CONTAINER},
		{key: FIELD_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_URI},
		{key: FIELD_SEGMENT_LENGTH,				value: JS_SEGMENT_LENGTH},
		{key: FIELD_SEGMENT_RECORD_LENGTH,				value: JS_SEGMENT_RECORD_LENGTH},
		{key: FIELD_SEGMENT_TYPE,				value: JS_SEGMENT_TYPE},
		{key: FIELD_PLAYLIST_TYPE,				value: JS_PLAYLIST_TYPE},
		{key: FIELD_EPG_FILE,				value: JS_EPG_FILE},
		{key: FIELD_TARGET_NAME,					value: JS_TARGET_NAME},
		{key: FIELD_EXTENSION,					value: JS_EXTENSION},
		{key: FIELD_OUTPUTGROUP_SETTING_BUFFER_SIZE,				value: JS_BUFFER_SIZE},
		{key: FIELD_SOURCE_IP,				value: JS_SOURCE_IP},
		{key: FIELD_SOURCE_PORT,				value: JS_SOURCE_PORT},
		{key: FIELD_OUTPUTGROUP_SETTING_TTL,				value: JS_TTL},
		{key: FIELD_OUTPUTGROUP_IGMP_SOURCE_IP,				value: JS_IGMP_SOURCE_IP},
		{key: FIELD_OUTPUT_GROUP_URI,				value: JS_OUTPUT_GROUP_PORT},
		{key: FIELD_OUTPUT_GROUP_CUSTOM_URI,		value: JS_OUTPUT_GROUP_CUSTOM_URI},
		{key: FIELD_OUTPUT_GROUP_PATH_URI,		value: JS_OUTPUT_GROUP_PATH_URI},
		{key: FIELD_SEGMENT_NAME,				value: JS_SEGMENT_NAME},
		{key: FIELD_BYTE_RANGE_MODE,			value: JS_BYTE_RANGE_MODE},
		{key: FIELD_PLAYLIST_NAME,				value: JS_PLAYLIST_NAME},
		{key: FIELD_PLAYLIST_NAME_MODE,				value: JS_PLAYLIST_NAME_MODE},
		{key: FIELD_DELETE_UPLOADED,				value: JS_DELETE_UPLOADED},
		{key: FIELD_ENCRYPTION_TYPE,				value: JS_ENCRYPTION_TYPE},
		{key: FIELD_KEY_ROTATION_COUNT,				value: JS_KEY_ROTATION_COUNT},
		{key: FIELD_IV_FOLLOWS_SEGMENT,				value: JS_IV_FOLLOWS_SEGMENT},
		{key: FIELD_IFRAME_PLAYLIST,				value: JS_IFRAME_PLAYLIST},
		{key: FIELD_DESCRIPTION,					value: JS_OUTPUT_GROUP_DESCRIPTION},
		{key: FIELD_DISTRIBUTE_MODE,					value: JS_DISTRIBUTE_MODE},
		{key: FIELD_VOD_TARGET_NAME,					value: JS_VOD_TARGET_NAME},
		{key: FIELD_VOD_PLAYLIST_NAME,					value: JS_VOD_PLAYLIST_NAME}
		];
	
	var validatorMap = [
		{selector: JS_SEGMENT_LENGTH, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 43200, recommend: ""} },
		{selector: JS_BUFFER_SIZE, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 900000, recommend: 65535} }
		];
	
	this.prefixField = "";
	this.myField = FIELD_OUTPUT_GROUP;
	this.fieldIndex = null;
	
	this.dom = null;
	this.tsao = new TSAdvancedOptions();
	this.mxfsetting = new MxfSetting();
	this.mp4setting = new Mp4Setting();
	this.avisetting = new AviSetting();
	this.esSetting = new ESSetting();
	this.tsOverRtpSetting = new TSOverRTPSetting();
	this.drmOptions = new DRMOptions();
	this.outputArray = [];
	//This property use for UpdateExtension method.
	this.isInitialized = false; 
	this.portParser = new MediaPortParser();
	this.candidateOutputContainer = null;
	this.showExpand = false;
	
	this.SetDOM = function(dom) {
		var context = this;
		this.dom = dom;
		
		$(JS_OUTPUT, this.dom).each(function(i){
			var outputSupport = new OutputSupport();
			outputSupport.Init(this);
			outputSupport.SetOutputGroup(context);
			context.outputArray[i] = outputSupport;
		});
		
		this.candidateOutputContainer = new CandidateOutputContainer();
		this.candidateOutputContainer.Init($(JS_CANDIDATE_OUTPUT_CONTAINER, this.dom).get(0));
	};
	
	this.Display = function(bShow) {
		if(bShow) {
			$(this.dom).show();
		} else {
			$(this.dom).hide();
		}
	};
	
	this.getCursorPosition = function(ctrl) {
		var CaretPos = ctrl.value.length;
		if (document.selection){
			ctrl.focus()
			var Sel = document.selection.createRange ();
			ctrl.focus()
			Sel.moveStart ('character', -ctrl.value.length);
			CaretPos = Sel.text.length;			
		}else if (ctrl.selectionStart || ctrl.selectionStart == '0'){
			CaretPos = ctrl.selectionStart;
		}
		return (CaretPos);
	}
	
	this.Create = function(domTask) {
		var $tmp = $(JS_OUTPUT_GROUP_TEMPLATE);
		if($tmp.length == 0) return null;
		
		var $task = $(domTask);
		
		var	pilot = $task.find(JS_OUTPUT_GROUP_FLOCK).last();
		if(pilot.length == 0) return null;
		
		var $outputGroup = $tmp.clone();
		$outputGroup.show();
		pilot.append($outputGroup.get(0));
		
		this.Init($outputGroup.get(0));
		return this.dom;
	};
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.UpdateType();
		this.UpdateContainer();
		this.UpdateContainerVideoAudio();
		if(!this.IsOutputGroupTypeMatch()) {
			this.ChangeOutputGroupType();
		}
		this.BindOption();
		this.Bind();
		this.UpdateExtension();
		this.UpdateRuntimeSupport();
		this.updatePlaylistNameMode();
		this.updatePlaylistName();
		this.updateDistributeMode();
		this.updateByDistributeMode();
		this.updateDeleteUploaded();
		this.updateByDeleteUploaded();
		this.FillPlaylistType();
		this.FillSegmentType();
		this.FillSegmentRecordLength();
		this.UpdatePlaylistType();
		this.UpdateByteRangeMode();
		this.UpdateSegmentType();		
		this.UpdateSegmentLengthGroup();
		this.UpdateSegmentRecordLength();
		this.UpdateEpgFile();
		this.SortOutput();
		if(!this.IsContainerSettingMatch()) {
			this.CreateContainerSettingDom();
		}
		this.InitContainerSetting();
		if(!this.IsDrmMatch()) {
			this.CreateDrmSettingDom();
		}
		this.InitDrmSetting();
		this.RequestUDPSourceIP();
		
		this.updateDistributePoint();
		this.updateHlsOutputPoint();
		
		if(g_taskSupport != null && g_taskSupport.isCopy()) {
			this.UpdateHttpUrl(true);
		} else {
			this.UpdateHttpUrl(false);
		}
		
		this.UpdatePort();
		this.UpdateHlsSetting();
		this.UpdateEncryptionType();
		this.UpdateCandidateOutput();
		
		if($.isFunction(g_taskSupport.OnOutputGroupInited)){
			g_taskSupport.OnOutputGroupInited(this);
		}
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.UPLOADING_FTP) != license.ENABLED) {
			$(JS_ARCHIVE_URI_INFO, this.dom).remove();
		}
		
		if(GetLicense(license.UPLOADING_HTTP_HLS) != license.ENABLED) {
			$(JS_APPLE_LIVE_URI_INFO, this.dom).remove();
		}
		
		if(GetLicense(license.OUTPUT_FILE_SEGMENT_TYPE) != license.ENABLED) {
			$(JS_SEGMENT_TYPE_ITEM, this.dom).remove();
			$(JS_SEGMENT_RECORD_LENGTH_ITEM, this.dom).remove();
			$(JS_EPG_FILE_ITEM, this.dom).remove();
		}
		
		if(GetLicense(license.OUTPUT_HLS_PLAYLIST_NAME_MODE) != license.ENABLED) {
			$(".LicensePlaylistNameMode", this.dom).remove();
		}
		
		if(GetLicense(license.OUTPUT_HLS_DELETE_UPLOADED) != license.ENABLED) {
			$(".LicenseDeleteUploaded", this.dom).hide();
		}
		
		if(GetLicense(license.OUTPUT_HLS_IFRAME_PLAYLIST) != license.ENABLED) {
			$(".LicenseIframePlaylist", this.dom).hide();
		}
		
		if(GetLicense(license.OUTPUT_HLS_ENCRYPTION) != license.ENABLED) {
			$(".LicenseEncryption", this.dom).hide();
		}
		
		if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
			$(".HlsOutputOpenFile", this.dom).hide();
			$(".SelectHlsOutputPointTrigger", this.dom).show();
			$(".HlsOutputPointItem", this.dom).show();
		}
		else {
			$(".HlsOutputOpenFile", this.dom).show();
			$(".SelectHlsOutputPointTrigger", this.dom).hide();
			$(".HlsOutputPointItem", this.dom).hide();
		}
	};
	
	this.Clone = function() {
		var $mydom = $(this.dom);
		var $newdom = $mydom.clone();
		var $selectArr = $mydom.find('select');
		var $newSelectArr = $newdom.find('select');
		var len = $selectArr.length;
		
		for(var i = 0; i < len; i++) {
			var value = $selectArr.eq(i).val();
			$newSelectArr.eq(i).val(value);
		}
		
		var newOutputGroup = new OutputGroupSupport();
		newOutputGroup.Init($newdom[0]);
		
		return newOutputGroup;
	};
	
	/**
	 * @param {boolean}bChangeOption: change the option or not.
	 */
	this.Bind = function() {
		var context = this;
		
		$(JS_NEW_OUTPUT_TRIGGER, this.dom).click(function() {
			context.NewOutput();
		});
		
		$(JS_OUTPUT_GROUP_TYPE, this.dom).change(function() {
			context.ChangeOutputGroupType();
			context.BindOption();
			var taskSupport = g_taskSupport;
			taskSupport.OnOutputGroupChange(context);
		});
		
		$(JS_OUTPUT_GROUP_CONTAINER, this.dom).change(function() {
			var taskSupport = g_taskSupport;
			taskSupport.OnOutputGroupChange(context);
			context.UpdateContainerVideoAudio();
			context.UpdateExtension();
			context.UpdateRuntimeSupport();
			context.UpdatePlaylistType();			
			context.updatePlaylistNameMode();
			context.updateDistributeMode();
			context.updateByDistributeMode();
			context.updateDeleteUploaded();
			context.updateByDeleteUploaded();
			context.UpdateByteRangeMode();
			context.UpdateSegmentType();
			context.UpdateSegmentLengthGroup();
			context.UpdateSegmentRecordLength();
			context.UpdateEpgFile();
			context.CreateContainerSettingDom();
			context.InitContainerSetting();
			context.CreateDrmSettingDom();
			context.InitDrmSetting();
			context.UpdateNewOutputTrigger();
			context.UpdateHttpUrl(true);
			context.UpdateHlsSetting();
			context.UpdateEncryptionType();
			context.UpdateCandidateOutput();
			context.updateAdvanceOption();
		});
		
		$(JS_OUTPUT_GROUP_DESCRIPTION, this.dom).change(function() {
			g_taskSupport.UpdateOutputGroupDescription(context);
		});
	};

	this.UpdateType = function() {
		var $outputGroupType = $(JS_OUTPUT_GROUP_TYPE, this.dom);
		var srArr = outputGroupData.GetType();
		uUpdateSelect($outputGroupType.get(0), srArr);
	};
	
	this.UpdateContainer = function() {
		var $outputGroup = $(this.dom);
		var type = this.GetGroupType();
		var srArr = outputGroupData.GetContainerArray(type);
		uUpdateSelect($outputGroup.find(JS_OUTPUT_GROUP_CONTAINER).get(0), srArr);
	};
	
	this.FillSegmentType = function() {
		var srArr = outputGroupData.GetSegmentType();
		uUpdateSelect($(JS_SEGMENT_TYPE, this.dom).get(0), srArr);
	};
	
	this.FillSegmentRecordLength = function() {
		var srArr = outputGroupData.GetSegmentRecordLength();
		uUpdateSelect($(JS_SEGMENT_RECORD_LENGTH, this.dom).get(0), srArr);
	};
	
	this.FillPlaylistType = function() {
		var srArr = outputGroupData.GetPlaylistType();
		uUpdateSelect($(JS_PLAYLIST_TYPE, this.dom).get(0), srArr);
	};
	
	this.UpdateContainerVideoAudio = function() {
		var $dom = $(this.dom);
		var container = this.GetContainerType();
		
		var arrVideo = outputGroupData.GetContainerVideo(container);
		var strVideo = "";
		var i = 0;
		if(arrVideo != null) {
			for(i = 0; i < arrVideo.length; i++) {
				strVideo += arrVideo[i];
				if(i != arrVideo.length - 1) {
					strVideo += ", ";
				}
			}
		}
		
		var arrAudio = outputGroupData.GetContainerAudio(container);
		var strAudio = "";
		if(arrAudio != null) {
			for(i = 0; i < arrAudio.length; i++) {
				strAudio += arrAudio[i];
				if(i != arrAudio.length - 1) {
					strAudio += ", ";
				}
			}
		}
		
		var text = "";
		if(arrVideo != null && arrAudio != null) {
			if(arrVideo[0] == SUPPORT_ALL && arrAudio[0] == SUPPORT_ALL) {
			} else {
				text = str_output.supportVideoAudio.format(arrVideo, arrAudio);
			}
		}
		
		$dom.find(JS_CONTAINER_VIDEO_AUDIO).text(text);
	};
	
	this.IsOutputGroupTypeMatch = function() {
		var outputGroupType = this.GetGroupType();
		var $special = $(JS_OUTPUT_GROUP_SPECIAL, this.dom);
		if($special.length != 0 && $special.attr("id") == outputGroupType) {
			return true;
		}
		return false;
	};
	
	this.IsContainerSettingMatch = function() {
		var $containerSetting = $(JS_CONTAINER_SETTING, this.dom);
		var container = this.GetContainerType();
		if(container == CONTAINER_TS
				|| container == CONTAINER_HLS
				|| container == CONTAINER_TSOVERUDP
				|| container == CONTAINER_TSOVERHTTP
				|| container == CONTAINER_ASI) {
			if($containerSetting.length != 0 && $containerSetting.val() == "TS") {
				return true;
			}
			else {
				return false;
			}
		}
		else if(container == CONTAINER_MP4
				|| container == CONTAINER_FLV
				|| container == CONTAINER_MOV) {
			if($containerSetting.length != 0 && $containerSetting.val() == "MP4") {
				return true;
			}
			else {
				return false;
			}
		}
		else if(container == CONTAINER_AVI
				|| container == CONTAINER_MXF
				|| container == CONTAINER_ESOVERRTP) {
			if($containerSetting.length != 0 && $containerSetting.val() == container) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if($containerSetting.length == 0) {
				return true;
			}
			else {
				return false;
			}
		}
	};
	
	this.IsDrmMatch = function() {
		var $drmSetting = $(JS_DRM_OPTIONS, this.dom);
		var container = this.GetContainerType();
		if(isDrmContainer(container)) {
			if($drmSetting.length != 0) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if($drmSetting.length == 0) {
				return true;
			}
			else {
				return false;
			}
		}
	};
	
	this.ChangeOutputGroupType = function() {
		var $outputGroup = $(this.dom);
		var outputGroupType = this.GetGroupType();
		var $special = $outputGroup.find(JS_OUTPUT_GROUP_SPECIAL);
		if($special.length != 0 && $special.attr("id") == outputGroupType) return;
		
		var tmp = null;
		if(outputGroupType == OUTPUT_GROUP_APPLE) {
			tmp = $(TMP_OUTPUT_GROUP_APPLE).clone();
		} else if(outputGroupType == OUTPUT_GROUP_ARCHIVE) {
			tmp = $(TMP_OUTPUT_GROUP_ARCHIVE).clone();
		} else if(outputGroupType == OUTPUT_GROUP_FLASH) {
			tmp = $(TMP_OUTPUT_GROUP_FLASH).clone();
		} else if(outputGroupType == OUTPUT_GROUP_UDP) {
			tmp = $(TMP_OUTPUT_GROUP_UDP).clone();
		} else if(outputGroupType == OUTPUT_GROUP_RTP) {
			tmp = $(TMP_OUTPUT_GROUP_RTP).clone();
		} else if(outputGroupType == OUTPUT_GROUP_MSS) {
			tmp = $(TMP_OUTPUT_GROUP_MSS).clone();
		} else if(outputGroupType == OUTPUT_GROUP_HTTP) {
			tmp = $(TMP_OUTPUT_GROUP_HTTP).clone();
		} else if(outputGroupType == OUTPUT_GROUP_ASI) {
			tmp = $(TMP_OUTPUT_GROUP_ASI).clone();
		} else if(outputGroupType == OUTPUT_GROUP_SDI) {
			tmp = $(TMP_OUTPUT_GROUP_SDI).clone();
		} else{
			return;
		}
		
		var $option = $outputGroup.find(JS_OUTPUT_GROUP_OPTION).first();
		$option.empty();
		$option.append(tmp.get(0));
		tmp.show();
		
		this.candidateOutputContainer.Init($(JS_CANDIDATE_OUTPUT_CONTAINER, tmp).get(0));
		
		this.LicenseControl();
		this.UpdateContainer();
		this.UpdateContainerVideoAudio();
		this.UpdateExtension();
		this.UpdateRuntimeSupport();
		this.updatePlaylistNameMode();
		this.updatePlaylistName();
		this.updateDistributeMode();
		this.updateByDistributeMode();
		this.updateDeleteUploaded();
		this.updateByDeleteUploaded();
		this.FillPlaylistType();
		this.FillSegmentType();
		this.FillSegmentRecordLength();
		this.UpdatePlaylistType();
		this.UpdateByteRangeMode();
		this.UpdateSegmentType();
		this.UpdateSegmentLengthGroup();
		this.UpdateSegmentRecordLength();
		this.UpdateEpgFile();
		this.CreateContainerSettingDom();
		this.InitContainerSetting();
		this.CreateDrmSettingDom();
		this.InitDrmSetting();
		this.UpdateNewOutputTrigger();
		this.RequestUDPSourceIP();
		this.UpdateHttpUrl(true);
		this.UpdatePort();
		this.UpdateHlsSetting();
		this.UpdateEncryptionType();
		this.UpdateCandidateOutput();
	};
	
	this.CreateContainerSettingDom = function() {
		var ct = this.GetContainerType();
		var tmp = null;
		if(ct == CONTAINER_TS
				|| ct == CONTAINER_TSOVERUDP 
				|| ct == CONTAINER_TSOVERHTTP
				|| ct == CONTAINER_ASI
				|| ct == CONTAINER_HLS) {
			tmp = $(JS_TS_ADVANCED_OPTIONS_TMPL).clone();
		}
		else if(ct == CONTAINER_MXF) {
			tmp = $(JS_MXF_SETTING_TMPL).clone();
		}
		else if(ct == CONTAINER_MP4
				|| ct == CONTAINER_FLV
				|| ct == CONTAINER_MOV) {
			tmp = $(JS_MP4_SETTING_TMPL).clone();
		}
		else if(ct == CONTAINER_AVI) {
			tmp = $(JS_AVI_SETTING_TMPL).clone();
		}
		else if(ct == CONTAINER_ESOVERRTP) {
			tmp = $(JS_ES_SETTING_TMPL).clone();
		}
		else if(ct == CONTAINER_TSOVERRTP) {
			tmp = $(JS_TS_OVER_RTP_SETTING_TMPL).clone();
		}
		
		var $containerSetting = $(JS_CONTAINER_SETTING_DIV, this.dom).first();
		$containerSetting.empty();
		if(tmp != null) {
			$containerSetting.append(tmp.get(0));
		}
	};
	
	this.InitContainerSetting = function() {
		var ct = this.GetContainerType();
		if(ct == CONTAINER_TS
				|| ct == CONTAINER_TSOVERUDP 
				|| ct == CONTAINER_TSOVERHTTP
				|| ct == CONTAINER_ASI
				|| ct == CONTAINER_HLS) {
			this.tsao.Init($(JS_TS_ADVANCED_OPTIONS, this.dom).get(0));
			this.tsao.setParent(this);
			this.tsao.updateByContainer(ct);
		}
		else if(ct == CONTAINER_MXF) {
			this.mxfsetting.Init($(JS_MXF_SETTING, this.dom).get(0));
		}
		else if(ct == CONTAINER_MP4
				|| ct == CONTAINER_FLV
				|| ct == CONTAINER_MOV) {
			this.mp4setting.Init($(JS_MP4_SETTING, this.dom).get(0), ct);
		}
		else if(ct == CONTAINER_AVI) {
			this.avisetting.Init($(JS_AVI_SETTING, this.dom).get(0));
		}
		else if(ct == CONTAINER_ESOVERRTP) {
			this.esSetting.Init($(JS_ES_SETTING, this.dom).get(0));
		}
		else if(ct == CONTAINER_TSOVERRTP) {
			this.tsOverRtpSetting.Init($(JS_TS_OVER_RTP_SETTING, this.dom).get(0));
		}
	};
	
	this.CreateDrmSettingDom = function() {
		var ct = this.GetContainerType();
		var tmp = null;
		if(isDrmContainer(ct)) {
			tmp = $(JS_DRM_OPTIONS_TMPL).clone();
		}
		
		var $insert = $(JS_DRM_SETTING_DIV, this.dom).first();
		$insert.empty();
		if(tmp != null) {
			$insert.append(tmp.get(0));
		}
	};
	
	this.InitDrmSetting = function() {
		var ct = this.GetContainerType();
		if(isDrmContainer(ct)) {
			this.drmOptions.Init($(JS_DRM_OPTIONS, this.dom).get(0));
		}
	};
	
	this.BindOption = function() {
		var context = this;
		
		$(JS_OPEN_FILE_TRIGGER, this.dom).click(function() {
			g_OutputFileView.Show();
			g_OutputFileView.SetOnOK(function(key) {
				$(JS_OUTPUT_GROUP_URI, context.dom).val(key);
			});
		});
		
		$(JS_DISTRIBUTE_POINT, this.dom).change(function() {
			context.updateByDistributePoint();
			context.updateHlsOutputPoint();
		});
		
		$(".SelectHlsOutputPointTrigger", this.dom).click(function() {
			context.selectHlsOutputPoint();
		});
		
		$(JS_OUTPUT_GROUP_CUSTOM_URI, this.dom).change(function() {
			context.UpdateHttpUrl(false);
		});
		
		$(JS_DISTRIBUTE_MODE, this.dom).change(function() {
			context.updateByDistributeMode(true);
		});
		
		$(JS_DELETE_UPLOADED, this.dom).change(function() {
			context.updateByDeleteUploaded(true);
		});
		
		$(JS_OPEN_EPG_FILE_TRIGGER, this.dom).click(function() {
			g_InputFileView.Show();
			g_InputFileView.SetOnOK(function(key) {
				$(JS_EPG_FILE, context.dom).val(key);
			});
		});
		
		$(JS_SEGMENT_TYPE, this.dom).change(function() {
			context.UpdateSegmentLengthGroup();
			context.UpdateSegmentRecordLength();
			context.UpdateEpgFile();
		});
		
		$(JS_INSERT_MACRO_TRIGGER, this.dom).click(function() {
			var macroMap = outputGroupData.getTargetNameMacro();
			if (document.selection){
				//do nothing for IE8
			}else{				
				context.curPos = context.getCursorPosition($(JS_TARGET_NAME, context.dom)[0])
			}			
			g_LineSelector.setContent(macroMap);
			g_LineSelector.setTitle(str_common.macro);
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				var text = $(JS_TARGET_NAME, context.dom).val();
				if (context.curPos == -1){
					$(JS_TARGET_NAME, context.dom).val(text + key);
				}else{
					$(JS_TARGET_NAME, context.dom).val(text.substring(0,context.curPos) + key + text.substring(context.curPos));
					context.curPos = -1
				}				
			});
		});
		
		if (document.selection){ // for IE8 insert macro
			$(JS_INSERT_MACRO_TRIGGER, this.dom).mouseover(function() {				
				context.isMouseOverMacroTrigger = true;				
			});
			
			$(JS_INSERT_MACRO_TRIGGER, this.dom).mouseout(function() {				
				context.isMouseOverMacroTrigger = false;
			});
			
					
			$(JS_TARGET_NAME, this.dom).click(function(){				
				context.curPos = context.getCursorPosition(this)
			});
			
			$(JS_TARGET_NAME, this.dom).keyup(function(event){				
				context.curPos = context.getCursorPosition(this)
			});
			
			$(JS_TARGET_NAME, this.dom).focusout(function(event){
				if (!context.isMouseOverMacroTrigger){
					context.curPos = -1
				}								
			});	
		}		
		
		$(".InsertPlayListMacroTrigger", this.dom).click(function() {
			var macroMap = outputGroupData.getPlaylistMacro();
			
			g_LineSelector.setContent(macroMap);
			g_LineSelector.setTitle(str_common.macro);
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				var text = $(JS_PLAYLIST_NAME, context.dom).val();
				$(JS_PLAYLIST_NAME, context.dom).val(text + key);
			});
		});
		
		$(".InsertSegmentMacroTrigger", this.dom).click(function() {
			var macroMap = outputGroupData.getSegmentMacroMap();
			
			g_LineSelector.setContent(macroMap);
			g_LineSelector.setTitle(str_common.macro);
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				var text = $(JS_SEGMENT_NAME, context.dom).val();
				$(JS_SEGMENT_NAME, context.dom).val(text + key);
			});
		});
		
		$(JS_PLAYLIST_NAME_MODE, this.dom).change(function() {
			context.updatePlaylistName();
		});
		
		$(".ExpandTrigger", this.dom).click(function() {
			var target = $(".ExpandTarget", context.dom);
			var icon = $(".ExpandIcon", context.dom);
			if(target.hasClass("Hide")) {
				target.removeClass("Hide");
				icon.removeClass("ICON_ArrowRight").addClass("ICON_ArrowDown");
				context.showExpand = true;
			}
			else {
				target.addClass("Hide");
				icon.removeClass("ICON_ArrowDown").addClass("ICON_ArrowRight");
				context.showExpand = false;
			}
		});
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.UpdateNewOutputTrigger = function() {	
		var $outputArr = $(JS_OUTPUT, this.dom);
		var ct = this.GetContainerType();
		var maxOutputCount = outputGroupData.GetOutputLimit(ct);
		if($outputArr.length >= maxOutputCount) {
			$(JS_NEW_OUTPUT_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_OUTPUT_TRIGGER, this.dom).show();
		}
		
		g_taskSupport.UpdateNewOutputTrigger(this);
	};
	
	this.UpdateExtension = function() {
		var $outputGroup = $(this.dom);
		var container = this.GetContainerType();
		var extension = outputGroupData.GetExtension(container);
		var curExtension = $outputGroup.find(JS_EXTENSION).val();
		if(this.isInitialized || !curExtension){
			$(JS_EXTENSION, this.dom).val(extension);
		}
		var extDom = $(JS_EXTENSION, this.dom).get(0);
		if(extDom != null) {
			if(container == CONTAINER_HLS) {
				extDom.readOnly = true;
			} else {
				extDom.readOnly = false;
			}
		}
		this.isInitialized = true;
		
	};
	
	this.UpdateRuntimeSupport = function() {
		var outputGroupType = $(JS_OUTPUT_GROUP_TYPE, this.dom).val();
		var taskAction = g_taskSupport.getActionType();
		if(taskAction == "runtime") {
			if(outputGroupType == OUTPUT_GROUP_UDP
			 || outputGroupType == OUTPUT_GROUP_RTP
			 || outputGroupType == OUTPUT_GROUP_FLASH) {
			}
			else {
				$(".OutputGroupNotSupport", this.dom).show();
				$(".OutputGroupContent", this.dom).hide();
			}
		}
	};
	
	this.UpdatePlaylistType = function() {
		var container = this.GetContainerType();
		var $dom = $(JS_PLAYLIST_TYPE_ITEM, this.dom);
		if(container == CONTAINER_HLS) {
			$dom.show();
		} else {
			$(JS_PLAYLIST_TYPE, this.dom).val("0");
			$dom.hide();
		}
	};
	
	this.UpdateByteRangeMode = function() {	
		var $dom = $(JS_BYTE_RANGE_MODE_ITEM, this.dom);
		var groupType = this.GetGroupType();
		if(groupType != OUTPUT_GROUP_ARCHIVE) {
			$dom.hide();
			return;
		}
		
		var container = this.GetContainerType();		
		if(container == CONTAINER_HLS) {
			$dom.show();
		} else {
			$dom.hide();
		}		
	};
	
	this.UpdateSegmentType = function() {
		var container = this.GetContainerType();
		var $segmentType = $(JS_SEGMENT_TYPE_ITEM, this.dom);
		if(container == CONTAINER_TS) {
			$segmentType.show();
		} else {
			$(JS_SEGMENT_TYPE, this.dom).val("0");
			$segmentType.hide();
		}
	};
	
	this.UpdateSegmentLengthGroup = function() {
		var container = this.GetContainerType();
		var segmentType = $(JS_SEGMENT_TYPE, this.dom).val();
		var $segmentLength = $(JS_SEGMENTLENGTH_GROUP, this.dom);
		if(container == CONTAINER_HLS
				|| container == CONTAINER_TS
				|| container == CONTAINER_MP4) {
			if(segmentType == null) {
				$segmentLength.show();
			}
			else if(segmentType == "0") {
				$segmentLength.show();
			}
			else {
				$segmentLength.hide();
			}
			$(".SegmentGroup", this.dom).show();
		} else {
			$(JS_SEGMENT_LENGTH, this.dom).val("");
			$(".SegmentGroup", this.dom).hide();
		}
	};
	
	this.UpdateSegmentRecordLength = function() {
		var container = this.GetContainerType();
		var segmentType = $(JS_SEGMENT_TYPE, this.dom).val();
		var $segmentLength = $(JS_SEGMENT_RECORD_LENGTH_ITEM, this.dom);
		if(container == CONTAINER_HLS
				|| container == CONTAINER_TS
				|| container == CONTAINER_MP4) {
			if(segmentType == null) {
				$segmentLength.hide();
			}
			else if(segmentType == "1") {
				$segmentLength.show();
			}
			else {
				$segmentLength.hide();
			}
			
		} else {
			$segmentLength.hide();
		}
	};
	
	this.UpdateEpgFile = function() {
		var container = this.GetContainerType();
		var segmentType = $(JS_SEGMENT_TYPE, this.dom).val();
		var $epgFile = $(JS_EPG_FILE_ITEM, this.dom);
		if(container == CONTAINER_HLS
				|| container == CONTAINER_TS
				|| container == CONTAINER_MP4) {
			if(segmentType == null) {
				$epgFile.hide();
			}
			else if(segmentType == "2") {
				$epgFile.show();
			}
			else {
				$epgFile.hide();
			}
			
		} else {
			$epgFile.hide();
		}
	};
	
	this.UpdateHttpUrl = function(bGenerate) {
		if(this.GetGroupType() != OUTPUT_GROUP_HTTP) return;
		
		var container = $(JS_OUTPUT_GROUP_CONTAINER, this.dom).val();
		if(container == CONTAINER_FLVOVERHTTP) {
			$(JS_OUTPUT_GROUP_PATH_URI, this.dom).val("flv");
		} else if(container == CONTAINER_MP3OVERHTTP) {
			$(JS_OUTPUT_GROUP_PATH_URI, this.dom).val("mp3");
		} else  {
			$(JS_OUTPUT_GROUP_PATH_URI, this.dom).val("ts");
		}
		
		var url = location.href.substring(0, location.href.lastIndexOf("/"));
		var oldValue = $(JS_OUTPUT_GROUP_CUSTOM_URI, this.dom).val();
		var needGenerate = false;
		if(oldValue == null || oldValue.length == 0 ) {
			needGenerate = true;
		} else {
			needGenerate = bGenerate;
		}
		
		if(needGenerate) {
			guid = (new Date()).getTime();
			if(container == CONTAINER_MP3OVERHTTP) {
				guid += ".mp3";
			}

			var pathUri = $(JS_OUTPUT_GROUP_PATH_URI, this.dom).val();
			var fullurl = url + "/" + pathUri + "/" + guid;
			$(JS_OUTPUT_GROUP_CUSTOM_URI, this.dom).val(guid);
			$(JS_OUTPUT_GROUP_URI_DISP, this.dom).text(fullurl);
		} else {
			var pathUri = $(JS_OUTPUT_GROUP_PATH_URI, this.dom).val();
			var fullurl = url + "/" + pathUri + "/" + oldValue;
			$(JS_OUTPUT_GROUP_URI_DISP, this.dom).text(fullurl);
		}
	};
	
	this.OnPortResponse = function(data) {
		if(data == null) return;
		this.portParser.Init(data);
		var pa = this.portParser.GetPortArray();
		uUpdateSelect($(JS_OUTPUT_GROUP_PORT, this.dom).get(0), pa);
		
		var originalPort = $(JS_OUTPUT_GROUP_PORT_DOWN, this.dom).val();
		originalPort = parseInt(originalPort);
		if(!isNaN(originalPort) && originalPort >= 0) {
			$(JS_OUTPUT_GROUP_PORT, this.dom).val(originalPort);
		}
	};
	
	this.UpdatePort = function() {
		var context = this;
		var type = $(JS_OUTPUT_GROUP_TYPE, this.dom).val();; 
		if(!(type == OUTPUT_GROUP_ASI ||
				type == OUTPUT_GROUP_SDI)) return;
		
		var value = $(JS_OUTPUT_GROUP_PORT_DOWN, this.dom).val();
		$(JS_OUTPUT_GROUP_PORT, this.dom).val(value);
		
		var url ="getMediaFileInfo";
		var uri = null;
		if(type == OUTPUT_GROUP_ASI) {
			uri = "asiport:0";
		}
		else if(type == OUTPUT_GROUP_SDI) {
			uri = "sdiport:0";
		}
		var param = { 'uri': uri, 'rnd': Math.random() };
		if(g_params_getMediaFileInfo != null) {
			$.extend(param, param, g_params_getMediaFileInfo);
		}
		this.posting = true;
		$.post(url, param, function(data) {
			context.OnPortResponse(data);
			context.posting = false;
		}, "xml");
	};
	
	this.UpdateHlsSetting = function() {
		var container = this.GetContainerType();
		if(container == CONTAINER_HLS) {
			$(JS_HLS_SETTING, this.dom).show();
		} else {
			$(JS_HLS_SETTING, this.dom).hide();
		}
	};
	
	this.UpdateEncryptionType = function() {
		var arr = outputGroupData.GetEncryptionType();
		uUpdateSelect($(JS_ENCRYPTION_TYPE, this.dom).get(0), arr);
	};
	
	this.UpdateCandidateOutput = function() {
		var container = this.GetContainerType();
		this.candidateOutputContainer.SetContainer(container);
	};
	
	this.RequestUDPSourceIP = function() {
		if($(JS_SOURCE_IP, this.dom).length == 0) return;
		
		var context = this;
		var url = "listIfaces";
		var param = {"ethType": "output"};
		if(g_params_listIfaces != null) {
			$.extend(param, param, g_params_listIfaces);
		}
		$.post(url, param, function(data) {
			var list = uParseServerIP(data);
			var $srcIP = $(JS_SOURCE_IP, context.dom);
			uUpdateSelect($srcIP.get(0), list);
			/*var itemValue = $(JS_SOURCE_IP_DOWN, context.dom).val();
			uSelectItem($srcIP.get(0), itemValue);*/
		});
	};
	
	this.SortOutput = function() {
		for(var i = 0; i < this.outputArray.length; i++) {
			var outputSupport = this.outputArray[i];
			outputSupport.SetIndex(i);
		}
		this.UpdateNewOutputTrigger();
	};
	
	this.GetGroupType = function() {
		var type = $(JS_OUTPUT_GROUP_TYPE, this.dom).val();
		return type;
	};
	
	this.GetContainerType = function() {
		var type = $(this.dom).find(JS_OUTPUT_GROUP_CONTAINER).val();
		return type;
	};
	
	this.GetValueByJS = function(selector) {
		var $select = $(this.dom).find(selector);
		var value = null;
		if($select.attr('type') == "checkbox") {
			if($select.attr('checked') == null) {
				value = "0";
			} else {
				value = "1";
			}
		} else {
			value = $select.val();
		}
		return value;
	};
	
	this.GetValueInXML = function(selector) {
		var value = this.GetValueByJS(selector);
		if(value == null || value.length == 0) {
			if(selector == JS_LIVE_MODE) {
				value = "0";
			}
		}
		return value;
	};
	
	this.Delete = function() {
		var $outputGroup = $(this.dom);
		var len = this.outputArray.length;
		for(var i = 0; i < len; i++) {
			var outputSupport = this.outputArray[i];
			outputSupport.Delete();
		}
		this.outputArray.length = 0;
		
		this.tsao.Delete();
		this.tsao = null;
		
		this.mxfsetting.Delete();
		this.mxfsetting = null;
		
		this.mp4setting.Delete();
		this.mp4setting = null;
		
		this.avisetting.Delete();
		this.avisetting = null;
		
		this.esSetting.Delete();
		this.esSetting = null;
		
		this.tsOverRtpSetting.Delete();
		this.tsOverRtpSetting = null;
		
		this.drmOptions.Delete();
		this.drmOptions = null;
		
		this.candidateOutputContainer.Delete();
		this.candidateOutputContainer = null;
		
		$outputGroup.remove();
	};
	
	this.DeleteOutput = function(outputSupport) {
		var bFound = false;
		var len = this.outputArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.outputArray[i-1] = this.outputArray[i];
			} else {
				var pilot = this.outputArray[i];
				if(pilot == outputSupport) {
					outputSupport.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) this.outputArray.length--;
		this.SortOutput();
	};
	
	this.NewOutput = function() {
		var outputSupport = new OutputSupport();
		outputSupport.Create(this.dom);
		outputSupport.SetOutputGroup(this);
		
		var bShowPlaylistName = this.getShowOutputPlaylistName();
		outputSupport.showPlaylistName(bShowPlaylistName);
		
		this.outputArray.push(outputSupport);
		this.SortOutput();
	};
	

	/* used in cloud transcoder */
	this.NewOutputByStream = function(streamSupport) {
		var outputSupport = new OutputSupport();
		outputSupport.Create(this.dom);
		outputSupport.SetOutputGroup(this);
		outputSupport.UpdateStream(streamSupport);
		//outputSupport.ExpandStream();
		this.outputArray[this.outputArray.length] = outputSupport;
		this.SortOutput();
		return;
	};

	/*can delete
	this.NewOutputByTemplate = function() {
		var streamSupport = g_taskSupport.NewStream();
		var outputSupport = new OutputSupport();
		outputSupport.Create(this.dom);
		outputSupport.SetOutputGroup(this);
		outputSupport.UpdateStream(streamSupport);
		outputSupport.ExpandStream();
		this.outputArray[this.outputArray.length] = outputSupport;
		this.SortOutput();
		return;
	};*/
	
	/* can delete
	this.NewOutputByOutput = function() {
		if(g_focusOutput != null) {
			g_focusOutput.CloseStream();
		}
		
		var outputSupport = this.outputArray[this.outputArray.length-1];
		if(outputSupport == null) {
			this.NewOutputByTemplate();
		} else {
			var streamRef = outputSupport.GetReferencedStreamId();
			var newStreamSupport = g_taskSupport.CloneStream(streamRef);
			
			var newOutputSupport = outputSupport.Clone();
			newOutputSupport.SetOutputGroup(this);
			newOutputSupport.UpdateStream(newStreamSupport);
			$(this.dom).find(JS_OUTPUT_FLOCK).append(newOutputSupport.dom);
			this.outputArray[this.outputArray.length] = newOutputSupport;
			this.SortOutput();
			newOutputSupport.ExpandStream();
		}
	};*/
	
	this.GetOutputByStream = function(streamId) {
		var outputSupport = null;
		var len = this.outputArray.length;
		for(var i = 0; i < len; i++) {
			var pilot = this.outputArray[i];
			if(pilot.GetReferencedStreamId() == streamId) {
				outputSupport = pilot;
				break;
			}
		}
		return outputSupport;
	};
	
	this.IsUsedStream = function(streamId) {
		for(var i = 0; i < this.outputArray.length; i++) {
			var output = this.outputArray[i];
			if(parseInt(output.GetReferencedStreamId()) == parseInt(streamId)) {
				return true;
			}
		}
		
		return false;
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.GetStreamIds = function() {
		var streamIds = [];
		for(var i = 0; i < this.outputArray.length; i++) {
			var output = this.outputArray[i];
			streamIds[i] = output.GetReferencedStreamId();
		}
		return streamIds;
	};
	
	this.UpdateStreamList = function() {
		for(var i = 0; i < this.outputArray.length; i++) {
			var output = this.outputArray[i];
			output.UpdateStreamList();
		}
	};
	
	this.GetOutputGroupTag = function() {
		var value = this.GetGroupType();
		var tag = uGetMapValue(groupTagMap, value);
		return tag;
	};
	
	this.XML = function(xml) {
		var tag = this.GetOutputGroupTag();
		xml.BeginNode(tag);
		
		var label = $(JS_OUTPUT_GROUP_LABEL, this.dom).val();
		if(label != null) {
			xml.Attrib("label", label);
		}
		
		var groupType = this.GetGroupType();
		if(groupType == OUTPUT_GROUP_ARCHIVE) {
			tagMap = fileArchiveTagMap;
		} else if(groupType == OUTPUT_GROUP_APPLE) {
			tagMap = appleTagMap;
		} else if(groupType == OUTPUT_GROUP_FLASH) {
			tagMap = flashTagMap;
		} else if(groupType == OUTPUT_GROUP_MSS) {
			tagMap = mmsTagMap;
		} else if(groupType == OUTPUT_GROUP_UDP) {
			tagMap = udpTagMap;
		} else if(groupType == OUTPUT_GROUP_RTP) {
			tagMap = rtpTagMap;
		} else if(groupType == OUTPUT_GROUP_HTTP) {
			tagMap = httpTagMap;
		} else if(groupType == OUTPUT_GROUP_ASI) {
			tagMap = asiTagMap;
		} else if(groupType == OUTPUT_GROUP_SDI) {
			tagMap = asiTagMap;
		}
		
		var len = tagMap.length;
		var value = "";
		for(var i = 0; i < len; i++) {
			value = this.GetValueInXML(tagMap[i].value);
			if(value == null) continue;
			xml.Node(tagMap[i].key, value);
			if(value == CONTAINER_TS
				|| value == CONTAINER_TSOVERUDP
				|| value == CONTAINER_TSOVERHTTP
				|| value == CONTAINER_ASI
				|| value == CONTAINER_HLS) {
				this.tsao.XML(xml);
			} else if(value == CONTAINER_MXF) {
				this.mxfsetting.XML(xml);
			} else if(value == CONTAINER_MP4
					|| value == CONTAINER_FLV
					|| value == CONTAINER_MOV) {
				this.mp4setting.XML(xml);
			} else if(value == CONTAINER_AVI) {
				this.avisetting.XML(xml);
			} else if(value == CONTAINER_ESOVERRTP) {
				this.esSetting.XML(xml);
			} else if(value == CONTAINER_TSOVERRTP) {
				this.tsOverRtpSetting.XML(xml);
			}
		}

		var container = this.GetContainerType();
		
		if(container == CONTAINER_TSOVERUDP
				|| container == CONTAINER_HLS
				|| container == CONTAINER_RTMP) {
			this.candidateOutputContainer.XML(xml);
		}
		
		if(isDrmContainer(container)) {
			this.drmOptions.XML(xml);
		}
		
		var len = this.outputArray.length;
		for(var i = 0; i < len; i++) {
			var outputSupport = this.outputArray[i];
			outputSupport.XML(xml);
		}
		
		xml.EndNode();
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
		//Sub element will use container type, should called before the name of container is changed.
		this.UpdateSubElement();
		
		var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};
	};
	
	this.UpdateSubElement = function() {
		var fullField = this.GetFullField();
		
		//output
		var len = this.outputArray.length;
		for(var i = 0; i < len; i++) {
			var outputSupport = this.outputArray[i];
			outputSupport.SetPrefixField(fullField);
			outputSupport.SetFieldIndex(i);
			outputSupport.UpdateElementName();
		}
		
		var container = this.GetContainerType();
		if(container == CONTAINER_TS
				|| container == CONTAINER_TSOVERUDP
				|| container == CONTAINER_TSOVERHTTP
				|| container == CONTAINER_ASI
				|| container == CONTAINER_HLS) {
			this.tsao.SetContainer(container);
			this.tsao.SetPrefixField(fullField);
			this.tsao.UpdateElementName();
		}
		if(container == CONTAINER_MXF) {
			this.mxfsetting.updateAudioPath($(JS_OUTPUT_GROUP_URI, this.dom).val());
			this.mxfsetting.SetPrefixField(fullField);
			this.mxfsetting.UpdateElementName();
		}
		if(container == CONTAINER_MP4
				|| container == CONTAINER_FLV
				|| container == CONTAINER_MOV) {
			this.mp4setting.SetPrefixField(fullField);
			this.mp4setting.UpdateElementName();
		}
		if(container == CONTAINER_AVI) {
			this.avisetting.updateAudioPath($(JS_OUTPUT_GROUP_URI, this.dom).val());
			this.avisetting.SetPrefixField(fullField);
			this.avisetting.UpdateElementName();
		}
		if(container == CONTAINER_ESOVERRTP) {
			this.esSetting.SetContainer(container);
			this.esSetting.SetPrefixField(fullField);
			this.esSetting.UpdateElementName();
		}
		if(container == CONTAINER_TSOVERRTP) {
			this.tsOverRtpSetting.SetContainer(container);
			this.tsOverRtpSetting.SetPrefixField(fullField);
			this.tsOverRtpSetting.UpdateElementName();
		}
		if(isDrmContainer(container)) {
			this.drmOptions.SetPrefixField(fullField);
			this.drmOptions.UpdateElementName();
		}
		if(container == CONTAINER_TSOVERUDP 
				|| container == CONTAINER_HLS
				|| container == CONTAINER_RTMP) {
			this.candidateOutputContainer.SetPrefixField(fullField);
			this.candidateOutputContainer.UpdateElementName();
		}
	};
	/* Field operate end */
	
	
	function isDrmContainer(container) {
		if(container == CONTAINER_HLS 
				|| container == CONTAINER_MP4) {
			return true;
		}
		return false;
	}
}

OutputGroupSupport.prototype = {
	show : function() {
		$(this.dom).show();
	},
	
	hide : function() {
		$(this.dom).hide();
	},
	
	calculateTotalBitrate : function(r) {
		var tb = null;
		if(r <= 50) {
			tb = 120;
		}
		else if(r > 50 && r <= 100) {
			tb = r*(2.4-(r/50-1)*0.6);
		}
		else if(r > 100 && r <= 200) {
			tb = r*(1.8-(r/100-1)*0.3);
		}
		else if(r > 200 && r <= 400) {
			tb = r*(1.5-(r/200-1)*0.2);
		}
		else if(r > 400 && r <= 800) {
			tb = r*(1.3-(r/400-1)*0.1);
		}
		else if(r > 800 && r <= 1600) {
			tb = r*(1.2-(r/800-1)*0.08);
		}
		else if(r > 1600 && r <= 3200) {
			tb = r*(1.12-(r/1600-1)*0.04);
		}
		else if(r > 3200 && r <= 6400) {
			tb = r*(1.08-(r/3200-1)*0.03);
		}
		else if(r > 6400) {
			tb = r*1.05;
		}
		
		tb = parseInt(tb)
		return tb;
	},
	
	getTotalBitrate : function() {
		var totalBitrate = null;
		if(this.outputArray.length > 0) {
			totalBitrate = this.outputArray[0].getTotalBitrate();
			if(!isNaN(totalBitrate)) {
				totalBitrate = this.calculateTotalBitrate(totalBitrate);
			}
		}
		
		return totalBitrate;
	},
	
	onTotalBitrateChange : function() {
		var totalBitrate = this.getTotalBitrate();

		if(!isNaN(totalBitrate)) {
			this.tsao.setTotalBitrate(totalBitrate);
		}
		else {
			this.tsao.setTotalBitrate("");
		}
	},
	
	updatePlaylistNameMode: function() {
		var arr = outputGroupData.getPlaylistNameMode();
		uUpdateSelect($(JS_PLAYLIST_NAME_MODE, this.dom).get(0), arr);
		
		var container = this.GetContainerType();
		var $dom = $(JS_PLAYLIST_NAME_MODE_ITEM, this.dom);
		
		if(container == CONTAINER_HLS) {
			$dom.show();
		} else {
			$dom.hide();
		}
	},
	
	updatePlaylistName: function() {
		var bShowOutputPlaylistName = this.getShowOutputPlaylistName();
		
		if(bShowOutputPlaylistName) {
			$(".PlaylistNameItem", this.dom).hide();
		}
		else {
			$(".PlaylistNameItem", this.dom).show();
		}
		
		for(var i = 0; i < this.outputArray.length; i++) {
			this.outputArray[i].showPlaylistName(bShowOutputPlaylistName);
		}
	},
	
	updateDistributeMode: function() {
		var arr = outputGroupData.getDistributeMode();
		uUpdateSelect($(JS_DISTRIBUTE_MODE, this.dom).get(0), arr);
	},
	
	updateByDistributeMode:  function(clearUri) {
		var distributeMode = $(JS_DISTRIBUTE_MODE, this.dom).val();
		if(distributeMode == "0") {
			$(".OutputUriItem", this.dom).show();
			$(".HlsOutputPointItem", this.dom).hide();
			$(".DistributePointItem", this.dom).hide();
			
			$(".OutputOpenFileButton", this.dom).hide();
		}
		else if(distributeMode == "1") {
			$(".OutputUriItem", this.dom).show();
			$(".HlsOutputPointItem", this.dom).hide();
			$(".DistributePointItem", this.dom).hide();
			
			$(".OutputOpenFileButton", this.dom).show();
		}
		else if(distributeMode == "2") {
			$(".OutputUriItem", this.dom).hide();
			$(".HlsOutputPointItem", this.dom).show();
			$(".DistributePointItem", this.dom).show();
		}
		
		if(clearUri) {
			$(JS_OUTPUT_GROUP_URI, this.dom).val("");
			$(JS_DISTRIBUTE_POINT, this.dom).val("");
			$(".HlsOutputPointDisp", this.dom).text("");
		}
	},
	
	updateDeleteUploaded: function() {
		var arr = outputGroupData.getDeleteUploaded();
		uUpdateSelect($(JS_DELETE_UPLOADED, this.dom).get(0), arr);
	},
	
	updateByDeleteUploaded: function(clear) {
		var deleteUploaded = $(JS_DELETE_UPLOADED, this.dom).val();
		if(deleteUploaded == "2") {
			$(".VodListItem").show();
		}
		else {
			$(".VodListItem").hide();
		}
		
		if(clear) {
			$(JS_VOD_TARGET_NAME, this.dom).val("");
			$(JS_VOD_PLAYLIST_NAME, this.dom).val("");
		}
	},
	
	getShowOutputPlaylistName: function() {
		var groupType = this.GetGroupType();
		var container = this.GetContainerType();
				
		var bShowOutputPlaylistName = false;
		if(groupType == OUTPUT_GROUP_APPLE || (groupType == OUTPUT_GROUP_ARCHIVE && container == CONTAINER_HLS)) {
			var mode = $(JS_PLAYLIST_NAME_MODE, this.dom).val();
			if(mode != null && mode == "1") {
				bShowOutputPlaylistName = true;
			}
		}
		return bShowOutputPlaylistName;
	},
	
	GetActive : function() {
		return $(JS_OUTPUT_GROUP_ACTIVE, this.dom).val();
	},
	
	SetActive : function(active) {
		$(JS_OUTPUT_GROUP_ACTIVE, this.dom).val(active);
	},
	
	getDescription : function() {
		return $(JS_OUTPUT_GROUP_DESCRIPTION, this.dom).val();
	},
	
	setDescription : function(desc) {
		$(JS_OUTPUT_GROUP_DESCRIPTION, this.dom).val(desc);
	},
	
	selectHlsOutputPoint: function() {
		var context = this;
		var url = "listHlsOutputPoints";
		var param = {};
		/**
		 * g_params_getMediaFileInfo contain groupID, type, curServerID info.
		 */
		if(g_params_getMediaFileInfo != null) {
			$.extend(param, param, g_params_getMediaFileInfo);
		}
		$.post(url, param, function(data) {
			context.onHlsOutputPointsResponse(data);
		});
	},
	
	onHlsOutputPointsResponse: function(data) {
		var context = this;
		var arr = [];
		$(".HlsOutputPointItem", data).each(function() {
			var o = {};
			o.key = $(".Key", this).text();
			o.value = $(".Value", this).text();
			arr.push(o);
		});
		
		g_LineSelector.setContent(arr);
		g_LineSelector.setTitle("");
		g_LineSelector.show();
		g_LineSelector.setOnSelected(function(key) {
			$(JS_OUTPUT_GROUP_URI, context.dom).val(key).change();
		});
	},
	
	updateDistributePoint: function() {
		var uri = $(JS_OUTPUT_GROUP_URI, this.dom).val();
		if(uri == null) return;
		
		var point = uri.substring(uri.lastIndexOf("/")+1, uri.length);
		$(JS_DISTRIBUTE_POINT, this.dom).val(point);
	},
	
	updateByDistributePoint: function() {
		var distributePoint = $(JS_DISTRIBUTE_POINT, this.dom).val();
		$(JS_OUTPUT_GROUP_URI, this.dom).val(HLS_MOUNT_POINT + distributePoint);
	},
	
	updateHlsOutputPoint: function() {
		var uri = $(JS_OUTPUT_GROUP_URI, this.dom).val();
		var target = $(JS_TARGET_NAME, this.dom).val();
		if(uri == null) return;
		if(uri.toLowerCase().substr(0, 7) == "http://") {
			$(".HlsOutputPointDisp", this.dom).text(uri);
		}
		else {
			var reqUri = location.href.substring(0, location.href.lastIndexOf("/"));
			var pos = uri.lastIndexOf("/hls/");
			if(pos > 0) {
				var point = uri.substring(pos);
				$(".HlsOutputPointDisp", this.dom).text(reqUri + point + "/" + target + ".m3u8");
			}
		}
	},
	
	updateAdvanceOption: function() {
		if(this.tsao != null) {
			this.tsao.showExpand(this.showExpand);
		}
		
		if(this.mxfsetting != null) {
			this.mxfsetting.showExpand(this.showExpand);
		}
		
		if(this.mp4setting != null) {
			this.mp4setting.showExpand(this.showExpand);
		}
		
		if(this.avisetting != null) {
			this.avisetting.showExpand(this.showExpand);
		}
		
		if(this.esSetting != null) {
			this.esSetting.showExpand(this.showExpand);
		}
	}
};
