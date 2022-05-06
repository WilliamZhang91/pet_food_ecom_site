FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

#ENV PORT=4000

CMD ["node", "server.js"]

#docker run --net=host -p 8080:8080 -t -i pet_food_server1

