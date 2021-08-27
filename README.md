## Crypto Tracker

Aplicação desenvolvida para monitoria de informações de criptomoedas, integrada com a API Coinranking.

## 🛠️ Tecnologias utilizadas

- Next.js
- Typescript
- Chakra UI

## ▶️ Para rodar a aplicação localmente
É necessário gerar um token na página da Coinranking (https://developers.coinranking.com/api) a fim de se autenticar em cada requisição.
Com o token em mãos, crie um arquivo na raíz do projeto chamado ```.env.local``` e insira a variável de ambiente ```REACT_APP_API_KEY``` passando o token como valor 
da variável. Exemplo:

- ```REACT_APP_API_KEY=seu_token123456```

Depois, rode:

```bash
npm run dev
# ou
yarn dev
```


