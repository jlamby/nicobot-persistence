FROM node:buster-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src src

CMD ["npm", "run", "startDev"]
