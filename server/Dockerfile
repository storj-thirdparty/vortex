FROM node:current-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
