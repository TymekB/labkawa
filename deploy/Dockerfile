# Build the Angular app and serve it with nginx as a static site.
# Multi-stage: build in node, ship only the static bundle in a tiny nginx image.

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# base-href "/" because the app serves from the domain root (labkawa.pl), not a subpath
RUN npm run build -- --base-href=/

FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/labkawa/browser /usr/share/nginx/html
EXPOSE 80
