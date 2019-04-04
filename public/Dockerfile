FROM node:alpine
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY . .
EXPOSE 5000
CMD node app