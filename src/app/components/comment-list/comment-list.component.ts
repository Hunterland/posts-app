import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentEditComponent],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  postId!: number;
  comments: Comment[] = [];
  selectedComment?: Comment;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('postId')!;
    this.getComments();
  }

  getComments(): void {
    this.commentService.getComments().subscribe((comments) => {
      this.comments = comments.filter(
        (comment) => comment.postId === this.postId
      );
    });
  }

  addComment(): void {
    this.selectedComment = {
      id: 0,
      postId: this.postId,
      name: '',
      email: '',
      body: '',
    };
  }

  editComment(comment: Comment): void {
    this.selectedComment = { ...comment };
  }

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter((c) => c.id !== comment.id);
    });
  }

  onCommentUpdated(_comment: Comment): void {
    this.selectedComment = undefined;
    this.getComments();
  }
}
