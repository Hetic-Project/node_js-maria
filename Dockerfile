FROM node:22-alpine

WORKDIR /backend

COPY ./backend/package.json ./

RUN npm install

COPY backend/ . 

EXPOSE 8080

CMD ["npm", "run", "start"]
