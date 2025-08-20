#!/bin/bash

# Stop and remove existing container with same image name
CONTAINER_ID=$(docker ps -q --filter ancestor=simple-http-client:latest)
if [ ! -z "$CONTAINER_ID" ]; then
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
fi