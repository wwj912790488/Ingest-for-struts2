var g_string = {};

g_string.font = {};
g_string.font.FangSong = "FangSong";
g_string.font.Arial = "Arial";
g_string.font.SegoeUI = "Segoe UI";
g_string.font.KaiTi = "KaiTi";
g_string.font.SimSun = "SimSun";
g_string.font.SimHei = "SimHei";
g_string.font.MSYH = "Microsoft YaHei";

g_string.mosaic = {};
g_string.mosaic.type_mosaic="Mosaic";
g_string.mosaic.type_blur="Blur";
g_string.mosaic.type_erase="Erase";

var str_common = new Object();
str_common.close = "Close";
str_common.on ="On";
str_common.off ="Off";
str_common.auto ="Auto";
str_common.saveAsProfile = "Save As Profile";
str_common.saveAsPreset = "Save As Preset";
str_common.save_as_scene = "Save as scene";
str_common.importProfile = "Import Profile";
str_common.importPreset = "Import Preset";
str_common.import_scene = "Import scene";
str_common.selectInputPath = "Select Input Path";
str_common.selectOutputPath = "Select Output Path";
str_common.newOutputFromPreset = "New Output From Preset";
str_common.categoryList = "Category List";
str_common.saveSuccessed ="Save successed";
str_common.saveFailed ="Save failed";
str_common.none="None";
str_common.macro="Macro";
str_common.material="Material";
str_common.content_packaging="Content packaging";
str_common.apply_success ="Apply success";
str_common.apply_failed ="Apply failed";
str_common.back_task_manager = "Back task manager";
str_common.back_profile_manager = "Back profile manager";

var str_task = new Object();
str_task.bestQuality = "Best Quality";
str_task.goodQuality = "Good Quality";
str_task.balance = "Balance";
str_task.fast = "Fast";
str_task.fastest = "Fastest";
str_task.custom = "Custom";
str_task.load_task_failed="Loading task failed";
str_task.task="task";
str_task.edit_task="Edit task";
str_task.new_task="New task";
str_task.runtime_setting="Runtime setting";

var str_profile = new Object();
str_profile.edit_profile="Edit profile";
str_profile.new_profile="New profile";

var str_input = new Object();
str_input.needRightPath = "Need the right path";
str_input.pathLimitSymbols = "Folder name can't have /:*?\"<>|";
str_input.fileLimitSymbols = "File name can't have \\\/:*?\"<>|";
str_input.aes_ebu_note="AES/EBU will result in an invalid video settings";
str_input.input_sdp="Input SDP file";
str_input.filltype_video="Video";
str_input.filltype_audio="Audio";
str_input.filltype_video_audio="Video+Audio";
str_input.port_select="Port select";

var str_stream = new Object();
str_stream.linkedNone = "Unlinked";
str_stream.stream = "Stream";
str_stream.stream_is_used = "Stream is used";

var str_advertisement = new Object();
str_advertisement.reserveHead = "Reserve head";
str_advertisement.reserveTail = "Reserve tail";

var str_output = new Object();
str_output.appleLive  ="Apple Live";
str_output.fileArchive = "Archive";
str_output.flash = "Flash";
str_output.udp = "UDP";
str_output.rtp = "RTP";
str_output.http = "HTTP";
str_output.mss = "MS Streaming";
str_output.asi = "ASI";
str_output.sdi = "SDI";
str_output.logoFileViewTitle = "Select Logo File";
str_output.subtitleFileViewTitle = "Select Subtitle File";
str_output.AdvertisementFileViewTitle = "Select Advertisement File";
str_output.videoBreviary = "{0} {1} {2} {3} {4}";
str_output.audioBreviary = "{0} {1} {2} {3}";
str_output.source = "Follow source";
str_output.custom = "Custom";
str_output.frame = "frame";
str_output.field = "field";
str_output.field_auto = "Field AUTO";
str_output.supportVideoAudio ="Only support [{0}] and [{1}]";
str_output.newDefault ="New Default";
str_output.importFromPreset ="Import from preset";
str_output.eth_default="Use local eth according to route defined";
str_output.eth_auto="Use local eth low dataflow";
str_output.smart_border="Smart border";
str_output.smart_clipping="Smart clipping";
str_output.linear_stretch="Linear stretch";
str_output.fit_width="Fit width";
str_output.segment_type_normal="Normal";
str_output.segment_type_24h_record="24Hour record";
str_output.segment_type_epg_file="EPG file";
str_output.outputgroup_setting="Output group setting";
str_output.playlist_name_mode0="Single";
str_output.playlist_name_mode1="Multiple";
str_output.distribute_http_server="HTTP server";
str_output.distribute_local="Local";
str_output.distribute_point="Point";
str_output.hls_reserve_segment="Reserve segment";
str_output.hls_delete_expired="Delete expired";
str_output.hls_vod_mode="VOD mode";

