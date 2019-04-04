FROM node:alpine
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY . .
RUN ./dynamicip.sh
EXPOSE 5000
CMD node app