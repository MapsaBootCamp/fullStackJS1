FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@9.6.7
RUN npm install

COPY . .

RUN npm run build
