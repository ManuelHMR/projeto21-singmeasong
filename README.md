# <p align = "center"> Projeto sing me a song </p>

<p align="center">
   <img src="https://imgs.search.brave.com/0Ac-MTeWPhGX9BNm8OSwWAZVM_fUwUpUJAuXUOqvx_Y/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5D/MjNTTzExTW9nbG8w/RmNFLXU3eHBRSGFI/YSZwaWQ9QXBp"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-ManuelHMR-4dae71?style=flat-square" />
</p>


##  :clipboard: Descrição

Projeto que visa treinar testes automatizados em aplicação fullstack elaborada por terceiros. Os testes unitários e de integração foram elaborados com Jest e os teste E2E foram elaborados com Cypress. Ademais, foram treinadas boas práticas, uso de variáveis de ambiente e geração de banco de dados para testes.

***

## :computer:	 Tecnologias e Conceitos

- TypeScript
- Jest
- Cypress

***

## :rocket: Rotas

```yml
POST /cadastro
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "nome": "Lorem ipsum",
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
}
```
    

***

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/ManuelHMR/projeto21-singmeasong.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm start
```

:stop_sign: Não esqueça de repetir os passos acima com o [repositório](https://github.com/luanalessa/projeto-frontend.git) que contem a interface da aplicação, para testar o projeto por completo.
