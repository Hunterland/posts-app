import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  posts: Post[] = [];
  selectedPost?: Post;
  selectedComment?: Comment;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data.map(post => ({
        ...post,
        comments: [] // Inicialize os comentários como um array vazio
      }));
      this.loadCommentsForPosts();
    });
  }

  loadCommentsForPosts(): void {
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.posts.forEach(post => {
        post.comments = comments.filter(comment => comment.postId === post.id);
      });
    });
  }

  addPost(): void {
    this.selectedPost = { id: 0, title: '', body: '', comments: [] };
  }

  editPost(post: Post): void {
    this.selectedPost = { ...post };
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== post.id);
    });
  }

  addComment(postId: number): void {
    this.selectedComment = { id: 0, postId, name: '', email: '', body: '' };
  }

  editComment(comment: Comment): void {
    this.selectedComment = { ...comment };
  }

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      const post = this.posts.find(p => p.id === comment.postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== comment.id);
      }
    });
  }

  onPostUpdated(updatedPost: Post): void {
    const index = this.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    } else {
      this.posts.push(updatedPost);
    }
    this.selectedPost = undefined;
  }

  onCommentUpdated(updatedComment: Comment): void {
    const post = this.posts.find(p => p.id === updatedComment.postId);
    if (post) {
      const index = post.comments.findIndex(c => c.id === updatedComment.id);
      if (index !== -1) {
        post.comments[index] = updatedComment;
      } else {
        post.comments.push(updatedComment);
      }
    }
    this.selectedComment = undefined;
  }
}
