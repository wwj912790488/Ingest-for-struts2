var pageControl = null;

function record_init() {
    $("#menu_add_record_fulltime_task").click(showAddFulltimeRecordTask);
    $("#menu_add_record_schedule_task").click(showAddScheduleRecordTask);
    $("#menu_add_record_epg_task").click(showUploadEpgFileDialog);
    $("#menu_add_record_weekly_task").click(showUploadWeeklyFileDialog);

    $("#btnDelete").click(confirmDelete);
    $("#btnEdit").click(editRecordTask);
    $("#btnCopy").click(copyRecordTask);
    $("#btnQuery").click(onQueryList);
    $("#btnReschedule").click(confirmReschedules);
    $("#btnSetting").click(showSetting);
    $("#btnExport").click(batchExport);


    $(".tab_content").find("input[type=checkbox]").change(onToggleSelection);
    onToggleSelection();
    $(".tab_header input[type=checkbox]").change(function () {
        var checked = this.checked;
        $(".tab_content input[type=checkbox]").each(function () {
            if (this.checked != checked) {
                this.checked = checked;
                $(this).trigger("change");
            }
        });
    });

    var queryForm = $("#queryForm");
    pageControl = $.pagination({
        "method": "get",
        "data": {
            "task.id": queryForm.find("input[name='task.id']").val(),
            "task.name": queryForm.find("input[name='task.name']").val(),
            "task.recordType": queryForm.find("select[name='task.recordType']").val(),
            "task.channelId": queryForm.find("select[name='task.channelId']").val(),
        }
    });

    $(".button_epgtime").click(showEpgItems);
//	$(".button_weeklytime").click(showWeeklyItems);
}

function refreshPage() {
    if (pageControl != null) {
        pageControl.refresh();
    }
}

function onToggleSelection() {
    var length = $(".tab_content").find("input[type=checkbox]:checked").length;
    if (length == 0) {
        $("#btnDelete").hide();
        $("#statusText").show();
    } else {
        $("#btnDelete").show();
        $("#statusText").hide();
    }
    $("#btnCopy").hide();
    $("#btnReschedule").hide();
    if (length == 1) {
        $("#btnEdit").show();
        var checked = $(".tab_content").find("input[type=checkbox]:checked");
        var type = checked.parentsUntil(".tab_content").find(".tag_recordtype").text();
        if (type != "EPG") {
            $("#btnCopy").show();
        }
    } else {
        $("#btnEdit").hide();
    }

    if (length >= 1) {
        var checked = $(".tab_content").find("input[type=checkbox]:checked");
        var count = 0;
        checked.each(function () {
            var type = $(this).parentsUntil(".tab_content").find(".tag_recordtype").text();
            if (type != "EPG") {
                count++;
            }
        });
        if (count >= 1) {
            $("#btnReschedule").show();
        }
    }
}

function onQueryList() {
    if (!checkNumFields(["id"])) {
        $("#queryForm").submit();
    }
}

function checkNumFields(fieldNames) {
    var hasError = false;
    var queryForm = $("#queryForm");
    for (var i = 0; i < fieldNames.length; i++) {
        var field = queryForm.find("input[name='task." + fieldNames[i] + "']");
        var value = field.val();
        if (value != "" && isNaN(value)) {
            field.addClass("field_input_error");
            hasError = true;
        } else {
            field.removeClass("field_input_error");
        }
    }
    return hasError;
}


function confirmDelete() {
    var ids = new Array();
    $(".tab_content").find("input[type=checkbox]:checked").each(function () {
        ids += "&ids=" + $(this).val();
    });
    if (ids == "") {
        return;
    }
    ids = ids.substring(1);
    showConfirmDialog(getText("msg.dialog.title.warning"), CONFIRM_DELETE_MESSAGE, function () {
        deleteRecords(ids);
    });
};

