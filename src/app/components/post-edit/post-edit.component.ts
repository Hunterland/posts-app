import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../../services/post.service';


@Component({
  selector: 'app-post-edit', // Seletor do componente
  standalone: true, // Propriedade personalizada que pode ser usada para fins específicos
  imports: [CommonModule, FormsModule], // Módulos importados para funcionamento do componente
  templateUrl: './post-edit.component.html', // Caminho do template HTML do componente
  styleUrls: ['./post-edit.component.css'] // Caminho dos estilos CSS do componente
})
export class PostEditComponent { // Declaração da classe do componente

  // Propriedade de entrada que recebe um objeto Post
  @Input() post?: Post;
  // Evento de saída que emite um objeto Post após a atualização
  @Output() postUpdated = new EventEmitter<Post>();

  // Construtor da classe, injetando o serviço PostService
  constructor(private postService: PostService) {}

  // Método para salvar um post
  savePost(): void {
    // Verifica se o objeto post está definido
    if (this.post) {
      // Verifica se o id do post é igual a 0, o que indica um novo post
      if (this.post.id === 0) {
        // Garante que comments esteja presente, caso contrário, define como um array vazio
        this.post.comments = this.post.comments || [];
        // Chama o método addPost do serviço PostService para adicionar um novo post
        // e emite o novo post após a adição
        this.postService.addPost(this.post).subscribe((newPost: Post) => this.postUpdated.emit(newPost));
      } else {
        // Garante que comments esteja presente, caso contrário, define como um array vazio
        this.post.comments = this.post.comments || [];
        // Chama o método updatePost do serviço PostService para atualizar um post existente
        // e emite o post atualizado após a atualização
        this.postService.updatePost(this.post).subscribe(() => this.postUpdated.emit(this.post));
      }
    }
  }

  // Método para cancelar a edição do post, definindo a propriedade post como undefined
  cancelEdit(): void {
    this.post = undefined;
  }
}
