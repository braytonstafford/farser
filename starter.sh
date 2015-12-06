#!/bin/sh

export PATH=/usr/local/bin:$PATH
forever start --spinSleepTime 10000 /var/nodeJS/farser/app.js -l /var/log/farserlog.txt 2>&1
