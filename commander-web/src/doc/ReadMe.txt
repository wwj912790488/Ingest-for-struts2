ArcVideo Commander Develop guide
=====================================================================================

Part 1 Develop Environment
-------------------------------------------------------------------------------------
(1) JDK 7 (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
(2) Eclipse Juno (http://www.eclipse.org)
	- Maven Integration for Eclipse WTP (Juno)
	- EclEmma Java Code Converage
(3) Tomcat 7 (http://tomcat.apache.org)
(4) Maven 3 (http://maven.apache.org)
(5) MySQL 5.5+
(6) Linux CentOS 6.3+


Part 2 Project Modules
-------------------------------------------------------------------------------------
(1) commons-utils        - All string, date, os, network helpers are defined here.
(2) cluster-sdk          - The cluster SDK
(3) commander-common     - The common part for agent and balancer.
(4) commander-agent      - The agent application is running in Core/Live server.
(5) commander-balancer   - The balancer application is running in Commander server.
(6) commander-web        - The web application is running in Commander server.


Part 3 Java Package Structure
-------------------------------------------------------------------------------------
(1) common
	(a) jsp - jsp helper classes
	(b) query - for query

(2) action
	(a) struts global configuration is placed at config/struts.xml.
	(b) action package name for each module should be defined as com.arcsoft.commander.action.xxx
	(c) action configurations for each module should be defined in com/arcsoft/commander/action/xxx/struts_actions.xml.
	(d) validation configuration should be saved in com/arcsoft/commander/action/xxx/.

(3) service
	(a) all service beans should be defined in com/arcsoft/commander/service/spring_service.xml
	(b) service package name should be defined as com.arcsoft.commander.service.xxx
	(c) each service has a interface and a implement class.
	(d) every service bean implement class should extends BaseService class for extension in the future.
	(e) service method name:
		- all methods which are require transactions, the names should start with insert*, save*, update*, delete*, add*, remove*, apply*, create*.
		- all other methods are read only method without transaction.
	(f) service exceptions:
		- all logic or business exceptions should throws a ServiceException.

(4) dao
	(a) all dao beans should be defined in com/arcsoft/commander/dao/spring_dao.xml

(5) domain

(6) exception

(7) multi-languages support
	(a) all language text configurations placed at src/main/resources/language.
		Such as resources_en_us.properties, resources_zh_CN.properties.

(8) main/webapp
	(a) css folder
	(b) images folder
	(c) js folder
	(d) jsp foler

(9) unit test
	(a) All services methods required write test case to verify it.
	(b) All service test classes should placed in src/test/java
	(c) All service test resources should placed in src/test/resources. Such as test database configuration file database.properties.
	(d) All service test classes should extend BaseSpringContextTests.
