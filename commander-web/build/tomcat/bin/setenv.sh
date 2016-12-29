#!/bin/sh

###############################################################################
# Script for Start the Tomcat
###############################################################################

JAVA_OPTS="-server -Xms256m -Xmx2048m -XX:PermSize=64m -XX:MaxPermSize=256m"
CATALINA_OUT="/dev/null"
