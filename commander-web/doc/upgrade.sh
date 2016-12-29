#!/bin/sh
##############################################################################################
#                                  Ingest System                                             #
#--------------------------------------------------------------------------------------------#
#                     Script for upgrade Commander / Agent                                   #
#                                Update: 20160506                                            #
#                                Author: Ting Ji                                             #
##############################################################################################
#set -e 
#set -x 

#
# Upgrade packages
#
# live commander zip package full path
COMMANDER_PACKAGE=

# transcoder zip package full path 
TRANSCODER_PACKAGE=

# jre tar.gz package full path (such as /root/server-jre-7u67-linux-x64.tar.gz)
JRE_PACKAGE=

# tomcat tar.gz package full path (such as /root/server-jre-7u67-linux-x64.tar.gz)
TOMCAT_PACKAGE=

#
# Set global variables
#
CLUSTER_IP=239.8.8.1
CLUSTER_PORT=8921
CLUSTER_INTERFACE=127.0.0.1
# Virtual IP should be used here.
COMMANDER_IP=127.0.0.1
AGENT_PORT=7210
AGENT_COMMAND_PORT=7211
ALERT_PORT=7203
MONITOR_PORT=7204
FAULT_PORT=7212
TOMCAT_PORT=80
TOMCAT_HOME=/usr/local/tomcat
ARCVIDEO_HOME=/usr/local/arcvideo/ingest
TRANSCODER=transcoder
TRANSCODER_WORKDIR=tmpdir
DATABASE_NAME=ingestdb
DATABASE_PWD=root
DISABLE_VNC=false
DISABLE_SMB=false
# If set to true, indicate start all services after upgrade complete.
START_AFTER_UPGRADE=true
SET_TOMCAT_IN_RC_LOCAL=false
#
# Local Variables
#
SUFFIX=`date +%Y%m%d%H%M%S`
UNZIP_TMP=/home/upgrade_$SUFFIX
BACKUP_HOME=/home/backup/ingest
SERVER_TYPE=$1
CURDIR=`pwd`
EXIST_DATABASE=false

#
# remove the older service
#
service alertd stop
service monitord stop
service loggingd stop
service agentd stop
service faultd stop

chkconfig --del alertd
chkconfig --del monitord
chkconfig --del loggingd
chkconfig --del agentd
chkconfig --del faultd

#
# Check server type.
#
if [ "$SERVER_TYPE" == "commander" ] || [ "$SERVER_TYPE" == "agent" ] || [ "$SERVER_TYPE" == "all" ]; then
	echo "[INFO] install server as $SERVER_TYPE."
