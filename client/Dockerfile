#  Dockerfile for Node Express Backend api (development)

FROM node:12.2.0-alpine

# ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Copy app source code
COPY . .

# Exports
EXPOSE 8088

CMD [ "yarn", "start"]