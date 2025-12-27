#!/usr/bin/env bash

docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  node:20 \
  bash -c "
    corepack enable &&
    corepack prepare yarn@4.5.3 --activate &&
    yarn install &&
    yarn dev
  "
