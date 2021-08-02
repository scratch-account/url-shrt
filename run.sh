#!/usr/bin/env bash
# This is the script run by docker-compose.yml
echo "-> starting prisma migrations to postgres...\n"
npx prisma generate
yarn db:docker
sleep 5
yarn dev
