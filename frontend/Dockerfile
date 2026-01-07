FROM node:lts-alpine3.23 AS build

WORKDIR /frontend

COPY package.json package-lock.json ./ 
RUN  --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build 

FROM joseluisq/static-web-server:2 AS server
COPY --from=build /frontend/dist /public
EXPOSE 80