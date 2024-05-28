
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

  // URL da API para coment�rios
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  // Armazena os coment�rios carregados em mem�ria
  private comments: Comment[] = [];

  // Construtor que injeta o HttpClient para fazer requisi��es HTTP
  constructor(private http: HttpClient) {}

  // M�todo para obter coment�rios
  getComments(): Observable<Comment[]> {
    // Retorna os coment�rios em mem�ria se j� estiverem carregados
    if (this.comments.length) {
      return of(this.comments);
    }
    // Faz uma requisi��o para obter os coment�rios
    return this.http.get<Comment[]>(this.apiUrl).pipe(
      // Armazena os coment�rios em mem�ria
      tap(comments => this.comments = comments),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<Comment[]>('getComments', []))
    );
  }

  // M�todo para adicionar um novo coment�rio
  addComment(comment: Comment): Observable<Comment> {
    // Faz uma requisi��o POST para adicionar o coment�rio
    return this.http.post<Comment>(this.apiUrl, comment).pipe(
      // Adiciona o novo coment�rio � lista em mem�ria
      tap(newComment => this.comments.push(newComment)),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  // M�todo para atualizar um coment�rio existente
  updateComment(comment: Comment): Observable<any> {
    const url = `${this.apiUrl}/${comment.id}`;
    // Faz uma requisi��o PUT para atualizar o coment�rio
    return this.http.put(url, comment).pipe(
      // Atualiza o coment�rio na lista em mem�ria
      tap(() => {
        const index = this.comments.findIndex(c => c.id === comment.id);
        if (index !== -1) {
          this.comments[index] = comment;
        }
      }),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<any>('updateComment'))
    );
  }

  // M�todo para deletar um coment�rio
  deleteComment(id: number): Observable<Comment> {
    const url = `${this.apiUrl}/${id}`;
    // Faz uma requisi��o DELETE para remover o coment�rio
    return this.http.delete<Comment>(url).pipe(
      // Remove o coment�rio da lista em mem�ria
      tap(() => {
        this.comments = this.comments.filter(c => c.id !== id);
      }),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  // M�todo privado para tratar erros em opera��es HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Loga o erro no console
      console.error(error);
      // Retorna um resultado vazio para manter a aplica��o funcionando
      return of(result as T);
    };
  }
}
