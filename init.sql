CREATE TABLE clientes(
  id SERIAL PRIMARY KEY,
  nome varchar(100) NOT NULL,
  limite INT NOT NULL,
  saldo INT NOT NULL DEFAULT 0
);

CREATE TABLE transacoes(
  id  SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL,
  valor INT NOT NULL,
  s_tipo_transacoes  CHAR(1) NOT NULL,
  s_descricao_transacoes   VARCHAR(100) NOT NULL,
  i_realizada_transacoes  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_clientes_id_transacoes
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

INSERT INTO clientes (nome, limite)
VALUES
  ('o barato sai caro', 1000 * 100),
  ('zan corp ltda', 800 * 100),
  ('les cruders', 10000 * 100),
  ('padaria joia de cocaia', 100000 * 100),
  ('kid mais', 5000 * 100);


/*NÃO ESQUECER DE GARANTIR QUE CLIENTE 6 NÃO SEJA CRIADO*/