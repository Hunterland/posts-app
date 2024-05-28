import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';

// Define as rotas da aplica��o
export const routes: Routes = [
  // Rota para a p�gina inicial, que renderiza o componente PostListComponent
  { path: '', component: PostListComponent },
  // Rota para a lista de coment�rios de um post espec�fico, que renderiza o componente CommentListComponent
  { path: 'posts/:postId/comments', component: CommentListComponent },
  // Rota para a edi��o de um coment�rio espec�fico de um post, que renderiza o componente CommentEditComponent
  { path: 'posts/:postId/comments/edit/:commentId', component: CommentEditComponent },
  // Rota padr�o para redirecionar para a p�gina inicial caso a URL n�o corresponda a nenhuma rota definida
  { path: '**', redirectTo: '' }
];
