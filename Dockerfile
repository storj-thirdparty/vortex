FROM ubuntu:focal

RUN apt-get update

RUN apt-get install apt-transport-https apt-utils ca-certificates wget xz-utils gnupg -y

WORKDIR /app

RUN wget https://nodejs.org/dist/v15.0.1/node-v15.0.1-linux-x64.tar.xz

RUN tar xvfs node-v15.0.1-linux-x64.tar.xz

RUN cp -r node-v15.0.1-linux-x64/* /usr/local/

COPY . .

EXPOSE 3000

RUN echo "deb https://download.rethinkdb.com/repository/ubuntu-focal focal main" | tee /etc/apt/sources.list.d/rethinkdb.list

RUN wget -qO- https://download.rethinkdb.com/repository/raw/pubkey.gpg | apt-key add -

RUN apt-get update

RUN apt-get install rethinkdb -y

RUN npm install

CMD [ "npm", "run", "dev-start" ]
