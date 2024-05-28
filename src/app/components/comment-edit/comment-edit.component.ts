import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-comment-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css'],
})
export class CommentEditComponent {
  @Input() comment?: Comment;
  @Output() commentUpdated = new EventEmitter<Comment>();


  constructor(private commentService: CommentService) {}

  saveComment(): void {
    if (this.comment) {
      if (this.comment.id === 0) {
        this.commentService
          .addComment(this.comment)
          .subscribe((newComment) => this.commentUpdated.emit(newComment));
      } else {
        this.commentService
          .updateComment(this.comment)
          .subscribe(() => this.commentUpdated.emit(this.comment));
      }
    }
  }

  cancelEdit(): void {
    this.comment = undefined;
  }
}
