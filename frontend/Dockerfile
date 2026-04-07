# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production Stage (Nginx to serve static files) ----
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config: forward /api/* to backend, serve React for everything else
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
