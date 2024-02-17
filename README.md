# rinha-de-backend-2024-q1-nodejs

Implementação de API em express para a rinha de backend 2024

- tecnologias utilizadas: Express, Postgres
  inicialização do container: docker compose -f infra/compose.yaml up -d

- build do container: docker build -t api:latest .
- acesso à api via HTTPie fora do containner: http http://localhost:8080/clientes/1/extrato

- docker exec -it <idcontainner> <bash/sh>
- docker run -d --name api nome_da_imagem
- docker inspect <nome_do_contêiner> (para encontrar o ip do container)
