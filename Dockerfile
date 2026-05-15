FROM node:18-alpine

WORKDIR /usr/src/app

# install dependencies (prefer lockfile for reproducible installs)
COPY package*.json ./
RUN npm ci --only=production || npm install --production

# copy app sources
COPY . .

# ensure data directory exists and is writable
RUN mkdir -p /usr/src/app/data && chown -R node:node /usr/src/app

# run as non-root user
USER node

EXPOSE 3000

CMD ["npm", "start"]