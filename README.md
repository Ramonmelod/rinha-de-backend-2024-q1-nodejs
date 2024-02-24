# rinha-de-backend-2024-q1-nodejs

## Implementação de API em express para a rinha de backend 2024

- tecnologias utilizadas: `Express`, `Postgres`, `Nginx`

  inicialização do container: docker compose -f infra/compose.yaml up -d

- build do container: docker build -t api:latest .
- acesso à api via HTTPie fora do containner: http http://localhost:8080/clientes/1/extrato

- docker exec -it <idcontainner> <bash/sh>
- para editar arquivos dentro do container é possível utilzar o vi
- docker run -d --name api nome_da_imagem
- docker inspect <nome_do_contêiner> (para encontrar o ip do container)
- acesso à api via HTTPie dentro do containner: http http://IPAdressContainer:8080/clientes/1/extrato

## instruções de teste:

- rodar conteiner com comando: docker compose -f infra/compose.yaml up -d
- acesso à api via HTTPie dentro do containner no modo host: http http://localhost:8080 (este endpoint não acessa o banco de dados)
- destruir o container feito a partir do compose.yaml: docker compose -f infra/compose.yaml down
- rodar api com comando: node index.js (apenas para testar api fora do container)
- acesso ao container postgres via psql; psql --host=localhost --username=postgres --port=5432
- numero de conexões abertas contra o postgres: SELECT count(\*)::int FROM pg_stat_activity where datname = 'postgres';
