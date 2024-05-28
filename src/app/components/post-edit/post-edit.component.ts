import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  @Input() post?: Post;
  @Output() postUpdated = new EventEmitter<Post>();

  constructor(private postService: PostService) {}

  savePost(): void {
    if (this.post) {
      if (this.post.id === 0) {
        // Garante que comments esteja presente
        this.post.comments = this.post.comments || [];
        this.postService.addPost(this.post).subscribe((newPost: Post) => this.postUpdated.emit(newPost));
      } else {
        // Garante que comments esteja presente
        this.post.comments = this.post.comments || [];
        this.postService.updatePost(this.post).subscribe(() => this.postUpdated.emit(this.post));
      }
    }
  }

  cancelEdit(): void {
    this.post = undefined;
  }
}
