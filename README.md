### Tecnologias utilizadas:
- Typescript, Nest.js, Mongoose ORM e MongoDB, Rest, Websockets/Socket.io
  
### Casos de uso

1. Criar ordens de compra e venda
2. Consultar ordens de compra e venda
3. Consultar ativos (preço e outras informações)
4. Consultar ativos da carteira
5. Realizar negociação entre as ordens (via websockets)
6. Implícitos:
   - Criar ativo
   - Criar carteira

> Diagrama de entidade-relacionamento
> ![image](https://github.com/user-attachments/assets/f8558c99-4e91-4f5b-9ca2-41da6d9ea79e)

> Arquitetura geral do sistema
> ![image](https://github.com/user-attachments/assets/5da5b321-cea4-4167-ab50-bce3a5f9f514)

> Websockets e change stram
> ![image](https://github.com/user-attachments/assets/db55dfae-1ce6-4016-bcb6-25735528c4a5)


### Rotas
- `/assets`: Consulta e criação dos ativos
- `/wallets`: Consulta e criação de carteiras
- `/orders`: Consulta e criação de ordens de compra e venda
