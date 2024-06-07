# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Serve the app with a static server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]

# Use the official Nginx image to serve the build files
# FROM nginx:alpine
# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
