![Posts App Demo](/public/Newhome.gif)


# Posts App

Este é o repositório para o projeto "Posts App", uma aplicação web simples para criar, visualizar, atualizar e excluir postagens. Este projeto foi desenvolvido como parte de um tutorial para iniciantes em desenvolvimento web.

## Funcionalidades

- **Design Moderno**: Utiliza um design limpo e moderno para uma experiência agradável do usuário.
- **Layout Responsivo**: Garante que a aplicação seja acessível em dispositivos de todos os tamanhos.
- **CRUD de Postagens**: Implementa operações CRUD (Create, Read, Update, Delete) para as postagens. Os usuários podem criar, visualizar, atualizar e excluir suas postagens.
- **Interatividade**: Os usuários podem curtir e comentar em postagens, adicionando uma dimensão social à aplicação.
- **Segurança**: Utiliza autenticação de usuário com JWT para proteger as operações sensíveis.

## Stacks

Este projeto foi construído com as seguintes tecnologias:

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Angular-FF0000?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

## Estrutura do Projeto

- `frontend`: Contém o código-fonte do cliente Angular, incluindo HTML, Tailwind CSS e TypeScript.
- `backend`: Contém o código-fonte do servidor Node.js com Express.js.
- `node_modules`: Dependências instaladas via NPM (não incluídas no repositório).
- `package.json` & `package-lock.json`: Configuração do NPM e arquivo de bloqueio de dependência.

## Iniciando

Para obter uma cópia local em funcionamento, siga estes passos simples.

### Pré-requisitos

- Node.js instalado em sua máquina.

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Hunterland/posts-app.git
   ```
2. Instale as dependências:
   ```sh
   cd posts-app
   npm install
   ```
3. Inicie a aplicação:
   ```sh
   ng serve
   ```

A aplicação utiliza gerenciamento em memória para armazenar os dados dos posts e comentários, não sendo necessário configurar um banco de dados externo. Certifique-se de que a aplicação tenha acesso à internet para consumir a API JSONPlaceholder da [Typicode](https://jsonplaceholder.typicode.com/).
