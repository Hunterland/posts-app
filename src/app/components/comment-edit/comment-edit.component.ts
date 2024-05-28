import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment.service';


@Component({
  selector: 'app-comment-edit', // Seletor do componente
  standalone: true, // Propriedade personalizada que pode ser usada para fins específicos
  imports: [CommonModule, FormsModule], // Módulos importados para funcionamento do componente
  templateUrl: './comment-edit.component.html', // Caminho do template HTML do componente
  styleUrls: ['./comment-edit.component.css'], // Caminho dos estilos CSS do componente
})
export class CommentEditComponent { // Declaração da classe do componente
  @Input() comment?: Comment; // Propriedade de entrada que recebe um objeto Comment
  @Output() commentUpdated = new EventEmitter<Comment>(); // Evento de saída que emite um objeto Comment após a atualização

  constructor(private commentService: CommentService) {} // Construtor da classe, injetando o serviço CommentService

  // Método para salvar um comentário
  saveComment(): void {
    // Verifica se o objeto comment está definido
    if (this.comment) {
      // Verifica se o id do comentário é igual a 0, o que indica um novo comentário
      if (this.comment.id === 0) {
        // Chama o método addComment do serviço CommentService para adicionar um novo comentário
        // e emite o novo comentário após a adição
        this.commentService.addComment(this.comment).subscribe((newComment) => this.commentUpdated.emit(newComment));
      } else {
        // Chama o método updateComment do serviço CommentService para atualizar um comentário existente
        // e emite o comentário atualizado após a atualização
        this.commentService.updateComment(this.comment).subscribe(() => this.commentUpdated.emit(this.comment));
      }
    }
  }

  // Método para cancelar a edição do comentário, definindo a propriedade comment como undefined
  cancelEdit(): void {
    this.comment = undefined;
  }
}
