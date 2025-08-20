#!/bin/bash

declare -A env_vars
while IFS='=' read -r key value || [[ -n "$key" ]]; do
    [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
    value="${value%\"}"
    value="${value#\"}"
    value="${value%%*( )}"
    value="${value##*( )}"
    env_vars[$key]=$value
done < .env

APP_NAME="simple-http-client"
NETWORK_NAME="simple-net"

CONTAINER_ID=$(docker ps -q --filter ancestor=$APP_NAME:latest)
if [ ! -z "$CONTAINER_ID" ]; then
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
fi

docker build -t $APP_NAME:latest .

ENV_FLAGS=""
for key in "${!env_vars[@]}"; do
    ENV_FLAGS="$ENV_FLAGS -e $key=${env_vars[$key]}"
done

PORT="${env_vars[APP_PORT]}"

echo "Using port: $PORT"
echo "Using app name: $APP_NAME"
echo "Using network name: $NETWORK_NAME"

docker network inspect $NETWORK_NAME >/dev/null 2>&1 || docker network create $NETWORK_NAME
docker run -d --name $APP_NAME $ENV_FLAGS --network $NETWORK_NAME -p ${PORT}:${PORT} $APP_NAME:latest
