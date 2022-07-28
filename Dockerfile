FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

ENV MONGO_URL "mongodb://mongo:27017/sanitation_app_db"
ENV JWT_SECRET=V3VnoPGOg8R+Sghse4MiwL2Wf9V3ItkYifyWbNJHIAT+uEb1XKaU0adWEBu9WRuVBkjgncPO8cpjsXXcANWrNaykpfXvYddrvGhUQU4KNoPy9inJfvm5Lf86as6pNJiCSifQld5O5QEc1Vx5kXJWt2WlvhV5MzVXcwRk9TYevqZ11iNSODV8F5CRGdPUe3b4DClZr4fyqaP2BePYnXACmsMXQ9YtYMKQ+YCn22XhBmIBOIWv4q4QRaRlU3JkRDyoCfs34VUPrE0ehMR++8Bxf2DOYURZMDQULxQGOa7Bj+JWVVqtsCOSjE4UGDAJ/iGQD4ls29+hTTGGnhs3teq1fw==

RUN yarn install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

