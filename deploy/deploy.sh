#!/usr/bin/env bash
set -euo pipefail

IMAGE=labkawa-web
CONTAINER=labkawa
PUBLISH=127.0.0.1:8080:80

cd "$(dirname "$0")/.."

git pull --ff-only
docker build -f deploy/Dockerfile -t "$IMAGE" .
docker rm -f "$CONTAINER" 2>/dev/null || true
docker run -d --restart unless-stopped --name "$CONTAINER" -p "$PUBLISH" "$IMAGE"
docker image prune -f >/dev/null 2>&1 || true
docker ps --filter "name=$CONTAINER"
