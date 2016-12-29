<#assign xmlEscape="freemarker.template.utility.XmlEscape"?new()>
<#setting datetime_format="yyyy-MM-dd HH::mm:ss">
<?xml version="1.0" encoding="UTF-8"?>
<ntpServers>
	<#list ntps as ntp>
	<ntpServer>${ntp}</ntpServer>
	</#list>
</ntpServers>