var str_warning = new Object();
str_warning.fileExtension = "Should be {0} file";
str_warning.needFloat = "Need float";
str_warning.needInteger = "Need integer";
str_warning.outOfRange = "Out of range: {0}~{1}";
str_warning.outOfMaxRange = "Out of max value：{0}";
str_warning.outOfMinRange = "Out of min value：{0}";
str_warning.coordinatesInRange ="Coordinates must be within range: ({0}, {1})";
str_warning.invalidIp ="Invalid IP address";
str_warning.invalidColor = "Invalid color value";
str_warning.outOfWidth = "Out of width {0}";
str_warning.outOfHeight = "Out of height {0}";
str_warning.needHmsf = "Need format: hh:mm:ss:ff";
str_warning.needHmsm = "Need format: hh:mm:ss:xxx";
str_warning.trimError = "Crop Error";
str_warning.streamEmpty = "Stream empty.";
str_warning.sameLogo = "Can't select same logo.";
str_warning.preview_subtitle = "Preview only support .srt, .ssa, .ass files";
str_warning.outOfDuration = "Out of duration";
str_warning.mediaInfoLoading="Media information is loading...";
str_warning.subtitle_out_of_range="The range of subtitle is out of video";
str_warning.save_task_with_media_info_loading="Media information is loading. Save it anyway?";
str_warning.copy_success="Copy success";
str_warning.copy_failed="Copy failed";
str_warning.load_profile_failed="Load profile failed";
str_warning.content_packaging_number_not_match="Content packaging number does not match";
str_warning.select_box_out_of_resolution="Select box is out of video resolution";
str_warning.ts_total_bitrate_overflow="TS total bitrate will overflow";

var str_preview = new Object();
str_preview.protocal = "File address protocal error";
str_preview.clip_unsupport = "Unsupport current media";

var str_audio = new Object();
str_audio.channelProcessingNone = "None";
str_audio.channelProcessingLeft = "Left";
str_audio.channelProcessingRight = "Right";
str_audio.channelProcessingMix = "Mix";
str_audio.volume_mode_source = "Source";
str_audio.volume_mode_boost = "Boost";
str_audio.volume_mode_balance = "Balance";
str_audio.balance_level_low = "Low";
str_audio.balance_level_medium = "Medium";
str_audio.balance_level_high = "High";
str_audio.add_input_audio = "Add input audio";
str_audio.audio_process_default="Default";
str_audio.audio_process_split="Split";
str_audio.audio_process_merge="Merge";
str_audio.audio_process_follow_source="Follow source";
str_audio.encoding_mode_video="Video";
str_audio.encoding_mode_music="Music";

var str_video = new Object();
str_video.antiShakingOn = "On";
str_video.antiShakingOnDelay = "On & Delay";
str_video.passThrough = "Pass Through";
str_video.top_field_first = "Top field first";
str_video.bottom_field_first = "Bottom field first";
str_video.deinterlacealg_quality = "Quality";
str_video.deinterlacealg_speed = "Speed";
str_video.resizealg_lanczos = "LANCZOS";
str_video.resizealg_bilinear = "BILINEAR";
str_video.scd_disabled = "Disabled";
str_video.scd_add_idr = "Add IDR";
str_video.scd_add_i = "Add I";
str_video.frame_rate_mode_fixed = "Fixed";
str_video.frame_rate_mode_up_source = "Follow source if larger";
str_video.frame_rate_mode_down_source = "Follow source if smaller";
str_video.denoise_method_0 = "Faster";
str_video.denoise_method_1 = "Quality";
str_video.interpolate_0 = "Stretch";
str_video.interpolate_1 = "Fixed";
str_video.interpolate_2 = "Update value";
str_video.resolution = "Resolution";
str_video.aspect_ratio = "Aspect ratio";
str_video.gpu_fastest="GPU fastest";
str_video.fast="Fast";
str_video.faster="Faster";
str_video.balance="Balance";
str_video.high_quality="High quality";
str_video.best_quality="Best quality";
str_video.gop_type_frame="By frame";
str_video.gop_type_ms="By millisecond";

