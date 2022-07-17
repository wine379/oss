FROM node

RUN npm install -g npm@8.10.0

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
