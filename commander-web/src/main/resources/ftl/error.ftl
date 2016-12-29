<#if format?? && format=="json">
{"errors":${errors}}
<#else>
<?xml version="1.0" encoding="UTF-8"?>
<errors>
<#list errors as error>
<error>${error}</error>
</#list>
</errors>
</#if>