function deleteRecords(ids) {
    var loading = createLoading("", getText("common.operation.executing"));
    loading.show();
    $.post('deleteRecord.action', ids, function (data) {
        loading.hide();
        if (data.result.success) {
            refreshPage();
        } else {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        loading.hide();
        showErrorMessage(getText("common.error.unknown"));
    });
};

function confirmReschedule() {
    var id = $(".tab_content").find("input[type=checkbox]:checked:first").val();
    if (id == "") {
        return;
    }

    showConfirmDialog(getText("msg.dialog.title.warning"), CONFIRM_RESCHEDULE_MESSAGE, function () {
        rescheduleRecordTask(id);
    });
}

function rescheduleRecordTask(id) {
    var loading = createLoading("", getText("common.operation.executing"));
    loading.show();
    var params = {};
    params["task.id"] = id;
    $.post('rescheduleRecord.action', params, function (data) {
        loading.hide();
        if (!data.result.success) {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        loading.hide();
        showErrorMessage(getText("common.error.unknown"));
    });
}

function confirmReschedules() {

    var ids = new Array();
    $(".tab_content").find("input[type=checkbox]:checked").each(function () {
        ids += "&ids=" + $(this).val();
    });
    if (ids == "") {
        return;
    }

    showConfirmDialog(getText("msg.dialog.title.warning"), CONFIRM_RESCHEDULE_MESSAGE, function () {
        rescheduleRecordTasks(ids);
    });
}

function rescheduleRecordTasks(ids) {
    var loading = createLoading("", getText("common.operation.executing"));
    loading.show();
    $.post('rescheduleRecord.action', ids, function (data) {
        loading.hide();
        if (!data.result.success) {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        loading.hide();
        showErrorMessage(getText("common.error.unknown"));
    });
}

function showSetting() {
    var uri = "editRecordSetting.action";
    var dialogId = "dialog_edit_record_setting";
    createTemplateDialogByUri(uri, {}, dialogId, onEditSettingDialogCreated);
}

function onEditSettingDialogCreated(dialog) {

    // select file view
    dialog.find("#btnFileView1").click(function () {
        showFileDialog(dialog, dialog.find("input[name='setting.fulltimeFilePath']"));
    });
    dialog.find("#btnFileView2").click(function () {
        showFileDialog(dialog, dialog.find("input[name='setting.scheduleFilePath']"));
    });
    dialog.find("#btnFileView3").click(function () {
        showFileDialog(dialog, dialog.find("input[name='setting.epgFilePath']"));
    });
    dialog.find("#btnFileView4").click(function () {
        showFtpFileDialog(dialog, dialog.find("input[name='setting.ftpPath']"), true);
    });

    // thumbnail checkbox changed
    var thumbBox = dialog.find("input[name='setting.enableThumb']");
    thumbBox.change(function () {
        disableField(dialog, "input[name='setting.thumbWidth']", !this.checked);
    });
    disableField(dialog, "input[name='setting.thumbWidth']", !thumbBox[0].checked);

    // temp extension checkbox changed
    var enableTempExtension = dialog.find("input[name='setting.enableTempExtension']");
    enableTempExtension.change(function () {
        disableField(dialog, "input[name='setting.tempExtension']", !this.checked);
    });
    disableField(dialog, "input[name='setting.tempExtension']", !enableTempExtension[0].checked);

    // delete files checkbox changed
    dialog.find("input[name='deleteFiles']").change(function () {
        disableField(dialog, "input[name='keepTimesValue']", !this.checked);
        disableField(dialog, "select[name='keepTimesUnit']", !this.checked);
    });
    var keepTimes = dialog.find("input[name='setting.fulltimeKeepTimes']").val();
    if (keepTimes > 0) {
        if (keepTimes % (24 * 60) == 0) {
            dialog.find("select[name='keepTimesUnit']").val("1");
            dialog.find("input[name='keepTimesValue']").val(keepTimes / 60 / 24);
        } else {
            dialog.find("select[name='keepTimesUnit']").val("2");
            dialog.find("input[name='keepTimesValue']").val(keepTimes / 60);
        }
        dialog.find("input[name='deleteFiles']").attr("checked", true).change();
    } else {
        disableField(dialog, "input[name='keepTimesValue']", true);
        disableField(dialog, "select[name='keepTimesUnit']", true);
    }

    // save button
    dialog.click("#btnSave", function () {
        updateRecordSetting(dialog);
        closeFileDialog(dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });

    //ftp test
    dialog.find("#btnFtpTest").click(function () {
        var ip = dialog.find("input[name='setting.ftpip']").val();
        var username = dialog.find("input[name='setting.ftpuser']").val();
        var password = dialog.find("input[name='setting.ftppass']").val();
        ftpConntection(ip, username, password)
    });


    // show dialog
    dialog.setSize(600, 500);
    dialog.show();
}

function ftpConntection(ip, username, password) {
    $.get('ftpConntection.action', {"ip": ip, "username": username, "password": password}, function (data) {
        var resultdata = eval("(" + data + ")");
        if (resultdata.result.success) {
            showMessage("message", resultdata.result.message)
            //dialog.close();
        } else {
            showErrorMessage(resultdata.result.message);
        }
    }, 'json').error(function () {
        showErrorMessage(getText("common.error.unknown"));
    });

}

function updateRecordSetting(dialog) {
    var isVerifyOk = true;
    isVerifyOk &= verifyInputRegExp(dialog, "input[name='setting.startOffsetTime']", /^[0-9]+$/);
    isVerifyOk &= verifyInputRegExp(dialog, "input[name='setting.stopOffsetTime']", /^[0-9]+$/);
    if (dialog.find("input[name='setting.enableTempExtension']:checked").length != 0) {
        isVerifyOk &= verifyInputRegExp(dialog, "input[name='setting.tempExtension']", /^\.[a-zA-Z]+$/);
    }
    if (dialog.find("input[name='setting.enableThumb']:checked").length != 0) {
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='setting.thumbWidth']");
    }
    var deleteFiles = dialog.find("input[name='deleteFiles']:checked").length != 0;
    if (deleteFiles) {
        isVerifyOk &= verifyPositiveNumber(dialog, "input[name='keepTimesValue']");
        isVerifyOk &= verifyInput(dialog, "select[name='keepTimesUnit']");
    }
    if (!isVerifyOk) {
        return;
    }
    var keepTimes = dialog.find("input[name='setting.fulltimeKeepTimes']");
    if (deleteFiles) {
        var times = dialog.find("input[name='keepTimesValue']").val();
        var unit = dialog.find("select[name='keepTimesUnit']").val();
        if (unit == 1) {
            times = times * 24 * 60;
        } else if (unit == 2) {
            times = times * 60;
        }
        keepTimes.val(times);
    } else {
        keepTimes.val("");
    }
    var data = dialog.find("form").serialize();
    $.post('updateRecordSetting.action', data, function (data) {
        if (data.result.success) {
            dialog.close();
        } else {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        showErrorMessage(getText("common.error.unknown"));
    });
};

/**
 * Create file dialog.
 *
 * @param template
 * @returns {TemplateDialog} the file dialog.
 */
function createFileDialog(template) {
    var dialog = createTemplateDialog(template);
    var fileView = dialog.find("#fileTreeContent");
    var loadFileTree = function () {
        fileView.fileTree({
            root: '/',
            expandSpeed: -1,
            collapseSpeed: -1,
            onlyFolder: false,
            script: 'getDirFiles?onlyFolder=true'
        }, null);
    };
    loadFileTree();
    dialog.click("#btnRefresh", loadFileTree);
    dialog.click("#btnOk", function () {
        this.dialog.hide();
        this.dialog.target.val(fileView.getFilePath());
    });
    dialog.click("#btnCancel", function () {
        this.dialog.hide();
    });
    dialog.maskTransparent = true;
    dialog.setSize(600, 400);
    return dialog;
}

function createFtpFileDialog(template, ip, username, password, ftpFlag) {
    var dialog = createTemplateDialog(template);
    var fileView = dialog.find("#fileFtpTreeContent");
    var loadFileTree = function () {
        fileView.fileTree({
            root: '/',
            expandSpeed: -1,
            collapseSpeed: -1,
            onlyFolder: false,
            script: 'getDirFtpFiles?onlyFolder=true&ftpFlag=' + ftpFlag + '&IP=' + ip + "&userName=" + username + "&passWrod=" + password
        }, null);
    };
    loadFileTree();
    dialog.click("#btnFtpRefresh", loadFileTree);
    dialog.click("#btnFtpOk", function () {
        this.dialog.hide();
        this.dialog.target.val(fileView.getFilePath());
    });
    dialog.click("#btnFtpCancel", function () {
        this.dialog.hide();
    });
    dialog.maskTransparent = true;
    dialog.setSize(600, 400);
    return dialog;
}

function showFileDialog(dialog, target) {

    dialog.fileDialog = createFileDialog($("#dialg_for_select_folder"));

    dialog.fileDialog.target = target;
    dialog.fileDialog.show();
}

function showFtpFileDialog(dialog, target, ftpFlag) {
    var ip = dialog.find("input[name='setting.ftpip']").val();
    var username = dialog.find("input[name='setting.ftpuser']").val();
    var password = dialog.find("input[name='setting.ftppass']").val();

    dialog.fileDialog = createFtpFileDialog($("#dialg_for_ftp_select_folder"), ip, username, password, ftpFlag);

    dialog.fileDialog.target = target;
    dialog.fileDialog.show();
}


function closeFileDialog(dialog) {
    if (dialog.fileDialog != null) {
        dialog.fileDialog.close();
        dialog.fileDialog = null;
    }
}

function initThumbCheckbox(dialog) {
    var thumbBox = dialog.find("input[name='task.generateThumb']");
    thumbBox.change(function () {
        disableField(dialog, "input[name='task.thumbWidth']", !this.checked);
        disableField(dialog, "input[name='task.thumbHeight']", true);
    });
    disableField(dialog, "input[name='task.thumbWidth']", !thumbBox[0].checked);
    disableField(dialog, "input[name='task.thumbHeight']", true);
}


function batchExport() {
    var action = "exportRecord.action";

    $("#queryForm").attr("action", action);
    $("#queryForm").submit();
}

//------------------------------------------------------------------------------------------
function copyRecordTask() {
    var checked = $(".tab_content").find("input[type=checkbox]:checked");
    var type = checked.parentsUntil(".tab_content").find(".tag_recordtype").text();
    var dialogId = "dialog_add_record_task";
    var params = {};
    params["task.id"] = checked.val();
    if (type == "FULLTIME") {
        createTemplateDialogByUri("addFullTimeRecord.action", params, dialogId, onAddFulltimeRecordTaskDialogCreated);

    } else if (type == "SCHEDULE") {
        createTemplateDialogByUri("addScheduleRecord.action", params, dialogId, onAddScheduleRecordTaskDialogCreated);

    }
}

function showAddFulltimeRecordTask() {
    var uri = "addFullTimeRecord.action";
    var dialogId = "dialog_add_record_task";
    createTemplateDialogByUri(uri, {}, dialogId, onAddFulltimeRecordTaskDialogCreated);
}

function disableComplexChannels(dialog, disabled) {
    dialog.find("#taskchanneltypesingle").attr("disabled", !disabled);
    dialog.find("#taskchanneltypecomplex").attr("disabled", disabled);
    dialog.find("#taskchanneltypesingle select").attr("disabled", !disabled);
    dialog.find("#taskchanneltypecomplex input").attr("disabled", disabled);
    dialog.find("#taskchanneltypecomplex div").attr("disabled", disabled);
}
function disableAllChannels(dialog, disabled) {
    dialog.find("#taskchanneltypesingle").attr("disabled", disabled);
    dialog.find("#taskchanneltypecomplex").attr("disabled", disabled);
    dialog.find("#taskchanneltypesingle select").attr("disabled", disabled);
    dialog.find("#taskchanneltypecomplex input").attr("disabled", disabled);
    dialog.find("#taskchanneltypecomplex div").attr("disabled", disabled);
}

function changeChannelRecordMode(dialog) {
    var disabled = dialog.find("input[name='task.schedule.channelType']:checked").val() == "single";

    disableComplexChannels(dialog, disabled);

    //select all
    if (dialog.find("input[name='task.schedule.channelType']:checked").val() == "all") {
        dialog.find(".channel_line").each(function () {
            var tab = $(this);
            tab.find("input[type='checkbox']").prop("checked", true);
        });
        disableAllChannels(dialog, !disabled);
    }

    if (!disabled) {
        dialog.find("#complexChannelArea").css("height", "100px");
    } else {
        dialog.find("#complexChannelArea").css("height", "20px");
    }
    dialog.setSize(600, 400);
}

function onAddFulltimeRecordTaskDialogCreated(dialog) {
    // select the only one profile
    var profiles = dialog.find("select[name='task.profile'] option");
    if (profiles.length == 2) {
        profiles[1].selected = true;
    }

    // set segment length to 1 hour by default
    if (dialog.find("select[name='task.segmentLength']").val() == "") {
        dialog.find("select[name='task.segmentLength']").val("3600");
    }

    dialog.find("select[name='task.segmentLength']").change(function () {
        if (dialog.find("select[name='task.segmentLength']").val() == 9999) {
            dialog.find("input[name='task.segmentLength']").show();
        } else {
            dialog.find("input[name='task.segmentLength']").hide();
        }
    });

    // select channel mode
    dialog.find("input[name='task.schedule.channelType']").change(function () {
        changeChannelRecordMode(dialog);
    });
    if (dialog.find("input[name='task.schedule.channelType']:checked").length > 0) {
        changeChannelRecordMode(dialog);
    } else {
        dialog.find("input[name='task.schedule.channelType']:first").click();
    }

    // select file view
    dialog.find("#btnFileView").click(function () {
        showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
    });

    // select FTP file view
    dialog.find("#btnFtpFileView").click(function () {
        showFtpFileDialog(dialog, dialog.find("input[name='setting.ftpPath']"), false);
    });

    //
    dialog.find("select[name='task.channelId']").change(function () {
        var channelId = $(this).children('option:selected').val();
        dialog.find("select[name='task.channelReocrdPath']").val(channelId);
        var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
        if (path != null && path != "") {
            dialog.find("input[name='task.outputPath']").val(path);
        }
    });

    // start now checkbox changed
    dialog.find("input[name='startNow']").change(function () {
        disableField(dialog, "input[name='task.schedule.startDate']", this.checked);
        disableField(dialog, "input[name='task.schedule.startTime']", this.checked);
    });

    // always loop checkbox changed
    dialog.find("input[name='alwaysLoop']").change(function () {
        disableField(dialog, "input[name='task.schedule.endDate']", this.checked);
        disableField(dialog, "input[name='task.schedule.endTime']", this.checked);
    });
    if (dialog.find("input[name='task.schedule.endType']").val() == "CONTINUOUS") {
        dialog.find("input[name='alwaysLoop']").attr("checked", true).change();
    }

    // thumbnail checkbox changed
    initThumbCheckbox(dialog);

    //create folder map
    var createFolder = dialog.find("input[name='task.createFolderMap']").val().length != 0;
    dialog.find("input[name='task.createFolder']").attr("checked", createFolder).change();

    //FtpOptin;
    if (dialog.find("input[name='task.ftpOption']:checked").length > 0) {
        var path = dialog.find("input[name='task.ftpPath']").text();
        if (path != null && path != "") {
            dialog.find("input[name='setting.ftpPath']").val(path);
        }
        dialog.find("input[name='setting.ftpPath']").parent().parent().show();
    } else {
        dialog.find("input[name='setting.ftpPath']").parent().parent().hide();
    }

    dialog.find("#ftp_Option").click(function () {
        if (dialog.find("input[name='task.ftpOption']").prop("checked")) {
            var ip = dialog.find("input[name='setting.ftpip']").val();
            if (ip == null || ip == "") {
                showErrorMessage(getText("record.task.ftp.setting.warning"));

            }
            dialog.find("input[name='setting.ftpPath']").parent().parent().show();
        }
        else
            dialog.find("input[name='setting.ftpPath']").parent().parent().hide();
    });


    // delete files checkbox changed
    dialog.find("input[name='deleteFiles']").change(function () {
        disableField(dialog, "input[name='keepTimesValue']", !this.checked);
        disableField(dialog, "select[name='keepTimesUnit']", !this.checked);
    });
    var keepTimes = dialog.find("input[name='task.keepTimes']").val();
    if (keepTimes > 0) {
        if (keepTimes % (24 * 60) == 0) {
            dialog.find("select[name='keepTimesUnit']").val("1");
            dialog.find("input[name='keepTimesValue']").val(keepTimes / 60 / 24);
        } else {
            dialog.find("select[name='keepTimesUnit']").val("2");
            dialog.find("input[name='keepTimesValue']").val(keepTimes / 60);
        }
        dialog.find("input[name='deleteFiles']").attr("checked", true).change();
    } else {
        disableField(dialog, "input[name='keepTimesValue']", true);
        disableField(dialog, "select[name='keepTimesUnit']", true);
    };

    // save button
    dialog.click("#btnSave", function () {
        saveFulltimeRecordTask(dialog);
        closeFileDialog(dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });

    // show dialog
    dialog.setSize(600, 400);
    dialog.show();
}

function disableField(dialog, filter, disabled) {
    dialog.find(filter).attr("disabled", disabled);
}

function verifyInput(dialog, filter) {
    var input = dialog.find(filter);
    input.removeClass("field_input_error");
    if (input.val().trim() == "") {
        input.addClass("field_input_error");
        input.focus();
        return false;
    }
    return true;
}

function verifyInputRegExp(dialog, filter, regexp) {
    var input = dialog.find(filter);
    input.removeClass("field_input_error");
    if (!regexp.test(input.val().trim())) {
        input.addClass("field_input_error");
        input.focus();
        return false;
    }
    return true;
}

function verifyPositiveNumber(dialog, filter) {
    var input = dialog.find(filter);
    input.removeClass("field_input_error");
    if (!/^[1-9][0-9]*$/.test(input.val().trim())) {
        input.addClass("field_input_error");
        input.focus();
        return false;
    }
    return true;
}

function verifyThumbNumber(dialog, filter) {
    var input = dialog.find(filter);
    input.removeClass("field_input_error");
    if (!/^(-1)|([1-9][0-9]*)$/.test(input.val().trim())) {
        input.addClass("field_input_error");
        input.focus();
        return false;
    }
    return true;
}

function verifyCheckbox(dialog, filter) {
    var input = dialog.find(filter);
    input.removeClass("field_input_error");
    var hasChecked = false;
    input.each(function () {
        if (this.checked) {
            hasChecked = this.checked;
        }
    });
    if (!hasChecked) {
        input.addClass("field_input_error");
        input.focus();
        return false;
    }
    return true;
}


function saveFulltimeRecordTask(dialog) {
    var isVerifyOk = true;
    var isSingleChannel = true;
    var param = {};
    var index = 0;

    if (dialog.find("input[name='task.schedule.channelType']:checked").val() == "single") {
        isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    } else {
        isSingleChannel = false;
        dialog.find(".channel_line").each(function () {
            var tab = $(this);
            if (tab.find("input[type='checkbox']")[0].checked) {
                param["task.channels[" + index + "].id"] = tab.find("input[name='channelId']").val();
                param["task.channels[" + index + "].name"] = tab.find("input[name='channelName']").val();
                index++;
            }
        });

        isVerifyOk &= (index > 0);
    }

    isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
    param["task.profile"] = dialog.find("select[name='task.profile']").val();
    isVerifyOk &= verifyInput(dialog, "select[name='task.segmentLength']");
    param["task.segmentLength"] = dialog.find("select[name='task.segmentLength']").val();
    isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
    param["task.fileName"] = dialog.find("input[name='task.fileName']").val();
    isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
    param["task.outputPath"] = dialog.find("input[name='task.outputPath']").val();
    if (dialog.find("input[name='startNow']:checked").length == 0) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
        param["task.schedule.startDate"] = dialog.find("input[name='task.schedule.startDate']").val();
        param["task.schedule.startTime"] = dialog.find("input[name='task.schedule.startTime']").val();
    } else {
        param["startNow"] = "true";
    }
    if (dialog.find("input[name='alwaysLoop']:checked").length == 0) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endDate']");
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
        param["task.schedule.endDate"] = dialog.find("input[name='task.schedule.endDate']").val();
        param["task.schedule.endTime"] = dialog.find("input[name='task.schedule.endTime']").val();
    } else {
        param["alwaysLoop"] = "true";
    }
    if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
        param["task.generateThumb"] = "true";
        param["task.thumbWidth"] = dialog.find("input[name='task.thumbWidth']").val();
        param["task.thumbHeight"] = dialog.find("input[name='task.thumbHeight']").val();
    } else {
        param["task.generateThumb"] = "false";
    }

    var deleteFiles = dialog.find("input[name='deleteFiles']:checked").length != 0;
    if (deleteFiles) {
        isVerifyOk &= verifyPositiveNumber(dialog, "input[name='keepTimesValue']");
        isVerifyOk &= verifyInput(dialog, "select[name='keepTimesUnit']");
    }

    if (dialog.find("select[name='task.segmentLength']").val() == 9999) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.segmentLength']");
    }

    var createFolder = dialog.find("input[name='task.createFolder']:checked").length != 0;
    if (createFolder) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.createFolderMap']");
    }

    param["task.schedule.scheduleType"] = dialog.find("input[name='task.schedule.scheduleType']").val();
    param["task.schedule.startType"] = dialog.find("input[name='task.schedule.startType']").val();
    param["task.schedule.endType"] = dialog.find("input[name='task.schedule.endType']").val();
    param["task.schedule.source"] = dialog.find("input[name='task.schedule.source']").val();
    //ftp saveFulltimeRecordTask  task.ftpPath
    dialog.find("input[name='task.ftpPath']").val(dialog.find("input[name='setting.ftpPath']").val());
    if (dialog.find("input[name='task.ftpOption']:checked").length > 0) {
        param["task.ftpOption"] = dialog.find("input[name='task.ftpOption']").val();
        param["task.ftpPath"] = dialog.find("input[name='setting.ftpPath']").val();
    }


    if (!isVerifyOk) {
        return;
    }

    var keepTimes = dialog.find("input[name='task.keepTimes']");
    if (deleteFiles) {
        var times = dialog.find("input[name='keepTimesValue']").val();
        var unit = dialog.find("select[name='keepTimesUnit']").val();
        if (unit == 1) {
            times = times * 24 * 60;
        } else if (unit == 2) {
            times = times * 60;
        }
        keepTimes.val(times);
        param["task.keepTimes"] = times;
    } else {
        keepTimes.val("");
        param["task.keepTimes"] = "";
    }

    var createFolderMap = dialog.find("input[name='task.createFolderMap']");
    if(!createFolder){
        createFolderMap.val("");
    }

    if (!isSingleChannel) {
        dialog.find("#taskchanneltypecomplex").attr("disabled", true);
        dialog.find("#taskchanneltypecomplex input").attr("disabled", true);
        dialog.find("#taskchanneltypecomplex div").attr("disabled", true);
    }
    if (dialog.find("select[name='task.segmentLength']").val() == 9999) {
        dialog.find("select[name='task.segmentLength']").attr("disabled", true);
        param["task.segmentLength"] = dialog.find("input[name='task.segmentLength']").val();
    } else {
        dialog.find("input[name='task.segmentLength']").attr("disabled", true);
    }
    var data = dialog.find("form").serialize();
    if (isSingleChannel) {
        $.post('saveFullTimeRecord.action', data, function (data) {
            if (data.result.success) {
                dialog.close();
                refreshPage();
            } else {
                showErrorMessage(data.result.message);
            }
        }, 'json').error(function () {
            showErrorMessage(getText("common.error.unknown"));
        });
    } else {
        $.post('saveBatchFullTimeRecords.action', param, function (data) {
            if (data.result.success) {
                dialog.close();
                refreshPage();
            } else {
                showErrorMessage(data.result.message);
            }
        }, 'json').error(function () {
            showErrorMessage(getText("common.error.unknown"));
        });
    }

};

