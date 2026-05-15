FROM node:18-alpine

WORKDIR /usr/src/app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production || true

# copy source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]