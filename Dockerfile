FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./tsconfig.json ./
COPY ./ .
WORKDIR /app
RUN npm run build

FROM node:20-bullseye-slim AS runner
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app
COPY ./package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist

EXPOSE ${APP_PORT}
CMD ["node", "dist/index.js"]