function showAddScheduleRecordTask() {
    var uri = "addScheduleRecord.action";
    var dialogId = "dialog_add_record_task";
    createTemplateDialogByUri(uri, {}, dialogId, onAddScheduleRecordTaskDialogCreated);
}

function disableRepeatFields(dialog, disabled) {
    dialog.find("#endDateTr").attr("disabled", disabled);
    dialog.find("#weekdayTr").attr("disabled", disabled);
    dialog.find("#endDateTr input").attr("disabled", disabled);
    dialog.find("#weekdayTr input").attr("disabled", disabled);
}

function disableAllFields(dialog, disabled) {
    dialog.find("#endDateTr").attr("disabled", disabled);
    dialog.find("#weekdayTr").attr("disabled", disabled);
    dialog.find("#endDateTr input").attr("disabled", disabled);
    dialog.find("#weekdayTr input").attr("disabled", disabled);
}

function changeScheduleMode(dialog) {
    var disabled = dialog.find("input[name='task.schedule.scheduleType']:checked").val() == "ONCE";
    disableRepeatFields(dialog, disabled);

    //select all
    if (dialog.find("input[name='task.schedule.channelType']:checked").val() == "all") {
        dialog.find(".channel_line").each(function () {
            var tab = $(this);
            tab.find("input[type='checkbox']").prop("checked", true);
        });
        disableAllFields(dialog, !disabled);
    }

    if (!disabled) {
        dialog.find("#complexChannelArea").css("height", "100px");
    } else {
        dialog.find("#complexChannelArea").css("height", "20px");
    }
    dialog.setSize(600, 400);
}