elif [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
	FILENAME=`basename $0`
	echo "$FILENAME -h --help    # show usage"
	echo "$FILENAME -v --version # show version"
	echo "$FILENAME commander    # install commander"
	echo "$FILENAME agent        # install agent"
	echo "$FILENAME all          # install commander and agent in one server"
	exit 0
elif [ "$1" == "--version" ] || [ "$1" == "-v" ]; then
	cat $0 | grep "Version"":" | awk '{print $3}'
	exit 0
else
	FILENAME=`basename $0`
	echo "$FILENAME -h --help    # show usage"
	echo "$FILENAME -v --version # show version"
	echo "$FILENAME commander    # install commander"
	echo "$FILENAME agent        # install agent"
	echo "$FILENAME all          # install commander and agent in one server"
	exit 0
fi

#
#	Check need drop database
#
# DROP_DATABASE=false
# CHECK_NEED_DROP_DATABASE=
# echo "Is need drop current $DATABASE_NAME y or n?"
# read -e CHECK_NEED_DROP_DATABASE
# if [ "$CHECK_NEED_DROP_DATABASE" == "y" ] ||[ "$CHECK_NEED_DROP_DATABASE" == "Y" ]||[ "$CHECK_NEED_DROP_DATABASE" == "yes" ] ||[ "$CHECK_NEED_DROP_DATABASE" == "YES" ] ; then
# 	echo "Need drop the $DATABASE_NAME"
# 	DROP_DATABASE=true
# fi

#
#	Get current package path
#
function abspath() {
  if [ -d "$1" ]; then
    (cd "$1"; pwd)
  elif [ -f "$1" ]; then
    if [[ $1 == */* ]]; then
        echo "$(cd "${1%/*}"; pwd)/${1##*/}"
    else
        echo "$(pwd)/$1"
    fi
  fi
}

SUGGEST_COMMANDER_PACKAGE_PATH=$(abspath $(ls | grep arcvideo | head -1))
echo "Enter path of the upgrade commander package path:"
echo "[$SUGGEST_COMMANDER_PACKAGE_PATH] if the package path is correct, please press 'Enter'."
read -e COMMANDER_PACKAGE
if [ "$COMMANDER_PACKAGE" == "" ]; then
	COMMANDER_PACKAGE=$SUGGEST_COMMANDER_PACKAGE_PATH
fi

SUGGEST_TRANSCODER_PACKAGE_PATH=$(abspath $(ls | grep Engine | head -1))
echo "Enter path of the upgrade transcoder package path:"
echo "[$SUGGEST_TRANSCODER_PACKAGE_PATH] if the package path is correct, please press 'Enter'."
read -e TRANSCODER_PACKAGE
if [ "$TRANSCODER_PACKAGE" == "" ]; then
	TRANSCODER_PACKAGE=$SUGGEST_TRANSCODER_PACKAGE_PATH
fi

if [ ! -f "$COMMANDER_PACKAGE" ] ;then
	echo "[ERROR] commander package is not exist."
	exit 1
fi



#
# Check the cluster ip can get or not.
#
BINDIP=`ifconfig | grep $CLUSTER_INTERFACE | awk '{print substr($2, 6)}'`
if [ "$BINDIP" == "" ]; then
	echo "[ERROR] cannot get bind address for \"$CLUSTER_INTERFACE\"."
	exit 1
else
	echo "[INFO] bind ip is $BINDIP"
fi

#--------------------------------------------------------
#
# Backup old backup folder
#
if [ -d $BACKUP_HOME ] ;then
	mv $BACKUP_HOME $BACKUP_HOME"_"$SUFFIX
fi

if [ ! -d $UNZIP_TMP ] ;then
	mkdir -p $UNZIP_TMP
fi

if [ ! -d $BACKUP_HOME ] ;then
	mkdir -p $BACKUP_HOME
fi

#
# Backup the source folder to the dest.
# Usage:
#    backup_folder source dest
#
backup_folder() {
	if [ -d $1 ] ;then
		mv $1 $2
		echo "[INFO] $1 backup success";
	else
		echo "[WARN] backup failed: $1 no exist.";
	fi
}

#
# Exist service
# Usage:
#    exist_service service_name
#
exist_service() {
	if (chkconfig --list $1) >/dev/null 2>&1 ;then
		return 0
	else
		return 1
	fi
}

#
# Setup service.
# Usage:
#    setup_service daemon_file service_name
#
setup_service() {
	if [ -f $1 ] ;then
		cp -rf $1 /etc/init.d/
		chkconfig --add $2
		chkconfig $2 --level 2345 on
		echo "[INFO] service $2 setup success"
	else
		echo "[WARN] setup service failed: $1 no exist."
	fi
}

#
# Disable service.
# Usage:
#    disable_service service_name
#
disable_service() {
	if (chkconfig --list $1) >/dev/null 2>&1 ;then
		echo "[INFO] stop service '$1'"
		service $1 stop
		echo "[INFO] disable service '$1'"
		chkconfig $1 off
	else
		echo "[INFO] service '$1' not exist..."
	fi
}

#
# Start service.
# Usage:
#    start_service service_name
#
start_service() {
	if (chkconfig --list $1) >/dev/null 2>&1 ;then
		echo "[INFO] start service '$1'"
		service $1 start
	else
		echo "[ERROR] service '$1' not exist..."
	fi
}

#
# Stop service.
# Usage:
#    stop_service service_name
#
stop_service() {
	if (chkconfig --list $1) >/dev/null 2>&1 ;then
		echo "[INFO] stop service '$1'"
		service $1 stop
	else
		echo "[WARN] service '$1' not exist..."
	fi
}

#
# Commit lines in the specified file.
# Usage:
#    comment_lines string file
#
comment_lines() {
	sed -i "s|^\(\s*[^#]*\)\?$1|#&|g" $2
}

#--------------------------------------------------------
#
# Stop services before upgrade
#

echo "[INFO] shutdown services ..."
if [ "$SERVER_TYPE" == "commander" ] || [ "$SERVER_TYPE" == "all" ]; then
	stop_service ingest_alertd
	stop_service ingest_monitord
#	stop_service ingest_tomcatd
fi
if [ "$SERVER_TYPE" == "agent" ] || [ "$SERVER_TYPE" == "all" ]; then
	stop_service ingest_agentd
	stop_service ingest_monitord
	stop_service ingest_loggingd
	stop_service ingest_faultd
fi

echo "[INFO] shutdown tomcat ..."
$TOMCAT_HOME/bin/shutdown.sh >/dev/null 2>&1

echo "[INFO] kill java ..."
if (pgrep -f java) >/dev/null 2>&1 ;then
	echo "[WARN] force kill java processes ..."
	pkill -9f java
fi
echo "[INFO] kill transcoder ..."
if (pgrep -f transcoder.exe) >/dev/null 2>&1 ;then
	echo "[WARN] force kill transcoder.exe processes ..."
	pkill -9f transcoder.exe
fi

#--------------------------------------------------------
#
# Backup relation folders
#
echo ""
echo "--------------------------------------------------------"
echo "[INFO] start backup ..."
echo "--------------------------------------------------------"
if [ "$SERVER_TYPE" == "commander" ] || [ "$SERVER_TYPE" == "all" ]; then
	# backup database
	if exist_service mysql; then
		service mysql start
	elif exist_service mysqld; then
		service mysqld start
	fi
	if echo "use $DATABASE_NAME" | mysql -uroot -p$DATABASE_PWD >/dev/null 2>&1; then
		EXIST_DATABASE=true
	fi
	if [ "$EXIST_DATABASE" == "true" ]; then
		echo "[INFO] backup database $DATABASE_NAME"
		mysqldump -uroot -p$DATABASE_PWD --add-drop-database --databases $DATABASE_NAME > $BACKUP_HOME/ingestdb.dmp
	else
		echo "[WARN] database not found: $DATABASE_NAME"
		SET_TOMCAT_IN_RC_LOCAL=true
	fi

	backup_folder $ARCVIDEO_HOME/commander $BACKUP_HOME/commander
	backup_folder $ARCVIDEO_HOME/alert $BACKUP_HOME/alert
#	backup_folder $ARCVIDEO_HOME/tomcat $BACKUP_HOME/tomcat
#	backup_folder $ARCVIDEO_HOME/script $BACKUP_HOME/Script # not used
	if [ "$SERVER_TYPE" != "all" ]; then
		backup_folder $ARCVIDEO_HOME/monitor $BACKUP_HOME/monitor
		if [ -d $ARCVIDEO_HOME/license ] ;then
			cp -rf $ARCVIDEO_HOME/license $BACKUP_HOME/
		fi
	fi
fi
if [ "$SERVER_TYPE" == "agent" ] || [ "$SERVER_TYPE" == "all" ]; then
	backup_folder $ARCVIDEO_HOME/agent $BACKUP_HOME/agent
	backup_folder $ARCVIDEO_HOME/logging $BACKUP_HOME/logging
	backup_folder $ARCVIDEO_HOME/monitor $BACKUP_HOME/monitor
	backup_folder $ARCVIDEO_HOME/fault $BACKUP_HOME/fault
	backup_folder $ARCVIDEO_HOME/checkgpu $BACKUP_HOME/checkgpu
#	backup_folder $ARCVIDEO_HOME/script $BACKUP_HOME/script # not used
#	backup_folder $ARCVIDEO_HOME/tmservice $BACKUP_HOME/tmservice # not used
	if [ -d $ARCVIDEO_HOME/license ] ;then
		cp -rf $ARCVIDEO_HOME/license $BACKUP_HOME/
	fi
fi
if [ -f "$TRANSCODER_PACKAGE" ] ;then
	rm -rf $ARCVIDEO_HOME/$TRANSCODER/core.*
	rm -rf $ARCVIDEO_HOME/$TRANSCODER/ASLOG-pid*
	backup_folder $ARCVIDEO_HOME/$TRANSCODER $BACKUP_HOME/transcoder
fi
if [ -f "$TOMCAT_PACKAGE" ] ;then
	backup_folder $TOMCAT_HOME $BACKUP_HOME/tomcat
fi
if [ -f "$JRE_PACKAGE" ] ;then
	backup_folder /usr/local/jre $BACKUP_HOME/jre
fi
#--------------------------------------------------------
#
# Start upgrading
#
echo "--------------------------------------------------------"
echo "[INFO] start upgrading ..."
echo "--------------------------------------------------------"

#
# upgrade tomcat
#
if [ -f "$TOMCAT_PACKAGE" ] ;then
	echo "[INFO] unzip $TOMCAT_PACKAGE..."
	tar -xzf $TOMCAT_PACKAGE -C $UNZIP_TMP

	echo "[INFO] install tomcat ..."
	mkdir -p $TOMCAT_HOME
	cp -rf $UNZIP_TMP/apache-tomcat*/* $TOMCAT_HOME

	# change tomcat port
	if [ "$SERVER_TYPE" == "commander" ]; then
		if [ -f $TOMCAT_HOME/conf/server.xml ] ;then
			echo "[INFO] change tomcat port to $TOMCAT_PORT ..."
			sed -i "s/port=\"8080\"/port=\"$TOMCAT_PORT\" URIEncoding=\"UTF-8\"/g" $TOMCAT_HOME/conf/server.xml
		fi
	fi
	
	# add java options
	if [ -f $TOMCAT_HOME/bin/catalina.sh ] ;then
		echo "[INFO] add JAVA_OPTS to catalina.sh ..."
		sed -i '/#!\/bin\/sh/a\JAVA_OPTS="-server -Xms256m -Xmx2048m -XX:PermSize=64m -XX:MaxPermSize=256m"' $TOMCAT_HOME/bin/catalina.sh
 	fi

 	# enable linking
 	if [ -f $TOMCAT_HOME/conf/context.xml ] ;then
 		echo "[INFO] add allowLinking=true to context.xml ..."
 		sed -i 's/<Context>/<Context allowLinking="true">/g' $TOMCAT_HOME/conf/context.xml
 	fi
	echo "[INFO] install tomcat DONE"
else
	echo "[WARN] tomcat install package is not exist."
fi
#--------------------------------------------------------
#
# upgrade JRE
#
if [ -f "$JRE_PACKAGE" ] ;then
	echo "[INFO] unzip $JRE_PACKAGE..."
	tar -xzf $JRE_PACKAGE -C $UNZIP_TMP

	echo "[INFO] install jre ..."
	mkdir -p /usr/local/jre
	if (ls $UNZIP_TMP/jdk*) >/dev/null 2>&1 ;then
		cp -rf $UNZIP_TMP/jdk*/* /usr/local/jre
	elif (ls $UNZIP_TMP/jre*) >/dev/null 2>&1 ;then
		cp -rf $UNZIP_TMP/jre*/* /usr/local/jre
	fi
	echo "[INFO] install jre DONE"
else
	echo "[WARN] jre install package is not exist."
fi
#--------------------------------------------------------
#
# upgrade transcoder
#
if [ -f "$TRANSCODER_PACKAGE" ] ;then
	echo "[INFO] unzip $TRANSCODER_PACKAGE..."
	unzip -q $TRANSCODER_PACKAGE -d $UNZIP_TMP/transcoder
	mkdir -p $ARCVIDEO_HOME/$TRANSCODER

	echo "[INFO] install transcoder ..."
	mv $UNZIP_TMP/transcoder/linux/* $ARCVIDEO_HOME/$TRANSCODER
	cd $ARCVIDEO_HOME/$TRANSCODER
	chmod +x *.sh *.so *.exe VMFRegister
	./register.sh
	cd $CURDIR
	echo "[INFO] install transcoder DONE"
else
	echo "[WARN] transcoder install package is not exist."
fi
#--------------------------------------------------------
#
# Starting upgrade commander components
#
echo "--------------------------------------------------------"
echo "        Starting upgrade commander components"
echo "--------------------------------------------------------"
if [ -f "$COMMANDER_PACKAGE" ] ;then

	#
	# Unzip commander package if necessary.
	#
	if [ "$SERVER_TYPE" == "commander" ] || [ "$SERVER_TYPE" == "agent" ] || [ "$SERVER_TYPE" == "all" ]; then
		echo "[INFO] unzip $COMMANDER_PACKAGE ..."
		unzip -q $COMMANDER_PACKAGE -d $UNZIP_TMP/commander

		#
		# install nistat
		#
		NICSTAT=$UNZIP_TMP/commander/dependencies/bin/nicstat
		if [ -f $NICSTAT ] && [ ! -f /usr/bin/nicstat ]; then
			echo "[INFO] install nicstat ..."
			cp $NICSTAT /usr/bin/nicstat
			chmod +x /usr/bin/nicstat
		fi

		#
		# install mpstat
		#
		MPSTAT=$UNZIP_TMP/commander/dependencies/bin/mpstat
		if [ -f $MPSTAT ] && [ ! -f /usr/bin/nicstat ]; then
			echo "[INFO] install mpstat ..."
			cp $MPSTAT /usr/bin/mpstat
			chmod +x /usr/bin/mpstat
		fi
	fi
	
	#
	# install commander components
	#
	if [ "$SERVER_TYPE" == "commander" ] || [ "$SERVER_TYPE" == "all" ] ;then

		#
		# initialize database
		#
		if [ "$EXIST_DATABASE" != "true" ]; then
			DATABASE_FILE=$UNZIP_TMP/commander/ingestdb.sql
			echo "[INFO] initialize database $DATABASE_NAME ..."
			if [ "$DATABASE_NAME" != "ingestdb" ]; then
				sed -i "s|ingestdb|$DATABASE_NAME|g" $DATABASE_FILE
			fi
			#
			# add system settings
			#
			SYSTEM_UUID=`dmidecode -s system-uuid`
			echo "" >> $DATABASE_FILE
			echo "insert into tbl_system_settings(setting_key, setting_value) values('cluster.type', '1');" >> $DATABASE_FILE
			echo "insert into tbl_system_settings(setting_key, setting_value) values('cluster.bindAddr_$SYSTEM_UUID', '$BINDIP');" >> $DATABASE_FILE
			echo "insert into tbl_system_settings(setting_key, setting_value) values('cluster.ip', '$CLUSTER_IP');" >> $DATABASE_FILE
			echo "insert into tbl_system_settings(setting_key, setting_value) values('cluster.port', '$CLUSTER_PORT');" >> $DATABASE_FILE
			echo "insert into tbl_system_settings(setting_key, setting_value) values('ftp.port', '21');" >> $DATABASE_FILE
			mysql -uroot -p$DATABASE_PWD < $DATABASE_FILE
			echo "[INFO] initialize database DONE"
		else
			echo "[INFO] database already exist."
		fi

		if [ "$SERVER_TYPE" != "all" ] ;then
			#
			# upgrade libarclicense.so
			#
			if [ -f $UNZIP_TMP/commander/arcvideo-license.zip ] ;then
				echo "[INFO] install libarclicense.so ..."
				mkdir -p $ARCVIDEO_HOME/license
				unzip -qo $UNZIP_TMP/commander/arcvideo-license.zip -d $ARCVIDEO_HOME/license
				chmod +x $ARCVIDEO_HOME/license/*.so
			else
				echo "[WARN] no license package find, skip install license"
			fi
		fi

		#
		# upgrade alert
		#
		if [ -f $UNZIP_TMP/commander/arcvideo-commander-alert.zip ] ;then
			echo "[INFO] install alert ..."
			unzip -q $UNZIP_TMP/commander/arcvideo-commander-alert.zip -d $ARCVIDEO_HOME/alert
			# update alert port
			ALERT_CONFIG_FILE=$ARCVIDEO_HOME/alert/conf/alert.xml
			if [ -f $ALERT_CONFIG_FILE ]; then
				if [ $ALERT_PORT -ne 7203 ] ;then
					echo "[INFO] alert port changed to $ALERT_PORT"
					sed -i "s|<param name=\"port\">7203</param>|<param name=\"port\">$ALERT_PORT</param>|g" $ALERT_CONFIG_FILE
				fi
			else
				echo "[ERROR] alert configuration file not found: $ALERT_CONFIG_FILE"
			fi
			setup_service $ARCVIDEO_HOME/alert/bin/ingest_alertd ingest_alertd
			echo "[INFO] install alert DONE"
			if [ "$START_AFTER_UPGRADE" == "true" ]; then
				start_service ingest_alertd
			fi
		else
			echo "[WARN] no alert package find, skip install alert"
		fi

		#
		# only install agent monitor if install all in one.
		#
		if [ "$SERVER_TYPE" != "all" ] ;then
			#
			# upgrade monitor
			#
			if [ -f $UNZIP_TMP/commander/arcvideo-commander-monitor.zip ] ;then
				echo "[INFO] install monitor ..."
				unzip -q $UNZIP_TMP/commander/arcvideo-commander-monitor.zip -d $ARCVIDEO_HOME/monitor
				# update monitor port and alert port
				MONITOR_CONFIG_FILE=$ARCVIDEO_HOME/monitor/conf/monitor.xml
				if [ -f $MONITOR_CONFIG_FILE ]; then
					if [ $MONITOR_PORT -ne 7204 ] ;then
						echo "[INFO] monitor port changed to $MONITOR_PORT"
						sed -i "s|<param name=\"port\">7204</param>|<param name=\"port\">$MONITOR_PORT</param>|g" $MONITOR_CONFIG_FILE
					fi
					if [ $ALERT_PORT -ne 7203 ] ;then
						echo "[INFO] alert port changed to $ALERT_PORT"
						sed -i "s|<param name=\"port\">7203</param>|<param name=\"port\">$ALERT_PORT</param>|g" $MONITOR_CONFIG_FILE
					fi
				else
					echo "[ERROR] monitor configuration file not found: $MONITOR_CONFIG_FILE"
				fi
				if [ -d $UNZIP_TMP/commander/script ] ;then
					cp -rf $UNZIP_TMP/commander/script $ARCVIDEO_HOME/
					cd $ARCVIDEO_HOME/script
					chmod +x *.sh
					cd $CURDIR
				fi
				setup_service $ARCVIDEO_HOME/monitor/bin/ingest_monitord ingest_monitord
				echo "[INFO] install monitor DONE"
				if [ "$START_AFTER_UPGRADE" == "true" ]; then
					start_service ingest_monitord
				fi
			else
				echo "[WARN] no monitor package find, skip install monitor"
			fi
		fi

		#
		# install commander
		#
		echo "[INFO] install commander ..."
		unzip -q $UNZIP_TMP/commander/commander.war -d $ARCVIDEO_HOME/commander

		# update database configuration if database name is not ingestdb
		if [ "$DATABASE_NAME" != "ingestdb" ]; then
			echo "[INFO] update commander database name $DATABASE_NAME."
			DATABASE_CONFIG_FILE=$ARCVIDEO_HOME/commander/WEB-INF/classes/config/database.properties
			if [ -f $DATABASE_CONFIG_FILE ]; then
				sed -i "s|ingestdb|$DATABASE_NAME|g" $DATABASE_CONFIG_FILE
				echo "[INFO] database name updated to $DATABASE_NAME"
			else
				echo "[INFO] database configuration file not found: $DATABASE_CONFIG_FILE"
			fi
		fi

		TRANSCODER_CONFIG_FILE=$ARCVIDEO_HOME/commander/WEB-INF/classes/config/transcoder.properties
		if [ -f $TRANSCODER_CONFIG_FILE ]; then
			if [ "$TRANSCODER" != "transcoder" ] ;then
				echo "[INFO] set transcoder path: $ARCVIDEO_HOME/$TRANSCODER/"
				sed -i "s|/usr/local/arcvideo/ingest/transcoder/|$ARCVIDEO_HOME/$TRANSCODER/|g" $TRANSCODER_CONFIG_FILE
			fi
			if [ "$TRANSCODER_WORKDIR" != "tmpdir" ]; then
				echo "[INFO] set transcoder work dir: $ARCVIDEO_HOME/$TRANSCODER_WORKDIR/"
				sed -i "s|/usr/local/arcvideo/ingest/tmpdir|$ARCVIDEO_HOME/$TRANSCODER_WORKDIR|g" $TRANSCODER_CONFIG_FILE
			fi
		else
			echo "[ERROR] transcoder configuration file not found: $TRANSCODER_CONFIG_FILE"
		fi

		echo "[INFO] deploy commander to tomcat ..."
		mkdir -p $TOMCAT_HOME/conf/Catalina/localhost/
		ROOT_XML=$TOMCAT_HOME/conf/Catalina/localhost/ingest.xml
		echo '<?xml version="1.0" encoding="utf-8"?>' > $ROOT_XML
		echo '' >> $ROOT_XML
		echo '<Context path="/ingest" docBase="/usr/local/arcvideo/ingest/commander" reloadable="false">' >> $ROOT_XML
		echo '</Context>' >> $ROOT_XML
		echo "[INFO] install commander DONE"

		#
		#	install tomcat service
		#
		# if [ -f $UNZIP_TMP/commander/arcvideo-tomcat.zip ] ;then
		# 	echo "[INFO] install tomcat service ..."
		# 	unzip -q $UNZIP_TMP/commander/arcvideo-tomcat.zip -d $ARCVIDEO_HOME/tomcat
		# 	setup_service $ARCVIDEO_HOME/tomcat/bin/ingest_tomcatd ingest_tomcatd
		# 	echo "[INFO] install tomcat service DONE"
		# 	if [ "$START_AFTER_UPGRADE" == "true" ]; then
		# 		start_service ingest_tomcatd
		# 	fi
		# else
		# 	echo "[WARN] no tomcat package find, skip install tomcat"
		# fi


		#
		# start tomcat
		#
		if [ "$START_AFTER_UPGRADE" == "true" ]; then
			echo "[INFO] start tomcat ..."
			$TOMCAT_HOME/bin/startup.sh >/dev/null 2>&1
		fi
	fi

	#
	# upgrade agent components
	#
	if [ "$SERVER_TYPE" == "agent" ]  || [ "$SERVER_TYPE" == "all" ] ;then

		#
		# upgrade cuinit service
		#
		if (ls $UNZIP_TMP/commander/arcvideo-gputool-cuinit-*.zip) >/dev/null 2>&1 ;then
			echo "[INFO] install cuinitd ..."
			stop_service cuinitd
			unzip -q $UNZIP_TMP/commander/arcvideo-gputool-cuinit-*.zip -d $UNZIP_TMP/commander/cuinit
			cp -rf $UNZIP_TMP/commander/cuinit/bin/cuInitStart /usr/bin
			setup_service $UNZIP_TMP/commander/cuinit/bin/cuinitd cuinitd
			echo "[INFO] install cuinitd DONE"
			if [ "$START_AFTER_UPGRADE" == "true" ]; then
				start_service cuinitd
			fi
		else
			echo "[WARN] no cuinit package find, skip install cuinit"
		fi

		#
		# upgrade libarclicense.so
		#
		if [ -f $UNZIP_TMP/commander/arcvideo-license.zip ] ;then
			echo "[INFO] install libarclicense.so ..."
			mkdir -p $ARCVIDEO_HOME/license
			unzip -qo $UNZIP_TMP/commander/arcvideo-license.zip -d $ARCVIDEO_HOME/license
			chmod +x $ARCVIDEO_HOME/license/*.so
			echo "[INFO] install license DONE"
		else
			echo "[WARN] no license package find, skip install license"
		fi

		#
		# upgrade monitor
		#
		if [ -f $UNZIP_TMP/commander/arcvideo-agent-monitor.zip ] ;then
			echo "[INFO] install monitor ..."
			unzip -q $UNZIP_TMP/commander/arcvideo-agent-monitor.zip -d $ARCVIDEO_HOME/monitor
			# update monitor port and alert port
			MONITOR_CONFIG_FILE=$ARCVIDEO_HOME/monitor/conf/monitor.xml
			if [ -f $MONITOR_CONFIG_FILE ]; then
				if [ "$SERVER_TYPE" != "all" ] ;then
					# connect monitor to commander monitor.
					echo "[INFO] connect monitor to commander monitor, monitor port $ALERT_PORT"
					if [ $MONITOR_PORT -ne 7204 ] ;then
						echo "[INFO] monitor port changed to $MONITOR_PORT"
						sed -i "s|<param name=\"port\">7204</param>|<param name=\"port\">$MONITOR_PORT</param>|g" $MONITOR_CONFIG_FILE
					fi
					if [ $ALERT_PORT -ne 7203 ] ;then
						echo "[INFO] alert port changed to $ALERT_PORT"
						sed -i "s|<param name=\"port\">7203</param>|<param name=\"port\">$ALERT_PORT</param>|g" $MONITOR_CONFIG_FILE
					fi
					sed -i "s|<param name=\"ip\">.*</param>|<param name=\"ip\">$COMMANDER_IP</param>|g" $MONITOR_CONFIG_FILE
				else
					# if install all in one, connect monitor to alert directly.
					echo "[INFO] connect monitor to alert directly, alert port $ALERT_PORT"
					sed -i "s|<param name=\"port\">7203</param>|<param name=\"port\">$ALERT_PORT</param>|g" $MONITOR_CONFIG_FILE
					sed -i "s|<param name=\"ip\">.*</param>|<param name=\"ip\">localhost</param>|g" $MONITOR_CONFIG_FILE
				fi
			else
				echo "[ERROR] monitor configuration file not found: $MONITOR_CONFIG_FILE"
			fi
			if [ -d $UNZIP_TMP/commander/script ] ;then
				cp -rf $UNZIP_TMP/commander/script $ARCVIDEO_HOME/
				cd $ARCVIDEO_HOME/script
				chmod +x *.sh
				cd $CURDIR
			fi
			setup_service $ARCVIDEO_HOME/monitor/bin/ingest_monitord ingest_monitord
			echo "[INFO] install monitor DONE"
			if [ "$START_AFTER_UPGRADE" == "true" ]; then
				start_service ingest_monitord
			fi
		else
			echo "[WARN] no monitor package find, skip install monitor"
		fi

		#
		# upgrade logging
		#
		if (ls $UNZIP_TMP/commander/arcvideo-loggin*.zip) >/dev/null 2>&1 ;then
			echo "[INFO] install logging ..."
			unzip -q $UNZIP_TMP/commander/arcvideo-loggin*.zip -d $ARCVIDEO_HOME/logging
			setup_service $ARCVIDEO_HOME/logging/bin/ingest_loggingd ingest_loggingd
			echo "[INFO] install logging DONE"
			if [ "$START_AFTER_UPGRADE" == "true" ]; then
				start_service ingest_loggingd
			fi
		else
			echo "[WARN] no logging package find, skip install logging"
		fi

		#
		# upgrade fault
		#
		if (ls $UNZIP_TMP/commander/arcvideo-faul*.zip) >/dev/null 2>&1 ;then
			echo "[INFO] install fault ..."
			unzip -q $UNZIP_TMP/commander/arcvideo-faul*.zip -d $ARCVIDEO_HOME/fault
			setup_service $ARCVIDEO_HOME/fault/bin/ingest_faultd ingest_faultd

			# modify fault.properties
			FAULT_CONFIG_FILE=$ARCVIDEO_HOME/fault/conf/fault.properties
			if [ -f $FAULT_CONFIG_FILE ] ;then
				sed -i "s/fault\.port=7212/fault\.port=$FAULT_PORT/g" $FAULT_CONFIG_FILE
				echo "[INFO] set fault.port=$FAULT_PORT"
			else
				echo "[ERROR] fault configuration file not found: $FAULT_CONFIG_FILE"
			fi
			echo "[INFO] install fault DONE"
			if [ "$START_AFTER_UPGRADE" == "true" ]; then
				start_service ingest_faultd
			fi
		else
			echo "[WARN] no fault package find, skip install fault"
		fi

		#
		# upgrade checkgpu
		#
		if (ls $UNZIP_TMP/commander/arcvideo-checkgpu-*.zip) >/dev/null 2>&1 ;then
			echo "[INFO] install checkgpu ..."
			unzip -q $UNZIP_TMP/commander/arcvideo-checkgpu-*.zip -d $ARCVIDEO_HOME/checkgpu
			cd $ARCVIDEO_HOME/checkgpu
			chmod +x *.sh *.so *.exe VMFRegister
			./register.sh
			cd $CURDIR
			echo "[INFO] install checkgpu DONE"
		else
			echo "[WARN] checkgpu install package is not exist."
		fi

		#
		# upgrade agent
		#
		echo "[INFO] install agent ..."
		unzip -q $UNZIP_TMP/commander/agent.zip -d $ARCVIDEO_HOME/agent
		if (ls $BACKUP_HOME/agent/data/*) >/dev/null 2>&1 ;then
			echo "[INFO] copy agent data ..."
			cp -rf $BACKUP_HOME/agent/data/* $ARCVIDEO_HOME/agent/data/
		fi
		setup_service $ARCVIDEO_HOME/agent/bin/ingest_agentd ingest_agentd
		echo "[INFO] install agent DONE"

		# remove startup agent script from startserver.sh
		if [ -f $ARCVIDEO_HOME/startup/startserver.sh ] ;then
			echo "[INFO] disable agent startup in startserver.sh ..."
			sed -i 's|.*$ARCVIDEO_HOME/agent/bin/startup.sh.*||g' $ARCVIDEO_HOME/startup/startserver.sh
		fi

		# remove startup agent script from rc.local
		if [ -f /etc/rc.local ] ;then
			echo "[INFO] disable agent startup in rc.local ..."
			sed -i 's|.*$ARCVIDEO_HOME/agent/bin/startup.sh.*||g' /etc/rc.local
		fi

		# modify agent.properties
		AGENT_CONFIG_FILE=$ARCVIDEO_HOME/agent/conf/agent.properties
		if [ -f $AGENT_CONFIG_FILE ] ;then
			sed -i "s/cluster\.ip=239.8.8.1/cluster\.ip=$CLUSTER_IP/g" $AGENT_CONFIG_FILE
			sed -i "s/cluster\.port=8921/cluster\.port=$CLUSTER_PORT/g" $AGENT_CONFIG_FILE
			sed -i "s/#cluster\.bind=eth0/cluster\.bind=$BINDIP/g" $AGENT_CONFIG_FILE
			if [ $AGENT_PORT -ne 7210 ]; then
				echo "[INFO] set agent port to $AGENT_PORT"
				sed -i "s/#server\.port=7210/server\.port=$AGENT_PORT/g" $AGENT_CONFIG_FILE
			fi
			if [ $AGENT_COMMAND_PORT -ne 7211 ]; then
				echo "[INFO] set agent command port to $AGENT_COMMAND_PORT"
				sed -i "s/#command\.port=7211/command\.port=$AGENT_COMMAND_PORT/g" $AGENT_CONFIG_FILE
			fi
			if [ "$TRANSCODER" != "transcoder" ] ;then
				echo "[INFO] update transcoder path: $ARCVIDEO_HOME/$TRANSCODER/ in agent.properties"
				sed -i "s|\${arcvideo\.home}/transcoder/|\${arcvideo\.home}/$TRANSCODER/|g" $AGENT_CONFIG_FILE
			fi
			echo "[INFO] cluster=$CLUSTER_IP:$CLUSTER_PORT, bind ip=$BINDIP:$AGENT_PORT"
		else
			echo "[ERROR] agent configuration file not found: $AGENT_CONFIG_FILE"
		fi

		# modify transcoder.properties
		TRANSCODER_CONFIG_FILE=$ARCVIDEO_HOME/agent/conf/transcoder.properties
		if [ -f $TRANSCODER_CONFIG_FILE ]; then
			if [ "$TRANSCODER" != "transcoder" ] ;then
				if [ -f $ARCVIDEO_HOME/agent/conf/transcoder.properties ]; then
					echo "[INFO] update transcoder path: $ARCVIDEO_HOME/$TRANSCODER/ in transcoder.properties"
					sed -i "s|/usr/local/arcvideo/ingest/transcoder/|$ARCVIDEO_HOME/$TRANSCODER/|g" $TRANSCODER_CONFIG_FILE
				fi
			fi
			if [ "$TRANSCODER_WORKDIR" != "tmpdir" ]; then
				echo "[INFO] set transcoder work dir: $ARCVIDEO_HOME/$TRANSCODER_WORKDIR/"
				sed -i "s|/usr/local/arcvideo/ingest/tmpdir|$ARCVIDEO_HOME/$TRANSCODER_WORKDIR|g" $TRANSCODER_CONFIG_FILE
			fi
		else
			echo "[ERROR] transcoder configuration file not found: $TRANSCODER_CONFIG_FILE"
		fi

		# start after install
		if [ "$START_AFTER_UPGRADE" == "true" ]; then
			start_service ingest_agentd
		fi

		#
		# upgrade tmservice
		#
		if [ "$SERVER_TYPE" != "all" ] ;then
			if (ls $UNZIP_TMP/commander/transcoder-tmservice-*.war) >/dev/null 2>&1 ;then
				echo "[INFO] install tmservice for http output ..."
				unzip -q $UNZIP_TMP/commander/transcoder-tmservice-*.war -d $ARCVIDEO_HOME/tmservice
			else
				echo "[WARN] tmservice install package is not exist."
			fi
			
			echo "[INFO] deploy tmservice to tomcat ..."
			mkdir -p $TOMCAT_HOME/conf/Catalina/localhost/
			#ROOT_XML=$TOMCAT_HOME/conf/Catalina/localhost/tmservice.xml
			mv $TOMCAT_HOME/conf/Catalina/localhost/ROOT.xml $TOMCAT_HOME/conf/Catalina/localhost/ROOT.bak
			ROOT_XML=$TOMCAT_HOME/conf/Catalina/localhost/ROOT.xml
			echo '<?xml version="1.0" encoding="utf-8"?>' > $ROOT_XML
			echo '' >> $ROOT_XML
			echo '<Context docBase="/usr/local/arcvideo/ingest/tmservice" reloadable="false">' >> $ROOT_XML
			echo '</Context>' >> $ROOT_XML
			echo "[INFO] install tmservice DONE"
		fi

		#
		# add tomcat to rc.local
		#
		if [ "$SET_TOMCAT_IN_RC_LOCAL" == "true" ]; then
			if [ -f /etc/rc.local ] ;then
				echo "" >> /etc/rc.local
#				echo "export JAVA_HOME=/usr/local/jre" >> /etc/rc.local
				echo $TOMCAT_HOME/bin/startup.sh >> /etc/rc.local
			fi	

			if [ -f /etc/rc.d/rc.local ] ;then
				echo "" >> /etc/rc.d/rc.local
#				echo "export JAVA_HOME=/usr/local/jre" >> /etc/rc.d/rc.local
				echo $TOMCAT_HOME/bin/startup.sh >> /etc/rc.d/rc.local
			fi	
		fi
			
		#
		# start tomcat
		#
		if [ "$START_AFTER_UPGRADE" == "true" ]; then
			echo "[INFO] start tomcat ..."
			$TOMCAT_HOME/bin/startup.sh >/dev/null 2>&1
		fi
		
		#
		# start tomcat
		#
		# if [ "$START_AFTER_UPGRADE" == "true" ]; then
		# 	echo "[INFO] shutdown tomcat ..."
		# 	$TOMCAT_HOME/bin/shutdown.sh >/dev/null 2>&1

		# 	pid=`ps -ef | grep java | grep $CATALINA_HOME | awk '{print $2}'`
		# 	if [[ -z "$pid" ]];then
		# 		echo "[INFO] shutdown tomcat ok."
		# 	else
		# 	  kill $pid
		# 	  while [[ `ps -ef | grep java | grep $CATALINA_HOME | awk '{print $2}'` ]];do
		# 		echo "Waiting for tomcat shutdown..."
		# 		sleep 1
		# 	  done
		# 	  echo "Tomcat shutdown completed."
		# 	  sleep 5
		# 	fi

		# 	echo "[INFO] start tomcat ..."
		# 	$TOMCAT_HOME/bin/startup.sh >/dev/null 2>&1
		# fi
				
#####  comment for tmsservice #####
#		#
#		# disable tomcat startup script
#		#
#		if [ -f $ARCVIDEO_HOME/startup/startserver.sh ] ;then
#			echo "[INFO] disable tomcat startup script in startserver.sh ..."
#			comment_lines "$TOMCAT_HOME/bin/startup.sh" $ARCVIDEO_HOME/startup/startserver.sh
#		fi
	fi
fi
#--------------------------------------------------------
#
# disable vnc service
#
if [ "$DISABLE_VNC" == "true" ]; then
	disable_service vncserver-x11-serviced
fi

#
# disable smb service
#
if [ "$DISABLE_SMB" == "true" ]; then
	disable_service smb
	if [ -f $ARCVIDEO_HOME/startup/startserver.sh ] ;then
		echo "[INFO] disable smb in startserver.sh ..."
		comment_lines "service\s\+smb\s\+start" $ARCVIDEO_HOME/startup/startserver.sh
	fi
fi

#
# clean data
#
echo "[INFO] clean ..."
rm -rf $UNZIP_TMP

#--------------------------------------------------------

#
# restart tomcat
#
#echo "[INFO] shutdown tomcat ..."
#$TOMCAT_HOME/bin/shutdown.sh >/dev/null 2>&1

#pid=`ps -ef | grep java | grep $CATALINA_HOME | awk '{print $2}'`
#if [[ -z "$pid" ]];then
#	echo "[INFO] shutdown tomcat ok."
#else
#   kill $pid
#   while [[ `ps -ef | grep java | grep $CATALINA_HOME | awk '{print $2}'` ]];do
#	echo "Waiting for tomcat shutdown..."
#	sleep 1
#   done
#   echo "Tomcat shutdown completed."
#   sleep 5
#fi

#echo "[INFO] startup tomcat ..."
#$TOMCAT_HOME/bin/startup.sh >/dev/null 2>&1

if [ "$SET_TOMCAT_IN_RC_LOCAL" == "true" ]; then
	echo "[INFO] set tomcat to auto start."
else
	echo "[INFO] need check tomcat is auto start or not."
fi

#--------------------------------------------------------

echo "[INFO] upgrade finished."
exit 0
