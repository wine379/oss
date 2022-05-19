FROM node

RUN npm install -g npm@8.10.0

WORKDIR /usr/src/app

COPY package*.json ./

ENV MONGODB_URI=mongodb://143.198.74.132:27017/sanitation_app_db

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
