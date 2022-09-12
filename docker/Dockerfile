FROM nginx:alpine

COPY ./index.html /usr/share/nginx/html/pages/
COPY ./assets /usr/share/nginx/html/pages/assets
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html/pages/