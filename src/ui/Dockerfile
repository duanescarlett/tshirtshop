FROM node:11-alpine

WORKDIR /ui

COPY package.json ./

RUN npm install

RUN npm install --save redux

EXPOSE 3000

CMD [ "npm", "start" ]
