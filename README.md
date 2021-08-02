# Introduction

This is a Next.js app that shortens URLs (like bit.ly!).

It uses [API routes provided out-of-the-box by Next.js](https://nextjs.org/docs/api-routes/introduction) which interact with the Postgres database using [Prisma](https://www.prisma.io/).

## Quick Start

There doesn't appear to be a good way for docker to watch files for changes, (see https://github.com/docker/compose/issues/184 for more on this), so the best way to do local development is likely to just run things locally. Here's how to do that:

### Requirements

Make sure you have Postgres running locally (v11 or greater should work fine!) and [node.js](https://nodejs.org/en/) (v12 or greater) and [yarn](https://yarnpkg.com/) installed.

### Running the dev environment

```bash
# Get the source code
git clone https://github.com/scratch-account/url-shrt
cd url-shrt
# Install dependencies
yarn
# Tell prisma to initialize and migrate db to latest schema
yarn db:dev
# Start up app
yarn dev
# View app at http://localhost:3000
```

## Running with Docker

I'm relatively new to Docker, but the following steps should work pretty well (I find the "Quick Start" steps a bit easier, especially if you're not too familiar with Docker). To run the docker compose environment:

### Requirements

Make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed and running locally.

```bash
docker-compose up --build
# View app at http://localhost:3000
```
