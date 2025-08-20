#!/bin/bash

NETWORK_NAME="simple-net"
docker run -it --rm --network $NETWORK_NAME alpine sh -c "apk add curl && curl http://simple-http-client:4445/healthcheck && exec sh"