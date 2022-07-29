FROM node:16-alpine


WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

ENV MONGODB_URI=mongodb://localhost:27017/sanitation_app_db
ENV JWT_SECRET=V3VnoPGOg8R+Sghse4MiwL2Wf9V3ItkYifyWbNJHIAT+uEb1XKaU0adWEBu9WRuVBkjgncPO8cpjsXXcANWrNaykpfXvYddrvGhUQU4KNoPy9inJfvm5Lf86as6pNJiCSifQld5O5QEc1Vx5kXJWt2WlvhV5MzVXcwRk9TYevqZ11iNSODV8F5CRGdPUe3b4DClZr4fyqaP2BePYnXACmsMXQ9YtYMKQ+YCn22XhBmIBOIWv4q4QRaRlU3JkRDyoCfs34VUPrE0ehMR++8Bxf2DOYURZMDQULxQGOa7Bj+JWVVqtsCOSjE4UGDAJ/iGQD4ls29+hTTGGnhs3teq1fw==

COPY next.config.js ./next.config.js

COPY components ./components
COPY models ./models
COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY utils ./utils

CMD ["yarn", "dev"]