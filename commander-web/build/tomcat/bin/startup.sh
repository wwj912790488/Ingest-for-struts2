#!/bin/sh

###############################################################################
# Script for Start the Tomcat
###############################################################################

# resolve links - $0 may be a softlink
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

#
# Tomcat base path.
#
PRGDIR=`dirname "$PRG"`
export CATALINA_BASE=`cd "$PRGDIR/.." >/dev/null; pwd`

#
# Tomcat home path.
#
[ -z "$CATALINA_HOME" ] && CATALINA_HOME=/usr/local/tomcat
EXECUTABLE="$CATALINA_HOME/bin/catalina.sh"
if [ -z "$EXECUTABLE" ] ; then
	echo "Please ensure the tomcat already installed."
	exit 1
fi

#
# Start Tomcat
#
exec "$EXECUTABLE" start "$@"
