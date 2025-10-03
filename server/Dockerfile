FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN node syncOpenSearch.js
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
