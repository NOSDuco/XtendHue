# Node 8 as base
FROM node:8

# Copy over app dependencies
ADD yarn.lock /yarn.lock
ADD package.json /package.json

# Assign env variables for node (node files exist out of /app for speed)
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

# Install dependencies
RUN yarn

# Set app dir
WORKDIR /app
# Copy over app files
ADD . /app

# Expose port
EXPOSE 3000

# Start script as entry point
ENTRYPOINT ["/bin/bash", "/app/start.sh"]
CMD [ "start" ]
