import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';

// Define as rotas da aplicação
export const routes: Routes = [
  // Rota para a página inicial, que renderiza o componente PostListComponent
  { path: '', component: PostListComponent },
  // Rota para a lista de comentários de um post específico, que renderiza o componente CommentListComponent
  { path: 'posts/:postId/comments', component: CommentListComponent },
  // Rota para a edição de um comentário específico de um post, que renderiza o componente CommentEditComponent
  { path: 'posts/:postId/comments/edit/:commentId', component: CommentEditComponent },
  // Rota padrão para redirecionar para a página inicial caso a URL não corresponda a nenhuma rota definida
  { path: '**', redirectTo: '' }
];
