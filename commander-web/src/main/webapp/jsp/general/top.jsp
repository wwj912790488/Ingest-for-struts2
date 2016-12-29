<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- common string -->
<script type="text/javascript">
var textMap = new Object();
textMap['msg.ok'] = '<s:text name="msg.ok"/>';
textMap['msg.cancel'] = '<s:text name="msg.cancel"/>';
textMap['msg.dialog.title.error'] = '<s:text name="msg.dialog.title.error"/>';
textMap['msg.dialog.title.warning'] = '<s:text name="msg.dialog.title.warning"/>';
textMap['common.page.loading'] = '<s:text name="common.page.loading"/>';
textMap['common.operation.executing'] = '<s:text name="common.operation.executing"/>';
textMap['common.error.unknown'] = '<s:text name="common.error.unknown"/>';
textMap['common.execute.success'] = '<s:text name="common.execute.success"/>';
textMap['record.task.ftp.setting.warning'] = '<s:text name="record.task.ftp.setting.warning"/>';
</script>

<!-- loading template -->
<div id="dialog_loading_template" style="display: none">
	<div class="template_title">
		<div id="loading_title"></div>
	</div>
	<div class="template_content">
		<img src='./images/icons/doing.gif' align="middle"/>
		<span id="loading_message"></span>
	</div>
</div>
