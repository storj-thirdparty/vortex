FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_ENV=dev npm run build --dev

<<<<<<< HEAD
COPY lib ./lib
COPY index.js .
=======
EXPOSE 3000

CMD [ "node", "index.js" ]
>>>>>>> parent of 42c50309 (optimise Dockerfile + thinky)
