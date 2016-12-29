<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp" %>

<input type="hidden" id="scanUri" value="${uri}">
<input type="hidden" id="groupId" value="${groupId}">
<table class="tab_list multi_selection">
	<s:if test="mediaInfo.programs != null && mediaInfo.programs.size() > 0">
		<s:iterator value="mediaInfo.programs" var="program" status="st">
			<tr class="tab_content" style="height: 24px; padding: 0px; line-height: 24px;">
				<td width="30px">
					<input type="checkbox" value="${program.id}"/>
				</td>
				<td width="60px">
						${program.id}
				</td>
				<td>
					<input type="text" id="programName" value="${program.name}" style="width: 100%"/>
				</td>
				<td width="160px">
					<s:if test="#program.videos != null && #program.videos.size() > 0">
						<s:if test="#program.videos.size() > 1">
							<select id="videoId">
								<s:iterator value="#program.videos" var="video">
									<option value="${video.pid}">${video.pid}</option>
								</s:iterator>
							</select>
						</s:if>
						<s:else>
							<input type="hidden" id="videoId" value="${program.videos[0].pid}"/>
							<span id="videoInfo">${program.videos[0].codec} ${program.videos[0].resolution} ${program.videos[0].aspectRatio} ${program.videos[0].framerate}fps</span>
						</s:else>
					</s:if>
					<s:else>
						N/A
					</s:else>
				</td>
				<td width="160px">
					<s:if test="#program.audios != null && #program.audios.size() > 0">
						<s:if test="#program.audios.size() > 1">
							<select id="audioId">
								<s:iterator value="#program.audios" var="audio">
									<option value="${audio.pid}">${audio.pid}</option>
								</s:iterator>
							</select>
						</s:if>
						<s:else>
							<input type="hidden" id="audioId" value="${program.audios[0].pid}"/>
							<span id="audioInfo">${program.audios[0].codec} ${program.audios[0].channel}channel(s)	${program.audios[0].samplerate} ${program.audios[0].bitdepth}bits</span>

						</s:else>
					</s:if>
					<s:else>
						N/A
					</s:else>
				</td>
			</tr>
		</s:iterator>
	</s:if>
	<s:elseif test="mediaInfo.video != null && mediaInfo.audio != null">
		<tr class="tab_content" style="height: 24px; padding: 0px; line-height: 24px;">
			<td width="30px">
				<input type="checkbox" value="${program.id}"/>
			</td>
			<td width="60px">
					${program.id}
			</td>
			<td>
				<input type="text" id="programName" value="${mediaInfo.name}" style="width: 100%"/>
			</td>
			<td width="160px">
				<input type="hidden" id="videoId" value="${mediaInfo.video.pid}"/>
				<span id="videoInfo">${mediaInfo.video.codec} ${mediaInfo.video.resolution} ${mediaInfo.video.aspectRatio} ${mediaInfo.video.framerate}fps</span>
			</td>
			<td width="175px">
				<input type="hidden" id="audioId" value="${mediaInfo.audio.pid}"/>
				<span id="audioInfo">${mediaInfo.audio.codec} ${mediaInfo.audio.channel}channel(s) 	${mediaInfo.audio.samplerate} ${mediaInfo.audio.bitdepth}bits</span>
			</td>
		</tr>
	</s:elseif>
	<s:else> N/A</s:else>
</table>
