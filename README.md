# Backend Fight 2024 Q1 - Node.js

## Implementação de API em JS-node utilizando Express para a rinha de backend 2024

<div style="display: flex; align-items: center;">
  <img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="logo express" width="100" height="auto">
  <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="logo postgres" width="100" height="auto">
 <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Nginx_logo.svg" alt="logo nginx" width="150" height="auto">
</div>

## Used Technologies:

- `Express`
- `Postgres`
- `Nginx`

## Author

- Ramon Melo — Linkedin: [/in/ramonmelod](https://www.linkedin.com/in/ramonmelod/)

- [API Repository](https://github.com/Ramonmelod/rinha-de-backend-2024-q1-nodejs)

## Backend Fight 2024

- [Backend Fight 2024 Repository(https://github.com/zanfranceschi/rinha-de-backend-2024-q1)

## Endpoints

### Transactions

`POST /clientes/[id]/transacoes`

```json
{
  "valor": 1000,
  "tipo": "c",
  "descricao": "descricao"
}
```

## bank statement

**Request**

`GET /clientes/[id]/extrato`

Where

- `[id]` (in the URL) should be an integer representing the client's ID.

## Startup Instructions:

- With the terminal in the repository folder, start the containers with the command:
 
```sh
 docker compose -f infra/compose.yaml up -d
```
  
- If you want to check the endpoints, you can use your browser, curl, wget, or HTTPie to query the endpoints:`/`, `/clientes/[id]/extrato` and `/clientes/[id]/transacoes`,  where id is a number from 1 to 5 representing the clients already inserted in the clients table. Below are examples of requests to these endpoints using the HTTPie command-line browser, which you can install (if you're on Ubuntu) using sudo `apt install httpie`:
  
```sh
  http http://localhost:8080/clientes/1/extrato
```
```sh
  http POST http://localhost:8080/clientes/1/transacoes Content-Type:application/json <<< '{"valor": 500,"tipo" : "c","descricao": "Pix do nubank"}'
```
-To destroy the containers created from the compose.yaml file, use the command:

```sh
  docker compose -f infra/compose.yaml down
```

- To list the images downloaded and built on your computer, run sudo apt images, and after obtaining the image IDs you want to delete, run the command:
  
```sh
  sudo rmi <idImagem1> <idImagem2> <idImagem3> <idImage4>
```

- If you want to access the Postgres database via psql, run the command:
  
 ```sh  
   psql --host=localhost --username=postgres --port=5432
 ```

## Container Ports:

- The containers are in host mode, each listening on a different port. Below are their ports and functionalities:
- Nginx => port: 9999. Used as a reverse proxy and load balancer. In normal application operation, all requests should be forwarded to it so that it can choose whether the request should go to app01 or app02.
- app01 => port: 8080. This is one of the application instances.
- app02 => port: 8081. This is one of the application instances.
- Postgres => port: 5432. This is the application's database.
