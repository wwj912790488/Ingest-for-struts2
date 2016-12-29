<#assign xmlEscape="freemarker.template.utility.XmlEscape"?new()>
<?xml version="1.0" encoding="UTF-8"?>

<servers>
<#list servers as server>
<#include "./servertask.ftl">
</#list>
</servers>
