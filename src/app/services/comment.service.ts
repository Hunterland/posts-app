import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';
  private comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    if (this.comments.length) {
      return of(this.comments);
    }
    return this.http.get<Comment[]>(this.apiUrl).pipe(
      tap(comments => this.comments = comments),
      catchError(this.handleError<Comment[]>('getComments', []))
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment).pipe(
      tap(newComment => this.comments.push(newComment)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  updateComment(comment: Comment): Observable<any> {
    const url = `${this.apiUrl}/${comment.id}`;
    return this.http.put(url, comment).pipe(
      tap(() => {
        const index = this.comments.findIndex(c => c.id === comment.id);
        if (index !== -1) {
          this.comments[index] = comment;
        }
      }),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  deleteComment(id: number): Observable<Comment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Comment>(url).pipe(
      tap(() => {
        this.comments = this.comments.filter(c => c.id !== id);
      }),
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
