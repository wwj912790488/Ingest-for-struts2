package com.arcsoft.commander.action.task;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;


public class GetTaskProgressAction extends CommanderTaskActionSupport {
	private static final long serialVersionUID = -4290113010628924585L;
	private Logger log = Logger.getLogger(getClass());
	private String taskId = null;
	
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	@Override
	public String execute() throws Exception {
		if(taskId==null)
			return ERROR;
		
		return SUCCESS;
	}
	
	public InputStream getProgressInfoStream() throws Exception {
		ByteArrayOutputStream bos = new ByteArrayOutputStream(512);

		try {
			Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
			
			Element e; 
			Element root;
			//root
			root = doc.createElement("results");
			
			
			String[] taskids = taskId.split(",");
			
			for (int j = 0; j < taskids.length; j++) {
				try {
					Document transcodingInfoXml = this.getTaskExecuteService().getTaskProgress(Integer.parseInt(taskids[j]));
					if(transcodingInfoXml != null){
						e = transcodingInfoXml.getDocumentElement();
						if(e != null){
							root.appendChild(doc.adoptNode(e));
						}
					}
				} catch (Exception exx) {
					log.error(exx.getMessage());
				}
			}
			
			doc.appendChild(root);
			
			Transformer trans = TransformerFactory.newInstance().newTransformer();
			trans.transform(new DOMSource(doc), new StreamResult(bos));		
			
		}catch(Exception ex){
			log.error(ex.getMessage());
		}
		
		bos.flush();
		
		return new ByteArrayInputStream(bos.toByteArray());
	}

}
