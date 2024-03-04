# rinha-de-backend-2024-q1-nodejs

## Implementação de API em JS-node utilizando Express para a rinha de backend 2024

<div>
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="logo express" width="200" height="auto">
<img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="logo postgres" width="200" height="auto">
</div>
<img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Nginx_logo.svg" alt="logo nginx" width="300" height="auto">

## tecnologias utilizadas:

- `Express`
- `Postgres`
- `Nginx`

## Autor

- Ramon Melo — Linkedin: [/in/ramonmelod](https://www.linkedin.com/in/ramonmelod/)

- [repositório da api](https://github.com/Ramonmelod/rinha-de-backend-2024-q1-nodejs)

## rinha de backend-2024

- [repositório da rinha de backend-2024](https://github.com/zanfranceschi/rinha-de-backend-2024-q1)

## Endpoints

### transações

`POST /clientes/[id]/transacoes`

```json
{
  "valor": 1000,
  "tipo": "c",
  "descricao": "descricao"
}
```

## Extrato

**Requisição**

`GET /clientes/[id]/extrato`

Onde

- `[id]` (na URL) deve ser um número inteiro representando a identificação do cliente.

## Instruções inicialização:

- Com o terminal na pasta do repositório inicie os conteiners com o comando: docker compose -f infra/compose.yaml up -d
- Caso queira consultar os endpoints você pode usar seu navegador, o curl, wget ou HTTPie para consultar os endpoints:/, /clientes/[id]/extrato e /clientes/[id]/transacoes, onde id é um número de 1 a 5 que representa os clientes já inseridos na tabelas de clientes. Abaixo segue exemplos de consultas a estes endpoint utilizando o navegador de linha de comando HTTPie, que você pode instalar (caso esteja no ubuntu) utilizando sudo apt install httpie:
- http http://localhost:8080/clientes/1/extrato
- http POST http://localhost:8080/clientes/1/transacoes Content-Type:application/json <<< '{"valor": 500,"tipo" : "c","descricao": "Pix do nubank"}'

- Para destruir os containers feitos a partir do compose.yaml utilizar o comando: docker compose -f infra/compose.yaml down
- para listar as imagens baixadas e construidas no seu computador rodar sudo apt images e após obter os ids da images que deseja apagar rodar o comando sudo rmi <idImagem1> <idImagem2> <idImagem3> <idImage4>

- Caso queira acessar o banco de dados postgres via psql, rodar comando: psql --host=localhost --username=postgres --port=5432

## Portas do containers

- Os containers estão no modo host, escutando cada um em uma porta diferente, abaixo seguem suas portas e funcionalidades:
- Nginx => porta: 9999. É utilizado como proxy reverso e balanceador de carga, sendo que no funcionamento normal da aplicação, todas as requisições devem sem encaminhadas para ele, de forma que este escolha se a requisição deve ir para o app01 ou app02
- app01 => porta: 8080. Esta é uma das instancias da aplicação.
- app02 => porta: 8081. Esta é uma das instancias da aplicação.
- postgres => porta: 5432. Este é o banco de dados da aplicação
