# Використовуємо офіційний образ Node.js
FROM node:16

WORKDIR /app

COPY package.json package-lock.json /

RUN npm ci

COPY ./ /app

RUN npm install

RUN npm run build

RUN npm install -g serve


EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