function onAddScheduleRecordTaskDialogCreated(dialog) {
    // select the only one profile
    var profiles = dialog.find("select[name='task.profile'] option");
    if (profiles.length == 2) {
        profiles[1].selected = true;
    }

    // select channel mode
    dialog.find("input[name='task.schedule.channelType']").change(function () {
        changeChannelRecordMode(dialog);
    });
    if (dialog.find("input[name='task.schedule.channelType']:checked").length > 0) {
        changeChannelRecordMode(dialog);
    } else {
        dialog.find("input[name='task.schedule.channelType']:first").click();
    }

    // select schedule mode
    dialog.find("input[name='task.schedule.scheduleType']").change(function () {
        changeScheduleMode(dialog);
    });
    if (dialog.find("input[name='task.schedule.scheduleType']:checked").length > 0) {
        changeScheduleMode(dialog);
    } else {
        dialog.find("input[name='task.schedule.scheduleType']:first").click();
    }

    var weekday = dialog.find("input[name='task.schedule.days']").val();
    if (weekday > 0) {
        dialog.find("input[name='weekday']").each(function () {
            $(this).attr("checked", (weekday & $(this).val()) != 0);
        });
    }

    // thumbnail checkbox changed
    initThumbCheckbox(dialog);

    //create folder map
    var createFolder = dialog.find("input[name='task.createFolderMap']").val().length != 0;
    dialog.find("input[name='task.createFolder']").attr("checked", createFolder).change();

    //FtpOptin;
    if (dialog.find("input[name='task.ftpOption']:checked").length > 0) {
        var path = dialog.find("input[name='task.ftpPath']").val();
        if (path != null && path != "") {
            dialog.find("input[name='setting.ftpPath']").val(path);
        }
        dialog.find("input[name='setting.ftpPath']").parent().parent().show();
    } else {
        dialog.find("input[name='setting.ftpPath']").parent().parent().hide();
    }

    dialog.find("#ftp_Option").click(function () {
        if (dialog.find("input[name='task.ftpOption']").prop("checked")) {
            var ip = dialog.find("input[name='setting.ftpip']").val();
            if (ip == null || ip == "") {
                showErrorMessage(getText("record.task.ftp.setting.warning"));
            }
            dialog.find("input[name='setting.ftpPath']").parent().parent().show();
        }
        else
            dialog.find("input[name='setting.ftpPath']").parent().parent().hide();
    })

    //
    dialog.find("select[name='task.channelId']").change(function () {
        var channelId = $(this).children('option:selected').val();
        dialog.find("select[name='task.channelReocrdPath']").val(channelId);
        var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
        if (path != null && path != "") {
            dialog.find("input[name='task.outputPath']").val(path);
        }
    });

    // select file view
    dialog.find("#btnFileView").click(function () {
        showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
    });


    // select FTP file view
    dialog.find("#btnFtpFileView").click(function () {
        showFtpFileDialog(dialog, dialog.find("input[name='setting.ftpPath']"), false);
    });

    // save button
    dialog.click("#btnSave", function () {
        saveScheduleRecordTask(dialog);
        closeFileDialog(dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });

    // show dialog
    dialog.setSize(600, 450);
    dialog.show();
}

function saveScheduleRecordTask(dialog) {
    var isVerifyOk = true;
    var isSingleChannel = true;
    var param = {};
    var index = 0;

    if (dialog.find("input[name='task.schedule.channelType']:checked").val() == "single") {
        isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    } else {
        isSingleChannel = false;
        dialog.find(".channel_line").each(function () {
            var tab = $(this);
            if (tab.find("input[type='checkbox']")[0].checked) {
                param["task.channels[" + index + "].id"] = tab.find("input[name='channelId']").val();
                param["task.channels[" + index + "].name"] = tab.find("input[name='channelName']").val();
                index++;
            }
        });

        isVerifyOk &= (index > 0);
    }

    isVerifyOk &= verifyInput(dialog, "input[name='task.name']");

    //isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
    param["task.profile"] = dialog.find("select[name='task.profile']").val();
    isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
    param["task.fileName"] = dialog.find("input[name='task.fileName']").val();
    isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
    param["task.outputPath"] = dialog.find("input[name='task.outputPath']").val();

    isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
    param["task.schedule.startDate"] = dialog.find("input[name='task.schedule.startDate']").val();
    param["task.schedule.startTime"] = dialog.find("input[name='task.schedule.startTime']").val();
    param["task.schedule.endTime"] = dialog.find("input[name='task.schedule.endTime']").val();
    var repeated = "ONCE" != dialog.find("input[name='task.schedule.scheduleType']:checked").val();
    if (repeated) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.repeatEndDate']");
        param["task.schedule.repeatEndDate"] = dialog.find("input[name='task.schedule.repeatEndDate']").val();
        isVerifyOk &= verifyCheckbox(dialog, "input[name='weekday']");
    }
    param["task.schedule.scheduleType"] = dialog.find("input[name='task.schedule.scheduleType']:checked").val();
    if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
        param["task.generateThumb"] = "true";
        param["task.thumbWidth"] = dialog.find("input[name='task.thumbWidth']").val();
        param["task.thumbHeight"] = dialog.find("input[name='task.thumbHeight']").val();
    } else {
        param["task.generateThumb"] = "false";
    }
    var createFolder = dialog.find("input[name='task.createFolder']:checked").length != 0;
    if (createFolder) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.createFolderMap']");
    }
    if (!isVerifyOk) {
        return;
    }

    var createFolderMap = dialog.find("input[name='task.createFolderMap']");
    if(!createFolder){
        createFolderMap.val("");
    }

    var taskname = dialog.find("input[name='task.name']").val();
    for (var i = 0; i < taskname.length; i++) {
        taskname = taskname.replace(":", "_");
        taskname = taskname.replace("?", "_");
        taskname = taskname.replace("*", "_");
        taskname = taskname.replace("\"", "_");
    }
    dialog.find("input[name='task.name']").val(taskname);
    param["task.name"] = dialog.find("input[name='task.name']").val();

    var weekday = 0;
    if (repeated) {
        dialog.find("input[name='weekday']:checked").each(function () {
            weekday |= $(this).val();
        });
    }
    dialog.find("input[name='task.schedule.days']").val(weekday);
    param["task.schedule.days"] = dialog.find("input[name='task.schedule.days']").val();
    param["task.schedule.repeatEndType"] = dialog.find("input[name='task.schedule.repeatEndType']").val();
    param["task.recordType"] = dialog.find("input[name='task.recordType']").val();
    param["task.schedule.source"] = dialog.find("input[name='task.schedule.source']").val();
    param["task.schedule.startType"] = dialog.find("input[name='task.schedule.startType']").val();
    param["task.schedule.endType"] = dialog.find("input[name='task.schedule.endType']").val();
    param["task.schedule.endDate"] = dialog.find("input[name='task.schedule.endDate']").val();
    param["task.schedule.interval"] = dialog.find("input[name='task.schedule.interval']").val();
    //saveScheduleRecordTask
    if (dialog.find("input[name='task.ftpOption']:checked").length > 0) {
        param["task.ftpOption"] = dialog.find("input[name='task.ftpOption']").val();
        param["task.ftpPath"] = dialog.find("input[name='setting.ftpPath']").val();
    }

    if (!isSingleChannel) {
        dialog.find("#taskchanneltypecomplex").attr("disabled", true);
        dialog.find("#taskchanneltypecomplex input").attr("disabled", true);
        dialog.find("#taskchanneltypecomplex div").attr("disabled", true);
    }

    var data = dialog.find("form").serialize();
    if (isSingleChannel) {
        $.post('saveScheduleRecord.action', data, function (data) {
            if (data.result.success) {
                dialog.close();
                refreshPage();
            } else {
                showErrorMessage(data.result.message);
            }
        }, 'json').error(function () {
            showErrorMessage(getText("common.error.unknown"));
        });
    }
    else {
        $.post('saveBatchScheduleRecord.action', param, function (data) {
            if (data.result.success) {
                dialog.close();
                refreshPage();
            } else {
                showErrorMessage(data.result.message);
            }
        }, 'json').error(function () {
            showErrorMessage(getText("common.error.unknown"));
        });
    }

};

