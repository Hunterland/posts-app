import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { Comment } from './comment.service';

export interface Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[]; // Nova propriedade para armazenar os comentários associados ao post
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsApiUrl = 'https://jsonplaceholder.typicode.com/comments';
  private posts: Post[] = [];

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    if (this.posts.length) {
      return of(this.posts);
    }
    return this.http.get<Post[]>(this.apiUrl).pipe(
      switchMap(posts => {
        const commentRequests = posts.map(post =>
          this.http.get<Comment[]>(`${this.commentsApiUrl}?postId=${post.id}`).pipe(
            map(comments => ({ ...post, comments: comments || [] })) // Garante que comments esteja presente
          )
        );
        return forkJoin(commentRequests).pipe(
          tap(postsWithComments => this.posts = postsWithComments)
        );
      }),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post).pipe(
      tap(newPost => this.posts.push(newPost)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  updatePost(post: Post): Observable<any> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put(url, post).pipe(
      tap(() => {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts[index] = post;
        }
      }),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Post>(url).pipe(
      tap(() => {
        this.posts = this.posts.filter(p => p.id !== id);
      }),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
