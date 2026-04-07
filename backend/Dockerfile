# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/

# ---- Production Stage ----
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/index.js"]
