# Multi-stage build for Vite client + Node server
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Install all deps for build, but skip lifecycle scripts (prepare runs `npm run test`)
RUN npm ci --ignore-scripts

FROM deps AS builder
WORKDIR /app
COPY . .
# Build the client
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy only what we need for production runtime
COPY --from=builder /app/package*.json ./
# Install only production deps, again skipping lifecycle scripts
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app/server ./server
COPY --from=builder /app/dist ./dist
# Keep public/knowledge so the server can read local docs in production
COPY --from=builder /app/public ./public

EXPOSE 8080
CMD ["node", "server/server.js"]
