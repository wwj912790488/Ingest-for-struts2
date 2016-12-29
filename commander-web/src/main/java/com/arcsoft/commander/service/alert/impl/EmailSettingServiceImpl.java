package com.arcsoft.commander.service.alert.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.Node;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.commander.domain.alert.EmailSetting;
import com.arcsoft.commander.service.alert.EmailSettingService;

/**
 * Email setting service.
 * 
 * @author fjli
 */
public class EmailSettingServiceImpl extends AlertIntegrationSupport implements EmailSettingService {

	private static final String MAIL_SENDER_CLASS = "com.arcsoft.arcvideo.alert.sender.MailAlertEventSender";
	private static final String FEATURE_ENABLED = "featureEnabled";
	private static final String SMTP_HOST = "mail.smtp.host";
	private static final String SMTP_PORT = "mail.smtp.port";
	private static final String SMTP_USER = "mail.smtp.user";
	private static final String SMTP_PASSWORD = "mail.smtp.password";
	private static final String SMTP_RECEIVERS = "mail.receivers";

	private Logger log = Logger.getLogger(EmailSettingServiceImpl.class);

	@Override
	public boolean isFeatureEnabled() {
		try {
			XmlHelper xml = createXmlHelper();
			Node sender = getSenderNode(xml, MAIL_SENDER_CLASS);
			if (sender != null) {
				Node paramsNode = xml.selectNode("params", sender);
				String value = getOption(xml, paramsNode, FEATURE_ENABLED);
				return "true".equalsIgnoreCase(value);
			}
		} catch (Exception e) {
		}
		return false;
	}

	@Override
	public EmailSetting loadSetting() throws Exception {
		EmailSetting setting = new EmailSetting();
		XmlHelper xml = createXmlHelper();
		Node sender = getSenderNode(xml, MAIL_SENDER_CLASS);
		if (sender != null) {
			Node paramsNode = xml.selectNode("params", sender);
			setting.setSmtpHost(getOption(xml, paramsNode, SMTP_HOST));
			String port = getOption(xml, paramsNode, SMTP_PORT);
			setting.setSmtpPort(port != null ? Integer.decode(port) : 25);
			setting.setSmtpUser(getOption(xml, paramsNode, SMTP_USER));
			setting.setSmtpPassword(getOption(xml, paramsNode, SMTP_PASSWORD));
			String receivers = getOption(xml, paramsNode, SMTP_RECEIVERS);
			if (receivers != null) {
				ArrayList<String> list = new ArrayList<>();
				for (String receive : receivers.split(",")) {
					receive = receive.trim();
					if (receive.length() > 0 && !list.contains(receive))
						list.add(receive);
				}
				if (!list.isEmpty())
					setting.setReceivers(list);
			}
		}
		return setting;
	}

	@Override
	public void saveSetting(EmailSetting setting) throws Exception {
		XmlHelper xml = createXmlHelper();
		Node sender = getSenderNode(xml, MAIL_SENDER_CLASS);
		if (sender != null) {
			Node paramsNode = xml.selectNode("params", sender);
			setOption(xml, paramsNode, SMTP_HOST, toEmptyIfNull(setting.getSmtpHost()));
			Integer port = setting.getSmtpPort() != null ? setting.getSmtpPort() : 25;
			setOption(xml, paramsNode, SMTP_PORT, port.toString());
			setOption(xml, paramsNode, SMTP_USER, toEmptyIfNull(setting.getSmtpUser()));
			if (setting.getSmtpPassword() != null)
				setOption(xml, paramsNode, SMTP_PASSWORD, setting.getSmtpPassword());
			String receivers = null;
			List<String> list = setting.getReceivers();
			if (list != null)
				receivers = StringUtils.join(list.iterator(), ",");
			setOption(xml, paramsNode, SMTP_RECEIVERS, toEmptyIfNull(receivers));
			xml.saveAs(new File(getConfigFile()));
		}
	}

	private static String toEmptyIfNull(String value) {
		return value == null ? "" : value;
	}

	@Override
	public void sendTestEmail(String subject, String content) {
		try {
			EmailSetting setting = loadSetting();
			sendTestEmail(setting, subject, content);
		} catch (Exception e) {
			log.info("send test mail failed.", e);
		}
	}
	
	@Override
	public void sendTestEmail(EmailSetting emailSetting, String subject, String content) {
		Transport transport = null;
		try {
			List<String> receivers = emailSetting.getReceivers();
			if (receivers == null || receivers.isEmpty())
				return;
			Properties props = new Properties();
			Session session = Session.getDefaultInstance(props, null);
			transport = session.getTransport("smtp");
			if (StringHelper.isBlank(emailSetting.getSmtpPassword()))
				transport.connect(emailSetting.getSmtpHost(), emailSetting.getSmtpPort(), null, null);
			else
				transport.connect(emailSetting.getSmtpHost(), emailSetting.getSmtpPort(), emailSetting.getSmtpUser(), emailSetting.getSmtpPassword());
			MimeMessage msg = new MimeMessage(session);
			msg.setSentDate(new Date());
			InternetAddress fromAddress = new InternetAddress(emailSetting.getSmtpUser());
			msg.setFrom(fromAddress);
			InternetAddress[] toAddress = new InternetAddress[receivers.size()];
			int index = 0;
			for (String receiver : receivers)
				toAddress[index++] = new InternetAddress(receiver);
			msg.setRecipients(Message.RecipientType.TO, toAddress);
			msg.setSubject(subject, "UTF-8");
			msg.setText(content, "UTF-8");
			msg.saveChanges();
			transport.sendMessage(msg, msg.getAllRecipients());
		} catch (Exception e) {
			log.info("send test mail failed.", e);
		} finally {
			if (transport != null) {
				try {
					transport.close();
				} catch (MessagingException e) {
				}
			}
		}	
	}
}
