#!/bin/sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")

node $SCRIPTPATH/satellite-usage.js "$(node $SCRIPTPATH/satellite-login.js)"
