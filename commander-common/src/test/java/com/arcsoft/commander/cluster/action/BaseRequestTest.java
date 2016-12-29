package com.arcsoft.commander.cluster.action;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import com.arcsoft.cluster.converter.ConversionService;
import com.arcsoft.cluster.net.DataPackage;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.cluster.converter.RequestDataConverter;

/**
 * Base request test.
 * 
 * @author fjli
 * @param <T> - the request class
 */
public abstract class BaseRequestTest<T extends BaseRequest> {

	/**
	 * Test data converter for the specified request.
	 * 
	 * @param action - the action id
	 * @param expect - the request instance
	 * @throws IOException if convert failed
	 */
	protected T testConverter(int action, T expect) throws IOException {
		ConversionService.addConverter(new RequestDataConverter());
		DataPackage pack = ConversionService.convert(expect);
		assertEquals(pack.getType(), Actions.TYPE_REQUEST);
		assertEquals(pack.getSubType(), action);
		@SuppressWarnings("unchecked")
		T actual = (T) ConversionService.convert(pack);
		assertEquals(expect.getMessageType(), actual.getMessageType());
		return actual;
	}

}