function showUploadEpgFileDialog() {
    var uri = "selectEpgFile.action";
    var dialogId = "dialog_add_record_task";
    createTemplateDialogByUri(uri, {}, dialogId, onSelectEpgFileDialogCreated);
}

function onSelectEpgFileDialogCreated(dialog) {
    // next button
    dialog.click("#btnNext", function () {
        uploadEpgFile(this.dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
    });

    dialog.find("select[name='task.channelId']").change(function () {
        var channelId = $(this).children('option:selected').val();
        dialog.find("select[name='task.channelEpgPath']").val(channelId);
        var path = dialog.find("select[name='task.channelEpgPath']").children('option:selected').text();
        if (path != null && path != "") {
            dialog.find("span[name='epgFilePath']").text(path);
        }
        //else{
        //	dialog.find("span[name='epgFilePath']").text("");
        //}
    });

    if (GetLicense("PRODUCT_CNTV") == 1) {
        dialog.find("#warning_or").show();
        dialog.find("#warning_filepath").show();
    } else {
        dialog.find("#warning_or").hide();
        dialog.find("#warning_filepath").hide();
    }

    // show dialog
    dialog.setSize(600, 300);
    dialog.show();
}

function uploadEpgFile(dialog) {
    var fileNotSelected = dialog.find("#epgFile").val().length == 0;
    dialog.find('#fileTitle').css("color", fileNotSelected ? "red" : "black");

    var filePathNotSelected = dialog.find("#epgFilePath").text().length == 0;
    dialog.find('#filePathTitle').css("color", filePathNotSelected ? "red" : "black");

    if (fileNotSelected && filePathNotSelected) {
        return;
    }

    if ($("#dialog_upload_epg").size() == 0)
        $(document.body).append("<div id=\"dialog_upload_epg\" style=\"display: none\"></div>");
    $("#dialog_upload_epg").empty().append(dialog.find("#epgFile"));

    if (filePathNotSelected) {
        var loading = createLoading("", getText("common.operation.executing"));
        loading.show();
        $.ajaxFileUpload({
            url: 'addEpgRecord.action',
            secureuri: false,
            fileElementId: 'epgFile',
            dataType: "text",
            success: function (data, status) {
                loading.close();
                if (data != undefined && data.indexOf("form") != -1) {
                    showAddEpgRecordTask(dialog, data);
                } else {
                    dialog.close();
                }
            },
            error: function (data, status, e) {
                loading.close();
            }
        });
    } else if (fileNotSelected) {
        var loading = createLoading("", getText("common.operation.executing"));
        loading.show();
        var param = "epgFilePath=" + dialog.find("#epgFilePath").text();
        param += "&selectChannelId=" + dialog.find("select[name='task.channelId']").children('option:selected').val();
        $.post("addEpgFileRecord.action", param, function (data, status) {
            loading.close();
            if (data != undefined && data.indexOf("form") != -1) {
                showAddEpgRecordTask(dialog, data);
            } else {
                dialog.close();
            }
        }).error(function (data, status, e) {
            loading.close();
        });
        //$.ajax({
        //	url : 'addEpgFileRecord.action',
        //	type: 'POST',
        //	data : param,
        //	dataType : "text",
        //	success : function(data, status) {
        //		loading.close();
        //		if (data != undefined && data.indexOf("form") != -1) {
        //			showAddEpgRecordTask(dialog, data);
        //		} else {
        //			dialog.close();
        //		}
        //	},
        //	error : function(data, status, e) {
        //		loading.close();
        //	}
        //});
    }
    $("#dialog_upload_epg").empty();
}

function showAddEpgRecordTask(dialog, data) {
    $("#dialog_upload_epg").html(data);
    dialog.switchTemplate($("#dialog_upload_epg"));
    $("#dialog_upload_epg").empty();

    // select the only one profile
    var profiles = dialog.find("select[name='task.profile'] option");
    if (profiles.length == 2) {
        profiles[1].selected = true;
    }

    var selectId = dialog.find("input[name='task.selectChannelId']").val();
    if (selectId != null && selectId != "") {
        dialog.find("select[name='task.channelId']").val(selectId);
        dialog.find("select[name='task.channelReocrdPath']").val(selectId);
        var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
        if (path != null && path != "") {
            dialog.find("input[name='task.outputPath']").val(path);
        }
    }

    dialog.find("select[name='task.channelId']").change(function () {
        var channelId = $(this).children('option:selected').val();
        dialog.find("select[name='task.channelReocrdPath']").val(channelId);
        var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
        if (path != null && path != "") {
            dialog.find("input[name='task.outputPath']").val(path);
        }
    });

    // thumbnail checkbox changed
    initThumbCheckbox(dialog);

    // select file view
    dialog.find("#btnFileView").click(function () {
        showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
    });

    // tab page
    dialog.find(".tab_bar").each(function () {
        var bar = $(this);
        var tab = $(this).find(".tab_bar_toggle");
        var checkbox = $(this).find("input[type='checkbox']");
        var content = dialog.find("#tab_content_" + tab.text());
        tab.click(function () {
            dialog.find(".tab_content").hide();
            dialog.find(".tab_bar").css("background-color", "");
            bar.css("background-color", "lightgray");
            content.show();
        });
        checkbox.click(function () {
            tab.click();
            content.find("input[type=checkbox]").each(function () {
                this.checked = checkbox[0].checked;
            });
        });
    });
    dialog.find(".tab_bar_toggle:first").click();

    // toggle all
    dialog.find("#tab_bar_toggle_all").click(function () {
        var checkbox = $(this);
        dialog.find("#epgTable input[type='checkbox']").each(function () {
            this.checked = checkbox[0].checked;
        });
    });

    dialog.click("#btnSave", function () {
        saveEpgRecordTask(dialog);
        closeFileDialog(dialog);
    });
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });
    dialog.setSize(600, 500);
}