var str_watchfolder = new Object();
str_watchfolder.filePath = "file path";
str_watchfolder.ftpPath = "ftp address";
str_watchfolder.type = {};
str_watchfolder.type.common = "Common";
str_watchfolder.type.teda = "TEDA";

var str_image_grabbing = {};
str_image_grabbing.black_border="Black border";
str_image_grabbing.keep_aspect_ratio="Keep aspect ratio";
str_image_grabbing.stretch="Stretch";
str_image_grabbing.normal="Normal";
str_image_grabbing.skip_count="Unlimited count";
str_image_grabbing.skip_interval="Skip interval";

var str_motion_icon = {};
str_motion_icon.title="Motion icon";
str_motion_icon.permanent="Permanent";
str_motion_icon.dynamic="Dynamic";
str_motion_icon.loop="Loop";
str_motion_icon.play_once="Play once";
str_motion_icon.keep_last_frame="Keep last frame";

var str_water_marking = {};
str_water_marking.watermark="Watermark";
str_water_marking.signature="Signature";

var str_dynamic_text = {};
str_dynamic_text.title="Dynamic text";
str_dynamic_text.animation_static="Static";
str_dynamic_text.animation_scroll="Scroll";
str_dynamic_text.scroll_from_left="From left";
str_dynamic_text.scroll_from_right="From right";
str_dynamic_text.scroll_from_top="From top";
str_dynamic_text.scroll_from_bottom="From bottom";
str_dynamic_text.fast="Fast";
str_dynamic_text.fastest="Fastest";
str_dynamic_text.slow="Slow";
str_dynamic_text.slowest="Slowest";
str_dynamic_text.moreslowest="Slowest+";
str_dynamic_text.normal="Normal";

var str_macro = {};
str_macro.yyyy="${yyyy} - Four digit year";
str_macro.MM="${MM} - Two digit month";
str_macro.dd="${dd} - Two digit day";
str_macro.HH="${HH} - Two digit hour";
str_macro.mm="${mm} - Two digit minute";
str_macro.ss="${ss} - Two digit second";
str_macro.date="${DATE} - 'yyyy-MM-dd' of task begining";
str_macro.time="${TIME} - 'HH-mm-ss' of task begining";
str_macro.year="${YEAR} - 'yyyy' of task begining";
str_macro.month="${MONTH} - 'MM' of task begining";
str_macro.day="${DAY} - 'dd' of task begining";
str_macro.filename="${FILENAME} - File name of source";
str_macro.filename_pinyin="${FILENAME_PINYIN} - File name(pinyin) of source";
str_macro.program="${PROGRAM} - program name";
str_macro.filepath="${FILEPATH} - File path of source";
str_macro.last_folder="${LASTFOLDER} - the last folder of source";
str_macro.width="${WIDTH} - Width of video codec";
str_macro.height="${HEIGHT} - Height of video codec";
str_macro.bitrate="${BITRATE} - Bitrate of video codec";
str_macro.audio_encoder="${AUDIOENCODER} - audio encoder";
str_macro.video_encoder="${VIDEOENCODER} - video encoder";
str_macro.last_output_folder="${LASTOUTPUTFOLDER} - The last output folder";
str_macro.task_name="${TASKNAME} - Task name";
str_macro.id="${id} - index of stream";
str_macro.seq="${seq} - index of segment";
str_macro.starttime="${starttime} - start time of encoding";
str_macro.curtime="${curtime} - current time of segment";
str_macro.bitrate_hls="${bitrate} - Bitrate of stream";
str_macro.videobitrate="${videobitrate} - Bitrate of video codec";