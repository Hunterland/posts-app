import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'posts/:postId/comments', component: CommentListComponent },
  { path: 'posts/:postId/comments/edit/:commentId', component: CommentEditComponent },
  { path: '**', redirectTo: '' }
];
