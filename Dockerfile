# Use Dockerfile builder so Railway does not need Railpack (GitHub download).
FROM node:22-alpine AS build
WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
ENV PORT=80
EXPOSE 80
