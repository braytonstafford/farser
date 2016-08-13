#!/bin/sh

export PATH=/usr/local/bin:$PATH
forever start --spinSleepTime 10000 /var/nodeJS/farser/app.js -l /var/log/farser.log 2>&1
