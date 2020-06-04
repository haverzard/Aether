FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY front-end/. ./
RUN npm i -g serve
RUN npm ci --silent
RUN npm run build --silent
CMD ["serve", "-s", "build"]

EXPOSE 5000