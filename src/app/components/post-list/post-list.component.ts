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
  selectedPost?: Post; // Post selecionado para edição
  selectedComment?: Comment; // Comentário selecionado para edição

  constructor(
    private postService: PostService,
    private commentService: CommentService  ) {}

  ngOnInit(): void {
    // Inicializa o componente carregando os posts
    this.postService.getPosts().subscribe((data: Post[]) => {
      // Inicializa os comentários como um array vazio para cada post
      this.posts = data.map(post => ({
        ...post,
        comments: []
      }));
      // Carrega os comentários para cada post
      this.loadCommentsForPosts();
    });
  }

  loadCommentsForPosts(): void {
    // Obtém os comentários e associa aos posts correspondentes
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.posts.forEach(post => {
        post.comments = comments.filter(comment => comment.postId === post.id);
      });
    });
  }

  addPost(): void {
    // Inicializa um novo post vazio para edição
    this.selectedPost = { id: 0, title: '', body: '', comments: [] };
  }

  editPost(post: Post): void {
    // Seleciona um post para edição
    this.selectedPost = { ...post };
  }

  deletePost(post: Post): void {
    // Deleta um post e atualiza a lista local
    this.postService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== post.id);
    });
  }

  addComment(postId: number): void {
    // Inicializa um novo comentário vazio para o post específico
    this.selectedComment = { id: 0, postId, name: '', email: '', body: '' };
  }

  editComment(comment: Comment): void {
    // Seleciona um comentário para edição
    this.selectedComment = { ...comment };
  }

  deleteComment(comment: Comment): void {
    // Deleta um comentário e atualiza a lista local
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
    // Limpa a seleção do post
    this.selectedPost = undefined;
  }

  onCommentUpdated(updatedComment: Comment): void {
    // Verifica se o comentário atualizado e a propriedade postId estão definidos
    if (updatedComment && updatedComment.postId !== undefined) {
      // Encontra o post correspondente ao postId do comentário atualizado
      const post = this.posts.find(p => p.id === updatedComment.postId);
      // Verifica se o post foi encontrado
      if (post) {
        // Encontra o índice do comentário atualizado dentro dos comentários do post
        const index = post.comments.findIndex(c => c.id === updatedComment.id);
        // Verifica se o comentário já existe no post
        if (index !== -1) {
          // Se o comentário existir, atualiza-o com o comentário atualizado
          post.comments[index] = updatedComment;
        } else {
          // Se o comentário não existir, adiciona o comentário atualizado aos comentários do post
          post.comments.push(updatedComment);
        }
      }
    }
    // Limpa o comentário selecionado após a atualização ou adição
    this.selectedComment = undefined;
  }

}
