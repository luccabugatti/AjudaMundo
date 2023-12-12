FROM nginx

LABEL version="1.0.0" maintenance="Eduardo de Jesus<edusanto22@gmail.com" description="Dockerfile for nginx"

COPY ./dist /app/dist
COPY ./package.json /app

WORKDIR /app

COPY ./start.sh /start.sh

RUN curl -fsSl https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "/start.sh" ]
