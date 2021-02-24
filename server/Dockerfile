FROM node:current-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run lint

EXPOSE 3000

CMD [ "node", "index.js" ]
