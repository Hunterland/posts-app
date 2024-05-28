import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../../services/post.service';
import { CommentService, Comment } from '../../services/comment.service';
import { PostEditComponent } from '../post-edit/post-edit.component';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostEditComponent, CommentEditComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = []; // Array para armazenar os posts
  selectedPost?: Post; // Post selecionado para edi��o
  selectedComment?: Comment; // Coment�rio selecionado para edi��o

  constructor(
    private postService: PostService,
    private commentService: CommentService  ) {}

  ngOnInit(): void {
    // Inicializa o componente carregando os posts
    this.postService.getPosts().subscribe((data: Post[]) => {
      // Inicializa os coment�rios como um array vazio para cada post
      this.posts = data.map(post => ({
        ...post,
        comments: []
      }));
      // Carrega os coment�rios para cada post
      this.loadCommentsForPosts();
    });
  }

  loadCommentsForPosts(): void {
    // Obt�m os coment�rios e associa aos posts correspondentes
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.posts.forEach(post => {
        post.comments = comments.filter(comment => comment.postId === post.id);
      });
    });
  }

  addPost(): void {
    // Inicializa um novo post vazio para edi��o
    this.selectedPost = { id: 0, title: '', body: '', comments: [] };
  }

  editPost(post: Post): void {
    // Seleciona um post para edi��o
    this.selectedPost = { ...post };
  }

  deletePost(post: Post): void {
    // Deleta um post e atualiza a lista local
    this.postService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== post.id);
    });
  }

  addComment(postId: number): void {
    // Inicializa um novo coment�rio vazio para o post espec�fico
    this.selectedComment = { id: 0, postId, name: '', email: '', body: '' };
  }

  editComment(comment: Comment): void {
    // Seleciona um coment�rio para edi��o
    this.selectedComment = { ...comment };
  }

  deleteComment(comment: Comment): void {
    // Deleta um coment�rio e atualiza a lista local
    this.commentService.deleteComment(comment.id).subscribe(() => {
      const post = this.posts.find(p => p.id === comment.postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== comment.id);
      }
    });
  }

  onPostUpdated(updatedPost: Post): void {
    // Atualiza ou adiciona o post na lista local
    const index = this.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    } else {
      this.posts.push(updatedPost);
    }
    // Limpa a sele��o do post
    this.selectedPost = undefined;
  }

  onCommentUpdated(updatedComment: Comment): void {
    // Atualiza ou adiciona o coment�rio no post correspondente
    const post = this.posts.find(p => p.id === updatedComment.postId);
    if (post) {
      const index = post.comments.findIndex(c => c.id === updatedComment.id);
      if (index !== -1) {
        post.comments[index] = updatedComment;
      } else {
        post.comments.push(updatedComment);
      }
    }
    // Limpa a sele��o do coment�rio
    this.selectedComment = undefined;
  }
}
