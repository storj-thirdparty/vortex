FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_ENV=dev npm run build --dev

COPY lib ./lib
COPY index.js .
EXPOSE 3000

CMD [ "node", "index.js" ]
