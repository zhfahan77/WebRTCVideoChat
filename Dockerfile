FROM node:alpine
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY . .
EXPOSE 8080
CMD node server.js