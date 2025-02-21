# Stage 1: Build React App with Vite
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# Copy all the source files
COPY . .

# Build the app
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the Nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from the first stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

