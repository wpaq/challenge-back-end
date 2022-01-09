FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY .env .
COPY . . .

EXPOSE 3333

CMD npm run start