function saveEpgRecordTask(dialog) {
    var isVerifyOk = true;

    isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");

    if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
    }

    if (!isVerifyOk) {
        return;
    }

    var param = {};
    param["task.channelId"] = dialog.find("select[name='task.channelId']").val();
    param["task.profile"] = dialog.find("select[name='task.profile']").val();
    param["task.outputPath"] = dialog.find("input[name='task.outputPath']").val();
    param["task.fileName"] = dialog.find("input[name='task.fileName']").val();
    if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
        param["task.generateThumb"] = dialog.find("input[name='task.generateThumb']").val();
        param["task.thumbWidth"] = dialog.find("input[name='task.thumbWidth']").val();
        param["task.thumbHeight"] = dialog.find("input[name='task.thumbHeight']").val();
    }
    var index = 0;
    dialog.find(".epg_record_line").each(function () {
        var tab = $(this);
        if (tab.find("input[type='checkbox']")[0].checked) {
            param["task.epgItemRecordInfos[" + index + "].name"] = tab.find("input[name='programName']").val();
            param["task.epgItemRecordInfos[" + index + "].schedule.startDate"] = tab.find("input[name='startDate']").val();
            param["task.epgItemRecordInfos[" + index + "].schedule.startTime"] = tab.find("input[name='startTime']").val();
            param["task.epgItemRecordInfos[" + index + "].schedule.endTime"] = tab.find("input[name='endTime']").val();
            index++;
        }
    });
    if (index == 0) {
        showErrorMessage(NO_EPG_TIMES_SELECTED);
        return;
    }

    var loading = createLoading("", getText("common.operation.executing"));
    loading.show();
    $.post('saveEpgRecord.action', param, function (data) {
        loading.hide();
        if (data.result.success) {
            dialog.close();
            refreshPage();
        } else {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        loading.hide();
        showErrorMessage(getText("common.error.unknown"));
    });
}

