FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

ENV PORT=3001

ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]
