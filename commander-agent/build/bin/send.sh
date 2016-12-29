#!/bin/sh

###############################################################################
# Script for Send Command to the Agent Server
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

# Get standard environment variables
PRGDIR=`dirname "$PRG"`

# Setup command
if [ $# = 0 ] ;then
  COMMAND="help"
else
  COMMAND="$@"
fi

# Send command
exec "$PRGDIR"/"main.sh" "$COMMAND"
