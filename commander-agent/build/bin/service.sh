#!/bin/sh

###############################################################################
# Script for Execute Service Action
###############################################################################

#
# Variables
#
SERVICE_NAME=ingest_agentd
SERVICE_ACTION=

#
# Show usage.
#
show_usage() {
	PRGNAME=`basename $0`
	echo "Execute actions for service ($SERVICE_NAME): "
	echo "  $PRGNAME -i | --install      Install service."
	echo "  $PRGNAME -u | --uninstall    Uninstall service."
	echo "  $PRGNAME -s | --start        Start service."
	echo "  $PRGNAME -o | --stop         Stop service."
	echo "  $PRGNAME -r | --restart      Restart service."
	echo "  $PRGNAME -t | --status       Get service running status."
	echo ""
}

#
# Check arguments.
#
if [ "$1" = "-i" ] || [ "$1" = "--install" ] ; then
	SERVICE_ACTION="install"
elif [ "$1" = "-u" ] || [ "$1" = "--uninstall" ] ; then
	SERVICE_ACTION="uninstall"
elif [ "$1" = "-s" ] || [ "$1" = "--start" ] ; then
	SERVICE_ACTION="start"
elif [ "$1" = "-o" ] || [ "$1" = "--stop" ] ; then
	SERVICE_ACTION="stop"
elif [ "$1" = "-r" ] || [ "$1" = "--restart" ] ; then
	SERVICE_ACTION="restart"
elif [ "$1" = "-t" ] || [ "$1" = "--status" ] ; then
	SERVICE_ACTION="status"
elif [ "$1" = "-h" ] || [ "$1" = "--help" ] ; then
	show_usage
	exit 0
else
	show_usage
	exit 1
fi

#
# resolve links - $0 may be a softlink
#
PRG="$0"
while [ -h "$PRG" ]; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done
PRGDIR=`dirname "$PRG"`
ABSPRGDIR=`cd $PRGDIR >/dev/null 2>&1; pwd`

#
# execute service action.
#
if [ "$SERVICE_ACTION" = "install" ] ; then
	if [ ! -f $ABSPRGDIR/$SERVICE_NAME ] ; then
		echo "[ERROR] The service $SERVICE_NAME not found."
		exit 1
	fi
	if [ -e /etc/init.d/$SERVICE_NAME ] ; then
		rm -rf /etc/init.d/$SERVICE_NAME
	fi
	ln -s $ABSPRGDIR/$SERVICE_NAME /etc/init.d/$SERVICE_NAME
	chkconfig --add $SERVICE_NAME
	chkconfig --level 2345 $SERVICE_NAME on
	echo "[INFO] service $SERVICE_NAME installed."
elif [ "$SERVICE_ACTION" = "uninstall" ] ; then
	chkconfig --del $SERVICE_NAME
	if [ -e /etc/init.d/$SERVICE_NAME ] ; then
		rm -rf /etc/init.d/$SERVICE_NAME
	fi
	echo "[INFO] service $SERVICE_NAME uninstalled."
else
	service $SERVICE_NAME $SERVICE_ACTION
fi
