FROM node:16-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# installing yarn
# RUN npm install -g yarn

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn

# Copying source files
COPY . /usr/src/app

# Building app
EXPOSE 3000

