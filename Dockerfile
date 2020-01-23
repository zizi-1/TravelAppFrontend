FROM nginx
COPY . /opt/TravelAppFrontend
COPY nginx.conf /etc/nginx/nginx.conf
