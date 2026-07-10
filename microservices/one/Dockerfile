FROM node:24 AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:24
COPY --from=build /app /app
ENV PORT=3001
ENV JWT_SECRET_KEY=SECRET
WORKDIR /app
ENTRYPOINT [ "npm", "run", "start:prod" ]
