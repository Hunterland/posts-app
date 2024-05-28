import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../../services/post.service';


@Component({
  selector: 'app-post-edit', // Seletor do componente
  standalone: true, // Propriedade personalizada que pode ser usada para fins espec�ficos
  imports: [CommonModule, FormsModule], // M�dulos importados para funcionamento do componente
  templateUrl: './post-edit.component.html', // Caminho do template HTML do componente
  styleUrls: ['./post-edit.component.css'] // Caminho dos estilos CSS do componente
})
export class PostEditComponent { // Declara��o da classe do componente

  // Propriedade de entrada que recebe um objeto Post
  @Input() post?: Post;
  // Evento de sa�da que emite um objeto Post ap�s a atualiza��o
  @Output() postUpdated = new EventEmitter<Post>();

  // Construtor da classe, injetando o servi�o PostService
  constructor(private postService: PostService) {}

  // M�todo para salvar um post
  savePost(): void {
    // Verifica se o objeto post est� definido
    if (this.post) {
      // Verifica se o id do post � igual a 0, o que indica um novo post
      if (this.post.id === 0) {
        // Garante que comments esteja presente, caso contr�rio, define como um array vazio
        this.post.comments = this.post.comments || [];
        // Chama o m�todo addPost do servi�o PostService para adicionar um novo post
        // e emite o novo post ap�s a adi��o
        this.postService.addPost(this.post).subscribe((newPost: Post) => this.postUpdated.emit(newPost));
      } else {
        // Garante que comments esteja presente, caso contr�rio, define como um array vazio
        this.post.comments = this.post.comments || [];
        // Chama o m�todo updatePost do servi�o PostService para atualizar um post existente
        // e emite o post atualizado ap�s a atualiza��o
        this.postService.updatePost(this.post).subscribe(() => this.postUpdated.emit(this.post));
      }
    }
  }

  // M�todo para cancelar a edi��o do post, definindo a propriedade post como undefined
  cancelEdit(): void {
    this.post = undefined;
  }
}
