
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

  // URL da API para comentários
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  // Armazena os comentários carregados em memória
  private comments: Comment[] = [];

  // Construtor que injeta o HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) {}

  // Método para obter comentários
  getComments(): Observable<Comment[]> {
    // Retorna os comentários em memória se já estiverem carregados
    if (this.comments.length) {
      return of(this.comments);
    }
    // Faz uma requisição para obter os comentários
    return this.http.get<Comment[]>(this.apiUrl).pipe(
      // Armazena os comentários em memória
      tap(comments => this.comments = comments),
      // Trata possíveis erros na requisição
      catchError(this.handleError<Comment[]>('getComments', []))
    );
  }

  // Método para adicionar um novo comentário
  addComment(comment: Comment): Observable<Comment> {
    // Faz uma requisição POST para adicionar o comentário
    return this.http.post<Comment>(this.apiUrl, comment).pipe(
      // Adiciona o novo comentário à lista em memória
      tap(newComment => this.comments.push(newComment)),
      // Trata possíveis erros na requisição
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  // Método para atualizar um comentário existente
  updateComment(comment: Comment): Observable<any> {
    const url = `${this.apiUrl}/${comment.id}`;
    // Faz uma requisição PUT para atualizar o comentário
    return this.http.put(url, comment).pipe(
      // Atualiza o comentário na lista em memória
      tap(() => {
        const index = this.comments.findIndex(c => c.id === comment.id);
        if (index !== -1) {
          this.comments[index] = comment;
        }
      }),
      // Trata possíveis erros na requisição
      catchError(this.handleError<any>('updateComment'))
    );
  }

  // Método para deletar um comentário
  deleteComment(id: number): Observable<Comment> {
    const url = `${this.apiUrl}/${id}`;
    // Faz uma requisição DELETE para remover o comentário
    return this.http.delete<Comment>(url).pipe(
      // Remove o comentário da lista em memória
      tap(() => {
        this.comments = this.comments.filter(c => c.id !== id);
      }),
      // Trata possíveis erros na requisição
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  // Método privado para tratar erros em operações HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Loga o erro no console
      console.error(error);
      // Retorna um resultado vazio para manter a aplicação funcionando
      return of(result as T);
    };
  }
}
