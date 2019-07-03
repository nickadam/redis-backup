FROM node:alpine

LABEL maintainer="Nick Vissari <@nickadam>"

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "backup.js"]
