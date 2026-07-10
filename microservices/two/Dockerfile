FROM node:24 AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:24-alpine
COPY --from=build /app /app
ENV PORT=3002
WORKDIR /app
ENTRYPOINT [ "npm", "run", "start:prod" ]
