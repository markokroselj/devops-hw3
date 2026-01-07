FROM node:25-alpine3.22 

WORKDIR /api

COPY package.json package-lock.json ./ 
RUN npm ci --only=production

COPY . .

CMD [ "node", "server.js" ]