# Minidex

O Minidex é um projeto de site web completo. O back-end foi desenvolvido com Express (Framework para Node). O front-end foi feito com ReactJS(Biblioteca JS). O sistema foi construido baseado na arquitera RESTful, o mesmo propõe oferecer ao usuário uma experiência do jogo eletrônico Pokémon, de maneira mais simples. No site deve ser possível capturar um novo pokémon, edita-los, excluir-los além de ser possível buscar um pokémon pelo seu nickname e listar todos os seus pokémons capturados.

## Stack utilizadas

**Front-end:** [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://legacy.reactjs.org/) [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Back-end:** [![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en) [![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/pt-br/) [![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/NathanHermes/Minidex.git
```

Entre no diretório do projeto

```bash
  cd Minidex
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SERVER_PORT`

`MYSQL_HOST`

`MYSQL_USER`

`MYSQL_PASSWORD`

`MYSQL_DB`

`MYSQL_PORT`

## Documentação da API

#### Retorna todos os pokémons

```http
  GET /pokemon
```

#### Retorna um pokémon

```http
  GET /pokemon/:nickname
```

| Parâmetro  | Tipo     | Descrição                                             |
| :--------- | :------- | :---------------------------------------------------- |
| `nickname` | `string` | **Obrigatório**. O nickname do pokémon que você busca |

#### Salva um pokémon

O corpo da requisição deve ser enviado como um JSON.

```http
  POST /pokemon
```

| Atributos     | Tipo     | Descrição                                       |
| :------------ | :------- | :---------------------------------------------- |
| `nickname`    | `string` | **Obrigatório**. O nickname do pokémon          |
| `name`        | `string` | **Obrigatório**. O nome do pokémon              |
| `height`      | `string` | **Obrigatório**. A altura do pokémon            |
| `weight`      | `string` | **Obrigatório**. O peso do pokémon              |
| `urlImage`    | `string` | **Obrigatório**. A url de uma imagem do pokémon |
| `description` | `string` | **Obrigatório**. A descrição do pokémon         |

#### Altera um pokémon

O corpo da requisição deve ser enviado como um JSON.

```http
  PUT /pokemon/:id
```

| Parâmetro | Tipo     | Descrição                                                |
| :-------- | :------- | :------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O id do pokémon que você deseja alterar |

| Atributos  | Tipo     | Descrição                              |
| :--------- | :------- | :------------------------------------- |
| `nickname` | `string` | **Obrigatório**. O nickname do pokémon |
| `height`   | `string` | **Obrigatório**. A altura do pokémon   |
| `weight`   | `string` | **Obrigatório**. O peso do pokémon     |

#### Apaga um pokémon

```http
  DELETE /pokemon/:id
```

| Parâmetro | Tipo     | Descrição                                                |
| :-------- | :------- | :------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O id do pokémon que você deseja deletar |

## Autores

- [@NathanHermes](https://www.github.com/NathanHermes)

## Referência

- [PokéDex API](https://pokedevs.gitbook.io/pokedex/resources/pokemon)
- [PokéAPI](https://pokeapi.co/)
