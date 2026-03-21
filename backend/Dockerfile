# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder

WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# -------- Stage 2: Production --------
FROM node:18-alpine

WORKDIR /app

# copy package.json
COPY package*.json ./

# install production dependencies only
RUN npm install --production

# copy built files from builder
COPY --from=builder /app/server.js ./

# expose backend port
EXPOSE 8080

# start server
CMD ["npm","start"]