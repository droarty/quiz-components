FROM node:5.5.0
MAINTAINER Ken Schultz <ken@esparklearning.com>

LABEL version="0.1"
LABEL description="Client application for Frontier"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
COPY .npmrc /usr/src/app/
RUN npm install --unsafe-perm=true
COPY . /usr/src/app
RUN npm run build --unsafe-perm=true

EXPOSE 5000
CMD [ "npm", "start" ]
