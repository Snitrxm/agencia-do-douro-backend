FROM node:24-slim

WORKDIR /agenciadouro

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3008
CMD ["npm", "run", "start:prod"]