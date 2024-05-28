import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';

// Decoração do componente com metadados, incluindo seletores, imports de módulos, template e estilos
@Component({
  selector: 'app-comment-list',
  standalone: true, // Propriedade personalizada que pode ser usada para fins específicos
  imports: [CommonModule, CommentEditComponent], // Módulos importados para funcionamento do componente
  templateUrl: './comment-list.component.html', // Caminho do template HTML do componente
  styleUrls: ['./comment-list.component.css'], // Caminho dos estilos CSS do componente
})
// Declaração da classe do componente e implementação da interface OnInit
export class CommentListComponent implements OnInit {
  postId!: number; // Variável para armazenar o ID do post
  comments: Comment[] = []; // Array para armazenar os comentários
  selectedComment?: Comment; // Variável para armazenar o comentário selecionado

  constructor(
    private commentService: CommentService, // Injeção do serviço CommentService
    private route: ActivatedRoute // Injeção do serviço ActivatedRoute
  ) {}

  // Método executado quando o componente é inicializado
  ngOnInit(): void {
    // Obtém o ID do post da rota atual
    this.postId = +this.route.snapshot.paramMap.get('postId')!;
    // Chama o método para obter os comentários
    this.getComments();
  }

  // Método para obter os comentários
  getComments(): void {
    // Chama o método getComments do serviço CommentService e filtra os comentários pelo postId do post atual
    this.commentService.getComments().subscribe((comments) => {
      this.comments = comments.filter(
        (comment) => comment.postId === this.postId
      );
    });
  }

  // Método para adicionar um novo comentário
  addComment(): void {
    // Define um novo comentário com ID 0, postId do post atual e campos vazios
    this.selectedComment = {
      id: 0,
      postId: this.postId,
      name: '',
      email: '',
      body: '',
    };
  }

  // Método para editar um comentário
  editComment(comment: Comment): void {
    // Define o comentário selecionado como uma cópia do comentário a ser editado
    this.selectedComment = { ...comment };
  }

  // Método para excluir um comentário
  deleteComment(comment: Comment): void {
    // Chama o método deleteComment do serviço CommentService e atualiza a lista de comentários após a exclusão
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter((c) => c.id !== comment.id);
    });
  }

  // Método executado quando um comentário é atualizado
  onCommentUpdated(_comment: Comment): void {
    // Reseta o comentário selecionado para undefined e atualiza a lista de comentários
    this.selectedComment = undefined;
    this.getComments();
  }
}
