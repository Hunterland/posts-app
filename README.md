# Posts App

Este é o repositório para o projeto "Posts App", uma aplicação web simples para criar, visualizar, atualizar e excluir postagens. Este projeto foi desenvolvido como parte de um teste com o framework Angular.

![Posts App Demo](/public/Newhome.gif)

## Funcionalidades

- **Design Simples**: A aplicação utiliza um design simples para proporcionar uma experiência de usuário intuitiva.
- **Layout Responsivo**: O layout da aplicação é responsivo, garantindo que os usuários tenham uma experiência consistente em dispositivos de todos os tamanhos, desde smartphones até desktops.
- **CRUD de Postagens**: Implementa as operações CRUD (Create, Read, Update, Delete) para as postagens. Isso significa que os usuários podem criar novas postagens, visualizar todas as postagens existentes, atualizar o conteúdo das postagens e excluí-las se necessário.
- **Interatividade**: Além de visualizar e criar postagens, os usuários também podem interagir com as postagens existentes, deixando comentários associados a cada postagem.
- **Consumo de API Pública**: Consome a API pública 'https://jsonplaceholder.typicode.com/posts' em Angular.
- **Operações CRUD para Posts e Comentários**: Implementa corretamente as operações CRUD (Create, Read, Update, Delete) para posts e comentários.
- **Uso do Método Subscribe**: Utiliza adequadamente o método `subscribe` para observar e manipular as respostas das requisições HTTP.
- **Organização e Clareza do Código**: O código é organizado e claro, seguindo boas práticas de programação.
- **Gerenciamento "In Memory" e Relacionamentos**: Implementa corretamente o gerenciamento "in memory" e os relacionamentos entre entidades.

## Stacks

Este projeto foi construído com as seguintes tecnologias:

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

## Estrutura do Projeto

- `frontend`: Contém o código-fonte do cliente Angular, incluindo HTML, Tailwind CSS e TypeScript.
- `node_modules`: Dependências instaladas via NPM (não incluídas no repositório).
- `package.json` & `package-lock.json`: Configuração do NPM e arquivo de bloqueio de dependência.


## Iniciando

Para obter uma cópia local em funcionamento, siga estes passos simples.

### Pré-requisitos

- Node.js instalado em sua máquina.
- Angular CLI versão 18 instalada.

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Hunterland/posts-app.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd posts-app
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie a aplicação:
   ```sh
   ng serve

A aplicação utiliza gerenciamento em memória para armazenar os dados dos posts e comentários, não sendo necessário configurar um banco de dados externo. Certifique-se de que a aplicação tenha acesso à internet para consumir a API JSONPlaceholder da [Typicode](https://jsonplaceholder.typicode.com/).


## Uso

Acesse `http://localhost:4200` no seu navegador para ver a aplicação em execução. A página inicial exibirá uma tabela com a lista de postagens obtidas da API.

Desenvolvido por [Hunterland](https://linkedin.com/in/alan-barroncas) 🚀
