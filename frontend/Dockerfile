FROM node:20.14.0 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV BACKEND_URL=http://backend:3000/api

EXPOSE 3000

CMD ["npm", "run", "start"]
