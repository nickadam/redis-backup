FROM node:alpine

LABEL maintainer="Nick Vissari <@nickadam>"

RUN apk add dumb-init

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["dumb-init", "./docker-entrypoint.sh"]
