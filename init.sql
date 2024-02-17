CREATE TABLE clientes(
  i_id_clientes SERIAL PRIMARY KEY,
  s_nome_clientes varchar(100) NOT NULL,
  s_limite_clientes INT NOT NULL,
  s_saldo_clientes INT NOT NULL
);

CREATE TABLE transacoes(
  i_id_transacoes  SERIAL PRIMARY KEY,
  i_valor_transacoes  INT NOT NULL,
  s_tipo_transacoes  CHAR(1) NOT NULL,
  s_descricao_transacoes   VARCHAR(100) NOT NULL,
  s_realizada_transacoes  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

/*NÃO ESQUECER DE GARANTIR QUE CLIENTE 6 NÃO SEJA CRIADO*/