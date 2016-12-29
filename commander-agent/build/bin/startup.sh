#!/bin/sh

###############################################################################
# Script for Start the Agent Server
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

# Load CUDA.
(which nvidia-smi && nvidia-smi -pm 1) >/dev/null 2>&1

# Start agent
exec "$PRGDIR"/"main.sh" start "$@"