function showEpgItems() {
    var id = $(this).parents(".tab_content").find("input[type=checkbox]").val();
    var uri = "showEpgItems.action";
    var dialogId = "dialog_show_epg_items";
    var param = {};
    param["id"] = id;
    createTemplateDialogByUri(uri, param, dialogId, onShowEpgItemsDialogCreated);
}

function onShowEpgItemsDialogCreated(dialog) {
    // tab page
    dialog.find(".tab_bar").each(function () {
        var bar = $(this);
        var tab = $(this).find(".tab_bar_toggle");
        var content = dialog.find("#tab_content_" + tab.text());
        tab.click(function () {
            dialog.find(".tab_content").hide();
            dialog.find(".tab_bar").css("background-color", "");
            bar.css("background-color", "lightgray");
            content.show();
        });
    });
    dialog.find(".tab_bar_toggle:first").click();

    // Ok button
    dialog.click("#btnOk", function () {
        this.dialog.close();
    });
    // show dialog
    dialog.setSize(600, 300);
    dialog.show();
}
//------------------------------------------------------------------------------------------
function showUploadWeeklyFileDialog() {
    var uri = "selectWeeklyFile.action";
    var dialogId = "dialog_add_record_task";
    createTemplateDialogByUri(uri, {}, dialogId, onSelectWeeklyFileDialogCreated);
}
function onSelectWeeklyFileDialogCreated(dialog) {
    // next button
    dialog.click("#btnNext", function () {
        uploadWeeklyFile(this.dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
    });

    // show dialog
    dialog.setSize(600, 300);
    dialog.show();
}

function uploadWeeklyFile(dialog) {
    var fileNotSelected = dialog.find("#weeklyFile").val().length == 0;
    dialog.find('#fileTitle').css("color", fileNotSelected ? "red" : "black");

    if (fileNotSelected) {
        return;
    }

    if ($("#dialog_upload_weekly").size() == 0)
        $(document.body).append("<div id=\"dialog_upload_weekly\" style=\"display: none\"></div>");
    $("#dialog_upload_weekly").empty().append(dialog.find("#weeklyFile"));

    if (!fileNotSelected) {
        var loading = createLoading("", getText("common.operation.executing"));
        loading.show();
        $.ajaxFileUpload({
            url: 'addWeeklyRecord.action',
            secureuri: false,
            fileElementId: 'weeklyFile',
            dataType: "text",
            success: function (data, status) {
                loading.close();
                if (data != undefined && data.indexOf("form") != -1) {
                    showAddWeeklyRecordTask(dialog, data);
                } else {
                    dialog.close();
                }
            },
            error: function (data, status, e) {
                loading.close();
            }
        });
    }
    $("#dialog_upload_weekly").empty();
}

function showAddWeeklyRecordTask(dialog, data) {
    $("#dialog_upload_weekly").html(data);
    dialog.switchTemplate($("#dialog_upload_weekly"));
    $("#dialog_upload_weekly").empty();

    // select the only one profile
    var profiles = dialog.find("select[name='task.profile'] option");
    if (profiles.length == 2) {
        profiles[1].selected = true;
    }

    dialog.find("select[name='task.channelId']").change(function () {
        var channelId = $(this).children('option:selected').val();
        dialog.find("select[name='task.channelReocrdPath']").val(channelId);
        var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
        if (path != null && path != "") {
            dialog.find("input[name='task.outputPath']").val(path);
        }
    });

    // thumbnail checkbox changed
    initThumbCheckbox(dialog);

    // select file view
    dialog.find("#btnFileView").click(function () {
        showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
    });

    // select schedule mode
    dialog.find("input[name='task.schedule.scheduleType']").change(function () {
        changeScheduleMode(dialog);
    });
    if (dialog.find("input[name='task.schedule.scheduleType']:checked").length > 0) {
        changeScheduleMode(dialog);
    } else {
        dialog.find("input[name='task.schedule.scheduleType']:first").click();
    }

    // tab page
    dialog.find(".tab_bar").each(function () {
        var bar = $(this);
        var tab = $(this).find(".tab_bar_toggle");
        var checkbox = $(this).find("input[type='checkbox']");
        var content = dialog.find("#tab_content_" + tab.find("input:first").val());
        tab.click(function () {
            dialog.find(".tab_content").hide();
            dialog.find(".tab_bar").css("background-color", "");
            bar.css("background-color", "lightgray");
            content.show();
        });
        checkbox.click(function () {
            tab.click();
            content.find("input[type=checkbox]").each(function () {
                this.checked = checkbox[0].checked;
            });
        });
    });
    dialog.find(".tab_bar_toggle:first").click();

    // toggle all
    dialog.find("#tab_bar_toggle_all").click(function () {
        var checkbox = $(this);
        dialog.find("#epgTable input[type='checkbox']").each(function () {
            this.checked = checkbox[0].checked;
        });
    });

    dialog.click("#btnSave", function () {
        saveWeeklyRecordTask(dialog);
        closeFileDialog(dialog);
    });
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });
    dialog.setSize(600, 500);
}

