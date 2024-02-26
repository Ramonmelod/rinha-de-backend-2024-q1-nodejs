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

## instruções para a fase de desenvolvimento

inicialização do container: docker compose -f infra/compose.yaml up -d

- build do container: docker build -t api:latest .
- acesso à api via HTTPie fora do containner: http http://localhost:8080/clientes/1/extrato

- docker exec -it <idcontainner> <bash/sh>
- para editar arquivos dentro do container é possível utilzar o vi
- docker run -d --name api nome_da_imagem
- docker inspect <nome_do_contêiner> (para encontrar o ip do container)
- acesso à api via HTTPie dentro do containner: http http://IPAdressContainer:8080/clientes/[id]/extrato (o id deve ser um valor de 1 a 5)

## instruções de teste:

- rodar conteiner com comando: docker compose -f infra/compose.yaml up -d
- acesso à api via HTTPie dentro do containner no modo host: http http://localhost:8080 (este endpoint não acessa o banco de dados)
- destruir o container feito a partir do compose.yaml: docker compose -f infra/compose.yaml down
- rodar api com comando: node index.js (apenas para testar api fora do container)
- acesso ao container postgres via psql; psql --host=localhost --username=postgres --port=5432
- numero de conexões abertas contra o postgres: SELECT count(\*)::int FROM pg_stat_activity where datname = 'postgres';

- para fazer uma requisição de post no endpoint /clientes/1/transacoes usando HTTPie: http POST http://localhost:8080/clientes/1/transacoes Content-Type:application/json <<< '{"valor": 500,"tipo" : "c","descricao": "Pix do nubank"}'
- consultas a partir do nginx usar a porta 9999
