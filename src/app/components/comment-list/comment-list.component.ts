import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';

// Decora��o do componente com metadados, incluindo seletores, imports de m�dulos, template e estilos
@Component({
  selector: 'app-comment-list',
  standalone: true, // Propriedade personalizada que pode ser usada para fins espec�ficos
  imports: [CommonModule, CommentEditComponent], // M�dulos importados para funcionamento do componente
  templateUrl: './comment-list.component.html', // Caminho do template HTML do componente
  styleUrls: ['./comment-list.component.css'], // Caminho dos estilos CSS do componente
})
// Declara��o da classe do componente e implementa��o da interface OnInit
export class CommentListComponent implements OnInit {
  postId!: number; // Vari�vel para armazenar o ID do post
  comments: Comment[] = []; // Array para armazenar os coment�rios
  selectedComment?: Comment; // Vari�vel para armazenar o coment�rio selecionado

  constructor(
    private commentService: CommentService, // Inje��o do servi�o CommentService
    private route: ActivatedRoute // Inje��o do servi�o ActivatedRoute
  ) {}

  // M�todo executado quando o componente � inicializado
  ngOnInit(): void {
    // Obt�m o ID do post da rota atual
    this.postId = +this.route.snapshot.paramMap.get('postId')!;
    // Chama o m�todo para obter os coment�rios
    this.getComments();
  }

  // M�todo para obter os coment�rios
  getComments(): void {
    // Chama o m�todo getComments do servi�o CommentService e filtra os coment�rios pelo postId do post atual
    this.commentService.getComments().subscribe((comments) => {
      this.comments = comments.filter(
        (comment) => comment.postId === this.postId
      );
    });
  }

  // M�todo para adicionar um novo coment�rio
  addComment(): void {
    // Define um novo coment�rio com ID 0, postId do post atual e campos vazios
    this.selectedComment = {
      id: 0,
      postId: this.postId,
      name: '',
      email: '',
      body: '',
    };
  }

  // M�todo para editar um coment�rio
  editComment(comment: Comment): void {
    // Define o coment�rio selecionado como uma c�pia do coment�rio a ser editado
    this.selectedComment = { ...comment };
  }

  // M�todo para excluir um coment�rio
  deleteComment(comment: Comment): void {
    // Chama o m�todo deleteComment do servi�o CommentService e atualiza a lista de coment�rios ap�s a exclus�o
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter((c) => c.id !== comment.id);
    });
  }

  // M�todo executado quando um coment�rio � atualizado
  onCommentUpdated(_comment: Comment): void {
    // Reseta o coment�rio selecionado para undefined e atualiza a lista de coment�rios
    this.selectedComment = undefined;
    this.getComments();
  }
}
