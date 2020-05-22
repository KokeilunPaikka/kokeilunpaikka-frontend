#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit
fi

if [ -f .env ]
then
  source .env
  echo "Enviromental values read"
fi

if [[ -z $DOCKER_NAME || -z $DOCKER_PORT ]];
then
    echo "Missing variables from .env"
    exit
fi

echo "Docker container will be ${bold}${DOCKER_NAME} ${normal}running on port ${bold}${DOCKER_PORT}${normal}"

case "$1" in
  run)
    # commands when $VAR matches pattern 1
    echo "RUN!"
    RUN_COMMAND="docker stop ${DOCKER_NAME} ; docker rm ${DOCKER_NAME} ;docker run -dt --name ${DOCKER_NAME} -p 127.0.0.1:${DOCKER_PORT}:3000 --restart unless-stopped ${DOCKER_NAME}"
    echo "${RUN_COMMAND}"
    eval $RUN_COMMAND
    ;;
  build)
    # commands when $VAR matches pattern 2
    echo "BUILD!"
    BUILD_COMMAND="docker build . -t ${DOCKER_NAME}"
    echo "${BUILD_COMMAND}"
    eval $BUILD_COMMAND
    ;;
  *)
    # This will run if $VAR doesnt match any of the given patterns
    echo "Wrong argument"
    ;;
esac
