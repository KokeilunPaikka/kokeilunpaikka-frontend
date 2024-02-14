# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copying source files
COPY . .

# Building app
RUN yarn build

# Running the app
ENV NODE_ENV=production
CMD [ "yarn", "start" ]
