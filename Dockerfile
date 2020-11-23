FROM node:15-alpine

EXPOSE 3000

CMD [ "node", "index.js" ]

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

COPY lib .
COPY index.js .
