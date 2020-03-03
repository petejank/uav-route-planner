FROM node:13.8.0-alpine

RUN apk update && apk add \
  curl \
  nginx \
  bash \
  nasm \
  libtool \
  lcms2-dev \
  libpng-dev \
  gcc \
  g++ \
  make \
  autoconf \
  automake \
  python \
  python-dev \
  build-base \
  openssl-dev \
  openssl \
  libffi-dev
RUN npm install -g --force yarn

COPY ./src/client /home/client
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/client/nginx.conf /etc/nginx/conf.d

RUN cd /home/client && yarn install
RUN cd /home/client && yarn build:prod

COPY ./docker/client/init.sh /home/client/

CMD /home/client/init.sh
