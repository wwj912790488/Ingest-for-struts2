<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/include/jsonheader.jsp" %>

<div class="template_title">
    <s:text name="record.task.setting"/>
</div>
<div class="template_content">
    <form>
        <fieldset>
            <legend><b><s:text name="record.task.record.option"/></b></legend>
            <table style="width: 100%" align="center">
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.offset.start"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.startOffsetTime"/>(<s:text name="common.unit.second"/>)
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label">
                        <s:text name="record.task.offset.stop"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.stopOffsetTime"/>(<s:text name="common.unit.second"/>)
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label">
                        <s:text name="record.task.record.file"/>
                    </td>
                    <td class="form_input_field">
                        <s:checkbox name="setting.enableTempExtension" id="enableTempExtension"/><label
                            for="enableTempExtension"><s:text name="record.task.temp.extension"/></label>
                        <s:textfield name="setting.tempExtension"/>
                    </td>
                </tr>
            </table>
        </fieldset>

        <fieldset>
            <legend><b><s:text name="record.task.default.value"/></b></legend>
            <table style="width: 100%" align="center">
                <tr>
                    <td colspan=2 style="padding-left: 10px">
                        <b><s:text name="record.task.type.all"/></b>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.advanced.options"/>
                    </td>
                    <td class="form_input_field">
                        <s:checkbox name="setting.enableThumb" id="enableThumb"/><label for="enableThumb"><s:text
                            name="record.task.generate.thumb"/></label>
                        (<s:textfield name="setting.thumbWidth" cssStyle="width: 30px"/>)
                    </td>
                </tr>
                <tr>
                    <td colspan=2 style="padding-left: 10px">
                        <b><s:text name="record.task.type.fulltime"/></b>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.file.path"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.fulltimeFilePath" cssStyle="width: 300px"/><input type="button"
                                                                                                     id="btnFileView1"
                                                                                                     value='<s:text name="common.select.text"/>'>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label">
                        <s:text name="record.task.segment.name"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.fulltimeFileName" cssStyle="width: 400px"/>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label" valign="top">
                        <s:text name="record.task.advanced.options"/>
                    </td>
                    <td class="form_input_field">
                        <s:hidden name="setting.fulltimeKeepTimes"/>
                        <input type="checkbox" name="deleteFiles" id="deleteFiles" value="true"/><label
                            for="deleteFiles"><s:text name="record.task.keep.times"/></label> (<input type="text"
                                                                                                      name="keepTimesValue"
                                                                                                      value="0"
                                                                                                      style="width: 30px; text-align: center">
                        <select name="keepTimesUnit">
                            <option value="1"><s:text name="common.unit.day"/></option>
                            <option value="2"><s:text name="common.unit.hour"/></option>
                        </select>)
                    </td>
                </tr>
                <tr>
                    <td colspan=2 style="padding-left: 10px">
                        <b><s:text name="record.task.type.schedule"/></b>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.file.path"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.scheduleFilePath" cssStyle="width: 300px"/><input type="button"
                                                                                                     id="btnFileView2"
                                                                                                     value='<s:text name="common.select.text"/>'>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label">
                        <s:text name="record.task.file.name"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.scheduleFileName" cssStyle="width: 400px"/>
                    </td>
                </tr>
                <tr>
                    <td colspan=2 style="padding-left: 10px">
                        <b><s:text name="record.task.type.epg"/></b>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.file.path"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.epgFilePath" cssStyle="width: 300px"/><input type="button"
                                                                                                id="btnFileView3"
                                                                                                value='<s:text name="common.select.text"/>'>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label">
                        <s:text name="record.task.file.name"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.epgFileName" cssStyle="width: 400px"/>
                    </td>
                </tr>

                <%--ftp setting--%>
                <tr>
                    <td colspan=2 style="padding-left: 10px">
                        <b> <s:text name="record.task.ftp.name"/></b>
                    </td>
                </tr>
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.ftp.IP"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.ftpip"/>

                    </td>
                </tr>

                <tr>
                    <td class="form_input_label" style="width: 100px">
                         <s:text name="record.task.ftp.userName"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield name="setting.ftpuser"/>

                    </td>
                </tr>

                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.ftp.passWord"/>

                    </td>
                    <td class="form_input_field">
                       <%-- <input id="ftp_pass" name="setting.ftppass" type="password" value="<s:text name="setting.ftppass"/>">--%>
                        <s:textfield type="password" name="setting.ftppass"/>
                        <input type="button" id="btnFtpTest" value="<s:text name="record.task.ftp.testPing"/>">
                    </td>
                </tr>

                <%-- ftp路径选择--%>
                <tr>
                    <td class="form_input_label" style="width: 100px">
                        <s:text name="record.task.file.path"/>
                    </td>
                    <td class="form_input_field">
                        <s:textfield   name="setting.ftpPath" cssStyle="width: 300px" /> <input type="button"
                                                                                                id="btnFileView4"
                                                                                                value='<s:text name="common.select.text"/>'>
                    </td>
                </tr>


            </table>
        </fieldset>
    </form>
</div>
<div class="template_button">
    <div class="div_space"></div>
    <div class="div_buttons">
        <table align="center">
            <tr>
                <td><input type="button" id="btnSave" value="<s:text name='common.action.save'/>"/></td>
                <td class="td_space"></td>
                <td><input type="button" id="btnCancel" value="<s:text name='msg.cancel'/>"/></td>
            <tr>
        </table>
    </div>
</div>
