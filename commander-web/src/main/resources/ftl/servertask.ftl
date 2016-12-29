<#assign xmlEscape="freemarker.template.utility.XmlEscape"?new()>
<server>
<id>${server.server.id!''}</id>
<name>${server.server.name!''}</name>
<ip>${server.server.ip!''}</ip>
<tasks>
<#list server.data as model>
<#include "./bare/baretask.ftl">
</#list>
</tasks>
</server>
