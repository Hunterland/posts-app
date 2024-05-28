import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment.service';


@Component({
  selector: 'app-comment-edit', // Seletor do componente
  standalone: true, // Propriedade personalizada que pode ser usada para fins espec�ficos
  imports: [CommonModule, FormsModule], // M�dulos importados para funcionamento do componente
  templateUrl: './comment-edit.component.html', // Caminho do template HTML do componente
  styleUrls: ['./comment-edit.component.css'], // Caminho dos estilos CSS do componente
})
export class CommentEditComponent { // Declara��o da classe do componente
  @Input() comment?: Comment; // Propriedade de entrada que recebe um objeto Comment
  @Output() commentUpdated = new EventEmitter<Comment>(); // Evento de sa�da que emite um objeto Comment ap�s a atualiza��o

  constructor(private commentService: CommentService) {} // Construtor da classe, injetando o servi�o CommentService

  // M�todo para salvar um coment�rio
  saveComment(): void {
    // Verifica se o objeto comment est� definido
    if (this.comment) {
      // Verifica se o id do coment�rio � igual a 0, o que indica um novo coment�rio
      if (this.comment.id === 0) {
        // Chama o m�todo addComment do servi�o CommentService para adicionar um novo coment�rio
        // e emite o novo coment�rio ap�s a adi��o
        this.commentService.addComment(this.comment).subscribe((newComment) => this.commentUpdated.emit(newComment));
      } else {
        // Chama o m�todo updateComment do servi�o CommentService para atualizar um coment�rio existente
        // e emite o coment�rio atualizado ap�s a atualiza��o
        this.commentService.updateComment(this.comment).subscribe(() => this.commentUpdated.emit(this.comment));
      }
    }
  }

  // M�todo para cancelar a edi��o do coment�rio, definindo a propriedade comment como undefined
  cancelEdit(): void {
    this.comment = undefined;
  }
}
