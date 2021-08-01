#!/usr/bin/env bash
echo "-> starting prisma migrations to postgres...\n"
# ./wait-for-postgres.sh localhost:5432 -- echo "db online\n"
npx prisma generate
yarn db:docker
sleep 5
yarn dev
