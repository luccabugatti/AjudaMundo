#!/bin/bash

sed -1 "s/:3000/:$PORT/g" /etc/nginx/conf.d/default.conf

npm start &

nginx -g "daemon off;"