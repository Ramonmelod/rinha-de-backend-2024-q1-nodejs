FROM node:20-alpine3.18

WORKDIR /src

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "run", "prod"]


