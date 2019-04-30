FROM node:alpine
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY . .
RUN ./dynamicip.sh
EXPOSE 5000
CMD NODE_ENV=production node app