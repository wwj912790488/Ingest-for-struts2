package com.arcsoft.commander.cluster.action;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import com.arcsoft.cluster.converter.ConversionService;
import com.arcsoft.cluster.net.DataPackage;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.cluster.converter.ResponseDataConverter;

/**
 * Base response test.
 * 
 * @author fjli
 * @param <T> - the response class
 */
public abstract class BaseResponseTest<T extends BaseResponse> {

	/**
	 * Test data converter for the specified response.
	 * 
	 * @param action - the action id
	 * @param expect - the response instance
	 * @throws IOException - if convert failed
	 */
	protected T testConverter(int action, T expect) throws IOException {
		ConversionService.addConverter(new ResponseDataConverter());
		DataPackage pack = ConversionService.convert(expect);
		assertEquals(pack.getType(), Actions.TYPE_RESPONSE);
		assertEquals(pack.getSubType(), action);
		@SuppressWarnings("unchecked")
		T actual = (T) ConversionService.convert(pack);
		assertEquals(expect.getMessageType(), actual.getMessageType());
		assertEquals(expect.getErrorCode(), actual.getErrorCode());
		return actual;
	}

}
