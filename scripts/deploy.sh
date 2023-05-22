#!/bin/bash
git fetch
git reset --hard HEAD
git checkout origin/main
docker compose down 
docker compose up -d --build
