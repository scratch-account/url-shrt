FROM node:14.17.3
WORKDIR /code
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock
RUN yarn
COPY . /code
EXPOSE 3000
