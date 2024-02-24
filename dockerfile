FROM node:20-alpine3.18

WORKDIR /src

COPY package.json ./

RUN npm install 

COPY . .

CMD ["npm", "run", "prod"]


