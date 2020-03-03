FROM openjdk:11.0.6-jdk

RUN apt-get update && apt-get install -y \
  curl \
  bash \
  screen

COPY ./src/server /home/server
COPY ./docker/server/init.sh /home/server/

CMD /home/server/init.sh
