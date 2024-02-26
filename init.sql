CREATE TABLE clientes(
  i_id_clientes SERIAL PRIMARY KEY,
  s_nome_clientes varchar(100) NOT NULL,
  s_limite_clientes INT NOT NULL,
  s_saldo_clientes INT NOT NULL DEFAULT 0
);

CREATE TABLE transacoes(
  i_id_transacoes  SERIAL PRIMARY KEY,
  i_valor_transacoes  INT NOT NULL,
  s_tipo_transacoes  CHAR(1) NOT NULL,
  s_descricao_transacoes   VARCHAR(100) NOT NULL,
  i_realizada_transacoes  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clientes (s_nome_clientes, s_limite_clientes)
VALUES
  ('o barato sai caro', 1000 * 100),
  ('zan corp ltda', 800 * 100),
  ('les cruders', 10000 * 100),
  ('padaria joia de cocaia', 100000 * 100),
  ('kid mais', 5000 * 100);


/*NÃO ESQUECER DE GARANTIR QUE CLIENTE 6 NÃO SEJA CRIADO*/