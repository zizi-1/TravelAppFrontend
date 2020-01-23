#!/bin/bash

rm -rf TravelAppFrontend


git clone https://github.com/zzahid93/TravelAppFrontend.git

cd TravelAppFrontend


touch  Dockerfile

echo 'FROM nginx
COPY . /opt/TravelAppFrontend
COPY nginx.conf /etc/nginx/nginx.conf' > Dockerfile

docker stop TAfrontend
docker rm  TAfrontend
docker rmi travelapp-fe

echo 'events {}
http {
server {
        listen 80 default_server;
        root /opt/TravelAppFrontend/static;
        index index.html;
        include /etc/nginx/mime.types;
        location / {
                try_files $uri $uri/ =404;
        }
        location /TravelApp {
                proxy_pass http://TravelAppDeploy:8082;
        }
        }
}' >nginx.conf
docker build -t travelapp-fe .
docker run --name TAfrontend --network travelapp-mysql -d -p 80:80 travelapp-fe
