#!/bin/sh
nginx -g 'pid /tmp/nginx.pid;'
tail -f /dev/null
