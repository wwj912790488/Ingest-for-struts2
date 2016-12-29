package com.arcsoft.commander.service.settings;

import java.io.IOException;
import java.util.List;

import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Service for network operation of local machine.
 * 
 * @author xpeng
 */
public interface LocalEthService {

	/**
	 * Get all valid network interfaces information without slave network interfaces.
	 * 
	 * @return all valid network interfaces.
	 * @throws ShellException
	 * @throws IOException
	 */
	List<Eth> getValidEths() throws ShellException, IOException;

	/**
	 * List all the eths of local machine
	 * 
	 * @return the eth list.
	 * @throws ShellException
	 * @throws IOException
	 */
	List<Eth> findAllEths() throws ShellException, IOException;

	/**
	 * Update the specific eth of local machine
	 * 
	 * @param eth - the specific eth
	 * @throws ShellException if shell run error in linux os.
	 * @throws IOException if I/O operation run error.
	 */
	void updateEth(Eth eth) throws ShellException, IOException;

	/**
	 * Get the specific eth's used rate
	 * 
	 * @param ethId - the specific eth's id
	 * @return (val*10000)
	 * @throws ShellException if shell run error in linux os.
	 * @throws IOException if I/O operation run error.
	 */
	int getEthUsedRate(String ethId) throws ShellException, IOException;

	/**
	 * Bond two eths, or update eth.
	 * <p>
	 * Suppose: 1) only two eths in all can be bond; 2) two eths bond as "bon0"
	 * 
	 * @param eth - the eth to be bond or update
	 * @param slaveId - the other eth id to be bond, it can be null.
	 * @throws ShellException if shell run error in linux os.
	 * @throws IOException if I/O operation run error.
	 */
	void bondAndUpdateEth(Eth eth, String slaveId) throws ShellException, IOException;

}