function saveWeeklyRecordTask(dialog) {
    var isVerifyOk = true;

    isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
    var repeated = "ONCE" != dialog.find("input[name='task.schedule.scheduleType']:checked").val();
    if (repeated) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.repeatEndDate']");
    }

    if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
        isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
    }

    if (!isVerifyOk) {
        return;
    }

    var param = {};
    param["task.channelId"] = dialog.find("select[name='task.channelId']").val();
    param["task.profile"] = dialog.find("select[name='task.profile']").val();
    param["task.outputPath"] = dialog.find("input[name='task.outputPath']").val();
    param["task.fileName"] = dialog.find("input[name='task.fileName']").val();
    param["task.weeklyRecord"] = repeated;
    var date = dialog.find("input[name='task.repeatEndDate']").val();
    param["task.repeatEndDate"] = dialog.find("input[name='task.schedule.repeatEndDate']").val();
    if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
        param["task.generateThumb"] = dialog.find("input[name='task.generateThumb']").val();
        param["task.thumbWidth"] = dialog.find("input[name='task.thumbWidth']").val();
        param["task.thumbHeight"] = dialog.find("input[name='task.thumbHeight']").val();
    }
    var index = 0;
    dialog.find(".epg_record_line").each(function () {
        var tab = $(this);
        if (tab.find("input[type='checkbox']")[0].checked) {
            param["task.weeklyItemRecordInfos[" + index + "].name"] = tab.find("input[name='programName']").val();
            param["task.weeklyItemRecordInfos[" + index + "].schedule.startDate"] = tab.find("input[name='startDate']").val();
            param["task.weeklyItemRecordInfos[" + index + "].schedule.startTime"] = tab.find("input[name='startTime']").val();
            param["task.weeklyItemRecordInfos[" + index + "].schedule.endTime"] = tab.find("input[name='endTime']").val();
            param["task.weeklyItemRecordInfos[" + index + "].schedule.days"] = tab.find("input[name='weeklyday']").val();
            index++;
        }
    });
    if (index == 0) {
        showErrorMessage(NO_EPG_TIMES_SELECTED);
        return;
    }

    var loading = createLoading("", getText("common.operation.executing"));
    loading.show();
    $.post('saveWeeklyRecord.action', param, function (data) {
        loading.hide();
        if (data.result.success) {
            dialog.close();
            refreshPage();
        } else {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        loading.hide();
        showErrorMessage(getText("common.error.unknown"));
    });
}

function showWeeklyItems() {
    var id = $(this).parents(".tab_content").find("input[type=checkbox]").val();
    var uri = "showWeeklyItems.action";
    var dialogId = "dialog_show_weekly_items";
    var param = {};
    param["id"] = id;
    createTemplateDialogByUri(uri, param, dialogId, onShowWeeklyItemsDialogCreated);
}

function onShowWeeklyItemsDialogCreated(dialog) {
    // tab page
    dialog.find(".tab_bar").each(function () {
        var bar = $(this);
        var tab = $(this).find(".tab_bar_toggle");
        var content = dialog.find("#tab_content_" + tab.find("input:first").val());
        tab.click(function () {
            dialog.find(".tab_content").hide();
            dialog.find(".tab_bar").css("background-color", "");
            bar.css("background-color", "lightgray");
            content.show();
        });
    });
    dialog.find(".tab_bar_toggle:first").click();

    // Ok button
    dialog.click("#btnOk", function () {
        this.dialog.close();
    });
    // show dialog
    dialog.setSize(600, 300);
    dialog.show();
}

//------------------------------------------------------------------------------------------
function editRecordTask() {
    var checked = $(".list_view_content input[type=checkbox]:checked:first");
    var type = checked.parentsUntil(".tab_content").find(".tag_recordtype").text();
    var dialogId = "dialog_edit_record_task";
    var params = {};
    params["task.id"] = checked.val();
    if (type == "FULLTIME") {
        createTemplateDialogByUri("editFullTimeRecord.action", params, dialogId, oEditFulltimeRecordTaskDialogCreated);
    } else if (type == "SCHEDULE") {
        createTemplateDialogByUri("editScheduleRecord.action", params, dialogId, oEditScheduleRecordTaskDialogCreated);
    }
}

function oEditFulltimeRecordTaskDialogCreated(dialog) {
    // set segment name
    dialog.find("select[name='task.channelId']").change(function () {
        var name = $(this).val() != "" ? $(this).find("option:selected").text() : "";
        name += "-${yyyy}${MM}${dd}-${HH}${mm}";
        dialog.find("input[name='task.fileName']").val(name);
    });

    // select file view
    dialog.find("#btnFileView").click(function () {
        showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
    });

    // start now checkbox changed
    dialog.find("input[name='startNow']").change(function () {
        disableField(dialog, "input[name='task.schedule.startDate']", this.checked);
        disableField(dialog, "input[name='task.schedule.startTime']", this.checked);
    });

    // always loop checkbox changed
    dialog.find("input[name='alwaysLoop']").change(function () {
        disableField(dialog, "input[name='task.schedule.endDate']", this.checked);
        disableField(dialog, "input[name='task.schedule.endTime']", this.checked);
    });
    var checked = dialog.find("input[name='alwaysLoop']:checked").length > 0;
    disableField(dialog, "input[name='task.schedule.endDate']", checked);
    disableField(dialog, "input[name='task.schedule.endTime']", checked);


    // save button
    dialog.click("#btnSave", function () {
        updateFulltimeRecordTask(dialog);
        closeFileDialog(dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });

    // show dialog
    dialog.setSize(600, 350);
    dialog.show();
}

function updateFulltimeRecordTask(dialog) {
    var isVerifyOk = true;

    isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.segmentLength']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");

    if (dialog.find("input[name='startNow']:checked").length == 0) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
    }

    if (dialog.find("input[name='alwaysLoop']:checked").length == 0) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endDate']");
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
    }

    if (!isVerifyOk) {
        return;
    }

    var data = dialog.find("form").serialize();
    $.post('updateFullTimeRecord.action', data, function (data) {
        if (data.result.success) {
            dialog.close();
            refreshPage();
        } else {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        showErrorMessage(getText("common.error.unknown"));
    });
}

function oEditScheduleRecordTaskDialogCreated(dialog) {
    // select the only one profile
    var profiles = dialog.find("select[name='task.profile'] option");
    if (profiles.length == 2) {
        profiles[1].selected = true;
    }

    // select schedule mode
    dialog.find("input[name='task.schedule.scheduleType']").change(function () {
        changeScheduleMode(dialog);
    });
    changeScheduleMode(dialog);

    // task weekdays
    var weekdays = dialog.find("input[name='task.schedule.days']").val();
    dialog.find("input[name='weekday']").each(function () {
        $(this).attr("checked", (weekdays & $(this).val()) != 0);
    });

    // select file view
    dialog.find("#btnFileView").click(function () {
        showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
    });

    // save button
    dialog.click("#btnSave", function () {
        updateScheduleRecordTask(dialog);
        closeFileDialog(dialog);
    });

    // cancel button
    dialog.click("#btnCancel", function () {
        this.dialog.close();
        closeFileDialog(dialog);
    });

    // show dialog
    dialog.setSize(600, 450);
    dialog.show();
}

function updateScheduleRecordTask(dialog) {
    var isVerifyOk = true;

    isVerifyOk &= verifyInput(dialog, "input[name='task.name']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
    isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
    isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
    var repeated = "ONCE" != dialog.find("input[name='task.schedule.scheduleType']:checked").val();
    if (repeated) {
        isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.repeatEndDate']");
        isVerifyOk &= verifyCheckbox(dialog, "input[name='weekday']");
    }

    if (!isVerifyOk) {
        return;
    }

    var weekday = 0;
    if (repeated) {
        dialog.find("input[name='weekday']:checked").each(function () {
            weekday |= $(this).val();
        });
    }
    dialog.find("input[name='task.schedule.days']").val(weekday);

    var data = dialog.find("form").serialize();
    $.post('updateScheduleRecord.action', data, function (data) {
        if (data.result.success) {
            dialog.close();
            refreshPage();
        } else {
            showErrorMessage(data.result.message);
        }
    }, 'json').error(function () {
        showErrorMessage(getText("common.error.unknown"));
    });
};
