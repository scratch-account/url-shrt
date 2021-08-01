### Running with Docker

To run the docker compose environment, run:

```bash
docker-compose up --build
# View app at http://localhost:3000
```

### Development

There doesn't appear to be a good way for docker to watch files for changes, (see https://github.com/docker/compose/issues/184 for more on this), so the best way to do local development is likely to just run things locally. Here are those steps:

```bash
# Change dev to whatever database name you like (it should match what's in env.development)
psql -c "CREATE DATABASE dev"
# Tell prisma to initialize and migrate db to latest schema
npx prisma generate
yarn db:dev
# Start up app
yarn dev
# View app at http://localhost:3000
```
